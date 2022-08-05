import { version as dwVersion } from '../package.json'
import * as utils from './utils'
import components from './components'
import hooks from './hooks'
import directive from './directive'
import 'uno.css'
/* 按需导入组件 */
export * from './components'

/* 常用工具函数 */
export const dwUtils = utils
/* 常用hooks */
export const dwHooks = hooks
/* 框架版本 */
export const version = dwVersion

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/* 全局注入组件 */
export default {
  install (Vue) {
    components.forEach((item) => {
      Vue.component(item.name, item)
    })
    for (const key in directive) {
      Vue.directive(key, directive[key])
    }
  }
}
