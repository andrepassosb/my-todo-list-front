import { requestApi } from '.'

export default () => ({
  getAllLists: () => {
    const url = 'list'
    const response = requestApi(url, 'get')

    return response
  },
  createList: (data) => {
    const url = 'list'
    const response = requestApi(url, 'post', data)

    return response
  },
  createTodo: (id, data) => {
    const url = `list/${id}/item`
    const response = requestApi(url, 'post', data)

    return response
  },
  getUserTodo: (listId) => {
    const url = `list/${listId}/item/`
    const response = requestApi(url, 'get')

    return response
  },
  updateTodo: (todoID, data) => {
    const url = `/todos/${todoID}/`
    const response = requestApi(url, 'put', data)

    return response
  },
  deleteTodo: (todoID) => {
    const url = `/todos/${todoID}/`
    const response = requestApi(url, 'delete')

    return response
  }
})
