<template>
  <div>
    <div class="flex gap-20px h-40px items-center px-10px">
      <div
        v-for="item in itemList"
        :key="item"
        :class="['px-20px cursor-pointer bg-cyan-300 h-20px', { 'color-#f00': item?.props?.name === modelValue}]"
        @click="handleMenu(item)"
      >{{ item?.props?.label }}</div>
    </div>
    <!-- <slot></slot> -->
    <!-- <component :is="currActive" :key="currActive" /> -->
    <currActive :key="currActive" />
  </div>
</template>

<script lang="jsx" setup>
import { ref, useSlots, computed, isVNode, h } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean
  }
})

const emits = defineEmits(['update:modelValue', 'change'])

const slots = useSlots()

const itemList = computed(() => {
  const allSlot = slots.default()
  /* 找到子组件插槽为Tab组件的才渲染 */
  return allSlot.filter(item => item.type.__name === 'Tab')
})

const handleMenu = (item) => {
  emits('update:modelValue', item.props.name)
}

/* vnode可以直接当组件使用 */
const currActive = computed(() => {
  return itemList.value.find(o => o?.props?.name === props.modelValue)
})

</script>

<style>

</style>
