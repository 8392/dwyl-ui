
<template>
  <ElButton
    v-bind="$attrs"
  >
    <slot></slot>
  </ElButton>
</template>

<script lang="jsx" setup>
import { ElButton } from 'element-plus'
defineOptions({
  name: 'DwButton'
})

</script>

<style lang="scss" scoped>

</style>
