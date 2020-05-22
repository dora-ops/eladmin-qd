import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/reply',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/reply',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/reply',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/reply/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/reply',
    method: 'put',
    data
  })
}
