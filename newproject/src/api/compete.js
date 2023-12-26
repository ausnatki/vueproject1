import request from '@/utils/request'

// 获取所有比赛信息列表
export function getAll() {
  return request({
    url: '/api/Compete/Get_CompeteList',
    method: 'get'
  })
}

// 创建一个比赛信息
export function CreateCompete(data) {
  return request({
    url: '/api/Compete/Create_Compete',
    method: 'post',
    data
  })
}
