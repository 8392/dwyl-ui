import { reactive } from 'vue'

export const testObj = reactive({
  city: 'ζι½'
})

export const handleBtn = () => {
  testObj.city = 'ιεΊ'
}
