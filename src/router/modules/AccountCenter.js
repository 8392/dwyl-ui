import { getViewComponent } from '@/utils/utils'

const AccountCenter = () => getViewComponent('AccountCenter/index')
const Collection = () => getViewComponent('AccountCenter/Collection/index')
const MyMessage = () => getViewComponent('AccountCenter/MyMessage/index')
const Subaccount = () => getViewComponent('AccountCenter/Subaccount/index')
const Information = () => getViewComponent('AccountCenter/Information/index')

export default {
  path: '/accountCenter',
  name: 'accountCenter',
  component: AccountCenter,
  redirect: '/myMessage',
  meta: {
    title: '账号中心'
  },
  children: [
    {
      path: '/myMessage',
      name: 'myMessage',
      component: MyMessage,
      meta: {
        title: '我的消息'
      }
    },
    {
      path: '/subaccount',
      name: 'subaccount',
      component: Subaccount,
      meta: {
        title: '子账号管理'
      }
    },
    {
      path: '/information',
      name: 'information',
      component: Information,
      meta: {
        title: '基本信息'
      }
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: {
        title: '收藏'
      }
    }
  ]
}
