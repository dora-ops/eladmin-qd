import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/investigationInfo',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/investigationInfo',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/investigationInfo',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/investigationInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/investigationInfo',
    method: 'put',
    data
  })
}
