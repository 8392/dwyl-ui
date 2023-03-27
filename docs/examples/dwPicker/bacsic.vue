<template>
  <div>
    <DwPicker
      v-model:start="params.beginTime"
      v-model:end="params.endTime"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const params = ref({
  beginTime: null,
  endTime: null
})
</script>
