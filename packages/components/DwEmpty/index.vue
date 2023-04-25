<template>
  <div class="w-full flex-center pb-20px">
    <DwImage class="w-200px" :src="currImg" />
  </div>
</template>

<script lang="jsx" setup>
import { ref, computed } from 'vue'
import DwImage from '../DwImage'
import { useImageUrl } from '~/utils/packageUtils'

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
  ['noData', useImageUrl('312009389047525376.png')],
  ['404', useImageUrl('312009321707974656.png')],
  ['error', useImageUrl('312011357912543232.png')],
  ['loadFail', useImageUrl('312011581565415424.png')]
])

const currImg = computed(() => imgMap.get(props.type))

</script>

<style lang="scss" scoped>

</style>
