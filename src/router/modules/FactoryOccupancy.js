/* 厂家入住 */
import { getViewComponent } from '@/utils/utils'

const ManufactEquip = () => getViewComponent('FactoryOccupancy/ManufactEquip/index')
const Manufactnfo = () => getViewComponent('FactoryOccupancy/Manufactnfo/index')
const ProductList = () => getViewComponent('FactoryOccupancy/ProductList/index')
const ReleaseProduct = () => getViewComponent('FactoryOccupancy/ReleaseProduct/index')
const addAccess = () => getViewComponent('FactoryOccupancy/addAccess/first')
const addAccessModel = () => getViewComponent('FactoryOccupancy/addAccess/model')
const accessSecond = () => getViewComponent('FactoryOccupancy/addAccess/second')
const manufactnfoHome = () => getViewComponent('FactoryOccupancy/Home/index')
const ProductAccessList = () => getViewComponent('FactoryOccupancy/ProductAccessList/index')
const agreement = () => getViewComponent('FactoryOccupancy/agreement/index')
const agreementTest = () => getViewComponent('FactoryOccupancy/agreement/test')
const CertificationStatus = () => getViewComponent('FactoryOccupancy/CertificationStatus/index')

export default [
  {
    path: '/manufactnfoHome',
    name: 'manufactnfoHome',
    component: manufactnfoHome,
    meta: {
      title: '厂家入住-首页'
    }
  },
  {
    path: '/productAccessList',
    name: 'productAccessList',
    component: ProductAccessList,
    meta: {
      title: '产品接入列表',
      isBreadcrumb: true // 是否显示面包屑
    }
  },
  {
    path: '/manufactnfo',
    name: 'manufactnfo',
    component: Manufactnfo,
    meta: {
      title: '厂家信息'
    }
  },
  {
    path: '/productList',
    name: 'productList',
    component: ProductList,
    meta: {
      title: '产品列表',
      isBreadcrumb: true // 是否显示面包屑
    }
  },
  {
    path: '/releaseProduct',
    name: 'releaseProduct',
    component: ReleaseProduct,
    meta: {
      title: '发布产品'
    }
  },
  {
    path: '/addAccess',
    name: 'addAccess',
    component: addAccess,
    meta: {
      title: '产品接入-新增'
    }
  },
  {
    path: '/addAccessModel',
    name: 'addAccessModel',
    component: addAccessModel,
    meta: {
      title: '产品接入-物模型添加'
    }
  },
  {
    path: '/accessSecond',
    name: 'accessSecond',
    component: accessSecond,
    meta: {
      title: '产品接入-添加版本'
    }
  },
  {
    path: '/manufactEquip',
    name: 'manufactEquip',
    component: ManufactEquip,
    meta: {
      title: '厂家设备',
      isBreadcrumb: true // 是否显示面包屑
    }
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: agreement,
    meta: {
      title: '协议解析',
      isBreadcrumb: true
    }
  },
  {
    path: '/agreementTest',
    name: 'agreementTest',
    component: agreementTest,
    meta: {
      title: '协议调试',
      isBreadcrumb: true
    }
  },
  {
    path: '/certificationStatus',
    name: 'certificationStatus',
    component: CertificationStatus,
    meta: {
      title: '认证状态'
      // isBreadcrumb: true
    }
  }
]
