import { ref } from 'vue'
import { verifyCode, selfSendCode } from '@/api/post'
import { ElMessage } from 'element-plus'
import { REGEXP_PHONE } from '@/config'

export default () => {
  const time = ref(60)
  const start = ref(false)
  const countDown = () => {
    setTimeout(() => {
      if (time.value > 0) {
        time.value--
        countDown()
      } else {
        time.value = 60
        start.value = false
      }
    }, 1000)
  }
  const getCode = (phone, type) => {
    if (!phone) {
      ElMessage.error('请输入手机号')
      return
    }
    if (!REGEXP_PHONE.test(phone)) {
      ElMessage.error('手机号码格式错误')
      return
    }
    if (!start.value) {
      start.value = true
      countDown()
      let api = verifyCode
      /* 登录注册 */
      if (type === 3) {
        /* 找回密码 */
        api = selfSendCode
      }
      api(phone).then((rs) => {
        ElMessage({
          message: '短信发送成功',
          type: 'success'
        })
      })
    }
  }
  return {
    time,
    start,
    getCode
  }
}
