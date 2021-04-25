import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import Qs from 'qs'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000000 // request timeout
})

const axiosPromiseArr = []

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.data = Qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.cancelToken = new axios.CancelToken(cancel => {
      axiosPromiseArr.push({ cancel })
    })
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      if (res.code === 403 || res.code === 404) {
        store.dispatch('user/resetToken').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
        return Promise.reject('error')
      }
      if (res.code === 9527) {
        router.replace({
          path: '/home'
        })
        return
      }
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (axios.isCancel(error)) {
      return
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
export { axiosPromiseArr }