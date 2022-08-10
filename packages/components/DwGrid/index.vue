<template>
  <div ref="gridRef" class="overflow-hidden flex-1 dwgrid">
    <div v-if="fixed" ref="gridChildRef" class="fixedGrid">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script lang="jsx" setup>
import { ref, computed, provide, watchEffect, watch, nextTick } from 'vue'
import { useElementSize } from '@vueuse/core'
defineOptions({
  name: 'DwGrid'
})
const props = defineProps({
  minWidth: [String, Number],
  width: [String, Number],
  rowGap: Number,
  columnGap: Number,
  total: Number,
  pageSize: Number,
  fixed: Boolean
})
const gridRef = ref(null)
const gridChildRef = ref(null)
const { width } = useElementSize(gridRef)
const emit = defineEmits(['update:pageSize', 'sizeChange'])
const maxCol = computed(() => {
  if (width.value > 0) {
    let index = 0
    let itemWidth = props.minWidth
    while (itemWidth <= width.value) {
      index++
      itemWidth = itemWidth + props.columnGap + props.minWidth
    }
    return index
  }
  return 0
})

const columnGap = computed(() => {
  if (props.width && props.fixed) {
    return props.columnGap + 'px'
  }
  if (props.width) {
    const count = Math.floor(width.value / (props.width))
    const allColW = props.width * count
    if (count > 0) {
      emit('update:pageSize', count * 3)
      emit('sizeChange', count, count * 3)
    }
    return (width.value - allColW) / (count - 1) + 'px'
  } else {
    return props.columnGap + 'px'
  }
})
const rowGap = computed(() => props.rowGap + 'px')

const colWidth = computed(() => {
  if (props.width && props.fixed) {
    return props.width + 'px'
  }
  if (props.width) {
    return props.width + 'px'
  } else {
    const allColW = props.columnGap * (maxCol.value - 1)
    // console.log('allColW', maxCol.value, allColW)
    // if (maxCol.value > 0) {
    //   emit('update:pageSize', maxCol.value * 3)
    //   emit('sizeChange', maxCol.value, maxCol.value * 3)
    // }
    return (width.value - allColW) / maxCol.value + 'px'
  }
})
provide('colWidth', colWidth)

const { width: gridW } = useElementSize(gridRef)
const { width: gridChildW } = useElementSize(gridChildRef)
const gridWidth = computed(() => {
  const currWidth = gridW.value
  const surplusW = (currWidth % (props.width + props.columnGap)) + props.columnGap
  return currWidth - surplusW + 'px'
})

const maxColFixed = computed(() => {
  if (width.value > 0) {
    let index = 0
    let itemWidth = props.width
    while (itemWidth <= width.value) {
      index++
      itemWidth = itemWidth + props.columnGap + props.width
    }
    return index
  }
  return 0
})

watch(() => gridChildW.value, () => {
  if (props.fixed) {
    const currWidth = gridChildW.value
    const count = maxColFixed.value
    emit('update:pageSize', count * 3)
    emit('sizeChange', count, count * 3, currWidth)
  }
})

watch(() => maxCol.value, () => {
  if (props.minWidth) {
    emit('update:pageSize', maxCol.value * 3)
    emit('sizeChange', maxCol.value, maxCol.value * 3)
  }
})

</script>

<style lang="scss" scoped>
%commonStyle {
  display: flex;
  flex-wrap: wrap;
  row-gap: v-bind(rowGap);
  column-gap: v-bind(columnGap);
  width: 100%
}
.dwgrid {
  @extend %commonStyle;
}
.fixedGrid {
  @extend %commonStyle;
  width: v-bind(gridWidth);
  margin-left: auto;
  margin-right: auto;
}
</style>
