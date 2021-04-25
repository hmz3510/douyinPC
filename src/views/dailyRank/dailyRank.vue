<template>
  <div ref="myAppContainer" class="app-container">
    <div class="page-title">每日直播排行榜</div>
    <fliterArea :use-number="4" :title-name="'直播类型'" :is-history="false" :is-anchor-data="false" @getData="getData" />
    <listScreen ref="listScreen" :type-number="1" :select-number="selceNumber" @changeData="changeData" />
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
            <div class="colummTitle">直播名称</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.openTime" key="3" label="开播时间" width="124px" />
        <el-table-column v-if="dailyState.totalUser" key="4" label="观众数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />观众数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.maxUserCountExplain" key="5" label="峰值在线" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />峰值在线</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.fanTicket" key="6" label="音浪收入" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />音浪收入</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.followCount" key="7" label="直播涨粉" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />直播涨粉</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.likeCount" key="8" label="点赞数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />点赞数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.giftUvCount" key="9" label="送礼人数" width="124px" />
        <el-table-column v-if="dailyState.interateRateExplain" key="10" label="互动率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '11'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />互动率</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.goodsCount" key="11" label="商品数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />商品数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.salesExplain" key="12" label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '15'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '15' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.salesMoneyExplain" key="13" label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '17'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '17' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
        </el-table-column>
        <el-table-column key="14" min-width="175px" header-align="right" fixed="right">
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
        :data="isFreeMembership() ? list.slice(0, 1) : list"
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
            <div class="colummTitle">直播名称</div>
          </template>
          <template slot-scope="scope">
            <div class="secodeColumn">
              <div class="secodeColumnLeft">
                <div @click="handClick('liveDetail', scope.row)">
                  <el-image class="imgLeft realRank" fit="cover" :src="scope.row.coverUrl" lazy>
                    <div slot="error">
                      <img class="imgLeft realRank" fit="cover" src="../../icons/images/error_column.png">
                    </div>
                  </el-image>
                </div>
                <div v-if="scope.row.hasLive" class="tag-live tag-live1">
                  <span class="zhibo_SUw">
                    <span class="_nXfzR0HQ" style="background-color:#fff;" />
                    <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                    <span class="_1uugB4t8" style="background-color:#fff;" />
                  </span>
                  live
                </div>
              </div>
              <div class="secodeColumnRight">
                <div v-if="scope.row.title!==''" class="right-title hoveColor" @click="handClick('liveDetail', scope.row)">{{ scope.row.title }}</div>
                <div class="right-footer">
                  <el-image class="footerImg" fit="cover" :src="scope.row.userVO.avatarUrl" lazy>
                    <div slot="error">
                      <img class="footerImg" fit="cover" src="../../icons/images/error_small_cycle.png">
                    </div>
                  </el-image>
                  <div>
                    <div class="nameAndCode resetCss">
                      <div class="name">
                        <span class="nameSpan hoveColor" @click="handClick1('anchorDetail', scope.row)">{{ scope.row.userVO.nickname }}</span>
                        <div class="codeDiv">
                          <el-popover
                            v-if="scope.row.userVO.shareQrcodeUrl!==''"
                            placement="top-start"
                            width="220"
                            trigger="hover"
                            popper-class="myPopper"
                          >
                            <div>
                              <div class="qrCodeContainer">
                                <img :src="scope.row.userVO.shareQrcodeUrl" class="propImg">
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
                    <div class="fans">{{ scope.row.userVO.followerCountExplain }}粉丝</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.openTime" key="3" label="开播时间" width="124px">
          <template slot-scope="scope">
            <div>{{ scope.row.createTimeExplain }}</div>
            <div>{{ scope.row.liveTimeExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.totalUser" key="4" label="观众数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />观众数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.totalUser }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.maxUserCountExplain" key="5" label="峰值在线" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />峰值在线</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.maxUserCountExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.fanTicket" key="6" label="音浪收入" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />音浪收入</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.fanTicket }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.followCount" key="7" label="直播涨粉" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />直播涨粉</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.followCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.likeCount" key="8" label="点赞数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />点赞数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.likeCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.giftUvCount" key="9" label="送礼人数" width="124px">
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.giftUvCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.interateRateExplain" key="10" label="互动率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '11'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />互动率</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.userVO.interateRateExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.goodsCount" key="11" label="商品数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />商品数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.goodsCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.salesExplain" key="12" label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '15'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '15' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.salesExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="dailyState.salesMoneyExplain" key="13" label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '17'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '17' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.salesMoneyExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column key="14" min-width="175px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
          <template slot-scope="scope">
            <div class="btnList">
              <div class="listBTn" @click="tips(scope.row)">数据大屏</div>
              <div class="listBTn btnMarginCss" @click="handClick('liveDetail', scope.row)">直播详情</div>
              <div class="listBTn" :class="scope.row.fav ? 'listBTnEnjoy': ''" @click="handEnjoy(scope.row)">{{ scope.row.fav? '取消收藏': '收藏' }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="!isFreeMembership()">
        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :need-boolean="true" :limit.sync="listQuery.size" @pagination="getList" />
      </div>
      <div v-if="!listLoading">
        <div v-if="isFreeMembership()" class="updateBtn" @click="updatePro">升级到专业版查看全部</div>
      </div>
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top :visibility-height="100" />
      </el-tooltip>
      <copyView ref="copy" />
      <major ref="major" :dialog-boolean="true" />
    </div>
  </div>
</template>
<script>
import fliterArea from '@/components/filterArea/filterArea.vue'
import listScreen from '@/components/listScreen/listScreen.vue'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import major from '@/components/major/major.vue'
import { getDailyList } from '@/api/live.js'
import { headerTabel } from '@/utils/headerTable.js'
import copyView from '@/components/copy/copyVue.vue'
import { isFreeMembership } from '@/utils/permission.js'
import { enjoyOrNotEnjoyLive } from '@/api/fav.js'
import { dailyState } from '@/utils/headerConfig.js'
export default {
  name: 'DailyRank',
  components: { fliterArea, listScreen, Pagination, BackToTop, copyView, major },
  data() {
    return {
      listQuery: {
        sort: '0',
        status: undefined,
        size: 25,
        current: 1
      },
      listLoading: false,
      list: [],
      total: 0,
      isScroll: false,
      myHeaderWidth: 0,
      dailyState: undefined,
      selceNumber: undefined
    }
  },
  created() {
    this.initTable()
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
      if (JSON.parse(localStorage.getItem('dailyRank') === null)) {
        this.dailyState = dailyState
      } else {
        this.dailyState = JSON.parse(localStorage.getItem('dailyRank'))
      }
      var sum = 0
      for (var item in this.dailyState) {
        if (this.dailyState[item]) {
          sum += 1
        }
      }
      this.selceNumber = sum + '/' + Object.keys(this.dailyState).length
    },
    getList() {
      this.listLoading = true
      getDailyList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      }).catch(() => {
        this.listLoading = false
      })
    },
    getData(data) {
      this.listQuery = Object.assign(data, this.listQuery)
      this.listQuery.current = 1
      this.getList()
    },
    onTableHeaderClicked(column) {
      this.$refs.listScreen.changeValue(column)
    },
    changeData(data) {
      this.listQuery.sort = data
      this.listQuery.current = 1
      this.getList()
    },
    handClick(name, data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 1)
        return
      }
      const routeData = this.$router.resolve({ path: name, query: { roomSn: data.roomSn }})
      window.open(routeData.href, '_blank')
    },
    handClick1(name, data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 2)
        return
      }
      const routeData = this.$router.resolve({ path: name, query: { userSn: data.userVO.userSn }})
      window.open(routeData.href, '_blank')
    },
    changeScroll() {
      if (this.$refs.tableDiv.getBoundingClientRect().top < 0) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    },
    isFreeMembership() {
      return isFreeMembership()
    },
    updatePro() {
      const routeData = this.$router.resolve({ path: 'pro' })
      window.open(routeData.href, '_blank')
    },
    handEnjoy(data) {
      var name
      if (!data.fav) {
        name = 'add'
      } else {
        name = 'del'
      }
      enjoyOrNotEnjoyLive(name, data.roomSn).then(res => {
        if (!data.fav) {
          this.$message({
            type: 'success',
            message: '收藏成功!'
          })
          data.fav = true
        } else {
          this.$message({
            type: 'success',
            message: '取消收藏成功!'
          })
          data.fav = false
        }
      })
    },
    tips(data) {
      const routeData = this.$router.resolve({ path: 'big', query: { roomSn: data.roomSn, hasLive: data.hasLive }})
      window.open(routeData.href, '_blank')
    },
    restTable() {
      this.initTable()
      this.$nextTick(function() {
        this.$refs.myOneTable.doLayout()
      })
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
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
  .right-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    display: block !important;
  }
</style>
