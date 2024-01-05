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
