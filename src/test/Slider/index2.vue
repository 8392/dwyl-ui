<template>
  <div class="carousel-container">
    <div ref="carouselTrack" class="carousel-track">
      <div v-for="(item, index) in items" :key="index" class="carousel-item">
        {{ index }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Carousel',
  setup (props) {
    const carouselTrack = ref(null)
    let currentOffset = 0
    const items = ref([
      'https://n.sinaimg.cn/tech/crawl/116/w550h366/20210122/3dec-khxeamw5822755.jpg',
      'https://www.nippon.com/cn/ncommon/contents/japan-glances/2003393/2003393.jpg',
      'https://n.sinaimg.cn/tech/crawl/116/w550h366/20210122/3dec-khxeamw5822755.jpg'
    ])

    const resetCarousel = () => {
      currentOffset = 0
      carouselTrack.value.style.transform = `translateX(${currentOffset}px)`
    }

    const moveCarousel = () => {
      currentOffset -= 1
      if (currentOffset <= -carouselTrack.value.offsetWidth / 2) {
        currentOffset = 0
        carouselTrack.value.style.transition = 'none'
        carouselTrack.value.style.transform = `translateX(${currentOffset}px)`
        setTimeout(() => {
          carouselTrack.value.style.transition = ''
          moveCarousel()
        })
      } else {
        carouselTrack.value.style.transform = `translateX(${currentOffset}px)`
        requestAnimationFrame(moveCarousel)
      }
    }

    onMounted(() => {
      resetCarousel()
      moveCarousel()
    })

    return {
      items,
      carouselTrack
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-container {
  width: 200px;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  width: 200px;
  height: 150px;
}

.carousel-item {
  // flex: 0 0 auto;
  flex: 0 0 100%;
  height: 100%;
  // width: 200px;
  &:first-child{
    background-color: #ccc;
  }
  &:nth-child(2){
    background-color: rgb(89, 143, 245);
  }
  &:nth-child(3){
    background-color: rgb(144, 236, 91);
  }
}
</style>
