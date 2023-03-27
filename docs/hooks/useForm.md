# useForm 

常用表单hook

## 搭配弹窗表单使用

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

| 属性名    | 说明              | 
|--------|-----------------|
| form  | 绑定表单boject      |
| onSubmit   | 默认提交回调          |
| editRef  | 设置表单ref 处理校验    |
| loading   | 点击提交时的loading状态 |
| onReset   | 重置按钮默认方法        |
| onClose  | 弹窗默认关闭方法        |
| dwDialogRef  | 绑定ref 处理弹窗关闭与打开 |
| subApi  | 点击提交时的接口地址      |
| initPicture  | 针对后端初始化图片格式     |

## props

| 属性名       | 说明          | 
|-----------|-------------|
| api       | 点击提交时的接口地址 |
| callback   | 点击提交后的回调    |
| defForm | 初始化请求参数     |