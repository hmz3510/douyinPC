import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'login/web',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: 'login/register',
    method: 'post',
    data
  })
}

export function setPassword(data) {
  return request({
    url: 'member/resetPassword',
    method: 'post',
    data
  })
}

export function forgetPassword(data) {
  return request({
    url: 'login/forgetPassword',
    method: 'post',
    data
  })
}

export function smsLogin(data) {
  return request({
    url: 'login/sms',
    method: 'post',
    data
  })
}

export function sendMsg(data) {
  return request({
    url: 'login/sendSms',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'member/info',
    method: 'get'
  })
}

export function changePassword(data) {
  return request({
    url: 'member/changePassword',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'member/logout',
    method: 'post'
  })
}
