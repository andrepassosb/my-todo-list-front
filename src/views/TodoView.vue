<template>
  <div class="TodoView">
    <div class="page-title d-flex">
      <h2 class="my-auto">{{state.list.name}}</h2>
    </div>
    <button
      @click="addItem"
      :disabled="state.loading"
      class="btn btn-primary rounded-pill"
      >
        <div class="spinner-border text-light"
          v-if="state.loading"

          role="status">
        </div>
        Adicionar Item
      </button>
        <ItemTodo
          v-for="item in state.itemsTodo" :key="item.fake_id"
          :item="item"
          :listId="listId"
          @updateToDo="log()"
        />
  <p class="error mt-5" v-if="state.error">{{ state.error }}</p>
  </div>
</template>

<script>
import { reactive, onBeforeMount } from 'vue'
import ItemTodo from '@/components/Molecules/ItemTodo.vue'
import useStore from '@/hooks/useStore'
import services from '@/services'
import { setTodo, cleanTodos } from '@/store/todos'
import { useRouter } from 'vue-router'

export default {
  name: 'TodoView',
  components: {
    ItemTodo
  },
  setup ( ) {
    const router = useRouter()
    const listId = router.currentRoute.value.params.listId
    console.log('TodoView', listId)
    const store = useStore()
    const state = reactive({
      itemsTodo: [],
      list:{},
      error: null
    })

    onBeforeMount(async () => {
      state.error = null
      const response = await services.todos.getUserTodo(listId)
      if (response.data && response.data.list) {
        state.list = response.data.list
        state.itemsTodo = response.data.list.itens
      } else if(response.data.message){
        state.error = response.data.message
      }
    })

    async function addItem () {
      const item = {
        fake_id: Math.floor(Math.random() * Date.now()),
        id: '',
        user_id: state.userID,
        title: '',
        due_on: null,
        status: 'pending',
        edit: true,
        
      }
      state.itemsTodo.push(item)
    }

    function log() {
      console.log('teeeees')
    }

    return {
      store,
      state,
      addItem,
      listId,
      log
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
.error{
  color: #ef6a6a;
}
</style>
