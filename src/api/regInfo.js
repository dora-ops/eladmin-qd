import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/regInfo',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/regInfo',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/regInfo',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/regInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/regInfo',
    method: 'put',
    data
  })
}
