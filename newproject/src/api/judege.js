import request from '@/utils/request'

// 初始化评委界面
export function Set_Init(data) {
  return request({
    url: '/api/Judege/Set_Init',
    method: 'get',
    params: {
      competeid: data
    }
  })
}

// 设置人员
export function Edit_Judegeg(competeid, users) {
  return request({
    url: `/api/Judege/Edit_Judege?competeid=${competeid}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: users
  })
}

