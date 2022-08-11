import { reactive, ref, computed, inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getObjectKey } from '~/utils/utils'

// 请求参数、列表请求、删除请求、列表回调
export default ({
  defParams,
  listApi,
  deleteApi,
  callback,
  diaName
}) => {
  const configData = inject('projectConfigData')
  const tableConfig = computed(() => configData.value.table)
  const pageField = computed(() => tableConfig.value.pageField)
  const limitField = computed(() => tableConfig.value.limitField)
  const totalField = computed(() => tableConfig.value.totalField)
  const dataField = computed(() => tableConfig.value.dataField)

  const total = ref(0)
  const listData = ref([])
  const dialogVisible = ref(false)
  const loading = ref(false)
  const params = reactive(defParams || { [limitField.value]: 10, [pageField.value]: 1 })
  const diaTitle = ref('')
  const currentItem = ref(null)
  const isAdd = computed(() => !currentItem.value)

  const onSearch = () => {
    params[pageField.value] = 1
    getTable()
  }
  const getTable = async () => {
    try {
      loading.value = true
      const rs = await listApi(params)
      listData.value = getObjectKey(rs, dataField.value)
      total.value = Number(getObjectKey(rs, totalField.value))
      callback && callback(listData.value)
    } finally {
      loading.value = false
    }
  }

  const onPageChange = e => {
    params[pageField.value] = e
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
