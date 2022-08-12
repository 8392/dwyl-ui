import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export default (api, context, callback) => {
  const form = ref({})
  const subApi = ref(api)
  const editRef = ref()
  const loading = ref(false)
  const onSubmit = async () => {
    await editRef.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
        if (loading.value) {
          return
        }
        loading.value = true
        subApi
          .value(form.value)
          .then(rs => {
            ElMessage({
              message: '操作成功',
              type: 'success'
            })
            callback && callback()
            context.emit('submit')
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  return {
    form,
    subApi,
    editRef,
    onSubmit
  }
}
