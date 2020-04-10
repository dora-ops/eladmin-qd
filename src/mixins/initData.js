import { initData } from '@/api/data'
import request from '@/utils/request'
import axios from 'axios';

export default {
  data() {
    return {
      loading: true, data: [], page: 0, size: 10, total: 0, url: '', params: {}, query: {}, time: 170
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }

      return new Promise((resolve, reject) => {
        this.loading = true
        // debugger
        if (['publish','books','user'].includes(this.url)) {
          axios.post('http://localhost:3000/api/base/vx', this.params)
            .then(res => {
              const totalData = res.data.data
              // debugger
              this.total = totalData.length
              var end = Math.min((this.page + 1) * this.size, this.total)
              this.data = totalData.slice(this.page * this.size, end)
              setTimeout(() => {
                this.loading = false
              }, this.time)
              resolve(res)
            }).catch(err => {
              this.loading = false
              reject(err)
            })
        } else {
          initData(this.url, this.params).then(res => {
            this.total = res.totalElements
            this.data = res.content
            setTimeout(() => {
              this.loading = false
            }, this.time)
            resolve(res)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
        }

      })
    },
    beforeInit() {
      return true
    },
    pageChange(e) {
      this.page = e - 1
      this.init()
    },
    sizeChange(e) {
      this.page = 0
      this.size = e
      this.init()
    }
  }
}
