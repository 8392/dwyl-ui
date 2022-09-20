<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <el-table
      ref="dwTableRef"
      v-dwloading="tableLoading"
      class="flex-1"
      empty-text=" "
      :height="height"
      :data="tableData"
      v-bind="$attrs"
      :header-cell-style="{color: 'var(--dw-table-header-color)', backgroundColor: 'var(--dw-table-header-bg)'}"
      :cell-style="{color: 'var(--dw-table-column-bg)'}"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
    >
      <template v-for="item in columnList" :key="item.prop">
        <!-- <el-table-column :show-overflow-tooltip="!item.slot && !item.render" v-bind="item"> -->
        <el-table-column v-if="item.showCol" :className="(!item.slot && !item.render && item.showOverflowToolip) ? 'dwTableCol' : ''" v-bind="item">
          <template #default="scoped">
            <slot v-if="item.slot" :name="item.slot" v-bind="scoped"></slot>
            <Render v-if="item.render" :row="scoped" :render="item.render" />
          </template>
        </el-table-column>
      </template>
      <template v-if="!tableLoading" #empty>
        <EmptyStatus type="No_DATA" class="bg-#dwboxbg pa-20px rounded flex-1 flex-center" />
      </template>
    </el-table>
    <DwPagination
      v-if="props.isPage && total !== 0"
      :current-page="pageData[pageField]"
      :page-size="pageData[limitField]"
      :total="total"
      @current-change="clickPage"
    />

    <el-tooltip
      ref="tooltipRef"
      :visible="visible"
      :virtual-ref="buttonRef"
      effect="light"
      placement="top"
      virtual-triggering
    >
      <template #content>
        <div class="max-w-300px lh-22px">{{ tooltipText }}</div>
      </template>
    </el-tooltip>
  </div>
</template>

<script lang='jsx' setup>
import { ref, computed } from 'vue'
import { ElTable, ElTableColumn, ElTooltip } from 'element-plus'
import DwPagination from '../DwPagination'
import Render from './render'
import EmptyStatus from '../EmptyStatus'
import { judgeTextOverflow } from '../../utils/utils'
import useList, { listProps, listEmit } from '~/components/hooks/useList'

defineOptions({
  name: 'DwTable'
})

const props = defineProps({
  column: Array,
  height: {
    type: [Number, String],
    default: '100%'
  },
  ...listProps
})
const dwTableRef = ref(null)
const columnList = computed(() => {
  return props.column.map(item => {
    if (item.showOverflowToolip !== false) {
      item.showOverflowToolip = true
    }
    if (item.showCol !== false) {
      item.showCol = true
    }
    return item
  })
})

const emits = defineEmits(listEmit)

const { pageField, limitField, tableData, total, tableLoading, pageData, getList, clickPage, refresh } = useList(props, emits)

getList()

const buttonRef = ref()
const tooltipRef = ref()

const visible = ref(false)
const tooltipText = ref(null)

/* 进入单元格 */
const handleCellMouseEnter = (row, column, cell, e) => {
  if (column.className !== 'dwTableCol') {
    return
  }
  const cellChild = e.currentTarget.querySelector('.cell')
  const hasText = judgeTextOverflow(cellChild)
  if (hasText) {
    buttonRef.value = e.currentTarget
    visible.value = true
    tooltipText.value = e.target.innerText
  }
}

/* 离开单元格 */
const handleCellMouseLeave = (e, row) => {
  visible.value = false
}

defineExpose({
  getList,
  refresh,
  pageData,
  dwTableRef
})

</script>

<style lang="scss">

.el-popper.is-tabtoolcustomized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-tabtoolcustomized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}

.dwTableCol {
  .cell {
    white-space: nowrap !important;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
  }
}

.el-table__empty-block {
  height: auto !important;
}

</style>
