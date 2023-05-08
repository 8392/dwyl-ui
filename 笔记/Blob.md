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


### svg填充

```svg
fill="var(--el-color-primary)"
fill="var(--el-color-primary-light-4)"
```


### vue3组件自带$attr，透视
- 我们就不用手动加 `v-bind="$attrs"`
  
- 关掉方法
- 中间组件接收了的属性方法，不会向下面传递，那么只有在中间组件调用这个方法才能让父组件去执行
  
  
```vue
<script lang='jsx'>
export default {
  inheritAttrs: false
}
</script>
```

`npm 账号名：artist_caibo`

### npm迪威镜像
- http://222.209.208.86:1917/repository/npm-diwei/


- npm config set registry https://registry.npmjs.org
- npm config set registry http://222.209.208.86:1917/repository/npm-diwei/


### 图片，视频布局

object-fit:fill 适用于图片img和视频video