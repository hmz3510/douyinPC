<template>
  <div class="sale-container">
    <saleCategory v-if="initdata()" :canvas-list="salesList" class="chats" />
    <saleMoney v-if="initSdata()" :canvas-list="salesMoneyList" class="chats" />
  </div>
</template>

<script>
import saleCategory from './saleCategoty.vue'
import saleMoney from './saleMoney.vue'
export default {
  name: 'SaleContiner',
  components: {
    saleCategory,
    saleMoney
  },
  data() {
    return {
      chart_title: '销售分析',
      salesList: this.initdata(),
      salesMoneyList: this.initSdata()
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    initdata() {
      if (JSON.parse(sessionStorage.getItem('categoryInfo')).salesList.length === 0) {
        return false
      } else {
        return JSON.parse(sessionStorage.getItem('categoryInfo')).salesList
      }
    },
    initSdata() {
      if (JSON.parse(sessionStorage.getItem('categoryInfo')).salesMoneyList.length === 0) {
        return false
      } else {
        return JSON.parse(sessionStorage.getItem('categoryInfo')).salesMoneyList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .sale-container {
    display: flex;
    justify-content: space-between;
  }
  .chats {
    width: 45%;
    height: 100%;
  }
</style>
