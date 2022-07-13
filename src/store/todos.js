import { reactive } from 'vue'

const state = reactive({
  data: { allTodos: []}
})

export default state.data

export function setTodo (todos) {
  state.data.allTodos = todos
}

export function newTodo (todo) {
  state.data.allTodos.unshift(todo)
}

export function updateTodo (data) {
  console.log('data',data._id)
  state.data.allTodos.forEach(item => {
    console.log('item',item._id)
    if(item._id == data._id) {
      console.log(item)
      item = {item,...data}
    }
  });
  console.log(state.data.allTodos)
}

export function deleteTodo (id) {
  state.data.allTodos = state.data.allTodos.filter(t => t._id !== id)
}

export function cleanTodos () {
  state.data.allTodos = {}
}
