<template>
  <el-date-picker
    v-model="timeData"
    class="vertical-top mr-12px"
    :type="type"
    :range-separator="rangeSeparator"
    v-bind="$attrs"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :default-time="defaultTime"
    :format="format"
    @change="changeDate"
  >
  </el-date-picker>
</template>

<script lang="jsx" setup>
import { ref, watchEffect } from 'vue'
import dayjs from 'dayjs'
defineOptions({
  name: 'DwPicker'
})

const defaultTime = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
]

const props = defineProps({
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  startPlaceholder: {
    type: String,
    default: '开始日期'
  },
  endPlaceholder: {
    type: String,
    default: '结束日期'
  },
  rangeSeparator: {
    type: String,
    default: '-'
  },
  type: {
    type: String,
    default: 'daterange'
  },
  start: {
    type: String
  },
  end: {
    type: String
  }
})

const timeData = ref(null)

watchEffect(() => {
  const { start, end } = props
  if (start && end) {
    timeData.value = [start, end]
  } else {
    timeData.value = null
  }
})

const emit = defineEmits(['update:start', 'update:end', 'change'])

const changeDate = (val) => {
  let startTime = null
  let endTime = null
  if (val) {
    const [start, end] = val
    startTime = dayjs(start).format('YYYY-MM-DD HH:mm:ss') // 2011-10-17 00:17:56
    endTime = dayjs(end).format('YYYY-MM-DD HH:mm:ss') // 2011-10-17 00:17:56
  }
  emit('update:start', startTime)
  emit('update:end', endTime)
  emit('change', {
    start: startTime,
    end: endTime
  })
}

</script>
