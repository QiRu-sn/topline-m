<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="isEditShow=!isEditShow">{{isEditShow?'完成':'编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item,index) in channels"
        :key="item.id"
        @click="toggleChannels(item,index)"
      >
      <span
          slot="text"
          class="text"
          :class="{ active: value === index }"
        >{{ item.name}}</span>
      <van-icon v-show="isEditShow&& index!==0"  class="close-icon"  slot="icon"  name="close" size="20"  />
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="item in remainChannels"
        :key="item.id"
        :text="item.name"
        @click="addChannels(item)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
import { setItem } from '@/utils/storage'
export default {
  props: ['channels', 'value'],
  data () {
    return {
      show: false,
      allChannels: [],
      isEditShow: false
    }
  },
  methods: {
    //  获取全部频道列表
    async getAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 从推荐列表添加至我的列表
    addChannels (channel) {
      this.channels.push(channel)
    },
    toggleChannels (channels, index) {
      // 如果isEditShow为true，说明是删除
      if (this.isEditShow && index !== 0) {
        this.channels.splice(index, 1)
      } else {
        // 否则为跳转至频道列表
        // 将index传给父组件
        this.$emit('input', index)
        // 通知父组件关闭弹层
        this.$emit('closeDialog')
      }
    }
    // 加载用户本地存储频道数据
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
  },
  watch: {
    channels () {
      // 设置数据持久化，存入本地存储
      setItem('userChannels', this.channels)
    }
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  padding: 40px 0;
}
::v-deep .van-grid-item__icon-wrapper {
  position: absolute;
  top: -15px;
  right: -10px;
}
.text {
    font-size: 14px;
  }
.active{
    color:red
}
</style>
