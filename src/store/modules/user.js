import { login, logout, getInfo, register, forgetPassword, smsLogin } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    membership: '',
    userInfomation: undefined
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFOMATION: (state, data) => {
    state.userInfomation = data
  },
  SET_TYPE: (state, data) => {
    state.membership = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { phone, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone: phone.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_USERINFOMATION', response.data)
        commit('SET_TYPE', response.data.vipType)
        localStorage.setItem('dataToken', data.token)
        sessionStorage.setItem('phone', response.data.phone)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      register(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_AVATAR', data.avatar)
        commit('SET_USERINFOMATION', response.data)
        commit('SET_TYPE', response.data.vipType)
        localStorage.setItem('dataToken', data.token)
        sessionStorage.setItem('phone', response.data.phone)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  forgetPassword({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      forgetPassword(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_AVATAR', data.avatar)
        commit('SET_USERINFOMATION', response.data)
        commit('SET_TYPE', response.data.vipType)
        localStorage.setItem('dataToken', data.token)
        sessionStorage.setItem('phone', response.data.phone)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  smsLogin({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      smsLogin(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_AVATAR', data.avatar)
        commit('SET_USERINFOMATION', response.data)
        commit('SET_TYPE', response.data.vipType)
        localStorage.setItem('dataToken', data.token)
        sessionStorage.setItem('phone', response.data.phone)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        var data = {
          'roles': [response.data.roleIdExplain]
        }
        const roles = [response.data.roleIdExplain]
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_TYPE', response.data.vipType)
        commit('SET_ROLES', roles)
        commit('SET_USERINFOMATION', response.data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

