<template>
  <div class="relative rounded-6px mainBox" style="width: 100px; height: 100px; background-color: #fff;" @click="uploadFileMeth" @mouseenter.stop="enterUploadImg" @mouseleave.stop="leaveUploadImg">
    <DwImage class="w-100px h-100px" :src="imgUrl" v-if="imgUrl" />
    <div class="flex-col flex-center w-100px h-100px cursor-pointer" v-else>
      <img class="w-30px h-25px" src="https://fire.diweiyunlian.cn/file/285171761802764288.png" alt="">
      <div class="color-#B1B5BB pt-4px text-12px">上传图片</div>
    </div>
    <transition name="el-fade-in">
      <div class="w-100px h-100px flex-center absolute rounded-6px thumbnail"  v-show="showThum" @click.stop>
        <el-icon :size="14" color="#fff" @click="handleBtn(1)"><zoom-in /></el-icon>
        <el-icon class="mx-10px" :size="20" color="#fff" @click="handleBtn(2)"><Edit /></el-icon>
        <el-icon :size="20" color="#fff" @click="handleBtn(3)"><Delete /></el-icon>
      </div>
    </transition>
  </div>
</template>

<script lang='jsx' setup>
import { ref, watchEffect } from 'vue'
import { uploadFile } from '@/utils/utils'
import { imgView } from '@/utils/imgView'

const props = defineProps({
  fileUrl: [Array, String]
})

const imgUrl = ref(null)

watchEffect(() => {
  imgUrl.value = props.fileUrl
})

const emit = defineEmits(['change'])

const showThum = ref(false)

const uploadFileMeth = async () => {
  const { data, file } = await uploadFile({
    fileType: 'img',
    isServer: true
  })
  emit('change', data)
}

const enterUploadImg = () => {
  if (imgUrl.value) {
    showThum.value = true
  }
}

const leaveUploadImg = () => {
  showThum.value = false
}

const handleBtn = (type) => {
  if (type === 1) {
    imgView(imgUrl.value)
  } else if (type === 2) {
    uploadFileMeth()
  } else {
    emit('change', '')
    showThum.value = false
  }
}

</script>

<style lang="scss" scoped>
.mainBox {
  border: 1px dashed var(--el-border-color-darker);
  cursor: pointer;
  &:hover {
    border-color: var(--el-color-primary);
  }
}
.thumbnail {
  top: 0;
  left: 0;
  background-color: rgba($color: #000, $alpha: 0.5);
}
</style>
