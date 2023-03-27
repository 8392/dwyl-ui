<template>
  <dw-dialog ref="dwDialogRef" title="新增单位" width="500px" showFooter
             :footerType="datas?.id ? 'edit' : 'add'" :leftLoading="loading" @leftBtn="onSubmit" @reset="onReset"
             @close="onClose">
    <el-form ref="editRef" v-dwloading="detailLoading" :model="form" :rules="rules"
             :label-width="100">
      <el-form-item label="监管单位" prop="unitName">
        <el-input v-model="form.unitName" clearable placeholder="请输入监管单位" />
      </el-form-item>
      <el-form-item label="描述" prop="unitDesc">
        <el-input v-model="form.unitDesc" clearable placeholder="请输入描述" />
      </el-form-item>
    </el-form>
  </dw-dialog>
</template>

<script setup>
import { dwHooks } from 'dwyl-ui'
const { useForm } = dwHooks

const { form, onSubmit, editRef, loading, onReset, onClose, dwDialogRef } = useForm({
  api: props.datas ? supervisePut : superviseAdd,
  defForm: {
    picture: {
      pictureList: []
    }
  },
  callback: () => {
    emits('update')
  }
})
</script>
