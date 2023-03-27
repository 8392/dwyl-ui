<script setup>
import Bacsic from '../examples/dwImage/bacsic.vue';
</script>

# dwImage 查看图片

代替< img >标签使用

## 基础用法

<Bacsic />

<<<@/examples/dwImage/bacsic.vue

## Attributes

<style>
table th:first-of-type {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 100%;
}
table th:nth-of-type(3) {
    width: 100px;
}
</style>

| 属性名       | 说明            | 取值      |
|-----------|---------------|---------|
| isPreview | 是否可以点击预览      | boolean |
| src       | 图片地址          | string  |
| title       | 鼠标hover时展示的文本 | string  |