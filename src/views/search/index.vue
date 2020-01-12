<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @input="OnsearchInput"
      @search="onSearch"
    >
      <div slot="action">搜索</div>
    </van-search>
    <!-- /搜索框 -->
    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell v-for="(item,index) in suggestionList" :key="index" :title="item" icon="search" />
    </van-cell-group>
    <!-- /联想建议 -->
    <!-- 搜索记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <span>全部删除</span>&nbsp;&nbsp;&nbsp;
        <span>完成</span>&nbsp;&nbsp;&nbsp;
        <van-icon name="delete" />
      </van-cell>
      <van-cell v-for="(item,index) in historyList" :key="index" :title="item">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
    <!-- /搜索记录 -->
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
export default {
  data () {
    return {
      searchText: '',
      suggestionList: [],
      historyList: []
    }
  },
  methods: {
    async onSearch () {
    },
    // 获取联想建议内容
    async OnsearchInput () {
      const suggestionText = this.searchText.trim()
      if (!suggestionText) {
        this.suggestionList = []
      } else {
        const { data } = await getSuggestions({ q: suggestionText })
        this.suggestionList = data.data.options
      }
    }
  },
  created () {}
}
</script>

<style lang='less' scoped>
</style>
