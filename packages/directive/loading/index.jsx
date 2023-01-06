
import { h, ref, render, createApp, nextTick } from 'vue'
import { useZIndex } from 'element-plus'
import loadingSvg from './loadingSvg'

const renderLoading = {
  props: {
    background: String,
    text: String
  },
  setup (props) {
    const { nextZIndex } = useZIndex()
    const currIndex = nextZIndex()
    return () => {
      return (
        <div class="dwloadingmain absolute top-0 left-0 wh-full flex-col flex-center" style={{ zIndex: currIndex }}>
          <loadingSvg />
          {
            props.text && <span class="color-primary font-600">{props.text}</span>
          }
        </div>
      )
    }
  }
}

const createInstance = async (trigger, binding) => {
  const { value, oldValue } = binding
  if (oldValue !== value) {
    if (value && !oldValue) {
      const vnode = h(renderLoading, { background: '#000' })
      const app = createApp(vnode)
      const loadingEl = app.mount(document.createElement('div')).$el
      loadingEl.setAttribute('id', 'dwLoadingId')
      trigger.style.position = 'relative'
      trigger.appendChild(loadingEl)
      // nextTick(() => {
      //   const triggerH = trigger.offsetHeight
      //   if (triggerH < 200) {
      //     trigger.classList.add('!h-320px')
      //   }
      // })
    } else {
      const childDiv = trigger.querySelector('#dwLoadingId')
      trigger.removeChild(childDiv)
      // trigger.classList.remove('!h-320px')
    }
  }
}

export default {

  mounted (el, binding) {
    if (binding.value) {
      createInstance(el, binding)
    }
  },
  updated (el, binding) {
    createInstance(el, binding)
  },
  unmounted (el) {
    // el[INSTANCE_KEY]?.instance.close()
  }
}

export const DwLoading = {
  el: null,
  service ({ text, background = '#ccc' } = { }) {
    const vnode = h(<renderLoading />, { text })
    // const app = createApp(vnode)
    // const div = app.mount(document.createElement('div')).$el
    const div = document.createElement('div')
    render(vnode, div)

    document.body.appendChild(div)
    this.el = div
    return DwLoading
  },
  close () {
    document.body.removeChild(this.el)
  }
}
