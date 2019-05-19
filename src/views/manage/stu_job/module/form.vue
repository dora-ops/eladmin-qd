<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

            <!-- <el-form-item label="资源id" prop="resId">
                <el-select v-model="form.resId" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="作业文件">
                <el-upload :file-list="fileList" action="http://localhost:3000/api/base/upload" accept=".mp4,.avi,.zip,.doc,.ppt" :on-success="handleAvatarSuccess">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <!-- <el-form-item label="资源url" prop="resUrl">
                <el-input v-model="form.resUrl" style="width: 370px;" />
            </el-form-item> -->

          

            <el-form-item label="实验编号" prop="expNumber">
                <!-- <el-input v-model="form.expNumber" style="width: 370px;" /> -->
                <el-select v-model="form.expNumber" placeholder="请选择" style="width: 370px;" @change="findExpName">
                    <el-option v-for="item in exp_opt" :key="item.number" :label="item.number" :value="item.number">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="实验名称" prop="expName">
                <el-input v-model="form.expName" style="width: 370px;" />
            </el-form-item>
            
            <el-form-item label="教工号" prop="teaNumber">
                <!-- <el-input v-model="form.teaNumber" style="width: 370px;" /> -->
                <el-select v-model="form.teaNumber" placeholder="请选择" style="width: 370px;" @change="findUserName">
                    <el-option v-for="item in tea_opt" :key="item.id" :label="item.id" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="授课教师" prop="teaName">
                <el-input v-model="form.teaName" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="学生名称" prop="stuName">
                <el-input v-model="form.stuName" style="width: 370px;" />
            </el-form-item>

            <el-form-item label="学号" prop="stuNumber">
                <el-input v-model="form.stuNumber" style="width: 370px;" />
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/stuJob";
import { course, userOpt, experiment, resource } from "@/sqlMap";
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
        resId: "",
        resUrl: "",
        expName: "",
        expNumber: "",
        teaName: "",
        teaNumber: "",
        stuName: "",
        stuNumber: "",
        createTime: ""
      },
      rules: {
        id: [{ required: true, message: "ID", trigger: "blur" }],

        createTime: [{ required: true, message: "创建时间", trigger: "blur" }]
      },
      course_opt: [],
      tea_opt: [],
      exp_opt: [],
      fileList:[]
    };
  },
  created() {
    var sql = course.getAll;
    this.$http.post("action", { sql: sql }).then(res => {
      this.course_opt = res.data;
    });
    sql = experiment.getAll;
    this.$http.post("action", { sql: sql }).then(res => {
      this.exp_opt = res.data;
    });
    sql = userOpt.find;
    this.$http.post("action", { sql: sql }).then(res => {
      this.tea_opt = res.data;
    });
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
        resId: "",
        resUrl: "",
        expName: "",
        expNumber: "",
        teaName: "",
        teaNumber: "",
        stuName: "",
        stuNumber: "",
        createTime: ""
      };
    },
    handleAvatarSuccess(res, file) {
      this.form.resId = res[0];
      var sql = resource.getOne.replace("?", res[0]);
      this.$http.post("action", { sql: sql }).then(res => {
        var data = res.data[0];
        this.form.resUrl = "http://localhost:3000/" + data.fileName;
      });
    },
    findExpName(event) {
      this.exp_opt.forEach(item => {
        if (item.number == event) {
          this.form.expName = item.name;
          return;
        }
      });
    },
    findUserName(event) {
      this.tea_opt.forEach(item => {
        if (item.id == event) {
          this.form.teaName = item.username;
          return;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
