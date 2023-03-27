<template>
  <div>
    <DwTable
      ref="dwTable"
      :column="column"
      :params="params"
      :api="fireTruckPage"
    >
      <template #cz="{ row }">
        <dw-button type="primary" link>编辑</dw-button>
        <dw-button type="danger" link>删除</dw-button>
      </template>
    </DwTable>
  </div>
</template>

<script setup>
const column = [
  {
    prop: 'truckNumber',
    label: '车牌号'
  },
  {
    label: '所属单位',
    formatter (row) {
      return ''
    }
  },
  {
    slot: 'cz',
    width: 120,
    label: '操作'
  },
  {
    prop: 'createTime',
    label: '时间',
    render ({ row }) {
      return <span class='color-#B1B5BB'>{row.createTime}</span>
    }
  }
]
</script>
