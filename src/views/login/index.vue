<template>
  <div>
    <navbar :type-boolean="false" />
    <div class="login-container">
      <el-form v-if="loginNumber == 1" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
        <div class="loginContent">
          <div class="login-content">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="phone" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.phone"
                class="myInput"
                placeholder="请输入手机号"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="off"
              />
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password" style="position: relative;">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  class="myInput"
                  :type="passwordType"
                  placeholder="请输入密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <div v-if="goBack" class="loginBtns getCode" style="color: #CCCCCC;top:0" @click="changeType(3)">忘记密码?</div>
              </el-form-item>
            </el-tooltip>
            <div>
              <el-button :loading="loading" class="loginBtn" type="primary" @click.native.prevent="handleLogin">登录</el-button>
            </div>
            <div class="otherLogin" @click="gotoOtherLogin($event)">
              <div class="codeLogin" style="max-width: 130px;" :data-index="1">手机验证码登录</div>
              <div class="codeLogin" style="max-width: 40px;" :data-index="2">注册</div>
            </div>
          </div>
        </div>
      </el-form>
      <el-form v-if="loginNumber == 2" ref="registerFrom" :model="registerFrom" :rules="registerRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">注册</h3>
        </div>
        <div class="loginContent">
          <div class="login-content">
            <el-form-item prop="phone">
              <span class="svg-container">
                <svg-icon icon-class="phone" />
              </span>
              <el-input
                v-model="registerFrom.phone"
                class="myInput"
                placeholder="请输入手机号"
                type="text"
                tabindex="1"
              />
            </el-form-item>
            <el-form-item prop="code" style="position: relative;">
              <span class="svg-container">
                <svg-icon icon-class="code" />
              </span>
              <el-input
                v-model="registerFrom.code"
                class="myInput"
                placeholder="请输入验证码"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="off"
              />
              <div class="getCode" style="margin-top: 2px;" :class="timeEnd? 'yes':''" @click="getCode(2)">{{ time==60? '获取验证码' : '重新发送' + time }}</div>
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="registerFrom.password"
                  class="myInput"
                  :type="passwordType"
                  placeholder="请输入密码"
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
              <el-form-item prop="doubleTypedPassword">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="registerFrom.confirmPassword"
                  class="myInput"
                  :type="passwordType"
                  placeholder="请再次输入密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
            </el-tooltip>
            <el-form-item class="myItem" prop="type" style="height: inherit;background: #FFFFFF;border: none;margin-bottom: 0;line-height: 0;">
              <div style="margin-bottom: 18px;margin-top: -4px;">
                <el-checkbox v-model="registerFrom.type" label="" class="myCheckbox" />
                <span style="margin-left: 6px;color: #898989;font-size: 12px;font-family: PingFang SC Regular;">已阅读并同意</span>
                <router-link :to="{path:'/userNeedKnow',query:{type:1}}" target="_blank" style="color: #7BA1B9;font-size: 12px;font-family: PingFang SC Regular;">《用户注册协议》</router-link>
                <span style="color: #898989;font-size: 12px;font-family: PingFang SC Regular;">和</span>
                <router-link :to="{path:'/userNeedKnow',query:{type:2}}" target="_blank" style="color: #7BA1B9;font-size: 12px;font-family: PingFang SC Regular;">《隐私政策》</router-link>
              </div>
            </el-form-item>
            <div>
              <el-button :loading="loading" class="loginBtn" type="primary" @click.native.prevent="handleRegister">注册</el-button>
            </div>
            <div class="otherLogin" @click="gotoOtherLogin($event)">
              <div class="codeLogin" style="max-width: 80px;" :data-index="4">密码登录</div>
              <div class="codeLogin" style="max-width: 130px;" :data-index="1">手机验证码登录</div>
            </div>
          </div>
        </div>
      </el-form>
      <el-form v-if="loginNumber == 3" ref="forgetFrom" :model="forgetFrom" :rules="forgetRules" class="login-form" autocomplete="on" label-position="left">
        <div class="goBack" @click="loginNumber = 1; goBack = true"><i class="el-icon-arrow-left">返回</i></div>
        <div class="title-container">
          <h3 class="title">忘记密码</h3>
        </div>
        <div class="loginContent">
          <div class="login-content">
            <el-form-item prop="phone">
              <span class="svg-container">
                <svg-icon icon-class="phone" />
              </span>
              <el-input
                v-model="forgetFrom.phone"
                class="myInput"
                placeholder="请输入手机号"
                type="text"
                tabindex="1"
              />
            </el-form-item>
            <el-form-item prop="code" style="position: relative;">
              <span class="svg-container">
                <svg-icon icon-class="code" />
              </span>
              <el-input
                v-model="forgetFrom.code"
                class="myInput"
                placeholder="请输入验证码"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="off"
              />
              <div class="getCode" style="margin-top: 2px;" :class="timeEnd? 'yes':''" @click="getCode(3)">{{ time==60? '获取验证码' : '重新发送' + time }}</div>
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="forgetFrom.password"
                  class="myInput"
                  :type="passwordType"
                  placeholder="请输入密码"
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
                  placeholder="请再次输入密码"
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
      <el-form v-if="loginNumber == 4" ref="smsFrom" :model="smsFrom" :rules="smsRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
        <div class="loginContent">
          <div class="login-content">
            <el-form-item prop="phone">
              <span class="svg-container">
                <svg-icon icon-class="phone" />
              </span>
              <el-input
                v-model="smsFrom.phone"
                class="myInput"
                placeholder="请输入手机号"
                type="text"
                tabindex="1"
              />
            </el-form-item>
            <el-form-item prop="captcha" style="position: relative;">
              <span class="svg-container">
                <svg-icon icon-class="code" />
              </span>
              <el-input
                v-model="smsFrom.code"
                class="myInput"
                placeholder="请输入验证码"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="off"
              />
              <div class="getCode" style="margin-top: 2px;" :class="timeEnd? 'yes':''" @click="getCode(4)">{{ time==60? '获取验证码' : '重新发送' + time }}</div>
            </el-form-item>
            <div>
              <el-button :loading="loading" class="loginBtn" type="primary" @click.native.prevent="handLognSms">登录</el-button>
            </div>
            <div class="otherLogin" @click="gotoOtherLogin($event)">
              <div class="codeLogin" style="max-width: 80px;" :data-index="4">密码登录</div>
              <div class="codeLogin" style="max-width: 40px;" :data-index="2">注册</div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import navbar from '@/layout/components/Navbar.vue'
