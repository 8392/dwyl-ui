<template>
  <div
    class="relative rounded-6px itemBox"
    style="width: 100px; height: 100px;"
    @mouseenter.stop="enterUploadImg"
    @mouseleave.stop="leaveUploadImg"
  >
    <template v-if="!loading">
      <DwImage class="w-100px h-100px" :src="imgUrl" />
      <transition name="el-fade-in">
        <div v-show="showThum" class="w-100px h-100px flex-center absolute rounded-6px thumbnail" @click.stop>
          <el-icon :size="14" color="#fff" @click="handleBtn(1)"><zoom-in /></el-icon>
          <el-icon class="ml-10px" :size="20" color="#fff" @click="handleBtn(2)"><Edit /></el-icon>
          <el-popconfirm
            v-if="delBtn"
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="InfoFilled"
            icon-color="#f00"
            title="确认删除吗？"
            @confirm="handleBtn(3)"
          >
            <template #reference>
              <el-icon
                class="ml-10px"
                :size="20"
                color="#fff"
              ><Delete /></el-icon>
            </template>
          </el-popconfirm>
        </div>
      </transition>
    </template>
    <template v-if="loading">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="100px"
           height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="27.5" cy="57.5" r="5" fill="#fe718d">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                   values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
        </circle> <circle cx="42.5" cy="57.5" r="5" fill="#f47e60">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                   values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.44999999999999996s"></animate>
        </circle> <circle cx="57.5" cy="57.5" r="5" fill="#f8b26a">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                   values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.3s"></animate>
        </circle> <circle cx="72.5" cy="57.5" r="5" fill="#abbd81">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite"
                   values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.15s"></animate>
        </circle>
      </svg>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { ElIcon } from 'element-plus'
import { Edit, Delete, ZoomIn } from '@element-plus/icons-vue'
import DwImage from '~/components/DwImage'

const props = defineProps({
  imgUrl: String,
  fileArr: [Array, String],
  index: Number,
  delBtn: Boolean
})

const emit = defineEmits(['change', 'handleBtn'])

const showThum = ref(false)

const loading = ref(false)

const enterUploadImg = () => {
  showThum.value = true
}

const leaveUploadImg = () => {
  showThum.value = false
}

const handleBtn = (type) => {
  emit('handleBtn', type)
}

defineExpose({
  showThum,
  loading
})
</script>

<style lang="scss" scoped>
.itemBox {
  border: 1px solid var(--el-border-color);
  cursor: pointer;
}
.thumbnail {
  top: 0;
  left: 0;
  background-color: rgba($color: #000, $alpha: 0.5);
}
</style>
