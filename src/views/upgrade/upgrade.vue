<template>
  <div class="app-container">
    <div class="update">
      <el-timeline class="chil">
        <h3>pc端升级记录</h3>
        <el-timeline-item v-for="item of list" :key="item.id" :timestamp="item.time" placement="top">
          <el-card>
            <h4>{{ item.title }}</h4>
            <p v-for="childItem of item.content" :key="childItem.childId">{{ childItem.text }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-timeline class="chil">
        <h3>小程序升级记录</h3>
        <el-timeline-item v-for="item of xcxlist" :key="item.id" :timestamp="item.time" placement="top">
          <el-card>
            <h4>{{ item.title }}</h4>
            <p v-for="childItem of item.content" :key="childItem.childId">{{ childItem.text }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upgrade',
  data() {
    return {
      list: [{
        id: 24,
        title: '更新以下PC端功能',
        time: '2021/4/6',
        content: [{
          childId: 1,
          text: '更新了搜索跳转的bug， 弹窗居中，按钮样式，新增直播可以拖动的功能'
        }]
      }, {
        id: 23,
        title: '更新以下PC端功能',
        time: '2021/3/31',
        content: [{
          childId: 1,
          text: '修改了搜索的分页显示'
        }]
      }, {
        id: 22,
        title: '更新以下PC端功能',
        time: '2021/3/29',
        content: [{
          childId: 1,
          text: '新增我的监控监控历史的方法'
        }]
      }, {
        id: 21,
        title: '更新以下PC端功能',
        time: '2021/3/29',
        content: [{
          childId: 1,
          text: '新增我的监控，我的抖音号的方法'
        }]
      }, {
        id: 20,
        title: '更新以下PC端功能',
        time: '2021/3/26',
        content: [{
          childId: 1,
          text: '新增我的监控的方法'
        }]
      }, {
        id: 19,
        title: '更新以下PC端功能',
        time: '2021/3/19',
        content: [{
          childId: 1,
          text: '新增搜索跳转到各个榜单中携带参数过去的功能'
        }, {
          childId: 2,
          text: '直播间商品列表新增关联状态一列'
        }]
      }, {
        id: 18,
        title: '更新以下PC端功能',
        time: '2021/3/20',
        content: [{
          childId: 1,
          text: '新增实例页功能'
        }]
      }, {
        id: 17,
        title: '更新以下PC端功能',
        time: '2021/3/19',
        content: [{
          childId: 1,
          text: '新增搜索跳转到各个榜单中携带参数过去的功能'
        }, {
          childId: 2,
          text: '直播间商品列表新增关联状态一列'
        }]
      }, {
        id: 16,
        title: '更新以下PC端功能',
        time: '2021/3/18',
        content: [{
          childId: 1,
          text: '自定列上新增角标处理'
        }, {
          childId: 2,
          text: '主播详情粉丝粉丝处作品赞和作品数数据错误的处理'
        }]
      }, {
        id: 15,
        title: '更新以下PC端功能',
        time: '2021/3/17',
        content: [{
          childId: 1,
          text: '新增自定义列功能'
        }, {
          childId: 2,
          text: '处理了商品榜类目为空时不显示'
        }]
      }, {
        id: 14,
        title: '更新以下PC端功能',
        time: '2021/3/16',
        content: [{
          childId: 1,
          text: '周选择默认为当周 星期天也是当周处理，主播榜里面的周如果是星期一默认显示上周的数据'
        }]
      }, {
        id: 13,
        title: '更新以下PC端功能',
        time: '2021/3/15',
        content: [{
          childId: 1,
          text: '商品详情新增下提示，小店详情商品榜新增下架标识和筛选功能'
        }, {
          childId: 2,
          text: '处理了小时榜单在ios上报NAN的错误'
        }, {
          childId: 3,
          text: '新增回车搜索功能，关键词搜索框区域'
        }, {
          childId: 4,
          text: '点击商品详情页的店铺名称去店铺详情页功能'
        }, {
          childId: 5,
          text: '新增了版本更新方法，处理了直播详情中图表的精度丢失的问题'
        }]
      }, {
        id: 12,
        title: '更新以下PC端功能',
        time: '2021/3/12',
        content: [{
          childId: 1,
          text: '首页搜索收录新增提示功能'
        }, {
          childId: 2,
          text: '修改了收录主播成功之后跳转到详情没有带上参数的bug'
        }]
      }, {
        id: 11,
        title: '更新以下PC端功能',
        time: '2021/3/11',
        content: [{
          childId: 1,
          text: '修改了我关注的主播间分页显示错误的bug'
        }, {
          childId: 2,
          text: '修改了修改密码 提示标语错误的bug，修改了主播详情中有地区却没有显示的bug'
        }, {
          childId: 3,
          text: '修复了主播详情中，互动率显示错误的bug'
        }]
      }, {
        id: 10,
        title: '更新以下PC端功能',
        time: '2021/3/10',
        content: [{
          childId: 1,
          text: '首页版本信息无的bug 修正'
        }, {
          childId: 2,
          text: '直播详情时间段显示单个，和数据不正确的bug'
        }]
      }, {
        id: 9,
        title: '更新以下PC端功能',
        time: '2021/3/9',
        content: [{
          childId: 1,
          text: '直播关注接口有问题 后端排查'
        }, {
          childId: 2,
          text: '首页关注的四个栏目为空时不显示，关注个数以修正，实时直播榜筛选已修正，数据大屏提示已修正，关注直播开播场次已修正'
        }, {
          childId: 3,
          text: '主播详情地区和简介为空时不显示，直播详情后端返回-时显示NAN 已修正。关注小店取消关注错误异常已修正'
        }, {
          childId: 4,
          text: '修改密码和设置密码页面加上logo，历史小时停播判断已经添加'
        }]
      }, {
        id: 8,
        title: '更新以下PC端功能',
        time: '2021/3/8',
        content: [{
          childId: 1,
          text: 'PC端新增数据说明'
        }, {
          childId: 2,
          text: '商品列表和我关注的商品列表新增下架提示样式'
        }]
      }, {
        id: 7,
        title: '更新以下PC端功能',
        time: '2021/3/5',
        content: [{
          childId: 1,
          text: '修复了主播详情商品点击商品名称跳转到详情报错的bug'
        }]
      }, {
        id: 6,
        title: '更新以下PC端功能',
        time: '2021/3/4',
        content: [{
          childId: 1,
          text: '修复了小时选择榜时间选择无法出现的问题，还有跨天的bug'
        }]
      }, {
        id: 5,
        title: '更新以下PC端功能',
        time: '2021/3/2',
        content: [{
          childId: 0,
          text: '新增设置登录密码和修改密码API'
        }, {
          childId: 1,
          text: '直播详情商品图新增边框，小店详情和商品详情内顶部信息数据快对齐'
        }, {
          childId: 2,
          text: '主播详情中直播记录在播状态新增在播提示，主播详情头像在播状态新增提示'
        }, {
          childId: 3,
          text: '4个法条页面的默认字体颜色改成 #424448，type为3时空白处取消'
        }, {
          childId: 4,
          text: '从发条页面关于我们顶部出现异常修复，pro页面字体大小和宽度修正，pro和非pro样式也以修正'
        }, {
          childId: 5,
          text: '点击头像出现的选项框升级pro 和pro剩余样式以修正'
        }, {
          childId: 6,
          text: '账户详情页面内容已经修正，登录页面短信验证登录时底部绑定修改为登录，所有的获取验证码以修正'
        }, {
          childId: 7,
          text: '观众分析不显示，主播详情中，粉丝分析，电商分析， 直播趋势分析以添加没数据提示'
        }, {
          childId: 8,
          text: '修复了从详情页退出登录在登录回到详情页报错的bug'
        }, {
          childId: 9,
          text: '专业版和非专业版顶部logo 不同'
        }, {
          childId: 10,
          text: '所有数据大屏样式都已修改, 提示功能都已经加上'
        }]
      }, {
        id: 4,
        title: '更新以下PC端功能',
        time: '2021/3/1',
        content: [{
          childId: 0,
          text: '首页我关注的主播最近直播加入跳转到直播详情功能'
        }, {
          childId: 1,
          text: '首页各个类目 为空时不显示， 直播点击昵称是跳转到主播详情'
        }, {
          childId: 2,
          text: '首页栏目的标题隐藏到顶是才会隐藏，增加了鼠标经过显示背景颜色的功能， 收藏直播不是带货主播显示音浪收入字段'
        }, {
          childId: 3,
          text: '实时直播榜单开播时间筛选换成开播时长，点击数据大屏显示提示，小时榜单筛选时间为当前时间的前5个小时'
        }, {
          childId: 4,
          text: '直播筛选为带货和全部，品类和主播类型筛选区域在之前的距离上减去16'
        }, {
          childId: 5,
          text: '我关注的主播和我收藏的直播取消统计周期功能，筛选也已经修正，只有详情和搜索功能加上了pro 和 非pro的判断'
        }]
      }, {
        id: 3,
        title: '更新以下PC端功能',
        time: '2021/2/27',
        content: [{
          childId: 0,
          text: '（后端个人信息接口）需要返回告诉我是否设置过密码'
        }, {
          childId: 1,
          text: '所有主播榜 类型字段显示修改'
        }, {
          childId: 2,
          text: '新增主播详情中销售品类鼠标经过不显示提示'
        }, {
          childId: 3,
          text: '最近开播时间新增显示字段latestLiveTimeExplain'
        }, {
          childId: 4,
          text: '主播详情，直播详情品类销售图表数据多的放在前面'
        }, {
          childId: 5,
          text: '除了关注主播之外 所以主播新增收录功能'
        }]
      }, {
        id: 33,
        title: '更新以下PC端功能',
        time: '2021/2/25',
        content: [{
          childId: 0,
          text: '修改了主播详情中直播趋势分析柱状图顶部为直播场次，y轴显示小时不带单位 (为零时不显示提示暂不考虑)'
        }, {
          childId: 1,
          text: '新增主播详情中销售品类鼠标经过不显示提示'
        }]
      }, {
        id: 2,
        title: '更新以下PC端功能',
        time: '2021/2/24',
        content: [{
          childId: 0,
          text: '修复了登录短信有手机号却提示输入手机号的bug'
        }, {
          childId: 1,
          text: '粉丝筛选一栏新增全部选项'
        }, {
          childId: 2,
          text: '修改了直播详情，主播详情中的销售品类图UI样式'
        }, {
          childId: 3,
          text: '修改了商品榜，关注商品榜上架筛选传值问题'
        }]
      }, {
        id: 1,
        title: '更新以下PC端功能',
        time: '2021/2/23',
        content: [{
          childId: 0,
          text: '修复了直播详情 和主播详情中的电商记录 品类筛选无数据的BUG'
        }, {
          childId: 1,
          text: '修复了直播详情 和主播详情中的电商记录 销量品类有数据时没有显示的bug'
        }, {
          childId: 2,
          text: '新增了登录注册忘记密码的短信API, 解决了侧边菜单栏无法滚动到底部的问题'
        }, {
          childId: 3,
          text: '解决了第一次搜索loading 没居中的问题，登录注册记录手机号'
        }, {
          childId: 4,
          text: '商品详情， 小店详情新增原始网页跳转功能, 新增带货品类筛选字段'
        }, {
          childId: 5,
          text: '直播详情， 主播详情，里面带货记录全部新增访问方法'
        }, {
          childId: 6,
          text: '直播详情， 主播详情 销售品类分析一栏数据处理，总和为100%'
        }, {
          childId: 7,
          text: '主播详情直播趋势柱状图新增顶部数字，y轴显示数据为时长，数据为零时不显示'
        }]
      }, {
        id: 0,
        title: '更新以下PC端功能',
        time: '2021/2/22',
        content: [{
          childId: 0,
          text: 'PC端新增升级记录用来处理版本更新信息'
        }, {
          childId: 1,
          text: '直播记录中带货记录为空时不显示'
        }, {
          childId: 2,
          text: '小时直播榜新增小时筛选功能'
        }, {
          childId: 3,
          text: '直播详情，主播记录详情商品列表后端没返回关注字段'
        }, {
          childId: 4,
          text: '主播详情中的直播记录，电商分析表格置顶功能新增'
        }, {
          childId: 5,
          text: '新增搜索功能'
        }, {
          childId: 6,
          text: '解决了搜索区域层级问题'
        }]
      }],
      xcxlist: [{
        id: 19,
        title: '更新以下功能',
        time: '2021/4/6',
        content: [{
          childId: 0,
          text: '直播详情，主播详情新增复制抖音号功能，亿元问题取消四舍五入，创意素材放开，对接创作达人接口'
        }]
      }, {
        id: 18,
        title: '更新以下功能',
        time: '2021/3/31',
        content: [{
          childId: 0,
          text: '新增了一键暂停了所有监控的方法，主播系列 标签内容字段的替换，首页查看更多跳转到对应的类目下'
        }]
      }, {
        id: 17,
        title: '更新以下功能',
        time: '2021/3/30',
        content: [{
          childId: 0,
          text: '新增我的监控历史的方法'
        }]
      }, {
        id: 16,
        title: '更新以下功能',
        time: '2021/3/29',
        content: [{
          childId: 0,
          text: '新增我的抖音号，我的监控，我的订阅的方法'
        }]
      }, {
        id: 15,
        title: '更新以下功能',
        time: '2021/3/20',
        content: [{
          childId: 0,
          text: '新增实例页功能'
        }]
      }, {
        id: 14,
        title: '更新以下功能',
        time: '2021/3/19',
        content: [{
          childId: 0,
          text: '修改了首页商品榜字段显示错误的问题'
        }]
      }, {
        id: 13,
        title: '更新以下功能',
        time: '2021/3/18',
        content: [{
          childId: 0,
          text: '修改了直播销售额数据为null的问题'
        }]
      }, {
        id: 12,
        title: '更新以下功能',
        time: '2021/3/17',
        content: [{
          childId: 0,
          text: '修改了我关注系列的非pro弹窗的样式问题'
        }]
      }, {
        id: 11,
        title: '更新以下功能',
        time: '2021/3/16',
        content: [{
          childId: 0,
          text: '新增上架商品人气峰值字段'
        }, {
          childId: 1,
          text: '升级完之后 我的信息没变的问题，处理了授权完之后要手动刷新的问题'
        }, {
          childId: 2,
          text: '直播榜小时音浪和销售额 四舍五入'
        }]
      }, {
        id: 10,
        title: '更新以下功能',
        time: '2021/3/12',
        content: [{
          childId: 0,
          text: '对所有图片新增了webp处理'
        }, {
          childId: 1,
          text: '给我的关注系列新增为空时的样式'
        }, {
          childId: 2,
          text: '修改了我关注的主播，直播的UI样式'
        }]
      }, {
        id: 9,
        title: '更新以下功能',
        time: '2021/3/11',
        content: [{
          childId: 0,
          text: '小程序搜索切换取消了关联页数的bug，搜索主播去详情时 新增先收录主播的功能'
        }, {
          childId: 1,
          text: '修复了直播小时榜小时切换无效的bug，我的联系客服没有弹窗的bug'
        }, {
          childId: 2,
          text: '修复了商品关联直播间无法直播详情的bug，主播详情，直播详情中的商品取消了售价排序'
        }, {
          childId: 3,
          text: '新增直播详情点击主播名称跳转到主播详情的功能'
        }, {
          childId: 4,
          text: '修复了我关注的商品，小店总销量排序错误的bug'
        }]
      }, {
        id: 8,
        title: '更新以下功能',
        time: '2021/3/10',
        content: [{
          childId: 0,
          text: '修复了图表造成页面上下滚动困难的bug'
        }, {
          childId: 1,
          text: '非pro弹窗关闭按钮的问题'
        }]
      }, {
        id: 7,
        title: '更新以下功能',
        time: '2021/3/9',
        content: [{
          childId: 0,
          text: '更新了石墨文档上的问题'
        }]
      }, {
        id: 6,
        title: '更新以下功能',
        time: '2021/3/8',
        content: [{
          childId: 0,
          text: 'cookie 设置过期时间1天'
        }, {
          childId: 1,
          text: '修改主播详情分享主播柱状图显示的直播场次变成undefined的bug'
        }]
      }, {
        id: 5,
        title: '更新以下功能',
        time: '2021/3/4',
        content: [{
          childId: 0,
          text: '更新了所有图标横向虚线长度缩小 ，柱状图横线由实线 换成虚线 ,品类详情的柱状图柱体颜色更换，'
        }, {
          childId: 1,
          text: '直播时长的柱状体新增选中改变当前柱状体颜色功能'
        }, {
          childId: 2,
          text: '首页实时带货主播排序问题已修正，'
        }, {
          childId: 3,
          text: '曲线图圆圈大小已缩小，授权过我的页面还是显示登陆问题已修改 '
        }]
      }, {
        id: 4,
        title: '更新以下功能',
        time: '2021/3/4',
        content: [{
          childId: 0,
          text: '修复了小时选择榜时间选择无法出现的问题，还有跨天的bug'
        }, {
          childId: 1,
          text: '去掉tab页的标题, 添加了联系客服卡片, 取消了非pro版本列表上升 PRO上面出现没有更多的提示 取消了观众分析模块'
        }, {
          childId: 2,
          text: '小时榜时间选择为，当前时间前五个小时, 非刘海屏的吸底菜单UI已修正,'
        }]
      }, {
        id: 3,
        title: '更新以下功能',
        time: '2021/2/26',
        content: [{
          childId: 0,
          text: '修改了小程序主播详情，商品详情，小店详情样式, 隐藏了我的任务中心一栏'
        }]
      }, {
        id: 1,
        title: '更新以下功能',
        time: '2021/2/24',
        content: [{
          childId: 0,
          text: '更新了首页和直播榜单的UI样式'
        }]
      }, {
        id: 0,
        title: '更新以下功能',
        time: '2021/2/23',
        content: [{
          childId: 0,
          text: '新增小程序搜索功能，以及从其他地方进去对应相对应的一栏'
        }]
      }]
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  .update {
    display: flex;
    justify-content: space-between;
  }
  .chil {
    width: 50%;
  }
</style>
