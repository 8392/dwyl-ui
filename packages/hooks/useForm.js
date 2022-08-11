import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// import * as _ from 'lodash'
import { deepClone } from '~/utils/utils'

export default ({ api, callback, defForm = {} }) => {
  const form = ref(_.deepClone(defForm))
  const subApi = ref(api)
  const editRef = ref()
  const loading = ref(false)

  const onReset = () => {
    form.value = _.deepClone(defForm.value)
  }
  const onSubmit = async () => {
    await editRef.value.validate((valid, fields) => {
      if (valid) {
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
    loading,
    onReset,
    onSubmit
  }
}
