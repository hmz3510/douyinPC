import request from '@/utils/smsRequest.js'
var name = 'sms/'

export function sendLogin(data) {
  return request({
    url: name + 'sendLogin',
    method: 'post',
    data
  })
}

export function sendForget(data) {
  return request({
    url: name + 'sendForget',
    method: 'post',
    data
  })
}

export function sendRegister(data) {
  return request({
    url: name + 'sendRegister',
    method: 'post',
    data
  })
}
