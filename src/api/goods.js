import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/goods',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/goods/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/goods',
    method: 'put',
    data
  })
}
