import { creatAPI } from '../utils/request'

export const getArticles = data => creatAPI('/app/v1_1/articles', 'GET', data)
