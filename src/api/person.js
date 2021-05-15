import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/person',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/person',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/person',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/person/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/person',
    method: 'put',
    data
  })
}
