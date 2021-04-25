<template>
  <div class="filterArea-container">
    <div class="selectArea">
      <!-- <div class="oneSelect">
        <span class="pubilcSubtitle">主播地区</span>
        <el-cascader
          v-model="listQuery.anchorValue"
          :options="options"
          :disabled="isFreeMembership()"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        />
      </div> -->
      <div class="oneSelect">
        <span class="pubilcSubtitle">粉丝区间</span>
        <el-select v-model="fansNum" placeholder="请选择" :disabled="isFreeMembership()" @change="changeFansNum">
          <el-option
            v-for="item in fansList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="oneSelect">
        <span class="pubilcSubtitle">{{ titleName }}</span>
        <el-select v-model="liveType" placeholder="请选择" :disabled="isFreeMembership()" @change="changeNumber">
          <el-option
            v-for="item in liveTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="authorArea">
      <span class="pubilcSubtitle pubilcSubtitle1">主播类型</span>
      <div class="authorList" :class="authorBoolean ? 'canSeeAll': ''">
        <div v-for="(item, index) of tagList" :key="index" class="authorType" :class="item.name === userId?'allCss':''" @click="selectMe(item, true)" @mouseover="chooseSecond($event, true, item.tid)" @mouseout="notChooseSecond">{{ item.name }}</div>
      </div>
      <div class="lookeMore" @click="lookMore(true)">{{ !authorBoolean ? '展开' : '收起' }} <i :class="authorBoolean ? 'el-icon-arrow-up': 'el-icon-arrow-down'" /></div>
    </div>
    <div class="authorArea categoryArea" :style="{marginTop: authorBoolean ? '0': '22px'}">
      <span class="pubilcSubtitle pubilcSubtitle1">带货品类</span>
      <div class="authorList" :class="categoryBoolean ? 'canSeeAll': ''">
        <div v-for="(item, index) of getCategoryFirst" :key="index" class="authorType" :class="item.name === prodId?'allCss':''" @click="selectMe(item, false)" @mouseover="chooseSecond($event, false, item.cid)" @mouseout="notChooseSecond">{{ item.name }}</div>
      </div>
      <div class="lookeMore" @click="lookMore(false)">{{ !categoryBoolean ? '展开' : '收起' }} <i :class="categoryBoolean ? 'el-icon-arrow-up': 'el-icon-arrow-down'" /></div>
    </div>
    <div v-show="selectList.length !== 0" class="chooseArea" :style="{marginTop: categoryBoolean ? '0': '22px', marginBottom: categoryBoolean ? '22px': '0'}">
      <span class="pubilcSubtitle">已选</span>
      <div class="chooseList">
        <div v-for="item of selectList" :key="item.id" class="oneInfo">带货类型：{{ item.name }} - {{ item.seconde!==undefined ? item.seconde.name : '全部' }} <span class="delete" @click="deleteMe(item)">X</span></div>
      </div>
    </div>
    <div class="parentAuchot">
      <div class="chooseArea cycleArea " :class="categoryBoolean ? 'open1': 'open'" :style="{float:isAnchorData? 'right':''}">
        <div v-if="!isAnchorData" class="chooseArea">
          <div class="chooseArea">
            <span class="pubilcSubtitle">统计周期</span>
            <el-radio-group v-if="!isHistory" v-model="cycleInfo" :disabled="isFreeMembership()" size="medium" @change="changeType">
              <el-radio-button label="日" />
              <el-radio-button label="周" />
              <el-radio-button label="月" />
            </el-radio-group>
            <el-radio-group v-else v-model="cycleInfo" size="medium" :disabled="isFreeMembership()" @change="changeType">
              <el-radio-button label="昨日" />
              <el-radio-button label="7日" />
              <el-radio-button label="30日" />
              <el-radio-button label="自定义" />
            </el-radio-group>
          </div>
          <div>
            <el-date-picker
              v-show="cycleInfo ==='日'"
              v-model="dayVal"
              :disabled="isFreeMembership()"
              type="date"
              class="selectCsass"
              placeholder="选择日"
              value-format="yyyy-MM-dd"
              @change="seletTime"
            />
            <el-date-picker
              v-show="cycleInfo ==='周'"
              v-model="weekVal"
              :disabled="isFreeMembership()"
              type="week"
              class="selectCsass"
              placeholder="选择周"
              :picker-options="{'firstDayOfWeek': 1}"
              :format="startData + ' 到 '+ endData"
              @change="seletTimeWeek"
            />
            <el-date-picker
              v-show="cycleInfo ==='月'"
              v-model="monthVal"
              :disabled="isFreeMembership()"
              type="month"
              class="selectCsass"
              format="yyyy-MM"
              placeholder="选择月"
              @change="seletTimeMonth"
            />
            <el-date-picker
              v-show="cycleInfo ==='自定义'"
              v-model="customValue"
              :disabled="isFreeMembership()"
              type="daterange"
              align="right"
              style="margin-left: 16px;width: 300px;"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']"
              @change="selectCustomeTime"
            />
          </div>
        </div>
        <div class="cycleAreaSearch chooseArea">
          <el-input v-model="listQuery.keyword" class="searchInput" :disabled="isFreeMembership()" clearable placeholder="请输入内容" @keyup.enter.native="handeInput" />
          <el-button class="searchBtn" type="primary" size="medium" :disabled="isFreeMembership()" @click="handSearch">搜索</el-button>
        </div>
        <transition name="fade">
          <div v-show="secondInfo" ref="secodeArea" :style="[secondInfoCssObj]" class="secodeArea" @mouseover="secodeMouse" @mouseout="notSecodeMouse">
            <div v-for="(item, index) of categoryData" :key="index" class="secodeCartogy" :class="item.name===allName? 'nameActive':''" @click="selectSecode(item)">{{ item.name }}</div>
            <div class="popper__arrow" />
          </div>
        </transition>
      </div>
    </div>
    <major ref="major" :dialog-boolean="false" />
  </div>
