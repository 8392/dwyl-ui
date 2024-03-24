<template>
  <div ref="box" class="box">
    <div v-for="(point, index) in points" :key="index" ref="pointRef" class="point"
         :style="{ top: point.top + 'px', left: point.left + 'px' }"></div>
    <svg class="connector" width="500" height="500">
      <line v-for="(line, index) in lines" :key="index"
            :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
            style="stroke:black;stroke-width:2" />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const box = ref(null)
const points = ref([])
const lines = ref([])

const pointRef = ref(null)

onMounted(() => {
  updatePoints()
})

watch(points, () => {
  nextTick(() => {
    updateLines()
  })
})

function updatePoints () {
  // 模拟异步获取数据
  // 假设接口返回的数据格式为 [{ top: 20, left: 30 }, { top: 300, left: 300 }, { top: 400, left: 200 }]
  // 这里需要根据实际情况来获取数据，并更新 points 数组
  points.value = [
    { top: 20, left: 30 },
    { top: 100, left: 200 },
    { top: 220, left: 260 },
    { top: 300, left: 320 },
    { top: 300, left: 400 }
  ]
}

function updateLines () {
  lines.value = []

  points.value.forEach((item, index) => {
    const nextItem = points.value[index + 1]

    if (nextItem) {
      const startPoint = getCenterPosition(item, index)
      const endPoint = getCenterPosition(nextItem, index + 1)

      lines.value.push({
        x1: startPoint.x,
        y1: startPoint.y,
        x2: endPoint.x,
        y2: endPoint.y
      })
    }
  })
}

function getCenterPosition (item, index) {
  const width = pointRef.value[index].offsetWidth / 2
  const height = pointRef.value[index].offsetHeight / 2

  return {
    x: item.left + width,
    y: item.top + height
  }
}

</script>

<style scoped>
.box {
  width: 500px;
  height: 500px;
  position: relative;
  background-color: #ebf87a;
}

.point {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  background-color: #f00;
  z-index: 6;
}

.connector {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  border: 1px solid blue; /* 添加调试边框 */
}
</style>
