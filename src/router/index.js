import { createRouter, createWebHistory } from 'vue-router'
import testTable from '@/test/testTable'

/* 测试专用 */

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior () {
    return { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'testTable',
      component: testTable
    }
  ]
})

export async function setupRouter (app) {
  app.use(router)
  // 路由守卫
  await router.isReady()
}
