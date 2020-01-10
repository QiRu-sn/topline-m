// import request from '@/utils/request'
// // 用户登录请求
// export const login = data => {
//   return request({
//     method: 'POST',
//     url: '/app/v1_0/authorizations',
//     data
//   })
// }
// // 获取验证码
// export const code = mobile => {
//   return request({
//     method: 'GET',
//     url: `/app/v1_0/sms/codes/${mobile}`
//   })
// }
import { creatAPI } from '../utils/request'
// 用户登录
export const login = data => creatAPI('/app/v1_0/authorizations', 'POST', data)
// 获取验证码
export const code = data => creatAPI(`/app/v1_0/sms/codes/${data}`, 'GET')
// 获取用户自己信息
export const getuserInfo = data => creatAPI('/app/v1_0/user', 'GET')
