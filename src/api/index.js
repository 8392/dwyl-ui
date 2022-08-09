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
