<template>
  <div ref="myAppContainer" class="app-container">
    <div class="shopArea">
      <div class="page-title">小店详情</div>
      <div class="shop-container">
        <img v-if="shopInfo.shopLogo!==''" class="shopInfo-left objCss" :src="shopInfo.shopLogo">
        <img v-else class="shopInfo-left objCss" src="../../icons/images/error_shop.png">
        <div class="shopInfo-right">
          <div class="shopInfo-header">
            <div class="shopName">{{ shopInfo.shopName }} <span class="origin" @click="openOrigin">原始页面 <i class="el-icon-right" /></span></div>
            <div class="listBTn" :class="shopInfo.fav ? 'listBTnEnjoy': ''" @click="handEnjoyShop(shopInfo)">{{ shopInfo.fav? '取消关注': '关注' }}</div>
          </div>
          <div class="subtitle">{{ shopInfo.companyName }}</div>
          <div class="shopData">
            <div class="dataFirst">
              <div class="dataPublic">今日销量：<span class="dataNumber">{{ shopInfo.todaySales }}</span></div>
              <div class="dataPublic">昨日销量：<span class="dataNumber">{{ shopInfo.yesterdaySales }}</span></div>
              <div class="dataPublic">7天销量：<span class="dataNumber">{{ shopInfo.sevenSales }}</span></div>
              <div class="dataPublic">总销量：<span class="dataNumber">{{ shopInfo.totalSales }}</span></div>
            </div>
            <div class="dataSecode">
              <div class="dataPublic">关联直播：<span class="dataNumber">{{ shopInfo.linkRoomCount }}</span></div>
              <div class="dataPublic">关联主播：<span class="dataNumber">{{ shopInfo.linkUserCount }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <listScreen ref="listScreen" :type-number="6" :select-number="selceNumber" @changeData="changeData" />
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
            <div class="columnHeader">
              <div class="colummImg">商品主图</div>
              <div class="prodName">商品名称</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.todaySales" key="3" label="今日销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />今日销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.yesterdaySales" key="4" label="昨日销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />昨日销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.sevenSales" key="5" label="7天销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />7天销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.totalSales" key="6" label="总销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />总销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.cosFeeExplain" key="7" label="佣金" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />佣金</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.cosRatioExplain" key="8" label="佣金率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />佣金率</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkRoomCount" key="9" label="关联直播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '11'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />关联直播</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkUserCount" key="10" label="关联主播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />关联主播</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.createdAtExplain" key="11" label="收录时间" width="124px" />
        <el-table-column key="12" min-width="90px" header-align="right" fixed="right">
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
            <div class="columnHeader">
              <div class="colummImg">商品主图</div>
              <div class="prodName">商品名称</div>
            </div>
          </template>
          <template slot-scope="scope">
            <div class="columnContent">
              <div style="position: relative;" @click="handClick(scope.row)">
                <el-image class="columnImg" fit="cover" :src="scope.row.coverUrl" lazy>
                  <div slot="error">
                    <img class="columnImg" fit="cover" src="../../icons/images/error_prod.png">
                  </div>
                </el-image>
                <div v-if="!scope.row.onShelf" class="onSales">已下架</div>
              </div>
              <div class="nameContainer">
                <div class="title hoveColor" @click="handClick(scope.row)">{{ scope.row.title }}</div>
                <div class="subtitle">
                  <span v-if="scope.row.thirdCidExplain!==''" class="columnLabe">{{ scope.row.thirdCidExplain.substring(0, 5) }}</span>
                  <span class="price">{{ scope.row.priceExplain }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.todaySales" key="3" label="今日销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />今日销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.todaySales }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.yesterdaySales" key="4" label="昨日销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />昨日销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.yesterdaySales }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.sevenSales" key="5" label="7天销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />7天销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.sevenSales }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.totalSales" key="6" label="总销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />总销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.totalSales }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.cosFeeExplain" key="7" label="佣金" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />佣金</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.cosFeeExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.cosRatioExplain" key="8" label="佣金率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />佣金率</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.cosRatioExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkRoomCount" key="9" label="关联直播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '11'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />关联直播</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.linkRoomCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkUserCount" key="10" label="关联主播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />关联主播</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.linkUserCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.createdAtExplain" key="11" label="收录时间" width="124px">
          <template slot-scope="scope">
            <div>{{ scope.row.createdAtExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column key="12" min-width="90px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
          <template slot-scope="scope">
            <div class="btnList">
              <div class="listBTn" :class="scope.row.fav ? 'listBTnEnjoy': ''" @click="handEnjoy(scope.row)">{{ scope.row.fav? '取消关注': '关注' }}</div>
              <div class="listBTn" @click="handClick(scope.row)">详情</div>
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
</template>
<script>
import listScreen from '@/components/listScreen/listScreen.vue'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import copyView from '@/components/copy/copyVue.vue'
import { getDetail } from '@/api/shop.js'
import { getList } from '@/api/good.js'
import { headerTabel } from '@/utils/headerTable.js'
import { enjoyOrNotEnjoyPro, enjoyOrNotEnjoyShop } from '@/api/fav.js'
import { shopGoodsState } from '@/utils/headerConfig.js'
import { isFreeMembership } from '@/utils/permission.js'
import major from '@/components/major/major.vue'
export default {
  name: 'SmallShopDetail',
  components: { listScreen, Pagination, BackToTop, copyView, major },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 25,
        sort: '0',
        shopId: undefined,
        onShelf: undefined
      },
      listLoading: false,
      list: [],
      shopInfo: {},
      total: 0,
      isScroll: false,
      myHeaderWidth: 0,
      columnObj: undefined,
      selceNumber: undefined
    }
  },
  created() {
    this.initTable()
    this.listQuery.shopId = this.$route.query.shopId
  },
  mounted() {
    var that = this
    headerTabel(this.$refs.myAppContainer, that)
    window.addEventListener('scroll', this.changeScroll)
    this.getDetail()
    this.getList()
  },
  destroyed() {
    window.removeEventListener('scroll', this.changeScroll)
  },
  methods: {
    initTable() {
      if (JSON.parse(localStorage.getItem('shopGoods') === null)) {
        this.columnObj = shopGoodsState
      } else {
        this.columnObj = JSON.parse(localStorage.getItem('shopGoods'))
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
        this.total = res.data.total
        this.list = res.data.list
        this.listLoading = false
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      }).catch(() => {
        this.listLoading = false
      })
    },
    getDetail() {
      getDetail(this.listQuery.shopId).then(res => {
        document.title = res.data.shopName + ' 小店详情' + ' - 热抖数据'
        this.shopInfo = res.data
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
    handClick(data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 3)
        return
      }
      const routeData = this.$router.resolve({ path: '/goodsDetail', query: { goodsId: data.goodsId }})
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
    openOrigin() {
      var url = 'https://haohuo.jinritemai.com/views/shop/index?id=' + this.shopInfo.shopSn
      window.open(url, '_blank')
    },
    handleSearch() {
      this.getList()
    },
    handEnjoyShop(data) {
      var name
      if (!data.fav) {
        name = 'add'
      } else {
        name = 'del'
      }
      enjoyOrNotEnjoyShop(name, data.shopId).then(res => {
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
    },
    isFreeMembership() {
      return isFreeMembership()
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .shopArea{
    margin-bottom: 40px;
    .shop-container {
      width: 100%;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      padding: 30px;
      margin-top: 20px;
      display: flex;
      .shopInfo-left {
        width: 110px;
        height: 110px;
        display: block;
        margin-right: 20px;
        min-width: 110px;
        border:1px solid #f9f9f9
      }
      .shopInfo-right {
        flex: 1;
        .shopInfo-header {
          display: flex;
          justify-content: space-between;
          .shopName {
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
        .subtitle {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #606266;
          line-height: 20px;
          margin-bottom: 15px;
          margin-top: -15px;
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
          width: 15%;
        }
        .dataNumber {
          font-weight: 600;
          display: inline-block;
          margin-left: 10px;
        }
        .dataPublic:not(:last-child) {
          margin-right: 60px;
        }
        .dataSecode> .dataPublic {
          margin-bottom: 0;
        }
      }
    }
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
  .columnImg {
    width: 80px;
    height: 80px;
    display: block;
    min-width: 80px;
    border:1px solid #f9f9f9;
    cursor: pointer;
  }
  .title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
    line-height: 20px;
    margin-bottom: 5px;
  }
  .price {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FF0000;
    line-height: 20px;
  }
  .columnHeader {
    display: flex;
    .colummImg {
      margin-left: 9px;
    }
    .prodName {
      margin-left: 37px;
    }
  }
  .columnContent {
    display: flex;
    align-items: center;
    padding-right: 40px;
    .nameContainer {
      margin-left: 22px;
      .subtitle {
        display: flex;
        align-items: center;
        .columnLabe {
          display: inline-block;
          padding: 0 9px;
          margin-right: 12px;
        }
        .price {
          display: inline-block;
        }
      }
    }
  }
  .hasShop {
    padding-right: 40px;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
</style>
