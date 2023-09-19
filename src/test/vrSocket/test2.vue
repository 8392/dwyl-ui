<template>
  <div class="p-20px h-100vh">
    <div class="flex">
      <div class="pb-20px">
        <!-- <el-button type="primary" @click="loginRoomMeth">登录</el-button> -->
        <el-button type="primary" @click="startPlayingStreamMeth">求助专家</el-button>
        <el-button type="primary" @click="handleVideo">视频救助</el-button>

        <!-- <div class="pt-20px">
          <el-button @click="screenShotBtn">截屏</el-button>

          <el-button type="primary" @click="loginMessage">消息登录</el-button>
          <el-button type="primary" @click="joinBuild">加入房间</el-button>
          <el-button type="primary" @click="sendMessageMeth">发送消息</el-button>
        </div> -->

        <div id="localVideo"></div>

      </div>
      <!-- <div id="localVideo"></div> -->
      <div class="border-1px border-#f00">
        <div>专家发来的截图</div>
        <DwImage isPreview :src="imgSrc" />
      </div>
    </div>

    <div class="flex gap-20px mt-20px">
      <div v-for="(item, index) in userList" :id="`newUser_${item.streamID}`" :key="index" class="newUser">

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import ScreenShot from 'js-web-screen-shot'
import { ZIM } from 'zego-zim-web'
import { ElMessage } from 'element-plus'
import { dwUtils } from 'dwyl-ui'
import zgConfig from './config2.js'

const imgSrc = ref('')

const { appID, server, roomID, userID, token, serverSecret } = zgConfig
const zg = new ZegoExpressEngine(appID, server)

const isLogin = ref(false)

const config = {
  camera: {
    audioInput: 'default',
    video: true,
    audio: true,
    videoQuality: 4,
    frameRate: 15,
    width: 1280,
    height: 720,
    bitRate: 300
  }
}

const startPlayingStreamMeth = async () => {
  const streamID = parseInt(Math.random() * 999999) + ''

  const localStream = await zg.createStream(config)
  zg.startPublishingStream(streamID, localStream, { videoCodec: 'VP8' })

  const localView = zg.createLocalStreamView(localStream)

  localView.play('localVideo', {
    mirror: true,
    objectFit: 'cover',
    enableAutoplayDialog: true
  })
}

const userList = ref([])

zg.on('roomStreamUpdate', async (roomID, updateType, streamList, extendedData) => {
  console.log('加入房间----------------------------------你哈啊啊啊十大打撒打撒萨达萨达阿斯顿撒旦撒', streamList)
  // streams added
  if (updateType === 'ADD') {
    userList.value = streamList

    streamList.forEach(async item => {
      const remoteStream = await zg.startPlayingStream(item.streamID, config)

      const remoteView = zg.createRemoteStreamView(remoteStream)
      remoteView.play(`newUser_${item.streamID}`, {
        objectFit: 'cover',
        enableAutoplayDialog: true
      })

      console.log('加入房间', item)
    })
    // for (let i = 0; i < streamList.length; i++) {
    //   console.log('加入房间')
    //   // playMultipleStreamList.push(streamList[i])

    //   // // add item to streamList
    //   // appendHtml(streamList[i].streamID, streamList[i].user)
    //   // if (playObj[streamList[i].user.userID]) {
    //   //   $(`#m-${streamList[i].user.userID}`).attr('data-id', streamList[i].streamID)
    //   //   stopToStart(playObj[streamList[i].user.userID], streamList[i].streamID)
    //   //   $(`#s-${streamList[i].user.userID}`).text(streamList[i].streamID)
    //   // }
    //   // playObj[streamList[i].user.userID] = streamList[i].streamID
    // }
  } else if (updateType === 'DELETE') {
    console.log('退出房间')
  }
})

function base64ToFile (data, filename) {
  let arr = data.split(','); let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1]); let n = bstr.length; let u8arr = new Uint8Array(n)
  let suffixArr = mime.split('/')
  if (suffixArr.length && !filename) {
    let suffix = suffixArr[suffixArr.length - 1]
    filename = new Date().getTime() + '-' + Math.floor((Math.random() * 10000)) + '.' + suffix
  }
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// 截图成功完成的回调
const completeCallback = (data) => {
  let blob = base64ToFile(data.base64)

  const res = dwUtils.blobToUrlImg(blob)

  imgSrc.value = blob
  console.log('截图成功res', blob)
}

const screenShotBtn = () => {
  const res = new ScreenShot({
    // 是否启用webrtc，值为boolean类型，值为false则使用html2canvas来截图
    enableWebRtc: false,
    // 层级级别，这个要比你页面上其他元素的z-index的值大，不然截不了
    level: 600000,
    completeCallback
    // closeCallback: this.closeFn // 截图取消的回调
  })
}

