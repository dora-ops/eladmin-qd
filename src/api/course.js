import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/course',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/course',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/course',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/course/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/course',
    method: 'put',
    data
  })
}
