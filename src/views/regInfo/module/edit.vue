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
        summary: this.data.summary,
        regTime: this.data.regTime,
        uname: this.data.uname,
        uid: this.data.uid,
        dealUid: this.data.dealUid,
        provider: this.data.provider,
        startTime: this.data.startTime,
        dealUname: this.data.dealUname,
        cid: this.data.cid
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
