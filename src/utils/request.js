import axios from 'axios'
import jsonBig from 'json-bigint'

const request = axios.create({
  // 基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'
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
