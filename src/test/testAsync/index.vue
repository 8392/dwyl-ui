
<template>
  <div>
    testAsync
    <dw-button v-for="item in testJson" :key="item.id" @click="openComponent(item)">{{ item.name }}</dw-button>
  </div>
  <component :is="isCom" />

</template>

<script lang="jsx" setup>
import { ref, defineAsyncComponent } from 'vue'
// import Child1 from './Child1.vue'
// const Child1 = defineAsyncComponent(() => import('./Child1.vue'))
// const Child2 = defineAsyncComponent(() => import('./Child2.vue'))
import { testJson } from './test.js'

const isCom = ref(null)
const openComponent = (val) => {
  // if (val === 1) {
  //   isCom.value = Child1
  // } else {
  //   isCom.value = Child2
  // }

  isCom.value = val.api
}

</script>
