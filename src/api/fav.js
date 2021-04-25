import request from '@/utils/request'

const name = 'fav/'

export function enjoyOrNotEnjoyPro(urlName, data) {
  return request({
    url: name + 'goods/' + urlName,
    method: 'post',
    params: {
      goodsId: data
    }
  })
}

export function enjoyOrNotEnjoyAnthor(urlName, data) {
  return request({
    url: name + 'user/' + urlName,
    method: 'post',
    params: {
      userSn: data
    }
  })
}

export function enjoyOrNotEnjoyLive(urlName, data) {
  return request({
    url: name + 'room/' + urlName,
    method: 'post',
    params: {
      roomSn: data
    }
  })
}

export function enjoyOrNotEnjoyShop(urlName, data) {
  return request({
    url: name + 'shop/' + urlName,
    method: 'post',
    params: {
      shopId: data
    }
  })
}

export function enjoyProdList(data) {
  return request({
    url: name + 'goods/list',
    method: 'get',
    params: data
  })
}

export function enjoyShopList(data) {
  return request({
    url: name + 'shop/list',
    method: 'get',
    params: data
  })
}

export function enjoyLiveList(data) {
  return request({
    url: name + 'room/list',
    method: 'get',
    params: data
  })
}

export function enjoyUserList(data) {
  return request({
    url: name + 'user/list',
    method: 'get',
    params: data
  })
}
