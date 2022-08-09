<template>
  <el-option
    v-bind="$attrs"
    :label="label"
    :title="label"
  >
    <slot></slot>
  </el-option>
</template>

<script lang='jsx' setup>
import { ElOption } from 'element-plus'
defineOptions({
  name: 'DwOption'
})

const props = defineProps({
  label: {
    type: [Number, String]
  }
})

</script>

<style lang="scss">

</style>
