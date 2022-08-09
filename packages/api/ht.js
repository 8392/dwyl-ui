import { request } from '~/utils/request'
const manager = '/manager'

/* 单文件上传 */
export const uploadApi = (data) => {
  return request({
    url: manager + '/minio/file/upload',
    method: 'post',
    data
  })
}

/* 多文件上传 */
export const uploadMoreApi = (data) => {
  return request({
    url: manager + '/minio/file/upload/list',
    method: 'post',
    data
  })
}
