import { defineStore } from 'pinia'
import { tokenName } from '@/api/base'
import { getUserInfo, getUserMenus } from '@/api/get'
import { producerCurrent, getProvinceCityArea } from '@/api/post'
import { useProductStore } from './product'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: window.localStorage[tokenName] || null,
    info: null,
    manufactInfo: null // 厂家信息
  }),
  getters: {
    /* 是否登录 */
    isLogin: ({ token }) => !!token
  },
  actions: {
    async getInfo () {
      const { data } = await getUserInfo()
      this.info = data
    },
    async getUserMenus () {
      const res = await getUserMenus()
      console.log('菜单', res)
      // this.info = data;
    },
    setToken (data) {
      this.token = data.access_token
      window.localStorage.setItem(tokenName, data.access_token)
    },
    loginOut () {
      this.token = null
      this.info = null
      this.manufactInfo = null
      const product = useProductStore()

      /* 清空对比的数据 */
      product.showComparison = false
      product.list = []
      window.localStorage.clear()
    },
    /* 厂家详情 */
    async getManufactDetails (isRefresh = false) {
      if (this.manufactInfo && !isRefresh) {
        return this.manufactInfo
      } else {
        const { data } = await producerCurrent()
        const proCitAre = {
          province: [],
          city: [],
          area: []
        }
        const changeArea = async (pid, type) => {
          if (type === 1) {
            proCitAre.area = []
            const { data } = await getProvinceCityArea({ pid }, 'city')
            proCitAre.city = data
          } else {
            const { data } = await getProvinceCityArea({ pid }, 'area')
            proCitAre.area = data
          }
        }

        const detailAddess = () => {
          const { provinceId, cityId, areaId, address } = data
          const provinceName = proCitAre.province.find((o) => o.id === provinceId)?.name
          const cityName = proCitAre.city.find((o) => o.id === cityId)?.name
          const areasName = proCitAre.area.find((o) => o.id === areaId)?.name
          if (!provinceName || !cityName || !areasName) {
            return address
          }
          return provinceName + cityName + areasName + address
        }

        const getProvinceCityAreaApi = async () => {
          const { data } = await getProvinceCityArea(null, 'province')
          proCitAre.province = data
        }

        if (data) {
          await Promise.all([getProvinceCityAreaApi(), changeArea(data.provinceId, 1), changeArea(data.cityId, 2)])
          data.detailAddress = detailAddess()
        }

        this.manufactInfo = data
        return data
      }
    }
  }
})
