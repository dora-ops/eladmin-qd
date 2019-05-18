import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/spiderTask',
    method: 'post',
    data
  })
}

export function start(data) {
    return request({
      url: 'api/start/CSDNProcess',
      method: 'post',
      data
    })
  }

export function del(id) {
  return request({
    url: 'api/spiderTask/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/spiderTask',
    method: 'put',
    data
  })
}
