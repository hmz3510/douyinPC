<template>
  <div class="app-container">
    <div ref="myAppContainer" class="liveDetail-container">
      <div class="page-title">直播详情</div>
      <div class="live-header">
        <div class="live-left">
          <img v-if="roomInfo.coverUrl!==''" class="leftImg objCss" :src="roomInfo.coverUrl" alt="">
          <img v-else class="leftImg objCss" src="../../icons/images/error_column.png" alt="">
          <div v-if="roomInfo.hasLive" class="tag-live tag-live1">
            <span class="zhibo_SUw">
              <span class="_nXfzR0HQ" style="background-color:#fff;" />
              <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
              <span class="_1uugB4t8" style="background-color:#fff;" />
            </span>
            live
          </div>
          <div class="header-right">
            <div v-if="roomInfo.title!==''" class="headerTitle headerMar">{{ roomInfo.title }}</div>
            <div class="headerSubtitle">开播时间：<span class="openTitle">{{ roomInfo.createTimeExplain }}</span></div>
            <div class="headerSubtitle">直播时长：<span class="openTitle">{{ roomInfo.liveTimeExplain }}</span></div>
          </div>
        </div>
        <div class="middle-left">
          <img v-if="roomInfo.userVO.avatarUrl!==''" class="middleImg objCss" :src="roomInfo.userVO.avatarUrl" alt="">
          <img v-else class="middleImg objCss" src="../../icons/images/error_cycle.png" alt="">
          <div class="header-right1">
            <div class="headerTitle">
              <span class="hoveColor" style="margin-right: 6px;" @click="handClickUser('anchorDetail', roomInfo.userVO)">{{ roomInfo.userVO.nickname }}</span>
              <el-popover
                v-if="roomInfo.userVO.shareQrcodeUrl!==''"
                placement="top-start"
                width="220"
                trigger="hover"
                popper-class="myPopper"
              >
                <div>
                  <div class="qrCodeContainer">
                    <img :src="roomInfo.userVO.shareQrcodeUrl" class="propImg">
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
            <div class="headerSubtitle">{{ roomInfo.userVO.followerCountExplain }}粉丝</div>
          </div>
        </div>
        <div class="btnContent">
          <div class="listBTn" @click="tips(roomInfo)">数据大屏</div>
          <div class="listBTn" :class="roomInfo.fav ? 'listBTnEnjoy': ''" @click="handEnjoy(roomInfo)">{{ roomInfo.fav? '取消收藏': '收藏' }}</div>
        </div>
      </div>
      <div class="live-data">
        <div class="oneLiveData">
          <div class="dataHeader">
            <div class="dataTtitle">{{ roomInfo.totalUser }}</div>
            <div class="dataSubtitle dataSubtitle1">总观看人次</div>
          </div>
          <div class="dataMiddle">
            <div class="dataItem">
              <span class="dataSubtitle">人气峰值：</span>
              <span class="dataNumber">{{ roomInfo.maxUserCountExplain }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">涨粉人数：</span>
              <span class="dataNumber">{{ roomInfo.followCount }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">互动率：</span>
              <span class="dataNumber">{{ roomInfo.userVO.interateRateExplain }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">观众来源：</span>
              <div class="audience">
                <div class="audienceItem">
                  <span class="dataSubtitle">城市位置：</span>
                  <span class="dataNumber">{{ roomInfo.userCountVO.city == '-' ? '-' : (parseInt((roomInfo.userCountVO.city) * 100) + '%') }}</span>
                </div>
                <div class="audienceItem">
                  <span class="dataSubtitle">关注：</span>
                  <span class="dataNumber">{{ roomInfo.userCountVO.my_follow == '-' ? '-' : (parseInt((roomInfo.userCountVO.my_follow) * 100) + '%' ) }}</span>
                </div>
                <div class="audienceItem">
                  <span class="dataSubtitle">直播广场：</span>
                  <span class="dataNumber">{{ roomInfo.userCountVO.other == '-' ? '-' : (parseInt((roomInfo.userCountVO.other) * 100) + '%') }}</span>
                </div>
                <div class="audienceItem">
                  <span class="dataSubtitle">视频推荐：</span>
                  <span class="dataNumber">{{ roomInfo.userCountVO.video_detail == '-' ? '-' : (parseInt((roomInfo.userCountVO.video_detail) * 100) + '%') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="dataFooter">
            <div class="foooterTitle" @click="handGoto('在线观众')">人气趋势</div>
            <div v-if="canJump" class="foooterTitle" @click="gotoCumtome">观众画像</div>
          </div>
        </div>
        <div class="oneLiveData">
          <div class="dataHeader">
            <div class="dataTtitle">{{ roomInfo.fanTicket }}</div>
            <div class="dataSubtitle dataSubtitle1">音浪收入</div>
          </div>
          <div class="dataMiddle">
            <div class="dataItem">
              <span class="dataSubtitle">送礼人数：</span>
              <span class="dataNumber">{{ roomInfo.giftUvCount }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">获赞总数：</span>
              <span class="dataNumber">{{ roomInfo.likeCount }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">小时音浪：</span>
              <span class="dataNumber">{{ roomInfo.hoursSoundWave }}</span>
            </div>
          </div>
          <div class="dataFooter">
            <div class="foooterTitle" @click="handGoto('音浪')">音浪趋势</div>
            <div v-if="giftList.length!==0" class="foooterTitle" @click="gotoCumtome">送礼榜</div>
          </div>
        </div>
        <div class="oneLiveData">
          <div class="dataHeader">
            <div class="dataTtitle">{{ roomInfo.salesMoneyExplain }}</div>
            <div class="dataSubtitle dataSubtitle1">销售额</div>
          </div>
          <div class="dataMiddle">
            <div class="dataItem">
              <span class="dataSubtitle">商品销量：</span>
              <span class="dataNumber">{{ roomInfo.salesExplain }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">商品件数：</span>
              <span class="dataNumber">{{ roomInfo.goodsCount }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">客单价：</span>
              <span class="dataNumber">{{ roomInfo.guestUnitPriceExplain }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">人均贡献：</span>
              <span class="dataNumber">{{ roomInfo.userContributionExplain }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">小时销量：</span>
              <span class="dataNumber">{{ roomInfo.hoursSalesExplain }}</span>
            </div>
            <div class="dataItem">
              <span class="dataSubtitle">小时销售：</span>
              <span class="dataNumber">{{ roomInfo.hoursSalesMoneyExplain }}</span>
            </div>
          </div>
          <div v-if="categoryInfo!==null && categoryInfo.salesList.length!==0 && categoryInfo.salesMoneyList.length!==0" class="dataFooter">
            <div class="foooterTitle" @click="handGoto('销售分析')">销售分析</div>
          </div>
        </div>
      </div>
      <div class="echartsArea">
        <LiveEcharts ref="liveEcharts" />
      </div>
      <div v-if="scrollHeight">
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
            <el-table-column width="336px" fixed="left">
              <template slot="header">
                <div class="colummTitle">商品</div>
              </template>
            </el-table-column>
            <el-table-column label="直播价" width="124px" />
            <el-table-column v-if="userInfomation.roleIdExplain == 'ADMIN'" width="124px">
              <template slot="header">
                <div class="hasLine">关联状态</div>
              </template>
            </el-table-column>
            <el-table-column v-if="userInfomation.roleIdExplain == 'ADMIN'" width="164px">
              <template slot="header">
                <div class="hasLine">标记销量</div>
              </template>
            </el-table-column>
            <el-table-column label="上架时间" width="124px">
              <template slot="header">
                <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />上架时间</div>
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
        <div v-if="list.length !==0" class="liveRecordArea">
          <listScreen ref="listScreen" :type-number="13" @changeData="changeData" />
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
              <el-table-column width="336px" fixed="left">
                <template slot="header">
                  <div class="colummTitle">商品</div>
                </template>
                <template slot-scope="scope">
                  <div class="prodContainer">
                    <div @click="handGotoGood(scope.row)">
                      <el-image class="prodImg borderImg" fit="cover" :src="scope.row.coverUrl" lazy>
                        <div slot="error">
                          <img class="columnImg" fit="cover" src="../../icons/images/error_prod.png">
                        </div>
                      </el-image>
                    </div>
                    <div class="title hoveColor" @click="handGotoGood(scope.row)">{{ scope.row.title }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="直播价" width="124px">
                <template slot-scope="scope">
                  <div>{{ scope.row.priceExplain }}</div>
                </template>
              </el-table-column>
              <el-table-column v-if="userInfomation.roleIdExplain == 'ADMIN'" width="124px">
                <template slot="header">
                  <div class="hasLine">关联状态</div>
                </template>
                <template slot-scope="scope">
                  <div>{{ scope.row.statusExplain }}</div>
                  <div v-if="scope.row.status === 2">{{ scope.row.hideTimeExplain }}</div>
                </template>
              </el-table-column>
              <el-table-column v-if="userInfomation.roleIdExplain == 'ADMIN'" width="164px">
                <template slot="header">
                  <div class="hasLine">标记销量</div>
                </template>
                <template slot-scope="scope">
                  <div class="restSize">{{ scope.row.onSalesExplain }}</div>
                  <div class="restSize">{{ scope.row.offSalesExplain }}</div>
                </template>
              </el-table-column>
              <el-table-column label="上架时间" width="124px">
                <template slot="header">
                  <div class="headerCss" :style="{color:listQuery.sort === '0'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '0' ? 'el-icon-sort-down' : 'stand'" />上架时间</div>
                </template>
                <template slot-scope="scope">
                  <div class="hasPadding">{{ scope.row.showTimeExplain }}</div>
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
                    <div class="listBTn" @click="handGotoGood(scope.row)">商品详情</div>
                    <div class="listBTn" :class="scope.row.fav ? 'listBTnEnjoy': ''" @click="handEnjoyProd(scope.row)">{{ scope.row.fav? '取消关注': '关注' }}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div ref="pageNation">
              <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
              <el-tooltip placement="top" content="返回顶部">
                <back-to-top :visibility-height="100" />
              </el-tooltip>
            </div>
          </div>
        </div>
        <audienArea ref="audienArea" :gift-list="giftList" />
      </div>
      <copyView ref="copy" />
      <major ref="major" :dialog-boolean="true" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import listScreen from '@/components/listScreen/listScreen.vue'
import LiveEcharts from '@/components/liveDetailEcharts/liveDetailEcharts.vue'
import audienArea from '@/components/audienceEcharts/audienContainer.vue'
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import copyView from '@/components/copy/copy1.vue'
import { getDetail, getLiveDetailList, getRoomCharts, getRoomGift, getRoomCategory } from '@/api/live.js'
import { getUserFans } from '@/api/anchor.js'
import { headerTabel } from '@/utils/headerTable.js'
import { enjoyOrNotEnjoyLive, enjoyOrNotEnjoyPro } from '@/api/fav.js'
import major from '@/components/major/major.vue'
import { isFreeMembership } from '@/utils/permission.js'
export default {
  name: 'LiveDetail',
  components: { LiveEcharts, listScreen, Pagination, BackToTop, copyView, major, audienArea },
  data() {
    return {
      listQuery: {
        sort: '1',
        current: 1,
        size: 25,
        roomSn: undefined,
        secondCid: undefined,
        shopId: undefined
      },
      listLoading: false,
      list: [],
      dataIndex: 0,
      total: 0,
      btnIndex: 0,
      authorBoolean: false,
      roomInfo: {
        userVO: {},
        userCountVO: {}
      },
      canJump: true,
      giftList: [],
      isScroll: false,
      myHeaderWidth: 0,
      noReduce: true,
      prodId: '全部',
      userId: '全部',
      selectList: [],
      categoryInfo: null,
      scrollHeight: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfomation'
    ])
  },
  created() {
    this.listQuery.roomSn = this.$route.query.roomSn
    this.getDetail()
    // this.getRoomGift()
    this.getRoomCategory()
  },
  mounted() {
    var that = this
    headerTabel(this.$refs.myAppContainer, that)
    this.getRoomCharts()
  },
  destroyed() {
    window.removeEventListener('scroll', this.changeScroll)
  },
  methods: {
    getDetail() {
      getDetail(this.listQuery.roomSn).then(res => {
        document.title = res.data.userVO.nickname + ' 直播详情' + ' - 热抖数据'
        this.roomInfo = res.data
      })
    },
    getList() {
      this.listLoading = true
      getLiveDetailList(this.listQuery).then(res => {
        this.scrollHeight = true
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
        if (this.list.length === 0) {
          window.removeEventListener('scroll', this.tableScroll)
        } else {
          window.addEventListener('scroll', this.tableScroll)
        }
        this.getUseFans(this.roomInfo.userVO.userSn)
      }).catch(() => {
        this.listLoading = false
      })
    },
    getRoomCharts() {
      getRoomCharts(this.listQuery.roomSn).then(res => {
        this.getList()
        this.$refs.liveEcharts.initData(res.data)
      })
    },
    getRoomGift() {
      getRoomGift(this.listQuery.roomSn).then(res => {
        this.giftList = res.data
      })
    },
    getUseFans(data) {
      getUserFans(data).then(res => {
        if (res.data === null || res.data.length === 0) {
          res.data = []
          this.canJump = false
        }
        this.$nextTick(() => {
          this.$refs.audienArea.initData(res.data)
        })
      })
    },
    getRoomCategory() {
      getRoomCategory(this.listQuery.roomSn).then(res => {
        this.categoryInfo = res.data
        sessionStorage.setItem('categoryInfo', JSON.stringify(res.data))
        this.$refs.liveEcharts.initSaleData(this.categoryInfo)
      })
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
    handClick(data) {
      if (this.btnIndex !== data) {
        this.btnIndex = data
      }
    },
    lookMore(type) {
      this.authorBoolean = !this.authorBoolean
    },
    onTableHeaderClicked(column) {
      this.$refs.listScreen.changeValue(column)
    },
    changeData(data) {
      this.listQuery.sort = data
      this.listQuery.current = 1
      this.getList()
    },
    handGotoGood(data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true, 3)
        return
      }
      const routeData = this.$router.resolve({ path: '/goodsDetail', query: { goodsId: data.goodsId }})
      window.open(routeData.href, '_blank')
    },
    gotoCumtome() {
      window.scrollTo({
        'top': this.$refs.audienArea.$el.getBoundingClientRect().bottom,
        'behavior': 'smooth'
      })
    },
    handClickUser(name, data) {
      const routeData = this.$router.resolve({ path: name, query: { userSn: data.userSn }})
      window.open(routeData.href, '_blank')
    },
    handGoto(data) {
      var childArr = this.$refs.liveEcharts.$children
      for (var item of childArr) {
        if (item.chart_title === data) {
          var top = item.$el.getBoundingClientRect().top - 100
        }
      }
      window.scrollTo({
        'top': top,
        'behavior': 'smooth'
      })
    },
    tableScroll() {
      if (this.$refs.tableDiv.getBoundingClientRect().top < 0) {
        if (this.$refs.pageNation.getBoundingClientRect().top < 180) {
          this.isScroll = false
        } else {
          this.isScroll = true
        }
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
    isFreeMembership() {
      return isFreeMembership()
    },
    tips(data) {
      const routeData = this.$router.resolve({ path: 'big', query: { roomSn: data.roomSn, hasLive: data.hasLive }})
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style scoped lang="scss">
  .liveDetail-container {
    max-width: 1120px;
    margin: auto;
    .live-header {
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      padding: 18px 30px 18px 16px;
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      .live-left {
        position: relative;
      }
      .live-left .tag-live1 {
        width: 68px;
        bottom: 0;
        left: 1px;
        transform: translateX(0);
      }
      .live-left, .middle-left {
        display: flex;
      }
      .live-left {
        .leftImg {
          width: 70px;
          height: 84px;
          margin-right: 13px;
          min-width: 70px;
          border:1px solid #f9f9f9;
        }
      }
      .middle-left {
        height: 100%;
        align-items: center;
        .middleImg {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 13px;
          min-width: 60px;
          border:1px solid #f9f9f9
        }
      }
      .headerTitle {
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #232333;
        line-height: 22px;
        margin-bottom: 3px;
        display: flex;
        align-items: center;
      }
      .headerSubtitle {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #606266;
        line-height: 20px;
      }
      .openTitle {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #232333;
        line-height: 20px;
        margin-left: 6px;
      }
    }
    .live-data {
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
      .oneLiveData {
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #EBEEF5;
        max-width: 360px;
        width: 360px;
        padding: 20px 0 25px 0px;
        margin-bottom: 20px;
        min-height: 317px;
        .dataHeader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 23px;
        }
        .dataMiddle, .dataFooter{
          margin: 0px 0px 0 60px;
          .dataItem {
            margin-bottom: 10px;
            .audience {
              display: flex;
              margin: 9px 35px 0 10px;
              flex-flow: wrap;
              justify-content: space-between;
              .audienceItem {
                margin-bottom: 4px;
              }
            }
          }
        }
        .dataFooter {
          display: flex;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #0E71EB;
          padding-top: 6px;
          .foooterTitle {
            cursor: pointer;
            margin-right: 20px;
          }
        }
        .dataTtitle {
          height: 28px;
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #232333;
          line-height: 28px;
        }
        .dataSubtitle {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #606266;
          line-height: 20px;
          width: 70px;
          display: inline-block;
        }
        .dataSubtitle1 {
          width: initial;
        }
        .dataNumber {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #232333;
          line-height: 20px;
          margin-left: 6px;
        }
      }
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
        .shopList {
          height: 100%;
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
  }
  .listBTn {
    display: block;
  }
  @media screen and (max-width: 1416px) {
    .live-data {
      justify-content: inherit !important;
    }
    .oneLiveData {
      margin-right: 20px;
    }
  }
  .headerMar {
    margin-bottom: 8px !important;
  }
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
  .prodContainer {
    display: flex;
    align-items: center;
    padding-right: 40px;
    .prodImg {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      min-width: 40px;
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
