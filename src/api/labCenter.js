import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/labCenter',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/labCenter/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/labCenter',
    method: 'put',
    data
  })
}
