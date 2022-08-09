
<template>
  <div class="p-20px w">
    <DwGrid
      :minWidth="200"
      :columnGap="20"
      :rowGap="20"
      @sizeChange="sizeChange"
    >
      <DwCol class="bg-#fae3d9 h-200px" :key="item" v-for="item in 26">
        <!-- <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div> -->
      </DwCol>
    </DwGrid>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sizeChange = (e) => {
  console.log('e', e)
}

</script>

<style lang="scss" scoped>

</style>
