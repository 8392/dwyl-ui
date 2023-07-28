# dwyl-ui组件库

### 所有组件
-  DwButton
-  DwSteps
-  DwStep
-  DwTable
-  DwDialog
-  DwPagination
-  DwDialogFoot
-  DwGrid
-  DwCol
-  DwSelect
-  DwOption
-  DwUpload
-  DwProjectConfig
-  DwPicker
-  DwEmpty
-  DwImage

### 常用业务hooks
- dwHooks

### 常用utils工具函数

- dwUtils


### 示例代码


`DwProjectConfig`
+ 项目初始化配置（必须），项目初始化的时候加在最外层，在APP.vue中添加，代表是那个项目
+ 1代表物联网
+ 2代表后台

```vue
<template>
  <DwProjectConfig :id="2">
    <router-view />
  </DwProjectConfig>
</template>

<script setup>
import { ref } from 'vue'

</script>
```

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

    <DwUpload fileType="pdf" list-type="text" class="uploadPdf" v-model="testReportPdf">
      <dw-button icon="plus">上传PDF</dw-button>
    </DwUpload>
    <div>
      <div>结果</div>
      <div>{{testReportPdf}}</div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'

const imageLink = ref('https://iot.diweiyunlian.cn:1443/iot-file/311738491240075264/a.png')
const testReportPdf = ref('https://fire.diweiyunlian.cn/file/特斯拉.pdf,https://fire.diweiyunlian.cn/file/特斯拉 - 副本.pdf')

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



`DwPicker`

`如果需要单个时间，请与作者联系`

- 目前只支持时间范围，单个时间还是用el-date-picker

```vue

<template>
  <div>
    <DwPicker
      v-model:start="params.startTime"
      v-model:end="params.endTime"
    />
    <dw-button @click="getTime">获取时间</dw-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const params = ref({
  startTime: '',
  endTime: ''
})

const getTime = () => {
  console.log('时间结果', params.value)
}
</script>
```



`DwImage`


```vue

<template>
  <div>
    <DwImage class="w-200px" :src="currImg" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currImg = ref('https://fire.diweiyunlian.cn/file/312009389047525376.png')

</script>
```


`DwEmpty`

`目前支持4种状态，默认是暂无数据（noData）`

+ noData
+ 404
+ error
+ loadFail

```vue

<template>
  <DwEmpty type="noData" />
  <DwEmpty type="404" />
  <DwEmpty type="error" />
  <DwEmpty type="loadFail" />
</template>

```


