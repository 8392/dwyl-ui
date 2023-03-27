<template>
  <div>
    <template v-for="item in type" :key="item">
      <h3>{{ item }}</h3>
      <DwEmpty v-if="show" :type="item" />
    </template>
  </div>
</template>

<script setup>
const show = true
const type = ['noData', '404', 'error', 'loadFail']
</script>
