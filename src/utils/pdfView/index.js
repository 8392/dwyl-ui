import { render, createVNode } from 'vue'
import pdfViewIfarme from './pdfView.vue'

export const pdfView = (options = {}) => {
  /* 是字符串 */
  let srcStr = null
  if (typeof options === 'string') {
    srcStr = options
  } else {
    srcStr = options.src
  }
  const container = document.createElement('div')
  const props = {
    src: srcStr,
    close () {
      container.parentNode.removeChild(container)
      document.body.classList.remove('el-popup-parent--hidden')
      document.body.style.paddingRight = 0
    }
  }

  const vm = createVNode(pdfViewIfarme, props)
  render(vm, container)
  document.body.appendChild(container)
}
