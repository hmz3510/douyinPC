<template>
  <div class="navbar">
    <div class="logoSearch">
      <logo />
      <searchContainer v-if="typeBoolean" ref="searchContainer" />
    </div>
    <div class="right-menu">
      <el-dropdown v-if="typeBoolean && userInfomation!==undefined" class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="userInfomation.avatarUrl!==''" class="user-avatar" :src="userInfomation.avatarUrl">
          <img v-else src="../../icons/images/avatar@2x.png" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/userInfo" class="hoveColor1" style="margin-top: 10px; margin-bottom: 12px;">
            <el-dropdown-item class="subtitle">{{ userInfomation.phone }}</el-dropdown-item>
          </router-link>
          <router-link to="/pro" class="hoveColor" style="margin-bottom: 12px;">
            <el-dropdown-item v-if="userInfomation.vipType == 0" class="subtitle1">升级PRO版</el-dropdown-item>
            <el-dropdown-item v-else class="subtitle" style="font-size: 12px;">PRO版剩余{{ userInfomation.expiredAtExplain }}天</el-dropdown-item>
          </router-link>
          <router-link to="/userInfo" class="hoveColor" style="margin-bottom: 12px;">
            <el-dropdown-item>
              账户详情
            </el-dropdown-item>
          </router-link>
          <a class="hoveColor2" style="margin-bottom: 29px;">
            <el-dropdown-item @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </a>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-if="numberIndex === 0">
        <div v-if="!typeBoolean" class="login" @click="logout">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Sidebar/Logo.vue'
import searchContainer from '@/components/search-area/search-area.vue'
export default {
  components: { Logo, searchContainer },
  props: {
    typeBoolean: {
      type: Boolean,
      required: true
    },
    numberIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      keyWord: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfomation'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    throttle(fn, wait) {
      var timer = null
      return function() {
        var context = this
        var args = arguments
        if (!timer) {
          timer = setTimeout(() => {
            fn.apply(context, args)
            timer = null
          }, wait)
        }
      }
    },
    // changeInput() {
    //   if (this.keyWord.length > 0) {
    //     this.$refs.searchContainer.initData(true, this.keyWord)
    //   } else {
    //     this.$refs.searchContainer.initData(false, this.keyWord)
    //   }
    // },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dropdown-menu__item {
    line-height: 20px;
  }
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #E4E7ED;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logoSearch {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .right-menu {
    float: right;
    height: 100%;
    .login {
      width: 56px;
      background: #0E71EB;
      border: 1px solid #0E71EB;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      cursor: pointer;
      text-align: center;
      padding: 5px 0;
      margin: 18px 0;
      margin-right: 20px;
    }
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container {
      margin-right: 20px;
      display: flex;
      align-items: center;
      height: 100%;
      .avatar-wrapper {
        position: relative;
        height: 40px;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.subtitle {
  color: #909399;
}
.subtitle1 {
  color: #606266 !important;
  font-weight: 400;
}
.hoveColor :hover{
  background: transparent !important;
  color: #0E71EB;
}
.hoveColor1 :hover {
  background: transparent !important;
  color: #909399;
}
.hoveColor2 :hover {
  background: transparent !important;
  color: #606266;
}
</style>
