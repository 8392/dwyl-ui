<template>
  <dw-dialog ref="dwDialogRef" :title="datas?.id ? '编辑' : '新增'" width="450px" showFooter
             :footerType="datas?.id ? 'edit' : 'add'" :leftLoading="loading" @leftBtn="onSubmit" @reset="onReset"
             @close="onClose">
    <el-form ref="editRef" :rules="rules" :model="form" :label-width="90">
      <el-form-item label="厂家" prop="factory" class="is-required">
        <el-input v-model="form.factory" clearable placeholder="请输入厂家"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unitId" class="is-required">
        <dw-select v-model="form.unitId" placeholder="请选择" class="w-full" filterable
                   clearable>
          <dw-option v-for="item in state.unitOpts" :key="item.id" :label="item.unitName" :value="item.id" />
        </dw-select>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="form.number" clearable placeholder="请输入数量"></el-input>
      </el-form-item>
      <el-form-item label="生产日期" prop="producedTime">
        <el-date-picker v-model="form.producedTime" clearable style="width:100%" value-format="YYYY-MM-DD 00:00:00"
                        type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="过期日期" prop="expirationTime">
        <el-date-picker v-model="form.expirationTime" clearable style="width:100%" value-format="YYYY-MM-DD 23:59:59"
                        type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="存放说明" prop="remark">
        <el-input v-model="form.remark" clearable placeholder="请输入存放说明"></el-input>
      </el-form-item>
    </el-form>
  </dw-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { extinguisherAdd, extinguisherPut, networkList } from '@/api/newApi'
import { dwHooks } from 'dwyl-ui'
import { isPositiveNumber } from '@/utils/validator'
const { useForm } = dwHooks

const props = defineProps(['datas'])
const emits = defineEmits(['update'])

const state = reactive({ unitOpts: [] })
const rules = ref({
  factory: [{ required: true, message: '该字段必填', trigger: 'blur' }],
  unitId: [{ required: true, message: '该字段必填', trigger: 'blur' }],
  number: [{ validator: isPositiveNumber, trigger: 'blur' }],
  expirationTime: [{
    validator: (rule, value, callback) => {
      if (new Date(form.value.producedTime).getTime() <= new Date(value).getTime()) {
        callback()
      } else {
        callback(new Error('请选择正确时间'))
      }
    },
    required: true,
    trigger: 'blur'
  }]
})

const { form, onSubmit, editRef, loading, onReset, onClose, dwDialogRef } = useForm({
  api: props.datas ? extinguisherPut : extinguisherAdd,
  callback: () => {
    emits('update')
  }
})

form.value = props.datas
  ? { ...props.datas }
  : { sendMsg: true, handle: true, defaultApprove: false, producedTime: '' }

networkList().then(res => {
  state.unitOpts = res.data
})

</script>

<style lang="scss" scoped>

</style>
