<script setup>
import Bacsic from '../examples/dwPicker/bacsic.vue';
</script>

# dwPicker 日期选择

常用日期选择器

## 基础用法

<Bacsic />

<<<@/examples/dwPicker/bacsic.vue

## Attributes

| 属性名       | 说明            | 取值      |
|-----------|---------------|---------|
| start | 开始时间绑定        | string |
| end       | 结束时间绑定        | string  |
| clearable       | 是否显示清除按钮	        | boolean  |
| startPlaceholder       | 范围选择时开始日期的占位内容        | string  |
| endPlaceholder       | 范围选择时结束日期的占位内容	        | string  |

## Events

| 名称              | 说明                                                                        | 回调参数                    |
|-----------------|---------------------------------------------------------------------------|-------------------------|
| change          | 用户确认选定的值时触发	                                     | `(val: typeof v-model)` |
| blur            | 在组件 Input 失去焦点时触发	                                                 | `(e: FocusEvent)`       |
| focus           | 在组件 Input 获得焦点时触发	                                               | `(e: FocusEvent)`       |
| calendar-change | 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 default-value 来设置成其他的日期。	 | `(val: [Date, Date])`   |
| panel-change    | 当日期面板改变时触发。	                                | `(date, mode, view)`    |
| visible-change  | 当 DatePicker 的下拉列表出现/消失时触发	                | `(visibility: boolean)` |
