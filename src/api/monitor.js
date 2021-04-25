import request from '@/utils/request'

const name = 'monitor/'

export function getList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function homeGetList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function getSubscribeNum(data) {
  return request({
    url: name + 'count',
    method: 'get',
    params: data
  })
}

export function monitorCancelOrAdd(data, url) {
  return request({
    url: name + url,
    method: 'get',
    params: data
  })
}

export function monitorDelete(userSn) {
  return request({
    url: name + 'delete',
    method: 'get',
    params: {
      userSn: userSn
    }
  })
}

export function getCount(data) {
  return request({
    url: 'subscribe/count',
    method: 'get',
    params: {
      type: data
    }
  })
}

export function getMonitorList(data) {
  return request({
    url: name + 'history',
    method: 'get',
    params: data
  })
}
