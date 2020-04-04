import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/order',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/order',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/order',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/order/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/order',
    method: 'put',
    data
  })
}
