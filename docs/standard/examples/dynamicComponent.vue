<template>
  <component :is="block">222</component>
</template>

<script setup>
import a from './a.vue'
import b from './b.vue'
import c from './c.vue'

const block = ref(a)
</script>
