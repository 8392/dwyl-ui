<template>
  <div>
    <dw-dialog
      v-model="dialogVisible"
      :title="title"
      width="483px"
      :before-close="closeViewer"
    >
      <el-form
        ref="formRef"
        label-width="86px"
      >
        <el-form-item label="第一步">
          <el-button type="primary" :icon="Download" plain @click="downloadFile">模板下载</el-button>
        </el-form-item>
        <el-form-item label="第二步">
          <div class="w-full">
            <el-button type="primary" :icon="UploadFilled" plain @click="uploadFileMeth">上传文件</el-button>
            <div v-if="fileData" class="lh-24px flex w-full items-center color-#1D2129 px-10px mt-20px hover:color-primary hover:bg-#f5f7fa">
              <svg t="1655559348642" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="1428" width="14" height="14"><path d="M992 96H576V75.9c0-40.3-36.9-70.6-76.4-62.8l-448 88.7C21.6 107.7 0 134 0 164.6v694.7c0 30.6 21.7 57 51.8 62.8l448 87.1c39.5 7.7 76.2-22.6 76.2-62.8V928h416c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32zM134.9 662.5l75.4-142.1c2.4-4.5 2.5-9.9 0.3-14.5l-69.5-143c-2.3-4.8 0.6-10.5 5.8-11.4l45.2-7.9c7.3-1.3 14.5 2.6 17.5 9.4l38.9 90.6c3.7 8.8 6.9 18.5 9.6 29.3h0.8c2.8-10 6.3-20.6 10.5-31.9l52.1-113.2c2.2-4.8 6.6-8.2 11.8-9.1l67.1-11.8c6.6-1.2 11.6 5.8 8.4 11.7L306.9 504.1c-2.6 4.8-2.6 10.7 0 15.5l104.8 189c3.3 5.9-1.8 12.9-8.4 11.8l-72.7-12.8c-5.2-0.9-9.6-4.3-11.8-9.1l-56.5-123.7c-2-4.5-4.1-12.5-6.3-24h-0.8c-1.1 5.6-3.5 13.5-7.2 23.9l-47.3 98.4c-3.1 6.5-10.1 10.1-17.2 8.8l-43-7.5c-5.3-1.2-8.2-7.1-5.6-11.9zM960 856c0 4.4-3.6 8-8 8H576v-88c0-4.4 3.6-8 8-8h96c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-96c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h96c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-96c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h96c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-96c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h96c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-96c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h96c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-96c-4.4 0-8-3.6-8-8v-88h376c4.4 0 8 3.6 8 8v688z" p-id="1429" fill="var(--el-color-primary)"></path><path d="M760 256c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h128c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H760zM760 368c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h128c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H760zM760 480c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h128c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H760zM760 592c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h128c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H760zM760 704c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h128c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H760z" p-id="1430" fill="var(--el-color-primary)"></path></svg>
              <span class="px-8px flex-1 truncate" :title="fileData.name">{{ fileData.name }}</span>
              <Close class="w-14px h-14px cursor-pointer" @click="closeFile" />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="flex justify-center gap-60px">
          <el-button class="w-120px" :loading="loading" type="primary" @click="submit">导入</el-button>
          <el-button class="w-120px" @click="reset">重置</el-button>
        </div>
      </template>
    </dw-dialog>
  </div>
</template>

<script lang='jsx' setup>
import { ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElMessage } from 'element-plus'
import DwDialog from '~/components/DwDialog'
import { downloadBlob, uploadFile } from '~/utils/utils'
import { Download, UploadFilled, Close } from '@element-plus/icons-vue'

const props = defineProps({
  title: String,
  temApi: { // 模板接口
    type: Function
  },
  close: Function,
  success: Function
})

const dialogVisible = ref(true)

const closeViewer = () => {
  props.close()
}

/* 下载模板 */
const downloadFile = async () => {
  const { fileName, blob } = await props.temApi()
  downloadBlob(blob, fileName)
  ElMessage.success('模板下载成功')
}

const loading = ref(false)
const fileData = ref(null)

const uploadFileMeth = async () => {
  const { file, formData } = await uploadFile({
    fileType: 'excel'
  })
  fileData.value = file
}

const closeFile = () => {
  fileData.value = null
}

const submit = () => {
  if (!fileData.value) {
    ElMessage.error('请上传要导入的文件')
    return
  }
  props.success(fileData.value)
}

/* 重置 */
const reset = () => {
  fileData.value = null
}

</script>

<style lang="scss" scoped>

</style>
