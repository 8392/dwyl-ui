import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [
    // 添加JSX插件
    vueJsx(),
    Unocss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
      '~': fileURLToPath(new URL('../packages', import.meta.url))
    },
    extensions: ['.js', '.jsx', '.json', '.vue', '.css', '.scss']
  },
  // 这里变更一下端口
  server: {
    port: 3000
  }
})
