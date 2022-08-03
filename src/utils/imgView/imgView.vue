<template>
  <el-image-viewer
    :url-list="previewSrcList"
    :z-index="zIndex"
    :initialIndex="initialIndex"
    :hide-on-click-modal="hideOnClickModal"
    @close="closeViewer"
  >
  </el-image-viewer>
</template>

<script lang='jsx' setup>
import { ElImageViewer } from 'element-plus'

const props = defineProps({
  previewSrcList: Array,
  hideOnClickModal: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 3000
  },
  /* 默认展示图片 */
  initialIndex: {
    type: Number,
    default: 0
  },
  close: Function
})

const closeViewer = () => {
  props.close()
}
</script>
