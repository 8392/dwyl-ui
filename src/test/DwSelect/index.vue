
<template>
  <div>
    <dw-select
      v-model="value"
      placeholder="Select"
    >
      <dw-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </dw-select>
    <div>
      值{{ value }}
    </div>
    <div class="w-200px truncate">{{ testToolTip }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: '1',
    label: '啊实打实的，阿松大，玛纳斯ask领导看了发发监考老师发生'
  },
  {
    value: '2',
    label: 'Option2',
    disabled: true
  },
  {
    value: '3',
    label: 'Option3'
  },
  {
    value: '4',
    label: 'Option4'
  },
  {
    value: '5',
    label: 'Option5'
  }
]

const testToolTip = '啊实打实打算大苏打倒萨卡萨丁就卡上的巨大石块健康大使阿三大苏打大撒嗷嗷待食a'

</script>

<style>

</style>
