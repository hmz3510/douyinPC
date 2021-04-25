<template>
  <div class="searchArea">
    <div class="app-top">
      <div class="topOne">
        <div class="search-left">
          <span class="pubilcSubtitle">商品品类</span>
          <category @getChildValue="getChildValue" />
        </div>
        <div class="search-left">
          <span class="pubilcSubtitle pubilcSubtitle1">上下架状态</span>
          <div class="oneSelect">
            <el-select v-model="listQuery.onShelf" :disabled="isFreeMembership()" placeholder="请选择" @change="handleSearch">
              <el-option
                v-for="item in onShelfList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="topOne">
        <div class="search-left">
          <span class="pubilcSubtitle">价格区间</span>
          <div class="myInput">
            <el-input v-model="listQuery.priceFrom" :disabled="isFreeMembership()" clearable />
            <span class="line">-</span>
            <el-input v-model="listQuery.priceTo" :disabled="isFreeMembership()" clearable />
          </div>
        </div>
        <div class="search-left">
          <span class="pubilcSubtitle">收录时间</span>
          <el-date-picker
            v-model="selectTimeList"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled="isFreeMembership()"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="keyWordInput"
            :default-time="['00:00:00', '23:59:59']"
          />
        </div>
      </div>
      <div class="topOne">
        <div class="search-left">
          <span class="pubilcSubtitle">销量区间</span>
          <div class="myInput">
            <el-input v-model="listQuery.salesFrom" oninput="value=value.replace(/[^\d]/g,'')" :disabled="isFreeMembership()" clearable />
            <span class="line">-</span>
            <el-input v-model="listQuery.salesTo" oninput="value=value.replace(/[^\d]/g,'')" :disabled="isFreeMembership()" clearable />
          </div>
        </div>
        <div class="search-left">
          <div class="keyWordCss">
            <span class="pubilcSubtitle">关键字</span>
            <el-input v-model="listQuery.keyword" class="keyWordInput" :disabled="isFreeMembership()" clearable placeholder="请输入关键字、商品ID、商品链接" @keyup.enter.native="handeInput" />
          </div>
          <el-button class="searchBtn" type="primary" size="medium" :disabled="isFreeMembership()" @click="handleSearch">搜索</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import category from '@/components/category/category.vue'
import { isFreeMembership } from '@/utils/permission.js'
export default {
  name: 'ProdScreen',
  components: { category },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 25,
        dateTimeFrom: undefined,
        dateTimeTo: undefined,
        firstCid: undefined,
        secondCid: undefined,
        thirdCid: undefined,
        priceFrom: undefined,
        priceTo: undefined,
        onShelf: 1,
        salesFrom: undefined,
        salesTo: undefined,
        keyword: undefined
      },
      selectTimeList: [],
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
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
  },
  methods: {
    getChildValue(data) {
      this.listQuery.firstCid = data.firstCategory
      this.listQuery.secondCid = data.secondCategory
      this.listQuery.thirdCid = data.thirdCategory
      this.handleSearch()
    },
    handleSearch() {
      this.listQuery.current = 1
      if (this.selectTimeList === undefined || this.selectTimeList === null) {
        this.listQuery.dateTimeFrom = undefined
        this.listQuery.dateTimeTo = undefined
      } else {
        this.listQuery.dateTimeFrom = this.selectTimeList[0]
        this.listQuery.dateTimeTo = this.selectTimeList[1]
      }
      this.$parent.listQuery.onShelf = this.listQuery.onShelf
      this.$parent.listQuery.keyword = this.listQuery.keyword
      this.$emit('getData', this.listQuery)
    },
    handeInput() {
      this.$emit('getData', this.listQuery)
    },
    isFreeMembership() {
      return isFreeMembership()
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .searchArea {
    padding-bottom: 17px;
  }
  .search-left, .topOne, .keyWordCss {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .search-left{
    margin-bottom: 20px;
  }
  .topOne>div:first-child{
    margin-right: 40px;
  }
  .pubilcSubtitle1 {
    width: 75px;
  }
  .myInput{
    display: flex;
    & /deep/ .el-input__inner, .el-input--suffix{
      width: 160px;
      min-width: 160px;
    }
  }
  .line{
    display: inline-block;
    width: 12px;
    margin: auto;
    text-align: center;
    color: #959BAA;
  }
  .searchBtn{
    margin-left: 40px;
  }
  @media screen and (max-width: 1190px) {
    .pubilcSubtitle{
      width: 70px;
    }
  }
</style>
