import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/grade',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/grade/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/grade',
    method: 'put',
    data
  })
}
