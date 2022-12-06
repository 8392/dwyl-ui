
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: [String, Number]
  },
  name: {
    type: [String, Number]
  }
})

const currName = ref(null)

defineExpose({
  handleItem () {

  }
})

</script>

<style>

</style>
