import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
// import { router } from '@/router'
import { useUserStore } from '@/store'

let router = {}
import('@/router').then(({ router: r }) => {
  router = r
})

const getContrastProduct = () => {
  const data = localStorage.getItem('contrastProduct')
  if (data) {
    return JSON.parse(data)
  } else {
    return []
  }
}

const getShowComparison = () => {
  const data = localStorage.getItem('showComparison')
  if (data) {
    return JSON.parse(data)
  } else {
    return false
  }
}

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    showComparison: getShowComparison(),
    list: getContrastProduct()
  }),
  getters: {
    /* 对比的产品ID数组 */
    idArr: ({ list }) => list.map((o) => o.id),
    listLeg: ({ list }) => list.length
  },
  actions: {
    /* 添加对比 */
    addContrast (data) {
      const user = useUserStore()
      if (!user.isLogin) {
        router.push('/login?type=1')
        return
      }
      if (this.listLeg >= 4) {
        ElMessage.error('最多只能对比四个产品')
        return
      }
      const { id, name, picture, price } = data
      const item = {
        id,
        name,
        picture,
        price
      }
      if (!this.idArr.includes(data.id)) {
        this.list.push(item)
        localStorage.setItem('contrastProduct', JSON.stringify(this.list))
        ElMessage.success('加入成功')
      }
      this.showComparison = true
      localStorage.setItem('showComparison', JSON.stringify(this.showComparison))
      return this.list
    },
    /* 删除对比 */
    deleteContrast (id) {
      this.list = this.list.filter((o) => o.id !== id)
      localStorage.setItem('contrastProduct', JSON.stringify(this.list))
      ElMessage.success('取消成功')
    },
    /* 删除所有 */
    removeAllContrast () {
      this.list = []
      localStorage.removeItem('contrastProduct')
      ElMessage.success('清除成功')
    },
    closeDialog () {
      this.showComparison = false
      localStorage.setItem('showComparison', JSON.stringify(this.showComparison))
    },
    toggleDialog () {
      this.showComparison = !this.showComparison
      localStorage.setItem('showComparison', JSON.stringify(this.showComparison))
    }
  }
})
