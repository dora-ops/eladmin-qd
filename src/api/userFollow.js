import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/userFollow',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/userFollow',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/userFollow',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/userFollow/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/userFollow',
    method: 'put',
    data
  })
}
