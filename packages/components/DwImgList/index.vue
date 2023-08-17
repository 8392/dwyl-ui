<template>
  <div class="flex gap-20px flex-wrap">
    <div
      v-for="(item, index) in list" :key="item"
      class="border-1px border-dwBorder rounded-6px cursor-pointer"
      @click="handlePreview(list, index)"
    >
      <DwImage :src="item" class="w-100px h-100px" />
    </div>
    <div v-if="resList.length === 0" class="text-textTitle">暂无</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DwImage from '~/components/DwImage'
import { dwImgView } from '~/utils/imgView'

defineOptions({
  name: 'DwImgList'
})

const props = defineProps({
  list: {
    type: Array
  }
})

const resList = computed(() => props?.list || [])

const handlePreview = (arr, index) => {
  dwImgView(arr, index)
}

</script>

<style lang="scss" scoped>

</style>
