<template>
  <div class="slider">
    <div class="slider__track" :style="trackStyles">
      <div v-for="(slide, index) in slides" :key="index" class="slider__slide">
        <img :src="slide.src" :alt="slide.alt" />
      </div>
    </div>
    <div class="slider__nav">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ 'slider__nav-button--active': currentIndex === index }"
        class="slider__nav-button"
        @click="currentIndex = index"
      >{{ index + 1 }}</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import axios from 'axios'

console.log('axios', axios)
console.log('get', axios.get)

const img1 = 'https://n.sinaimg.cn/tech/crawl/116/w550h366/20210122/3dec-khxeamw5822755.jpg'
const img2 = 'https://www.nippon.com/cn/ncommon/contents/japan-glances/2003393/2003393.jpg'
const img3 = 'https://n.sinaimg.cn/tech/crawl/116/w550h366/20210122/3dec-khxeamw5822755.jpg'
export default {
  name: 'Slider',
  setup () {
    const currentIndex = ref(0)
    const slides = [
      { src: img1, alt: 'Slide 1' },
      { src: img2, alt: 'Slide 2' },
      { src: img3, alt: 'Slide 3' }
    ]

    const currentSlide = computed(() => {
      return slides[currentIndex.value]
    })

    const trackStyles = computed(() => {
      return {
        transform: `translateX(-${currentIndex.value * 100}%)`
      }
    })

    return {
      currentIndex,
      slides,
      currentSlide,
      trackStyles
    }
  }
}
</script>

<style>
.slider {
  position: relative;
  overflow: hidden;
}

.slider__track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider__slide {
  flex: 0 0 100%;
}

.slider__nav {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.slider__nav-button {
  background: #eee;
  border: none;
  border-radius: 50%;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  padding: 8px;
}

.slider__nav-button--active {
  background: #333;
  color: #fff;
}
</style>
