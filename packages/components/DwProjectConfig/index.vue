<template>
  <slot />
</template>

<script lang="jsx" setup>
import { ref, watch, provide, computed, watchEffect } from 'vue'
import configData from './config.js'

defineOptions({
  name: 'DwProjectConfig'
})
const props = defineProps({
  config: Object,
  id: [Number, String]
})

const currProjectData = computed(() => configData.get(props.id))

watchEffect(() => {
  console.log('currProjectData', currProjectData)
})

provide('projectConfigData', currProjectData)

</script>

<style lang="scss" scoped>

</style>
