<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

            <el-form-item label="项目名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="项目编号" prop="number">
                <el-input v-model="form.number" style="width: 370px;" />
            </el-form-item>
            <!-- <el-form-item
                        label="创建时间"
                        prop="createTime">
                        <el-date-picker
                                v-model="form.createTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                </el-form-item> -->
            <el-form-item label="实验内容" prop="content">
                <el-input v-model="form.content" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="实验学时" prop="experiment">
                <el-input v-model="form.experiment" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="实验类型" prop="type">
                <el-input v-model="form.type" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="课程号" prop="courseNumber">
                <el-input v-model="form.courseNumber" style="width: 370px;" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/experiment";

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
        number: "",
        createTime: "",
        content: "",
        experiment: "",
        type: "",
        courseNumber: ""
      },
      rules: {
        id: [{ required: true, message: "ID", trigger: "blur" }],

        createTime: [{ required: true, message: "创建时间", trigger: "blur" }]
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
        number: "",
        createTime: "",
        content: "",
        experiment: "",
        type: "",
        courseNumber: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
