import { RouterLink, useRouter } from 'vue-router'
import { useImageUrl } from '~/utils/packageUtils'

const statusList = [
  {
    type: 'No_DATA',
    img: useImageUrl('290167826333356032.png'),
    des: '暂无数据'
  },
  {
    type: '404',
    img: 'https://fire.diweiyunlian.cn/file/290168026439405568.png',
    des: '页面未找到',
    render () {
      const router = useRouter()
      return <el-button style="width:120px;margin-top:50px" type="primary" onClick={() => router.replace('/')}>返回首页</el-button>
    }
  },
  {
    type: 'FACTORY_NO_AUTH',
    img: 'https://fire.diweiyunlian.cn/file/290168113521545216.png',
    slot: <div>您尚未认证账号，暂时无法使用该功能 <RouterLink style={{ color: 'var(--el-color-primary)', textDecoration: 'underline', cursor: 'pointer' }} to={{ path: '/manufactnfo', query: { type: 1 } }}>前往认证</RouterLink></div>
    // render() {
    //   const router = useRouter()
    //   console.log('router', router)
    //   return <div>666</div>
    // }
  },
  {
    type: 'NO_COLLECTION',
    img: 'https://fire.diweiyunlian.cn/file/290168194811351040.png',
    des: '暂无收藏'
  },
  {
    type: 'NO_MESSAGE',
    img: 'https://fire.diweiyunlian.cn/file/290168319436705792.png',
    des: '暂无消息'
  },
  {
    type: 'NO_IMG',
    img: 'https://fire.diweiyunlian.cn/file/290168546839285760.png',
    des: '暂无图片'
  },
  {
    type: 'FACTORY_UNDER_AUTH',
    img: 'https://fire.diweiyunlian.cn/file/289833598238683136.png',
    des: '厂家信息认证中，暂时无法查看信息'
  },
  {
    type: 'NO_COMPARISON',
    // img: 'https://fire.diweiyunlian.cn/file/290168546839285760.png',
    des: '暂未添加对比产品'
  },
  {
    type: 'FACTORY_AUTH_FAIL',
    img: 'https://fire.diweiyunlian.cn/file/289886284234149888.png',
    des: '厂家信息认证未通过',
    render () {
      const router = useRouter()
      return <el-button style="width:120px;margin-top:50px" type="primary" onClick={() => router.replace('/manufactnfo?type=1')}>返回修改</el-button>
    }
  },
  {
    type: 'NO_PRODUCT_FOUND',
    render () {
      const router = useRouter()
      return <>
          <img src="https://fire.diweiyunlian.cn/file/289886284234149888.png" alt="" />
          <div class="color-#292A2C lh-28px text-center">
            没有找到您的产品！<br />
            如需发布产品，需要接入产品后才能添加。 <br />
          前往 <button class="color-primary cursor-pointer" onClick={() => router.push('/addAccess')}>添加产品</button>
        </div>
      </>
    }
  }
]

export default {
  props: {
    type: String,
    description: String
  },
  setup (props, ctx) {
    const data = statusList.find(o => o.type === props.type)
    return () => {
      return <div>
        <div class="flex-col-center">
          <img class="mb-60px" src={data.img} alt="" v-show={data.img} />
          {
            data.des && <span class="color-#6E7279 text-12px lh-22px">{ props.description || data.des }</span>
          }
          {
            data.slot && <>{ data.slot }</>
          }
          {
            data.render && <>{ data.render() }</>
          }
        </div>
      </div>
    }
  }
}
