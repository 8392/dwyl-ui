<template>
  <div class="w-full flex-center pt-80px pb-20px">
    <DwImage class="w-200px" :src="currImg" />
  </div>
</template>

<script lang="jsx" setup>
import { ref, computed } from 'vue'
import DwImage from '../DwImage'

defineOptions({
  name: 'DwEmpty'
})

const props = defineProps({
  type: {
    type: String,
    default: 'noData'
  }
})

const imgMap = new Map([
  ['noData', 'https://fire.diweiyunlian.cn/file/312009389047525376.png'],
  ['404', 'https://fire.diweiyunlian.cn/file/312009321707974656.png'],
  ['error', 'https://fire.diweiyunlian.cn/file/312011357912543232.png'],
  ['loadFail', 'https://fire.diweiyunlian.cn/file/312011581565415424.png']
])

const currImg = computed(() => imgMap.get(props.type))

</script>

<style lang="scss" scoped>

</style>
