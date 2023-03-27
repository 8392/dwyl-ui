<script setup>
import Bacsic from '../examples/dwSteps/bacsic.vue';
</script>

# dwSteps 步骤

引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

简单的步骤条。

设置 active 属性，接受一个 Number，表明步骤的 index，从 0 开始。 需要定宽的步骤条时，设置 space 属性即可，它接受 Number， 单位为 px， 如果不设置，则为自适应。 设置 finish-status 属性可以改变已经完成的步骤的状态。

<Bacsic />

<<<@/examples/dwSteps/bacsic.vue

## Attributes

| 属性名       | 说明                             | 取值      |
|-----------|--------------------------------|---------|
| space          | 每个 step 的间距，不填写将自适应间距。 支持百分比。  | number / string | —                                         | —          |
| direction      | 显示方向              | string          | vertical/horizontal                       | horizontal |
| active         | 设置当前激活步骤        | number          | —                                         | 0          |
| process-status | 设置当前步骤的状态         | string          | wait / process / finish / error / success | process    |
| finish-status  | 设置结束步骤的状态             | string          | wait / process / finish / error / success | finish     |
| align-center   | 进行居中对齐   | boolean         | —                                         | false      |
| simple         | 是否应用简洁风格  | boolean         | -                                         | false      |
