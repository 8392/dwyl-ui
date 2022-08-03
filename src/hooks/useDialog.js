import { ref } from 'vue'

export default () => {
  const dialogVisible = ref(false)
  const handleClose = () => {
    dialogVisible.value = false
  }
  return {
    dialogVisible,
    handleClose
  }
}
