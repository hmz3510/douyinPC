<template>
  <div ref="myAppContainer" class="app-container">
    <div class="page-title">主播数据库</div>
    <fliterArea ref="filterArea" :use-number="3" :title-name="'主播类型'" :is-history="false" :is-anchor-data="true" @getData="getData" />
    <listScreen ref="listScreen" :type-number="16" :select-number="selceNumber" @changeData="changeData" />
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
        <el-table-column v-if="columnObj.addFansExplain" key="4" label="7日涨粉" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />7日涨粉</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.addFansRateExplain" key="5" label="7日涨粉率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />7日涨粉率</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.liveCount" key="6" label="30日开播场次" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />30日开播场次</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.goodsLiveCount" key="7" label="30日带货场次" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />30日带货场次</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.interateRateExplain" key="8" label="直播互动率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />直播互动率</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.liveTimeExplain" key="9" label="直播时长" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '11'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />直播时长</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.userCount" key="10" label="观众数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />观众数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.fanTicket" key="11" label="音浪收入" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '15'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '15' ? 'el-icon-sort-down' : 'stand'" />音浪收入</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.likeCount" key="12" label="点赞数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '17'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '17' ? 'el-icon-sort-down' : 'stand'" />点赞数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.salesExplain" key="13" label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '19'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '19' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.salesMoneyExplain" key="14" label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '21'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '21' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.guestUnitPriceExplain" key="15" label="客单价" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '23'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '23' ? 'el-icon-sort-down' : 'stand'" />客单价</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.userContributionExplain" key="16" label="人均贡献" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '25'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '25' ? 'el-icon-sort-down' : 'stand'" />人均贡献</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSalesExplain" key="17" label="小时销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '27'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '27' ? 'el-icon-sort-down' : 'stand'" />小时销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSalesMoneyExplain" key="18" label="小时销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '29'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '29' ? 'el-icon-sort-down' : 'stand'" />小时销售额</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSoundWave" key="19" label="小时音浪" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '31'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '31' ? 'el-icon-sort-down' : 'stand'" />小时音浪</div>
          </template>
        </el-table-column>
        <el-table-column key="20" min-width="90px" header-align="right" fixed="right">
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
        style="width: 100%; z-index: 5;"
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
                    <span class="nameSpan hoveColor" @click="handClick('anchorDetail', scope.row)">{{ scope.row.nickname }}</span>
                    <div class="codeDiv">
                      <el-popover
                        v-if="scope.row.shareQrcodeUrl!==''"
                        placement="top-start"
                        width="220"
                        trigger="hover"
                        style="margin-top: -4px;"
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
        <el-table-column v-if="columnObj.addFansExplain" key="4" label="7日涨粉" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />7日涨粉</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.addFansExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.addFansRateExplain" key="5" label="7日涨粉率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />7日涨粉率</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.addFansRateExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.liveCount" key="6" label="30日开播场次" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />30日开播场次</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.liveCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.goodsLiveCount" key="7" label="30日带货场次" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />30日带货场次</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.goodsLiveCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.interateRateExplain" key="8" label="直播互动率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />直播互动率</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.interateRateExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.liveTimeExplain" key="9" label="直播时长" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '11'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />直播时长</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.liveTimeExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.userCount" key="10" label="观众数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />观众数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.userCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.fanTicket" key="11" label="音浪收入" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '15'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '15' ? 'el-icon-sort-down' : 'stand'" />音浪收入</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.fanTicket }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.likeCount" key="12" label="点赞数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '17'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '17' ? 'el-icon-sort-down' : 'stand'" />点赞数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.likeCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.salesExplain" key="13" label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '19'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '19' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.salesExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.salesMoneyExplain" key="14" label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '21'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '21' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.salesMoneyExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.guestUnitPriceExplain" key="15" label="客单价" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '23'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '23' ? 'el-icon-sort-down' : 'stand'" />客单价</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.guestUnitPriceExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.userContributionExplain" key="16" label="人均贡献" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '25'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '25' ? 'el-icon-sort-down' : 'stand'" />人均贡献</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.userContributionExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSalesExplain" key="17" label="小时销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '27'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '27' ? 'el-icon-sort-down' : 'stand'" />小时销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.hoursSalesExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSalesMoneyExplain" key="18" label="小时销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '29'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '29' ? 'el-icon-sort-down' : 'stand'" />小时销售额</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.hoursSalesMoneyExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSoundWave" key="19" label="小时音浪" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '31'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '31' ? 'el-icon-sort-down' : 'stand'" />小时音浪</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.hoursSoundWave }}</div>
          </template>
        </el-table-column>
        <el-table-column key="20" min-width="90px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
          <template slot-scope="scope">
            <div class="btnList">
              <div v-if="scope.row.hasEntry" class="listBTn" @click="handClick('anchorDetail', scope.row)">主播详情</div>
              <div v-else class="listBTn" @click="enterUser(scope.row)">收录</div>
              <div class="listBTn" :class="scope.row.fav ? 'listBTnEnjoy': ''" @click="handEnjoy(scope.row)">{{ scope.row.fav? '取消关注': '关注' }}</div>
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
import copyView from '@/components/copy/copyVue.vue'
import major from '@/components/major/major.vue'
import { getUserList, enterUser } from '@/api/anchor.js'
import { headerTabel } from '@/utils/headerTable.js'
import { isFreeMembership } from '@/utils/permission.js'
import { enjoyOrNotEnjoyAnthor } from '@/api/fav.js'
import { anchorDataState } from '@/utils/headerConfig.js'
export default {
  name: 'AnchorData',
  components: { fliterArea, listScreen, Pagination, BackToTop, copyView, major },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 25,
        sort: '3'
      },
      listLoading: false,
      list: [],
      total: 0,
      isScroll: false,
      myHeaderWidth: 0,
      columnObj: undefined,
      selceNumber: undefined
    }
  },
  watch: {
    // 利用watch方法检测路由变化：
    '$route': function(to, from) {
      this.initKeyWord()
    }
  },
  created() {
    this.initTable()
  },
  mounted() {
    var that = this
    this.initKeyWord()
    headerTabel(this.$refs.myAppContainer, that)
    window.addEventListener('scroll', this.changeScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.changeScroll)
  },
  methods: {
    initKeyWord() {
      if (this.$route.query.keyword !== undefined) {
        this.listQuery.keyword = this.$route.query.keyword
        this.$refs.filterArea.listQuery.keyword = this.$route.query.keyword
      }
      this.getList()
    },
    initTable() {
      if (JSON.parse(localStorage.getItem('anchorDataRank') === null)) {
        this.columnObj = anchorDataState
      } else {
        this.columnObj = JSON.parse(localStorage.getItem('anchorDataRank'))
      }
      var sum = 0
      for (var item in this.columnObj) {
        if (this.columnObj[item]) {
          sum += 1
        }
      }
      this.selceNumber = sum + '/' + Object.keys(this.columnObj).length
    },
    getList() {
      this.listLoading = true
      getUserList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      }).catch(() => {
        this.listLoading = false
      })
    },
    handClick(name, data) {
      if (!data.hasEntry) {
        this.$message({
          type: 'error',
          message: '请先收录主播'
        })
        return
      }
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 2)
        return
      }
      const routeData = this.$router.resolve({ path: name, query: { userSn: data.userSn }})
      window.open(routeData.href, '_blank')
    },
    onTableHeaderClicked(column) {
      this.$refs.listScreen.changeValue(column)
    },
    changeData(data) {
      this.listQuery.sort = data
      this.listQuery.current = 1
      this.getList()
    },
    getData(data) {
      this.listQuery = Object.assign(data, this.listQuery)
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
    enterUser(data) {
      enterUser(data.uid).then(res => {
        data.userSn = res.data
        data.hasEntry = true
        this.$message({
          type: 'success',
          message: '收录成功!'
        })
      })
    },
    handEnjoy(data) {
      var name
      if (!data.fav) {
        name = 'add'
      } else {
        name = 'del'
      }
      if (!data.hasEntry) {
        this.$message({
          type: 'error',
          message: '请先收录主播'
        })
        return
      }
      enjoyOrNotEnjoyAnthor(name, data.userSn).then(res => {
        if (!data.fav) {
          this.$message({
            type: 'success',
            message: '关注成功!'
          })
          data.fav = true
        } else {
          this.$message({
            type: 'success',
            message: '取关成功!'
          })
          data.fav = false
        }
      })
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
  .resetCss {
    margin-bottom: 4px !important;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
</style>
