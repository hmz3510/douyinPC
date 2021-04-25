
const fansList = [{
  value: '0',
  label: '全部',
  followerFrom: undefined,
  followerTo: undefined
}, {
  value: '1',
  label: '10万以下',
  followerFrom: 1000,
  followerTo: 100000
}, {
  value: '2',
  label: '10万～100万',
  followerFrom: 100000,
  followerTo: 1000000
}, {
  value: '3',
  label: '100万～500万',
  followerFrom: 1000000,
  followerTo: 5000000
}, {
  value: '4',
  label: '500万～1000万',
  followerFrom: 5000000,
  followerTo: 10000000
}, {
  value: '5',
  label: '1000万以上',
  followerFrom: 10000000,
  followerTo: undefined
}]

const liveTypeList = [{
  value: undefined,
  label: '全部'
}, {
  value: 1,
  label: '带货'
}]

const broadcastList = [{
  value: undefined,
  label: '全部'
}, {
  value: 2,
  label: '开播'
}, {
  value: 4,
  label: '停播'
}]

const timerList = [{
  value: '1',
  label: '11.19'
}, {
  value: '2',
  label: '11.20'
}, {
  value: '3',
  label: '11.21'
}, {
  value: '4',
  label: '11.22'
}, {
  value: '5',
  label: '11.23'
}, {
  value: '6',
  label: '11.24'
}]

const weekList = [{
  value: '1',
  label: '10月1日～10月7日'
}, {
  value: '2',
  label: '10月7日～10月14日'
}, {
  value: '3',
  label: '10月14日～10月21日'
}]

const monthList = [{
  value: '1',
  label: '2020年1月'
}, {
  value: '2',
  label: '2020年2月'
}, {
  value: '3',
  label: '2020年3月'
}]

const dailyRankList = [{
  value: '0',
  label: '观众数'
}, {
  value: '1',
  label: '峰值在线'
}, {
  value: '3',
  label: '音浪收入'
}, {
  value: '5',
  label: '直播涨粉'
}, {
  value: '7',
  label: '点赞数'
}, {
  value: '15',
  label: '销量'
}, {
  value: '17',
  label: '销售额'
}, {
  value: '13',
  label: '商品数'
}, {
  value: '11',
  label: '互动率'
}, {
  value: '33',
  label: '直播时长'
}]

const historyList = [{
  value: '0',
  label: '观众数'
}, {
  value: '1',
  label: '峰值在线'
}, {
  value: '3',
  label: '音浪收入'
}, {
  value: '5',
  label: '直播涨粉'
}, {
  value: '7',
  label: '点赞数'
}, {
  value: '15',
  label: '销量'
}, {
  value: '17',
  label: '销售额'
}, {
  value: '19',
  label: '客单价'
}, {
  value: '21',
  label: '人均贡献'
}, {
  value: '23',
  label: '小时销量'
}, {
  value: '25',
  label: '小时销售额'
}, {
  value: '27',
  label: '小时音浪'
}, {
  value: '13',
  label: '商品数'
}, {
  value: '11',
  label: '互动率'
}, {
  value: '33',
  label: '直播时长'
}]

const anchorList = [{
  value: '0',
  label: '粉丝数'
}, {
  value: '1',
  label: '涨粉数'
}, {
  value: '3',
  label: '涨粉率'
}, {
  value: '5',
  label: '开播场次'
}, {
  value: '7',
  label: '带货场次'
}, {
  value: '9',
  label: '直播互动率'
}, {
  value: '11',
  label: '直播时长'
}, {
  value: '13',
  label: '观众数'
}, {
  value: '15',
  label: '音浪收入'
}, {
  value: '17',
  label: '点赞数'
}, {
  value: '19',
  label: '销量'
}, {
  value: '21',
  label: '销售额'
}]

