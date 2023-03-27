<script setup>
import Bacsic from '../examples/dwSelect/bacsic.vue';
</script>

# dwSelect 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选 v-model 的值为当前被选中的 el-option 的 value 属性值

<Bacsic />

<<<@/examples/dwSelect/bacsic.vue


## Attributes

| 属性名                                | 说明                                                            | 类型                                       | 可选值	                                                                                           | 说明              |
|------------------------------------|---------------------------------------------------------------| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- |-----------------|
| model-value / v-model              | 选中项绑定值	                                                       | array / string / number / boolean / object | —                                                                                                         | —               |
| multiple                           | 是否多选	                                                         | boolean                                    | true / false                                                                                              | false           |
| disabled                           | 是否禁用	                                                         | boolean                                    | true / false                                                                                              | false           |
| value-key                          | 作为 value 唯一标识的键名，绑定值为对象类型时必填                                  | string                                     | —                                                                                                         | value           |
| size                               | 输入框尺寸	                                                        | string                                     | large/default/small                                                                                       | default         |
| clearable                          | 是否可以清空选项	                                                     | boolean                                    | true / false                                                                                              | false           |
| collapse-tags                      | 多选时是否将选中值按文字的形式展示	                                            | boolean                                    | true / false                                                                                              | false           |
| collapse-tags-tooltip              | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true	 | boolean                                    | true / false                                                                                              | false           |
| multiple-limit                     | multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制	          | number                                     | —                                                                                                         | 0               |
| name                               | Select 输入框的原生 name 属性	                                        | string                                     | —                                                                                                         | —               |
| effect                             | Tooltip 主题，内置了 dark / light 两种                                | string                                     | string                                                                                                    | light           |
| autocomplete                       | Select 输入框的原生 autocomplete 属性                                 | string                                     | —                                                                                                         | off             |
| placeholder                        | 占位文字	                                                         | string                                     | —                                                                                                         | Select          |
| filterable                         | Select 组件是否可筛选                                                | boolean                                    | true / false                                                                                              | false           |
| allow-create                       | 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效                    | boolean                                    | true / false                                                                                              | false           |
| filter-method                      | 自定义筛选方法                                                       | function                                   | —                                                                                                         | —               |
| remote                             | 其中的选项是否从服务器远程加载                                               | boolean                                    | true / false                                                                                              | false           |
| remote-method                      | 自定义远程搜索方法                                                     | function                                   | —                                                                                                         | —               |
| remote-show-suffix                 | 远程搜索方法显示后缀图标                                                  | boolean                                    | true / false                                                                                              | false           |
| loading                            | 是否正在从远程获取数据                                                   | boolean                                    | true / false                                                                                              | false           |
| loading-text                       | 从服务器加载内容时显示的文本                                                | string                                     | —                                                                                                         | Loading         |
| no-match-text                      | 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置                                | string                                     | —                                                                                                         | No matching data |
| no-data-text                       | 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容                               | string                                     | —                                                                                                         | No data         |
| popper-class                       | 选择器下拉菜单的自定义类名                                                 | string                                     | —                                                                                                         | —               |
| reserve-keyword                    | 当 multiple 和 filter被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词           | boolean                                    | true / false                                                                                              | true            |
| default-first-option               | 是否在输入框按下回车时，选择第一个匹配项。 需配合 filterable 或 remote 使用              | boolean                                    | true / false                                                                                              | false           |
| teleported                         | 是否将下拉列表元素插入 append-to 指向的元素下                                  | boolean                                    | true / false                                                                                              | true            |
| persistent                         | 当下拉选择器未被激活并且persistent设置为false，选择器会被删除。                       | boolean                                    | true / false                                                                                              | true            |
| automatic-dropdown                 | 对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单                    | boolean                                    | true / false                                                                                              | false           |
| clear-icon                         | 	自定义清除图标组件                                   | `string \| Component`                      | —               | CircleClose      |
| fit-input-width                    | 下拉框的宽度是否与输入框相同    | boolean                                    | true / false                                                                                              | false           |
| suffix-icon                        | 自定义后缀图标组件                                  | `string \| Component`                      | —               | ArrowDown        |
| tag-type                           | 标签类型                                                      | string                                     | success/info/warning/danger                                                                               | info            |
| validate-event                     | 是否触发表单验证                            | boolean                                    | true / false                                                                                              | true            |
| placement                          | 下拉框出现的位置	                                          | string                                     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom-start    |


## Select Events

| 事件名	           | 说明	                                                   | 回调参数                                      |
| -------------- | ------------------------------------------------------------- |-------------------------------------------|
| change         | 选中值发生变化时触发	                      | current selected value                    |
| visible-change | 下拉框出现/隐藏时触发                 | true when it appears, and false otherwise |
| remove-tag     | 多选模式下移除tag时触发               | removed tag value                         |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                                         |
| blur           | 当 input 失去焦点时触发                                     | (event: FocusEvent)                       |
| focus          | 当 input 获得焦点时触发                                   | (event: FocusEvent)                       |
