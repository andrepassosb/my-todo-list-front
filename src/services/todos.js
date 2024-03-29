import { requestApi } from '.';

export default () => ({
  getAllLists: () => {
    const url = 'list';
    const response = requestApi(url, 'get');

    return response;
  },
  createList: (data) => {
    const url = 'list';
    const response = requestApi(url, 'post', data);

    return response;
  },
  deleteList: (id) => {
    const url = `list/${id}`;
    const response = requestApi(url, 'delete');

    return response;
  },
  updateList: (data) => {
    const url = `list/${data._id}`;
    const response = requestApi(url, 'patch', data);

    return response;
  },
  createTodo: (id, data) => {
    const url = `list/${id}/item`;
    const response = requestApi(url, 'post', data);

    return response;
  },
  getUserTodo: (listId) => {
    const url = `list/${listId}/item/`;
    const response = requestApi(url, 'get');

    return response;
  },
  updateTodo: (listId, data) => {
    const url = `list/${listId}/item/`;
    const response = requestApi(url, 'patch', { itens: data });

    return response;
  },
  deleteTodo: (todoID) => {
    const url = `/todos/${todoID}/`;
    const response = requestApi(url, 'delete');

    return response;
  },
});
