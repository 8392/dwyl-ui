import axios from 'axios'
import { ElMessage } from 'element-plus'

const token = 'Da4lbMaIEhpUiAHbMlxwB7xGISg1FSd6hEY2PSMqIzCtnBKmHsfYfIHEJ3zT'

const service = axios.create({
  baseURL: '',
  timeout: 60000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.noAuth) {
      return config
    } else {
      // if (token) {
      //   config.headers.Authorization = 'Bearer ' + token
      // }
      if (token) {
        config.headers.Satoken = token
      }
    }
    return config
  },
  (error) => {
    // 出现异常
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res instanceof Blob && response.config.responseType === 'blob') {
      let filename = response.headers['content-disposition']
      filename = filename.split(';')[1].split('filename=')[1]
      return {
        blob: res,
        fileName: decodeURIComponent(filename)
      }
    }
    if (res instanceof Blob) {
      return response
    }
    if (response.config.noAuth || response.config.noCode) {
      return response
    }
    if (Number(res.code) === 1) {
      return res
    }
    if (!response.config.noMessage) {
      ElMessage.error(res?.msg || res?.message || '请求出错')
    }
    return Promise.reject(res)
  },
  (error) => {
    const { data, status, config } = error.response
    if (!config.noMessage) {
      ElMessage.error(data?.msg || error?.message || '请求出错')
    }
    return Promise.reject(data)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @param customConfig
 * @returns {Promise}
 */

export function get (url, params = {}, customConfig = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @param customConfig
 * @returns {Promise}
 */

export function post (url, data = {}, customConfig = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response) => {
        resolve(response)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

export const request = service // 导出公用方法
