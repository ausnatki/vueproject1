import request from '@/utils/request'

// 获取所有比赛信息列表
export function getAll() {
  return request({
    url: '/api/Compete/Get_CompeteList',
    method: 'get'
  })
}
