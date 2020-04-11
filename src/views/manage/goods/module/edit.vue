<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" />
  </div>
</template>
<script>
import eForm from "./form";
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
      var sql = "select * from grade where uid=? and year=? and type=?";
      sql = sql
        .replace("?", this.data.uid)
        .replace("?", this.data.year)
        .replace("?", this.data.type);
      this.$http.post("action", { sql: sql }).then(item => {
        const _this = this.$refs.form;
        if (item.data.length != 0) {
          _this.form = item.data[0];
        } else {
          _this.form = {
            year: this.data.year,
            type: this.data.type,
            score: this.data.score,
            uid: this.data.uid,
            uname: this.data.uname
          };
        }
        _this.dialog = true;
      });
    }
  }
};
</script>

<style scoped>
div {
  display: inline-block;
  margin-right: 3px;
}
</style>
