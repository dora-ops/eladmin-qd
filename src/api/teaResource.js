import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/teaResource',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/teaResource',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/teaResource',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/teaResource/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/teaResource',
    method: 'put',
    data
  })
}
