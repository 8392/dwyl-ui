import { reactive, ref, computed, inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getObjectKey, deepClone } from '~/utils/utils'
// import { useRouter } from 'vue-router'

// 请求参数、删除请求、弹窗标题
export default ({ defParams, deleteApi, diaName, page } = {}) => {
  const configData = inject('projectConfigData')
  const tableConfig = computed(() => configData.value.table)
  const pageField = computed(() => tableConfig.value.pageField)
  // const router = useRouter()
  const dwTable = ref()
  const dialogVisible = ref(false)
  const params = reactive(defParams || {})
  const currentItem = ref(null)
  const diaTitle = ref('')
  const onSearch = () => {
    params[pageField.value] = 1
    getTable()
  }
  const getTable = () => {
    dwTable.value.refresh()
  }
  const onDelete = (e, key) => {
    const id = key ? getObjectKey(e, key) : e.id
    ElMessageBox.confirm('确定要删除吗?', '操作提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
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
    currentItem.value = deepClone(e)
    dialogVisible.value = true
  }

  const onAdd = () => {
    diaTitle.value = '新增' + diaName
    currentItem.value = null
    dialogVisible.value = true
  }

  // const goEdit = id => {
  //   router.push(page + `?id=${id}`)
  // }

  // const goAdd = () => {
  //   router.push(page)
  // }

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
    // goEdit,
    // goAdd
  }
}
