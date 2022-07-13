<template>
    <div class="d-flex px-4 align-items-center mb-2 mt-3">
        <div class="icon" v-if="!state.edit" @click="state.edit = !state.edit">
            <img src="@/assets/icons/icon-pen.png" alt="pen">
        </div>
        <div class="icon" v-else @click="saveChanges(true)">
            <img src="@/assets/icons/icon-save.png" alt="save">
        </div>
        <div class="form-control text-start d-flex">
          <div class="d-flex flex-column w-100" v-if="state.edit">
            <label for="todo">Descreva a Lista</label>
            <input @keyup.enter="saveChanges(true)" placeholder="Nova Lista" class="w-100" type="text" v-model="state.title" required>
          </div>
          <div @click="goTodoPage" class="w-100 fw-bold" :class="state.checkBox ? 'line-through' : ''" v-if="!state.edit">{{ state.title }}</div>
          <div class="icon mx-2" data-bs-toggle="modal" :data-bs-target="`#staticBackdrop${index}`">
              <img src="@/assets/icons/icon-trash.png" alt="trash">
          </div>
        </div>

      <!-- Modal -->
      <div class="modal fade" :id="`staticBackdrop${index}`" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Deletar Lista</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Realmente deseja deletar esta lista ?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="deleteItem">Deletar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="error" v-if="state.error">{{ state.error }}</p>
</template>
<script>
import { reactive, watch } from '@vue/runtime-core'
import services from '@/services'
import { deleteTodo } from '@/store/todos'
import { useRouter } from 'vue-router'

export default {
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  setup (props) {
    const router = useRouter()
    const state = reactive({
      title: props.item.name,
      edit: !!props.item.edit,
    })

    async function saveChanges (changeEdit) {
      state.error = null
      const item = {
        name: state.title,
      }
      if (state.id) {
        // await services.todos.updateTodo(state.id, item)
      } else {
        const newItem = {
          ...item,        }
        if (!state.error) {
          state.loading = true
          const response = await services.todos.createList(newItem)
          console.log(response)
          if (response.status && response.status === 201) {
            if (changeEdit) state.edit = !state.edit
          } else if(response.data?.message) {
            state.error = response.data.message
          }else {
            state.error = 'Ocorreu um erro tente novamente.'
          }
          state.loading = false
        }

      }
    }

    async function deleteItem () {
      if (state.id) await services.todos.deleteTodo(state.id)
      deleteTodo(props.item.fake_id)
    }

    async function goTodoPage(){
      router.push({ name: 'todo', params: { listId: props.item._id } })
    }

    return {
      state,
      saveChanges,
      deleteItem,
      goTodoPage
    }
  }
}
</script>
<style>
.form-control{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
input{
  border: none;
}
input:focus{
  outline: none;
}
label{
  font-size: 12px;
}
.icon {
    height: 30px;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
}
.icon:hover {
    background-color: #c9c9c9;
}
.icon img{
    height: 100%;
}
.line-through{
  text-decoration: line-through;
}
.error{
  color: #ef6a6a;
}
</style>
