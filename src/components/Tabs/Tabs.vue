
<template>
  <div>
    <div class="flex gap-20px h-40px items-center px-10px">
      <div
        v-for="item in itemList"
        :key="item"
        :class="['px-20px cursor-pointer', { 'color-#f00': item.props.name === modelValue}]"
        @click="handleMenu(item)"
      >{{ item.props.label }}</div>
    </div>
    <!-- <slot></slot> -->
    <component :is="currActive" :key="currActive" />
  </div>
</template>

<script setup>
import { ref, useSlots, computed, watchEffect } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean
  }
})

const emits = defineEmits(['update:modelValue', 'change'])

const slots = useSlots()

const itemList = computed(() => slots.default())

console.log('slots', slots.default())

const handleMenu = (item) => {
  emits('update:modelValue', item.props.name)
}

const currActive = computed(() => {
  return itemList.value.find(o => o.props.name === props.modelValue)
})

console.log('currActive', currActive.value)

</script>

<style>

</style>
