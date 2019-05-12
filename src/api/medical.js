import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/medical',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/medical/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/medical',
    method: 'put',
    data
  })
}
