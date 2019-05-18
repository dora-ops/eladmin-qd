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
        domain: this.data.domain,
        siteName: this.data.siteName,
        startUrl: this.data.startUrl,
        dynamicField: this.data.dynamicField,
        titleReg: this.data.titleReg,
        titleXpath: this.data.titleXpath,
        thread: this.data.thread,
        retry: this.data.retry,
        sleep: this.data.sleep,
        priority: this.data.priority,
        urlReg: this.data.urlReg,
        charset: this.data.charset,
        callbackUrl: this.data.callbackUrl,
        userAgent: this.data.userAgent,
        createTime: this.data.createTime
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
