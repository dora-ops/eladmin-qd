import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/expPlan',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/expPlan/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/expPlan',
    method: 'put',
    data
  })
}
