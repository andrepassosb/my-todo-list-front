<template>
  <form action @submit.prevent="handleLogin" class="LoginView">
    <div class="page-title d-flex">
      <h2 class="my-auto">Login</h2>
    </div>
    <div class="input-container">
      <div class="form-control text-start mb-4">
        <label class="position-absolute" for="email">Email</label>
        <input type="email" id="login-email" v-model="state.email" required />
      </div>
      <div class="form-control text-start mb-4">
        <label class="position-absolute" for="userId">Senha</label>
        <input
          type="password"
          id="login-userID"
          v-model="state.password"
          required
        />
      </div>
      <button
        id="submit-button"
        type="submit"
        :disabled="state.loading"
        class="btn btn-primary rounded-pill mb-3"
      >
        <div
          class="spinner-border text-light"
          v-if="state.loading"
          role="status"
        ></div>
        Log in
      </button>
      <p class="error" v-if="state.error">{{ state.error }}</p>
    </div>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity';
import services from '@/services';
import useStore from '@/hooks/useStore';
// import { setUserToken } from '@/store/users'
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      email: '',
      password: '',
      loading: false,
    });
    async function handleLogin() {
      state.error = null;
      state.sucess = '';
      state.responseError = '';
      const data = {
        email: state.email,
        password: state.password,
      };
      if (!state.error) {
        state.loading = true;
        const response = await services.users.loginUser(data);
        if (response.status && response.status === 200) {
          state.sucess = response.data.message;
          sessionStorage.setItem('access_token', response.data.token);
          router.push({ name: 'list' });
        } else if (response.data?.message) {
          state.error = response.data.message;
        } else {
          state.error = 'Ocorreu um erro tente novamente.';
        }
        state.loading = false;
      }
    }

    return {
      state,
      handleLogin,
    };
  },
};
</script>

<style>
.home {
  margin-bottom: 55px;
}
.page-title {
  padding-left: 16px;
  padding-right: 16px;
  height: 53px;
}
.page-title h2 {
  font-weight: 700;
  font-size: 1.25rem;
  text-align: left;
}
.input-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 365px;
  align-items: center;
  margin: auto;
}
.form-control {
  display: flex;
  flex-direction: column;
}
input {
  padding-top: 20px;
  border: none;
}
input:focus {
  outline: none;
}
label {
  font-size: 12px;
}
.input-container button.btn {
  font-weight: 700;
  width: 70%;
}
.error {
  color: #ef6a6a;
}
.spinner-border {
  width: 1rem;
  height: 1rem;
}
</style>
