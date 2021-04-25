import request from '@/utils/request'

const name = 'room/'

export function getList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function getLiveList(data) {
  return request({
    url: name + 'list',
    method: 'get',
    params: data
  })
}

export function getDailyList(data) {
  return request({
    url: name + 'board',
    method: 'get',
    params: data
  })
}

export function getRealList(data) {
  return request({
    url: name + 'hot',
    method: 'get',
    params: data
  })
}

export function getRoomCategory(data) {
  return request({
    url: name + 'category',
    method: 'get',
    params: {
      roomSn: data
    }
  })
}

export function getRoomGift(data) {
  return request({
    url: name + 'audience',
    method: 'get',
    params: {
      roomSn: data
    }
  })
}

export function getRoomCode(data) {
  return request({
    url: name + 'qrCode',
    method: 'get',
    params: {
      roomSn: data
    }
  })
}

export function getHourList(data, apiName) {
  return request({
    url: name + apiName,
    method: 'get',
    params: data
  })
}

export function getLiveDetailList(data) {
  return request({
    url: name + 'goods',
    method: 'get',
    params: data
  })
}

export function getLiveCharts(data) {
  return request({
    url: name + 'chart',
    method: 'get',
    params: {
      userSn: data
    }
  })
}

export function getRoomCharts(data) {
  return request({
    url: name + 'trend',
    method: 'get',
    params: {
      roomSn: data
    }
  })
}

export function getDetail(data) {
  return request({
    url: name + 'info',
    method: 'get',
    params: {
      roomSn: data
    }
  })
}
