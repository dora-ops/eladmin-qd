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
        status: this.data.status instanceof Object?JSON.stringify(this.data.status):this.data.status,
        price: this.data.price instanceof Object?JSON.stringify(this.data.price):this.data.price,
        notes: this.data.notes instanceof Object?JSON.stringify(this.data.notes):this.data.notes,
        place: this.data.place instanceof Object?JSON.stringify(this.data.place):this.data.place,
        bookinfo: this.data.bookinfo instanceof Object?JSON.stringify(this.data.bookinfo):this.data.bookinfo,
        collegeid: this.data.collegeid instanceof Object?JSON.stringify(this.data.collegeid):this.data.collegeid,
        kindid: this.data.kindid instanceof Object?JSON.stringify(this.data.kindid):this.data.kindid,
        key: this.data.key instanceof Object?JSON.stringify(this.data.key):this.data.key,
        dura: this.data.dura instanceof Object?JSON.stringify(this.data.dura):this.data.dura,
        deliveryid: this.data.deliveryid instanceof Object?JSON.stringify(this.data.deliveryid):this.data.deliveryid,
        creat: this.data.creat instanceof Object?JSON.stringify(this.data.creat):this.data.creat
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
