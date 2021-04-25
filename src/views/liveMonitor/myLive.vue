<template>
  <div ref="myAppContainer" class="app-container">
    <div class="searchArea">
      <div class="page-title">我的监控</div>
      <div class="btn-content">
        <span :class="noticeNumber>= 5 ? 'noticeSetting': 'redCss'" @click="handOpenSet">剩余通知次数 {{ noticeNumber }} <span class="set" @click="handOpenSet">设置</span> </span>
        <el-button class="searchBtn" type="primary" size="medium" @click="handClick(true)">监控历史</el-button>
        <el-button class="searchBtn" type="primary" size="medium" @click="handClick(false)">新增监控</el-button>
      </div>
    </div>
    <listScreen ref="listScreen" :type-number="10" :select-number="selceNumber" @changeData="changeData" />
    <div v-show="isScroll" class="headerTableCss" :style="{width:myHeaderWidth + 'px'}">
      <el-table
        ref="headerTable"
        :data="[]"
        :header-cell-style="{background:'#FAFAFA',color:'#232333',fontSize:'14px',fontWeight:'400'}"
        :row-style="{color:'#606266',fontSize:'14px',fontWeight:'400'}"
        fit
        style="width: 100%"
        empty-text="暂无数据"
        class="my-card-table"
        @header-click="onTableHeaderClicked"
      >
        <el-table-column key="1" width="58px" type="index" fixed="left">
          <template slot="header">
            <div class="rankTitle">排行</div>
          </template>
        </el-table-column>
        <el-table-column key="2" width="320px" fixed="left">
          <template slot="header">
            <div class="colummTitle">主播</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.followerCountExplain" key="3" label="粉丝数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />粉丝数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.latestLiveTimeExplain" key="4" label="最近直播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '45'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '45' ? 'el-icon-sort-down' : 'stand'" />最近直播</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.liveTimeExplain" key="5" label="直播时长" width="124px" />
        <el-table-column v-if="columnObj.userCount" key="6" label="观众数" width="124px" />
        <el-table-column v-if="columnObj.fanTicket" key="7" label="音浪收入" width="124px" />
        <el-table-column v-if="columnObj.salesExplain" key="8" label="销量" width="124px" />
        <el-table-column v-if="columnObj.salesMoneyExplain" key="9" label="销售额" width="124px" />
        <el-table-column v-if="columnObj.guestUnitPriceExplain" key="10" label="客单价" width="124px" />
        <el-table-column v-if="columnObj.userContributionExplain" key="11" label="人均贡献" width="124px" />
        <el-table-column key="12" min-width="175px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
        </el-table-column></el-table>
    </div>
    <div ref="tableDiv" class="tableArea">
      <el-table
        ref="myOneTable"
        v-loading="listLoading"
        :data="list"
        :header-cell-style="{background:'#FAFAFA',color:'#232333',fontSize:'14px',fontWeight:'400'}"
        :row-style="{color:'#606266',fontSize:'14px',fontWeight:'400'}"
        fit
        style="width: 100%"
        empty-text="暂无数据"
        element-loading-text="查询中..."
        @header-click="onTableHeaderClicked"
      >
        <el-table-column key="1" width="58px" type="index" fixed="left">
          <template slot="header">
            <div class="rankTitle">排行</div>
          </template>
          <template slot-scope="scope">
            <div class="rankNumber">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column key="2" width="320px" fixed="left">
          <template slot="header">
            <div class="colummTitle">主播</div>
          </template>
          <template slot-scope="scope">
            <div class="secodeColumn">
              <div class="secodeColumnLeft">
                <el-image class="imgLeft" fit="cover" :src="scope.row.avatarUrl" lazy>
                  <div slot="error">
                    <img class="imgLeft" fit="cover" src="../../icons/images/error_cycle.png">
                  </div>
                </el-image>
                <div v-if="scope.row.hasLive" class="tag-live">
                  <span class="zhibo_SUw">
                    <span class="_nXfzR0HQ" style="background-color:#fff;" />
                    <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                    <span class="_1uugB4t8" style="background-color:#fff;" />
                  </span>
                  live
                </div>
              </div>
              <div class="secodeColumnRight">
                <div class="nameAndCode resetCss">
                  <div class="name">
                    <span class="nameSpan hoveColor" @click="handClickDetail('anchorDetail', scope.row)">{{ scope.row.nickname }}</span>
                    <div class="codeDiv">
                      <el-popover
                        v-if="scope.row.shareQrcodeUrl!==''"
                        placement="top-start"
                        width="220"
                        trigger="hover"
                        popper-class="myPopper"
                      >
                        <div>
                          <div class="qrCodeContainer">
                            <img :src="scope.row.shareQrcodeUrl" class="propImg">
                            <div class="qrCodeText">抖音扫码看主播</div>
                          </div>
                        </div>
                        <img slot="reference" class="code" src="../../icons/images/ewm.png">
                      </el-popover>
                      <el-tooltip v-else placement="top" popper-class="myPopCss" effect="light">
                        <div slot="content">
                          <el-image>
                            <div slot="error" class="noCode">
                              暂时没有二维码
                            </div>
                          </el-image>
                        </div>
                        <img class="code" src="../../icons/images/ewm.png">
                      </el-tooltip>
                    </div>
                  </div>
                </div>
                <div v-if="scope.row.userCategoryIdsExplain.length!==0" class="labeList">
                  <div v-for="(item, index) of scope.row.userCategoryIdsExplain.slice(0, 3)" :key="index" class="columnLabe">{{ item.length > 4 ? item.substring(0, 3) + ' ...' : item }}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.followerCountExplain" key="3" label="粉丝数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />粉丝数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.followerCountExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.latestLiveTimeExplain" key="4" label="最近直播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '45'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '45' ? 'el-icon-sort-down' : 'stand'" />最近直播</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.latestLiveTimeExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.liveTimeExplain" key="5" prop="liveTimeExplain" label="直播时长" width="124px" />
        <el-table-column v-if="columnObj.userCount" key="6" prop="totalUser" label="观众数" width="124px" />
        <el-table-column v-if="columnObj.fanTicket" key="7" prop="fanTicket" label="音浪收入" width="124px" />
        <el-table-column v-if="columnObj.salesExplain" key="8" prop="salesExplain" label="销量" width="124px" />
        <el-table-column v-if="columnObj.salesMoneyExplain" key="9" prop="salesMoneyExplain" label="销售额" width="124px" />
        <el-table-column v-if="columnObj.guestUnitPriceExplain" key="10" prop="guestUnitPriceExplain" label="客单价" width="124px" />
        <el-table-column v-if="columnObj.userContributionExplain" key="11" prop="userContributionExplain" label="人均贡献" width="124px" />
        <el-table-column key="12" min-width="175px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
          <template slot-scope="scope">
            <div class="btnList">
              <div class="listBTn" @click="handClickDetail('anchorDetail', scope.row)">主播详情</div>
              <div class="listBTn btnMarginCss" :class="scope.row.hasRecruit ? 'listBTnEnjoy': ''" @click="handEnjoy(scope.row)">{{ scope.row.hasRecruit? '暂停监控': '监控' }}</div>
              <div class="listBTn" @click="handDelete(scope.row)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top :visibility-height="100" />
      </el-tooltip>
    </div>
    <addLive ref="addLive" />
    <noticeSet ref="noticeSet" :notice-number="noticeNumber" />
    <copyView ref="copy" />
    <major ref="major" :dialog-boolean="true" />
  </div>
