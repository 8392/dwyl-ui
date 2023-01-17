<template>
  <div class="p-20px">
    <div class="w-500px bg-amber flex">
      <div class="w-300px bg-#ccc"></div>
      <div v-tooltip="location" class="flex-1 truncate">
        {{ location }}
      </div>
    </div>
  </div>
</template>

<script lang="jsx" setup>
import { ref } from 'vue'
const location = ref('')
setTimeout(() => {
  location.value = '十大阿三大苏打实打实大苏打撒大苏打撒旦啊实打实打算啊实打实撒大苏打'
}, 1000)
</script>
