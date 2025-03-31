<template>
  <div class="dw_pagination flex items-center pt-20px justify-end">
    <div class="dw_pagination-total pr-20px">共查询到<span class="dw_pagination-count">{{ total }}</span> 条</div>
    <el-pagination
      v-bind="$attrs"
      style="margin:0"
      small
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      :page-sizes="[20, 50, 100, 200]"
      layout="sizes, prev, pager, next"
      class="mt-4"
    />
    <!-- layout="prev, pager, next" -->
  </div>
</template>

<script lang='jsx' setup>
import { reactive, watch, watchEffect } from 'vue'
import { ElPagination } from 'element-plus'
defineOptions({
  name: 'DwPagination'
})
const props = defineProps({
  total: [Number, String],
  currentPage: Number,
  pageSize: Number
})

</script>
