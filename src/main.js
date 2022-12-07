import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'

import 'uno.css'
import '@/styles/global.scss'

import dwylUi from '../packages'
// import dwylUi from '../dist/dwyl-ui.mjs'
// import '../dist/style.css'

async function setupApp () {
  const app = createApp(App)
  app.use(ElementPlus, { locale: zhCn })
  app.use(dwylUi)
  // setupStore(app)
  // await setupRouter(app)
  app.mount('#app')
}

setupApp()
