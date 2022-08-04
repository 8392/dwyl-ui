
<template>
  <div class="main flex flex-col">
    <div class="h-20px bg-#ccc">
        AAA
    </div>
    <DwTable
      ref="tableRef"
      :column="column"
      :api="sysUserListPage"
    >
      <template #cz="{ row }">
        <dw-button type="primary" link @click="onDelete(row)">编辑</dw-button>
        <dw-button type="danger" link @click="onDelete(row)">删除</dw-button>
      </template>
    </DwTable>
    <div class="h-10px bg-#ccc">
        AAA
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { sysUserListPage } from '@/api'

const activeIndex = ref(1)

const column = [
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'roleName',
    label: '角色'
  },
  {
    prop: 'roleCode',
    label: 'roleCode'
  },
  {
    prop: 'phoneNumber',
    label: '联系人电话'
  },
  {
    prop: 'cz',
    slot: 'cz',
    width: 490,
    label: '操作'
  }
]

const tableData = [{
  unitName: '迪威云联',
  location: '成都',
  unitContactName: '张三',
  unitContactPhone: '15856565689'
}]

const onDelete = () => {

}

</script>

<style lang="scss">
.main {
  height: 100vh;
}
</style>
