<template>
  <el-image
    v-bind="$attrs"
    :title="title"
    fit="contain"
    :src="resSrc"
    :class="{'cursor-pointer': isPreview}"
    @click="handleImg"
  >
    <template #error>
      <el-image
        :title="title || '暂无图片'"
        class="wh-full"
        :src="errorImg"
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
import { ref, watchEffect } from 'vue'
import { dwImgView } from '~/utils/imgView'
import { ElImage } from 'element-plus'
import { useImageUrl } from '~/utils/packageUtils'
const errorImg = useImageUrl('290168546839285760.png')

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
const resSrc = ref('')
const emit = defineEmits(['click'])
watchEffect(() => {
  resSrc.value = props.src || ''
})
const handleImg = () => {
  if (props.isPreview) {
    dwImgView(resSrc.value)
  }
  emit('click')
}
</script>
