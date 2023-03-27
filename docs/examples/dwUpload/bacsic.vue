<template>
  <div>
    <DwUpload v-model="picture" fileType="img" :limit="1" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const picture = ref('')
</script>

<style lang="scss" scoped></style>
