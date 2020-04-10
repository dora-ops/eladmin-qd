<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'

export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        _id: this.data._id instanceof Object?JSON.stringify(this.data._id):this.data._id,
        campus: this.data.campus instanceof Object?JSON.stringify(this.data.campus):this.data.campus,
        email: this.data.email instanceof Object?JSON.stringify(this.data.email):this.data.email,
        info: this.data.info instanceof Object?JSON.stringify(this.data.info):this.data.info,
        parse: this.data.parse instanceof Object?JSON.stringify(this.data.parse):this.data.parse,
        phone: this.data.phone instanceof Object?JSON.stringify(this.data.phone):this.data.phone,
        qqnum: this.data.qqnum instanceof Object?JSON.stringify(this.data.qqnum):this.data.qqnum,
        stamp: this.data.stamp instanceof Object?JSON.stringify(this.data.stamp):this.data.stamp,
        useful: this.data.useful instanceof Object?JSON.stringify(this.data.useful):this.data.useful,
        vxnum: this.data.vxnum instanceof Object?JSON.stringify(this.data.vxnum):this.data.vxnum
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
