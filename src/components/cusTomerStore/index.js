import { reactive } from 'vue'

export const testObj = reactive({
  city: '成都'
})

export const handleBtn = () => {
  testObj.city = '重庆'
}
