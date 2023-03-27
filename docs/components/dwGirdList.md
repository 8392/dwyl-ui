
# dwGirdList 网格列表

常用网格列表布局

## 基础用法

<<<@/examples/dwGirdList/bacsic.vue

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

| 属性名 | 说明        | 取值     |
|  ----  |-----------|--------|
| api | 列表请求接口    | -      |
| params | 接口请求参数    | object |
| minWidth | 每个盒子的最小宽度 | number |
| rowGap | 行之间的间距    | number     |
| columnGap | 列之间的间距    | number     |

## Slots

| 插槽名                   | 说明     |
| ---------------------- |--------|
| —                      | 主体内容插槽 |

## Events

| 事件名             | 说明	         | 参数 |
| ---------------- |-------------| ---------- |
| callback             | 接口请求结束之后的回调 | —          |