import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default (defParams, listApi, deleteApi) => {
  const dialogVisible = ref(false)
  const params = ref(defParams)
  const tableData = ref([])
  const loading = ref(false)

  const getTable = () => {
    loading.value = true
    listApi(params.value).then(rs => {
      tableData.value = rs.data
    }).finally(() => {
      loading.value = false
    })
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
  const onSearch = () => {
    getTable()
  }
  const updatePage = () => {
    getTable()
    dialogVisible.value = false
  }
  const handleClose = () => {
    dialogVisible.value = false
  }

  getTable()

  return {
    params,
    loading,
    tableData,
    dialogVisible,
    onSearch,
    handleClose,
    updatePage,
    onDelete,
    getTable
  }
}
