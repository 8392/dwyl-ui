<template>
  <div :style="{width: colWidth}">
    <slot></slot>
  </div>
</template>

<script lang="jsx" setup>
import { inject } from 'vue'

const colWidth = inject('colWidth')

</script>

<style lang="scss" scoped>
</style>
