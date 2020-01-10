<template>
  <div>
    <!-- 已登录状态 -->
    <div class="user-info-wrap" v-if="$store.state.user">
      <div class="base-info-wrap">
        <div class="avatar-title-wrap">
          <van-image class="avatar" round fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="title">黑马程序员</div>
        </div>
        <van-button round size="mini">编辑资料</van-button>
      </div>
      <van-grid class="data-info" :border="false">
        <van-grid-item>
          <span class="count">123</span>
          <span class="text">头条</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">123</span>
          <span class="text">关注</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">123</span>
          <span class="text">粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">123</span>
          <span class="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /已登录状态 -->
    <!-- 未登录 -->
    <div class="noLogin" v-else>
      <div class="avator"></div>
      <div class="clickLogin">
        <span>点击登录</span>
      </div>
    </div>
    <!-- /未登录 -->

    <van-grid clickable :column-num="3">
      <van-grid-item text="我的收藏">
        <van-icon slot="icon" name="star-o" color="#eb5253" />
      </van-grid-item>
      <van-grid-item text="浏览历史">
        <van-icon slot="icon" name="browsing-history-o" color="#ffa023" />
      </van-grid-item>
      <van-grid-item text="作品">
        <van-icon slot="icon" name="edit" color="#678eff" />
      </van-grid-item>
    </van-grid>

    <van-cell-group :border="false">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>

    <van-cell-group v-if="$store.state.user">
      <van-cell
        style="text-align: center;"
        title="退出登录"
        clickable
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.noLogin {
  width: 100%;
  height: 200px;
  background: url("./banner.png") no-repeat;
  background-size: contain;
  position: relative;
  .avator {
    width: 66px;
    height: 66px;
    background: url("./mobile.png") no-repeat;
    background-size: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .clickLogin {
    text-align: center;
    line-height: 300px;
    font-size: 14px;
    color: #fff;
  }
}
.van-cell-group {
  margin-top: 10px;
}
.user-info-wrap {
  background: url("./banner.png") no-repeat;
  height: 200px;
  box-sizing: border-box;
  background-size: cover;
  padding: 40px 20px;
  font-size: 15px;
  color: #fff;
  .base-info-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar-title-wrap {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 15px;
        width: 66px;
        height: 66px;
        padding: 2px;
        background: #fff;
      }
    }
  }
  .data-info {
    ::v-deep .van-grid-item__content {
      background: none;
    }
  }
}
</style>
