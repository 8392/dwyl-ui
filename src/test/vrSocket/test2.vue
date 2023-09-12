<template>
  <div class="p-20px">
    <div>
      <div class="pb-20px">
        <el-button type="primary" @click="loginRoomMeth">登录</el-button>
        <el-button @click="startPlayingStreamMeth">视频通话</el-button>
      </div>
      <div id="localVideo"></div>
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

</script>

<style lang="scss" scoped>
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
</style>
