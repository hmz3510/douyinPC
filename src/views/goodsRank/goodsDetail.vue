<template>
  <div ref="myAppContainer" class="app-container">
    <div class="prod-content">
      <div class="shopArea">
        <div class="page-title">商品详情</div>
        <div class="shop-container">
          <div class="prodInf">
            <img v-if="goodsInfo.coverUrl!==''" class="shopInfo-left objCss" :src="goodsInfo.coverUrl">
            <img v-else class="shopInfo-left objCss" src="../../icons/images/error-prodBig.png">
            <div v-if="!goodsInfo.onShelf" class="onSales">已下架</div>
          </div>
          <div class="shopInfo-right">
            <div class="shopInfo-header">
              <div class="shopName">{{ goodsInfo.title }} <span class="origin" @click="openOrigin">原始页面 <i class="el-icon-right" /></span></div>
              <div class="listBTn" :class="goodsInfo.fav ? 'listBTnEnjoy': ''" @click="handEnjoyProd(goodsInfo)">{{ goodsInfo.fav? '取消关注': '关注' }}</div>
            </div>
            <div class="subtitle">
              <div v-if="goodsInfo.thirdCidExplain!==''" class="label">{{ goodsInfo.thirdCidExplain }}</div>
              <div v-if="goodsInfo.shopVO!=null" class="companyName" @click="handShop(goodsInfo)">{{ goodsInfo.shopVO.shopName }}</div>
            </div>
            <div class="price">{{ goodsInfo.priceExplain }}</div>
            <div class="commission">佣金：<strong>{{ goodsInfo.cosFeeExplain }}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;佣金率：<strong>{{ goodsInfo.cosRatioExplain }}</strong></div>
            <div class="shopData">
              <div class="dataFirst">
                <div class="dataPublic">今日销量：<span class="dataNumber">{{ goodsInfo.todaySales }}</span></div>
                <div class="dataPublic">昨日销量：<span class="dataNumber">{{ goodsInfo.yesterdaySales }}</span></div>
                <div class="dataPublic">7天销量：<span class="dataNumber">{{ goodsInfo.sevenSales	}}</span></div>
                <div class="dataPublic">总销量：<span class="dataNumber">{{ goodsInfo.totalSales	}}</span></div>
              </div>
              <div class="dataSecode">
                <div class="dataPublic">关联直播：<span class="dataNumber">{{ goodsInfo.linkRoomCount }}</span></div>
                <div class="dataPublic">关联主播：<span class="dataNumber">{{ goodsInfo.linkUserCount }}</span></div>
                <div class="dataPublic">收录时间：<span class="dataNumber">{{ goodsInfo.createdAtExplain }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <goodChart ref="goodChart" />
      <div class="liveRoom">
        <div class="page-title">关联的直播间</div>
      </div>
      <listScreen ref="listScreen" :type-number="7" :select-number="selceNumber" @changeData="changeData" />
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
          <el-table-column v-if="columnObj.openTime" key="3" label="开播时间" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />开播时间</div>
            </template>
          </el-table-column>
          <el-table-column v-if="columnObj.totalUser" key="4" label="观众数" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />观众数</div>
            </template>
          </el-table-column>
          <el-table-column v-if="columnObj.maxUserCountExplain" key="5" label="峰值在线" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />峰值在线</div>
            </template>
          </el-table-column>
          <el-table-column v-if="columnObj.salesExplain" key="6" label="该商品销量" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />该商品销量</div>
            </template>
          </el-table-column>
          <el-table-column v-if="columnObj.converRateExplain" key="7" label="转化率" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />转化率</div>
            </template>
          </el-table-column>
          <el-table-column key="8" min-width="175px" header-align="right" fixed="right">
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
                  <div v-if="scope.row.userVO.hasLive" class="tag-live tag-live1">
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
          <el-table-column v-if="columnObj.openTime" key="3" label="开播时间" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />开播时间</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.createTimeExplain }}</div>
              <div class="hasPadding">{{ scope.row.liveTimeExplain }}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="columnObj.totalUser" key="4" label="观众数" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />观众数</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.totalUser }}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="columnObj.maxUserCountExplain" key="5" label="峰值在线" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />峰值在线</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.maxUserCountExplain }}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="columnObj.salesExplain" key="6" label="该商品销量" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />该商品销量</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.salesExplain }}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="columnObj.converRateExplain" key="7" label="转化率" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />转化率</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.converRateExplain }}</div>
            </template>
          </el-table-column>
          <el-table-column key="8" min-width="175px" header-align="right" fixed="right">
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
        <copyView ref="copy" />
        <major ref="major" :dialog-boolean="true" />
      </div>
    </div>
  </div>
