<template>
  <div class="h-100vh py-20px flex flex-col">
    <div class="flex flex-row mb-12px">
      <dw-select
        v-model="params.normId"
        class="w-200px mr-12px"
        placeholder="消防系统"
      >
        <dw-option v-for="item in sysOpts" :key="item.id" :label="item.name" :value="item.id" />
      </dw-select>
      <div class="w-200px mr-12px">
        <el-input v-model="params.projectName" clearable placeholder="维保项目" />
      </div>
      <dw-button type="primary" icon="Search" @click="onSearch">查询</dw-button>
      <el-button type="primary" icon="RefreshRight" @click="onResetSearch">重置</el-button>
    </div>
    <DwTable
      ref="dwTable"
      :column="column"
      :params="params"
      :api="selfProPage"
    >
      <template #cz="{ row }">
        <dw-button type="danger" link @click="onDelete(row)">删除</dw-button>
      </template>
    </DwTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { dwHooks } from 'dwyl-ui'
import { selfProPage, socialNormList, normSelfDelete } from '@/api'
const sysOpts = ref([])
const { useDwTable } = dwHooks

const column = [
  {
    type: 'index',
    width: 80,
    label: '序号'
  },
  {
    prop: 'normName',
    label: '消防系统'
  },
  {
    prop: 'projectName',
    label: '维保项目 '
  },
  {
    label: '操作',
    slot: 'cz',
    width: 80
  }
]

const {
  params,
  dwTable,
  onDelete,
  onSearch,
  onResetSearch
} = useDwTable({
  deleteApi: normSelfDelete
})

socialNormList().then(({ data }) => {
  sysOpts.value = data
})
</script>

<style lang="scss" scoped></style>
