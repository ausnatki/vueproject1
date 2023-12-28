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

// 获取所有报名信息
export function Get_EnrollList(data) {
  return request({
    url: '/api/Compete/Get_EnrollList',
    method: 'get',
    params: { data }
  })
}

// 比赛报名
export function CreateEnroll(data) {
  return request({
    url: '/api/Compete/Create_Enroll',
    method: 'post',
    data
  })
}

// 审核
export function Examin(data) {
  return request({
    url: '/api/Compete/Examin',
    method: 'post',
    data
  })
}

// 修改比赛详情
export function EditCompete(data) {
  return request({
    url: '/api/Compete/Edit_Compete',
    method: 'post',
    data
  })
}
