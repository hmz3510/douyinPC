export function getSeeionData(name) {
  return sessionStorage.getItem(name)
}

export function setSeeionData(name, data) {
  return sessionStorage.setItem(name, JSON.stringify(data))
}
