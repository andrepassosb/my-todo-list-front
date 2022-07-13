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
            <label for="todo">Descreva a tarefa</label>
            <input @keyup.enter="saveChanges(true)" placeholder="Nova Tarefa" class="w-100" type="text" v-model="state.name" required>
          </div>
          <div class="w-100 fw-bold" :class="state.checkBox ? 'line-through' : ''" v-if="!state.edit">{{ state.name }}</div>
          <input  class="ms-2 form-check-input" v-model="state.checkBox" type="checkbox" name="checked" id="completed" >
          <div class="icon mx-2" data-bs-toggle="modal" :data-bs-target="`#staticBackdrop${index}`">
              <img src="@/assets/icons/icon-trash.png" alt="trash">
          </div>
        </div>

      <!-- Modal -->
      <div class="modal fade" :id="`staticBackdrop${index}`" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-name" id="staticBackdropLabel">Deletar Tarefa</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Realmente deseja deletar esta tarefa ?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="deleteItem">Deletar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { reactive, watch , defineEmits} from '@vue/runtime-core'
import services from '@/services'
import { deleteTodo } from '@/store/todos'

export default {
  props: {
    item: {
      type: Object
    },
    listId: {
      type: Number
    }
  },
  setup (props, context) {
    const state = reactive({
      id: props.item.id,
      user_id: props.item.user_id,
      name: props.item.name,
      due_on: props.item.due_on,
      checked: props.item.checked,
      edit: !!props.item.edit,
      checkBox: false,
      listId: props.listId
    })
     const emit = defineEmits(['updateToDo'])

    if (state.checked === 'completed') state.checkBox = true

    watch(() => state.checkBox, () => {
      context.emit('updateToDo')
    })

    async function saveChanges (changeEdit) {
      if (changeEdit) state.edit = !state.edit
      const item = {
        name: state.name,
        due_on: state.due_on,
        checked: state.checkBox
      }
      const newItem = {
        ...item,
      }
      const response = await services.todos.createTodo(state.listId, newItem)
      console.log(response)
      // state.id = response.data.id
    }

    async function deleteItem () {
      if (state.id) await services.todos.deleteTodo(state.id)
      deleteTodo(props.item.fake_id)
    }
    return {
      state,
      saveChanges,
      deleteItem
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
</style>
