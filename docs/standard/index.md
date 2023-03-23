# 前端开发规范

## 一、目录结构规范
普遍地，项目需要有以下几项文件夹或文件：

1. src - 源代码存放的文件夹
2. package.json - 包描述文件
3. yarn.lock - 包管理器 yarn 自动生成的版本锁定文件
4. README.md - 新手上手指南，针对项目的启动命令、环境配置，依赖安装难点等进行描述

## 在 src 目录下，如果脚手架自带的子目录不够使用，可以自己开辟，常见的子目录名称及用法：

1. api - 统一存放后端请求接口的文件夹
2. utils - 存放工具类函数集合的文件夹
3. assets / static - 存放图片、音视频等静态资源的文件夹
4. components - 存放全局公共组件的文件夹，公共组件超过两次使用放入此文件夹
5. views - 存放页面级别的业务组件的文件夹
6. store - 全局状态管理文件夹
7. router - 前端路由文件夹
8. icons - svg图标静态文件夹
9. styles - 全局样式文件夹

## js，vue，css文件开发规范
`-JS：`

1. 单个单词小写，多个单词小驼峰命名法（lowerCamelCase）命名，如：routes.js、taskMap.js
2. 变量声明，使用 const 或 let，不要使用 var。
3. 方法名、参数名、成员变量、局部变量命名，采用小写开头的单词或小驼峰命名法（lowerCamelCase）命名，其中 Boolean 类型的变量一般要以 is 或 has 开头，方法名采用 动词 + 名词 的动宾形式，如 toNum、onClick 和 handleClick，不要采用动词修饰名词的形式，如 clickHandler。
4. 类名和构造函数名，采用大写开头的单词或大驼峰命名法（UpperCamelCase）命名
5. 不要使用 that 或 _this 等指代 this 变量，而应该寻求使用箭头函数等避免改变 this 指向的途径解决。
6. 在不知道对象属性调用的情况下，全部采用可选链操作符`( ?. )`，以便不知道后端的返回的数据层次时，前端程序停止执行，导致系统异常


`Vue：`

1. views文件夹下的页面组件，每个文件夹代表一个页面，文件夹下统一建`index.vue`入口文件，页面中使用的组件放在当前页面文件夹下的`widget`文件夹下，如果这个组件被多次使用，被其它页面使用，就放在全局`components`文件夹下
2. 每个页面路由名称和当前页面的文件夹名称必须保持一致

3. 组件 props 名，定义 props 时采用小驼峰命名法（lowerCamelCase），给组件设置 props 时采用串式命名法（kebab-case），如：props: { greetingText: String } 定义，<some-component greating-text="hello"></some-component> 使用。
4. 始终使用 :、@ 和 # 等指令缩写代替 v-bind:、v-on: 和 v-slot:。

5. Prop 定义应该尽量详细，用对象的方式，必须声明类型，不要用数组的形式

- 示例代码
```js 
export default {
  props: {
    status: {
      type: String,
      required: true,
      validator: function (value) {
        return [
          'syncing', 
          'synced',
          'version-conflict',
          'error'
        ].indexOf(value) !== -1
      }
    }
  }
}
```
6. 在组件上必须用 key 搭配 v-for，以便维护内部组件及其子树的状态。甚至在元素上维护可预测的行为，比如动画中的对象固化 (object constancy)。key必须是业务id的作为key，不要用index作为key
   
- 示例代码
```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id">
      {{ todo.text }}
  </li>
</ul>

```
7. v-if 和 v-for 互斥，永远不要把 v-if 和 v-for 同时用在同一个元素上。
8. vue3定义组件优先使用`setup`模式，方便快速开发
9. 自定义事件，以及一些自定义定时器，一定要在`onUnmounted`或者`beforeDestroy`组件卸载的时候销毁定时器，或者自定义事件，以免造成内存泄漏


`CSS`

