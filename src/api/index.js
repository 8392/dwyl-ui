import { request } from '@/utils/request'
export const social = '/social'

const proxy = '/proxy'
const basics = '/basics-api'
const apiData = '/data-api'
export const manager = '/manager'

export const sysUserListPage = (data) => {
  return request({
    url: proxy + basics + '/sysUser/data/list/page',
    method: 'post',
    data
  })
}

/* 单文件上传 */
export const uploadApi = (data) => {
  return request({
    url: proxy + basics + '/minio/file/upload',
    method: 'post',
    data
  })
}

/* 多文件上传 */
export const uploadMoreApi = (data) => {
  return request({
    url: proxy + basics + '/minio/file/upload/list',
    method: 'post',
    data
  })
}

// 接入设备列表
export const productVersionVo = (data) => {
  return request({
    url: manager + '/product/page/vo',
    method: 'post',
    data
  })
}

export const selfProPage = data => {
  return request({
    url: social + '/norm/self/pro/page',
    method: 'post',
    data
  })
}

export const socialNormList = async () => {
  return request({
    url: social + '/norm/standard/list',
    method: 'get'
  })
}

export const normSelfDelete = id => {
  return request({
    url: social + `/norm/self/${id}`,
    method: 'delete'
  })
}
