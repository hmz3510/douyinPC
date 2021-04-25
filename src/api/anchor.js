import request from '@/utils/request'

const name = 'user/'

export function getUserList(data) {
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
      userSn: data
    }
  })
}

export function enterUser(data) {
  return request({
    url: 'enter/user',
    method: 'post',
    params: {
      uid: data
    }
  })
}

export function getUserFans(data) {
  return request({
    url: name + 'fans',
    method: 'get',
    params: {
      userSn: data
    }
  })
}

export function getUserGoodList(data) {
  return request({
    url: name + 'goods',
    method: 'get',
    params: data
  })
}

export function getCanvasList(data) {
  return request({
    url: name + 'chart',
    method: 'get',
    params: {
      userSn: data
    }
  })
}

export function getUserCategory(data) {
  return request({
    url: name + 'category',
    method: 'get',
    params: {
      userSn: data
    }
  })
}

export function getUserRankList(data) {
  return request({
    url: name + 'board',
    method: 'get',
    params: data
  })
}
