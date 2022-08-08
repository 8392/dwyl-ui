<template>
  <div :style="{width: colWidth}">
    <slot></slot>
  </div>
</template>

<script lang="jsx" setup>
import { inject } from 'vue'
defineOptions({
  name: 'DwCol'
})
const colWidth = inject('colWidth')

</script>

<style lang="scss" scoped>
</style>
