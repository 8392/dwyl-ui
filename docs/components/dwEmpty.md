<script setup>
import Bacsic from '../examples/dwEmpty/bacsic.vue';
</script>

# dwEmpty 空白占位

常用网格列表布局

## 基础用法

<Bacsic />

<<<@/examples/dwEmpty/bacsic.vue

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

| 属性名  | 说明      | 取值         |
|------|---------|------------|
| type | 空白占位的类型 | 'noData' \| '404' \| 'error' \| 'loadFail' |
