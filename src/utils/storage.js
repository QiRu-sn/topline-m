// 获取本地存储
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 设置本地存储
export const setItem = (name, value) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value
  window.localStorage.setItem(name, data)
}
// 删除本地存储
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
