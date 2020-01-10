<template>
  <div class="home-container">
    <!-- 导航标题栏 -->
    <van-nav-bar title="首页"/>
    <!-- /导航标题栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <articleList :channel="item"/>
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getChannels } from '@/api/user'
import articleList from './components/articles_list'
export default {
  components: {
    articleList
  },
  data () {
    return {
      active: 0,
      channels: []
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
  // padding-top: 90px;
  padding-bottom: 50px;
}
</style>
