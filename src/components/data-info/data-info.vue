<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      class="myDialog"
      :append-to-body="true"
    >
      <div class="major-container">
        <div class="title">数据说明</div>
        <div class="info-container">
          <div v-if="dataIndex == 1" class="info-item">
            <div class="sub-info">统计当日每个直播间的数据</div>
          </div>
          <div v-if="dataIndex == 2" class="info-item">
            <div class="sub-info"><span>客单价：</span>直播间带货的总销售额/总销量</div>
            <div class="sub-info"><span>人均贡献：</span>直播间带货的总销售额/总观看人次</div>
            <div class="sub-info"><span>小时销量：</span>直播间带货平均每个小时的销量</div>
            <div class="sub-info"><span>小时销售额：</span>直播间带货平均每个小时的销售额</div>
            <div class="sub-info"><span>小时音浪：</span>直播间平均每个小时的音浪收入</div>
          </div>
          <div v-if="dataIndex == 3 || dataIndex ==15" class="info-item">
            <div class="sub-info">统计每个主播在统计时段内的直播数据，各数据为统计时段内的每场直播数据之和</div>
          </div>
          <div v-if="dataIndex == 4" class="info-item">
            <div class="sub-info">统计每个商品在所有直播间的销售数据，不包含商品短视频带货的销售数据</div>
            <div class="sub-info">7天销量数据指过去7天的销量数据，不包含今天</div>
          </div>
          <div v-if="dataIndex == 5" class="info-item">
            <div class="sub-info">统计每个小店的商品在所有直播间的销售数据，不包含商品短视频带货的销售数据</div>
            <div class="sub-info">7天销量数据指过去7天的销量数据，不包含今天</div>
          </div>
          <div v-if="dataIndex == 6" class="info-item">
            <div class="sub-info">该小店的商品销售数据，不包含只有视频带货的商品</div>
          </div>
          <div v-if="dataIndex == 7" class="info-item">
            <div class="sub-info">统计上架过该商品的直播间相关数据</div>
          </div>
          <div v-if="dataIndex == 8" class="info-item">
            <div class="sub-info">统计该主播自收录起的所有直播间数据</div>
          </div>
          <div v-if="dataIndex == 9" class="info-item">
            <div class="sub-info">直播数据为30日场均数据</div>
          </div>
          <div v-if="dataIndex == 12" class="info-item">
            <div class="sub-info">显示全网当前在播的直播间</div>
            <div class="sub-info">音浪收入的单位是音浪值</div>
          </div>
          <div v-if="dataIndex == 13" class="info-item">
            <div class="sub-info">该直播间的带货商品销售数据</div>
          </div>
          <div v-if="dataIndex == 14" class="info-item">
            <div class="sub-info">统计该主播自收录起的所有直播间带货商品销售数据</div>
          </div>
          <div v-if="dataIndex == 16" class="info-item">
            <div class="sub-info">主播的直播相关数据为近30日所有直播的数据平均值</div>
          </div>
          <div v-if="dataIndex == 17" class="info-item">
            <div class="sub-info">显示我关注的主播数据。直播相关数据为该主播近30天的每场直播数据平均值</div>
          </div>
          <div v-if="dataIndex == 18" class="info-item">
            <div class="sub-info">显示我收藏的直播间相关数据</div>
            <div class="sub-info"><span>客单价：</span>直播间带货的总销售额/总销量</div>
            <div class="sub-info"><span>人均贡献：</span>直播间带货的总销售额/总观看人次</div>
            <div class="sub-info"><span>小时销量：</span>直播间带货平均每个小时的销量</div>
            <div class="sub-info"><span>小时销售额：</span>直播间带货平均每个小时的销售额</div>
            <div class="sub-info"><span>小时音浪：</span>直播间平均每个小时的音浪收入</div>
          </div>
          <div v-if="dataIndex == 19" class="info-item">
            <div class="sub-info">显示我关注的商品相关销售数据，不包含商品短视频带货的销售数据</div>
            <div class="sub-info">7天销量数据指过去7天的销量数据，不包含今天</div>
          </div>
          <div v-if="dataIndex == 20" class="info-item">
            <div class="sub-info">显示我关注的小店相关销售数据，不包含商品短视频带货的销售数据</div>
            <div class="sub-info">7天销量数据指过去7天的销量数据，不包含今天</div>
          </div>
          <div v-if="dataIndex == 25" class="info-item">
            <div class="sub-info">小时带货热度为指数值，表示该直播间在该小时段内的综合带货能力</div>
          </div>
          <div v-if="dataIndex == 26" class="info-item">
            <div class="sub-info">小时音浪增量表示该直播间在该小时段的音浪增加值</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DataInfo',
  props: {
    dataIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style scoped lang="scss">
  .major-container {
    padding: 20px 25px 78px 25px;
  }
  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    line-height: 16px;
  }
  .info-container {
    margin-top: 21px;
  }
  .sub-info {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
    line-height: 24px;
    span {
      display: inline-block;
      width: 90px;
    }
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
