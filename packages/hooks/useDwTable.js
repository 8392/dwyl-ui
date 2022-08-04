import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 请求参数、删除请求、列表回调
export default (defParams, deleteApi) => {
  const dwTable = ref()
  const dialogVisible = ref(false)
  const params = reactive(defParams || { limit: 10, page: 1 })
  const onSearch = () => {
    params.page = 1
    getTable()
  }
  const getTable = () => {
    dwTable.value.refresh()
  }
  const onDelete = e => {
    ElMessageBox.confirm('确定要删除吗?', '操作提示').then(() => {
      deleteApi(e.id).then(rs => {
        ElMessage({
          message: '操作成功',
          type: 'success'
        })
        getTable()
      })
    })
  }

  const updatePage = () => {
    getTable()
    dialogVisible.value = false
  }

  return {
    params,
    dialogVisible,
    updatePage,
    onSearch,
    onDelete,
    dwTable
  }
}
