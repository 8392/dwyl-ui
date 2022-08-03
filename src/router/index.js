import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import { createRouterGuard } from './permission'

import HelpCenter from '@/view/HelpCenter'/* 帮助中心 */
import AccountCenter from './modules/AccountCenter'/* 账号中心 */
import FactoryOccupancy from './modules/FactoryOccupancy'/* 厂家入住 */
import Product from './modules/Product' /* 商城 */
import ProjectManage from './modules/ProjectManage'/* 项目管理 */
import Login from '@/view/Login/index.vue'/* 登录 */
import NotFound from '@/view/StatusPage/NotFound.vue'/* 404页面 */

/* 测试专用 */
import Test from '@/view/Test/loading/loading2'

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior () {
    // if (to.name !== from.name) {
    return { left: 0, top: 0 }
    // }
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/',
      name: 'home',
      redirect: '/productHome',
      component: Layout,
      children: [
        {
          path: '/helpCenter',
          name: 'helpCenter',
          component: HelpCenter
        },
        ...ProjectManage,
        ...Product,
        ...FactoryOccupancy,
        AccountCenter
      ]
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/:pathMatch(.*)',
      // 访问主页的时候 重定向到index页面
      redirect: '/notFound'
    }
  ]
})

export async function setupRouter (app) {
  app.use(router)
  // 路由守卫
  createRouterGuard(router)
  await router.isReady()
}
