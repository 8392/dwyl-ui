<template>
  <div v-dwloading="loading" class="demo"></div>
  <!-- <div class="demo">

  </div> -->
</template>
<script setup>
import { ref } from 'vue'
import { DwLoading } from 'dwyl-ui'

const title = ref('拼命加载中...')
const loading = ref(true)
// DwLoading.service({
//   text: '你好啊'
// })

</script>

<style lang="scss" scoped>
.demo{
  height: 200px;
  width: 200px;
  background-color: #f1f1f1;
}
</style>
