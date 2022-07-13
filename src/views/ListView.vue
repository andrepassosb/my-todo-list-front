<template>
  <div class="TodoView">
    <div class="page-title d-flex">
      <h2 class="my-auto">Listas</h2>
    </div>
    <button
      @click="addList"
      :disabled="state.loading"
      class="btn btn-primary rounded-pill"
      >
        <div class="spinner-border text-light"
          v-if="state.loading"
          
          role="status">
        </div>
        Criar Lista
      </button>
        <ListTodo
          v-for="item in state.listTodo" :key="item._id"
          :item="item"
        />
  </div>
</template>

<script>
import { reactive, onBeforeMount } from 'vue'
import ListTodo from '@/components/Molecules/ListTodo.vue'
import useStore from '@/hooks/useStore'
import services from '@/services'
import { setTodo, cleanTodos } from '@/store/todos'

export default {
  name: 'ListView',
  components: {
    ListTodo
  },
  setup () {
    const store = useStore()

    const state = reactive({
      loading: false,
      listTodo:[]
    })

    onBeforeMount(async () => {
      // cleanTodos()
      const { data } = await services.todos.getAllLists()
      if (data && data.lists) {
        state.listTodo = data.lists
      }
    })

    async function addList () {
      const item = {
        fake_id: Math.floor(Math.random() * Date.now()),
        id: '',
        user_id: state.userID,
        title: '',
        due_on: null,
        status: 'pending',
        edit: true
      }
      setTodo([item])
    }

    return {
      store,
      state,
      addList
    }
  }
}
</script>

<style>
.TodoView{
  margin-bottom: 55px;
}
.page-title{
  padding-left: 16px;
  padding-right: 16px;
  height: 53px;
}
.page-title h2{
  font-weight: 700;
  font-size: 1.25rem;
  text-align: left;
}
</style>
