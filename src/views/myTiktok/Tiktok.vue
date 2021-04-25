<template>
  <div ref="myAppContainer" class="app-container">
    <div class="searchArea">
      <div class="page-title">我的抖音号</div>
      <el-button class="searchBtn" type="primary" size="medium" @click="addClick">添加抖音号</el-button>
    </div>
    <listScreen ref="listScreen" :type-number="9" :select-number="selceNumber" @changeData="changeData" />
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
        <el-table-column v-if="columnObj.incFollowerCount" key="4" label="新增粉丝" width="124px" />
        <el-table-column v-if="columnObj.totalFavorited" key="5" label="作品赞" width="124px" />
        <el-table-column v-if="columnObj.incTotalFavorited" key="6" label="新增作品赞" width="124px" />
        <el-table-column v-if="columnObj.awemeCount" key="7" label="作品数" width="124px" />
        <el-table-column v-if="columnObj.addFansExplain" key="8" label="7日涨粉" width="124px" />
        <el-table-column v-if="columnObj.addFansRateExplain" key="9" label="7日涨粉率" width="124px" />
        <el-table-column v-if="columnObj.liveCount" key="10" label="30日开播场次" width="124px" />
        <el-table-column v-if="columnObj.goodsLiveCount" key="11" label="30日带货场次" width="124px" />
        <el-table-column v-if="columnObj.interateRateExplain" key="12" label="直播互动率" width="124px" />
        <el-table-column v-if="columnObj.liveTimeExplain" key="13" label="直播时长" width="124px" />
        <el-table-column v-if="columnObj.userCount" key="14" label="观众数" width="124px" />
        <el-table-column v-if="columnObj.fanTicket" key="15" label="音浪收入" width="124px" />
        <el-table-column v-if="columnObj.likeCount" key="16" label="直播赞" width="124px" />
        <el-table-column v-if="columnObj.salesExplain" key="17" label="销量" width="124px" />
        <el-table-column v-if="columnObj.salesMoneyExplain" key="18" label="销售额" width="124px" />
        <el-table-column v-if="columnObj.guestUnitPriceExplain" key="19" label="客单价" min-width="124px" />
        <el-table-column v-if="columnObj.userContributionExplain" key="20" label="人均贡献" width="124px" />
        <el-table-column v-if="columnObj.hoursSalesExplain" key="21" label="小时销量" min-width="124px" />
        <el-table-column v-if="columnObj.hoursSalesMoneyExplain" key="22" label="小时销售额" width="124px" />
        <el-table-column v-if="columnObj.hoursSoundWave" key="23" label="小时音浪" width="124px" />
        <el-table-column key="24" min-width="90px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
        </el-table-column>
      </el-table>
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
        <el-table-column v-if="columnObj.incFollowerCount" key="4" prop="incFollowerCount" label="新增粉丝" width="124px" />
        <el-table-column v-if="columnObj.totalFavorited" key="5" prop="totalFavorited" label="作品赞" width="124px" />
        <el-table-column v-if="columnObj.incTotalFavorited" key="6" prop="incTotalFavorited" label="新增作品赞" width="124px" />
        <el-table-column v-if="columnObj.awemeCount" key="7" prop="awemeCount" label="作品数" width="124px" />
        <el-table-column v-if="columnObj.addFansExplain" key="8" prop="addFansExplain" label="7日涨粉" width="124px" />
        <el-table-column v-if="columnObj.addFansRateExplain" key="9" prop="addFansRateExplain" label="7日涨粉率" width="124px" />
        <el-table-column v-if="columnObj.liveCount" key="10" prop="liveCount" label="30日开播场次" width="124px" />
        <el-table-column v-if="columnObj.goodsLiveCount" key="11" prop="goodsLiveCount" label="30日带货场次" width="124px" />
        <el-table-column v-if="columnObj.interateRateExplain" key="12" prop="interateRateExplain" label="直播互动率" width="124px" />
        <el-table-column v-if="columnObj.liveTimeExplain" key="13" prop="liveTimeExplain" label="直播时长" width="124px" />
        <el-table-column v-if="columnObj.userCount" key="14" prop="userCount" label="观众数" width="124px" />
        <el-table-column v-if="columnObj.fanTicket" key="15" prop="fanTicket" label="音浪收入" width="124px" />
        <el-table-column v-if="columnObj.likeCount" key="16" prop="likeCount" label="直播赞" width="124px" />
        <el-table-column v-if="columnObj.salesExplain" key="17" prop="salesExplain" label="销量" width="124px" />
        <el-table-column v-if="columnObj.salesMoneyExplain" key="18" prop="salesMoneyExplain" label="销售额" width="124px" />
        <el-table-column v-if="columnObj.guestUnitPriceExplain" key="19" prop="guestUnitPriceExplain" label="客单价" min-width="124px" />
        <el-table-column v-if="columnObj.userContributionExplain" key="20" prop="userContributionExplain" label="人均贡献" width="124px" />
        <el-table-column v-if="columnObj.hoursSalesExplain" key="21" prop="hoursSalesExplain" label="小时销量" min-width="124px" />
        <el-table-column v-if="columnObj.hoursSalesMoneyExplain" key="22" prop="hoursSalesMoneyExplain" label="小时销售额" width="124px" />
        <el-table-column v-if="columnObj.hoursSoundWave" key="23" prop="hoursSoundWave" label="小时音浪" width="124px" />
        <el-table-column key="24" min-width="90px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
          <template slot-scope="scope">
            <div class="btnList">
              <div class="listBTn" @click="handClickDetail('anchorDetail', scope.row)">详情</div>
              <div class="listBTn listBTnEnjoy" @click="handDelete(scope.row)">移除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top :visibility-height="100" />
      </el-tooltip>
    </div>
    <addTick ref="addTick" />
    <copyView ref="copy" />
    <major ref="major" :dialog-boolean="true" />
  </div>
