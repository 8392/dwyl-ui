<template>
  <div>
    <div v-dwloading="loading" class="w-100px h-100px mb-20px">测试文本</div>
    <dw-button v-dwloading="loading" type="primary">测试按钮</dw-button>
  </div>
</template>

<script setup>
const loading = true
</script>

<style lang="scss" scoped></style>
