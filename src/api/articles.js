import { creatAPI } from '../utils/request'

export const getArticles = data => creatAPI('/app/v1_1/articles', 'GET', data)
export const getArticleDetails = data => creatAPI(`/app/v1_0/articles/${data.article_id}`, 'GET', data)
