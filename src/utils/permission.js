import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    return false
  }
}

export function isFreeMembership() {
  const membership = store.getters && store.getters.membership
  if (membership === 0) {
    return true
  } else {
    return false
  }
}

export function inWhiteList() {
  return store.getters && store.getters.wlFlag
}

