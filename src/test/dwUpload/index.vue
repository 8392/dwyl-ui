
<template>
  <div>
    <!-- 上传 -->
    <DwUpload v-model="imageLink" fileType="img" multiple />

    <DwUpload v-model="testReportPdf" list-type="text" class="uploadPdf">
      <dw-button icon="plus">上传PDF</dw-button>
    </DwUpload>
    <div>
      <div>结果1</div>
      <div>{{ testReportPdf }}</div>
    </div>

    <!-- <DwPicker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
    /> -->

    <DwPicker
      v-model:start="params.startTime"
      v-model:end="params.endTime"
      class="vertical-top mr-12px mt-1px"
    />
    <!-- <DwPicker
      class='vertical-top mr-12px mt-1px'
      format="YYYY-MM-DD HH:mm:ss"
      v-model:start="params.startTime"
      v-model:end="params.endTime"
      typ="datetimerange"
    /> -->

    <!-- <el-date-picker
      v-model="value1"
      value-format="YYYY-MM-DD"
      type="date"
      placeholder="选择日期"
    ></el-date-picker> -->

    <dw-button @click="getTime">获取时间</dw-button>
  </div>
</template>

<script setup>

import { ref } from 'vue'

const imageLink = ref('https://iot.diweiyunlian.cn:1443/iot-file/311738491240075264/a.png')
const testReportPdf = ref('https://fire.diweiyunlian.cn/file/特斯拉.pdf,https://fire.diweiyunlian.cn/file/特斯拉 - 副本.pdf')

const params = ref({
  startTime: '',
  endTime: ''
})

const value1 = ref('')
const getTime = () => {
  // console.log('时间结果', params.value)
  console.log('value1', params.value)
}

</script>
