
<template>
  <div class="main flex flex-col pb-20px">
    <!-- <div class="h-20px bg-#ccc">
        AAA111
    </div> -->
    <DwTable
      ref="tableRef"
      :column="column"
      :params="params"
      :api="sysUserListPage"
    >
      <template #cz="{ row }">
        <dw-button type="primary" link @click="onDelete(row)">编辑1</dw-button>
        <dw-button type="danger" link @click="onDelete(row)">删除</dw-button>
      </template>
    </DwTable>
    <!-- <div class="h-10px bg-#ccc">
        AAA
        truncate
        truncate
        truncate
        truncate
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sysUserListPage } from '@/api'
import { dwHooks } from '../../dist/dwyl-ui.mjs'
const { useDwTable } = dwHooks

const activeIndex = ref(1)

const column = [
  { prop: 'name', label: '名称' },
  { prop: 'roleName', label: '角色' },
  { prop: 'roleCode', label: 'roleCode' },
  { prop: 'phoneNumber', label: '联系人电话' },
  { prop: 'cz', slot: 'cz', width: 120, label: '操作' }
]

const params = ref({
  // limit: 5
})
const tableData = [{
  unitName: '迪威云联',
  location: '成都',
  unitContactName: '张三',
  unitContactPhone: '15856565689'
}]

const {
  onDelete
} = useDwTable({
  defParams: { name: '' },
  diaName: '消防车'
})

</script>

<style lang="scss">
.main {
  height: 100vh;
}
</style>
