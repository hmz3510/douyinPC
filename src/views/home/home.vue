<template>
  <div ref="myAppContainer" class="app-container">
    <div class="app-area">
      <div class="homeArea">
        <img class="adArea" src="https://hddt.oss-cn-shanghai.aliyuncs.com/mk/pcbanner0308.png">
        <div class="btnArea">
          <div v-if="homeTiktokList!==null && homeTiktokList.list.length==0" class="oneBtn" @click="addClick(true)">
            <span class="add"> + </span>
            <span class="addText">管理我的抖音号</span>
          </div>
          <div v-if="homeMointerList!==null && homeMointerList.list.length==0" class="oneBtn" @click="addClick(false)">
            <span class="add"> + </span>
            <span class="addText">直播监控</span>
          </div>
        </div>
      </div>
      <div class="listContainer">
        <div class="list-top-arer">
          <div v-if="homeTiktokList!==null&&homeTiktokList.list.length!==0" class="realArea anthorArea f1">
            <div class="title">我的抖音号（{{ homeTiktokList.total }}/30）</div>
            <div class="listAll">
              <div v-for="item of homeTiktokList.list" :key="item.id" class="list-container">
                <div class="secodeColumnLeft" @click="handClick('anchorDetail', item)">
                  <el-image class="anthorImg borderImg" fit="cover" :src="item.avatarUrl" lazy>
                    <div slot="error">
                      <img class="anthorImg borderImg" fit="cover" src="../../icons/images/error_cycle.png">
                    </div>
                  </el-image>
                  <div v-if="item.hasLive" class="tag-live tag-live2">
                    <span class="zhibo_SUw">
                      <span class="_nXfzR0HQ" style="background-color:#fff;" />
                      <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                      <span class="_1uugB4t8" style="background-color:#fff;" />
                    </span>
                    live
                  </div>
                </div>
                <div class="list-right">
                  <div class="subTitle hoveColor" @click="handClick('anchorDetail', item)">{{ item.nickname }}</div>
                  <div class="topAreaF1">
                    <div class="fansArea">
                      <div class="subTitlePublic myTake">{{ item.followerCountExplain }}粉丝</div>
                      <div v-if="item.incFollowerCount.length<2" class="addFans">{{ item.incFollowerCount.indexOf('-') == -1 ? '新增' + item.incFollowerCount : item.incFollowerCount }}</div>
                      <div v-else :class="item.incFollowerCount.indexOf('-') == -1 ?'addFans': 'deldectFans'">{{ item.incFollowerCount.indexOf('-') == -1 ? '新增' + item. incFollowerCount : '减少' + item.incFollowerCount.substring(item.incFollowerCount.indexOf('-') + 1) }}</div>
                    </div>
                    <div class="fansArea">
                      <div class="subTitlePublic myTake">{{ item.totalFavorited }}赞</div>
                      <div v-if="item.incTotalFavorited.length<2" class="addFans">{{ item.incTotalFavorited.indexOf('-') == -1 ? '新增' + item.incTotalFavorited : item.incTotalFavorited }}</div>
                      <div v-else :class="item.incTotalFavorited.indexOf('-') == -1 ?'addFans': 'deldectFans'">{{ item.incTotalFavorited.indexOf('-') == -1 ? '新增' + item. incTotalFavorited : '减少' + item.incTotalFavorited.substring(item.incTotalFavorited.indexOf('-') + 1) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-btn">
              <div class="lookAll" @click="gotoDetail(1)">查看全部 <i class="el-icon-right" /></div>
              <div class="lookAll" @click="addClick(true)"><i class="el-icon-plus" />  新增抖音号</div>
            </div>
          </div>
          <div v-if="homeMointerList!==null && homeMointerList.list.length!==0" class="realArea anthorArea f1">
            <div class="title">直播监控（{{ homeMointerList.total }}/15）</div>
            <div class="listAll">
              <div v-for="item of homeMointerList.list" :key="item.id" class="list-container">
                <div class="secodeColumnLeft" @click="handClick('anchorDetail', item)">
                  <el-image class="anthorImg borderImg" fit="cover" :src="item.avatarUrl" lazy>
                    <div slot="error">
                      <img class="anthorImg borderImg" fit="cover" src="../../icons/images/error_cycle.png">
                    </div>
                  </el-image>
                  <div v-if="item.hasLive" class="tag-live tag-live2">
                    <span class="zhibo_SUw">
                      <span class="_nXfzR0HQ" style="background-color:#fff;" />
                      <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                      <span class="_1uugB4t8" style="background-color:#fff;" />
                    </span>
                    live
                  </div>
                </div>
                <div class="list-right">
                  <div class="subTitle hoveColor" @click="handClick('anchorDetail', item)">{{ item.nickname }}</div>
                  <div class="subTitlePublic marGin">{{ item.followerCountExplain }}粉丝</div>
                  <div class="subTitlePublic">最近直播:<span class="name name1 hoveColor" @click="handClick('liveDetail', item)">{{ item.latestLiveTimeExplain }}</span></div>
                </div>
              </div>
            </div>
            <div class="footer-btn">
              <div class="btn-left">
                <div class="lookAll" @click="gotoDetail(2)">查看全部 <i class="el-icon-right" /></div>
                <div class="lookAll history" @click="gotoDetail(3)">监控历史 <i class="el-icon-right" /></div>
              </div>
              <div class="lookAll" @click="addClick(false)"><i class="el-icon-plus" />新增监控</div>
            </div>
            <div class="noteSeet subTitlePublic" @click="lookNotice">剩余通知次数 {{ noticeNumber }}</div>
          </div>
          <div v-if="enjoyUserList!==null && enjoyUserList.list.length!==0" class="realArea anthorArea f1">
            <div class="title">我关注的主播（ {{ enjoyUserList.total }}/50）</div>
            <div class="listAll">
              <div v-for="item of enjoyUserList.list" :key="item.id" class="list-container">
                <div class="secodeColumnLeft" @click="handClick('anchorDetail', item)">
                  <el-image class="anthorImg borderImg" fit="cover" :src="item.avatarUrl" lazy>
                    <div slot="error">
                      <img class="anthorImg borderImg" fit="cover" src="../../icons/images/error_cycle.png">
                    </div>
                  </el-image>
                  <div v-if="item.hasLive" class="tag-live tag-live2">
                    <span class="zhibo_SUw">
                      <span class="_nXfzR0HQ" style="background-color:#fff;" />
                      <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                      <span class="_1uugB4t8" style="background-color:#fff;" />
                    </span>
                    live
                  </div>
                </div>
                <div class="list-right">
                  <div class="subTitle hoveColor" @click="handClick('anchorDetail', item)">{{ item.nickname }}</div>
                  <div class="subTitlePublic marGin">{{ item.followerCountExplain }}粉丝</div>
                  <div class="subTitlePublic">最近直播:<span class="name name1 hoveColor" @click="handClick('liveDetail', item)">{{ item.latestLiveTimeExplain }}</span></div>
                </div>
              </div>
            </div>
            <div class="lookAll" @click="gotoEnjoy('enjoyAnthor')">查看全部 <i class="el-icon-right" /></div>
          </div>
          <div v-if="enjoyProdList!==null&&enjoyProdList.list.length!==0" class="realArea hotProdArea f2">
            <div class="title">我关注的商品（{{ enjoyProdList.total }}/50）</div>
            <div class="listAll">
              <div v-for="item of enjoyProdList.list" :key="item.id" class="list-container">
                <el-image class="hotImg borderImg" fit="cover" :src="item.coverUrl" lazy @click="handClick('goodsDetail', item)">
                  <div slot="error">
                    <img class="hotImg borderImg" fit="cover" src="../../icons/images/error_column.png">
                  </div>
                </el-image>
                <div class="list-right">
                  <div class="subTitle hoveColor" @click="handClick('goodsDetail', item)">{{ item.title }}</div>
                  <div class="nameTitle prodCss">
                    <div class="subTitlePublic">关联主播：{{ item.linkUserCount }}&nbsp;&nbsp;&nbsp;关联直播：{{ item.linkRoomCount }}</div>
                    <div class="subTitlePublic prodMgi">今日销量</div>
                  </div>
                  <div class="right-footer">
                    <div class="subTitlePublic">直播价：<span class="price">{{ item.priceExplain }}</span></div>
                    <div class="accountNumber prodMgin">{{ item.todaySales }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lookAll" @click="gotoEnjoy('enjoyProd')">查看全部 <i class="el-icon-right" /></div>
          </div>
          <div v-if="enjoyShopList!==null&&enjoyShopList.list.length!==0" class="realArea hotProdArea f2">
            <div class="title">我关注的小店（{{ enjoyShopList.total }}/50）</div>
            <div class="listAll">
              <div v-for="item of enjoyShopList.list" :key="item.id" class="list-container">
                <el-image class="hotImg borderImg" fit="cover" :src="item.shopLogo" lazy @click="handClick('smallShopDetail', item)">
                  <div slot="error">
                    <img class="hotImg borderImg" fit="cover" src="../../icons/images/error_column.png">
                  </div>
                </el-image>
                <div class="list-right">
                  <div class="subTitle hoveColor" @click="handClick('smallShopDetail', item)">{{ item.shopName }}</div>
                  <div class="nameTitle prodCss">
                    <div class="subTitlePublic">关联主播：{{ item.linkUserCount }}  关联直播：{{ item.linkRoomCount }}</div>
                    <div class="subTitlePublic prodMgi">今日销量</div>
                  </div>
                  <div class="right-footer topAcconut">
                    <div class="accountNumber prodMgin">{{ item.todaySales }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lookAll" @click="gotoEnjoy('enjoyShop')">查看全部 <i class="el-icon-right" /></div>
          </div>
          <div v-if="enjoyLiveList!==null&&enjoyLiveList.list.length!==0" class="realArea f2">
            <div class="title">我收藏的直播（{{ enjoyLiveList.total }}/50）</div>
            <div class="listAll">
              <div v-for="item of enjoyLiveList.list" :key="item.id" class="list-container">
                <el-image class="img borderImg" fit="cover" :src="item.coverUrl" lazy @click="handClick('liveDetail', item)">
                  <div slot="error">
                    <img class="img borderImg" fit="cover" src="../../icons/images/error_column.png">
                  </div>
                </el-image>
                <div class="list-right">
                  <div class="openTime">开播时间：{{ item.createTimeExplain }}</div>
                  <div class="nameTitle">
                    <div class="subTitle hoveColor" style="width: 70%;" @click="handClick('liveDetail', item)">{{ item.title }}</div>
                    <div class="subTitlePublic subTitlePublic1"> {{ item.hasGoodsLive ? '总销售额' : '音浪收入' }}</div>
                  </div>
                  <div class="right-footer">
                    <div class="right-footer-area ciclyMagin" style="width: 55%;">
                      <img v-if="item.userVO.avatarUrl!==''" class="cicly borderImg" :src="item.userVO.avatarUrl">
                      <img v-else class="cicly borderImg" src="../../icons/images/error_small_cycle.png">
                      <div class="name hoveColor" @click="handClick('anchorDetail', item)">{{ item.userVO.nickname }}</div>
                    </div>
                    <div class="accountNumber">{{ item.hasGoodsLive ? item.salesMoneyExplain : item.fanTicket }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lookAll" @click="gotoEnjoy('enjoyLive')">查看全部 <i class="el-icon-right" /></div>
          </div>
        </div>
        <div class="listArea">
          <div v-if="realList.length!==0" class="realArea f3">
            <div class="title">实时直播榜</div>
            <div class="listAll">
              <div v-for="item of realList" :key="item.id" class="list-container">
                <div class="secodeColumnLeft">
                  <div @click="handClick('liveDetail', item)">
                    <el-image class="img borderImg" fit="cover" :src="item.coverUrl" lazy>
                      <div slot="error">
                        <img class="img borderImg" fit="cover" src="../../icons/images/error_column.png">
                      </div>
                    </el-image>
                  </div>
                  <div v-if="item.hasLive" class="tag-live tag-live1">
                    <span class="zhibo_SUw">
                      <span class="_nXfzR0HQ" style="background-color:#fff;" />
                      <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                      <span class="_1uugB4t8" style="background-color:#fff;" />
                    </span>
                    live
                  </div>
                </div>
                <div class="list-right">
                  <div class="right-title">
                    <div v-if="item.chaName!==''" class="labelTitle labelTitle1">{{ item.chaName }}</div>
                    <div class="openTime">已经开播<strong>&nbsp;{{ item.liveTimeExplain }}</strong></div>
                  </div>
                  <div class="nameTitle realMggin">
                    <div class="subTitle goodSubtitle hoveColor" @click="handClick('liveDetail', item)">{{ item.title }}</div>
                    <div class="subTitlePublic subTitlePublic1">当前观众</div>
                  </div>
                  <div class="right-footer">
                    <div class="right-footer-area ciclyMagin">
                      <el-image class="cicly borderImg" fit="cover" :src="item.userVO.avatarUrl" lazy>
                        <div slot="error">
                          <img class="cicly borderImg" fit="cover" src="../../icons/images/error_small_cycle.png">
                        </div>
                      </el-image>
                      <div class="name hoveColor" @click="handClick('anchorDetail', item)">{{ item.userVO.nickname }}</div>
                    </div>
                    <div class="accountNumber">{{ item.userCount }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lookAll" @click="lookAll('realRank')">查看全部 <i class="el-icon-right" /></div>
          </div>
          <div v-if="list.length!==0" class="realArea anthorArea f3">
            <div class="title">带货主播榜</div>
            <div class="listAll">
              <div v-for="item of list" :key="item.id" class="list-container" @click="handClick('anchorDetail', item)">
                <div class="secodeColumnLeft">
                  <el-image class="anthorImg borderImg" fit="cover" :src="item.avatarUrl" lazy>
                    <div slot="error">
                      <img class="anthorImg borderImg" fit="cover" src="../../icons/images/error_cycle.png">
                    </div>
                  </el-image>
                  <div v-if="item.hasLive" class="tag-live tag-live2">
                    <span class="zhibo_SUw">
                      <span class="_nXfzR0HQ" style="background-color:#fff;" />
                      <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                      <span class="_1uugB4t8" style="background-color:#fff;" />
                    </span>
                    live
                  </div>
                </div>
                <div class="list-right">
                  <div class="openTime">直播时长<strong>&nbsp;{{ item.liveTimeExplain }}</strong></div>
                  <div class="nameTitle">
                    <div class="subTitle goodSubtitle hoveColor" @click="handClick('anchorDetail', item)">{{ item.nickname }}</div>
                    <div class="subTitlePublic subTitlePublic1">实时销售额</div>
                  </div>
                  <div class="right-footer">
                    <div style="width: 60%;">
                      <div v-if="item.userCategoryIdsExplain.length!==0" class="right-footer-area">
                        <div v-for="(cateItem, index) of item.userCategoryIdsExplain.slice(0, 3)" :key="index" class="labelTitle" style="white-space: nowrap;">{{ cateItem.substring(0, 3) }}</div>
                      </div>
                    </div>
                    <div class="accountNumber">{{ item.salesMoneyExplain }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lookAll" @click="lookAll('goodsAnchor')">查看全部 <i class="el-icon-right" /></div>
          </div>
          <div v-if="goodList.length!==0" class="realArea hotProdArea f3">
            <div class="title">热门商品销量榜</div>
            <div class="listAll">
              <div v-for="item of goodList" :key="item.id" class="list-container">
                <div @click="handClick('goodsDetail', item)">
                  <el-image class="hotImg borderImg" fit="cover" :src="item.coverUrl" lazy>
                    <div slot="error">
                      <img class="hotImg borderImg" fit="cover" src="../../icons/images/error_cycle.png">
                    </div>
                  </el-image>
                </div>
                <div class="list-right list-good">
                  <div class="subTitle hoveColor" @click="handClick('goodsDetail', item)">{{ item.title }}</div>
                  <div class="nameTitle prodCss">
                    <div class="subTitlePublic">关联主播：{{ item.linkUserCount }}&nbsp;&nbsp;&nbsp;关联直播：{{ item.linkRoomCount }}</div>
                    <div class="subTitlePublic prodMgi">实时销量</div>
                  </div>
                  <div class="right-footer">
                    <div class="subTitlePublic">直播价：<span class="price">{{ item.priceExplain }}</span></div>
                    <div class="accountNumber prodMgin">{{ item.todaySales }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lookAll" @click="lookAll('goodsRank')">查看全部 <i class="el-icon-right" /></div>
          </div>
        </div>
      </div>
    </div>
    <addTick ref="addTick" />
    <addLive ref="addLive" />
    <copyView ref="copy" />
    <noticeSet ref="noticeSet" :notice-number="noticeNumber" />
    <major ref="major" :dialog-boolean="true" />
  </div>
</template>

<script>
import addTick from '@/components/addNew/addTick.vue'
import addLive from '@/components/addNew/addLive.vue'
import { getRealList } from '@/api/live.js'
import { getUserRankList } from '@/api/anchor.js'
import { getList } from '@/api/good.js'
import copyView from '@/components/copy/copyVue.vue'
import major from '@/components/major/major.vue'
import noticeSet from '@/components/noticeSet/noticeSet.vue'
import { isFreeMembership } from '@/utils/permission.js'
import { enjoyProdList, enjoyShopList, enjoyLiveList, enjoyUserList } from '@/api/fav.js'
import { homeGetList, getSubscribeNum, getCount } from '@/api/monitor.js'
import { homeGetTiktokList, getSubscribeNumTikoet } from '@/api/tiktok.js'
export default {
  name: 'Home',
  components: { addTick, addLive, copyView, major, noticeSet },
  data() {
    return {
      hasBtn: false,
      listQuery: {
        hasGoodsLive: 1,
        current: 1,
        size: 5,
        sort: '21',
        type: 0,
        dateTimeFrom: this.timeInit() + ' 00:00:00',
        dateTimeTo: this.timeInit() + ' 23:59:59'
      },
      realListQuery: {
        current: 1,
        size: 5,
        sort: '29'
      },
      goodListQuery: {
        current: 1,
        size: 5,
        sort: '0'
      },
      list: [],
      realList: [],
      goodList: [],
      enjoyQuery: {
        current: 1,
        size: 2
      },
      enjoyProdList: null,
      enjoyShopList: null,
      enjoyLiveList: null,
      enjoyUserList: null,
      noticeNumber: 0,
      liveUser: 0,
      homeMointerList: null,
      homeTiktokList: null,
      tioketNumber: 0
    }
  },
  created() {
    this.getEnjoyProdList()
    this.getEnjoyShopList()
    this.getEnjoyLiveList()
    this.getEnjoyUserList()
    this.homeGetList()
    this.getHomeTiktotList()
    this.getSubscribeNum()
    this.getCount()
  },
  mounted() {
    this.getList()
    this.getRealList()
    this.getGoodList()
    this.getSubscribeNumTikoet()
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'userNeedKnow') {
      document.documentElement.style.fontSize = 'initial'
    }
    next()
  },
  methods: {
    timeInit() {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth()
      var date = now.getDate()
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      return year + '-' + month + '-' + date
    },
    getEnjoyProdList() {
      enjoyProdList(this.enjoyQuery).then(res => {
        this.enjoyProdList = res.data || []
      })
    },
    getEnjoyShopList() {
      enjoyShopList(this.enjoyQuery).then(res => {
        this.enjoyShopList = res.data || []
      })
    },
    getEnjoyLiveList() {
      enjoyLiveList(this.enjoyQuery).then(res => {
        this.enjoyLiveList = res.data || []
      })
    },
    getEnjoyUserList() {
      enjoyUserList(this.enjoyQuery).then(res => {
        this.enjoyUserList = res.data || []
      })
    },
    getList() {
      this.listLoading = true
      getUserRankList(this.listQuery).then(res => {
        this.list = res.data.list || []
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      })
    },
    getRealList() {
      getRealList(this.realListQuery).then(res => {
        this.realList = res.data.list || []
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      })
    },
    homeGetList() {
      homeGetList(this.enjoyQuery).then(res => {
        this.homeMointerList = res.data || []
      })
    },
    getGoodList() {
      this.listLoading = true
      getList(this.goodListQuery).then(res => {
        this.goodList = res.data.list || []
        this.$refs.copy.resetCss(this.$refs.myAppContainer)
      })
    },
    getCount() {
      getCount(1).then(res => {
        this.noticeNumber = res.data
      })
    },
    getSubscribeNum() {
      getSubscribeNum().then(res => {
        this.liveUser = res.data
      })
    },
    getSubscribeNumTikoet() {
      getSubscribeNumTikoet().then(res => {
        this.tioketNumber = res.data
      })
    },
    getHomeTiktotList() {
      homeGetTiktokList(this.enjoyQuery).then(res => {
        this.homeTiktokList = res.data || []
      })
    },
    gotoDetail(type) {
      var name
      if (type === 1) {
        name = 'tiktok'
      } else if (type === 2) {
        name = 'myLive'
      } else if (type === 3) {
        name = 'monitorHistory'
      }
      this.$router.push({ path: name })
    },
    lookAll(name) {
      this.$router.push({ path: name })
    },
    addClick(type) {
      if (type) {
        this.$refs.addTick.initData(this.tioketNumber)
      } else {
        this.$refs.addLive.initData(this.homeMointerList.total, this.noticeNumber)
      }
    },
    handClick(name, data) {
      var query, type
      if (name === 'liveDetail') {
        query = {
          roomSn: data.roomSn || data.latestRoomSn
        }
        type = 1
      } else if (name === 'anchorDetail') {
        query = {
          userSn: data.userSn || data.userVO.userSn
        }
        type = 2
      } else if (name === 'goodsDetail') {
        query = {
          goodsId: data.goodsId
        }
        type = 3
      } else {
        query = {
          shopId: data.shopId
        }
        type = 4
      }
      if (isFreeMembership()) {
        this.$refs.major.initData(true, type)
        return
      }
      const routeData = this.$router.resolve({ path: name, query: query })
      window.open(routeData.href, '_blank')
    },
    isFreeMembership() {
      return isFreeMembership()
    },
    gotoEnjoy(name) {
      this.$router.push({ path: name })
    },
    lookNotice() {
      this.$refs.noticeSet.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-live1 {
    width: 48px;
    left: 1px;
    transform: translateX(0);
    bottom: 0;
  }
  .tag-live2 {
    width: 50px;
    left: 10%;
    transform: translateX(-5%);
    bottom: 3px;
  }
  .app-area{
    max-width: 1120px;
    min-height: 300px;
    margin: auto;
  }
  .homeArea {
    .adArea {
      background: #D8D8D8;
      height: 140px;
      margin-bottom: 25px;
    }
    .btnArea{
      display: flex;
      margin-bottom: 40px;
      .oneBtn {
        width: 200px;
        height: 50px;
        border-radius: 25px;
        border: 1px solid #0E71EB;
        line-height: 50px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0E71EB;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-right: 20px;
        justify-content: center;
        .add {
          font-size: 28px;
          font-weight: 100;
          margin-right: 9px;
          display: flex;
          height: 18px;
          display: flex;
          align-items: center;
          margin-top: -5px;
        }
      }
    }
  }
  .list-top-arer {
    margin-top: 40px;
  }
  .listArea, .list-top-arer {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    .realArea {
      .list-container {
        display: flex;
        padding-bottom: 14px;
        border-bottom: 1px solid #EBEEF5;
        padding-top: 12px;
        // margin-bottom: 12px;
        // align-items: center;
        .img {
          height: 60px;
          width: 50px;
          margin-right: 29px;
          min-width: 50px;
          cursor: pointer;
        }
        .list-right{
          flex: 1;
          height: 61px;
          width: 70%;
          .right-title, .right-footer-area {
            display: flex;
            align-items: center;
          }
          .right-title{
            .labelTitle1 {
              margin-right: 5px;
            }
          }
          .subTitlePublic1 {
            margin-top: 7px;
          }
          .nameTitle, .right-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .right-footer-area {
            width: 70%;
            .cicly {
              width: 22px;
              height: 22px;
              border-radius: 50%;
              min-width: 22px;
            }
          }
        }
        .list-good {
          width: 70%;
        }
      }
    }
    .anthorArea {
      .anthorImg {
        width: 60px;
        height: 60px;
        margin-right: 19px;
        border-radius: 50%;
        cursor: pointer;
        min-width: 60px;
      }
    }
    .hotProdArea {
      .hotImg {
        width: 60px;
        height: 60px;
        margin-right: 20px;
        min-width: 60px;
        cursor: pointer;
      }
      .price {
        color: #EA2821;
      }
    }
    .name {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0E71EB;
      line-height: 20px;
      margin-left: 7px;
      width: 85%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name1 {
      font-size: 12px;
    }
    .title {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #232333;
      line-height: 28px;
      margin-bottom: 14px;
    }
    .openTime {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #606266;
      line-height: 17px;
    }
    .subTitle {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #606266;
      line-height: 22px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .goodSubtitle {
      width: 70%;
    }
    .subTitlePublic{
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #606266;
      line-height: 17px;
    }
    .myTake {
      font-size: 14px;
    }
    .labelTitle {
      background: #E5E5E5;
      border-radius: 2px;
      font-size: 10px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #606266;
      padding: 2px 7px;
      margin-right: 8px;
    }
    .accountNumber {
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #606266;
      line-height: 22px;
    }
    .lookAll {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0E71EB;
      line-height: 20px;
      cursor: pointer;
      margin-top: 14px;
    }
  }
  .listArea>.realArea, .list-top-arer> .realArea  {
    max-width: 340px;
    width: 340px;
  }
  .list-top-arer> .realArea  {
    min-height: 260px;
  }
  .listArea>.realArea {
    margin-bottom: 42px;
  }
  .list-top-arer {
    justify-content: space-between;
    margin-bottom: 2px;
    .topAcconut {
      float: right;
    }
  }
  .list-top-arer::after {
    content: "";
    width: 340px;
  }
  .list-top-arer>div {
    margin-bottom: 20px;
  }
  .topAreaF1{
    display: flex;
    margin-top: 2px;
    padding-left: 4px;
    .fansArea {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-right: 40px;
      .addFans {
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #39AA3E;
        line-height: 17px;
      }
      .deldectFans {
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #E93838;
        line-height: 17px;
      }
    }
  }
  .footer-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-left{
       display: flex;
       .history {
         margin-left: 16px;
       }
    }
  }
  .noteSeet {
    float: right;
    cursor: pointer;
  }
  @media screen and (max-width: 1356px) {
    .list-top-arer {
      justify-content: inherit;
    }
    .list-top-arer> div:nth-child(odd){
      margin-right: 48px;
    }
    .listArea {
      justify-content: inherit;
    }
    .listArea>div:nth-child(odd) {
      margin-right: 48px;
    }
  }
  .marGin {
    margin: 2px 0;
  }
  .prodCss {
    margin-top: 4px;
    margin-bottom: 3px;
    .prodMgi {
      margin-top: -4px;
    }
  }
  .prodMgin {
    margin-top: -5px;
  }
  .shopCss {
    margin-top: 4px;
  }
  .anchoMargin {
    margin-top: 2px;
  }
  .f1 .list-container {
    padding-top: 12px;
  }
  .f2 .list-container {
    padding-top: 13px !important;
  }
  .f3 .list-container {
    padding-top: 14px !important;
  }
  .ciclyMagin {
    margin-top: 2px;
  }
  .realMggin {
    margin-top: 1px;
  }
  .secodeColumnLeft {
    position: relative;
  }
  .list-container:hover {
    background: #F9F9F9;
  }
</style>
