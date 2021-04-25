<template>
  <div>
    <div class="listArea">
      <div class="areaLeft">
        <el-select v-model="listQuery.dailyRankValue" :disabled="isFreeMembership()" placeholder="请选择" @change="handChange">
          <el-option
            v-for="item in dailyRankList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div v-if="typeNumber===6" style="margin-left: 20px;" class="oneSelect">
          <el-select v-model="onShelf" placeholder="请选择" @change="handleSearch">
            <el-option
              v-for="item in onShelfList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </div>
        <div v-if="hasCustom" class="customColumns1" @click="handCustome">
          <div class="customColumns">自定义列</div>
          <div class="rotateLabel">{{ selectNumber }}</div>
        </div>
      </div>
      <div class="areaRight" @click="tips">
        <div class="tips">{{ msg }}</div>
        <img v-if="hasImg" class="markImg" src="../../icons/images/questionMark.png" alt="">
      </div>
    </div>
    <dataInfo ref="dataInfo" :data-index="typeNumber" />
    <customeHeader ref="customeHeader" :data-index="typeNumber" />
  </div>
</template>

<script>
import {
  dailyRankList,
  historyList,
  anchorList,
  hotGoodList,
  smallShopList,
  smallShopDetaiList,
  hotGoodDetailList,
  liceRecordList,
  myTikotokList,
  myLookList,
  lookHistoryList,
  realRankList,
  liveDetailList,
  onLineList,
  goodsAnchorList,
  anchorDataList,
  enjoyUserList,
  enjoyLiveList
} from '@/utils/selectConfig.js'
import { isFreeMembership } from '@/utils/permission.js'
import dataInfo from '../data-info/data-info.vue'
import customeHeader from '@/components/custome-header/custome-header.vue'
export default {
  components: {
    dataInfo,
    customeHeader
  },
  props: {
    typeNumber: {
      type: Number,
      required: true
    },
    selectNumber: {
      type: String,
      default: '0/0'
    }
  },
  data() {
    return {
      listQuery: {
        dailyRankValue: undefined
      },
      dailyRankList: undefined,
      hasImg: true,
      msg: '数据说明',
      hasCustom: true,
      onShelfList: [{
        id: undefined,
        value: '全部'
      }, {
        id: 1,
        value: '上架商品'
      }, {
        id: 0,
        value: '下架商品'
      }],
      onShelf: undefined
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      switch (this.typeNumber) {
        case 1:
          this.dailyRankList = dailyRankList
          this.listQuery.dailyRankValue = '0'
          break
        case 2:
          this.dailyRankList = historyList
          this.listQuery.dailyRankValue = '0'
          break
        case 3:
          this.dailyRankList = anchorList
          this.listQuery.dailyRankValue = '13'
          break
        case 4:
          this.dailyRankList = hotGoodList
          this.listQuery.dailyRankValue = '0'
          break
        case 5:
          this.dailyRankList = smallShopList
          this.listQuery.dailyRankValue = '0'
          break
        case 6:
          this.dailyRankList = smallShopDetaiList
          this.listQuery.dailyRankValue = '0'
          break
        case 7:
          this.dailyRankList = hotGoodDetailList
          this.listQuery.dailyRankValue = '0'
          break
        case 8:
          this.dailyRankList = liceRecordList
          this.listQuery.dailyRankValue = '31'
          break
        case 9:
          this.dailyRankList = myTikotokList
          this.listQuery.dailyRankValue = '0'
          break
        case 10:
          this.dailyRankList = myLookList
          this.listQuery.dailyRankValue = '45'
          this.hasImg = false
          this.msg = '直播数据为最近一场直播数据'
          break
        case 11:
          this.dailyRankList = lookHistoryList
          this.listQuery.dailyRankValue = '31'
          break
        case 12:
          this.dailyRankList = realRankList
          this.listQuery.dailyRankValue = '29'
          this.hasCustom = false
          break
        case 13:
          this.dailyRankList = liveDetailList
          this.listQuery.dailyRankValue = '1'
          this.hasCustom = false
          break
        case 14:
          this.dailyRankList = onLineList
          this.listQuery.dailyRankValue = '1'
          this.hasCustom = false
          break
        case 15:
          this.dailyRankList = goodsAnchorList
          this.listQuery.dailyRankValue = '21'
          break
        case 16:
          this.dailyRankList = anchorDataList
          this.listQuery.dailyRankValue = '3'
          break
        case 17:
          this.dailyRankList = enjoyUserList
          this.listQuery.dailyRankValue = '35'
          break
        case 18:
          this.dailyRankList = enjoyLiveList
          this.listQuery.dailyRankValue = '35'
          break
        case 19:
          this.dailyRankList = hotGoodList
          this.listQuery.dailyRankValue = '0'
          break
        case 20:
          this.dailyRankList = smallShopList
          this.listQuery.dailyRankValue = '0'
          break
      }
    },
    handChange(value) {
      this.$emit('changeData', this.listQuery.dailyRankValue)
    },
    handleSearch() {
      this.$parent.listQuery.onShelf = this.onShelf
      this.$parent.getList()
    },
    changeValue(column) {
      for (var item of this.dailyRankList) {
        if (item.label === column.label) {
          if (this.listQuery.dailyRankValue === item.value) {
            return
          } else {
            this.listQuery.dailyRankValue = item.value
            this.handChange()
          }
        }
      }
    },
    isFreeMembership() {
      return isFreeMembership()
    },
    tips() {
      if (this.msg === '数据说明') {
        this.$refs.dataInfo.dialogVisible = true
      }
    },
    handCustome() {
      this.$refs.customeHeader.changData(this.typeNumber, true)
    }
  }
}
</script>

<style scoped lang="scss">
  .customColumns1{
    position: relative;
    .rotateLabel {
      position: absolute;
      background: #E7F1FD;
      line-height: 13px;
      padding: 0px 5px;
      font-size: 8px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0E71EB;
      border-radius: 14px;
      border: 1px solid #BCDBFF;
      top: -4px;
      left: 78px;
      height: 14px;
      cursor: pointer;
    }
  }
</style>
