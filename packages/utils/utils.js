import { ElMessage } from 'element-plus'
import { fileTypeMap } from './base'
import FormData from 'form-data'

export function deepClone (obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    // obj 是 null ，或者不是对象和数组，直接返回
    return obj
  }

  // 初始化返回结果
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (const key in obj) {
    // 保证 key 不是原型的属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归调用！！！
      result[key] = deepClone(obj[key])
    }
  }
  // 返回结果
  return result
}

// 防抖
export function debounce (fn, delay = 500) {
  // timer 是闭包中的
  let timer = null

  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// 节流
export function throttle (fn, delay = 100) {
  let timer = null

  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

/* 排除对象指定健 */
export function omit (obj, fields) {
  const shallowCopy = Object.assign({}, obj)
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i]
    delete shallowCopy[key]
  }
  return shallowCopy
}

/* 找出对象指定健 */
export const pick = (obj, ...fields) => {
  let pickArr = fields
  if (Array.isArray(...fields)) {
    // 传入的是数组
    pickArr = fields[0]
  }
  return pickArr.reduce((res, item) => {
    if (Object.prototype.hasOwnProperty.call(obj, item)) {
      res[item] = obj[item]
    }
    return res
  }, {})
}

/* 生产唯一ID */
export function generateRandomKey (prefix) {
  if (prefix == null) {
    prefix = 'artist'
  }

  const userAgent = window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g, '').split('')
  let mid = ''
  for (let i = 0; i < 12; i++) {
    mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))]
  }
  const time = new Date().getTime()

  return prefix + '_' + mid + '_' + time
}

/* 通过请求接口文件--获取文件流 */
export function getBlob (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      const contentDisposition = xhr.getResponseHeader('content-disposition')
      const fileName = contentDisposition?.split?.(';')?.[1]?.split?.('filename=')?.[1]
      resolve({
        data: xhr.response,
        header: {
          fileName: decodeURIComponent(fileName)
        }
      })
    }
    xhr.onerror = (err) => {
      reject
      err
    }
    xhr.send(null)
  })
}

/* 下载文件流 */
export function downloadBlob (blob, fileName) {
  return new Promise((resolve, reject) => {
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.target = '_blank'
    downloadElement.href = href
    downloadElement.download = fileName
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)
    resolve(href)
  })
}

/* blob转预览图片链接 */
export function blobToUrlImg (blob) {
  const href = window.URL.createObjectURL(blob) // 创建下载的链接
  const revokeObjectURL = () => window.URL.revokeObjectURL(href)
  return {
    url: href,
    revokeObjectURL
  }
}

/* 上传文件方法 */
export function uploadFile (options = {}) {
  const { multiple, fileType, isServer, limit, isMessage = true, requestApi } = options
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement('input')
      input.type = 'file'
      if (multiple) {
        /* 是否支持多文件上传 */
        input.multiple = multiple
      }
      let fileTypeData = {}
      if (fileType) {
        /* 初次过滤文件 */
        fileTypeMap.forEach((value, key) => {
          if (key.includes(fileType)) {
            const { fileList } = value
            input.accept = fileList.join(',')
            fileTypeData = value
          }
        })
      }
      input.click()
      input.addEventListener('input', async function (e) {
        const file = e.target.files[0]
        const fileArr = Object.values(e.target.files)
        const { fileList, errorMsg } = fileTypeData
        if (fileList) {
          /* 这里二次判断上传的文件是否是传入的文件格式 */
          const hasNode = fileList.some((o) => file.name.endsWith(o))
          if (!hasNode) {
            ElMessage.error(errorMsg)
            return
          }
        }
        const formData = new FormData()
        for (const key in fileArr) {
          formData.append('files', fileArr[key])
        }

        /* 是否需要上传到后端服务器 */
        if (isServer) {
          const { data } = await requestApi(formData)
          resolve({
            file,
            files: fileArr,
            data: multiple ? data : data[0]
          })
        } else {
          resolve({
            file,
            files: fileArr,
            formData
          })
        }
        if (isMessage) ElMessage.success('上传成功')
      })
    } catch (err) {
      reject(err)
    }
  })
}

/* 把my-name-is-artist转换成驼峰 myNameIsArtist */
function camelize (str) {
  const camelizeRE = /-(\w)/g
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : ''
  })
}

/* element获取样式 */
export const getStyle = (element, styleName) => {
  if (!element || !styleName) return ''

  let key = camelize(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = element.style[key]
    if (style) return style
    const computed = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch {
    return element.style[key]
  }
}

/* 判断文本是否溢出 */
export const judgeTextOverflow = (element) => {
  const cellChild = element
  const range = document.createRange()
  range.setStart(cellChild, 0)
  range.setEnd(cellChild, cellChild.childNodes.length)
  const rangeWidth = range.getBoundingClientRect().width
  const padding =
    (Number.parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) +
    (Number.parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0)
  if (rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) {
    return true
  }
  return false
}

/* 监听dom事件 */
export const on = (element, event, handler, useCapture = false) => {
  if (element && event && handler) {
    element?.addEventListener(event, handler, useCapture)
  }
}

/* 删除监听dom事件 */
export const off = (element, event, handler, useCapture = false) => {
  if (element && event && handler) {
    element?.removeEventListener(event, handler, useCapture)
  }
}

export async function getViewComponent (routeKey) {
  const views = import.meta.glob('@/view/**/*.vue')
  const asyncComponent = views[`../view/${routeKey}.vue`]
  if (!asyncComponent) {
    window.console.error(`路由“${routeKey}”没有对应的组件文件！`)
  }
  const component = await asyncComponent()
  Object.assign(component.default, { name: routeKey })
  return component
}

/* 返回object深层级的的对象值，path传递key多层级传递utils.name这种格式 */
export function getObjectKey (object, path, defaultVal = 'undefined') {
  // 先将path处理成统一格式
  let newPath = []
  if (Array.isArray(path)) {
    newPath = path
  } else {
    // 先将字符串中的'['、']'去除替换为'.'，split分割成数组形式
    newPath = path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
  }

  // 递归处理，返回最后结果
  return newPath.reduce((o, k) => {
    // 此处o初始值为下边传入的 object，后续值为每次取的内部值
    return (o || {})[k]
  }, object) || defaultVal
}
