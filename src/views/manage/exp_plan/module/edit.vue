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
        courseName: this.data.courseName,
        courseNumber: this.data.courseNumber,
        teaName: this.data.teaName,
        teaNumber: this.data.teaNumber,
        expName: this.data.expName,
        expNumber: this.data.expNumber,
        roomNumber: this.data.roomNumber,
        createTime: this.data.createTime,
        startTime: this.data.startTime,
        endTime: this.data.endTime,
        expAddress: this.data.expAddress,
        hold: this.data.hold,
        remaind: this.data.remaind
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
