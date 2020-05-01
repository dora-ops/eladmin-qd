import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/caseInfo',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/caseInfo',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/caseInfo',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/caseInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/caseInfo',
    method: 'put',
    data
  })
}
