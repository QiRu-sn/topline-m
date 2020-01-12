import { creatAPI } from '../utils/request'
// 获取联想建议数据
export const getSuggestions = data => creatAPI('/app/v1_0/suggestion', 'GET', data)
// 获取历史记录数据
export const getHistories = data => creatAPI('/app/v1_0/search/histories', 'GET')
