import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import Unocss from 'unocss/vite'

const getProxy = () => {
  return {
    '/proxy': {
      target: 'https://test.diweiyunlian.cn/gateway', // 后端接口的域名
      // target: 'http://192.168.1.3:9091', // dyw
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/proxy/, '')
    }
  }
}

// const configProxy = {
//   dyw: {
//     auth: 'http://192.168.1.3:8819',
//     manager: 'http://192.168.1.3:8881'
//   },
//   line: {
//     auth: 'http://222.209.208.86:1548',
//     manager: 'http://222.209.208.86:1548'
//   },
//   test: {
//     auth: 'http://139.186.136.53:1548',
//     manager: 'http://139.186.136.53:1548'
//   }
// }

// const getProxy = (name) => {
//   return {
//     '/auth': {
//       target: configProxy[name].auth,
//       rewrite: path => name === 'dyw' ? path.replace('/auth', '') : path
//     },
//     '/manager': {
//       target: configProxy[name].manager,
//       rewrite: path => name === 'dyw' ? path.replace('/manager', '') : path
//     }
//   }
// }

export default defineConfig({
  mode: 'production',
  plugins: [
    vue(),
    DefineOptions(),
    vueJsx(),
    Unocss(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  define: {
    'process.env': {}
  },
  build: {
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: [
        'axios',
        'element-plus',
        '@element-plus/icons-vue',
        'vue',
        'pinia',
        'sass',
        'vue-router',
        '@vitejs/plugin-vue',
        '@vitejs/plugin-vue-jsx',
        'eslint',
        'eslint-config-standard',
        'eslint-plugin-import',
        'eslint-plugin-node',
        'eslint-plugin-promise',
        'eslint-plugin-vue',
        'sass',
        'unocss',
        'vite',
        'vite-plugin-svg-icons'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    lib: {
      entry: './packages/index.js',
      // entry: './packages/components/index.js',
      name: 'dwyl-ui'
    }
  },
  // base: '/admin',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./packages', import.meta.url))
    },
    extensions: ['.js', '.jsx', '.json', '.vue', '.css', '.scss']
  },
  server: {
    host: '0.0.0.0',
    port: 8888,
    hmr: true, // 启动热更新
    proxy: getProxy('test') // dyw，test，line
  }
})
