// 导入组件
import DwSteps from './DwSteps/index.vue'
import DwStep from './DwSteps/DwStep.vue'

import 'uno.css'

const modules = [

  {
    name: 'DwSteps',
    path: DwSteps
  },
  {
    name: 'DwStep',
    path: DwStep
  }

]

const install = (Vue) => {
  modules.forEach((item) => {
    Vue.component(item.name, item.path)
  })
}

const dwylUi = {
  version: '0.0.1',
  install
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  // 导出的对象必须具有 install，才能被 app.use() 方法安装
  install,
  // 以下是具体的组件列表
  DwSteps,
  DwStep
}

export default dwylUi
