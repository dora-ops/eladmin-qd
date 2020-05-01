import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/handleInfo',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/handleInfo',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/handleInfo',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/handleInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/handleInfo',
    method: 'put',
    data
  })
}
