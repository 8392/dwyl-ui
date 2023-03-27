<template>
  <div>
    <DwGridList
      ref="dwTable"
      :api="pointPage"
      :params="params"
      :minWidth="330"
      :rowGap="10"
    >
      <template #default="{row}">
        <div class="list flex flex-row">
          {{ row.name }}
        </div>
      </template>
    </DwGridList>
  </div>
</template>

<script setup>
</script>
