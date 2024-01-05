import { reactive, ref, computed, inject, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getObjectKey, deepClone } from '~/utils/utils'

// 请求参数、删除请求、弹窗标题
export default ({ defParams = {}, deleteApi, diaName, numberFields = [] } = {}) => {
  const configData = inject('projectConfigData')
  const vueRouter = computed(() => configData.value.vueRouter)

  const { useRouter, useRoute } = vueRouter.value || {}
  const router = useRouter?.()
  const route = useRoute?.()

  const tableConfig = computed(() => configData.value.table)
  const pageField = computed(() => tableConfig.value.pageField)
  const limitField = computed(() => tableConfig.value.limitField)
  const defaultLimit = computed(() => tableConfig.value.defaultLimit || 20)
  const isHistorySearch = computed(() => tableConfig.value.isHistorySearch)

  const dwTable = ref()
  const dialogVisible = ref(false)

  let params = reactive(deepClone({
    ...defParams
  }))

  if (isHistorySearch.value) {
    const resQeury = deepClone({
      ...route.query,
      ...defParams
    })

    for (const key in resQeury) {
      if (numberFields.includes(key)) {
        const keyVal = resQeury[key]
        const num = parseInt(keyVal)
        if (isNaN(num)) {
          resQeury[key] = ''
        } else {
          resQeury[key] = num
        }
      }
    }

    delete resQeury[pageField.value]
    delete resQeury[limitField.value]

    params = reactive(resQeury)
  }

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

  const onClose = () => {
    dialogVisible.value = false
  }

  const getList = () => {
    nextTick(() => {
      dwTable.value.getList()
    })
  }

  const onResetSearch = () => {
    for (const key in params) {
      /* 通过循环对象，改变属性，让其不失去响应式 */
      if (defParams[key]) {
        params[key] = defParams[key]
      } else {
        delete params[key]
      }
    }

    if (isHistorySearch.value) {
      const queryData = {
        ...params
      }
      const routeQuery = route.query
      delete queryData[pageField.value]
      delete queryData[limitField.value]
      delete routeQuery[pageField.value]
      delete routeQuery[limitField.value]
      const oldQuery = JSON.stringify(queryData)
      const currQuery = JSON.stringify(routeQuery)
      if (oldQuery === currQuery) {
        getTable()
      } else {
        router.push({
          path: route.path,
          query: queryData
        })
      }
    } else {
      onSearch()
    }
  }

  const onHistorySearch = () => {
    const routeQuery = route.query
    params[pageField.value] ? params[pageField.value] = parseInt(params[pageField.value]) : params[pageField.value] = 1
    routeQuery[pageField.value] ? routeQuery[pageField.value] = parseInt(routeQuery[pageField.value]) : routeQuery[pageField.value] = 1
    params[limitField.value] ? params[limitField.value] = parseInt(params[limitField.value]) : params[limitField.value] = defaultLimit.value
    routeQuery[limitField.value] ? routeQuery[limitField.value] = parseInt(routeQuery[limitField.value]) : routeQuery[limitField.value] = defaultLimit.value

    const oldQuery = JSON.stringify(params)
    const currQuery = JSON.stringify(routeQuery)

    if (oldQuery === currQuery) {
      params[pageField.value] = 1
      getList()
    } else {
      params[pageField.value] = 1
      router.push({
        path: route.path,
        query: params
      })
    }
  }

  watch(() => route.query, (newRoute, oldRoute) => {
    const newRouteArr = Object.keys(newRoute)
    const oldRouteArr = Object.keys(oldRoute)
    if (!newRouteArr.includes(pageField.value)) {
      newRoute[pageField.value] = 1
    }

    // 减少的路由key
    const reduceRouteArr = oldRouteArr.filter(o => !newRouteArr.includes(o))

    // 去掉没有的
    reduceRouteArr.forEach(item => {
      if (item !== pageField.value && item !== limitField.value) {
        params[item] = null
      }
    })

    // 添加新增的
    for (const key in newRoute) {
      let keyVal = newRoute[key]
      if (numberFields.includes(key)) {
        const num = parseInt(keyVal)
        if (isNaN(num)) {
          keyVal = ''
        } else {
          keyVal = num
        }
      }
      if (key === pageField.value) {
        if (keyVal) {
          keyVal = parseInt(keyVal)
        } else {
          keyVal = 1
        }
      }
      if (key === limitField.value) {
        if (keyVal) {
          keyVal = parseInt(keyVal)
        } else {
          keyVal = defaultLimit.value
        }
      }
      params[key] = keyVal
    }

    getList()
  }, {
    deep: true
  })

  return {
    params,
    dialogVisible,
    updatePage,
    onSearch,
    onHistorySearch,
    onResetSearch,
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
