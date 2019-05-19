import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/stuJob',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/stuJob/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/stuJob',
    method: 'put',
    data
  })
}
