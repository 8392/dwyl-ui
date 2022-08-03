import { request } from '@/utils/request'

const proxy = '/proxy'
const basics = '/basics-api'
const apiData = '/data-api'

export const sysUserListPage = (data) => {
  return request({
    url: proxy + basics + '/sysUser/data/list/page',
    method: 'post',
    data
  })
}
