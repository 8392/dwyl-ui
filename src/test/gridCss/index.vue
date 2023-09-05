<template>
  <div>
    <div class="box">
      <div v-for="item in 5" :key="item" class="h-100px bg-#ddd"></div>
      <div class="h-200px bg-blue"></div>
      <div class="h-200px bg-blue"></div>
    </div>
  </div>
</template>

<script setup>
import { dwUtils } from 'dwyl-ui'
const { deepMerge } = dwUtils

const obj1 = {
  people: {
    arr: [1, 2, 3, 4, 6],
    city: {
      x: 333,
      name: '成都'
    }
  }
}

const obj2 = {
  people: {
    arr: [1, 2, 3, 9, 666],
    city: {
      name: '北京',
      age: 22
    }
  }
}

const res = deepMerge(obj1, obj2)

console.log('测试', res)

</script>

<style lang="scss" scoped>
.box{
  width: 300px;
  border: 1px solid #f00;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: min-content;
}
</style>
