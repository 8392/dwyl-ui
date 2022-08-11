import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getObjectKey } from '~/utils/utils'

// 请求参数、删除请求、列表回调
export default ({ defParams, deleteApi, diaName } = {}) => {
  const dwTable = ref()
  const dialogVisible = ref(false)
  const params = reactive(defParams || { limit: 20, page: 1 })
  const currentItem = ref(null)
  const diaTitle = ref('')
  const onSearch = () => {
    params.page = 1
    getTable()
  }
  const getTable = () => {
    dwTable.value.refresh()
  }
  const onDelete = (e, key) => {
    const id = key ? getObjectKey(e, key) : e.id
    ElMessageBox.confirm('确定要删除吗?', '操作提示').then(() => {
      deleteApi(id).then(rs => {
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

  return {
    params,
    dialogVisible,
    updatePage,
    onSearch,
    onDelete,
    onAdd,
    onEdit,
    onClose,
    currentItem,
    diaTitle,
    dwTable
  }
}
