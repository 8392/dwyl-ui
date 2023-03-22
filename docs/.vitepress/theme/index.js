import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import DwylUi from '../../../packages/index'
import 'uno.css'


export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
      app.use(ElementPlus, { locale: zhCn })
      app.use(DwylUi)
    }
}