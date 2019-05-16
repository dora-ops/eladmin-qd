import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/major',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/major/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/major',
    method: 'put',
    data
  })
}