const hotGoodList = [{
  value: '0',
  label: '今日销量'
}, {
  value: '1',
  label: '昨日销量'
}, {
  value: '3',
  label: '7天销量'
}, {
  value: '5',
  label: '总销量'
}, {
  value: '7',
  label: '佣金'
}, {
  value: '9',
  label: '佣金率'
}, {
  value: '11',
  label: '关联直播'
}, {
  value: '13',
  label: '关联主播'
}]

const smallShopList = [{
  value: '0',
  label: '今日销量'
}, {
  value: '1',
  label: '昨日销量'
}, {
  value: '3',
  label: '7天销量'
}, {
  value: '5',
  label: '总销量'
}, {
  value: '7',
  label: '关联直播'
}, {
  value: '9',
  label: '关联主播'
}, {
  value: '13',
  label: '上架商品'
}]

const smallShopDetaiList = [{
  value: '0',
  label: '今日销量'
}, {
  value: '1',
  label: '昨日销量'
}, {
  value: '3',
  label: '7天销量'
}, {
  value: '5',
  label: '总销量'
}, {
  value: '7',
  label: '佣金'
}, {
  value: '9',
  label: '佣金率'
}, {
  value: '11',
  label: '关联直播'
}, {
  value: '13',
  label: '关联主播'
}]

const hotGoodDetailList = [{
  value: '0',
  label: '开播时间'
}, {
  value: '1',
  label: '观众数'
}, {
  value: '3',
  label: '峰值在线'
}, {
  value: '5',
  label: '该商品销量'
}, {
  value: '9',
  label: '转化率'
}]

const liceRecordList = [{
  value: '0',
  label: '观众数'
}, {
  value: '1',
  label: '峰值在线'
}, {
  value: '3',
  label: '音浪收入'
}, {
  value: '5',
  label: '直播涨粉'
}, {
  value: '7',
  label: '点赞数'
}, {
  value: '13',
  label: '商品数'
}, {
  value: '15',
  label: '销量'
}, {
  value: '17',
  label: '销售额'
}, {
  value: '19',
  label: '客单价'
}, {
  value: '21',
  label: '人均贡献'
}, {
  value: '23',
  label: '小时销量'
}, {
  value: '25',
  label: '小时销售额'
}, {
  value: '27',
  label: '小时音浪'
}, {
  value: '31',
  label: '开播时间'
}, {
  value: '33',
  label: '直播时长'
}]

const myTikotokList = [{
  value: '0',
  label: '添加时间'
}, {
  value: '1',
  label: '粉丝数'
}]

const myLookList = [{
  value: '45',
  label: '最近直播'
}, {
  value: '47',
  label: '添加时间'
}, {
  value: '0',
  label: '粉丝数'
}]

const lookHistoryList = [{
  value: '0',
  label: '观众数'
}, {
  value: '1',
  label: '峰值在线'
}, {
  value: '3',
  label: '音浪收入'
}, {
  value: '5',
  label: '直播涨粉'
}, {
  value: '7',
  label: '点赞数'
}, {
  value: '15',
  label: '销量'
}, {
  value: '17',
  label: '销售额'
}, {
  value: '19',
  label: '客单价'
}, {
  value: '21',
  label: '人均贡献'
}, {
  value: '23',
  label: '小时销量'
}, {
  value: '25',
  label: '小时销售额'
}, {
  value: '27',
  label: '小时音浪'
}, {
  value: '13',
  label: '商品数'
}, {
  value: '11',
  label: '互动率'
}, {
  value: '33',
  label: '直播时长'
}, {
  value: '31',
  label: '开播时间'
}]

const realRankList = [{
  value: '29',
  label: '当前人气值'
}, {
  value: '3',
  label: '音浪收入'
}, {
  value: '15',
  label: '销量'
}, {
  value: '17',
  label: '销售额'
}, {
  value: '33',
  label: '直播时长'
}]

const liveDetailList = [{
  value: '0',
  label: '上架时间'
}, {
  value: '1',
  label: '销量'
}, {
  value: '3',
  label: '销售额'
}, {
  value: '5',
  label: '转化率'
}]

