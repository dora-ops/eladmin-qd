<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desciption" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" style="width: 370px;" />
      </el-form-item>
      <!-- <el-form-item label="创建日期">
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from "@/api/goods";
import axios from "axios";
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
        id: "",
        name: "",
        desciption: "",
        price: "",
        createTime: ""
      },
      rules: {
        id: [{ required: true, message: "", trigger: "blur" }],
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
      if (this.isAdd) {
        this.doAdd();
      } else this.doEdit();
    },
    doAdd() {
      var sql = "db.collection('user').add({data: [?]})";
      this.form._openid='oI4uu4ovj150Zi7ZSD-039RmIOcE'
      sql = sql.replace("?", JSON.stringify(this.form));
      console.log(sql);
      this.params = { sql: sql, type: "add" };
      axios
        .post("http://localhost:3000/api/base/vx", this.params)
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
      var sql = "db.collection('user').doc('?').update({data: ?})";
      this.form._openid='oI4uu4ovj150Zi7ZSD-039RmIOcE'
      sql = sql
        .replace("?", this.form.id) 
        .replace("?", JSON.stringify(this.form));
      this.params = { sql: sql, type: "update" };
      axios
        .post("http://localhost:3000/api/base/vx", this.params)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
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
