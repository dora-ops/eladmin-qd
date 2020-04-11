<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="年份">
        <el-input v-model="form.year" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="学期">
        <el-input v-model="form.type" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="学分">
        <el-input v-model="form.score" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="学生id">
        <el-input readonly="true" v-model="form.uid" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="学生名称">
        <el-input readonly="true" v-model="form.uname" style="width: 370px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from "@/api/goods";
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        year: "",
        type: "",
        score: "",
        uid: "",
        uname: ""
      },
      rules: {
        score: [{ required: true, message: "", trigger: "blur" }],
        name: [{ required: true, message: "名称", trigger: "blur" }],
        desciption: [{ required: true, message: "描述", trigger: "blur" }],

        createTime: [{ required: true, message: "创建日期", trigger: "blur" }]
      }
    };
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.loading = true;
      var grade = this.form;
      var sql = "select * from grade where uid=? and year=? and type=?";
      sql = sql
        .replace("?", grade.uid)
        .replace("?", grade.year)
        .replace("?", grade.type);
      this.$http.post("action", { sql: sql }).then(item => {
        if (item.data.length == 0) {
          this.$http
            .post("insert", { table: "grade", data: this.form })
            .then(item => {
               this.resetForm();
            });
        } else {
          var oldGrade = item.data[0];
          sql = "update  grade set score=? where id=?";
          sql = sql.replace("?", this.form.score).replace("?", oldGrade.id);
          this.$http.post("action", { sql: sql }).then(item => { this.resetForm();});
        }
      });
      this.loading = false;
      //  this.sup_this.init()
      //  this.$parent.$parent.init()
    },
    doAdd() {
      add(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.$parent.$parent.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    doEdit() {
      edit(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.sup_this.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        name: "",
        desciption: "",
        price: "",
        createTime: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
