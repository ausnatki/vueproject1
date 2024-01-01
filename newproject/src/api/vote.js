import request from '@/utils/request'

// 获取投票时候得用户信息
export function Getinfo(competeid, uid) {
  return request({
    url: '/api/Voting/Getinfo',
    method: 'get',
    params: {
      competeid,
      uid
    }
  })
}

// 投票
export function Vote(competeid, uid, cuid) {
  return request({
    url: '/api/Voting/Vote',
    method: 'get',
    params: {
      competeid,
      uid,
      cuid
    }
  })
}

// 通过competeid查询所有参赛表的信息
export function GetCompete(competeid) {
  return request({
    url: '/api/Voting/GetAllCompete',
    method: 'get',
    params: {
      competeid
    }
  })
}

