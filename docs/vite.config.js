import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'

import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [
    // 添加JSX插件
    vueJsx(),
    DefineOptions(),
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
    host: '0.0.0.0',
    port: 3000,
    hmr: true, // 启动热更新
    fs: {
      // 可以为项目根目录的上一级提供服务
      allow: ['..']
    }
  }
})