</template>

<script>
import major from '@/components/major/major.vue'
import { fansList, liveTypeList } from '@/utils/selectConfig.js'
import { getTagFirst, getTagSecond, getCategoryFirst } from '@/api/tag.js'
import dayjs from 'dayjs'
import { getSeeionData, setSeeionData } from '../../utils/currencyFn.js'
import { isFreeMembership } from '@/utils/permission.js'
export default {
  components: { major },
  props: {
    useNumber: {
      type: Number,
      required: true
    },
    titleName: {
      type: String,
      required: true
    },
    isHistory: {
      type: Boolean,
      required: true
    },
    isAnchorData: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      listQuery: {
        current: 1,
        size: 25,
        tagId: undefined,
        tagIdLevelTwo: undefined,
        anchorValue: undefined,
        followerFrom: undefined,
        followerTo: undefined,
        dateTimeFrom: undefined,
        dateTimeTo: undefined,
        keyword: undefined,
        hasGoodsLive: undefined,
        status: undefined,
        firstCid: undefined,
        categoryIdTwo: undefined,
        type: undefined
      },
      options: undefined,
      fansList: undefined,
      liveTypeList: undefined,
      authorBoolean: false,
      categoryBoolean: false,
      secondInfo: false,
      secondInfoCssObj: undefined,
      chooseBoolean: false,
      timerList: undefined,
      hasSelect: true,
      fansNum: '0',
      cycleInfo: undefined,
      timerValue: undefined,
      liveType: undefined,
      dayVal: undefined,
      startData: undefined,
      endData: undefined,
      weekVal: undefined,
      monthVal: undefined,
      customValue: [],
      tagList: undefined,
      tagSecond: undefined,
      categorySecond: undefined,
      getCategoryFirst: undefined,
      categoryData: [],
      userId: '全部',
      prodId: '全部',
      allName: undefined,
      isWho: undefined, // 判断是主播的还带货的
      selectList: [],
      childUserName: undefined,
      childProdName: undefined
    }
  },
  created() {
    // this.options = areaData
    this.fansList = fansList
    this.initType()
    // this.timeChoose()
    this.initTitleName()
  },
  mounted() {
    this.getTagFirst()
    this.getTagSecond()
    this.getCategoryFirstList()
  },
  methods: {
    initType() {
      if (this.isHistory) {
        this.cycleInfo = '昨日'
        this.initHistoryTime()
      } else {
        this.cycleInfo = '日'
        this.listQuery.type = 0
        if (this.isAnchorData) return
        this.timeChoose()
      }
    },
    initTitleName() {
      if (this.useNumber === 1 || this.useNumber === 2 || this.useNumber === 3) {
        if (this.useNumber === 1 || this.useNumber === 3) {
          this.liveType = undefined
        } else {
          this.liveType = 1
        }
        this.liveTypeList = liveTypeList
      } else {
        this.liveType = undefined
        this.liveTypeList = liveTypeList
      }
    },
    getTagFirst() {
      if (getSeeionData('tagList') !== null) {
        this.tagList = JSON.parse(getSeeionData('tagList'))
      } else {
        getTagFirst().then(res => {
          res.data.unshift({ name: '全部', parentId: '全部', nameLabel: 'user' })
          this.tagList = res.data
          setSeeionData('tagList', res.data)
        })
      }
    },
    getTagSecond() {
      if (getSeeionData('tagSecond') !== null) {
        this.tagSecond = JSON.parse(getSeeionData('tagSecond'))
      } else {
        getTagSecond().then(res => {
          this.tagSecond = res.data
          setSeeionData('tagSecond', res.data)
        })
      }
    },
    getCategoryFirstList() {
      if (getSeeionData('getCategoryFirst') !== null) {
        this.getCategoryFirst = JSON.parse(getSeeionData('getCategoryFirst'))
      } else {
        getCategoryFirst().then(res => {
          this.getCategoryFirst = res.data
          res.data.unshift({ name: '全部', parentId: '全部', nameLabel: 'prod' })
          setSeeionData('getCategoryFirst', res.data)
        })
      }
    },
    initHistoryTime() {
      var now = new Date()
      this.customValue = []
      if (this.cycleInfo === '自定义') return
      if (this.cycleInfo === '昨日') {
        now.setTime(now.getTime() - 24 * 60 * 60 * 1000)
        this.listQuery.dateTimeFrom = this.getTimeString(now, false)
        this.listQuery.dateTimeTo = this.getTimeString(now, true)
      } else if (this.cycleInfo === '7日') {
        var nowtWeekTime = this.getTimeString(now, true)
        now.setTime(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        var lastWeekTime = this.getTimeString(now, false)
        this.listQuery.dateTimeFrom = lastWeekTime
        this.listQuery.dateTimeTo = nowtWeekTime
      } else if (this.cycleInfo === '30日') {
        this.listQuery.dateTimeTo = this.getTimeString(now, true)
        now.setTime(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        this.listQuery.dateTimeFrom = this.getTimeString(now, false)
      }
      this.customValue.push(this.listQuery.dateTimeFrom.split(' ')[0])
      this.customValue.push(this.listQuery.dateTimeTo.split(' ')[0])
      this.handSearch()
    },
    getTimeString(data, type) {
      var timeString
      if (type) {
        timeString = ' 23:59:59'
      } else {
        timeString = ' 00:00:00'
      }
      return data.getFullYear() + '-' + ((data.getMonth() + 1).toString().padStart(2, '0')) + '-' + data.getDate().toString().padStart(2, '0') + timeString
    },
    timeChoose() {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth()
      var date = now.getDate()
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      this.dayVal = year + '-' + month + '-' + date
      this.monthVal = year + '-' + month
      this.weekVal = now.getTime()
      var beforeTime = new Date()
      var beforeMonth
      switch (beforeTime.getDay()) {
        case 0:
          this.endData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
          beforeTime.setTime(beforeTime.getTime() - 6 * 24 * 60 * 60 * 1000)
          beforeMonth = (beforeTime.getMonth() + 1).toString().padStart(2, '0')
          this.startData = year + '-' + beforeMonth + '-' + beforeTime.getDate().toString().padStart(2, '0')
          break
        case 6:
          beforeTime.setTime(beforeTime.getTime() - 5 * 24 * 60 * 60 * 1000)
          beforeMonth = (beforeTime.getMonth() + 1).toString().padStart(2, '0')
          this.startData = year + '-' + beforeMonth + '-' + beforeTime.getDate().toString().padStart(2, '0')
          beforeTime.setTime(beforeTime.getTime() + 6 * 24 * 60 * 60 * 1000)
          this.endData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
          break
        case 5:
          beforeTime.setTime(beforeTime.getTime() - 4 * 24 * 60 * 60 * 1000)
          beforeMonth = (beforeTime.getMonth() + 1).toString().padStart(2, '0')
          this.startData = year + '-' + beforeMonth + '-' + beforeTime.getDate().toString().padStart(2, '0')
          beforeTime.setTime(beforeTime.getTime() + 6 * 24 * 60 * 60 * 1000)
          this.endData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
          break
        case 4:
          beforeTime.setTime(beforeTime.getTime() - 3 * 24 * 60 * 60 * 1000)
          beforeMonth = (beforeTime.getMonth() + 1).toString().padStart(2, '0')
          this.startData = year + '-' + beforeMonth + '-' + beforeTime.getDate().toString().padStart(2, '0')
          beforeTime.setTime(beforeTime.getTime() + 6 * 24 * 60 * 60 * 1000)
          this.endData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
          break
        case 3:
          beforeTime.setTime(beforeTime.getTime() - 2 * 24 * 60 * 60 * 1000)
          beforeMonth = (beforeTime.getMonth() + 1).toString().padStart(2, '0')
          this.startData = year + '-' + beforeMonth + '-' + beforeTime.getDate().toString().padStart(2, '0')
          beforeTime.setTime(beforeTime.getTime() + 6 * 24 * 60 * 60 * 1000)
          this.endData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
          break
        case 2:
          beforeTime.setTime(beforeTime.getTime() - 1 * 24 * 60 * 60 * 1000)
          beforeMonth = (beforeTime.getMonth() + 1).toString().padStart(2, '0')
          this.startData = year + '-' + beforeMonth + '-' + beforeTime.getDate().toString().padStart(2, '0')
          beforeTime.setTime(beforeTime.getTime() + 6 * 24 * 60 * 60 * 1000)
          this.endData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
          break
        case 1:
          if (this.titleName === '主播类型') {
            now.setTime(now.getTime() - 24 * 60 * 60 * 1000)
            this.weekVal = now.getTime()
            beforeTime.setTime(beforeTime.getTime() - 7 * 24 * 60 * 60 * 1000)
            beforeMonth = (beforeTime.getMonth() + 1).toString().padStart(2, '0')
            this.startData = year + '-' + beforeMonth + '-' + beforeTime.getDate().toString().padStart(2, '0')
            beforeTime.setTime(beforeTime.getTime() + 6 * 24 * 60 * 60 * 1000)
            this.endData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
          } else {
            this.startData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
            beforeTime.setTime(beforeTime.getTime() + 6 * 24 * 60 * 60 * 1000)
            this.endData = year + '-' + month + '-' + beforeTime.getDate().toString().padStart(2, '0')
          }
          break
      }
      if (this.cycleInfo === '日') {
        this.listQuery.dateTimeFrom = this.dayVal + ' 00:00:00'
        this.listQuery.dateTimeTo = this.dayVal + ' 23:59:59'
        this.listQuery.type = 0
      } else if (this.cycleInfo === '周') {
        this.listQuery.dateTimeFrom = this.startData + ' 00:00:00'
        this.listQuery.dateTimeTo = this.endData + ' 23:59:59'
        this.listQuery.type = 1
      } else {
        this.listQuery.dateTimeFrom = dayjs(this.monthVal).startOf('month').format('YYYY-MM-DD') + ' 00:00:00'
        this.listQuery.dateTimeTo = dayjs(this.monthVal).endOf('month').format('YYYY-MM-DD') + ' 23:59:59'
        this.listQuery.type = 2
      }
      if (this.useNumber === 5) {
        this.listQuery.dateTimeFrom = undefined
        this.listQuery.dateTimeTo = undefined
      }
      this.handSearch()
    },
    handleChange(value) {
      console.log(value)
    },
    handSearch() {
      this.$parent.listQuery.keyword = this.listQuery.keyword
      this.$emit('getData', this.listQuery)
    },
    seletTime(data) {
      if (data === null) {
        this.listQuery.dateTimeFrom = undefined
        this.listQuery.dateTimeTo = undefined
      } else {
        this.listQuery.dateTimeFrom = data + ' 00:00:00'
        this.listQuery.dateTimeTo = data + ' 23:59:59'
      }
      this.handSearch()
    },
    seletTimeWeek() {
      if (this.weekVal === null) {
        this.listQuery.dateTimeFrom = undefined
        this.listQuery.dateTimeTo = undefined
      } else {
        this.startData = dayjs(this.weekVal).startOf('week').add(1, 'day').format('YYYY-MM-DD')
        this.endData = dayjs(this.weekVal).endOf('week').add(1, 'day').format('YYYY-MM-DD')
        this.listQuery.dateTimeFrom = this.startData + ' 00:00:00'
        this.listQuery.dateTimeTo = this.endData + ' 23:59:59'
      }
      this.handSearch()
    },
    seletTimeMonth() {
      if (this.monthVal === null) {
        this.listQuery.dateTimeFrom = undefined
        this.listQuery.dateTimeTo = undefined
      } else {
        this.startData = dayjs(this.monthVal).startOf('month').format('YYYY-MM-DD')
        this.endData = dayjs(this.monthVal).endOf('month').format('YYYY-MM-DD')
        this.listQuery.dateTimeFrom = this.startData + ' 00:00:00'
        this.listQuery.dateTimeTo = this.endData + ' 23:59:59'
      }
      this.handSearch()
    },
    selectCustomeTime() {
      if (this.customValue === null) {
        this.listQuery.dateTimeFrom = undefined
        this.listQuery.dateTimeTo = undefined
      } else {
        this.listQuery.dateTimeFrom = this.customValue[0] + ' 00:00:00'
        this.listQuery.dateTimeTo = this.customValue[1] + ' 23:59:59'
      }
      this.handSearch()
    },
    changeType(data) {
      this.cycleInfo = data
      if (this.isHistory) {
        this.initHistoryTime()
      } else {
        this.timeChoose()
      }
    },
    changeFansNum(data) {
      for (var item of this.fansList) {
        if (item.value === data) {
          this.listQuery.followerTo = item.followerTo
          this.listQuery.followerFrom = item.followerFrom
        }
      }
      this.handSearch()
    },
    lookMore(type) {
      if (type) {
        this.authorBoolean = !this.authorBoolean
      } else {
        this.categoryBoolean = !this.categoryBoolean
      }
    },
    chooseSecond(event, type, data) {
      if (data === undefined) {
        return
      }
      this.categoryData = []
      var dataArr
      // if (!type) {
      //   dataArr = this.categorySecond
      //   this.allName = this.childProdName
      if (type) {
        dataArr = this.tagSecond
        this.allName = this.childUserName
        this.secondInfo = true
        this.isWho = type
        for (var item of dataArr) {
          if (item.parentId === data) {
            this.categoryData.push(item)
          }
        }
      }
      if (event.target !== undefined && event.target !== null) {
        this.$nextTick(() => {
          this.secondInfoCssObj = {
            position: 'absolute',
            top: event.target.getBoundingClientRect().top - (event.target.getBoundingClientRect().height / 1.4) + 'px',
            left: event.target.getBoundingClientRect().x - 240 - (this.$refs.secodeArea.getBoundingClientRect().width / 2) + ((event.target.getBoundingClientRect().right - event.target.getBoundingClientRect().left) / 2) + 'px'
          }
        })
      }
    },
    changeNumber(data) {
      if (this.useNumber === 1 || this.useNumber === 2 || this.useNumber === 3) {
        this.liveType = data
        this.listQuery.hasGoodsLive = data
        this.$parent.listQuery.hasGoodsLive = data
      } else {
        this.liveType = data
        this.listQuery.hasRoomGoodsLive = data
        this.$parent.listQuery.hasRoomGoodsLive = data
      }
      this.$emit('getData', this.listQuery)
    },
    notChooseSecond() {
      if (this.chooseBoolean) {
        this.secondInfo = true
      } else {
        this.secondInfo = false
      }
    },
    secodeMouse() {
      this.secondInfo = true
      this.chooseBoolean = true
    },
    notSecodeMouse() {
      this.secondInfo = false
      this.chooseBoolean = false
    },
    selectMe(data, type) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true)
        return
      }
      var firstObj = {}
      if (type) {
        this.userId = data.name
        firstObj.firstName = 'user'
        firstObj.tid = data.tid
        if (data.seconde === undefined) {
          this.childUserName = undefined
        }
      } else {
        this.prodId = data.name
        firstObj.firstName = 'prod'
        firstObj.cid = data.cid
        if (data.seconde === undefined) {
          this.childProdName = undefined
        }
      }
      firstObj.name = data.name
      firstObj.selectData = data
      for (var i = 0; i < this.selectList.length; i += 1) {
        if (data.name === '全部') {
          if (data.nameLabel === 'user') {
            this.listQuery.tagId = undefined
            this.listQuery.tagIdLevelTwo = undefined
          } else {
            this.listQuery.firstCid = undefined
            this.listQuery.categoryIdTwo = undefined
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
    selectSecode(data) {
      if (isFreeMembership()) {
        this.$refs.major.initData(true)
        return
      }
      var dataArr
      var parentObj
      if (!this.isWho) {
        dataArr = this.categorySecond
      } else {
        dataArr = this.tagList
      }
      for (var item of dataArr) {
        if (!this.isWho) {
          if (item.cid === data.parentId) {
            this.prodId = item.name
            parentObj = item
            parentObj.firstName = 'prod'
            parentObj.seconde = data
            this.childProdName = data.name
          }
        } else {
          if (item.tid === data.parentId) {
            this.userId = item.name
            parentObj = item
            parentObj.firstName = 'user'
            parentObj.seconde = data
            this.childUserName = data.name
          }
        }
      }
      this.allName = data.name
      for (var i = 0; i < this.selectList.length; i += 1) {
        if (this.selectList[i].firstName === parentObj.firstName) {
          this.selectList[i] = parentObj
          this.getSelectID()
          return
        }
      }
      this.selectList.push(parentObj)
      this.getSelectID()
    },
    getSelectID() {
      for (var item of this.selectList) {
        if (item.firstName === 'user') {
          this.listQuery.tagId = item.tid
          if (item.seconde === undefined) {
            this.listQuery.tagIdLevelTwo = undefined
          } else {
            this.listQuery.tagIdLevelTwo = item.seconde.tid
          }
        } else {
          this.listQuery.firstCid = item.cid
          if (item.seconde === undefined) {
            this.listQuery.categoryIdTwo = undefined
          } else {
            this.listQuery.categoryIdTwo = item.seconde.cid
          }
        }
      }
      this.$emit('getData', this.listQuery)
    },
    deleteMe(data) {
      if (data.firstName === 'user') {
        this.listQuery.tagId = undefined
        this.listQuery.tagIdLevelTwo = undefined
        this.userId = '全部'
        this.childUserName = undefined
      } else {
        this.listQuery.firstCid = undefined
        this.listQuery.categoryIdTwo = undefined
        this.prodId = '全部'
        this.childProdName = undefined
      }
      this.selectList.splice(data, 1)
      this.$emit('getData', this.listQuery)
    },
    handeInput() {
      console.log('111')
      this.$emit('getData', this.listQuery)
    },
    isFreeMembership() {
      return isFreeMembership()
    }
  }
}
</script>
<style scoped lang="scss">
  .filterArea-container{
    margin-top: 20px;
    padding-bottom: 41px;
    border-bottom: 1px solid #EBEEF5;
    margin-bottom: 20px;
    .selectArea, .oneSelect{
      display: flex;
      align-items: center;
      flex-flow: wrap;
      .oneSelect{
        margin-bottom: 24px;
      }
    }
    .authorArea{
      display: flex;
      // align-items: center;
      .authorList{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        height: 33px;
        overflow: hidden;
        .authorType{
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
      .lookeMore{
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0E71EB;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
      }
    }
    .chooseList, .chooseArea{
      display: flex;
      align-items: center;
    }
    .chooseArea{
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
        .delete{
          cursor: pointer;
          margin-left: 10px;
          font-size: 10px;
        }
      }
    }
    .cycleArea{
      justify-content: space-between;
      .selectCsass{
        margin-left: 16px;
        width: 250px;
      }
    }
  }
  .selectArea>div:nth-child(2) {
    margin: 0 40px;
  }
  .canSeeAll{
    height: 100% !important;
  }
  .pubilcSubtitle1{
    height: 32px;
    line-height: 36px;
  }
  .secodeArea{
    background: #FFFFFF;
    box-shadow: 0 2px 15px 0 rgba(0,0,0,.15);
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    padding: 16px 20px;
    position: absolute;
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 14px;
    flex-wrap: wrap;
    .secodeCartogy:hover{
      color: #0E71EB;
    }
  }
  .secodeArea>div{
    cursor: pointer;
  }
  .secodeArea>div:not(:first-child){
    margin-left: 16px;
  }
  .popper__arrow:before{
    content: '';
    width: 1px;
    border: 8px solid transparent;
    border-bottom-color: #FFFFFF;
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  /deep/ .el-radio-button--medium .el-radio-button__inner{
    padding: 6px 14px;
  }
  .open{
    margin-top: 22px;
  }
  .open1 {
    margin-top: 16px;
  }
  .nameActive {
    color: #0E71EB !important;
  }
  .parentAuchot::after {
    clear: both;
    display: block;
    content: "";
  }
</style>
