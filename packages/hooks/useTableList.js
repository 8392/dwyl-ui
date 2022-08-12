import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 请求参数、列表请求、删除请求、列表回调
export default (defParams, listApi, deleteApi, callback) => {
  const state = reactive({
    tableData: [],
    total: 0
  })
  const dialogVisible = ref(false)
  const loading = ref(false)
  const params = reactive(defParams || { limit: 10, page: 1 })
  const tableData = computed(() => state.tableData)
  const total = computed(() => state.total)

  const onSearch = () => {
    params.page = 1
    getTable()
  }
  const getTable = () => {
    loading.value = true
    listApi(params).then(rs => {
      state.total = Number(rs.data.total)
      state.tableData = rs.data.records
      loading.value = false
      callback && callback(rs.data.records)
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
  const onPageChange = e => {
    params.page = e
    getTable()
  }
  const updatePage = () => {
    getTable()
    dialogVisible.value = false
  }

  getTable()

  return {
    total,
    params,
    loading,
    tableData,
    dialogVisible,
    updatePage,
    onSearch,
    onDelete,
    onPageChange
  }
}
