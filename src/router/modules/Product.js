
import { getViewComponent } from '@/utils/utils'

const productCompare = () => getViewComponent('Product/compare/index')
const productDetail = () => getViewComponent('Product/detail/index')
const ProductHome = () => getViewComponent('Product/Home/index')

export default [
  {
    path: '/productCompare',
    name: 'productCompare',
    component: productCompare,
    meta: {
      title: '产品对比'
    }
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    component: productDetail,
    meta: {
      title: '产品详情'
    }
  },
  {
    path: '/productHome',
    name: 'productHome',
    component: ProductHome,
    meta: {
      title: '商城'
    }
  }
]
