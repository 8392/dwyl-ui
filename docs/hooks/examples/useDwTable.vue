<template>
  <div>
    <DwTable
      ref="dwTable"
      :params="params"
      :column="column"
      :api="networkUnitPageBack"
    >
      <template #cz="{ row }">
        <dw-button type="danger" link @click="onDelete(row)">删除</dw-button>
      </template>
    </DwTable>
    <editDia
      v-if="dialogVisible && state.indexDia === 1"
      v-model="dialogVisible"
      :title="diaName"
      :datas="state.editItem"
      @update="updatePage"
    />
  </div>
</template>

<script setup>
import { dwHooks } from 'dwyl-ui'
const { useDwTable } = dwHooks

const {
  dialogVisible,
  updatePage,
  dwTable,
  onDelete,
  onSearch,
  params
} = useDwTable({
  deleteApi: networkUnitDataId
})
</script>