</template>
<script>
import listScreen from '@/components/listScreen/listScreen.vue'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import goodChart from '@/components/goodChaart/goodChart.vue'
import copyView from '@/components/copy/copy1.vue'
import { getDetail, getGoodRoom, getGoodTrend } from '@/api/good.js'
import { headerTabel } from '@/utils/headerTable.js'
import { enjoyOrNotEnjoyLive, enjoyOrNotEnjoyPro } from '@/api/fav.js'
import { goodsLiveState } from '@/utils/headerConfig.js'
import major from '@/components/major/major.vue'
import { isFreeMembership } from '@/utils/permission.js'
export default {
  name: 'GoodsDetail',
  components: { listScreen, Pagination, BackToTop, goodChart, copyView, major },
  data() {
    return {
      listQuery: {
        sort: '0',
        current: 1,
        size: 25,
        goodsId: undefined
      },
      listLoading: false,
      total: 0,
      list: [],
      goodsInfo: {
        shopVO: {}
      },
      isScroll: false,
      myHeaderWidth: 0,
      columnObj: undefined,
      selceNumber: undefined
    }
  },
  created() {
    this.listQuery.goodsId = this.$route.query.goodsId
    this.initTable()
    this.getDetail()
    this.getGoodTrend()
  },
  mounted() {
    var that = this
    headerTabel(this.$refs.myAppContainer, that)
    window.addEventListener('scroll', this.changeScroll)
    this.getList()
  },
  destroyed() {
    window.removeEventListener('scroll', this.changeScroll)
  },
  methods: {
    initTable() {
      if (JSON.parse(localStorage.getItem('goodsLive') === null)) {
        this.columnObj = goodsLiveState
      } else {
        this.columnObj = JSON.parse(localStorage.getItem('goodsLive'))
      }
      var sum = 0
      for (var item in this.columnObj) {
        if (this.columnObj[item]) {
          sum += 1
        }
      }
      this.selceNumber = sum + '/' + Object.keys(this.columnObj).length
    },
    getDetail() {
      getDetail(this.listQuery.goodsId).then(res => {
        document.title = res.data.title + ' 商品详情' + ' - 热抖数据'
        this.goodsInfo = res.data || []
      })
    },
    getGoodTrend() {
      getGoodTrend(this.listQuery.goodsId).then(res => {
        this.$refs.goodChart.initData(res.data)
      })
    },
    getList() {
      this.listLoading = true
      getGoodRoom(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
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
            message: '取消成功!'
          })
          data.fav = false
        }
      })
    },
    handShop(data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 4)
        return
      }
      const routeData = this.$router.resolve({ path: 'smallShopDetail', query: { shopId: data.shopVO.shopId }})
      window.open(routeData.href, '_blank')
    },
    openOrigin() {
      var url = 'https://haohuo.jinritemai.com/views/product/item?id=' + this.goodsInfo.goodsId
      window.open(url, '_blank')
    },
    isFreeMembership() {
      return isFreeMembership()
    },
    handEnjoyProd(data) {
      var name
      if (!data.fav) {
        name = 'add'
      } else {
        name = 'del'
      }
      enjoyOrNotEnjoyPro(name, data.goodsId).then(res => {
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
    tips(data) {
      const routeData = this.$router.resolve({ path: 'big', query: { roomSn: data.roomSn, hasLive: data.userVO.hasLive }})
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
  .prod-content {
    max-width: 1120px;
    margin: auto;
  }
  .shopArea{
    margin-bottom: 20px;
    .shop-container {
      width: 100%;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      padding:20px 30px 20px 20px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      .shopInfo-left {
        width: 190px;
        height: 190px;
        display: block;
        min-width: 190px;
        border:1px solid #f9f9f9
      }
      .shopInfo-right {
        flex: 1;
        margin-left: 20px;
        .shopInfo-header {
          display: flex;
          justify-content: space-between;
          .shopName {
            height: 22px;
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #232333;
            line-height: 22px;
            .origin {
              display: inline-block;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #0E71EB;
              line-height: 20px;
              cursor: pointer;
              margin-left: 20px;
            }
          }
        }
        .price {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FF0000;
          line-height: 20px;
          margin-bottom: 5px;
        }
        .commission {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #606266;
          line-height: 20px;
          margin-bottom: 14px;
        }
        .subtitle {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #606266;
          margin-bottom: 7px;
          margin-top: -10px;
          display: flex;
          align-items: center;
          .label {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #0E71EB;
            padding: 3.5px 10px;
            background: #E7F1FD;
            border-radius: 2px;
            border: 1px solid #CFE3FB;
            margin-right: 10px;
          }
        }
      }
      .shopData {
        .dataPublic {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #606266;
          line-height: 20px;
          display: inline-block;
          margin-bottom: 10px;
          width: 20%;
        }
        .dataNumber {
          font-weight: 600;
          display: inline-block;
          margin-left: 10px;
        }
        .dataPublic:not(:last-child) {
          margin-right: 50px;
        }
      }
    }
  }
  .echarts-container {
    height: 285px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
  }
  .liveRoom {
    border-bottom: 1px solid #EBEEF5;
    padding-bottom: 20px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .btnList{
    float: right;
  }
  .btnList>div:last-child{
    display: block;
    margin-bottom: 0;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
  .prodInf {
    position: relative;
    .onSales {
      width: 99%;
      left: 1px;
    }
  }
  .companyName {
    cursor: pointer;
  }
</style>
