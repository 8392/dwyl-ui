
<template>
  <div class="mb-20px">222
    <dw-button type="primary" @click="setLoading">è§Šć</dw-button>
  </div>

  <div v-dwloading="loading" class="w-500px bg-#ddd h-200px">
    loading
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { sysUserListPage } from '@/api'

const loading = ref(false)

const requestData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('æć')
    }, 2000)
  })
}

const setLoading = async () => {
  try {
    loading.value = true
    const res = await requestData()
    console.log('res', res)
  } finally {
    loading.value = false
  }
}

</script>

<style lang="scss" scoped>

</style>
