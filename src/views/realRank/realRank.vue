<template>
  <div ref="myAppContainer" class="app-container">
    <div class="topArea">
      <div class="topHeader">
        <div class="page-title">实时直播榜</div>
        <div class="tag-live">
          <span class="zhibo_SUw">
            <span class="_nXfzR0HQ" style="background-color:#fff;" />
            <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
            <span class="_1uugB4t8" style="background-color:#fff;" />
          </span>
          live
        </div>
      </div>
      <div class="checkArea">
        <el-checkbox v-model="hasLive" @change="handldeSearch">只看带货直播</el-checkbox>
        <el-checkbox v-model="isShowLive" @change="handldeSearchLive">不显示48h+直播间</el-checkbox>
      </div>
    </div>
    <listScreen ref="listScreen" :type-number="12" @changeData="changeData" />
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
        <el-table-column width="58px" type="index" fixed="left">
          <template slot="header">
            <div class="rankTitle">排行</div>
          </template>
        </el-table-column>
        <el-table-column width="320px" fixed="left">
          <template slot="header">
            <div class="colummTitle">主播</div>
          </template>
        </el-table-column>
        <el-table-column label="开播时间" width="124px" />
        <el-table-column label="当前人气值" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '29'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '29' ? 'el-icon-sort-down' : 'stand'" />当前人气值</div>
          </template>
        </el-table-column>
        <el-table-column label="音浪收入" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />音浪收入</div>
          </template>
        </el-table-column>
        <el-table-column label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '15'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '15' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
        </el-table-column>
        <el-table-column label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '17'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '17' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
        </el-table-column>
        <el-table-column min-width="175px" header-align="right" fixed="right">
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
        <el-table-column width="58px" type="index" fixed="left">
          <template slot="header">
            <div class="rankTitle">排行</div>
          </template>
          <template slot-scope="scope">
            <div class="rankNumber">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column width="320px" fixed="left">
          <template slot="header">
            <div class="colummTitle">主播</div>
          </template>
          <template slot-scope="scope">
            <div class="secodeColumn">
              <div class="secodeColumnLeft">
                <el-image class="imgLeft" fit="cover" :src="scope.row.userVO.avatarUrl" lazy>
                  <div slot="error">
                    <img class="imgLeft" fit="cover" src="../../icons/images/error_cycle.png">
                  </div>
                </el-image>
                <div class="tag-live">
                  <span class="zhibo_SUw">
                    <span class="_nXfzR0HQ" style="background-color:#fff;" />
                    <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                    <span class="_1uugB4t8" style="background-color:#fff;" />
                  </span>
                  live
                </div>
              </div>
              <div class="secodeColumnRight">
                <div class="right-title">
                  <span v-if="scope.row.title!==''" class="spanCss hoveColor" @click="tips(scope.row)">{{ scope.row.title }}</span>
                  <div class="codeDiv">
                    <el-popover
                      placement="top-start"
                      width="220"
                      trigger="hover"
                      popper-class="myPopper"
                      @after-enter="showImg(scope.row)"
                      @hide="imgLoading=true"
                    >
                      <div v-loading="imgLoading" element-loading-text="加载中...">
                        <div class="qrCodeContainer">
                          <div v-if="imgUrl===undefined" class="propImg" />
                          <img v-else :src="imgUrl" class="propImg">
                          <div class="qrCodeText">抖音扫码看直播</div>
                        </div>
                      </div>
                      <img slot="reference" class="code" src="../../icons/images/ewm.png">
                    </el-popover>
                  </div>
                </div>
                <div class="right-footer">
                  <div>
                    <div class="nameAndCode resetCss">
                      <div class="name">
                        <span class="nameSpan hoveColor" @click="handClick('anchorDetail', scope.row, true)">{{ scope.row.userVO.nickname }}</span>
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
        <el-table-column label="开播时间" width="124px">
          <template slot-scope="scope">
            <div>{{ scope.row.createTimeExplain }}</div>
            <div>{{ scope.row.liveTimeExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column label="当前人气值" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '29'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '29' ? 'el-icon-sort-down' : 'stand'" />当前人气值</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.userCount }}</div>
          </template>
        </el-table-column>
        <el-table-column label="音浪收入" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />音浪收入</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.fanTicket }}</div>
          </template>
        </el-table-column>
        <el-table-column label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '15'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '15' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.salesExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '17'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '17' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.salesMoneyExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="175px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
          <template slot-scope="scope">
            <div class="btnList">
              <div class="listBTn" @click="tips(scope.row)">数据大屏</div>
              <div class="listBTn btnMarginCss" @click="handClickLive(scope.row)">现场直击</div>
              <div class="dissCss">
                <div class="listBTn" @click="handClick('liveDetail', scope.row, false)">直播详情</div>
                <div class="listBTn" @click="handClick('anchorDetail', scope.row, true)">主播详情</div>
              </div>
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
      <liveingScene ref="liveingScene" />
    </div>
  </div>
