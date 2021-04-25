<template>
  <div class="add-container">
    <el-dialog
      :visible.sync="addBoolean"
      :show-close="true"
      class="myDialog"
      :before-close="closeDialog"
      width="892px"
    >
      <div class="diaLog-container">
        <div class="diaTitle">直播监控（{{ hasNumber }}/15）</div>
        <div class="diaLogSearch">
          <el-input v-model="listQuery.keyword" class="searchInput" clearable placeholder="输入昵称、抖音号搜索" @keyup.enter.native="changeInput" />
          <el-button class="searchBtn" type="primary" size="medium" @click="changeInput">搜索</el-button>
        </div>
        <div v-show="list.length > 0">
          <div v-loading="loading" class="diaList-container" :element-loading-text="loadingText">
            <div class="list-title">{{ total }}个结果</div>
            <div class="listAreaContainer">
              <div v-for="item of list" :key="item.id" class="oneList">
                <div @click="handClickDetail('anchorDetail', item)">
                  <img v-if="item.avatarUrl!==''" class="listImg borderImg" :src="item.avatarUrl">
                  <img v-else class="listImg borderImg" src="../../icons/images/error_cycle.png">
                </div>
                <div class="listRight">
                  <div class="right-left" @click="handClickDetail('anchorDetail', item)">
                    <div class="right-title hoveColor">{{ item.nickname }}</div>
                    <div class="right-subtitle">{{ item.followerCountExplain }}粉丝</div>
                  </div>
                  <div v-if="!item.hasEntry" class="addCss" @click="enterUser(item)">收录</div>
                  <div v-else :class="item.hasRecruit ? 'stopCss': 'addCss'" @click="handEnjoy(item)">{{ item.hasRecruit ? '暂停监控': '监控' }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="diaFooter">
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getUserList" />
          </div>
        </div>
        <div v-show="list.length == 0" class="noList1">
          <div class="noList-title">搜索主播并监控，该主播的直播间将进行分钟级监控。同时，提供开播通知服务。</div>
          <div class="noticeSet" @click="handClick">通知设置</div>
        </div>
      </div>
    </el-dialog>
    <noticeSet ref="noticeSet" :notice-number="noticeSetNumber" />
    <major ref="major" :dialog-boolean="myBoolean" />
  </div>
</template>

<script>
import noticeSet from '@/components/noticeSet/noticeSet.vue'
import { monitorCancelOrAdd } from '@/api/monitor.js'
import { getUserList, enterUser } from '@/api/anchor.js'
import { isFreeMembership } from '@/utils/permission.js'
import major from '@/components/major/major.vue'
import Pagination from '@/components/searchPagination/index.vue'
export default {
  name: 'AddLive',
  components: { noticeSet, major, Pagination },
  data() {
    return {
      listQuery: {
        keyword: undefined,
        current: 1,
        size: 6,
        kind: 2
      },
      list: [],
      addBoolean: false,
      noticeSetNumber: 0,
      loading: false,
      total: 0,
      loadingText: '加载中...',
      hasNumber: undefined,
      myBoolean: false
    }
  },
  mounted() {
  },
  methods: {
    getUserList() {
      this.loading = true
      getUserList(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handEnjoy(data) {
      this.myBoolean = false
      if (isFreeMembership()) {
        this.$refs.major.initData(true)
        return
      }
      var url
      if (data.hasRecruit) {
        url = 'cancel'
      } else {
        if (this.hasNumber >= 15) {
          this.$message({
            type: 'error',
            message: '监控的主播数量已达上限'
          })
          return
        }
        url = 'add'
      }
      var userSn = {
        userSn: data.userSn
      }
      monitorCancelOrAdd(userSn, url).then(res => {
        if (data.hasRecruit) {
          this.$message({
            type: 'success',
            message: '取消监控成功!'
          })
          this.hasNumber--
          data.hasRecruit = false
        } else {
          this.$message({
            type: 'success',
            message: '监控成功!'
          })
          this.hasNumber++
          data.hasRecruit = true
        }
      })
    },
    handClick() {
      this.$refs.noticeSet.initData()
    },
    nextPage() {
      this.listQuery.current++
      this.getUserList()
    },
    handClickDetail(name, data) {
      this.myBoolean = true
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 2)
        return
      }
      var query = {
        userSn: data.userSn
      }
      const routeData = this.$router.resolve({ path: name, query: query })
      window.open(routeData.href, '_blank')
    },
    closeDialog() {
      if (this.noticeSetNumber <= 5 && this.hasNumber > 0) {
        this.addBoolean = false
        this.handClick()
      } else {
        this.addBoolean = false
      }
      this.$parent.homeGetList()
    },
    initData(data, indexNumber) {
      this.noticeSetNumber = indexNumber
      this.hasNumber = data
      this.addBoolean = true
    },
    changeInput() {
      this.listQuery.current = 1
      if (this.listQuery.keyword.length > 0) {
        this.getUserList()
      }
    },
    isFreeMembership() {
      return isFreeMembership()
    },
    enterUser(data) {
      this.loading = true
      this.loadingText = '正在收录中...'
      enterUser(data.uid).then(res => {
        this.loading = false
        data.userSn = res.data
        data.hasEntry = true
        this.$message({
          type: 'success',
          message: '收录成功!'
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .myDialog /deep/ .el-dialog__body, .myDialog /deep/ .el-dialog__header{
    padding: 0;
  }
  .myDialog /deep/ .el-dialog {
    padding: 17px 23px 150px 23px;
    border-radius: 4px;
    min-height: 670px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin-top: 0 !important;
  }
  .diaTitle {
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #232333;
    line-height: 28px;
  }
  .diaLogSearch {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin-top: 62px;
    margin-bottom: 53px;
    .searchInput {
      width: 299px;
      margin-right: 28px;
    }
    .searchBtn {
      height: 32px;
      border-radius: 2px;
    }
    & /deep/ .el-input__inner{
      border-radius: 20px;
      height: 36px;
    }
  }
  .diaList-container {
    padding-left: 32px;
    padding-right: 49px;
    .list-title {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #606266;
      line-height: 17px;
      margin-bottom: 13px;
    }
    .listAreaContainer {
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      .oneList {
        padding-bottom: 14px;
        border-bottom: 1px solid #EBEEF5;
        width: 341px;
        display: flex;
        margin-top: 14px;
        .listRight {
          display: flex;
          justify-content: space-between;
          flex: 1;
          align-items: center;
          width: 70%;
          .right-left {
            width: 75%;
          }
          .right-title {
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #606266;
            line-height: 22px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .right-subtitle {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #606266;
            line-height: 17px;
          }
          .addCss {
            width: 43px;
            background: #0E71EB;
            border-radius: 2px;
            line-height: 22px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            text-align: center;
            cursor: pointer;
          }
          .stopCss {
            width: 65px;
            background: rgba(14, 113, 235, 0.55);
            border-radius: 2px;
            line-height: 22px;
            text-align: center;
            cursor: pointer;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
          }
        }
      }
      .listImg {
        height: 40px;
        width: 40px;
        display: block;
        margin-right: 6px;
        border-radius: 50%;
        min-width: 40px;
        cursor: pointer;
      }
    }
  }
  .diaFooter {
    margin-top: 59px;
    padding-left: 32px;
    padding-right: 49px;
    .pageArear {
      width: 152px;
      padding: 7px 0;
      background: #D8D8D8;
      border: 1px solid #979797;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #777777;
      text-align: center;
      cursor: pointer;
      float: right;
    }
  }
  .diaFooter::after {
    clear: both;
    display: block;
    content: '';
  }
  .noList1 {
    margin: auto;
    margin-top: 27px;
    width: 480px;
    margin-bottom: 201px;
    .noList-title {
      width: 100%;
      height: 56px;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #232333;
      line-height: 28px;
    }
    .noticeSet {
      width: 64px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0E71EB;
      line-height: 22px;
      margin-top: 18px;
      cursor: pointer;
    }
  }
</style>
