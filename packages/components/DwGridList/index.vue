<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <el-scrollbar v-dwloading="tableLoading" class="flex-1">
      <DwGrid :minWidth="minWidth" :columnGap="columnGap" :rowGap="rowGap" @sizeChange="onSizeChange">
        <DwCol v-for="item in tableData" :key="item.id">
          <slot v-bind="{ row: item }"></slot>
        </DwCol>
      </DwGrid>
    </el-scrollbar>
    <DwEmpty v-if="tableData.length === 0 && !tableLoading" class="h-full" type="noData" />
    <DwPagination
      v-if="props.isPage && total !== 0"
      :current-page="pageData[pageField]"
      :page-size="pageData[limitField]"
      :total="total"
      @current-change="clickPage"
    />
  </div>
</template>

<script lang="jsx" setup>
import { ref, reactive, watch, watchEffect, computed, nextTick, inject } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'
import DwGrid from '~/components/DwGrid'
import DwCol from '~/components/DwGrid/DwCol'
import DwPagination from '~/components/DwPagination'
import DwEmpty from '~/components/DwEmpty'
import { getObjectKey } from '~/utils/utils'

defineOptions({
  name: 'DwGridList'
})

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
  minWidth: Number,
  columnGap: {
    type: Number,
    default: 20
  },
  rowGap: {
    type: Number,
    default: 20
  },
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

const onSizeChange = (e) => {
  pageData[tableConfig.value.limitField] = e * 5
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

defineExpose({
  getList,
  refresh,
  pageData
})

</script>

<style lang="scss" scoped>

</style>
