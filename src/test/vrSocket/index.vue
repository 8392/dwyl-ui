<template>
  <div class="p-20px">
    <div>
      <div class="pb-20px">
        <el-button type="primary" @click="loginRoomMeth">登录</el-button>
        <el-button @click="startPlayingStreamMeth">拉流</el-button>
      </div>
      <div id="remoteVideo"></div>
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
  const streamId = '57b4d9b91dc6182713ca8ca6756efba64c123bc1'
  const options = {
    video: true,
    audio: true
  }
  const remoteStream = await zg.startPlayingStream(streamId, options)
  const remoteView = zg.createRemoteStreamView(remoteStream)

  remoteView.play('remoteVideo', {
    objectFit: 'cover',
    enableAutoplayDialog: true
  })
}

</script>

<style lang="scss" scoped>
#remoteVideo {
  width: 400px;
  height: 300px;
    border: 1px solid #dfdfdf;
}
</style>
