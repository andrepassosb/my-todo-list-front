import { requestApi } from '.'

export default () => ({
  createUser: (data) => {
    const url = 'user/register'
    const response = requestApi(url, 'post', data)

    return response
  },
  loginUser: (data) => {
    const url = 'user/login'
    const response = requestApi(url, 'post', data)

    return response
  }
})
