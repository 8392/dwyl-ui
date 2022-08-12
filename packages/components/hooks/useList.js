import { ref, reactive, watch, watchEffect, computed, nextTick, inject, defineProps } from 'vue'
import { getObjectKey } from '~/utils/utils'
import { useUrlSearchParams } from '@vueuse/core'

export default () => {
  const configData = inject('projectConfigData')
  const tableConfig = computed(() => configData.value.table)
  const pageField = computed(() => tableConfig.value.pageField)
  const limitField = computed(() => tableConfig.value.limitField)
  const totalField = computed(() => tableConfig.value.totalField)
  const dataField = computed(() => tableConfig.value.dataField)
  const searchParams = useUrlSearchParams('hash')

  const props = defineProps({
    params: Object,
    api: Function,
    loading: {
      /* 没传，默认设置undefined */
      type: Boolean,
      default ({ city }) {
        return city
      }
    },
    isPage: {
      type: Boolean,
      default: true
    }
  })

  const tableData = ref([])
  const total = ref(0)
  const tableLoading = ref(true)
  const searchPage = computed(() => Number(searchParams.page || 1))
  const pageData = reactive({
    [tableConfig.value.pageField]: searchPage.value,
    [tableConfig.value.limitField]: 20
  })

  watchEffect(() => {
    const { loading } = props
    if (loading !== undefined) {
      tableLoading.value = loading
    } else {
      tableLoading.value = false
    }
  })

  watchEffect(() => {
    Object.assign(pageData, props.params)
  })

  const emit = defineEmits(['update:loading', 'callback'])

  /* 获取列表数据 */
  const getList = async () => {
    if (!props.api) {
      return
    }
    try {
      emit('update:loading', true)
      tableLoading.value = true

      const resData = await props.api({
        ...pageData
      // ...props.params
      })

      tableData.value = getObjectKey(resData, dataField.value)
      total.value = Number(getObjectKey(resData, totalField.value))
      emit('callback', tableData.value)
    } finally {
      emit('update:loading', false)
      tableLoading.value = false
    }
  }

  /* 点击当前页 */
  const clickPage = (e) => {
    searchParams.page = e
    pageData[tableConfig.value.pageField] = e
    getList()
  }

  /* 刷新 */
  const refresh = () => {
    searchParams.page = 1
    pageData[tableConfig.value.pageField] = 1
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
    dataField,
    searchParams,
    tableData,
    total,
    tableLoading,
    searchPage,
    pageData,
    listProps: props,

    getList,
    clickPage,
    refresh

  }
}
