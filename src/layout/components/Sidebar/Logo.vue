<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="userInfomation == undefined || userInfomation.vipType == 0" src="../../../icons/images/logo.png" class="sidebar-logo">
        <img v-else src="../../../icons/images/logo-pro.png" class="sidebar-logo1">
      </router-link>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userInfomation'
    ])
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  background: #FFFFFF;
  text-align: center;
  overflow: hidden;
  height: 100%;
  padding: 10px 0;
  margin-left: 34px;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 171px;
      height: 44px;
      vertical-align: middle;
      // margin-right: 12px;
    }
    & .sidebar-logo1 {
      width: 204px;
      height: 44px;
      vertical-align: middle;
      // margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
