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
        title: this.data.title,
        createTime: this.data.createTime,
        description: this.data.description,
        property: this.data.property,
        tag: this.data.tag,
        resId: this.data.resId,
        cusId: this.data.cusId,
        flag: this.data.flag,
        url: this.data.url,
        likeCount: this.data.likeCount,
        comCount: this.data.comCount
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
