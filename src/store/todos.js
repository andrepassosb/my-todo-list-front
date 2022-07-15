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

export function updateTodo(data) {
  state.data.allTodos.forEach((item) => {
    if (item._id == data._id) {
      item = { item, ...data };
    }
  });
}

export function deleteTodo(id) {
  console.log(id);
  state.data.allTodos = state.data.allTodos.filter((t) => t._id !== id);
}

export function cleanTodos() {
  state.data.allTodos = {};
}
