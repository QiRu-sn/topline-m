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
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  props: ['channels'],
  data () {
    return {
      show: false
    }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  padding: 40px 0;
}
</style>
