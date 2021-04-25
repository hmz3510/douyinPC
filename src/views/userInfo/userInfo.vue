<template>
  <div ref="myAppContainer" class="app-container">
    <div class="page-title">账户详情</div>
    <div class="userInfo">
      <div class="info-item">
        <div class="info-item">
          <span class="pubilcSubtitle">手机号：</span>
          <div class="phoneNumber">{{ userInfomation.phone }}</div>
        </div>
        <span class="info-blue" @click="changePassword(userInfomation.hasPassword)">{{ userInfomation.hasPassword ? '修改登录密码': '设置登录密码' }}</span>
      </div>
      <div class="info-item">
        <div class="info-item">
          <span class="pubilcSubtitle">注册日期：</span>
          <div class="phoneNumber">{{ userInfomation.createTime }}</div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item">
          <span class="pubilcSubtitle">账户类型：</span>
          <div class="phoneNumber">{{ userInfomation.vipTypeExplain }}会员</div>
        </div>
        <router-link to="/pro">
          <span v-if="userInfomation.vipType === 0" class="info-blue">升级到PRO</span>
          <span v-else class="info-blue" style="color: #909399;">({{ userInfomation.expiredAtDate }})</span>
        </router-link>
      </div>
      <div v-if="userInfomation.bindStatus === 1" class="info-item">
        <div class="info-item">
          <span class="pubilcSubtitle">小程序绑定的微信：</span>
          <div class="phoneNumber">{{ userInfomation.nickname }}</div>
        </div>
      </div>
    </div>
    <copyView ref="copy" :only-one="false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import copyView from '@/components/copy/copyVue.vue'
export default {
  name: 'UserInfo',
  components: {
    copyView
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userInfomation'
    ])
  },
  created() {

  },
  mounted() {
    this.$refs.copy.resetCss(this.$refs.myAppContainer)
  },
  methods: {
    changePassword(type) {
      if (type) {
        this.$router.push({ path: '/changePwd' })
      } else {
        this.$router.push({ path: '/setPwd' })
      }
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  .userInfo {
    margin-top: 32px;
    padding-bottom: 19px;
    border-bottom: 1px solid #EBEEF5;
    .info-item {
      display: flex;
      align-items: center;
      .pubilcSubtitle {
        margin-right: 6px;
        width: 130px;
      }
      .phoneNumber {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #606366;
        line-height: 20px;
      }
      .info-blue {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0E71EB;
        line-height: 20px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
  .userInfo>div:not(:first-child) {
    margin-top: 16px;
  }
</style>
