import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/closedInfo',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/closedInfo',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/closedInfo',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/closedInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/closedInfo',
    method: 'put',
    data
  })
}
