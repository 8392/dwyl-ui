<template>
  <div class="flex flex-wrap gap-20px">
    <Item
      v-for="(item, index) in fileArr"
      :key="index"
      ref="itemRef"
      :index="index"
      :delBtn="delBtn"
      :imgUrl="item"
      :fileArr="fileArr"
      @handleBtn="handleBtn($event, index)"
    />
    <div
      v-if="(limit === 1 && fileArr.length === 0) || limit > fileArr.length"
      class="flex-col-center relative rounded-6px w-100px h-100px mainBox"
      @click="uploadFileMeth"
    >
      <template v-if="!loading">
        <img class="w-30px h-25px" src="../../../assets/285171761802764288.png" alt="">
        <div class="color-#B1B5BB pt-8px text-12px">上传图片</div>
      </template>
      <template v-if="loading">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="100px"
             height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="27.5" cy="57.5" r="5" fill="#fe718d">
            <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                     values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
          </circle> <circle cx="42.5" cy="57.5" r="5" fill="#f47e60">
            <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                     values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.44999999999999996s"></animate>
          </circle> <circle cx="57.5" cy="57.5" r="5" fill="#f8b26a">
            <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                     values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.3s"></animate>
          </circle> <circle cx="72.5" cy="57.5" r="5" fill="#abbd81">
            <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                     values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.15s"></animate>
          </circle>
        </svg>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, nextTick, computed, inject } from 'vue'
import Item from './Item'
import { ElMessage } from 'element-plus'
import { uploadFile } from '~/utils/utils'
import { dwImgView } from '~/utils/imgView'

const props = defineProps({
  modelValue: [Array, String],
  multiple: Boolean,
  delBtn: {
    type: Boolean,
    default: true
  },
  limit: {
    type: Number,
    default: 20
  }
})
const itemRef = ref(null)

const fileArr = ref([])

const configData = inject('projectConfigData')
const uploadConfig = computed(() => configData.value.upload)

watchEffect(() => {
  const { modelValue } = props

  let arr = []
  if (Array.isArray(modelValue)) {
    arr = modelValue
  } else {
    // 字符串
    if (modelValue) {
      arr = modelValue?.split?.(',')
    }
  }

  fileArr.value = arr
})

const emit = defineEmits(['change'])
const loading = ref(false)

const getFormData = async () => {
  const { formData } = await uploadFile({
    fileType: 'img',
    multiple: props.multiple,
    isMessage: false
  })
  return formData
}

const uploadFileMeth = async () => {
  try {
    const formData = await getFormData()
    loading.value = true
    const { data } = await uploadConfig.value.uploadMoreApi(formData)
    loading.value = false
    fileArr.value.push(...data)
    emit('change', fileArr.value.join(','))
    await nextTick()
    itemRef.value.forEach(item => {
      item.showThum = false
    })
    ElMessage.success('上传成功')
  } catch {
    loading.value = false
    ElMessage.error('上传失败，服务器错误')
  }
}

const handleBtn = async (type, index) => {
  if (type === 1) {
    dwImgView(fileArr.value, index)
  } else if (type === 2) {
    try {
      itemRef.value[index].showThum = false
      const formData = await getFormData()
      itemRef.value[index].loading = true
      const { data } = await uploadConfig.value.uploadMoreApi(formData)
      fileArr.value.splice(index, 1, data)
      emit('change', fileArr.value.join(','))
      itemRef.value[index].loading = false
      await nextTick()
      itemRef.value.forEach(item => {
        item.showThum = false
      })
      ElMessage.success('上传成功')
    } catch {
      itemRef.value[index].loading = false
      ElMessage.error('上传失败，服务器错误')
    }
  } else {
    fileArr.value.splice(index, 1)
    emit('change', fileArr.value.join(','))
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
</style>
