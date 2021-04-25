<template>
  <div>
    <navbar :type-boolean="false" :number-index="1" />
    <div class="login-container">
      <el-form ref="forgetFrom" :model="forgetFrom" :rules="forgetRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">修改密码</h3>
        </div>
        <div class="loginContent">
          <div class="login-content">
            <el-form-item prop="mob">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="forgetFrom.password"
                class="myInput"
                :type="passwordType"
                placeholder="请输入原密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="newPassword">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="forgetFrom.newPassword"
                  class="myInput"
                  :type="passwordType"
                  placeholder="请输入新密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
            </el-tooltip>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="confirmPassword">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="forgetFrom.confirmPassword"
                  class="myInput"
                  :type="passwordType"
                  placeholder="请再次输入新密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
            </el-tooltip>
            <div>
              <el-button :loading="loading" class="loginBtn" type="primary" @click.native.prevent="handleLogin3">确定修改</el-button>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import navbar from '@/layout/components/Navbar.vue'
import { changePassword } from '@/api/user.js'
export default {
  name: 'ChangePwd',
  components: { navbar },
  data() {
    return {
      forgetFrom: {
        password: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      forgetRules: {
        password: [{ required: true, trigger: 'blur', message: '密码不能少于8位' }],
        newPassword: [{ required: true, trigger: 'blur', message: '密码不能少于8位' }],
        confirmPassword: [{ required: true, trigger: 'blur', message: '密码不能少于8位' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin3() {
      this.$refs.forgetFrom.validate(valid => {
        if (valid) {
          if (this.forgetFrom.newPassword !== this.forgetFrom.confirmPassword) {
            this.$message({
              type: 'error',
              message: '两次输入的密码不相等'
            })
            return
          }
          this.loading = true
          changePassword(this.forgetFrom).then(res => {
            this.loading = false
            this.$store.dispatch('user/getInfo')
            this.$message({
              type: 'success',
              message: '设置成功,即将返回到个人信息'
            })
            var timer = setTimeout(() => {
              this.$router.go(-1)
              clearTimeout(timer)
            }, 500)
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            type: 'error',
            message: '请检查是否有未填项'
          })
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    changeType(data) {
      this.loginNumber = data
      this.goBack = false
      this.loading = false
      if (data === 1) {
        this.goBack = true
        clearInterval(this.setTime)
        this.setTime = 0
        this.time = 60
        for (var item in this.forgetFrom) {
          this.forgetFrom['' + item + ''] = undefined
        }
      } else {
        this.$nextTick(() => {
          this.$refs.forgetFrom.resetFields()
        })
      }
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 50px;
    width: 85%;
    input {
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 0px;
      color: #202224;
      font-size: 16px;
      height: 50px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
  /deep/ .el-input__inner {
    &::placeholder {
        color: #CCCCCC;
        font-size: 15px;
    }
    &::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color: #CCCCCC;
        font-size: 15px;
    }
    &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        color: #CCCCCC;
        font-size: 15px;
    }
    &::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        color: #CCCCCC;
        font-size: 15px;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: #CCCCCC;
      font-size: 15px;
    }
  }
  /deep/ .el-form-item__content{
    line-height: 1;
    width: 340px;
  }
  .el-form-item{
    margin: auto;
    width: 340px;
    min-width: 340px;
    border-radius: 4px;
    border: 1px solid #DDDFE0;
    margin-bottom: 24px;
  }
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#202224;
.loginImg{
  height: 42px;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 480px;
    max-width: 100%;
    padding: 190px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 4px 4px 6px 8px;
    color: $dark_gray;
    display: inline-block;
    font-size: 16px;
    /deep/ .svg-icon {
      vertical-align: -0.185em;
    }
  }

  .title-container {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 40px;
    .title {
      font-size: 24px;
      color: #232333;
      margin: 0px auto 0px auto;
      text-align: center;
      font-weight: 500;
      font-family: PingFangSC-Medium, PingFang SC;
    }
  }
  .loginContent{
    padding: 32px 40px 0px 40px;
    .loginBtn{
      border: none;
      width: 340px;
      height: 50px;
      text-align: center;
      border-radius: 4px;
      font-size: 18px;
      margin-top: 8px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.loginBtns{
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}
.getCode{
  font-size: 12px;
  color: #0E71EB;
  cursor: pointer;
  position: absolute;
  top: 18px;
  display: block;
  right: 10px;
}
.yes{
  color: #CCCCCC;
}
.goBack{
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0E71EB;
  line-height: 25px;
  margin-bottom: 15px;
  cursor: pointer;
}
.otherLogin {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #0E71EB;
  margin-top: 28px;
}
.codeLogin {
  height: 25px;
  line-height: 25px;
  margin-bottom: 11px;
  cursor: pointer;
}
</style>
