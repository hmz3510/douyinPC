<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      class="myDialog"
      :append-to-body="true"
      :before-close="handleDialogClose"
    >
      <div class="major-container">
        <div class="title">这是一个专业版功能</div>
        <div class="btn-content">
          <div v-if="dialogBoolean" class="btnCss" @click.stop="lookPage">查看示例页</div>
          <div class="btnCss" @click.stop="lookVip">查看专业版介绍</div>
        </div>
        <div class="footer" @click.stop="customeBoolean=true">联系客服要福利</div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="customeBoolean"
      width="400px"
      class="myDialog"
      :append-to-body="true"
      :before-close="handleDialogClose1"
    >
      <div class="major-container">
        <div class="title">请加客服微信</div>
        <img class="custome-img" src="../../icons/images/ewm.jpg" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Major',
  props: {
    dialogBoolean: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      customeBoolean: false,
      index: undefined
    }
  },
  methods: {
    initData(data, index) {
      this.dialogVisible = data
      this.index = index
    },
    lookVip() {
      const routeData = this.$router.resolve({ path: 'pro' })
      window.open(routeData.href, '_blank')
    },
    handleDialogClose(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
      this.dialogVisible = false
    },
    handleDialogClose1(e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
      this.customeBoolean = false
    },
    lookPage() {
      var query, name
      if (this.index === 1) {
        name = 'liveDetail'
        query = {
          roomSn: '1377511531566747648'
        }
      } else if (this.index === 2) {
        name = 'anchorDetail'
        query = {
          userSn: '1370244706197712896'
        }
      } else if (this.index === 3) {
        name = 'goodsDetail'
        query = {
          goodsId: '3424981130594663474'
        }
      } else {
        name = 'smallShopDetail'
        query = {
          shopId: '88233'
        }
      }
      const routeData = this.$router.resolve({ path: name, query: query })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
  .major-container {
    padding: 70px 35px;
    padding-bottom: 81px;
  }
  .major-container::after{
    clear: both;
    display: block;
    content: "";
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #303030;
    line-height: 25px;
    text-align: center;
  }
  .btn-content {
    margin-top: 54px;
    display: flex;
    flex-direction: column;
    .btnCss {
      width: 248px;
      height: 40px;
      border-radius: 28px;
      border: 1px solid #0E71EB;
      line-height: 40px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0E71EB;
      cursor: pointer;
      text-align: center;
      margin: auto;
      margin-bottom: 20px;
    }
  }
  .footer {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0E71EB;
    line-height: 20px;
    cursor: pointer;
    float: right;
    margin-right: 41px;
  }
  .custome-img {
    width: 168px;
    height: 168px;
    display: block;
    margin: auto;
    margin-top: 36px;
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
