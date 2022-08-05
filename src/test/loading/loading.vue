<template>
  <div class="demo" v-loading:[title]="loading"></div>
</template>
<script setup>
import { ref } from 'vue'

const title = ref('拼命加载中...')
const loading = ref(true)
</script>
