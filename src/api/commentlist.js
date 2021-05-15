import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/commentlist',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/commentlist',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/commentlist',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/commentlist/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/commentlist',
    method: 'put',
    data
  })
}
