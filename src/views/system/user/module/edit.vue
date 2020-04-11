<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" :dicts="dicts" />
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
    // index.vue 的this 可用于刷新数据
    sup_this: {
      type: Object,
      required: true
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form;
      _this.getRoles();
      _this.getDepts();
      _this.roleIds = [];
      _this.form = {
        id: this.data.id,
        username: this.data.username,
        phone: this.data.phone,
        email: this.data.email,
        enabled: this.data.enabled.toString(),
        sex: this.data.sex.toString(),
        sno: this.data.sno,
        major: this.data.major,
        startTime: this.data.startTime,
        endTime: this.data.endTime,
        address: this.data.address,
        totalScore: this.data.totalScore,
        personScore: this.data.personScore,
        pindenBaseScore: this.data.pindenBaseScore,
        pindenPrizeScore: this.data.pindenPrizeScore,
        pindenDesScore: this.data.pindenDesScore,
        wenhuaScore: this.data.wenhuaScore,
        abilityScore: this.data.abilityScore,
        roles: [],
        dept: { id: this.data.dept.id },
        job: { id: this.data.job.id }
      };
      this.data.roles.forEach(function(data, index) {
        _this.roleIds.push(data.id);
      });
      _this.deptId = this.data.dept.id;
      _this.jobId = this.data.job.id;
      _this.sex = this.data.sex;

      _this.getJobs(_this.deptId);
      _this.dialog = true;
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
