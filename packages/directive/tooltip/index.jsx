
import { h, ref, render } from 'vue'
import { judgeTextOverflow, on } from '../../utils/utils'
import { ElTooltip } from 'element-plus'

const getTooltip = (trigger, binding) => {
  const { value } = binding
  const tooltipRef = ref(null)
  const visible = ref(false)

  let timer = null
  const enterDiv = () => {
    if (timer) {
      clearTimeout(timer)
    } else {
      visible.value = true
    }
  }

  const setTimer = () => {
    timer = setTimeout(() => {
      visible.value = false
      timer = null
    }, 400)
  }

  const leaveDiv = () => {
    setTimer()
  }
  const jsxDiv = () => {
    return <ElTooltip
      ref={tooltipRef}
      v-model:visible={visible.value}
      virtual-ref={trigger}
      virtual-triggering
      effect="light"
      placement="top"
      trigger="hover"
      v-slots={{
        content () {
          return <div className='max-w-300px' onmouseenter={enterDiv} onmouseleave={leaveDiv}>{value}</div>
        }
      }}
    >
    </ElTooltip>
  }
  if (judgeTextOverflow(trigger)) {
    on(trigger, 'mouseenter', () => {
      if (typeof value === 'string') {
        if (timer) {
          clearTimeout(timer)
        } else {
          visible.value = true
          render(h(jsxDiv), document.body)
        }
      } else {
        trigger.title = value.title
      }
    })

    on(trigger, 'mouseleave', () => {
      setTimer()
    })
  }
}

export default {
  mounted (el, binding) {
    getTooltip(el, binding)
  },
  updated (el, binding) {
    getTooltip(el, binding)
  }
}
