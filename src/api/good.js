import request from '@/utils/request'

const name = 'goods/'

export function getList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function getGoodRoom(data) {
  return request({
    url: name + 'rooms',
    method: 'get',
    params: data
  })
}

export function getGoodTrend(data) {
  return request({
    url: name + 'trend',
    method: 'get',
    params: {
      goodsId: data
    }
  })
}

export function getDetail(data) {
  return request({
    url: name + 'info',
    method: 'get',
    params: {
      goodsId: data
    }
  })
}
