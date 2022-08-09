import { reactive, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 请求参数、列表请求、删除请求、列表回调
export default ({
  defParams,
  listApi,
  deleteApi,
  callback,
  diaName
}) => {
  const total = ref(0)
  const listData = ref([])
  const dialogVisible = ref(false)
  const loading = ref(false)
  const params = reactive(defParams || { limit: 10, page: 1 })
  const diaTitle = ref('')
  const currentItem = ref(null)
  const isAdd = computed(() => !currentItem.value)

  const onSearch = () => {
    params.page = 1
    getTable()
  }
  const getTable = () => {
    loading.value = true
    listApi(params).then(rs => {
      rs.data.total ? total.value = Number(rs.data.total) : ''
      listData.value = rs.data.records
      loading.value = false
      callback && callback(rs.data.records)
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
  const onEdit = e => {
    diaTitle.value = '编辑' + diaName
    currentItem.value = e
    dialogVisible.value = true
  }

  const onAdd = () => {
    diaTitle.value = '新增' + diaName
    currentItem.value = null
    dialogVisible.value = true
  }

  const onClose = () => {
    dialogVisible.value = false
  }

  // getTable()

  return {
    params, // 列表请求参数
    loading, // 加载状态
    total, // 总数
    dialogVisible, // 模态框显示/隐藏
    isAdd, // 是否新增
    updatePage, // 刷新列表
    onSearch, // 搜索
    onPageChange, // 翻页
    onDelete, // 删除
    onAdd, // 新增
    onClose, // 关闭弹窗
    getTable, // 获取列表
    onEdit, // 编辑
    listData, // 列表数据
    diaTitle, // 弹窗标题
    currentItem // 选中item
  }
}
