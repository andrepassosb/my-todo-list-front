<template>
  <div class="d-flex px-4 align-items-center mb-2 mt-3">
    <div class="icon" v-if="!state.edit" @click="state.edit = !state.edit">
      <img src="@/assets/icons/icon-pen.png" alt="pen" />
    </div>
    <div class="icon" v-else @click="saveChanges()">
      <img src="@/assets/icons/icon-save.png" alt="save" />
    </div>
    <div class="form-control text-start d-flex">
      <div class="d-flex flex-column w-100" v-if="state.edit">
        <label for="todo">Descreva a tarefa</label>
        <input
          @keyup.enter="saveChanges()"
          placeholder="Nova Tarefa"
          class="w-100"
          type="text"
          v-model="state.name"
          required
        />
      </div>
      <div
        class="w-100 fw-bold"
        :class="state.checkBox ? 'line-through' : ''"
        v-if="!state.edit"
      >
        {{ state.name }}
      </div>
      <input
        class="ms-2 form-check-input"
        v-model="state.checkBox"
        type="checkbox"
        name="checked"
        id="completed"
      />
      <div
        class="icon mx-2"
        data-bs-toggle="modal"
        :data-bs-target="`#staticBackdrop${state._id}`"
      >
        <img src="@/assets/icons/icon-trash.png" alt="trash" />
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="`staticBackdrop${state._id}`"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-name" id="staticBackdropLabel">Deletar Tarefa</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Realmente deseja deletar esta tarefa ?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="deleteItem"
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="error mt-5" v-if="state.error">{{ state.error }}</p>
</template>
<script>
import { reactive, watch } from 'vue';
import services from '@/services';
import { deleteTodoItem, newTodoItem } from '@/store/todos';

export default {
  props: {
    item: {
      type: Object,
    },
    listId: {
      type: String,
    },
  },
  emits: ['updateToDo'],
  setup(props, { emit }) {
    const state = reactive({
      id: props.item.id,
      name: props.item.name,
      checked: props.item.checked,
      author: props.item?.author,
      edit: !!props.item.edit,
      checkBox: false,
      listId: props.listId,
    });

    if (state.checked === 'completed') state.checkBox = true;

    watch(
      () => state.checkBox,
      () => {
        emit('updateToDo');
      }
    );

    async function saveChanges() {
      state.error = null;
      state.loading = true;

      // FOR NEW ITEM
      if (state.id.split('-')[0] === 'NewItem') {
        const newItem = {
          name: state.name,
          checked: state.checkBox,
        };
        //Send request
        const response = await services.todos.createTodo(state.listId, newItem);

        //If sucess
        if (response.status && response.status === 201) {
          newTodoItem(state.listId, response.data.newItem);
          deleteTodoItem(state.listId, state.id);
        }
        //If error
        else if (response.data?.message) {
          state.error = response.data.message;
        }
        //Else unknown erros
        else {
          state.error = 'Ocorreu um erro tente novamente.';
        }
      } else {
        const updateItem = {
          name: state.name,
          checked: state.checkBox,
          id: state.id,
          author: state.id,
        };
        emit('updateToDo', updateItem);
        state.edit = false;
      }
    }

    async function deleteItem() {
      deleteTodoItem(state.listId, state.id);
      emit('updateToDo');
    }
    return {
      state,
      saveChanges,
      deleteItem,
    };
  },
};
</script>
<style>
.form-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
input {
  border: none;
}
input:focus {
  outline: none;
}
label {
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
.icon img {
  height: 100%;
}
.line-through {
  text-decoration: line-through;
}
</style>
