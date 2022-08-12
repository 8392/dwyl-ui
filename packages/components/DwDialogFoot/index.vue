<template>
  <div class="flex justify-center gap-60px">
    <el-button class="w-120px" :loading="leftLoading" type="primary" @click="handleBtn(1)">{{ btnText.leftText }}</el-button>
    <el-button class="w-120px" @click="handleBtn(2)">{{ btnText.rightText }}</el-button>
  </div>
</template>

<script lang='jsx' setup>
import { computed } from 'vue'
defineOptions({
  name: 'DwDialogFoot'
})

const props = defineProps({
  type: String,
  leftLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['leftBtn', 'rightBtn', 'close', 'reset', 'save', 'add'])

const btnText = computed(() => {
  const { type } = props
  if (type === 'add') {
    return {
      leftText: '新增',
      rightText: '重置'
    }
  } else {
    return {
      leftText: '保存',
      rightText: '取消'
    }
  }
})

const handleBtn = (status) => {
  const { type } = props
  if (status === 1) {
    emit('leftBtn')
    if (type === 'add') {
      emit('add')
    } else {
      emit('save')
    }
  } else {
    emit('rightBtn')
    if (type === 'add') {
      emit('reset')
    } else {
      emit('close')
    }
  }
}

</script>
