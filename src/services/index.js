import axios from 'axios';
import UsersService from './users';
import PostService from './posts';
import CommentService from './comments';
import TodosService from './todos';

const baseURL = 'https://my-todo-list-kappa.vercel.app/';

export async function requestApi(url, type, data = '') {
  const token = sessionStorage.getItem('access_token');
  const response = await new Promise((resolve) => {
    axios({
      method: type,
      url: baseURL + url,
      data: data,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
  return responseData(response);
}

function responseData(response) {
  // let menssage = null
  // if (!response.data) {
  //   menssage = {
  //     status: response.request.status,
  //     statusText: response.request.statusText
  //   }
  // }
  return {
    data: response.data,
    status: response.request.status,
  };
}

export default {
  users: UsersService(),
  posts: PostService(),
  comments: CommentService(),
  todos: TodosService(),
};
