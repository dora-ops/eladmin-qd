import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/pubContent',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/pubContent',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/pubContent',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/pubContent/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/pubContent',
    method: 'put',
    data
  })
}
