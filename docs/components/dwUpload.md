<script setup>
import Bacsic from '../examples/dwUpload/bacsic.vue';
</script>

# dwUpload 图片上传

通过点击上传文件。

## 基础用法

<Bacsic />

<<<@/examples/dwUpload/bacsic.vue

## Attributes

| 属性名       | 说明       | 取值            |
|-----------|----------|---------------|
| isHttp          | 是否请求上传接口 | boolean       | 
| fileType      | 上传文件类型   | string        | 
| modelValue         | 双向绑定值    | string, array | 
| limit         | 允许上传数量   | number        | 
