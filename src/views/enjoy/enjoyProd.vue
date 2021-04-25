<template>
  <div ref="myAppContainer" class="app-container">
    <div class="page-title">我关注的商品</div>
    <prodScreen @getData="getData" />
    <listScreen ref="listScreen" :type-number="19" :select-number="selceNumber" @changeData="changeData" />
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
        <el-table-column v-if="columnObj.shopName" key="3" label="小店" width="180px" />
        <el-table-column v-if="columnObj.todaySales" key="4" label="今日销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />今日销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.yesterdaySales" key="5" label="昨日销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />昨日销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.sevenSales" key="6" label="7天销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />7天销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.totalSales" key="7" label="总销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />总销量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.cosFeeExplain" key="8" label="佣金" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />佣金</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.cosRatioExplain" key="9" label="佣金率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />佣金率</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkRoomCount" key="10" label="关联直播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '11'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />关联直播</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkUserCount" key="11" label="关联主播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />关联主播</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.createdAtExplain" key="12" label="收录时间" width="124px" />
        <el-table-column key="13" min-width="90px" header-align="right" fixed="right">
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
        :header-cell-style="{background:'#FAFAFA',color:'#232333',fontSize:'14px',fontWeight:'400',paddingLeft:0,paddingRight:0}"
        :row-style="{color:'#606266',fontSize:'14px',fontWeight:'400'}"
        fit
        style="width: 100%"
        empty-text="暂无数据"
        element-loading-text="查询中..."
        clss="elTable"
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
                <el-image class="columnImg" fit="fill" :src="scope.row.coverUrl" lazy>
                  <div slot="error">
                    <img class="columnImg" fit="cover" src="../../icons/images/error_prod.png">
                  </div>
                </el-image>
                <div v-if="!scope.row.onShelf" class="onSales">已下架</div>
              </div>
              <div class="nameContainer">
                <div class="title hoveColor" @click="handClick(scope.row)">{{ scope.row.title }}</div>
                <div class="subtitle">
                  <span v-if="scope.row.thirdCidExplain!==''" class="columnLabe">{{ scope.row.thirdCidExplain }}</span>
                  <span class="price">{{ scope.row.priceExplain }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.shopName" key="3" label="小店" width="180px">
          <template slot-scope="scope">
            <div class="hasShop hoveColor" @click="handClickShop(scope.row)">{{ scope.row.shopVO === null ? '/' : scope.row.shopVO.shopName }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.todaySales" key="4" label="今日销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />今日销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.todaySales }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.yesterdaySales" key="5" label="昨日销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />昨日销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.yesterdaySales }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.sevenSales" key="6" label="7天销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />7天销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.sevenSales }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.totalSales" key="7" label="总销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />总销量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.totalSales }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.cosFeeExplain" key="8" label="佣金" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />佣金</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.cosFeeExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.cosRatioExplain" key="9" label="佣金率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />佣金率</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.cosRatioExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkRoomCount" key="10" label="关联直播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '11'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '11' ? 'el-icon-sort-down' : 'stand'" />关联直播</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.linkRoomCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkUserCount" key="11" label="关联主播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />关联主播</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.linkUserCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.createdAtExplain" key="12" label="收录时间" width="124px">
          <template slot-scope="scope">
            <div>{{ scope.row.createdAtExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column key="13" min-width="90px" header-align="right" fixed="right">
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
import prodScreen from '@/components/prodScreen/prodScreen.vue'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import copyView from '@/components/copy/copyVue.vue'
import major from '@/components/major/major.vue'
import { headerTabel } from '@/utils/headerTable.js'
import { isFreeMembership } from '@/utils/permission.js'
import { enjoyOrNotEnjoyPro, enjoyProdList } from '@/api/fav.js'
import { favGoodsState } from '@/utils/headerConfig.js'
export default {
  name: 'GoodsRank',
  components: { listScreen, prodScreen, Pagination, BackToTop, copyView, major },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 25,
        sort: '0',
        onShelf: 1
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
      if (JSON.parse(localStorage.getItem('favGoodsRank') === null)) {
        this.columnObj = favGoodsState
      } else {
        this.columnObj = JSON.parse(localStorage.getItem('favGoodsRank'))
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
      enjoyProdList(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      }).catch(() => {
        this.listLoading = false
      })
    },
    handClick(data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 3)
        return
      }
      const routeData = this.$router.resolve({ path: '/goodsDetail', query: { goodsId: data.goodsId }})
      window.open(routeData.href, '_blank')
    },
    handClickShop(data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 4)
        return
      }
      const routeData = this.$router.resolve({ path: 'smallShopDetail', query: { shopId: data.shopVO.shopId }})
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
    border: 1px solid #f9f9f9;
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
