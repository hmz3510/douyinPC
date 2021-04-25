<template>
  <div class="notice-container">
    <el-dialog
      :visible.sync="noticeBoolean"
      class="myDialog"
      width="400px"
    >
      <div class="diaLog-container">
        <div class="title">监控通知设置</div>
        <div class="code-container">
          <div class="notice-title">剩余开播通知次数 {{ noticeNumber }}</div>
          <img class="codeImg" :src="qrcodeUrl">
        </div>
        <div class="code-footer">微信扫码后在小程序端免费增加通知次数</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { qrcodeUrl } from '@/utils/selectConfig.js'
export default {
  name: 'NoticeSet',
  props: {
    noticeNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      noticeBoolean: false,
      qrcodeUrl: undefined
    }
  },
  created() {
  },
  methods: {
    initData() {
      this.noticeBoolean = true
      this.qrcodeUrl = qrcodeUrl
    }
  }
}
</script>

<style scoped lang="scss">
  .myDialog /deep/ .el-dialog__body, .myDialog /deep/ .el-dialog__header{
    padding: 0;
  }
  .myDialog /deep/ .el-dialog {
    border-radius: 4px;
    padding: 20px 0 78px 0px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin-top: 0 !important;
  }
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    line-height: 16px;
    margin-bottom: 63px;
    margin-left: 25px;
  }
  .notice-title {
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    line-height: 28px;
    margin-bottom: 48px;
  }
  .code-container {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    flex-direction: column;
    .codeImg {
      width: 150px;
      height: 150px;
      // border: 1px solid #979797;
      display: block;
    }
  }
  .code-footer {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #909399;
    line-height: 22px;
    margin: 0 56px;

  }
</style>
