<template>
  <div class="selectAll" style="display: flex;">
    <div class="oneSelect">
      <el-select v-model="firstCategory" v-el-select-loadmore:rangeNumber3="loadMore3(rangeNumber3)" :disabled="isFreeMembership()" placeholder="请选择" @change="onFirstCategoryChanged">
        <el-option
          v-for="item in firstCategoryList.slice(0, rangeNumber3)"
          :key="item.cid"
          :label="item.name"
          :value="item.cid"
        />
      </el-select>
    </div>
    <div class="selceMargin">
      <el-select v-model="secondCategory" v-el-select-loadmore:rangeNumber2="loadMore2(rangeNumber2)" :disabled="isFreeMembership()" class="selectClass" placeholder="请选择" @change="onSecondCategoryChanged">
        <el-option
          v-for="item in secondCategoryList.slice(0, rangeNumber2)"
          :key="item.cid"
          :label="item.name"
          :value="item.cid"
        />
      </el-select>
    </div>
    <div class="oneSelect">
      <el-select v-model="thirdCategory" v-el-select-loadmore:rangeNumber="loadMore(rangeNumber)" :disabled="isFreeMembership()" placeholder="请选择">
        <el-option
          v-for="item in thirdCategoryList.slice(0, rangeNumber)"
          :key="item.cid"
          :label="item.name"
          :value="item.cid"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getCategoryFirst, getCategorySecond, getCategoryThird } from '@/api/tag.js'
import { getSeeionData, setSeeionData } from '../../utils/currencyFn.js'
import { isFreeMembership } from '@/utils/permission.js'
Vue.directive(
  'el-select-loadmore', {
    bind(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      SELECTWRAP_DOM.addEventListener('scroll', function() {
        const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
        if (condition) binding.value()
      })
    }
  }
)
export default {
  data() {
    return {
      thirdCategoryList: [],
      secondCategoryList: [],
      firstCategoryList: [],
      rangeNumber: 15,
      rangeNumber2: 15,
      rangeNumber3: 15,
      firstCategory: '0',
      secondCategory: '0',
      thirdCategory: '0'
    }
  },
  watch: {
    firstCategory(val) {
      this.$emit('getChildValue', { firstCategory: this.firstCategory, secondCategory: this.secondCategory, thirdCategory: this.thirdCategory })
    },
    secondCategory(val) {
      this.$emit('getChildValue', { firstCategory: this.firstCategory, secondCategory: this.secondCategory, thirdCategory: this.thirdCategory })
    },
    thirdCategory(val) {
      this.$emit('getChildValue', { firstCategory: this.firstCategory, secondCategory: this.secondCategory, thirdCategory: this.thirdCategory })
    }
  },
  created() {
    this.getFirstCategoryList()
    this.getSecondCategoryList()
    this.getThirdCategoryList()
  },
  methods: {
    loadMore() {
      return () => (this.rangeNumber += 15)
    },
    loadMore2() {
      return () => (this.rangeNumber2 += 15)
    },
    loadMore3() {
      return () => (this.rangeNumber3 += 15)
    },
    getFirstCategoryList() {
      if (getSeeionData('categoryProdFirst') !== null) {
        this.firstCategoryList = JSON.parse(getSeeionData('categoryProdFirst'))
      } else {
        getCategoryFirst().then(res => {
          res.data.unshift({ cid: '0', name: '一级分类' })
          this.firstCategoryList = res.data
          setSeeionData('categoryProdFirst', res.data)
        })
      }
    },
    getSecondCategoryList() {
      if (getSeeionData('categoryProdSecond') !== null) {
        this.secondCategoryList = JSON.parse(getSeeionData('categoryProdSecond'))
        return this.secondCategoryList
      } else {
        getCategorySecond().then(res => {
          res.data.unshift({ 'cid': '0', 'name': '二级分类', 'parentId': '0' })
          this.secondCategoryList = res.data
          setSeeionData('categoryProdSecond', res.data)
        })
      }
    },
    getThirdCategoryList() {
      if (getSeeionData('categoryProdThird') !== null) {
        this.thirdCategoryList = JSON.parse(getSeeionData('categoryProdThird'))
        return this.thirdCategoryList
      } else {
        getCategoryThird().then(res => {
          res.data.unshift({ 'cid': '0', 'name': '三级分类', 'parentId': '0' })
          this.thirdCategoryList = res.data
          setSeeionData('categoryProdThird', res.data)
        })
      }
    },
    onFirstCategoryChanged(val) {
      const secondList = this.getSecondCategoryList()
      const thirdList = this.getThirdCategoryList()
      if (val <= 0) {
        this.secondCategory = '0'
        this.secondCategoryList = secondList
        this.thirdCategory = '0'
        this.thirdCategoryList = thirdList
        return
      }
      const selectSecondList = [
        {
          'cid': '0',
          'name': '二级类目',
          'parentId': '0'
        }
      ]
      for (const index in secondList) {
        const item = secondList[index]
        if (val === item.parentId) {
          selectSecondList.push(item)
        }
      }
      this.secondCategory = '0'
      this.secondCategoryList = selectSecondList
      this.getThirdList(thirdList)
    },
    onSecondCategoryChanged(val) {
      const thirdList = this.getThirdCategoryList()
      if (val <= 0) {
        if (this.firstCategory > 0) {
          this.getThirdList(thirdList)
          return
        }
        this.thirdCategory = '0'
        this.thirdCategoryList = thirdList
        return
      }
      const selectThirdList = [
        {
          'cid': '0',
          'name': '三级类目',
          'parentId': '0'
        }
      ]
      for (const index in thirdList) {
        const item = thirdList[index]
        if (val === item.parentId) {
          selectThirdList.push(item)
        }
      }
      this.thirdCategory = '0'
      this.thirdCategoryList = selectThirdList
    },
    getThirdList(thirdList) {
      const selectThirdList = [
        {
          'cid': '0',
          'name': '三级类目',
          'parentId': '0'
        }
      ]
      for (const index in this.secondCategoryList) {
        const item = this.secondCategoryList[index]
        if (item.cid <= 0) {
          continue
        }
        for (const index2 in thirdList) {
          const item2 = thirdList[index2]
          if (item.cid === item2.parentId) {
            selectThirdList.push(item2)
          }
        }
      }
      this.thirdCategory = '0'
      this.thirdCategoryList = selectThirdList
    },
    isFreeMembership() {
      return isFreeMembership()
    }
  }
}
</script>
<style scoped>
  .selceMargin{
    margin: 0 12px;
  }
</style>
