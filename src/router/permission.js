import { useUserStore } from '@/store'
import { ElLoading } from 'element-plus'

/* 不用登录可以访问的页面 */
const WhiteList = ['login', 'productHome', 'productDetail']

/* 厂家入住页面 */
const isFactoryPage = ['manufactnfoHome']

/* 子账号不能访问的路由 */
const subUserNoEntry = ['subaccount', 'myMessage', 'manufactnfoHome', 'productAccessList']

/**
 * 路由守卫函数
 * @param router - 路由实例
 */

export function createRouterGuard (router) {
  const user = useUserStore()
  router.beforeEach(async (to, form, next) => {
    /* 如果登录了 */
    if (user.isLogin) {
      // 获取用户角色信息，根据角色判断权限
      if (!user.info) {
        const loadingInstance = ElLoading.service({
          lock: true,
          text: '正在加载数据，请稍候~',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        try {
          // const res = await user.getUserMenus()
          /* 获取用户信息-和-厂家信息 */
          await Promise.all([user.getInfo(), user.getManufactDetails()])
          loadingInstance.close()
        } catch (err) {
          loadingInstance.close()
        }
      }

      /* 如果是子账号，没有权限访问这些页面 */
      if (user?.info?.roles?.includes('subUser') && subUserNoEntry.includes(to.name)) {
        next('/notFound')
        return
      }

      /* 认证成功了，不让进入，失败的页面 */
      if (to.name === 'certificationStatus') {
        if (user?.manufactInfo?.certified === 1) {
          next({ name: 'manufactnfoHome' })
          return
        }
      }

      if (isFactoryPage.includes(to.name)) {
        /* 进入厂家入住页面，判断是否认证 */
        /* 认证未通过的状态---页面 */
        if (user?.manufactInfo?.certified !== 1) {
          next({ name: 'certificationStatus' })
          return
        }
      }

      next()
    } else {
      if (WhiteList.includes(to.name)) {
        next()
      } else {
        next({ name: 'login' })
      }
    }
  })

  router.afterEach((to, from, next) => {

  })
}
