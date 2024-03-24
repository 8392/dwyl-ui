<template>
  <div ref="box" class="box">
    <div ref="point1" class="box_point1"></div>
    <div ref="point2" class="box_point2"></div>
    <div ref="point3" class="box_point3"></div>
    <svg class="connector">
      <line :x1="point1Pos.x" :y1="point1Pos.y" :x2="point2Pos.x" :y2="point2Pos.y"
            style="stroke:black;stroke-width:2" />
      <line :x1="point2Pos.x" :y1="point2Pos.y" :x2="point3Pos.x" :y2="point3Pos.y"
            style="stroke:black;stroke-width:2" />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const point1 = ref(null)
const point2 = ref(null)
const point3 = ref(null)
const box = ref(null)
const point1Pos = ref({ x: 0, y: 0 })
const point2Pos = ref({ x: 0, y: 0 })
const point3Pos = ref({ x: 0, y: 0 })

onMounted(() => {
  point1Pos.value = getCenterPosition(point1.value)
  point2Pos.value = getCenterPosition(point2.value)
  point3Pos.value = getCenterPosition(point3.value)
})

function getCenterPosition (element) {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2 - box.value.getBoundingClientRect().left,
    y: rect.top + rect.height / 2 - box.value.getBoundingClientRect().top
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

.box > div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  background-color: #f00;
}

.box_point1 {
  top: 20px;
  left: 30px;
}

.box_point2 {
  top: 300px;
  left: 300px;
}

.box_point3 {
  top: 400px;
  left: 200px;
}

.connector {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
