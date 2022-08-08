
import { h, ref, render, createApp, nextTick } from 'vue'

const renderLoading = {
  props: {
    background: String,
    text: String
  },
  setup (props) {
    return () => {
      return (
        <div style={{ background: props.background }} class="w h-300px flex-col flex-center">
          <img src="http://samherbert.net/svg-loaders/svg-loaders/bars.svg" alt="" />
          <span class="lh-60px color-#fff">{props.text}</span>
        </div>
      )
    }
  }
}

let triggerFather = null
const getLoading = (trigger, binding) => {
  const { value } = binding
  // if (triggerFather && value) return
  const vnode = h(renderLoading, { background: '#000', text: '加载中' })
  const app = createApp(vnode)
  const div = app.mount(document.createElement('div'))
  div.$el.setAttribute('id', 'dwLoadingId')
  if (value) {
    triggerFather = trigger.parentNode
    triggerFather.replaceChild(div.$el, trigger)
  } else {
    const childDiv = triggerFather.querySelector('#dwLoadingId')
    triggerFather.replaceChild(trigger, childDiv)
  }
}

export default {
  mounted (el, binding) {
    // getLoading(el, binding)
  },
  updated (el, binding) {
    getLoading(el, binding)
  }
}
