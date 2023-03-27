

# dwTable 表格

引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

简单的步骤条。

设置 active 属性，接受一个 Number，表明步骤的 index，从 0 开始。 需要定宽的步骤条时，设置 space 属性即可，它接受 Number， 单位为 px， 如果不设置，则为自适应。 设置 finish-status 属性可以改变已经完成的步骤的状态。


<<<@/examples/dwTable/bacsic.vue

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

## Attributes

| 属性名            | 说明       | 取值            |
|----------------|----------|---------------|
| column         | 列        | object        | 
| api            | 列表请求接口   | string        | 
| params            | 列表请求接口参数 | object        | 
| height            | 表格高度     | string,number | 
| isPage            | 是否分页     | boolean       | 

## column

| 属性名    | 说明      | 取值            |
|--------|---------|---------------|
| label  | 列名      | string        | 
| prop    | 对应属性名   | string        | 
| formatter | 格式化属性   | function      | 
| render | 格式化表格内容 | function | 

