<template>
  <div ref="myAppContainer" class="oneLineArea">
    <onLineCharts ref="onLineCharts" />
    <div v-if="categoryInfo !== null && categoryInfo.categoryList.length!==0 && categoryInfo.shopList.length!==0" class="category-container">
      <div class="page-title">带货记录</div>
      <div v-if="categoryInfo !== null && categoryInfo.categoryList.length!==0" class="authorArea">
        <span class="pubilcSubtitle pubilcSubtitle1">品类筛选</span>
        <div class="authorList" :class="authorBoolean ? 'canSeeAll': ''">
          <div v-for="item of categoryInfo.categoryList" :key="item.key" class="authorType" :class="item.name === prodId?'allCss':''" @click="selectMe(item, false)">{{ item.name }} {{ item.value }} </div>
        </div>
        <div class="lookeMore" @click="lookMore(true)">{{ !authorBoolean ? '展开' : '收起' }} <i :class="authorBoolean ? 'el-icon-arrow-up': 'el-icon-arrow-down'" /></div>
      </div>
      <div v-if="categoryInfo !== null && categoryInfo.shopList.length!==0" class="authorArea categoryArea" :style="{marginTop: authorBoolean ? '15px': '22px'}">
        <span class="pubilcSubtitle pubilcSubtitle1">小店筛选</span>
        <div class="authorList">
          <div v-for="item of categoryInfo.shopList" :key="item.key" class="authorType" :class="item.name === userId?'allCss':''" @click="selectMe(item, true)">{{ item.name }} {{ item.value }}</div>
        </div>
      </div>
    </div>
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
        <el-table-column width="58px" type="index" fixed="left">
          <template slot="header">
            <div class="rankTitle">排行</div>
          </template>
        </el-table-column>
        <el-table-column width="336px" fixed="left">
          <template slot="header">
            <div class="colummTitle">商品</div>
          </template>
        </el-table-column>
        <el-table-column label="直播价" width="124px" />
        <el-table-column label="带货次数" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />带货次数</div>
          </template>
        </el-table-column>
        <el-table-column label="销量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />销量</div>
          </template>
        </el-table-column>
        <el-table-column label="销售额" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
          </template>
        </el-table-column>
        <el-table-column label="转化率" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />转化率</div>
          </template>
        </el-table-column>
        <el-table-column min-width="170px" header-align="right" fixed="right">
          <template slot="header">
            <div class="btnName">操作</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div ref="tableDiv" class="liveRecordArea">
      <listScreen ref="listScreen" :type-number="14" @changeData="changeData" />
      <div class="tableArea">
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
          <el-table-column width="58px" type="index" fixed="left">
            <template slot="header">
              <div class="rankTitle">排行</div>
            </template>
            <template slot-scope="scope">
              <div class="rankNumber">{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column width="336px" fixed="left">
            <template slot="header">
              <div class="colummTitle">商品</div>
            </template>
            <template slot-scope="scope">
              <div class="prodContainer" @click="handClick(scope.row)">
                <el-image class="prodImg" fit="fill" :src="scope.row.coverUrl" lazy>
                  <div slot="error">
                    <img class="columnImg" fit="cover" src="../../icons/images/error_prod.png">
                  </div>
                </el-image>
                <div class="title hoveColor">{{ scope.row.title }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="直播价" width="124px">
            <template slot-scope="scope">
              <div>{{ scope.row.priceExplain }}</div>
            </template>
          </el-table-column>
          <el-table-column label="带货次数" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />带货次数</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.liveCount }}</div>
            </template>
          </el-table-column>
          <el-table-column label="销量" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '1'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '1' ? 'el-icon-sort-down' : 'stand'" />销量</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.sales }}</div>
            </template>
          </el-table-column>
          <el-table-column label="销售额" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '3'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '3' ? 'el-icon-sort-down' : 'stand'" />销售额</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.salesMoneyExplain }}</div>
            </template>
          </el-table-column>
          <el-table-column label="转化率" width="124px">
            <template slot="header">
              <div class="headerCss" :style="{color:listQuery.sort === '5'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '5' ? 'el-icon-sort-down' : 'stand'" />转化率</div>
            </template>
            <template slot-scope="scope">
              <div class="hasPadding">{{ scope.row.converRateExplain }}</div>
            </template>
          </el-table-column>
          <el-table-column min-width="170px" header-align="right" fixed="right">
            <template slot="header">
              <div class="btnName">操作</div>
            </template>
            <template slot-scope="scope">
              <div class="btnList">
                <div class="listBTn" @click="handClick(scope.row)">商品详情</div>
                <div class="listBTn" :class="scope.row.fav ? 'listBTnEnjoy': ''" @click="handEnjoyProd(scope.row)">{{ scope.row.fav? '取消关注': '关注' }}</div>
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
  </div>
