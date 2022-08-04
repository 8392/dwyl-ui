// 导入组件
import DwButton from './DwButton/index.vue'
import DwSteps from './DwSteps/index.vue'
import DwStep from './DwSteps/DwStep.vue'
import DwTable from './DwTable'
import DwDialog from './DwDialog'

import 'uno.css'

const modules = [
  {
    name: 'DwButton',
    path: DwButton
  },
  {
    name: 'DwSteps',
    path: DwSteps
  },
  {
    name: 'DwStep',
    path: DwStep
  },
  {
    name: 'DwTable',
    path: DwTable
  },
  {
    name: 'DwDialog',
    path: DwDialog
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
