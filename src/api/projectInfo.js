import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/projectInfo',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/projectInfo',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/projectInfo',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/projectInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/projectInfo',
    method: 'put',
    data
  })
}
