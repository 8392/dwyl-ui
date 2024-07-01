<template>
  <div class="dwTabs">
    <slot />
  </div>
</template>

<script lang="jsx" setup>
import { ref, provide } from 'vue'

defineOptions({
  name: 'DwTabs'
})

const props = defineProps({
  modelValue: [String, Number]
})

const emits = defineEmits(['update:modelValue', 'tab-click'])

const setActiveMenu = (e) => {
  emits('update:modelValue', e)
  emits('tab-click', e)
}

provide('dwsteps', { props, setActiveMenu })

</script>

<style lang="scss" scoped>
.dwTabs{
  display: flex;
}
</style>
