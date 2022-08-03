/* 项目管理 */
import { getViewComponent } from '@/utils/utils'

const Workbench = () => getViewComponent('ProjectManage/Workbench/index')
const ProDeviceList = () => getViewComponent('ProjectManage/deviceList/index')
const DeviceDetail = () => getViewComponent('ProjectManage/DeviceDetail/index')

export default [
  {
    path: '/workbench',
    name: 'workbench',
    component: Workbench
  },
  {
    path: '/proDeviceList',
    name: 'proDeviceList',
    component: ProDeviceList,
    meta: {
      title: '设备列表',
      isAlive: true
    }
  },
  {
    path: '/deviceDetail',
    name: 'deviceDetail',
    component: DeviceDetail,
    meta: {
      title: '设备详情',
      isBreadcrumb: true
    }
  }
]
