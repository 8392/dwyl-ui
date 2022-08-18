import components from '~/components'
import directive from '~/directive'
import 'uno.css'
import '~/styles/common/index.scss'
export { default as dwUtils } from '~/utils'
export { default as dwHooks } from '~/hooks'
export { version } from '../package.json'
export { DwLoading } from '~/directive/loading'
/* 按需导入组件 */
export * from '~/components'

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
