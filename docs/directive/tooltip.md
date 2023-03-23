<script setup>
import Tooltip from './examples/tooltip'
</script>

# v-tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

<Tooltip />

<<<@/directive/examples/tooltip.vue

<style>
table th:first-of-type {
    width: 20%;
}
table th:nth-of-type(2) {
    width: 60%;
}
table th:nth-of-type(3) {
    width: 20%;
}
</style>

| 方法名         | 说明  | 值      |
|-------------|-----|--------|
| v-tooltip | 鼠标hover显示内容 | string |