1. 页面中优先使用`unocss`的类名样式，一些特殊的类名才自定义类名
2. `unocss`开发规范全面使用属性加`-`的模式，比如`flex-1`，`w-50px`，不要使用`flex1`，`w50px` ，全部统一一个规范
3. 颜色定义优先使用`uno.config.js`里面定义的颜色，字体颜色用`text-primary`，背景色用`bg-primary`
4. 如果一些颜色没有在`uno.config.js`里面定义，那么使用`cssVar`定义的颜色变量，通过style的方式使用，以便切换系统主题
5. 自定义类名采用`BEM`命名规范，例如`dwyl-apply__banne`，`dwyl-apply__banne--title`


- 示例代码
```vue
<template>
  <div class="text-12px bg-primary" style="color:var(--el-text-color-primary)">测试颜色</div>
</template>

<style lang="scss" scoped>
  .main {
    color: var(--el-color-primary);
  }
</style>
```


## js代码注释规范

1. 单行注释，独占一行，//后跟空格

2. 多行注释，/*后跟空格

3. 函数/方法注释

- 注释必须包含函数声明，有参数和返回值时必须注释标识
- 参数和返回类型必须包含类型信息和说明
- 当函数是内部函数，外部不可访问时，可使用@inner标识

```js
// 注释

/* xxxx
 xxxx
 xxxxx
*/

/** 
 * 函数描述
 * @param {string} p1 参数说明
 * @param {string} p2 参数2的说明，比较长
 *     那就换行了.
 * @param {number=} p3 参数3的说明（可选）
 * @return {Object} 返回值描述
*/

function foo(p1, p2, p3) {
    return {
        p1: p1,
        p2: p2
    }
}
```

## 所有项目统一采用`ESlint`语法检测

1. vscode下载eslint插件
2. 代码保存自动格式化，每个开发人员提交的代码，通过eslint限制，提交的代码格式都是统一的规范

- eslint配置
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 0, // 关闭组件没有名称定义
    'no-unused-vars': 'off',
    'vue/no-mutating-props': 0,
    'vue/no-setup-props-destructure': 0,
    'vue/no-deprecated-v-on-native-modifier': 0,
    'no-unused-expressions': 0,
    'no-irregular-whitespace': 0,
    'no-useless-escape': 0,
    camelcase: 'off',
    'vue/prefer-import-from-vue': 0,
    'prefer-const': 0,
    'no-undef': 0,

    'no-mixed-spaces-and-tabs': 2, // 不能空格与tab混用
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: { max: 7 },
        multiline: { max: 7 }
      }
    ], // vue template模板元素第一行最多5个属性

    // html 闭括号之前无空格
    'vue/html-closing-bracket-spacing': 2,

    // html 需要有结束标签，除了自闭合标签
    'vue/html-end-tags': 2,

    // 缩进
    'vue/html-indent': 2,

    // 属性-引用-默认使用双引号
    'vue/html-quotes': 2,

    // 标签里面不允许多余空格
    'vue/no-multi-spaces': 2,
    'no-eval': 0,

    'vue/mustache-interpolation-spacing': 2, // {{ val }}
    'vue/no-spaces-around-equal-signs-in-attribute': 2, // 属性间不允许空格
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: false
      }
    ] /// class = "66"  属性间不允许空格
  }
}
```


## 接口请求异常提示
<!-- https://juejin.cn/post/7207078219216060474 -->

- 提交表单，表单验证

1. 通过业务需求，每个表单输入框，下拉框，对应业务展示不同的提示语
2. 非空必填提示，正则验证提示，禁用选择提示
3. 前端验证通过后再请求后端接口，如果有后端错误提示，再根据后端对应的错误码code_message提示对应语句

- 接口请求错误提示

1. 常用http状态码错误提示

```js
200：'表示请求成功，前端返回对应的后端数据'
400: '请求错误(400)'
401: '未授权，请重新登录(401)'
403: '拒绝访问(403)'
404: '请求出错(404)'
408: '请求超时(408)'
500: '服务器错误(500)'
501: '服务未实现(501)'
502: '网络错误(502)'
503: '服务不可用(503)'
504: '网络超时(504)'
505: 'HTTP版本不受支持(505)'
default: `连接出错(${err.response.status})!`;
```

2. 返回200，成功根据业务code错误码code_message提示

## vue3 组合式API规范

应按如下顺序编写代码

* import 方法
* 定义变量
* 定义function
* watch、computed...等方法
* onMounted
* create

（尚待补充...）
