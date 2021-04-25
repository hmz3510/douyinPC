import axios from 'axios'
const isNewVersion = () => {
  const url = `//${window.location.host}/version.json`
  axios.get(url).then(res => {
    const version = res.data.version
    const localVersion = localStorage.getItem('version')
    if (localVersion && localVersion !== version) {
      localStorage.setItem('version', res.data.version)
      window.location.reload(true)
      return
      // if (confirm('系统检测到有新版本，是否更新？')) {
      //   localStorage.setItem('version', res.data.version)
      //   window.location.reload()
      //   return
      // }
    } else {
      localStorage.setItem('version', res.data.version)
    }
  })
}
export default {
  isNewVersion
}
