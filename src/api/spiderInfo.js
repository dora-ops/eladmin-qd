import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/spiderInfo',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/spiderInfo/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/spiderInfo',
    method: 'put',
    data
  })
}
