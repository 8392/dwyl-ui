
import { ref, defineAsyncComponent } from 'vue'

export const testJson = [{
  id: 1,
  api: defineAsyncComponent(() => import('./Child1.vue')),
  name: '按钮1'
}, {
  id: 2,
  api: defineAsyncComponent(() => import('./Child2.vue')),
  name: '按钮2'
}]
