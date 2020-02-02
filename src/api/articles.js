import { creatAPI } from '../utils/request'

// 获取文章列表
export const getArticles = data => creatAPI('/app/v1_1/articles', 'GET', data)
// 获取文章详情
export const getArticleDetails = data => creatAPI(`/app/v1_0/articles/${data.article_id}`, 'GET', data)
// 取消收藏
export const removeCollected = data => creatAPI(`/app/v1_0/article/collections/${data.target}`, 'DELETE', data)
// 添加收藏
export const addCollected = data => creatAPI('/app/v1_0/article/collections', 'POST', data)
// 取消点赞
export const removeAttitude = data => creatAPI(`/app/v1_0/article/likings/${data.target}`, 'DELETE', data)
// 添加点赞
export const addAttitude = data => creatAPI('/app/v1_0/article/likings', 'POST', data)
// 取消关注
export const removeFollowed = data => creatAPI(`/app/v1_0/user/followings/${data.target}`, 'DELETE', data)
// 添加关注
export const addFollowed = data => creatAPI('/app/v1_0/user/followings', 'POST', data)
// 获取文章评论
export const getArticleComment = data => creatAPI('/app/v1_0/comments', 'GET', data)
