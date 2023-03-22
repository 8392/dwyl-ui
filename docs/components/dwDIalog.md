<script setup>
import Bacsic from '../examples/dwDialog/bacsic.vue';
</script>

# dwDialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

<Bacsic />

<<<@/examples/dwDialog/bacsic.vue

## Attributes

| 属性名                          | 说明                                                       | 类型                                              | 可选值   | 默认值 |
| ----------------------------- |----------------------------------------------------------|-------------------------------------------------|-------| ------- |
| model-value / v-model         | 是否显示 Dialog                                              | boolean                                         | —     | —       |
| title                         | Dialog 对话框 Dialog 的标题， 也可通过具名 slot （见下表）传入               | string                                          | —     | —       |
| width                         | Dialog 的宽度                                               | string / number                                 | —     | 50%     |
| fullscreen                    | 是否为全屏 Dialog                                             | boolean                                         | —     | false   |
| top                           | Dialog CSS 中的 margin-top 值                               | string                                          | —     | 15vh    |
| modal                         | 是否需要遮罩层                                                  | boolean                                         | —     | true    |
| append-to-body                | Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true     | boolean                                         | —     | false   |
| lock-scroll                   | 是否在 Dialog 出现时将 body 滚动锁定                                | boolean                                         | —     | true    |
| custom-class<DeprecatedTag /> | Dialog 的自定义类名                                            | string                                          | —     | —       |
| open-delay                    | Dialog 打开的延时时间，单位毫秒                                      | number                                          | —     | 0       |
| close-delay                   | Dialog 关闭的延时时间，单位毫秒                                      | number                                          | —     | 0       |
| close-on-click-modal          | 是否可以通过点击 modal 关闭 Dialog                                 | boolean                                         | —     | true    |
| close-on-press-escape         | 是否可以通过按下 ESC 关闭 Dialog                                   | boolean                                         | —     | true    |
| show-close                    | 是否显示关闭按钮                                                 | boolean                                         | —     | true    |
| before-close                  | 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候. | Function(done) (done is used to close the Dialog) | —     | —       |
| draggable                     | 	为 Dialog 启用可拖拽功能                                        | boolean                                         | —     | false   |
| center                        | 是否让 Dialog 的 header 和 footer 部分居中排列                      | boolean                                         | —     | false   |
| align-center                  | 	是否水平垂直对齐对话框                                             | boolean                                         | —     | false   |
| destroy-on-close              | 当关闭 Dialog 时，销毁其中的元素                                     | boolean                                         | —     | false   |
|       showFooter                        | 是否显示默认底部按钮                                               | boolean                                         |       |    false     |
|           footerType                              | 使用showFooter时设置                                          | string 'edit'\| 'add' |                 |         |

:::warning

custom-class 已被 弃用, 之后 将会被 移除到 2.3.0, 请使用 class.
:::

## Slots

| 插槽名                   | 说明                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| —                      | content of Dialog                                                                                     |
| header                 |对话框标题的内容；会替换标题部分，但不会移除关闭按钮。 |
| title<DeprecatedTag /> | 与 header 作用相同 请使用 header                                             |
| footer                 | Dialog 按钮操作区的内容                                                                          |

## Events

| 事件名             | 说明	                   | 参数 |
| ---------------- |-----------------------| ---------- |
| open             | Dialog 打开的回调          | —          |
| opened           | Dialog 打开动画结束时的回调     | —          |
| close            | Dialog 关闭的回调          | —          |
| closed           | Dialog 关闭动画结束时的回调     | —          |
| open-auto-focus  | 输入焦点聚焦在 Dialog 内容时的回调 | —          |
| close-auto-focus | 输入焦点从 Dialog 内容失焦时的回调 | —          |
|          leftBtn        | 左按钮回调                 |            |
|           reset       | 重置按钮回调                |            |
