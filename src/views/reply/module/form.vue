<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

            <el-form-item label="回复内容" prop="reply">
                <el-input type="textarea" v-model="form.reply" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="咨询编号">
                <el-select v-model="selected" placeholder="请选择" style="width: 370px;" @change="selectTrigger(selected)">
                    <el-option v-for="item in options" :key="item.teaid" :label="item.id" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="咨询内容" prop="text">
                <el-input readonly="true" type="textarea" v-model="form.text" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="学号" prop="stuid">
                <el-input readonly="true" v-model="form.stuid" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="名字" prop="stuname">
                <el-input readonly="true" v-model="form.stuname" style="width: 370px;" />
            </el-form-item>

            <el-form-item label="老师id" prop="teaid">
                <el-input readonly="true" v-model="form.teaid" style="width: 370px;" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/reply";
import { getInfo } from "@/api/login";
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
  created() {
    getInfo().then(res => {
      this.userInfo = res;
      var sql = "";
      if (res.job == "学生") {
        sql = "select * from `suggest` where stuid=?".replace("?", res.id);
      } else {
        this.form.teaid = res.id;
        sql = "select * from `suggest` where teaid=?".replace("?", res.id);
      }

      this.$http.post("action", { sql: sql }).then(res => {
        this.options = res.data;
      });
    });
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selected: "",
      form: {
        id: "",
        text: "",
        reply: "",
        stuid: "",
        stuname: "",
        createTime: "",
        teaid: ""
      },
      rules: {
        id: [{ required: true, message: "ID不能为空", trigger: "blur" }],

        createTime: [
          { required: true, message: "创建日期不能为空", trigger: "blur" }
        ]
      },
      options: [],
      userInfo: {}
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
        text: "",
        reply: "",
        stuid: "",
        stuname: "",
        createTime: "",
        teaid: ""
      };
    },
    selectTrigger(id) {
      this.options.forEach(item => {
        //   debugger
        if (item.id == id) {
          this.form.text = item.text;
          this.form.stuid = item.stuid;
          this.form.stuname = item.stuname;
        }
        if (this.userInfo.job == "学生") {
          this.form.teaid = item.teaid;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