</template>
<script>
import listScreen from '@/components/listScreen/listScreen.vue'
import addLive from '@/components/addNew/addLive.vue'
import noticeSet from '@/components/noticeSet/noticeSet.vue'
import copyView from '@/components/copy/copyVue.vue'
import { headerTabel } from '@/utils/headerTable.js'
import { liveHistoryState } from '@/utils/headerConfig.js'
import Pagination from '@/components/Pagination'
import major from '@/components/major/major.vue'
import BackToTop from '@/components/BackToTop'
import { getList, getSubscribeNum, monitorCancelOrAdd, monitorDelete, getCount } from '@/api/monitor.js'
import { isFreeMembership } from '@/utils/permission.js'
export default {
  name: 'MyLive',
  components: { listScreen, addLive, noticeSet, BackToTop, Pagination, copyView, major },
  data() {
    return {
      listQuery: {
        sort: '45',
        size: 25,
        current: 1
      },
      listLoading: false,
      list: [],
      total: 0,
      isScroll: false,
      myHeaderWidth: 0,
      columnObj: undefined,
      selceNumber: undefined,
      noticeNumber: undefined,
      liveUser: undefined
    }
  },
  created() {
    this.initTable()
    this.getList()
    this.getCount()
  },
  mounted() {
    var that = this
    headerTabel(this.$refs.myAppContainer, that)
    window.addEventListener('scroll', this.changeScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.changeScroll)
  },
  methods: {
    initTable() {
      if (JSON.parse(localStorage.getItem('myLive') === null)) {
        this.columnObj = liveHistoryState
      } else {
        this.columnObj = JSON.parse(localStorage.getItem('myLive'))
      }
      var sum = 0
      for (var item in this.columnObj) {
        if (this.columnObj[item]) {
          sum += 1
        }
      }
      this.selceNumber = sum + '/' + Object.keys(this.columnObj).length
    },
    initDataDialog() {
      if (this.noticeNumber <= 5 && this.liveUser > 0) {
        this.handOpenSet()
      }
    },
    getCount() {
      getCount(1).then(res => {
        this.noticeNumber = res.data
        this.getSubscribeNum()
      })
    },
    getSubscribeNum() {
      getSubscribeNum().then(res => {
        this.liveUser = res.data
        this.initDataDialog()
      })
    },
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      }).catch(() => {
        this.listLoading = false
      })
    },
    homeGetList() {
      this.listLoading = true
      getList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
      }).catch(() => {
        this.listLoading = false
      })
    },
    handClick(type) {
      if (type) {
        this.$router.push({ path: 'monitorHistory' })
      } else {
        this.$refs.addLive.initData(this.list.length, this.noticeNumber)
      }
    },
    handClickDetail(name, data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 1)
        return
      }
      const routeData = this.$router.resolve({ path: name, query: { userSn: data.userSn }})
      window.open(routeData.href, '_blank')
    },
    handOpenSet() {
      this.$refs.noticeSet.initData()
    },
    onTableHeaderClicked(column) {
      this.$refs.listScreen.changeValue(column)
    },
    changeData(data) {
      this.listQuery.sort = data
      this.listQuery.current = 1
      this.getList()
    },
    handEnjoy(data) {
      var url
      if (data.hasRecruit) {
        url = 'cancel'
      } else {
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
          data.hasRecruit = false
        } else {
          this.$message({
            type: 'success',
            message: '监控成功!'
          })
          data.hasRecruit = true
        }
      })
    },
    handDelete(data) {
      this.$confirm('是否删除该监控?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        monitorDelete(data.userSn).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.$refs.copy.resetCss(this.$refs.myAppContainer)
          this.list.splice(this.list.indexOf(data), 1)
          this.total--
        })
      })
    },
    changeScroll() {
      if (this.$refs.tableDiv.getBoundingClientRect().top < 0) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    },
    restTable() {
      this.initTable()
      this.$nextTick(function() {
        this.$refs.myOneTable.doLayout()
      })
    },
    isFreeMembership() {
      return isFreeMembership()
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .searchArea{
    padding-bottom: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    .noticeSetting {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #399126;
      line-height: 20px;
      cursor: pointer;
      margin-right: 10px;
    }
    .redCss {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #DE3B37;
      line-height: 20px;
      cursor: pointer;
      margin-right: 10px;
    }
    .btn-content {
      display: flex;
      align-items: center;
    }
    .searchBtn {
      margin-left: 10px;
    }
  }
  .btnList {
    float: right;
  }
  .btnList> div:last-child{
    margin-bottom: 0;
    display: block;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
  .set {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0E71EB;
    line-height: 20px;
    margin-left: 8px;
  }
</style>
