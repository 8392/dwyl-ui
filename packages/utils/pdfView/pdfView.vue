<template>
  <div class="pdfView">
    <el-dialog
      v-model="dialogVisible"
      title="pdf预览"
      fullscreen
      :before-close="closeViewer"
    >
      <iframe class="iframe-content" :src="src"></iframe>
    </el-dialog>
  </div>
</template>

<script lang='jsx' setup>
import { ref } from 'vue'
import { ElDialog } from 'element-plus'

const props = defineProps({
  src: {
    type: String
  },
  close: Function
})

const dialogVisible = ref(true)

const closeViewer = () => {
  props.close()
}
</script>

<style lang="scss" scoped>
.pdfView {
  width: 100vw;
  height: 100vh;
  background-color: #525659 !important;
}
:deep(.el-dialog) {
  background-color: #525659 !important;
  .el-dialog__header {
    position: absolute;
    width: 100%;
    height: 40px;
    padding: 0 !important;
  }
  .el-dialog__title {
    line-height: 40px !important;
    padding-left: 30px;
  }
  .el-dialog__headerbtn{
    height: 40px !important;
    top: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-dialog__body {
    width: 100vw;
    height: calc(100vh - 3px);
    padding: 0 !important;
    padding-top: 40px !important;
    background-color: #f2f3f5 !important;
  }
  .is-fullscreen {
    background-color: #525659 !important;
  }
  .iframe-content {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
  }
}
</style>
