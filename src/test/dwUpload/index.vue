
<template>
  <div>
    <!-- 上传 -->
    <DwUpload fileType="img" multiple v-model="imageLink" />

    <DwUpload fileType="pdf" list-type="text" class="uploadPdf" v-model="testReportPdf">
      <dw-button icon="plus">上传PDF</dw-button>
    </DwUpload>
    <div>
      <div>结果</div>
      <div>{{testReportPdf}}</div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'

const imageLink = ref('https://iot.diweiyunlian.cn:1443/iot-file/311738491240075264/a.png')
const testReportPdf = ref('https://fire.diweiyunlian.cn/file/特斯拉.pdf,https://fire.diweiyunlian.cn/file/特斯拉 - 副本.pdf')

</script>
