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
export function CreateEnroll(data, userName) {
  return request({
    url: '/api/Compete/Create_Enroll',
    method: 'post',
    data: data,
    params: { UserName: userName }
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

// 修改比赛详情
export function getState(competeid, name) {
  return request({
    url: '/api/Compete/Get_Stateinfo',
    method: 'get',
    params: { competeid, name }
  })
}

// 用户查看自己报名信息
export function GetEnrollByName(name, cid) {
  return request({
    url: '/api/Compete/Get_EnrollByName',
    method: 'get',
    params: { name, cid }
  })
}

// 用户通过name和比赛详情表id查询自己的歌曲
export function GetSongs(name, cid) {
  return request({
    url: '/api/Compete/Get_Songs',
    method: 'get',
    params: { name, cid }
  })
}

// 用户修改自己的参赛歌曲
export function EditSongs(data) {
  return request({
    url: '/api/Compete/Edit_Songe',
    method: 'post',
    data
  })
}

// 获取我的大屏信息
export function GetDashboard() {
  return request({
    url: '/api/Values/getDashboard',
    method: 'get'
  })
}
