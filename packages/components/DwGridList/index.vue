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
import DwGrid from '~/components/DwGrid'
import DwCol from '~/components/DwGrid/DwCol'
import DwPagination from '~/components/DwPagination'
import DwEmpty from '~/components/DwEmpty'
import useList, { listProps, listEmit } from '~/components/hooks/useList'

defineOptions({
  name: 'DwGridList'
})

const props = defineProps({
  ...listProps,
  minWidth: Number,
  lineCount: {
    type: Number,
    default: 5
  },
  columnGap: {
    type: Number,
    default: 20
  },
  rowGap: {
    type: Number,
    default: 20
  }
})

const emits = defineEmits(listEmit)

const { tableConfig, pageField, limitField, tableData, total, tableLoading, pageData, getList, clickPage, refresh } = useList(props, emits)

const onSizeChange = (e) => {
  pageData.value[tableConfig.value.limitField] = e * props.lineCount
  props.params[tableConfig.value.limitField] = e * props.lineCount
  getList()
}

defineExpose({
  getList,
  refresh,
  pageData
})

</script>

<style lang="scss" scoped>

</style>
