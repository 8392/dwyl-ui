
<template>
  <div>
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
    <DwProjectConfig :id="2">
      <!-- <TestDwUpload /> -->
      <TestTable />
    </DwProjectConfig>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TestTable from './test/Table'

import TestImgView from './test/imgView'
import testButton from './test/testButton'
import testLoading from './test/testLoading'
import dwgrid from './test/dwgrid'
import TestDwSelect from './test/DwSelect'
import TestDwUpload from './test/dwUpload'

const activeIndex = ref(1)

const projectConfig = {

}

</script>

<style>

</style>
