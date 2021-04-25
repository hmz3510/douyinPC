<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      class="myDialog"
    >
      <div class="major-container">
        <div class="title">请加客服微信进行转账付款</div>
        <img class="custome-img" src="../../icons/images/ewm.jpg">
        <div class="customeInfo">扫码添加客服微信号，支付所开通会员金额，并备注需要充值平台账号<strong>（平台账号为注册手机号）</strong></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Custome',
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
  },
  methods: {
    initData(data) {
      this.dialogVisible = data
    }
  }
}
</script>

<style scoped lang="scss">
  .major-container {
    padding: 70px 35px;
    padding-bottom: 60px;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #303030;
    line-height: 25px;
    text-align: center;
  }
  .custome-img {
    width: 168px;
    height: 168px;
    display: block;
    margin: auto;
    margin-top: 36px;
  }
  .customeInfo {
    margin-top: 50px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #303030;
    line-height: 25px;
  }
  .myDialog /deep/ .el-dialog__body, .myDialog /deep/ .el-dialog__header{
    padding: 0;
  }
  .myDialog /deep/ .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin-top: 0 !important;
  }
</style>
