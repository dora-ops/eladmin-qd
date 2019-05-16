import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/coursePlan',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/coursePlan/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/coursePlan',
    method: 'put',
    data
  })
}
