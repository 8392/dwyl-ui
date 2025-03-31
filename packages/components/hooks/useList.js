import { ref, reactive, watch, watchEffect, computed, nextTick, inject } from 'vue'
import { getObjectKey } from '~/utils/utils'
import { useUrlSearchParams } from '@vueuse/core'

export const listProps = {
  params: Object,
  api: Function,
  loading: {
    /* 没传，默认设置undefined */
    type: Boolean,
    default ({ city }) {
      return city
    }
  },
  isHistorySearch: {
    type: Boolean,
    default: true
  },
  isPage: {
    type: Boolean,
    default: true
  }
}

export const listEmit = ['update:loading', 'callback']

export default (props, emits) => {
  const configData = inject('projectConfigData')
  const vueRouter = computed(() => configData.value.vueRouter)

  const { useRouter, useRoute } = vueRouter.value || {}
  const router = useRouter?.()
  const route = useRoute?.()

  const tableConfig = computed(() => configData.value.table)
  const pageField = computed(() => tableConfig.value.pageField)
  const limitField = computed(() => tableConfig.value.limitField)
  const totalField = computed(() => tableConfig.value.totalField)
  const dataField = computed(() => tableConfig.value.dataField)
  const isHistorySearch = computed(() => tableConfig.value.isHistorySearch)
  const searchParams = useUrlSearchParams('history')

  const tableData = ref([])
  const total = ref(0)
  const tableLoading = ref(true)
  const searchPage = computed(() => Number(searchParams.page || 1))
  const defaultPage = ref({
    [tableConfig.value.pageField]: searchPage.value,
    [tableConfig.value.limitField]: tableConfig.value.defaultLimit || 20
  })
  const pageData = ref({ ...defaultPage.value })

  if (props.isPage) {
    if (!props?.params?.page) {
      props.params[tableConfig.value.pageField] = pageData.value[tableConfig.value.pageField]
    }
    if (!props?.params?.size) {
      props.params[tableConfig.value.limitField] = pageData.value[tableConfig.value.limitField]
    }
  }

  watchEffect(() => {
    const { loading } = props
    if (loading !== undefined) {
      tableLoading.value = loading
    } else {
      tableLoading.value = false
    }
  })

  watchEffect(() => {
    pageData.value = {
      ...defaultPage.value,
      ...props.params
    }
    // Object.assign(pageData, props.params)
  })

  /* 获取列表数据 */
  const getList = async () => {
    if (!props.api) {
      return
    }
    try {
      emits('update:loading', true)
      tableLoading.value = true
      let queryData = pageData.value
      if (!props.isPage) {
        queryData = props.params
      }
      const resData = await props.api(queryData)
      if (props.isPage) {
        tableData.value = getObjectKey(resData, dataField.value)
        total.value = Number(getObjectKey(resData, totalField.value))
      } else {
        tableData.value = resData.data
      }
      emits('callback', tableData.value, tableData, total.value)
    } finally {
      emits('update:loading', false)
      tableLoading.value = false
    }
  }

  /* 点击当前页 */
  const clickPage = (e) => {
    if (isHistorySearch.value && props.isHistorySearch) {
      router.replace({
        path: route.path,
        query: {
          ...route.query,
          [tableConfig.value.pageField]: e
        }
      })
    } else {
      // searchParams[tableConfig.value.pageField] = e
      pageData.value[tableConfig.value.pageField] = e
      props.params[tableConfig.value.pageField] = e
      getList()
    }
  }

  const clickPageSize = (e) => {
    pageData.value[tableConfig.value.pageField] = 1
    props.params[tableConfig.value.pageField] = 1
    pageData.value[tableConfig.value.limitField] = e
    props.params[tableConfig.value.limitField] = e
    getList()
  }

  /* 刷新 */
  const refresh = () => {
    // if (props.isPage) {
    //   if (router) {
    //     router.replace({
    //       path: route.path,
    //       query: {
    //         ...route.query,
    //         [tableConfig.value.pageField]: 1
    //       }
    //     })
    //   }
    //   pageData.value[tableConfig.value.pageField] = 1
    // }
    nextTick(() => {
      getList()
    })
  }

  return {
    configData,
    tableConfig,
    pageField,
    limitField,
    totalField,
    clickPageSize,
    dataField,
    searchParams,
    tableData,
    total,
    tableLoading,
    searchPage,
    pageData,
    isHistorySearch: props?.isHistorySearch,
    getList,
    clickPage,
    refresh
  }
}
