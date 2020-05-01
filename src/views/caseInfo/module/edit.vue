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
        id: this.data.id,
        kind: this.data.kind,
        name: this.data.name,
        imp: this.data.imp,
        result: this.data.result,
        summary: this.data.summary,
        uid: this.data.uid,
        uname: this.data.uname,
        dealId: this.data.dealId,
        dealName: this.data.dealName,
        detail: this.data.detail,
        startTime: this.data.startTime,
        endTime: this.data.endTime,
        status: this.data.status
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
