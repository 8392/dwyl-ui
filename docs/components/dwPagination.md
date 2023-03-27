<script setup>
import Bacsic from '../examples/dwPagination/bacsic.vue';
</script>

# dwPagination 分页

常用网格列表布局

## 基础用法

<Bacsic />

<<<@/examples/dwPagination/bacsic.vue

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

| 属性名  | 说明       | 取值     |
|------|----------|--------|
| total | 分页总数条数   | number |
| current-page | 当前分页数    | number |
| page-size | 每页显示条目个数 | number |
