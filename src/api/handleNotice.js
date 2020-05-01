import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/handleNotice',
    method: 'post',
    data
  })
}

export function queryAll() {
  return request({
  url: 'api/queryAll/handleNotice',
  method: 'get',
  })
}

export function findById() {
  return request({
  url: 'api/findById/handleNotice',
  method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/handleNotice/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/handleNotice',
    method: 'put',
    data
  })
}
