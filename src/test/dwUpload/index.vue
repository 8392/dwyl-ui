
<template>
  <div>
    <!-- 上传 -->
    <DwUpload fileType="img" multiple v-model="imageLink" />
  </div>
</template>

<script setup>

import { ref } from 'vue'

const imageLink = ref('https://iot.diweiyunlian.cn:1443/iot-file/311738491240075264/a.png')

</script>
