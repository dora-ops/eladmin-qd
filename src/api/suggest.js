import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/suggest',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/suggest',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/suggest',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/suggest/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/suggest',
    method: 'put',
    data
  })
}
