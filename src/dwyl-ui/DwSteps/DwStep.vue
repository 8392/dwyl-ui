<template>
  <div  class='flex justify-center items-center'>
    <div class="flex-center w-28px h-28px border-rounded-50% bg-#eaf3ff" v-if="active > index">
      <el-icon color="var(--el-color-primary)"><Select /></el-icon>
    </div>
    <span :class="['w-28px h-28px border-rounded-50% flex-center bg-#F2F3F5 color-#4E5969', {'bg-primary color-#fff': active === index}]" v-else>{{index + 1}}</span>
    <span :class="['pl-10px color-#6E7279', {'color-#292A2C': active === index}]">{{title}}</span>
    <span class='w-54px bg-#B1B5BB h-1px mx-10px' v-if="slotLeg !== index + 1"></span>
  </div>
</template>

<script lang="jsx" setup>
import { reactive, ref, computed, inject, getCurrentInstance, h } from 'vue'
const currentInstance = getCurrentInstance()

const props = defineProps({
  active: Number,
  title: [String, Number]
})

const parent = inject('dwsteps')

const index = ref(null)

const setIndex = (val) => {
  index.value = val
}

defineExpose({
  setIndex
})

const active = computed(() => currentInstance.parent.props.active)

const slotLeg = computed(() => parent.slotLeg)

const stepItemState = reactive({
  uid: computed(() => currentInstance?.uid),
  setIndex
})

parent.steps.value = [...parent.steps.value, stepItemState]

</script>

<style lang="scss" scoped>

</style>
