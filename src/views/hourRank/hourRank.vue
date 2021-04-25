<template>
  <div ref="myAppContainer" class="app-container">
    <div class="topArea">
      <div class="page-title">小时直播榜</div>
      <div class="checkArea">
        <div style="display: flex;">
          <el-radio-group v-model="hourRadio" size="medium" @change="changeBtn">
            <el-radio-button label="小时带货直播榜" />
            <el-radio-button label="小时音浪榜" />
          </el-radio-group>
          <div>
            <el-select v-model="selectTime" placeholder="请选择" style="margin-left: 16px;" @change="changeTime">
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="listTime">榜单时间: {{ hourTime }} ~ {{ nextTime }}</div>
      </div>
    </div>
    <div class="listArea">
      <div class="areaRight" @click="dataTips">
        <div class="tips">数据说明</div>
        <img class="markImg" src="../../icons/images/questionMark.png" alt="">
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
        <el-table-column width="320px" fixed="left">
          <template slot="header">
            <div class="colummTitle">主播</div>
          </template>
        </el-table-column>
        <el-table-column label="开播时间" width="124px" />
        <el-table-column label="当前人气值" width="124px" />
        <el-table-column v-if="hourRadio==='小时带货直播榜'" label="销量" width="124px" />
        <el-table-column label="销售额" width="124px" />
        <el-table-column v-if="hourRadio==='小时音浪榜'" label="音浪值" width="124px" />
        <el-table-column v-if="hourRadio==='小时音浪榜'" label="小时音浪增量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '27'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '27' ? 'el-icon-sort-down' : 'stand'" />小时音浪增量</div>
          </template>
        </el-table-column>
        <el-table-column v-if="hourRadio==='小时带货直播榜'" label="小时带货热度" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '25'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '25' ? 'el-icon-sort-down' : 'stand'" />小时带货热度</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.score }}</div>
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
        :data="isFreeMembership() ? list.slice(0, 3) : list"
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
          <template slot-scope="scope">
            <div>{{ scope.row.userCount }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="hourRadio==='小时带货直播榜'" label="销量" width="124px">
          <template slot-scope="scope">
            <div>{{ scope.row.salesExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column label="销售额" width="124px">
          <template slot-scope="scope">
            <div>{{ scope.row.salesMoneyExplain }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="hourRadio==='小时音浪榜'" label="音浪值" width="124px">
          <template slot-scope="scope">
            <div>{{ scope.row.fanTicket }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="hourRadio==='小时音浪榜'" label="小时音浪增量" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '27'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '27' ? 'el-icon-sort-down' : 'stand'" />小时音浪增量</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.score }}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="hourRadio==='小时带货直播榜'" label="小时带货热度" width="124px">
          <template slot="header">
            <div class="headerCss" :style="{color:listQuery.sort === '25'? '#0E71EB': '#232333'}"><i :class="listQuery.sort === '25' ? 'el-icon-sort-down' : 'stand'" />小时带货热度</div>
          </template>
          <template slot-scope="scope">
            <div class="hasPadding">{{ scope.row.score }}</div>
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
        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
      </div>
      <div v-if="!listLoading">
        <div v-if="isFreeMembership()" class="updateBtn" @click="updatePro">升级到专业版查看全部</div>
      </div>
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top :visibility-height="100" />
      </el-tooltip>
      <copyView ref="copy" />
      <major ref="major" :dialog-boolean="true" />
      <dataInfo ref="dataInfo" :data-index="typeNumber" />
      <liveingScene ref="liveingScene" />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import BackToTop from '@/components/BackToTop'
import { getHourList, getRoomCode } from '@/api/live.js'
import { headerTabel } from '@/utils/headerTable.js'
import copyView from '@/components/copy/copyVue.vue'
import major from '@/components/major/major.vue'
import { isFreeMembership } from '@/utils/permission.js'
import dataInfo from '@/components/data-info/data-info.vue'
import liveingScene from '@/components/liveingScene/liveingScene.vue'
export default {
  name: 'HourRank',
  components: { Pagination, BackToTop, copyView, major, dataInfo, liveingScene },
  data() {
    return {
      listQuery: {
        sort: '25',
        current: 1,
        size: 25,
        beginTime: undefined
      },
      listLoading: false,
      list: [],
      columnName: '当前人气值',
      total: 0,
      hourRadio: '小时带货直播榜',
      hourTime: undefined,
      nextTime: undefined,
      imgUrl: undefined,
      imgLoading: true,
      roomVal: undefined,
      isScroll: false,
      myHeaderWidth: 0,
      selectTime: undefined,
      startTime: undefined,
      timeList: [],
      typeNumber: 25
    }
  },
  created() {
    this.initTime(true)
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
    initTime(type) {
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      var day = myDate.getDate()
      var hour = myDate.getHours() + ':00' // 获取当前小时数(0-23)
      if (type) {
        this.timeList.push({
          label: hour,
          value: hour
        })
        for (var i = 1; i < 6; i++) {
          this.timeList.unshift({
            label: new Date(new Date().getTime() - 6 - i * 60 * 60 * 1000).getHours().toString().padStart(2, '0') + ':00',
            value: new Date(new Date().getTime() - 6 - i * 60 * 60 * 1000).getHours().toString().padStart(2, '0') + ':00'
          })
        }
      }
      this.hourTime = hour
      this.endTime = hour
      var datString
      if (type) {
        this.selectTime = hour
        this.nextTime = myDate.getHours() + 1 + ':00'
        datString = year + '/' + month + '/' + day + ' ' + hour
      } else {
        if (parseInt(this.selectTime) > parseInt(this.hourTime)) {
          var date1 = new Date()
          date1.setTime(date1.getTime() - 24 * 60 * 60 * 1000)
          day = date1.getDate().toString().padStart(2, '0')
        }
        datString = year + '/' + month + '/' + day + ' ' + this.selectTime + ':00'
        this.hourTime = this.selectTime
        this.nextTime = this.selectTime.split(':')[0] < 10 ? '0' + parseInt(this.selectTime.split(':')[0]) + 1 + ':00' : parseInt(this.selectTime.split(':')[0]) + 1 + ':00'
        if (parseInt(this.nextTime.split(':')[0]) === 24) {
          this.nextTime = '00:00'
        }
      }
      this.listQuery.beginTime = new Date(datString).getTime() / 1000
      this.getList()
    },
    getList() {
      this.listLoading = true
      var name
      if (this.hourRadio === '小时带货直播榜') {
        name = 'eco'
      } else {
        name = 'wave'
      }
      getHourList(this.listQuery, name).then(res => {
        this.listLoading = false
        this.total = res.data.total
        this.list = res.data.list
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      }).catch(() => {
        this.listLoading = false
      })
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
    onTableHeaderClicked(column) {
      if (column.label === this.columnName) {
        return
      }
      if (column.label === '小时音浪增量') {
        this.listQuery.sort = '27'
      } else if (column.label === '小时带货热度') {
        this.listQuery.sort = '25'
      }
      this.columnName = column.label
      this.search()
    },
    changeBtn(data) {
      if (data === '小时带货直播榜') {
        this.listQuery.sort = '25'
      } else {
        this.listQuery.sort = '27'
      }
      this.search()
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
    search() {
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
    changeTime() {
      this.initTime(false)
    },
    tips(data) {
      const routeData = this.$router.resolve({ path: 'big', query: { roomSn: data.roomSn, hasLive: data.hasLive }})
      window.open(routeData.href, '_blank')
    },
    dataTips() {
      if (this.hourRadio === '小时带货直播榜') {
        this.typeNumber = 25
      } else {
        this.typeNumber = 26
      }
      this.$refs.dataInfo.dialogVisible = true
    },
    handClickLive(data) {
      this.$refs.liveingScene.isShow = true
      this.$refs.liveingScene.initData(data)
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .topArea{
    padding-bottom: 20px;
    border-bottom: 1px solid #EBEEF5;
    margin-bottom: 20px;
    .checkArea{
      margin-top: 17px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .listTime{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #606266;
        line-height: 20px;
      }
    }
  }
  .btnList, .listArea {
    float: right;
  }
  .el-radio-button--medium /deep/ .el-radio-button__inner {
    padding: 12px 15px;
  }
  .my-card-table /deep/ .el-table__body-wrapper{
    display: none !important;
  }
</style>
