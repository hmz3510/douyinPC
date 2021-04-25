import request from '@/utils/request'

const name = 'shop/'

export function getList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function getSearchList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function getDetail(data) {
  return request({
    url: name + 'info',
    method: 'get',
    params: {
      shopId: data
    }
  })
}
