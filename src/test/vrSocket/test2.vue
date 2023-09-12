<template>
  <div class="p-20px">
    <div>
      <div class="pb-20px">
        <el-button type="primary" @click="loginRoomMeth">登录</el-button>
        <el-button @click="startPlayingStreamMeth">视频通话</el-button>
      </div>
      <div id="localVideo"></div>
    </div>

    <div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import { ElMessage } from 'element-plus'
import zgConfig from './config.js'

const { appID, server, roomID, userID, token } = zgConfig
const zg = new ZegoExpressEngine(appID, server)

const isLogin = ref(false)

const loginRoomMeth = async () => {
  try {
    isLogin.value = await zg.loginRoom(roomID, token, { userID, userName: userID }, { userUpdate: true })
    ElMessage.success('登录成功')
  } catch (err) {
    console.log('错误', err)
  }
}

const startPlayingStreamMeth = async () => {
  const streamID = parseInt(Math.random() * 999999) + ''
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

  const localStream = await zg.createStream(config)
  zg.startPublishingStream(streamID, localStream, { videoCodec: 'VP8' })

  const localView = zg.createLocalStreamView(localStream)

  localView.play('localVideo', {
    mirror: true,
    objectFit: 'cover',
    enableAutoplayDialog: true
  })
}

</script>

<style lang="scss" scoped>
#localVideo {
  width: 400px;
  height: 300px;
  border: 1px solid #dfdfdf;
}
</style>
