import { reactive } from 'vue';

const state = reactive({
  data: { allTodos: [] },
});

export default state.data;

export function setTodo(todos) {
  state.data.allTodos = todos;
}

export function newTodo(todo) {
  state.data.allTodos.unshift(todo);
}

export function deleteTodo(id) {
  state.data.allTodos = state.data.allTodos.filter((t) => t._id !== id);
}

export function updateTodo(data) {
  state.data.allTodos.forEach((item) => {
    if (item._id == data._id) {
      item = { item, ...data };
    }
  });
}

export function newTodoItem(listId, todo) {
  state.data.allTodos.forEach((todoList) => {
    if (todoList._id == listId) todoList.itens.unshift(todo);
  });
}

export function deleteTodoItem(listId, itemId) {
  state.data.allTodos = state.data.allTodos.map((todoList) => {
    if (todoList._id == listId) {
      todoList.itens = todoList.itens.filter((t) => t.id !== itemId);
    }
    return todoList;
  });
}

export function updateTodoItem(listId, itemUpdate) {
  state.data.allTodos = state.data.allTodos.map((todoList) => {
    if (todoList?._id == listId) {
      todoList.itens = todoList.itens.map((e) => {
        if (e.id == itemUpdate?.id) {
          return itemUpdate;
        } else {
          return e;
        }
      });
    }
    return todoList;
  });
  return state.data.allTodos.filter((e) => e._id == listId)[0].itens;
}

export function cleanTodos() {
  state.data.allTodos = {};
}
