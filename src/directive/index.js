import permission from './permission'
import tooltip from './tooltip'
import loading from './loading'
export * from './permission'

export default {
  install (Vue) {
    Vue.directive('permission', permission)
    Vue.directive('tooltip', tooltip)
    Vue.directive('loading2', loading)
  }
}
