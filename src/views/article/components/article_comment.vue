<template>
  <div class="article-comments">
    <!-- 评论列表-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate}}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <div slot="right-icon" class="like-container">
      <van-icon
        :color="item.is_liking ? '#e5645f' : ''"
        :name="item.is_liking ? 'good-job' : 'good-job-o'"
      />
      <span>{{ item.like_count ? item.like_count : '赞' }}</span>
    </div>
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getArticleComment } from '@/api/articles'
export default {
  name: 'ArticleComment',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null
    }
  },
  methods: {
    async onLoad () {
    // 1、请求获取数据
      const { data } = await getArticleComment({
        type: 'a',
        source: this.articleId,
        offset: this.offset
      })
      //   // 2、将获取到的数据添加在数组中
      const { results } = data.data
      this.list.push(...results)

      //   // 3、关闭加载状态
      this.loading = false
      // 4、判断是否还有数据
      if (results.length) {
        this.offset = data.data.end_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>
