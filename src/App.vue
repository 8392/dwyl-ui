
<template>
  <div>
    <!-- <DwSteps :active="activeIndex">
      <DwStep title="选择产品类型" />
      <DwStep title="添加版本" />
      <DwStep title="选择智能化模型方式" />
    </DwSteps> -->
    <TestTable />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TestTable from './test/Table'

const activeIndex = ref(1)

</script>

<style>

</style>
