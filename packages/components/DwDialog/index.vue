<template>
  <el-dialog
    ref="dialogRef"
    v-bind="$attrs"
    :draggable="draggable"
    :width="width"
    top="10vh"
    :show-close="showClose"
    class="dw-dialog"
  >
    <template #header="{ close }">
      <div class="flex items-center justify-between h-63px border-b-1px border-#F2F3F5">
        <template v-if="slots.header">
          <slot name="header"></slot>
        </template>
        <div v-else class="text-16px font-600" style="color: var(--dw-dialog-title-bg)">{{ title }}</div>
        <!-- <el-icon class="cursor-pointer" color="#4e5969" :size="20" @click="close"><CloseBold /></el-icon> -->
        <CloseBold style="width: 20px; height: 20px;color: var(--dw-dialog-title-xbg)" class="cursor-pointer" @click="close" />
      </div>
    </template>
    <el-scrollbar max-height="70vh">
      <div class="p-20px">
        <slot></slot>
      </div>
    </el-scrollbar>
    <template v-if="showFooter || slots.footer" #footer>
      <slot v-if="slots.footer" name="footer"></slot>
      <DwDialogFoot
        v-if="showFooter"
        :type="footerType"
        :leftLoading="leftLoading"
        @leftBtn="() => emits('leftBtn')"
        @rightBtn="() => emits('rightBtn')"
        @close="() => emits('close')"
        @reset="() => emits('reset')"
        @save="() => emits('save')"
        @add="() => emits('add')"
      />
    </template>
  </el-dialog>
</template>

<script lang='jsx' setup>
import { ref, useSlots } from 'vue'
import { ElDialog, ElScrollbar } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import DwDialogFoot from '../DwDialogFoot'

defineOptions({
  name: 'DwDialog'
})

const props = defineProps({
  showFooter: { // 是否显示默认footer
    type: Boolean,
    default: false
  },
  footerType: String,
  leftLoading: {
    type: Boolean,
    default: false
  },
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

const emits = defineEmits(['leftBtn', 'rightBtn', 'close', 'reset', 'save', 'add'])

const slots = useSlots()
const dialogRef = ref()
const closeDialog = () => {
  dialogRef.value.visible = false
}

defineExpose({
  closeDialog
})

</script>

<style lang="scss">

.dw-dialog {
  .el-dialog__header {
    padding: 0 20px !important;
    margin: 0 !important;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
}
</style>
