### 后端返回的文件流，前端处理方式

> `window.URL.createObjectURL(blob)`转换成前端的访问路径，这样既可以渲染在页面上，也可以直接通过`a链接`下载
```js

export const getVerification = params => {
  return request({
    url: ucenter + '/sso/verification',
    method: 'get',
    params,
    responseType: 'blob'  //需在这里声明，responseType：blob
  })
}

// 然后把返回的blob转换成url链接

/* 文件流转换成前端url地址 */
export function blodToFileUrl(blob) {
  const href = window.URL.createObjectURL(blob) // 创建链接



  return href
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
```