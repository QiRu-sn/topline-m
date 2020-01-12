<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
    {{searchText}}
  </div>
</template>

<script>
import { getArticlesList } from '@/api/search'
export default {
  name: 'articleList',
  props: ['searchText'],
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      perpage: 12
    }
  },
  methods: {
    async onLoad () {
      // 1、请求获取数据
      const { data } = await getArticlesList({
        page: this.page,
        perpage: this.perpage,
        q: this.searchText
      })
      // 2、将数据添加至列表中
      const { results } = data.data
      this.list.push(...results)
      // 3、加载状态结束
      this.loading = false
      // 4、判断数据是否加载完成
      if (results) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
