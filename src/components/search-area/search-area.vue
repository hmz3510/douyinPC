<template>
  <div>
    <div class="searchArea">
      <el-input v-model="listQuery.keyword" class="searchInput" placeholder="搜主播 搜直播 搜商品" @input="searchInpt" @change="changeInput" />
      <div v-if="listQuery.keyword.length>0" class="searchContentBtn" @click="changeInput">搜索</div>
    </div>
    <div v-if="hasKeyWord" class="search-parent">
      <div class="search-container">
        <div class="search-content">
          <div class="item-container">
            <div v-loading="anchorData.loading" class="one-item" :element-loading-text="loadingText">
              <div class="item-header">
                <div class="item-title">
                  <div class="item-titleName">主播</div>
                  <div class="item-subtitle">{{ anchorData.total }}个结果</div>
                </div>
                <div v-show="anchorData.total>0" class="lookAll" @click="lookMore('anchorData')">查看全部<i class="el-icon-right" /></div>
              </div>
              <div class="list-container">
                <div v-for="item of anchorData.list.slice(0, 3)" :key="item.id" class="oneList">
                  <div @click="handClick('anchorDetail', item)">
                    <img v-if="item.avatarUrl!==''" class="listImg borderImg" :src="item.avatarUrl">
                    <img v-else class="listImg borderImg" src="../../icons/images/error_cycle.png">
                  </div>
                  <div class="listRight">
                    <div class="right-left" @click="handClick('anchorDetail', item)">
                      <div class="right-title hoveColor">{{ item.nickname }}</div>
                      <div class="right-subtitle">{{ item.followerCountExplain }}粉丝</div>
                    </div>
                    <div class="addCss" @click="userClick(item)">{{ item.hasEntry ? '详情': '收录' }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-loading="prodData.loading" class="one-item" element-loading-text="加载中...">
              <div class="item-header">
                <div class="item-title">
                  <div class="item-titleName">商品</div>
                  <div class="item-subtitle">{{ prodData.total }}个结果</div>
                </div>
                <div v-show="prodData.total>0" class="lookAll" @click="lookMore('goodsRank')">查看全部<i class="el-icon-right" /></div>
              </div>
              <div class="list-container">
                <div v-for="item of prodData.list" :key="item.id" class="oneList">
                  <div @click="handClick('goodsDetail', item)">
                    <img v-if="item.coverUrl!==''" class="listImg prodImg borderImg" :src="item.coverUrl">
                    <img v-else class="listImg prodImg borderImg" src="../../icons/images/error_prod.png">
                  </div>
                  <div class="listRight">
                    <div class="right-left">
                      <div class="right-title hoveColor" @click="handClick('goodsDetail', item)">{{ item.title }}</div>
                      <div class="right-subtitle prodCss">
                        <div class="priceInfo">直播价：<span class="price">{{ item.priceExplain }}</span></div>
                        <div class="priceInfo">今日销量：<span class="accountNumber">{{ item.todaySales }}</span></div>
                      </div>
                    </div>
                    <div class="addCss" @click="handClick('goodsDetail', item)">详情</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-container f2Item-container">
            <div v-loading="liveData.loading" class="one-item" element-loading-text="加载中...">
              <div class="item-header">
                <div class="item-title">
                  <div class="item-titleName">直播</div>
                  <div class="item-subtitle">{{ liveData.total }}个结果</div>
                </div>
                <div v-show="liveData.total>0" class="lookAll" @click="lookMore('liveHistory')">查看全部<i class="el-icon-right" /></div>
              </div>
              <div class="list-container">
                <div v-for="item of liveData.list" :key="item.id" class="oneList anchorCss">
                  <div @click="handClick('liveDetail', item)">
                    <img v-if="item.coverUrl!==''" class="listImg anchorImg borderImg" :src="item.coverUrl">
                    <img v-else class="listImg anchorImg borderImg" src="../../icons/images/error_column.png">
                  </div>
                  <div class="listRight">
                    <div class="right-left">
                      <div class="right-title hoveColor" @click="handClick('liveDetail', item)">{{ item.title }}</div>
                      <div class="right-subtitle anchorMagin">开播时间：{{ item.createTimeExplain }}</div>
                      <div class="right-footer">
                        <img v-if="item.userVO.avatarUrl!==''" class="footer-img borderImg" :src="item.userVO.avatarUrl">
                        <img v-else class="footer-img borderImg" src="../../icons/images/error_cycle.png">
                        <div class="right-subtitle hoveColor" @click="handClick('anchorDetail', item.userVO, true)">{{ item.userVO.nickname }}</div>
                      </div>
                    </div>
                    <div class="addCss" @click="handClick('liveDetail', item)">详情</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-loading="shopData.loading" class="one-item" element-loading-text="加载中...">
              <div class="item-header">
                <div class="item-title">
                  <div class="item-titleName">小店</div>
                  <div class="item-subtitle">{{ shopData.total }}个结果</div>
                </div>
                <div v-show="shopData.total>0" class="lookAll" @click="lookMore('smallShopRank')">查看全部<i class="el-icon-right" /></div>
              </div>
              <div class="list-container">
                <div v-for="item of shopData.list" :key="item.id" class="oneList">
                  <div @click="handClick('smallShopDetail', item)">
                    <img v-if="item.shopLogo!==''" class="listImg prodImg borderImg" :src="item.shopLogo">
                    <img v-else class="listImg prodImg borderImg" src="../../icons/images/error_prod.png">
                  </div>
                  <div class="listRight">
                    <div class="right-left">
                      <div class="right-title hoveColor" @click="handClick('smallShopDetail', item)">{{ item.shopName }}</div>
                      <div class="right-subtitle">今日销量：{{ item.todaySales }}</div>
                    </div>
                    <div class="addCss" @click="handClick('smallShopDetail', item)">详情</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <major ref="major" :dialog-boolean="true" />
    </div>
  </div>
</template>

<script>
import { getUserList, enterUser } from '@/api/anchor.js'
import { getList } from '@/api/good.js'
import { getSearchList } from '@/api/shop.js'
import { getLiveList } from '@/api/live.js'
import { isFreeMembership } from '@/utils/permission.js'
import major from '@/components/major/major.vue'
export default {
  name: 'SearchArea',
  components: { major },
  data() {
    return {
      hasKeyWord: false,
      anchorList0: 3,
      anchorList: 3,
      anchorData: {
        total: 0,
        list: [],
        loading: false
      },
      prodData: {
        total: 0,
        list: [],
        loading: false
      },
      shopData: {
        total: 0,
        list: [],
        loading: false
      },
      liveData: {
        total: 0,
        list: [],
        loading: false
      },
      listQuery: {
        current: 1,
        size: 3,
        keyword: ''
      },
      liveListQurty: {
        current: 1,
        size: 3,
        keyword: '',
        dateTimeFrom: '2020-01-01 00:00:00',
        dateTimeTo: this.initTime()
      },
      loadingText: '加载中...'
    }
  },
  mounted() {
    document.addEventListener('click', this.handleDocumentClick)
  },
  methods: {
    initData(type, data) {
      if (type) {
        this.hasKeyWord = true
        this.anchorData.loading = true
        this.prodData.loading = true
        this.shopData.loading = true
        this.liveData.loading = true
        this.getUserList()
        this.getList()
        this.getShopList()
        this.getLiveList()
      } else {
        this.hasKeyWord = false
      }
    },
    initTime() {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth()
      var date = now.getDate()
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      return year + '-' + month + '-' + date + ' 23:59:59'
    },
    getUserList() {
      getUserList(this.listQuery).then(res => {
        this.anchorData.list = res.data.list
        this.anchorData.total = res.data.total
        this.anchorData.loading = false
      }).catch(() => {
        this.anchorData.loading = false
      })
    },
    getList() {
      getList(this.listQuery).then(res => {
        this.prodData.list = res.data.list
        this.prodData.total = res.data.total
        this.prodData.loading = false
      }).catch(() => {
        this.prodData.loading = false
      })
    },
    getShopList() {
      getSearchList(this.listQuery).then(res => {
        this.shopData.list = res.data.list
        this.shopData.total = res.data.total
        this.shopData.loading = false
      }).catch(() => {
        this.shopData.loading = false
      })
    },
    getLiveList() {
      this.liveListQurty.keyword = this.listQuery.keyword
      getLiveList(this.liveListQurty).then(res => {
        this.liveData.list = res.data.list
        this.liveData.total = res.data.total
        this.liveData.loading = false
      }).catch(() => {
        this.liveData.loading = false
      })
    },
    searchInpt() {
      if (this.listQuery.keyword.length <= 0) {
        this.hasKeyWord = false
      }
    },
    handleDocumentClick(e) {
      if (!this.$el.contains(e.target)) {
        this.hasKeyWord = false
      }
    },
    changeInput() {
      this.loadingText = '加载中...'
      if (this.listQuery.keyword.length > 0) {
        this.initData(true)
      } else {
        this.initData(false)
      }
    },
    lookMore(name) {
      const routeData = this.$router.resolve({ path: name, query: { keyword: this.listQuery.keyword }})
      window.open(routeData.href, '_blank')
    },
    isFreeMembership() {
      return isFreeMembership()
    },
    userClick(data) {
      if (!data.hasEntry) {
        this.enterUser(data)
      } else {
        this.handClick('anchorDetail', data)
      }
    },
    enterUser(data) {
      this.anchorData.loading = true
      this.loadingText = '正在收录中...'
      enterUser(data.uid).then(res => {
        this.anchorData.loading = false
        data.userSn = res.data
        data.hasEntry = true
        this.$message({
          type: 'success',
          message: '收录成功!'
        })
      }).catch(() => {
        this.anchorData.loading = false
      })
    },
    handClick(name, data, type) {
      if (name === 'anchorDetail') {
        if (!data.hasEntry && !type) {
          this.$message({
            type: 'error',
            message: '请先收录主播'
          })
          return
        }
      }
      var query, index
      if (name === 'liveDetail') {
        query = {
          roomSn: data.roomSn
        }
        index = 1
      } else if (name === 'goodsDetail') {
        query = {
          goodsId: data.goodsId
        }
        index = 3
      } else if (name === 'anchorDetail') {
        query = {
          userSn: data.userSn
        }
        index = 2
      } else {
        query = {
          shopId: data.shopId
        }
        index = 4
      }
      if (isFreeMembership()) {
        this.$refs.major.initData(true, index)
        return
      }
      const routeData = this.$router.resolve({ path: name, query: query })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
  .searchArea {
    border-bottom: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    margin-top: 0;
    position: relative;
  }
  .searchContentBtn {
    color: #0E71EB;
    font-weight: 400;
    position: absolute;
    right: 20px;
    font-size: 14px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
  }
  .searchInput /deep/ .el-input__inner{
    border-radius: 20px;
    height: 36px;
    line-height: 36px;
  }
  .search-container {
    width: 769px;
    min-height: 616px;
    background: #FFFFFF;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    border: 1px solid #E4E7ED;
    position: fixed;
    left: 240px;
    top: 50px;
    padding: 10px 12px 12px 11px;
    z-index: 99;
    .item-container {
      display: flex;
      justify-content: space-between;
      .one-item {
        width: 352px;
        min-height: 240px;
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item-title {
            display: flex;
            align-items: center;
            .item-titleName {
              font-size: 20px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #232333;
              line-height: 28px;
            }
            .item-subtitle {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #606266;
              line-height: 17px;
              margin-left: 5px;
              margin-top: 5px;
            }
          }
          .lookAll {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #0E71EB;
            line-height: 20px;
            cursor: pointer;
          }
        }
        .list-container {
          display: flex;
          flex-flow: wrap;
          justify-content: space-between;
          .oneList {
            padding-bottom: 14px;
            border-bottom: 1px solid #EBEEF5;
            width: 341px;
            display: flex;
            margin-top: 13px;
            .listRight {
              display: flex;
              justify-content: space-between;
              flex: 1;
              align-items: center;
              width: 70%;
              .right-left {
                width: 80%;
              }
              .right-title {
                font-size: 16px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #606266;
                line-height: 22px;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .right-subtitle {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #606266;
                line-height: 17px;
              }
              .addCss {
                width: 43px;
                height: 22px;
                background: #0E71EB;
                border-radius: 2px;
                border: 1px solid #0E71EB;
                line-height: 20px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                text-align: center;
                cursor: pointer;
              }
            }
          }
          .listImg {
            height: 40px;
            width: 40px;
            display: block;
            margin-right: 6px;
            border-radius: 50%;
            cursor: pointer;
            min-width: 40px;
          }
          .prodImg {
            border-radius: 0;
          }
          .prodCss {
            display: flex;
            .price {
              color: #FF2424;
            }
          }
          .prodCss>div:last-child {
            margin-left: 22px;
          }
        }
      }
      .anchorBtn {
        width: 105px;
        border-radius: 16px;
        border: 1px solid #0E71EB;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0E71EB;
        text-align: center;
        padding: 6px 0;
        margin: auto;
        margin-top: 17px;
        cursor: pointer;
      }
    }
    .f2Item-container {
      margin-top: 45px;
      .anchorCss {
        align-items: center;
      }
      .one-item .list-container .anchorImg {
        height: 48px;
        border-radius: 0;
      }
      .right-footer {
        display: flex;
        .footer-img {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          margin-right: 4px;
          min-width: 20px;
        }
      }
      .anchorMagin {
        margin:2px 0;
      }
    }
  }
</style>
