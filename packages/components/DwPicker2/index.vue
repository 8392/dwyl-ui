<template>
  <div class="w-full flex items-center">
    <el-date-picker
      v-model="startTime"
      class="flex-1"
      type="date"
      v-bind="$attrs"
      :placeholder="startPlaceholder"
      value-format="YYYY-MM-DD 00:00:00"
      :disabled-date="disabledDateFun1"
      @change="changeDate1"
    >
    </el-date-picker>
    <div class="px-10px color-textLabel">-</div>
    <el-date-picker
      v-model="endTime"
      class="flex-1"
      type="date"
      v-bind="$attrs"
      :placeholder="endPlaceholder"
      value-format="YYYY-MM-DD 23:59:59"
      :disabled-date="disabledDateFun2"
      @change="changeDate2"
    >
    </el-date-picker>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'DwPicker2'
})

const props = defineProps({
  startPlaceholder: {
    type: String,
    default: '开始日期'
  },
  endPlaceholder: {
    type: String,
    default: '结束日期'
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  startEnd: {
    type: Array
  },
  disabledDate: {
    type: String
  }
})

const emits = defineEmits(['update:start', 'update:end', 'update:startEnd', 'change'])

const startTime = ref(null)
const endTime = ref(null)

watchEffect(() => {
  const { start, end } = props
  if (start) {
    startTime.value = start
  }
  if (end) {
    endTime.value = end
  }
})

const disabledDateFun1 = (time) => {
  if (props.disabledDate) {
    if (!endTime.value) {
      return Date.parse(time) < Date.parse(props.disabledDate)
    }
    if (endTime.value) {
      if (Date.parse(time) < Date.parse(props.disabledDate)) {
        return true
      }
      if (Date.parse(time) > Date.parse(endTime.value)) {
        return true
      }
    }
  } else {
    if (endTime.value) {
      return Date.parse(time) > Date.parse(endTime.value)
    } else {
      return false
    }
  }
}

const disabledDateFun2 = (time) => {
  if (props.disabledDate) {
    if (!startTime.value) {
      return Date.parse(time) < Date.parse(props.disabledDate)
    }
    if (startTime.value) {
      if (Date.parse(time) < Date.parse(startTime.value)) {
        return true
      }
    }
  } else {
    if (startTime.value) {
      return Date.parse(time) < Date.parse(startTime.value)
    } else {
      return false
    }
  }
}

const changeDate1 = (val) => {
  const startEnd = [startTime.value, endTime.value]
  emits('update:start', startTime.value)
  emits('update:end', endTime.value)
  emits('update:startEnd', startEnd)
  emits('change', startEnd)
}

const changeDate2 = (val) => {
  const startEnd = [startTime.value, endTime.value]
  emits('update:start', startTime.value)
  emits('update:end', endTime.value)
  emits('update:startEnd', startEnd)
  emits('change', startEnd)
}

</script>
