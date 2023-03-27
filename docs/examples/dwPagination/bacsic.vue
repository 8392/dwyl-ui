<template>
  <div>
    <DwPagination
      v-model:current-page="params.pageNumber"
      v-model:page-size="params.pageSize"
      :total="total"
      @current-change="clickPage"
    />
  </div>
</template>

<script setup>
const total = 100
const params = {
  pageNumber: 1,
  pageSize: 10
}
const clickPage = e => {
  console.log(e)
}
</script>

<style lang="scss" scoped></style>
