<template>
  <el-image
    v-bind="$attrs"
    :title="title"
    fit="contain"
    :src="src"
    :class="{'cursor-pointer': isPreview}"
    @click="handleImg"
  >
    <template #error>
      <el-image
        :title="title || '暂无图片'"
        class="wh-full"
        src="https://fire.diweiyunlian.cn/file/290168546839285760.png"
        fit="contain"
        @click="handleImg"
      />
    </template>
    <template #placeholder>
      <div class="wh-full color-#ccc flex-center">加载中...</div>
    </template>
  </el-image>
</template>

<script lang="jsx" setup>
import { ref, reactive, watchEffect } from 'vue'
import { dwImgView } from '~/utils/imgView'
import { ElImage } from 'element-plus'
defineOptions({
  name: 'DwImage'
})

const props = defineProps({
  fit: {
    type: String,
    default: 'contain'
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  src: {
    type: String
  },
  title: [String, Number]
})

const emit = defineEmits(['click'])

const handleImg = () => {
  if (props.isPreview) {
    dwImgView(props.src)
  }
  emit('click')
}
</script>