</template>
<script>
import listScreen from '@/components/listScreen/listScreen.vue'
import addTick from '@/components/addNew/addTick.vue'
import { headerTabel } from '@/utils/headerTable.js'
import { tiktokState } from '@/utils/headerConfig.js'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import major from '@/components/major/major.vue'
import copyView from '@/components/copy/copyVue.vue'
import { getList, getSubscribeNumTikoet, tiktokCancelOrAdd } from '@/api/tiktok.js'
import { isFreeMembership } from '@/utils/permission.js'
export default {
  name: 'Tiktok',
  components: { listScreen, addTick, Pagination, BackToTop, copyView, major },
  data() {
    return {
      listQuery: {
        sort: '47',
        current: 1,
        size: 25
      },
      listLoading: false,
      list: [],
      total: 0,
      isScroll: false,
      myHeaderWidth: 0,
      columnObj: undefined,
      selceNumber: undefined,
      tioketNumber: 0
    }
  },
  created() {
    this.initTable()
    this.getList()
    this.getSubscribeNumTikoet()
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
      if (JSON.parse(localStorage.getItem('tiktok') === null)) {
        this.columnObj = tiktokState
      } else {
        this.columnObj = JSON.parse(localStorage.getItem('tiktok'))
      }
      var sum = 0
      for (var item in this.columnObj) {
        if (this.columnObj[item]) {
          sum += 1
        }
      }
      this.selceNumber = sum + '/' + Object.keys(this.columnObj).length
    },
    getHomeTiktotList() {
      this.listLoading = true
      getList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
      }).catch(() => {
        this.listLoading = false
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
    onTableHeaderClicked(column) {
      this.$refs.listScreen.changeValue(column)
    },
    changeData(data) {
      this.listQuery = data
    },
    getSubscribeNumTikoet() {
      getSubscribeNumTikoet().then(res => {
        this.tioketNumber = res.data
      })
    },
    addClick() {
      this.$refs.addTick.initData(this.tioketNumber)
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
    handClickDetail(name, data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 1)
        return
      }
      const routeData = this.$router.resolve({ path: name, query: { userSn: data.userSn }})
      window.open(routeData.href, '_blank')
    },
    handDelete(data) {
      var userSn = {
        userSn: data.userSn
      }
      this.$confirm('是否删除该抖音号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tiktokCancelOrAdd(userSn, 'cancel').then(res => {
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
    isFreeMembership() {
      return isFreeMembership()
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .searchArea{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0px;
    padding-bottom: 22px;
  }
  .btnList{
    float: right;
    .listBTn{
      width: 70px;
      text-align: center;
      display: block;
    }
  }
  .btnList> div:last-child{
    margin-bottom: 0;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
</style>
