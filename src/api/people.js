import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/people',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/people',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/people',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/people/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/people',
    method: 'put',
    data
  })
}
