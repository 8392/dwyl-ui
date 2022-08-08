<template>
   <el-dialog
    :modelValue="modelValue"
    :draggable="draggable"
    v-bind="$attrs"
    :width="width"
    top='10vh'
    :show-close="showClose"
    custom-class="dw-dialog"
    :before-close="handleClose"
  >
    <template #header="{ close }">
      <div class="flex items-center justify-between h-63px border-b-1px border-#F2F3F5">
        <div class="color-#292A2C text-16px font-600">{{title}}</div>
        <!-- <el-icon class="cursor-pointer" color="#4e5969" :size="20" @click="close"><CloseBold /></el-icon> -->
        <CloseBold style="width: 20px; height: 20px;" class="color-#4e5969 cursor-pointer" @click="close" />
      </div>
    </template>
    <el-scrollbar max-height='70vh'>
      <slot></slot>
    </el-scrollbar>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang='jsx' setup>
import { ref, reactive } from 'vue'
import { ElDialog, ElButton } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
defineOptions({
  name: 'DwDialog'
})

const props = defineProps({
  modelValue: Boolean,
  draggable: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  width: {
    type: String,
    default: '30%'
  }
})

const emit = defineEmits(['update:modelValue', 'before-close'])

const handleClose = () => {
  emit('update:modelValue', false)
  emit('before-close', false)
}

</script>

<style lang="scss">
.dw-dialog {
  .el-dialog__header {
    padding: 0 20px !important;
    margin: 0 !important;
  }
  .el-dialog__body {
    padding: 20px !important;
  }
}
</style>
