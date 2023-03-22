<template>
  <div>
    <dw-button type="primary" @click="onClick">基础用法</dw-button>
    <dw-button type="primary" @click="open">点击新增</dw-button>
    <dw-button type="primary" @click="edit">点击编辑</dw-button>
    <dw-dialog v-model="dialogVisible" title="新的对话框"
               width="700px"
               showFooter :footerType="footerType"
               :leftLoading="loading" @leftBtn="onSubmit" @reset="onReset"
               @close="onClose">
      <div>新的对话框</div>
    </dw-dialog>

    <dw-dialog v-model="dialogVisible2" title="默认对话框" width="700px">
      <div>默认对话框</div>
    </dw-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
const dialogVisible2 = ref(false)
const footerType = ref('add')
const loading = ref(false)
const onSubmit = () => {
  console.log('我是提交回调')
  loading.value = true
}
const onReset = () => {
  console.log('我是重置回调')
}
const onClose = () => {
  dialogVisible.value = false
  console.log('我是关闭回调')
}
const open = () => {
  footerType.value = 'add'
  dialogVisible.value = true
}
const edit = () => {
  footerType.value = 'edit'
  dialogVisible.value = true
}
const onClick = () => {
  dialogVisible2.value = true
}
</script>
