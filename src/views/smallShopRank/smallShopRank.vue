<template>
  <div ref="myAppContainer" class="app-container">
    <div class="searchArea">
      <div class="page-title">抖音小店榜</div>
      <div class="search-left">
        <div class="keyWordCss">
          <span class="pubilcSubtitle">关键字</span>
          <el-input v-model="listQuery.keyword" :disabled="isFreeMembership()" class="keyWordInput" clearable placeholder="请输入关键字搜索小店" @keyup.enter.native="handeInput" />
        </div>
        <el-button class="searchBtn" type="primary" :disabled="isFreeMembership()" size="medium" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <listScreen ref="listScreen" :type-number="5" :select-number="selceNumber" @changeData="changeData" />
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
              <div class="colummImg">小店LOGO</div>
              <div class="prodName">小店名称</div>
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
        <el-table-column v-if="columnObj.linkRoomCount" key="7" label="关联直播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />关联直播</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkUserCount" key="8" label="关联主播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />关联主播</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.onShelfCount" key="9" label="上架商品" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />上架商品</div>
          </template>
        </el-table-column>
        <el-table-column key="10" min-width="90px" header-align="right" fixed="right">
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
            <div class="columnHeader">
              <div class="colummImg">小店LOGO</div>
              <div class="prodName">小店名称</div>
            </div>
          </template>
          <template slot-scope="scope">
            <div class="columnContent">
              <div @click="handClick(scope.row)">
                <el-image class="columnImg" fit="cover" :src="scope.row.shopLogo" lazy>
                  <div slot="error">
                    <img class="columnImg" fit="cover" src="../../icons/images/error_prod.png">
                  </div>
                </el-image>
              </div>
              <div class="nameContainer">
                <div class="title hoveColor" @click="handClick(scope.row)">{{ scope.row.shopName }}</div>
                <div class="subtitle hoveColor" @click="handClick(scope.row)">
                  {{ scope.row.companyName }}
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
        <el-table-column v-if="columnObj.linkRoomCount" key="7" label="关联直播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '7'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '7' ? 'el-icon-sort-down' : 'stand'" />关联直播</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.linkRoomCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.linkUserCount" key="8" label="关联主播" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '9'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '9' ? 'el-icon-sort-down' : 'stand'" />关联主播</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.linkUserCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="columnObj.onShelfCount" key="9" label="上架商品" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '13'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '13' ? 'el-icon-sort-down' : 'stand'" />上架商品</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.onShelfCount }}</div>
          </template>
        </el-table-column>
        <el-table-column key="10" min-width="90px" header-align="right" fixed="right">
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
import listScreen from '@/components/listScreen/listScreen.vue'
import { getList } from '@/api/shop.js'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import major from '@/components/major/major.vue'
import copyView from '@/components/copy/copyVue.vue'
import { headerTabel } from '@/utils/headerTable.js'
import { isFreeMembership } from '@/utils/permission.js'
import { enjoyOrNotEnjoyShop } from '@/api/fav.js'
import { shopState } from '@/utils/headerConfig.js'
export default {
  name: 'SmallShopRank',
  components: { listScreen, Pagination, BackToTop, copyView, major },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 25,
        sort: '0',
        keyword: undefined
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
    this.initKeyWord()
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
    initKeyWord() {
      if (this.$route.query.keyword !== undefined) {
        this.listQuery.keyword = this.$route.query.keyword
      }
      this.getList()
    },
    initTable() {
      if (JSON.parse(localStorage.getItem('shopRank') === null)) {
        this.columnObj = shopState
      } else {
        this.columnObj = JSON.parse(localStorage.getItem('shopRank'))
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
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSearch() {
      this.listQuery.current = 1
      this.getList()
    },
    handClick(data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 4)
        return
      }
      const routeData = this.$router.resolve({ path: 'smallShopDetail', query: { shopId: data.shopId }})
      window.open(routeData.href, '_blank')
    },
    onTableHeaderClicked(column) {
      this.$refs.listScreen.changeValue(column)
    },
    changeData(data) {
      this.listQuery.sort = data
      this.handleSearch()
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
    handeInput() {
      this.handleSearch()
    },
    handEnjoy(data) {
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
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .searchArea{
    padding-bottom: 30px;
    margin-top: 0;
    .search-left{
      margin-top: 20px;
    }
    .searchBtn {
      margin-left: 40px;
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
    border: 1px solid #F9F9F9;
    min-width: 80px;
    cursor: pointer;
  }
  .shoName {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #606266;
    line-height: 20px;
    margin-bottom: 6px;
  }
  .companyName {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
    line-height: 17px;
  }
  .columnHeader {
    display: flex;
    .colummImg {
      margin-left: 9px;
    }
    .prodName {
      margin-left: 24px;
    }
  }
  .columnContent {
    display: flex;
    align-items: center;
    padding-right: 40px;
    .nameContainer {
      margin-left: 28px;
      .title {
        color: #606266;
        font-weight: bolder;
        font-size: 14px;
      }
      .subtitle {
        font-size: 12px;
      }
    }
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
</style>
