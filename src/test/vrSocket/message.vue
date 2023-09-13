<template>
  <div>
    消息
    <el-button type="primary" @click="sendMessageMeth">发送消息</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ZIM } from 'zego-zim-web'
import zgConfig from './config.js'
const { appID, server, roomID, userID, token } = zgConfig

// 静态同步方法，创建 zim 实例，传入 AppID。
// create 方法仅第一次调用时会创建 ZIM 实例，后续调用会返回 null。
ZIM.create({ appID })
// 通过 getInstance 获取单实例，避免热更新导致 create 多次创建返回 null。
const zim = ZIM.getInstance()

const sendMessageMeth = () => {
  // console.log('你好啊', zim)

  // // 发送单聊 `Command` 信息

  // const toConversationID = '' // 对方 userID
  // const conversationType = 0 // 会话类型，取值为 单聊：0，房间：1，群组：2
  // const config = {
  //   priority: 1 // 设置消息优先级，取值为 低：1（默认），中：2，高：3
  // }

  // // 这里以 JSON 字符串 为例，需要将字符串转换为 Uint8Array
  // // receivePeerMessage 收到 type 为 2 的 Command 消息时，需要将 Uint8Array 转换为 JSON 字符串
  // const jsonText = JSON.stringify({ id: '111', name: '张三' })
  // const uint8Array = new Uint8Array(Array.from(unescape(encodeURIComponent(jsonText))).map((val) => val.charCodeAt(0)))

  // const messageCommandObj = { type: 2, message: uint8Array }
  // const notification = {
  //   onMessageAttached: function (message) {
  //     // todo: Loading
  //   }
  // }
  // zim.sendMessage(messageCommandObj, toConversationID, conversationType, config, notification)
  //   .then(() => {

  //   }).catch(() => {

  //   })

  // 发送自定义信息
  // 指定用户的 ID
  const toConversationID = 'xxxx'
  const message = '' // 自定义消息的文本内容
  const subType = 100 // 具体的自定义类型
  const searchedContent = ''// 自定义消息的检索字段。

  const zimCustomMessage = {
    message: message,
    subType: subType,
    searchedContent: searchedContent
  }

  // 发送消息的高级属性配置
  const conversationType = 0 // 会话类型，取值为 单聊：0，房间：1，群组：2
  const config = {
    priority: 1 // 设置消息优先级，取值为 低：1（默认），中：2，高：3
  }

  zim.sendMediaMessage(zimCustomMessage, toConversationID, conversationType, config)
    .then((res) => {
      console.log('发送成功', res)
    }).catch(() => {

    })
}

</script>

<style lang="scss" scoped>

</style>
