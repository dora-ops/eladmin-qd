import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/resource',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/resource',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/resource',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/resource/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/resource',
    method: 'put',
    data
  })
}
