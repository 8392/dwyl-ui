
<template>
  <div class="main flex flex-col">
    <dw-dialog
      v-model="dialogVisible"
      width="650px"
    >
      <div>666</div>
    </dw-dialog>

    <div class="w-200px">
      <dw-button @click="handleBtn">预览图片1</dw-button>
    </div>
    <div v-dwloading="true" class="w-200 h-200 bg-#ccc">

    </div>
  </div>
</template>

<script lang="jsx" setup>
// import { imgView } from '../../packages/utils/imgView'
import { ref } from 'vue'
// import * as dwUtils from '../../dist/dwyl-ui.es'
import * as dwUtils from '../../packages'

const imgUrl = 'https://images.pexels.com/photos/10340617/pexels-photo-10340617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
const list = [
  imgUrl,
  imgUrl,
  imgUrl
]

console.log('utils', dwUtils)

const dialogVisible = ref(false)
const handleBtn = () => {
  // imgView(list)
  dialogVisible.value = true
  // dwUtils.dwImgView(list)
}

</script>

<style lang="scss">

</style>
