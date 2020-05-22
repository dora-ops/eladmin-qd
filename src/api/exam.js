import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/exam',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/exam',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/exam',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/exam/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/exam',
    method: 'put',
    data
  })
}
