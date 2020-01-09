<template>
  <div class="tabbarContainer">
      <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="smile-comment-o" to="/questionAnswer">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/userInfo">{{$store.state.user ? '我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
