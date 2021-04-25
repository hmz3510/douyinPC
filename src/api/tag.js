import request from '@/utils/request'

const name = 'tag'

export function getTagFirst(data) {
  return request({
    url: name + '/first',
    method: 'get'
  })
}

export function getTagSecond(data) {
  return request({
    url: name + '/second',
    method: 'get'
  })
}

export function getCategoryFirst(data) {
  return request({
    url: 'category/first',
    method: 'get'
  })
}

export function getCategorySecond(data) {
  return request({
    url: 'category/second',
    method: 'get'
  })
}

export function getCategoryThird(data) {
  return request({
    url: 'category/third',
    method: 'get'
  })
}
