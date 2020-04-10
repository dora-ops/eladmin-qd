import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/publish',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/publish',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/publish',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/publish/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/publish',
    method: 'put',
    data
  })
}