</template>
<script>
import listScreen from '@/components/listScreen/listScreen.vue'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import { getRealList, getRoomCode } from '@/api/live.js'
import { headerTabel } from '@/utils/headerTable.js'
import copyView from '@/components/copy/copyVue.vue'
import major from '@/components/major/major.vue'
import { isFreeMembership } from '@/utils/permission.js'
import liveingScene from '@/components/liveingScene/liveingScene.vue'
export default {
  name: 'RealRank',
  components: {
    listScreen,
    Pagination,
    BackToTop,
    copyView,
    major,
    liveingScene
  },
  data() {
    return {
      listQuery: {
        sort: '29',
        hasRoomGoodsLive: undefined,
        current: 1,
        size: 25,
        hasShowLive: undefined,
        dateTimeFrom: undefined,
        dateTimeTo: undefined
      },
      listLoading: false,
      list: [],
      total: 0,
      hasLive: false,
      isShowLive: false,
      imgLoading: true,
      imgUrl: undefined,
      roomVal: undefined,
      isScroll: false,
      myHeaderWidth: 0
    }
  },
  created() {
    this.getList()
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
    getList() {
      this.listLoading = true
      getRealList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      }).catch(() => {
        this.listLoading = false
      })
    },
    handldeSearch(data) {
      if (data) {
        this.listQuery.hasRoomGoodsLive = 1
      } else {
        this.listQuery.hasRoomGoodsLive = undefined
      }
      this.listQuery.current = 1
      this.getList()
    },
    handldeSearchLive(data) {
      if (data) {
        var timeFrom = new Date()
        timeFrom.setTime(timeFrom.getTime() - 2 * 24 * 60 * 60 * 1000)
        var yearFrom = timeFrom.getFullYear()
        var monthFrom = timeFrom.getMonth()
        var dayFrom = timeFrom.getDate()

        monthFrom = monthFrom + 1
        monthFrom = monthFrom.toString().padStart(2, '0')
        dayFrom = dayFrom.toString().padStart(2, '0')

        var timeTo = new Date()
        var yearTo = timeTo.getFullYear()
        var monthTo = timeTo.getMonth()
        var dayTo = timeTo.getDate()

        monthTo = monthTo + 1
        monthTo = monthTo.toString().padStart(2, '0')
        dayTo = dayTo.toString().padStart(2, '0')

        var hours = timeTo.getHours()
        var minutes = timeTo.getMinutes()
        var seconds = timeTo.getSeconds()

        this.listQuery.dateTimeFrom = yearFrom + '-' + monthFrom + '-' + dayFrom + ' ' + hours + ':' + minutes + ':' + seconds
        this.listQuery.dateTimeTo = yearTo + '-' + monthTo + '-' + dayTo + ' ' + hours + ':' + minutes + ':' + seconds
      } else {
        this.listQuery.dateTimeFrom = undefined
        this.listQuery.dateTimeTo = undefined
      }
      this.listQuery.current = 1
      this.getList()
    },
    handClick(name, data, type) {
      var anchorObj, index
      if (!type) {
        anchorObj = {
          roomSn: data.roomSn
        }
        index = 1
      } else {
        anchorObj = {
          userSn: data.userVO.userSn
        }
        index = 2
      }
      if (isFreeMembership()) {
        this.$refs.major.initData(true, index)
        return
      }
      const routeData = this.$router.resolve({ path: name, query: anchorObj })
      window.open(routeData.href, '_blank')
    },
    onTableHeaderClicked(column, event) {
      this.$refs.listScreen.changeValue(column)
    },
    showImg(data) {
      if (this.roomVal !== data.roomSn) {
        getRoomCode(data.roomSn).then(res => {
          this.imgUrl = res.data
          this.imgLoading = false
          this.roomVal = data.roomSn
        }).catch(() => {
          this.imgLoading = true
        })
      } else {
        this.imgLoading = false
      }
    },
    changeData(data) {
      this.listQuery.sort = data
      this.listQuery.current = 1
      this.getList()
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
    tips(data) {
      const routeData = this.$router.resolve({ path: 'big', query: { roomSn: data.roomSn, hasLive: data.hasLive }})
      window.open(routeData.href, '_blank')
    },
    handClickLive(data) {
      this.$refs.liveingScene.isShow = true
      this.$refs.liveingScene.initData(data)
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  /deep/ .el-checkbox__label{
    padding-left: 6px;
  }
  .topArea{
    padding-bottom: 20px;
    border-bottom: 1px solid #EBEEF5;
    margin-bottom: 20px;
    .realLive {
      width: 41px;
      height: 16px;
      background: #0072FF;
      border-radius: 2px;
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 16px;
      margin-left: 8px;
      display: inline-block;
      text-align: center;
    }
    .checkArea{
      margin-top: 17px;
    }
  }
  .btnList {
    float: right;
  }
  .topHeader {
    position:relative;
    display: flex;
    align-items: center;
  }
  .topHeader>.tag-live {
    position: initial;
    transform: initial;
    margin-left: 8px;
    margin-top: 3px;
    height: 16px;
    line-height: 18px;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
</style>
