<template>
  <form action @submit.prevent="handleSignIn" class="LoginView">
    <div class="page-title d-flex">
      <h2 class="my-auto">Cadastre-se</h2>
    </div>
    <div class="input-container">
      <div class="form-control text-start mb-4">
        <label class="position-absolute" for="userId">Nome</label>
        <input type="text" id="name-field" v-model="state.name" required />
      </div>
      <div class="form-control text-start mb-4">
        <label class="position-absolute" for="email">Email</label>
        <input type="email" id="email-field" v-model="state.email" required />
      </div>
      <div class="form-control text-start mb-4">
        <label class="position-absolute" for="password">Senha</label>
        <input
          type="password"
          id="password-field"
          v-model="state.password"
          required
        />
      </div>
      <div class="form-control text-start mb-4">
        <label class="position-absolute" for="confirmpassword"
          >Confirme a senha</label
        >
        <input
          type="password"
          id="confirmpassword-field"
          v-model="state.confirmpassword"
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
        Sign In
      </button>
      <p class="error">{{ state.error }}</p>
      <p class="error">{{ state.responseError }}</p>
      <p class="sucess">{{ state.sucess }}</p>
      <h2 id="userId">{{ state.userId }}</h2>
    </div>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity';
import services from '@/services';

export default {
  name: 'LoginView',
  setup() {
    const state = reactive({
      email: '',
      name: '',
      gender: '',
      error: '',
      responseError: '',
      sucess: '',
      userId: '',
      loading: false,
    });
    async function handleSignIn() {
      state.error = null;
      state.sucess = '';
      state.userId = '';
      state.responseError = '';
      const data = {
        name: state.name,
        email: state.email,
        password: state.password,
        confirmpassword: state.confirmpassword,
      };
      if (!state.error) {
        state.loading = true;
        const response = await services.users.createUser(data);
        if (response.status && response.status === 201) {
          state.sucess = response.data.message;
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
      handleSignIn,
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
select,
input {
  padding-top: 20px;
  border: none;
}
select:focus,
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
