### vnode也是一个组件
1. `h`函数和`createVnode`生成的就是一个`vnode`
2. 所有可以直接像组件一样使用

### `useSlots`返回的slot插槽也是一个vnode

### Tabs组件开发思路
#### 方式一通过插槽便利
> 通过useSlots去找到所有的子组件插槽，然后循环tabs头部的标题
> slot子插槽在父组件中拿到的内容，是一个一个的`vnode`，vnode可以拿到组件里面的props的值
> 这样就可以循环`slot`插槽，通过循环找出子组件的props的当前active和父组件的激活的active比较，找出选中的vnode
> 然后通过组件的方式去渲染选中的`vnode`，或者通过`component`中的`is`属性去渲染当然的vnode

### 方式二，通过`provide`和`inject`去实现数据通信 

1. 如果通过useSlot和inject去拿
> 子组件去接受父组件当前的active值，和自己的active值比较，通过`v-if`去判断是否去渲染

2. 如果全部通过provide和inject去传值

> 那个在没个子组件中，初始化的时候默认去调用一下父组件的传递过来的新增方法，push当前子组件到父组件渲染的列表中
> 这样子组件再接受父组件点击时候的active，判断是否渲染

