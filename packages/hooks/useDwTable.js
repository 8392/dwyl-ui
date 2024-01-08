import { reactive, ref, computed, inject, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getObjectKey, deepClone, areNestedStructuresEqual } from '~/utils/utils'

// 获取当前时间搓，记录路由query跳转改变
const getTimestampRouteQuery = (query = {}) => {
  return {
    ...query
    // timestamp: Date.now()
  }
}

// 请求参数、删除请求、弹窗标题
export default ({ defParams = {}, deleteApi, diaName, numberFields = [], arrFields = [] } = {}) => {
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
      const keyVal = resQeury[key]

      if (arrFields.includes(key)) {
        if (Array.isArray(keyVal)) {
          const resArr = keyVal.map(o => parseInt(o))
          resQeury[key] = resArr
        } else {
          const num = parseInt(keyVal)
          if (isNaN(num)) {
            resQeury[key] = ''
          } else {
            resQeury[key] = [num]
          }
        }
      }

      if (numberFields.includes(key)) {
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
        const data = dwTable.value.tableData
        const pageData = dwTable.value.pageData
        if (isHistorySearch.value) {
          if (pageData.page > 1 && data.length === 1) {
            router.replace({
              path: route.path,
              query: {
                ...route.query,
                [pageField.value]: 1
              }
            })
          } else {
            getList()
          }
        } else {
          getTable()
        }
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

  const onHistorySearch = () => {
    for (const key in params) {
      if (params[key] === '' || params[key] === null) {
        delete params[key]
      }
    }
    params[pageField.value] = 1

    console.log('测试', params)

    // 取得page--size判断query是否相等
    const obj1 = { ...params }
    const obj2 = { ...route.query }

    if (!obj1[limitField.value]) {
      obj1[limitField.value] = defaultLimit.value
    }

    if (!obj2[pageField.value]) {
      obj2[pageField.value] = 1
    }
    if (!obj2[limitField.value]) {
      obj2[limitField.value] = defaultLimit.value
    }

    const isEqual = areNestedStructuresEqual(obj1, obj2)
    // 取得page--size判断query是否相等

    if (isEqual) {
      getList()
    } else {
      router.push({
        path: route.path,
        query: getTimestampRouteQuery(params)
      })
    }
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
      onHistorySearch()
    } else {
      onSearch()
    }
  }

  watch(() => route.query, (newRoute, oldRoute) => {
    if (!isHistorySearch.value) {
      return
    }
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
        delete params[item]
      }
    })

    // 添加新增的
    for (const key in newRoute) {
      let keyVal = newRoute[key]

      if (arrFields.includes(key)) {
        if (Array.isArray(keyVal)) {
          const resArr = keyVal.map(o => parseInt(o))
          keyVal = resArr
        } else {
          const num = parseInt(keyVal)
          if (isNaN(num)) {
            keyVal = ''
          } else {
            keyVal = [num]
          }
        }
      }

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
