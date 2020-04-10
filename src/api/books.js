import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/books',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/books',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/books',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/books/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/books',
    method: 'put',
    data
  })
}
