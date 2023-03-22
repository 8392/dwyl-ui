import { render, createVNode } from 'vue'
import importExcelVue from './importExcel.vue'
import FormData from 'form-data'

export const importExcel = (options = {}) => {
  /* 是字符串 */
  const container = document.createElement('div')
  const props = {
    ...options,
    close () {
      container.parentNode.removeChild(container)
      document.body.classList.remove('el-popup-parent--hidden')
      document.body.style.paddingRight = 0
    },
    success (val) {
      const formData = new FormData()
      formData.append('file', val)
      options.success && options.success({
        formData,
        file: val
      }, props.close)
    }
  }

  const vm = createVNode(importExcelVue, props)
  render(vm, container)
  document.body.appendChild(container)
}
