import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

export default (api, state) => {
  const formRef = ref()
  const form = ref({})
  const store = useUserStore()
  const errCallback = ref(null)
  const loading = ref(false)
  const router = useRouter()

  const onSubmit = async () => {
    await formRef.value.validate((valid, fields) => {
      if (valid) {
        if (!state.checked) {
          ElMessage.error('请勾选用户协议')
          return
        }
        loading.value = true
        api(form.value)
          .then((rs) => {
            ElMessage({
              message: '登录成功',
              type: 'success'
            })
            store.setToken(rs.data)
            /* 登录成功跳转到商城页面 */
            router.push('/productHome')
          })
          .catch((err) => {
            ElMessage({
              message: err.error_description,
              type: 'error'
            })
            errCallback.value && errCallback.value()
          }).finally(() => {
            loading.value = false
          })
      }
    })
  }
  return {
    form,
    formRef,
    onSubmit,
    loading,
    errCallback
  }
}
