import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'

const request = axios.create({
  // 基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export const creatAPI = (url, method, data) => {
  let config = {}
  if (method === 'GET') {
    config.params = data
  } else {
    config.data = data
  }

  return request({
    url,
    method,
    ...config
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// 解决超出安全整数范围数据失真问题
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {
    return {}
  }
}]

export default request
