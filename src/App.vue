
<template>
  <div class="fw">
    <Tabs v-model="activeName">
      <Tab label="User" name="first">
        <div class="w-100px h-100px bg-#f00">我是tab1</div>
      </Tab>
      <Tab label="Config" name="second">我是tab2</Tab>
      <div>测试其它插槽</div>
    </Tabs>
  </div>
</template>

<script setup>
import Tab from '@/components/Tabs/Tab.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import { ref } from 'vue'

const activeName = ref('first')

</script>

<style>

</style>