import { sendLogin, sendForget, sendRegister } from '@/api/sms.js'
export default {
  name: 'Login',
  components: { navbar },
  data() {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        password: [{ required: true, trigger: 'blur', message: '密码长度在8-16位之间' }]
      },
      registerFrom: {
        password: '',
        code: '',
        confirmPassword: undefined,
        phone: '',
        type: false
      },
      registerRules: {
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        password: [{ trigger: 'blur', message: '密码长度为8-16位' }],
        doubleTypedPassword: [{ trigger: 'blur', message: '密码长度为8-16位' }],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      forgetFrom: {
        password: '',
        phone: '',
        code: undefined,
        confirmPassword: undefined
      },
      forgetRules: {
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        password: [{ required: true, trigger: 'blur', message: '密码长度在8-16位之间' }],
        confirmPassword: [{ required: true, trigger: 'blur', message: '密码长度在8-16位之间' }],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      smsFrom: {
        phone: '',
        code: undefined
      },
      smsRules: {
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      loginNumber: 1,
      goBack: true,
      time: 60,
      setTime: null,
      timeEnd: false
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
    if (sessionStorage.getItem('phone') !== null) {
      this.loginForm.phone = sessionStorage.getItem('phone')
      this.registerFrom.phone = sessionStorage.getItem('phone')
      this.forgetFrom.phone = sessionStorage.getItem('phone')
      this.smsFrom.phone = sessionStorage.getItem('phone')
    }
  },
  mounted() {
    if (this.loginForm.phone === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.password.length < 8 || this.loginForm.password.length > 16) {
            this.$message({
              type: 'error',
              message: '密码长度要在8-16为之间'
            })
            return
          }
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            type: 'error',
            message: '请检查是否有未填项'
          })
          return false
        }
      })
    },
    handLognSms() {
      this.$refs.smsFrom.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/smsLogin', this.smsFrom).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            type: 'error',
            message: '请检查是否有未填项'
          })
          return false
        }
      })
    },
    handleRegister() {
      this.$refs.registerFrom.validate(valid => {
        if (valid) {
          if (this.registerFrom.password !== this.registerFrom.confirmPassword) {
            this.$message({
              type: 'error',
              message: '两次输入的密码不相等'
            })
            return
          }
          if (this.registerFrom.password.length < 8 || this.registerFrom.password.length > 16 || this.registerFrom.confirmPassword.length < 8 || this.registerFrom.confirmPassword.length > 16) {
            this.$message({
              type: 'error',
              message: '密码长度要在8-16为之间'
            })
            return
          }
          if (!this.registerFrom.type) {
            this.$message({
              type: 'error',
              message: '请勾选已阅读并同意'
            })
            return
          }
          this.loading = true
          this.$store.dispatch('user/register', this.registerFrom).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
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
    handleLogin3() {
      this.$refs.forgetFrom.validate(valid => {
        if (valid) {
          if (this.forgetFrom.password !== this.forgetFrom.confirmPassword) {
            this.$message({
              type: 'error',
              message: '两次输入的密码不相等'
            })
            return
          }
          if (this.forgetFrom.password.length < 8 || this.forgetFrom.password.length > 16 || this.forgetFrom.confirmPassword.length < 8 || this.forgetFrom.confirmPassword.length > 16) {
            this.$message({
              type: 'error',
              message: '密码长度要在8-16为之间'
            })
            return
          }
          this.loading = true
          this.$store.dispatch('user/forgetPassword', this.forgetFrom).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
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
    },
    handClick(data) {
      this.loginNumber = data
    },
    getCode(data) {
      var obj = {
        phone: undefined
      }
      if (data === 3) {
        obj.phone = this.forgetFrom.phone
        if (this.forgetFrom.phone === '') {
          this.$message({
            type: 'error',
            message: '请先输入手机号!'
          })
          return
        }
      } else if (data === 2) {
        obj.phone = this.registerFrom.phone
        if (this.registerFrom.phone === '') {
          this.$message({
            type: 'error',
            message: '请先输入手机号!'
          })
          return
        }
      } else {
        obj.phone = this.smsFrom.phone
        if (this.smsFrom.phone === '') {
          this.$message({
            type: 'error',
            message: '请先输入手机号!'
          })
          return
        }
      }
      if (this.time === 60) {
        if (data === 4) {
          sendLogin(obj).then(res => {
            this.timeEnd = true
            this.$message({
              type: 'success',
              message: '发送成功'
            })
            this.setTime = setInterval(() => {
              this.time--
              if (this.time === 0) {
                this.timeEnd = false
                clearInterval(this.setTime)
                this.setTime = null
                this.time = 60
              }
            }, 1000)
          })
        } else if (data === 3) {
          sendForget(obj).then(res => {
            this.timeEnd = true
            this.$message({
              type: 'success',
              message: '发送成功'
            })
            this.setTime = setInterval(() => {
              this.time--
              if (this.time === 0) {
                this.timeEnd = false
                clearInterval(this.setTime)
                this.setTime = null
                this.time = 60
              }
            }, 1000)
          })
        } else if (data === 2) {
          sendRegister(obj).then(res => {
            this.timeEnd = true
            this.$message({
              type: 'success',
              message: '发送成功'
            })
            this.setTime = setInterval(() => {
              this.time--
              if (this.time === 0) {
                this.timeEnd = false
                clearInterval(this.setTime)
                this.setTime = null
                this.time = 60
              }
            }, 1000)
          })
        }
      }
    },
    gotoOtherLogin(event) {
      this.timeEnd = false
      clearInterval(this.setTime)
      this.setTime = null
      this.time = 60
      if (event.target.getAttribute('data-index') === '1') {
        this.loginNumber = 4
      } else if (event.target.getAttribute('data-index') === '2') {
        this.loginNumber = 2
      } else if (event.target.getAttribute('data-index') === '3') {
        this.loginNumber = 5
      } else {
        this.loginNumber = 1
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
        -webkit-text-fill-color: #202224 !important;
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
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0E71EB;
  font-size: 14px;
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
.ScanLogin {
  margin-top: 32px;
}
.codeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  .codeArea {
    width: 220px;
    height: 220px;
    border-radius: 2px;
    border: 1px solid #EDEDED;
    padding: 20px;
    margin-bottom: 27px;
    .codeImg {
      width: 100%;
      height: 100%;
      background: #D8D8D8;

    }
  }
  .codeInfo {
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606060;
    line-height: 25px;
  }
}
.goback1 {
  margin-bottom: 11px;
}
</style>
