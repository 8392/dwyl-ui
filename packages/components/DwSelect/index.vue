<template>
  <el-select
    v-bind="$attrs"
    :clearable="clearable"
    :filterable="filterable"
    :fit-input-width="fitInputWidth"
  >
    <slot></slot>
  </el-select>
</template>

<script lang='jsx' setup>
import { ElSelect } from 'element-plus'
defineOptions({
  name: 'DwSelect'
})

const props = defineProps({
  clearable: {
    type: Boolean,
    default: true
  },
  filterable: {
    type: Boolean,
    default: true
  },
  fitInputWidth: {
    type: Boolean,
    default: true
  }
})

</script>

<style lang="scss" scoped>

:deep(.el-input__inner) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
