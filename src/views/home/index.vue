<template>
  <div class="home-container">
    <!-- 导航标题栏 -->
    <van-nav-bar fixed>
      <div slot="left" class="logo_area"></div>
      <van-button
        class="search-button"
        slot="right"
        round
        type="info"
        size="mini"
        @click="$router.push('/search')"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航标题栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon name="wap-nav" slot="nav-right" @click="show=true" />
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <articleList :channel="item" />
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 弹出频道列表 -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '93%' }"
    >
      <channelsList :channels="channels" @closeDialog="show=false" v-model="active" />
    </van-popup>
    <!-- /弹出频道列表
    :valueChannel='active'-->
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import articleList from './components/articles_list'
import channelsList from './components/channels_list'
import { getItem } from '@/utils/storage'
export default {
  components: {
    articleList,
    channelsList
  },
  data () {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  methods: {
    // 获取用户频道列表
    async getUserChannels () {
      // 判断本地存储是否有数据，如果有则使用本地存储的，没有则调用接口
      let channels = []
      const loadChannels = getItem('userChannels')
      if (loadChannels) {
        channels = loadChannels
      } else {
        let res = await getChannels()
        channels = res.data.data.channels
      }
      this.channels = channels
    }
  },
  created () {
    this.getUserChannels()
  }
}
</script>

<style lang='less' scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
::v-deep .van-tabs__wrap {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 1;
}
.van-icon-wap-nav {
  position: fixed;
  right: 0;
  line-height: 46px;
  background: #fff;
}
.logo_area{
  width:100px;
  height: 30px;
  background: url('./logo-light.png') no-repeat;
  background-size: 100px;
  margin-top: -40px;
}
.search-button {
  width: 173px;
  height: 30px;
  background-color: #5babfb;
}
</style>
