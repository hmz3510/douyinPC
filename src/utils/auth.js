import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: new Date().getTime() + (60 * 1000 * 30) })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
