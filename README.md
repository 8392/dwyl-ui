# dwyl-ui组件库

### 所有组件
- DwButton
- DwSteps
- DwStep
- DwTable
- DwDialog
- DwPagination
- DwDialogFoot
- DwGrid
- DwCol
- DwSelect
- DwOption
- DwUpload
- DwProjectConfig

### 常用业务hooks
- dwHooks

### 常用utils工具函数

- dwUtils


### 示例代码

`DwSelect`
```vue

<template>
  <div>
    <dw-select
      v-model="value"
      placeholder="Select"
      >
      <dw-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </dw-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const options = [
  {
    value: '1',
    label: '啊实打实的，阿松大，玛纳斯ask领导看了发发监考老师发生'
  },
  {
    value: '2',
    label: 'Option2',
    disabled: true
  },
  {
    value: '3',
    label: 'Option3'
  },
  {
    value: '4',
    label: 'Option4'
  },
  {
    value: '5',
    label: 'Option5'
  }
]
</script>

```


`DwUpload`
```vue
<template>
  <div>
    <!-- 上传 -->
    <DwUpload fileType="img" multiple v-model="imageLink" />
  </div>
</template>

<script setup>

import { ref } from 'vue'

const imageLink = ref('https://iot.diweiyunlian.cn:1443/iot-file/311738491240075264/a.png')

</script>

```


`DwGrid`
```vue

<template>
  <div class="w">
    <DwGrid
      :minWidth="200"
      :columnGap="20"
      :rowGap="20"
      @sizeChange="sizeChange"
    >
      <DwCol class="bg-#fae3d9" :key="item" v-for="item in 26">
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
        <div>asdassa</div>
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
```
