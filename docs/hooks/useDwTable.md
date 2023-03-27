# useTable

常用表格hooks

## 搭配dwTable表格使用

<<<@/hooks/examples/useForm.vue

<style>
table th:first-of-type {
    width: 100px;
}
table th:nth-of-type(2) {
    width: 100%;
}
</style>

## callback

| 属性名    | 说明            | 
|--------|---------------|
| dialogVisible  | 对话框状态         |
| updatePage  | 刷新table列表     |
| dwTable  | 设置表单ref 处理刷新  |
| onDelete  | 列表默认删除方法      |
| onSearch  | 列表默认搜索方法      |
| params  | 列表请求参数        |
| onAdd  | 列表默认新增方法      |
| onEdit  | 列表默认编辑方法      |
| onClose  | 弹窗默认close方法   |
| currentItem  | 编辑列表时存储的当前点击项 |
| diaTitle  | 动态弹窗标题        |

## props

| 属性名    | 说明          | 
|--------|-------------|
| deleteApi  | 默认删除方法使用的接口 |
| diaName  | 弹窗主标题       |
| defParams  | 初始化请求参数     |