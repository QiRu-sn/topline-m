<template>
  <div>
    <!-- 导航标题栏 -->
    <van-nav-bar title="首页" />
    <!-- /导航标题栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id"></van-tab>
    </van-tabs>
    <!-- /频道列表 -->

  </div>
</template>

<script>
import { getChannels } from '@/api/user'
export default {
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  methods: {
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
</style>
