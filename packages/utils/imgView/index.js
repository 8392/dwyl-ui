import { render, createVNode } from 'vue'
import ElImageViewer from './imgView.vue'

export const dwImgView = (options = [], index = 0) => {
  if (!options || options.length === 0) return
  /* 是字符串 */
  let previewSrcList = []
  let prevOverflow = null
  if (typeof options === 'string') {
    previewSrcList = [options]
  }
  if (Array.isArray(options)) {
    previewSrcList = options
  }
  const container = document.createElement('div')
  const props = {
    previewSrcList,
    initialIndex: index,
    close () {
      container.parentNode.removeChild(container)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = 0
    }
  }

  const vm = createVNode(ElImageViewer, props)
  prevOverflow = document.body.style.overflow
  render(vm, container)
  document.body.appendChild(container)
  document.body.style.overflow = 'hidden'
}
