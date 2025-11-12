# 项目学习文档

## `uni`是全局变量，不需要引入，直接使用

### 路由配置

> 项目在`projects`目录下
> APP主包项目`main_app`，子包项目`service_manage：维保助手`

### 路由配置，在`pages.json`中配置相应路由


### 路由跳转，获取路由参数

1. 路由跳转   
 
```js
// 跳转
uni.navigateTo({
   url: `/views/webView/index?path=${path}`
})

// 返回
uni.navigateBack()  
```


2. 获取路由参数
```js

import { onLoad } from '@dcloudio/uni-app'
onLoad((val) => {
  console.log('query参数', val)
})

```


### 组件使用

> 以`消智云（Xzy）`开头的组件都是全局组件，直接使用，不需要引入，和`web端`以DW开头的组件一个逻辑
> `Xzy`开头的组件都是业务组件，方便快速构建页面

```js
  XzyHeader,  //公告头部
  XzyLayoutPage, //详情组件
  XzyNavList,  //详情列表
  XzyButton, //按钮
  XzyBlockTitle, 
  XzyTabs, //菜单切换
  XzyListPage, //分页组件
  XzyNoData,  //暂无数据
  XzyImage, //图片组件
  XzyImageList, //图片列表展示 
  XzyUpload, //上传组件
  XzyNavBox, //盒子组件
  XzyRadio,  //单选框
  XzyInput //输入框
  XzyPicker //选择器
  XzyMsgbox //统一提示弹窗
```

### 常用工具函数

```js
import { showToast } from '@xzy/utils'

```

### 全局数据存储，还是用的`pinia`，和web端一样的使用

```js
import { useAccountStore } from '@/store'
const store = useAccountStore()
console.log('拿到登录的用户信息', store)

```




### 接口请求说明
1. 和web端一样的配置

```js
export const maintenanceUnitGet = data => {
  return request({
    url: ucenter + '/maintenanceUnit/person/page',
    method: 'post',
    data,
    loading: true  //是否加载lopading，一般用于详情，和列表，其它按需要添加loading
  })
}

```


### 图片预览方法说明 

```jsx
import { XzyImgView } from '@xzy/utils'


const options = [] //Array, String
const index = 0  // 默认打开预览图片的哪一项，不传默认是0

XzyImgView(options, index) 


```


## 开发说明 

> 新功能开发，都在dev上开发，开发完成，再合并到master分支上，遇到临时bug，直接在master上修改bug提交，这样以防新功能没开发完成合并到`演示环境（测试环境）`
> master分支是测试分支，提交代码自动构建测试环境，下面是部署的测试环境地址

