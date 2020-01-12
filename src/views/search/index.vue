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
      @cancel="onCancel"
      @focus="isResultsShow=false"
    >
      <div slot="action" @click="$router.back()">取消</div>
    </van-search>
    <!-- /搜索框 -->
    <!-- 搜索结果 -->
    <ArticleList v-if="isResultsShow" :searchText="searchText"/>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell v-for="(item,index) in suggestionList" :key="index"  icon="search" @click='onSearch(item)' >
        <div slot="title" v-html="highLight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->
    <!-- 搜索记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon name="delete" v-if="!isDelShow" @click="isDelShow=true"/>
        <template v-else>
        <span @click="historyList=[]">全部删除</span>&nbsp;&nbsp;&nbsp;
        <span @click="isDelShow=false">完成</span>&nbsp;&nbsp;&nbsp;
        </template>
      </van-cell>
      <van-cell v-for="(item,index) in historyList" :key="index" :title="item" @click="onSearch(item)">
        <van-icon name="close" v-show="isDelShow"  @click="historyList.splice(index,1)"/>
      </van-cell>
    </van-cell-group>
    <!-- /搜索记录 -->
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import ArticleList from './component/articleList'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: {
    ArticleList
  },
  data () {
    return {
      searchText: '',
      suggestionList: [],
      historyList: getItem('user-histories') || [],
      isResultsShow: false,
      isDelShow: false
    }
  },
  methods: {
    async onSearch (value) {
      this.searchText = value
      const index = this.historyList.indexOf(this.searchText)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(this.searchText)
      this.isResultsShow = true
    },
    onCancel () {
      console.log('onCancel')
    },
    // 获取联想建议内容
    async OnsearchInput () {
      const suggestionText = this.searchText.trim()
      if (!suggestionText) {
        this.isDelShow = false
        return
      }
      const { data } = await getSuggestions({ q: suggestionText })
      this.suggestionList = data.data.options
    },
    // 搜索关键字高亮
    highLight (str) {
      return str.toLowerCase().replace(this.searchText.toLowerCase(), `<span style="color:red">${this.searchText}</span>`)
    }
  },
  watch: {
    historyList () {
      setItem('user-histories', this.historyList)
    }
  },
  created () {}
}
</script>

<style lang='less' scoped>
</style>
