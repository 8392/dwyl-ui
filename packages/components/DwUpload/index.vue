<template>
  <UploadImg
    v-if="listType === 'picture-card'"
    v-bind="$attrs"
    :limit="limit"
    :modelValue="modelValue"
    @change="changeUploadImg"
  />
  <el-upload
    v-else
    v-bind="$attrs"
    ref="uploadRef"
    class="upload"
    action="#"
    :list-type="listType"
    :accept="accept"
    :limit="limit"
    :on-remove="onRemove"
    :file-list="fileList"
    :on-preview="handlePictureCardPreview"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    :http-request="httpRequest"
  >
    <div v-if="!$slots.default" class="flex-col flex-center w-100px h-100px">
      <img class="w-30px h-25px" src="../../assets/285171761802764288.png" alt="">
      <div class="color-#B1B5BB pt-4px text-12px">上传图片</div>
    </div>
    <slot v-else></slot>
  </el-upload>
</template>

<script lang='jsx' setup>

import { computed, watch, ref, inject } from 'vue'
import { ElMessage, ElUpload } from 'element-plus'
import { dwImgView } from '~/utils/imgView'
import { pdfView } from '~/utils/pdfView'
import { downloadBlob, getBlob } from '~/utils/utils'
import { fileTypeMap, pdfFileArr, imgFileArr } from '~/utils/base'
import FormData from 'form-data'
import UploadImg from './UploadImg'
defineOptions({
  name: 'DwUpload'
})
const configData = inject('projectConfigData')
const uploadConfig = computed(() => configData.value.upload)

const props = defineProps({
  listType: {
    type: String,
    default: 'picture-card'
  },
  fileType: { // 上传文件类型
    type: String
  },
  modelValue: [Array, String],
  stream: {
    type: [Array, Object]
  },
  isHttp: { // 是否请求上传接口
    type: Boolean,
    default: true
  },
  limit: Number
})

const accept = computed(() => {
  const { fileType } = props
  let acceptType = null
  fileTypeMap.forEach((value, key) => {
    if (key.includes(fileType)) {
      const { fileList } = value
      acceptType = fileList.join(',')
    }
  })
  return acceptType || fileType
})

const fileList = computed(() => {
  const { modelValue } = props
  let arr = []
  if (Array.isArray(modelValue)) {
    arr = modelValue
  } else {
    // 字符串
    arr = modelValue?.split?.(',')
    if (arr?.[0] === '') {
      arr = []
    }
  }
  return arr?.map(item => {
    /* 找出文件的名字 */
    const index = item.lastIndexOf('\/')
    const name = item.substring(index + 1, item.length)
    return {
      name,
      url: item
    }
  })
})

const emit = defineEmits(['update:modelValue', 'update:stream', 'change'])

const beforeUpload = (e) => {
  const { fileType } = props
  if (!fileType) {
    return
  }

  let hasNode = false
  for (const [key, value] of fileTypeMap) {
    if (key.includes(fileType)) {
      const { fileList, errorMsg } = value
      hasNode = fileList.some(o => e.name.endsWith(o))
      if (!hasNode) {
        ElMessage.error(errorMsg)
        return false
      }
    }
  }
  if (!hasNode) {
    const otherFileArr = fileType.split(',')
    const hasOther = otherFileArr.some(o => e.name.endsWith(o))
    if (!hasOther) {
      ElMessage.error(`只能上传以${props.fileType}结尾的文件`)
      return false
    }
  }
}

const httpRequest = async e => {
  try {
    const formData = new FormData()
    formData.append('files', e.file)
    const { data } = await uploadConfig.value.uploadMoreApi(formData)
    /* 是数组 */
    if (Array.isArray(props.modelValue)) {
      emit('update:modelValue', [...props.modelValue, ...data])
    } else {
      const arr = props.modelValue.split(',')
      let resArr = [...arr, data]
      resArr = resArr.filter(o => !!o)
      emit('update:modelValue', resArr.join(','))
    }
    emit('change', data)
  } catch (err) {
    emit('change', err)
  }
}

/* 图片上传 */
const changeUploadImg = (val) => {
  let resData = val
  const { modelValue } = props
  if (Array.isArray(modelValue)) {
    if (val) {
      resData = val?.split?.(',')
    } else {
      resData = []
    }
  }
  emit('update:modelValue', resData)
  emit('change', resData)
}

const onRemove = (e) => {
  if (Array.isArray(props.modelValue)) {
    const data = props.modelValue.filter(o => o !== e.url)
    emit('update:modelValue', data)
  } else {
    const arr = props?.modelValue?.split?.(',')
    const data = arr?.filter(o => o !== e.url)
    emit('update:modelValue', data?.join?.(','))
  }
}

const handlePictureCardPreview = async (e) => {
  const imgArr = fileList.value.map(item => item.url)
  const index = imgArr.findIndex(o => o === e.url)
  const lastIndex = e.url.lastIndexOf('\.')
  const fileName = e.url.slice(lastIndex)
  if (pdfFileArr.includes(fileName)) {
    /* 是pdf文件 */
    pdfView(e.url)
  } else if (imgFileArr.includes(fileName)) {
    /* 图片类型 */
    dwImgView(imgArr, index)
  } else {
    /* 其它文件类型，下载 */
    const { data } = await getBlob(e.url)
    downloadBlob(data, e.name)
  }
}

/* 文件超出最大上传数，提示 */
const handleExceed = (files, uploadFiles) => {
  const leg = uploadFiles.length
  if (!props.fileType) {
    ElMessage.error(`最多只能上传${leg}个文件`)
    return
  }
  if (props.fileType === 'img' || props.fileType === 'image') {
    ElMessage.error(`最多只能上传${leg}张图片`)
  } else if (props.fileType === 'pdf') {
    ElMessage.error(`最多只能上传${leg}个pdf文件`)
  } else {
    ElMessage.error(`最多只能上传${leg}个以${props.fileType}结尾的文件`)
  }
}
const uploadRef = ref(null)

defineExpose({
  uploadRef
})

</script>

<style lang="scss" scoped>
:deep(.upload) {
  .el-upload {
    width: 100px;
    height: 100px;
    background: #FFFFFF;
  }
  .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
}
</style>
