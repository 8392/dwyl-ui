<template>
  <el-image
    v-bind="$attrs"
    :title="title"
    fit="contain"
    @click="handleImg"
  >
    <template #error>
      <el-image @click="handleImg" :title="title || '暂无图片'" class="wh-full" src="https://fire.diweiyunlian.cn/file/290168546839285760.png" fit="contain" />
    </template>
    <template #placeholder>
      <div class="wh-full color-#ccc flex-center">加载中...</div>
    </template>
  </el-image>
</template>

<script lang="jsx" setup>
import { ref, reactive, watchEffect } from 'vue'

const props = defineProps({
  fit: {
    type: String,
    default: 'contain'
  },
  title: [String, Number]
})

const emit = defineEmits(['click'])

const handleImg = () => {
  emit('click')
}
</script>
