import { creatAPI } from '../utils/request'

export const getAllChannels = data => creatAPI('/app/v1_0/channels', 'GET', data)
