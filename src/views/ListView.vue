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
          v-for="item in store.Todos.allTodos" :key="item._id"
          :item="item"
        />
  </div>
</template>

<script>
import { reactive, onBeforeMount, computed } from 'vue'
import ListTodo from '@/components/Molecules/ListTodo.vue'
import useStore from '@/hooks/useStore'
import services from '@/services'
import { setTodo, cleanTodos , newTodo} from '@/store/todos'

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
      cleanTodos()
      const { data } = await services.todos.getAllLists()
      if (data && data.lists) {
          setTodo(data.lists)
      }
    })

    async function addList () {
      const item = {
        _id: `NewItem-${Math.floor(Math.random() * Date.now())}`,
        name: '',
        users: [],
        edit: true
      }
      newTodo(item)
    }

    const allLists = computed(() => Object.keys(store.Todos.allTodos))

    return {
      store,
      state,
      addList,
      allLists
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