const onLineList = [{
  value: '0',
  label: '带货次数'
}, {
  value: '1',
  label: '销量'
}, {
  value: '3',
  label: '销售额'
}, {
  value: '5',
  label: '转化率'
}]

const goodsAnchorList = [{
  value: '0',
  label: '粉丝数'
}, {
  value: '1',
  label: '涨粉数'
}, {
  value: '3',
  label: '涨粉率'
}, {
  value: '5',
  label: '开播场次'
}, {
  value: '7',
  label: '带货场次'
}, {
  value: '9',
  label: '直播互动率'
}, {
  value: '11',
  label: '直播时长'
}, {
  value: '13',
  label: '观众数'
}, {
  value: '15',
  label: '音浪收入'
}, {
  value: '17',
  label: '点赞数'
}, {
  value: '19',
  label: '销量'
}, {
  value: '21',
  label: '销售额'
}]

const anchorDataList = [{
  value: '0',
  label: '粉丝数'
}, {
  value: '1',
  label: '7日涨粉'
}, {
  value: '3',
  label: '7日涨粉率'
}, {
  value: '5',
  label: '30日开播场次'
}, {
  value: '7',
  label: '30日带货场次'
}, {
  value: '9',
  label: '直播互动率'
}, {
  value: '11',
  label: '直播时长'
}, {
  value: '13',
  label: '观众数'
}, {
  value: '15',
  label: '音浪收入'
}, {
  value: '17',
  label: '点赞数'
}, {
  value: '19',
  label: '销量'
}, {
  value: '21',
  label: '销售额'
}, {
  value: '23',
  label: '客单价'
}, {
  value: '25',
  label: '人均贡献'
}, {
  value: '27',
  label: '小时销量'
}, {
  value: '29',
  label: '小时销售额'
}, {
  value: '31',
  label: '小时音浪'
}]

const enjoyUserList = [{
  value: '35',
  label: '关注时间'
}, {
  value: '0',
  label: '粉丝数'
}, {
  value: '1',
  label: '7日涨粉'
}, {
  value: '3',
  label: '7日涨粉率'
}, {
  value: '5',
  label: '30日开播场次'
}, {
  value: '7',
  label: '30日带货场次'
}, {
  value: '9',
  label: '直播互动率'
}, {
  value: '11',
  label: '直播时长'
}, {
  value: '13',
  label: '观众数'
}, {
  value: '15',
  label: '音浪收入'
}, {
  value: '17',
  label: '点赞数'
}, {
  value: '19',
  label: '销量'
}, {
  value: '21',
  label: '销售额'
}, {
  value: '23',
  label: '客单价'
}, {
  value: '25',
  label: '人均贡献'
}, {
  value: '27',
  label: '小时销量'
}, {
  value: '29',
  label: '小时销售额'
}, {
  value: '31',
  label: '小时音浪'
}]

const enjoyLiveList = [{
  value: '35',
  label: '收藏时间'
}, {
  value: '0',
  label: '观众数'
}, {
  value: '1',
  label: '峰值在线'
}, {
  value: '3',
  label: '音浪收入'
}, {
  value: '5',
  label: '直播涨粉'
}, {
  value: '7',
  label: '点赞数'
}, {
  value: '15',
  label: '销量'
}, {
  value: '17',
  label: '销售额'
}, {
  value: '19',
  label: '客单价'
}, {
  value: '21',
  label: '人均贡献'
}, {
  value: '23',
  label: '小时销量'
}, {
  value: '25',
  label: '小时销售额'
}, {
  value: '27',
  label: '小时音浪'
}, {
  value: '13',
  label: '商品数'
}, {
  value: '11',
  label: '互动率'
}, {
  value: '33',
  label: '直播时长'
}]

const qrcodeUrl = 'https://hddt.oss-cn-shanghai.aliyuncs.com/mk/monitor0401.png'

export {
  qrcodeUrl,
  fansList,
  liveTypeList,
  timerList,
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
  weekList,
  monthList,
  broadcastList,
  enjoyUserList,
  enjoyLiveList
}