</template>

<script>
import listScreen from '@/components/listScreen/listScreen.vue'
import onLineCharts from './onLineCharts.vue'
import { getUserGoodList } from '../../api/anchor.js'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import { headerTabel } from '@/utils/headerTable.js'
import { enjoyOrNotEnjoyPro } from '@/api/fav.js'
import major from '@/components/major/major.vue'
import { isFreeMembership } from '@/utils/permission.js'
export default {
  name: 'OnlineArea',
  components: { listScreen, onLineCharts, Pagination, BackToTop, major },
  data() {
    return {
      listQuery: {
        sort: '1',
        secondCid: undefined,
        shopId: undefined,
        current: 1,
        size: 25,
        userSn: undefined
      },
      listLoading: false,
      list: [],
      hasSelect: false,
      authorBoolean: false,
      categoryBoolean: false,
      chartsData: {},
      prodId: '全部',
      userId: '全部',
      categoryInfo: null,
      selectList: [],
      total: 0,
      isScroll: false,
      myHeaderWidth: 0
    }
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
    initUserSn(data) {
      this.listQuery.userSn = data
      this.getList()
    },
    initData(data) {
      this.charts = data
      this.$refs.onLineCharts.initData(data)
    },
    initCateInfo(data) {
      this.categoryInfo = data
      this.$refs.onLineCharts.initDataCate(data)
    },
    getList() {
      this.listLoading = true
      getUserGoodList(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    lookMore(type) {
      if (type) {
        this.authorBoolean = !this.authorBoolean
      } else {
        this.categoryBoolean = !this.categoryBoolean
      }
    },
    changeScroll() {
      if (this.$refs.tableDiv.getBoundingClientRect().top < 0) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    },
    onTableHeaderClicked(column) {
      this.$refs.listScreen.changeValue(column)
    },
    selectMe(data, type) {
      var firstObj = {}
      if (type) {
        this.userId = data.name
        firstObj.firstName = 'user'
        data.nameLabel = 'user'
      } else {
        this.prodId = data.name
        firstObj.firstName = 'prod'
        data.nameLabel = 'prod'
      }
      firstObj.infoObj = data
      firstObj.name = data.name
      for (var i = 0; i < this.selectList.length; i += 1) {
        if (data.name === '全部') {
          if (data.nameLabel === 'user') {
            this.listQuery.shopId = undefined
          } else {
            this.listQuery.secondCid = undefined
          }
          if (data.nameLabel === this.selectList[i].firstName) {
            this.selectList.splice(i, 1)
            this.getSelectID()
          }
        } else {
          if (this.selectList[i].firstName === firstObj.firstName) {
            this.selectList[i] = firstObj
            this.getSelectID()
            return
          }
        }
      }
      if (data.name === '全部') {
        return
      }
      this.selectList.push(firstObj)
      this.getSelectID()
    },
    getSelectID() {
      for (var item of this.selectList) {
        if (item.firstName === 'user') {
          this.listQuery.shopId = item.infoObj.key
        } else {
          this.listQuery.secondCid = item.infoObj.key
        }
      }
      this.listQuery.current = 1
      this.getList()
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .btnList {
    float: right;
    display: flex;
    .listBTn {
      margin-bottom: 0;
    }
  }
  .btnList>div:last-child {
    margin-left: 10px;
  }
  .category-container {
    margin-top: 20px;
    margin-bottom: 32px;
    border-bottom: 1px solid #EBEEF5;
    padding-bottom: 28px;
    .page-title {
      margin-bottom: 20px;
    }
    .authorArea{
      display: flex;
      .authorList {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        height: 33px;
        overflow: hidden;
        .authorType {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #606266;
          margin-right: 6px;
          cursor: pointer;
          height: 32px;
          line-height: 32px;
          margin-bottom: 8px;
          padding:0 10px;
          border:1px solid transparent;
        }
      }
      .lookeMore {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0E71EB;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
      }
    }
    .chooseArea, .chooseList {
      display: flex;
      align-items: center;
    }
    .chooseArea {
      .oneInfo {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #909399;
        background: #F4F4F5;
        border-radius: 2px;
        border: 1px solid #E9E9EB;
        padding: 6px 16px;
        margin-right: 16px;
        .delete {
          cursor: pointer;
          margin-left: 10px;
          font-size: 10px;
        }
      }
    }
    .canSeeAll {
      height: 100% !important;
    }
  }
  .prodContainer {
    display: flex;
    align-items: center;
    padding-right: 40px;
    .prodImg {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      min-width: 40px;
      border:1px solid #f9f9f9;
      cursor: pointer;
    }
  }
  .prodPrice {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF0000;
    line-height: 20px;
  }
  .colummTitle {
    padding-left: 50px;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
</style>
