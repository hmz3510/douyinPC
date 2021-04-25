<template>
  <div ref="myAppContainer" class="liveRecordArea">
    <listScreen ref="listScreen" :type-number="8" :select-number="selceNumber" @changeData="changeData" />
    <div v-show="isScroll" class="headerTableCss" :style="{width:myHeaderWidth + 80 + 'px'}">
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
        <el-table-column v-if="columnObj.openTime" key="3" label="开播时间" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '31'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '31' ? 'el-icon-sort-down' : 'stand'" />开播时间</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.totalUser" key="4" label="观众数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />观众数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.maxUserCountExplain" key="5" label="峰值在线" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />峰值在线</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.fanTicket" key="6" label="音浪收入" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />音浪收入</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.followCount" key="7" label="直播涨粉" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />直播涨粉</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.likeCount" key="8" label="点赞数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />点赞数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.giftUvCount" key="9" label="送礼人数" width="124px" />
        <el-table-column v-if="columnObj.goodsCount" key="10" label="商品数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />商品数</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.salesExplain" key="11" label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '15'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '15' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.salesMoneyExplain" key="12" label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '17'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '17' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.guestUnitPriceExplain" key="13" label="客单价" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '19'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />客单价</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.userContributionExplain" key="14" label="人均贡献" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '21'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '21' ? 'el-icon-sort-down' : 'stand'" />人均贡献</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSalesExplain" key="15" label="小时销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '23'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '23' ? 'el-icon-sort-down' : 'stand'" />小时销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSalesMoneyExplain" key="16" label="小时销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '25'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '25' ? 'el-icon-sort-down' : 'stand'" />小时销售额</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSoundWave" key="17" label="小时音浪" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '27'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '27' ? 'el-icon-sort-down' : 'stand'" />小时音浪</div>
          </template>
        </el-table-column>
        <el-table-column key="18" min-width="175px" header-align="right" fixed="right">
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
              <div class="right-title hoveColor" @click="handClick('liveDetail', scope.row)">{{ scope.row.title }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.openTime" key="3" label="开播时间" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '31'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '31' ? 'el-icon-sort-down' : 'stand'" />开播时间</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.createTimeExplain }}</div>
            <div class="hasPadding">{{ scope.row.liveTimeExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.totalUser" key="4" label="观众数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />观众数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.totalUser }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.maxUserCountExplain" key="5" label="峰值在线" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />峰值在线</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.maxUserCountExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.fanTicket" key="6" label="音浪收入" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />音浪收入</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.fanTicket }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.followCount" key="7" label="直播涨粉" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />直播涨粉</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.followCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.likeCount" key="8" label="点赞数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />点赞数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.likeCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.giftUvCount" key="9" label="送礼人数" width="124px">
          <template slot-scope="scope">
            <div>{{ scope.row.giftUvCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.goodsCount" key="10" label="商品数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />商品数</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.goodsCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.salesExplain" key="11" label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '15'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '15' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.salesExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.salesMoneyExplain" key="12" label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '17'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '17' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.salesMoneyExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.guestUnitPriceExplain" key="13" label="客单价" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '19'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />客单价</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.guestUnitPriceExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.userContributionExplain" key="14" label="人均贡献" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '21'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '21' ? 'el-icon-sort-down' : 'stand'" />人均贡献</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.userContributionExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSalesExplain" key="15" label="小时销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '23'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '23' ? 'el-icon-sort-down' : 'stand'" />小时销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.hoursSalesExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSalesMoneyExplain" key="16" label="小时销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '25'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '25' ? 'el-icon-sort-down' : 'stand'" />小时销售额</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.hoursSalesMoneyExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.hoursSoundWave" key="17" label="小时音浪" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '27'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '27' ? 'el-icon-sort-down' : 'stand'" />小时音浪</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.hoursSoundWave }}</div>
          </template>
        </el-table-column>
        <el-table-column key="18" min-width="175px" header-align="right" fixed="right">
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
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top :visibility-height="100" />
      </el-tooltip>
    </div>
    <major ref="major" :dialog-boolean="true" />
  </div>
</template>
<script>
import listScreen from '@/components/listScreen/listScreen.vue'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import { getList } from '@/api/live.js'
import { enjoyOrNotEnjoyLive } from '@/api/fav.js'
import { headerTabel } from '@/utils/headerTable.js'
import { anchorDetailState } from '@/utils/headerConfig.js'
import major from '@/components/major/major.vue'
import { isFreeMembership } from '@/utils/permission.js'
export default {
  name: 'LiveRecord',
  components: { listScreen, Pagination, BackToTop, major },
  props: {
    userSn: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 25,
        userSn: this.userSn,
        sort: '31'
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
  created() {
    this.initTable()
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
    initTable() {
      if (JSON.parse(localStorage.getItem('liveRecond') === null)) {
        this.columnObj = anchorDetailState
      } else {
        this.columnObj = JSON.parse(localStorage.getItem('liveRecond'))
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
      getList(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
      }).catch(() => {
        this.listLoading = false
      })
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
    changeScroll() {
      if (this.$refs.tableDiv.getBoundingClientRect().top < 0) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
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
    isFreeMembership() {
      return isFreeMembership()
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
  .btnList{
    float: right;
    .listBTn{
      width: 70px;
      text-align: center;
      display: inline-block;
    }
  }
  .btnList> div:last-child{
    margin-bottom: 0;
    display: block;
  }
  .secodeColumn {
    display: flex;
    align-items: center;
  }
  .realRank {
    margin-right: 10px;
    min-width: 60px;
  }
  .right-title {
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
</style>
