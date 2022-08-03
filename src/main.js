import { createApp } from 'vue'

import App from './App.vue'

// import dwylUi from '../packages/components/index'
import dwylUi from '../dist/xx.es'

import 'uno.css'
import '@/styles/global.scss'
import '../dist/style.css'

async function setupApp () {
  const app = createApp(App)

  app.use(dwylUi)
  // setupStore(app)
  // await setupRouter(app)
  app.mount('#app')
}

setupApp()
