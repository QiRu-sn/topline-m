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
        <van-button
          v-if="!$store.state.user || article.aut_id !== $store.state.user.id"
          @click="onFollowed"
          class="follow-btn"
          :type="article.is_followed?'default':'info'"
          size="small"
          round
        >{{article.is_followed?'已关注':'+ 关注'}}</van-button>
      </div>
      <div class="markdown-body" v-html="article.content"></div>
    </div>
    <!-- /文章詳情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network" />
      <p class="text">亲，网络不给力哦~</p>
      <van-button class="btn" type="default" size="small" @click="getArticles">点击重试</van-button>
    </div>
    <van-divider>正文结束 </van-divider>
    <ArticleComment :articleId='$route.params.articleID'/>
    <!-- /加载失败提示 -->
    <!-- 底部区域 -->
    <div class="footer">
      <van-button class="write-btn" type="default" round size="small" @click="isCommentShow=true">写评论</van-button>
      <van-icon class="comment-icon" name="comment-o" info="10" />
      <van-icon @click="onCollect" color="orange" :name="article.is_collected?'star':'star-o'" />
      <van-icon
        @click="onAttitude"
        color="#e5645f"
        :name="article.attitude===1?'good-job':'good-job-o'"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup
      v-model="isCommentShow"
      position="bottom"
    >
    <div class="post-comment">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button type="primary" size="small">发布</van-button>
    </div>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import './github-markdown.css'
import ArticleComment from './components/article_comment'
import {
  getArticleDetails,
  removeCollected,
  addCollected,
  removeAttitude,
  addAttitude,
  removeFollowed,
  addFollowed
} from '@/api/articles'
export default {
  components: {
    ArticleComment
  },
  data () {
    return {
      article: {},
      loading: true,
      isCommentShow: false,
      message: ''
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
        await addCollected({
          target: this.$route.params.articleID
        })
        this.$toast.success('收藏成功')
      }
      this.article.is_collected = !this.article.is_collected
    },
    // 点赞或取消点赞
    async onAttitude () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      if (this.article.attitude === 1) {
        // 取消点赞
        await removeAttitude({
          target: this.$route.params.articleID
        })
        this.article.attitude = -1
        this.$toast.success('取消成功')
      } else {
        // 添加点赞
        await addAttitude({
          target: this.$route.params.articleID
        })
        this.article.attitude = 1
        this.$toast.success('点赞成功')
      }
    },
    // 关注或取消关注
    async onFollowed () {
      if (this.article.is_followed) {
        // 取消关注
        await removeFollowed({
          target: this.article.aut_id
        })
        this.$toast.success('取消关注成功')
      } else {
        // 添加关注
        await addFollowed({
          target: this.article.aut_id
        })
        this.$toast.success('已关注')
      }
      this.article.is_followed = !this.article.is_followed
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
      color: #3a3a3a;
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
  .post-comment{
    display: flex;
    padding: 10px;
    align-items: flex-end;
  }
  .van-cell{
    background-color: #ececec;
    margin-right: 10px;
  }
}
</style>
