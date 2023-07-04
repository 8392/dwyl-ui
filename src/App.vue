
<template>
  <div class="w">
    <DwProjectConfig :config="projectConfig">

      <!-- <Tabs v-model="activeName">
      <Tab label="User" name="first">
        <div class="w-100px h-100px bg-#f00">我是tab1</div>
      </Tab>
      <Tab label="Config" name="second">我是tab2</Tab>
      <div>测试其它插槽</div>
    </Tabs> -->
      <!-- <Child />
    <div>
      {{ testObj.city }}
    </div>
    <dw-button @click="handleBtn">点击</dw-button> -->
      <!-- <TestTooltip /> -->
      <!-- <Slider /> -->
      <gridList />
    </DwProjectConfig>

  </div>
</template>

<script setup>
import Tab from '@/components/Tabs/Tab.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import TestTooltip from '@/test/tooltip/index.vue'
import { ref } from 'vue'
import { testObj, handleBtn } from '@/components/cusTomerStore'
import Child from '@/components/cusTomerStore/Child'
import Slider from '@/test/Slider/index.vue'
import gridList from '@/test/gridList'

const activeName = ref('first')

/* dwyl-ui默认传递参数配置 */
const projectConfig = {
  table: {
    pageField: 'page',
    limitField: 'size',
    totalField: 'total',
    dataField: 'data',
    defaultLimit: 20 // 默认展示多少条
  },
  upload: {
    uploadMoreApi: ''
  }
}
/* dwyl-ui默认传递参数配置 */

</script>

<style>

</style>
