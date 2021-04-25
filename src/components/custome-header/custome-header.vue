<template>
  <el-dialog
    class="myDialog"
    :visible.sync="clickDialogVisible"
    width="400px"
  >
    <div class="custome-container">
      <div class="title">自定义列</div>
      <div class="checkAll">
        <el-checkbox v-for="item of allCheckBox" :key="item.name" size="mini" :checked="item.mychecked" :label="item.name" :disabled="item.mydisabled" @change="changeOne" />
      </div>
      <el-button type="primary" size="small" @click="chnageState">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  dayilyRankCustome,
  dailyState,
  historyCustome,
  historyState,
  anchorCustome,
  anchorState,
  goodsAnchorCustome,
  goodsAnchorState,
  anchorDataCustome,
  anchorDataState,
  goodsCustome,
  goodsState,
  shopCustome,
  shopState,
  shopGoodsCustome,
  shopGoodsState,
  goodsLive,
  goodsLiveState,
  anchorDetailCustome,
  anchorDetailState,
  favLiveCustome,
  favLiveState,
  favShopCustome,
  favShopState,
  favGoodsCustome,
  favGoodsState,
  favAnchorCustome,
  favAnchorState,
  tiktokCustome,
  tiktokState,
  liveCstomeHistory,
  liveHistoryState,
  lookHistoryCustome,
  lookHistoryState
} from '@/utils/headerConfig.js'
export default {
  name: 'CustomHeader',
  props: {
    dataIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      type: undefined,
      clickDialogVisible: false,
      allCheckBox: undefined,
      myState: undefined,
      myOneCheckState: {},
      myOneCheckBox: [],
      newList: []
    }
  },
  methods: {
    changData(type, stateName) {
      this.type = type
      var localStorageData
      switch (type) {
        case 1:
          this.allCheckBox = dayilyRankCustome
          this.myState = dailyState
          localStorageData = JSON.parse(localStorage.getItem('dailyRank'))
          break
        case 2:
          this.allCheckBox = historyCustome
          this.myState = historyState
          localStorageData = JSON.parse(localStorage.getItem('historyRank'))
          break
        case 3:
          this.allCheckBox = anchorCustome
          this.myState = anchorState
          localStorageData = JSON.parse(localStorage.getItem('anchorRank'))
          break
        case 4:
          this.allCheckBox = goodsCustome
          this.myState = goodsState
          localStorageData = JSON.parse(localStorage.getItem('goodsRank'))
          break
        case 5:
          this.allCheckBox = shopCustome
          this.myState = shopState
          localStorageData = JSON.parse(localStorage.getItem('shopRank'))
          break
        case 6:
          this.allCheckBox = shopGoodsCustome
          this.myState = shopGoodsState
          localStorageData = JSON.parse(localStorage.getItem('shopGoods'))
          break
        case 7:
          this.allCheckBox = goodsLive
          this.myState = goodsLiveState
          localStorageData = JSON.parse(localStorage.getItem('goodsLive'))
          break
        case 8:
          this.allCheckBox = anchorDetailCustome
          this.myState = anchorDetailState
          localStorageData = JSON.parse(localStorage.getItem('liveRecond'))
          break
        case 9:
          this.allCheckBox = tiktokCustome
          this.myState = tiktokState
          localStorageData = JSON.parse(localStorage.getItem('tiktok'))
          break
        case 10:
          this.allCheckBox = liveCstomeHistory
          this.myState = liveHistoryState
          localStorageData = JSON.parse(localStorage.getItem('myLive'))
          break
        case 11:
          this.allCheckBox = lookHistoryCustome
          this.myState = lookHistoryState
          localStorageData = JSON.parse(localStorage.getItem('lookHistory'))
          break
        case 15:
          this.allCheckBox = goodsAnchorCustome
          this.myState = goodsAnchorState
          localStorageData = JSON.parse(localStorage.getItem('goodsAnchorRank'))
          break
        case 16:
          this.allCheckBox = anchorDataCustome
          this.myState = anchorDataState
          localStorageData = JSON.parse(localStorage.getItem('anchorDataRank'))
          break
        case 17:
          this.allCheckBox = favAnchorCustome
          this.myState = favAnchorState
          localStorageData = JSON.parse(localStorage.getItem('favAnchorRank'))
          break
        case 18:
          this.allCheckBox = favLiveCustome
          this.myState = favLiveState
          localStorageData = JSON.parse(localStorage.getItem('favLiveRank'))
          break
        case 19:
          this.allCheckBox = favGoodsCustome
          this.myState = favGoodsState
          localStorageData = JSON.parse(localStorage.getItem('favGoodsRank'))
          break
        case 20:
          this.allCheckBox = favShopCustome
          this.myState = favShopState
          localStorageData = JSON.parse(localStorage.getItem('favShopRank'))
          break
      }
      if (localStorageData !== null) {
        for (var item in localStorageData) {
          for (var secodeItem in this.myState) {
            if (item === secodeItem) {
              this.myState[secodeItem] = localStorageData[item]
            }
          }
          for (var boxItem of this.allCheckBox) {
            if (item === boxItem.id) {
              boxItem.mychecked = localStorageData[item]
            }
          }
        }
      }
      this.newList = JSON.parse(JSON.stringify(this.allCheckBox))
      if (stateName) {
        this.clickDialogVisible = true
      }
    },
    changeOne(type, row) {
      this.allCheckBox.map((item, index) => {
        if (item.name === row.srcElement.defaultValue) {
          this.newList[index].mychecked = type
        }
      })
      for (var item of this.newList) {
        this.myOneCheckState[item.id] = item.mychecked
      }
    },
    chnageState() {
      switch (this.type) {
        case 1:
          localStorage.setItem('dailyRank', JSON.stringify(this.myOneCheckState))
          break
        case 2:
          localStorage.setItem('historyRank', JSON.stringify(this.myOneCheckState))
          break
        case 3:
          localStorage.setItem('anchorRank', JSON.stringify(this.myOneCheckState))
          break
        case 4:
          localStorage.setItem('goodsRank', JSON.stringify(this.myOneCheckState))
          break
        case 5:
          localStorage.setItem('shopRank', JSON.stringify(this.myOneCheckState))
          break
        case 6:
          localStorage.setItem('shopGoods', JSON.stringify(this.myOneCheckState))
          break
        case 7:
          localStorage.setItem('goodsLive', JSON.stringify(this.myOneCheckState))
          break
        case 8:
          localStorage.setItem('liveRecond', JSON.stringify(this.myOneCheckState))
          break
        case 9:
          localStorage.setItem('tiktok', JSON.stringify(this.myOneCheckState))
          break
        case 10:
          localStorage.setItem('myLive', JSON.stringify(this.myOneCheckState))
          break
        case 11:
          localStorage.setItem('lookHistory', JSON.stringify(this.myOneCheckState))
          break
        case 15:
          localStorage.setItem('goodsAnchorRank', JSON.stringify(this.myOneCheckState))
          break
        case 16:
          localStorage.setItem('anchorDataRank', JSON.stringify(this.myOneCheckState))
          break
        case 17:
          localStorage.setItem('favAnchorRank', JSON.stringify(this.myOneCheckState))
          break
        case 18:
          localStorage.setItem('favLiveRank', JSON.stringify(this.myOneCheckState))
          break
        case 19:
          localStorage.setItem('favGoodsRank', JSON.stringify(this.myOneCheckState))
          break
        case 20:
          localStorage.setItem('favShopRank', JSON.stringify(this.myOneCheckState))
          break
      }
      for (var item in this.myOneCheckState) {
        for (var secodeItem in this.myState) {
          if (item === secodeItem) {
            this.myState[secodeItem] = this.myOneCheckState[item]
          }
        }
        for (var boxItem of this.allCheckBox) {
          if (item === boxItem.id) {
            boxItem.mychecked = this.myOneCheckState[item]
          }
        }
      }
      this.$parent.$parent.restTable()
      this.clickDialogVisible = false
    }
  }
}
</script>

<style scoped="scoped">
  .checkAll{
    padding: 34px 0px 20px 0px;
  }
  .checkAll>.el-checkbox{
    margin-bottom: 10px;
    font-size: 16px;
    width: 135px;
  }
  .custome-container {
    padding: 20px 25px 28px 25px;
  }
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    line-height: 16px;
  }
  .checkAll>.el-checkbox .el-checkbox__label{
    font-size: 16px;
  }
  .checkAll>.el-checkbox .el-checkbox__inner{
    width: 16px;
    height: 16px;
  }
  .checkAll>.el-checkbox .el-checkbox__inner::after{
    height: 10px;
    left: 5px;
  }
  .myDialog /deep/ .el-dialog__body, .myDialog /deep/ .el-dialog__header{
    padding: 0;
  }
  .myDialog /deep/ .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    margin-top: 0 !important;
  }
</style>
