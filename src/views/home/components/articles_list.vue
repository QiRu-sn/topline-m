<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
export default {
  props: ['channel'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      //  1、请求获取数据
      let res = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      //  2、将获取的数据添加到数组列表中
      const results = res.data.data.results

      this.list.push(...results)
      //  3、加载状态结束
      this.loading = false
      //  4、数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = res.data.data.pre_timestamp
      } else {
        // 没有数据了，把 finished 设置为 true，不再加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
