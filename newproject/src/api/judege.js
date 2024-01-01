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

// 查看全部参赛选手信息
export function QueryCompeteMan(data) {
  return request({
    url: `/api/Compete/QueryCompeteMan`,
    method: 'get',
    params: { competeid: data }
  })
}

// 设置比赛开始
export function SetBegin(data) {
  return request({
    url: `/api/RegulationCompete/SetBegin`,
    method: 'post',
    data
  })
}

// 设置比赛结束
export function SetEnd(data, upcount) {
  return request({
    url: `/api/RegulationCompete/SetEnd?upcount=${upcount}`,
    method: 'post',
    data
  })
}

// 修改比赛图片
export function EditImg(data) {
  return request({
    url: `/api/RegulationCompete/EditImg`,
    method: 'post',
    data
  })
}
