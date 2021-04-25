import request from '@/utils/request'

const name = 'tiktok/'

export function getList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function homeGetTiktokList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function getSubscribeNumTikoet(data) {
  return request({
    url: name + 'count',
    method: 'get',
    params: data
  })
}

export function tiktokCancelOrAdd(data, url) {
  return request({
    url: name + url,
    method: 'get',
    params: data
  })
}

export function tiktokDelete(userSn) {
  return request({
    url: name + 'delete',
    method: 'get',
    params: {
      userSn: userSn
    }
  })
}
