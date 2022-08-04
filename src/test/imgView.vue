
<template>
  <div class="main flex flex-col">
    aq
    <div class="w-200px">
      <el-button @click="handleBtn">预览图片</el-button>
    </div>
  </div>
</template>

<script lang="jsx" setup>
// import { imgView } from '../../packages/utils/imgView'
import { dwUtils } from '../../dist/dwyl-ui.es'

const imgUrl = 'https://images.pexels.com/photos/10340617/pexels-photo-10340617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
const list = [
  imgUrl,
  imgUrl,
  imgUrl
]

const handleBtn = () => {
  // imgView(list)
  console.log('utils', dwUtils)
  dwUtils.dwImgView(list)
}

</script>

<style lang="scss">

</style>
