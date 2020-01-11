<template>
  <div class="home-container">
    <!-- 导航标题栏 -->
    <van-nav-bar title="首页" fixed/>
    <!-- /导航标题栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active" >
      <van-icon
        name="wap-nav"
        slot="nav-right"
        @click="show=true"
        />
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <articleList :channel="item"/>
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '93%' }" >
      <channelsList/>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import articleList from './components/articles_list'
import channelsList from './components/channels_list'
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
      let res = await getChannels()
      this.channels = res.data.data.channels
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
    width:100%;
    top: 46px;
    z-index: 1;
  }
.van-icon-wap-nav{
  position: fixed;
  right:0;
  line-height:46px;
  background: #fff;
}
</style>
