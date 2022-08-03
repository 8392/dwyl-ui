<template>
  <div class="flex items-center pt-20px justify-end">
    <div class="pr-20px">共 {{total}} 条</div>
    <el-pagination
      v-bind="$attrs"
      style="margin:0"
      small
      background
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      class="mt-4"
    />
  </div>
</template>

<script lang='jsx' setup>
const props = defineProps({
  total: [Number, String],
  currentPage: Number,
  pageSize: Number
})

</script>
