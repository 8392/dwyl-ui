
<template>
  <div class="fw">
    <!-- <DwSteps :active="activeIndex">
      <DwStep title="选择产品类型" />
      <DwStep title="添加版本" />
      <DwStep title="选择智能化模型方式" />
    </DwSteps> -->
    <!-- <testLoading /> -->
    <!-- <TestImgView /> -->
    <!-- <testButton /> -->
    <!-- <dwgrid /> -->
    <!-- <TestDwSelect /> -->
    <!-- <DwProjectConfig
      ref="testRef"
      :config="projectConfig"
    >
      <TestTable />
    </DwProjectConfig>
    <div>{{ testVal }}</div> -->
    <testAsync />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TestTable from './test/Table'
import testAsync from './test/testAsync'

import TestImgView from './test/imgView'
import testButton from './test/testButton'
import testLoading from './test/testLoading'
import dwgrid from './test/dwgrid'
import TestDwSelect from './test/DwSelect'
import TestDwUpload from './test/dwUpload'
import { uploadMoreApi } from '@/api'

const activeIndex = ref(1)
const testVal = ref(999)
const testRef = ref(null)
const projectConfig = {
  table: {
    pageField: 'page',
    limitField: 'limit',
    totalField: 'data.total',
    dataField: 'data.records'
  },
  upload: {
    uploadMoreApi
  }
}
</script>

<style>

</style>
