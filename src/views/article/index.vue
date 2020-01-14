<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow fixed @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading class="loading" color="#1989fa" v-if="loading" vertical>
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章詳情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image class="avatar" round fit="cover" :src="article.aut_photo" />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate}}</p>
          </div>
        </div>
        <van-button class="follow-btn" type="info" size="small" round>+ 关注</van-button>
      </div>
      <div class="markdown-body" v-html="article.content"></div>
    </div>
    <!-- /文章詳情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="getArticles"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->
    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
      />
      <van-icon
        @click="onCollect"
        color="orange"
        :name="article.is_collected?'star':'star-o'"
      />
      <van-icon
        color="#e5645f"
        name="good-job"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleDetails, removeCollected, addCollected } from '@/api/articles'
export default {
  data () {
    return {
      article: {},
      loading: true
    }
  },
  methods: {
    // 获取文章详情
    async getArticles () {
      this.loading = true
      try {
        const { data } = await getArticleDetails({
          article_id: this.$route.params.articleID
        })
        console.log(data.data)
        this.article = data.data
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    // 收藏和取消收藏
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      if (this.article.is_collected) {
        // 取消收藏
        await removeCollected({
          target: this.$route.params.articleID
        })
        this.$toast.success('取消收藏')
      } else {
        // 添加收藏
        let res = await addCollected({
          target: this.$route.params.articleID
        })
        console.log(res)
        this.$toast.success('收藏成功')
      }

      this.article.is_collected = !this.article.is_collected
    }
  },
  created () {
    this.getArticles()
  }
}
</script>
<style lang='less' scoped>
.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
