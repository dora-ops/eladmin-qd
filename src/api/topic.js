import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/topic',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/topic',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/topic',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/topic/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/topic',
    method: 'put',
    data
  })
}
