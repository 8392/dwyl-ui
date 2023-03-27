
# v-permission 按钮权限指令

## 基本用法

将与后端约定的按钮key绑定到v-permisssion, 拥有该key权限的角色便会生效板块的显示与隐藏



<<<@/directive/examples/permission.vue

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

| 方法名         | 说明         | 值      |
|-------------|------------|--------|
| v-permisssion | 根据权限是否显示板块 | string |

:::warning

目前只有物联网平台使用
:::