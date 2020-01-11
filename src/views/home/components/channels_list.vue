<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in channels"
        :key="value.id"
        :text="value.name"
      />
    </van-grid>
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in remainChannels"
        :key="value.id"
        :text="value.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  name: 'channel',
  props: ['channels'],
  data () {
    return {
      show: false,
      allChannels: []
    }
  },
  methods: {
    //  获取全部频道列表
    async getAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  },
  created () {
    this.getAllChannels()
  },
  computed: {
    //   剩余频道=所有频道-我的频道
    remainChannels () {
      const { channels, allChannels } = this
      const reChannels = []
      allChannels.forEach(item => {
        if (!channels.find(channel => channel.id === item.id)) {
          reChannels.push(item)
        }
      })
      return reChannels
    }
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  padding: 40px 0;
}
</style>
