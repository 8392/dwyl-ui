
import { h, ref, render, createApp, nextTick } from 'vue'
import loadingSvg from './loadingSvg'

const renderLoading = {
  props: {
    background: String,
    text: String
  },
  setup (props) {
    return () => {
      return (
        <div class="loadingbg absolute top-0 left-0 wh-full flex-col flex-center">
          <loadingSvg />
          {/* <span class="color-#fff">{props.text}</span> */}
        </div>
      )
    }
  }
}

const createInstance = (trigger, binding) => {
  const { value, oldValue } = binding

  // if (value) {
  //   if (!hasLoading) {
  //     trigger.style.position = 'relative'
  //     trigger.appendChild(loadingEl)
  //   }
  // } else {
  //   const childDiv = trigger.querySelector('#dwLoadingId')
  //   trigger.removeChild(childDiv)
  //   // triggerFather.replaceChild(trigger, childDiv)
  // }

  if (oldValue !== value) {
    if (value && !oldValue) {
      const vnode = h(renderLoading, { background: '#000', text: '加载中' })
      const app = createApp(vnode)
      const loadingEl = app.mount(document.createElement('div')).$el
      loadingEl.setAttribute('id', 'dwLoadingId')
      const hasLoading = trigger.querySelector('#dwLoadingId')
      trigger.style.position = 'relative'
      trigger.appendChild(loadingEl)
    } else if (value && oldValue) {
      console.log('BBB')
    } else {
      // instance?.instance.close()
      // console.log('CCC')
      const childDiv = trigger.querySelector('#dwLoadingId')
      trigger.removeChild(childDiv)
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
