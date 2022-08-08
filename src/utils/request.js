import axios from 'axios'
import { ElMessage } from 'element-plus'

// const token = 'f37669ccdc334cc085d74cb42f92542e'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE2MDc4Nzk4MTM2Mzc0ODg2NCwidXNlcl9uYW1lIjoiYWRtaW4iLCJwcm9qZWN0X2lkX2xpc3QiOiIxOTM4MjQ0OTYxMTcyNjAyODgsMTk2MzE2MDU0MTQxNTA1NTM3IiwicmVhbF9uYW1lIjoiYWRtaW4iLCJhdmF0YXIiOiJodHRwczovL2lvdC5kaXdlaXl1bmxpYW4uY246MTQ0My9pb3QtZmlsZS8zMDE4Mjc0OTgyODU5Njk0MDgvYS5wbmciLCJhdXRob3JpdGllcyI6WyJhZG1pbmlzdHJhdG9yIl0sImNsaWVudF9pZCI6IndlYi1pb3QiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwibGljZW5zZSI6InBvd2VyZWQgYnkgZGl3ZWlmdSIsInVzZXJfaWQiOiIxNjA4MDA0MDM1NDE2MzA5NzYiLCJyb2xlX2lkIjoiMSIsInNjb3BlIjpbImFsbCJdLCJuaWNrX25hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJvYXV0aF9pZCI6IiIsImRldGFpbCI6bnVsbCwiZXhwIjoxNjYwMDU0MTM1LCJqdGkiOiJiZTY1ZWFiZi1lNzQwLTRiZjItOGEyNy01NjY3OWE3ZmQ2MzUiLCJhY2NvdW50IjoiYWRtaW4ifQ.jKffrC1n71NjFQeyaX5QKg7eRwKpo45J3-mwTSPHw70'

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
        config.headers.Authorization = token
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
