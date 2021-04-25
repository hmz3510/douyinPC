<template>
  <div class="h5">
    <div class="h5-title">长按识别小程序码，访问热抖数据小程序</div>
    <div class="bottom">
      <img src="../../icons/copy.png" alt="">
      <div>内容电商大生态服务商</div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped="scoped">
  .h5{
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #0E71EB 0%, #1850E9 100%);
  }
  .h5-title{
    height: 42px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 42px;
    padding-top: 238px;
    text-align: center;
  }
  .bottom{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
  }
  .bottom >img{
    height: 60px;
    width: 60px;
  }
  .bottom> div{
    height: 42px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 42px;
    margin-top: 10px;
  }
</style>
