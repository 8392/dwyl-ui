<template>
  <div v-loading:[title]="loading" class="demo"></div>
</template>
<script setup>
import { ref } from 'vue'

const title = ref('拼命加载中...')
const loading = ref(true)
</script>
