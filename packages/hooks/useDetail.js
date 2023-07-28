import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import emitter from '@/utils/mitt'
import { useRouter, useRoute } from 'vue-router'

/*
* detailApi: api 接口 params 参数 callback 回调方法
*/
export default ({ api, callback, defForm, detailApi }) => {
  const route = useRoute()
  const router = useRouter()
  const form = ref(defForm || {})
  const subApi = ref(api)
  const formRef = ref()
  const formTitle = ref()
  const loading = ref(false)
  const onSubmit = async () => {
    await formRef.value.validate((valid, fields) => {
      if (valid) {
        if (loading.value) {
          return
        }
        loading.value = true
        subApi.value(form.value).then(rs => {
          loading.value = false
          ElMessage({
            message: '操作成功',
            type: 'success'
          })
          callback && callback(rs)
          router.go(-1)
        }).catch(() => {
          loading.value = false
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  onMounted(() => {
    const title = route.meta.title
    const obj = {
      permissionUrl: route.path,
      permissionName: '新增' + title
    }
    if (route.query.id) {
      obj.permissionName = '编辑' + title
      emitter.emit('routerBread', obj)
      formTitle.value = '编辑' + title
    } else {
      emitter.emit('routerBread', obj)
      formTitle.value = '新增' + title
    }
    if (route.query.id) {
      loading.value = true
      const params = detailApi.params ? detailApi.params : route.query.id
      detailApi.api(params).then(rs => {
        form.value = rs.data
        if (detailApi.callback) {
          form.value = detailApi.callback(rs.data)
        }
      }).finally(() => {
        loading.value = false
      })
    }
  })
  return {
    form,
    subApi,
    formRef,
    loading,
    formTitle,
    onSubmit
  }
}