ZIM.create({ appID })
// 通过 getInstance 获取单实例，避免热更新导致 create 多次创建返回 null。
const zim = ZIM.getInstance()

// userID
// userName

const loginMessage = async () => {
  try {
    await zim.login({ userID, userName: userID }, token)
    ElMessage.success('消息登录成功')
  } catch (err) {
    console.log('错误', err)
  }
}

loginMessage()

// 收到单聊通信的消息回调

zim.on('receivePeerMessage', function (zim, res) {
  const extendedData = JSON.parse(res.messageList[0].extendedData)
  console.log('消息来了', extendedData)

  const loginRoomMeth = async () => {
    try {
      isLogin.value = await zg.loginRoom(extendedData.roomID, token, { userID, userName: userID }, { userUpdate: true })
      ElMessage.success('登录成功')
      startPlayingStreamMeth()
    } catch (err) {
      console.log('错误', err)
    }
  }
  if (extendedData.connectVideo) {
    loginRoomMeth()
  } else {
    imgSrc.value = res.messageList[0].fileDownloadUrl
  }
})

// 邀请者拒绝邀请后的回调通知
zim.on('callUserStateChanged', (zim, info) => {
  // 相关的 callID
  const changeCallID = info.callID

  info.callUserList.forEach(userInfo => {
    console.log('拒绝了', userInfo)

    // 状态变化用户的 userID、最新用户状态、透传字段（与用户该调用接受、拒绝、退出呼叫时携带的 extended data 一致）
    const { userID, state, extendedData } = userInfo
    // state = 2 表示接受，具体可以参考枚举 ZIMCallUserState
    console.log('AA', state)
    if (state == 2) {
      // 您的业务逻辑
    }
  })
})

// 呼叫成员收到的回调通知
zim.on('callInvitationEnded', (zim, info) => {
  console.log('结束视频', info)
  // console.log('callInvitationEnded', info)
})

const sendMessageMeth = () => {
  // 发送自定义信息
  // 指定用户的 ID
  const toConversationID = 'caibo'

  console.log('发送', imgSrc.value)
  const zimCustomMessage = {
    fileLocalPath: imgSrc.value,
    type: 11
  }

  // 发送消息的高级属性配置
  const conversationType = 0 // 会话类型，取值为 单聊：0，房间：1，群组：2
  const config = {
    priority: 1 // 设置消息优先级，取值为 低：1（默认），中：2，高：3
  }

  zim.sendMediaMessage(zimCustomMessage, toConversationID, conversationType, config)
    .then((res) => {
      // console.log('发送成功11，图片', res)
    }).catch(() => {

    })

  // var toConversationID = ''; // 对方 userID
  // var conversationType = 0; // 会话类型，取值为 单聊：0，房间：1，群组：2
  // var config = {
  //   priority: 1, // 设置消息优先级，取值为 低：1（默认），中:2，高：3
  // };

  // let messageTextObj = { type: 1, message: '文本消息内容', extendedData: '消息的扩展信息（可选）' }
  // let notification = {
  //   onMessageAttached: function (message) {
  //     // todo: Loading
  //   }
  // }

  // zim.sendMessage(messageTextObj, toConversationID, conversationType, config, notification)
  //   .then(function (res) {
  //     console.log('成功', res)
  //     // 发送成功
  //   }).catch(function (err) {
  //     // 发送失败
  //     console.log('失败', err)
  //   })
}

const joinBuild = async () => {
  await joinRoom()
}

const handleVideo = () => {
  /** 向在线用户发送呼叫邀请 */
  const invitees = ['test001'] // 被邀请人ID列表
  const config = { timeout: 30, mode: 1 } // 邀请超时时间，单位为秒，范围1-600
  zim.callInvite(invitees, config)
    .then((res) => {
      console.log('发送邀请', res)
      // 操作成功
      // 此处的 callID 是用户发起呼叫后，SDK 内部生成的 ID，用于唯一标识一次呼叫邀请；之后发起人取消呼叫、被邀请人接受/拒绝呼叫，都会使用此 callID
    })
    .catch(err => {
      // 操作失败
    })
}
</script>

<style lang="scss">
#localVideo {
  width: 400px;
  height: 300px;
  border: 1px solid #dfdfdf;
}
.newUser{
  width: 400px;
  height: 300px;
  border: 1px solid #f00;
}

.confirm  {
  width: 40px !important;
  background-image: inherit !important;
  position: relative;
  &::before{
    cursor: pointer;
    text-align: center;
    line-height: 24px;
    content: '发送';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #f00;
  }
}

</style>
