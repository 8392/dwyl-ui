<template>
  <div :class="['dw_tabpane flex-center', {'active': modelValue === name}]" @click="handleMenu">
    <slot></slot>
  </div>
</template>

<script lang="jsx" setup>
import { reactive, ref, computed, inject, getCurrentInstance, h } from 'vue'
import { filePrefixPath } from '../../config.js'
const currentInstance = getCurrentInstance()
defineOptions({
  name: 'DwTabPane'
})

const props = defineProps({
  name: [String, Number]
})

const parent = inject('dwsteps')

const modelValue = computed(() => currentInstance.parent.props.modelValue)

const handleMenu = () => {
  parent.setActiveMenu(props.name)
}

const bgUrl = `url(${filePrefixPath}20240311131341.png)`

</script>

<style lang="scss" scoped>
.dw_tabpane{
  width: 90px;
  height: 30px;
  background: v-bind(bgUrl);
  background-size: 100% 100%;
  font-weight: bold;
  font-size: 12px;
  color: rgba($color: #fff, $alpha: 0.5);
  line-height: 12px;
  cursor: pointer;
  &:hover{
    color: #fff;
  }
  &.active{
    color: #fff;
    text-shadow: 0 0 10px rgba($color: #2560c9, $alpha: 1);
  }
}
</style>
