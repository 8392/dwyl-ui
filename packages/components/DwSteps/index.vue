<template>
  <div class="flex justify-center">
    <slot />
  </div>
</template>

<script lang="jsx" setup>
import { ref, watch, provide, useSlots, computed } from 'vue'
defineOptions({
  name: 'DwSteps'
})
const props = defineProps({
  active: Number
})

const slot = useSlots()

const slotLeg = computed(() => slot?.default?.()?.length)

const steps = ref([])

watch(steps, () => {
  steps.value.forEach((instance, index) => {
    instance.setIndex(index)
  })
})

provide('dwsteps', { props, steps, slotLeg: slotLeg.value })

</script>

<style lang="scss" scoped>

</style>
