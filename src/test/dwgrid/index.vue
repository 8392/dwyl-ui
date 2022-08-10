
<template>
  <div class="p-20px w">
    <DwGrid
      :minWidth="200"
      :columnGap="20"
      :rowGap="20"
      @sizeChange="sizeChange"
    >
      <DwCol v-for="item in 26" :key="item" class="bg-#fae3d9 h-200px">
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
