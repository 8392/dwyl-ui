<template>
  <div>
    <el-table
      v-loading="tableLoading"
      empty-text=" "
      :data="tableData"
      v-bind="$attrs"
      :header-cell-style="{color: '#292A2C', backgroundColor: '#f2f3f5'}"
      :cell-style="{color: '#1D2129'}"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      >
      <template :key="item.prop" v-for="item in column" >
        <!-- <el-table-column :show-overflow-tooltip="!item.slot && !item.render" v-bind="item"> -->
        <el-table-column :className="(!item.slot && !item.render) ? 'dwTableCol' : ''" v-bind="item">
          <template #default="scoped">
            <slot :name="item.slot" v-bind="scoped" v-if="item.slot"></slot>
            <Render :row="scoped" :render="item.render" v-if="item.render" />
          </template>
        </el-table-column>
      </template>
      <template #empty v-if="!tableLoading">
        <!-- 站务数据 -->
        <EmptyStatus type="No_DATA" class="bg-#dwboxbg pa-20px rounded flex-1 flex-center" />
      </template>
    </el-table>
    <DwPagination
      v-if='props.isPage && total !== 0'
      v-model:current-page="pageData.pageNumber"
      v-model:page-size="pageData.pageSize"
      :total="total"
      @current-change="clickPage"
    />

    <el-tooltip
      ref="tooltipRef"
      v-model:visible="visible"
      :virtual-ref="buttonRef"
      effect="light"
      placement="top"
      virtual-triggering
    >
      <template #content>
        <div class="max-w-300px lh-22px">{{tooltipText}}</div>
      </template>
    </el-tooltip>

  </div>
</template>

<script lang='jsx' setup>
import { ref, reactive, watch, watchEffect, computed, nextTick } from 'vue'
import Render from './render'
import EmptyStatus from '@/components/EmptyStatus'
import { judgeTextOverflow } from '@/utils/utils'
import { useUrlSearchParams } from '@vueuse/core'
const searchParams = useUrlSearchParams('hash')
const props = defineProps({
  column: Array,
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
  pageNumber: searchPage.value,
  pageSize: 20
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
    const { data, total: resTotal } = await props.api({
      ...pageData
      // ...props.params
    })
    tableData.value = data || []
    total.value = Number(resTotal)
    emit('callback', tableData.value)
  } finally {
    emit('update:loading', false)
    tableLoading.value = false
  }
}

/* 点击当前页 */
const clickPage = (e) => {
  searchParams.page = e
  pageData.pageNumber = e
  getList()
}

getList()

/* 刷新 */
const refresh = () => {
  searchParams.page = 1
  pageData.pageNumber = 1
  nextTick(() => {
    getList()
  })
}

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
    // console.log('打印', row, column, cell, e.target.innerText)
    // tooltipText.value = row[column.property]
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
  pageData
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

</style>
