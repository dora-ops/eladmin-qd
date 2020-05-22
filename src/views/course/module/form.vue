<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="视频" prop="img">
                <el-input v-model="form.img" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="介绍" prop="introduction">
                <el-input type="textarea" v-model="form.introduction" style="width: 370px;" />
            </el-form-item>

            <el-form-item label="老师id" prop="teaId">
                <el-input readonly="true" v-model="form.teaId" :value="userInfo.id" style="width: 370px;" />

            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/course";
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
      this.form.teaId = res.id;
    });
  },
  data() {
    return {
      loading: false,
      dialog: false,
      userInfo: {},
      form: {
        id: "",
        name: "",
        img: "",
        introduction: "",
        createTime: "",
        teaId: ""
      },
      rules: {
        id: [{ required: true, message: "课程号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],

        createTime: [
          { required: true, message: "创建日期不能为空", trigger: "blur" }
        ]
      },
      options: []
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
        img: "",
        introduction: "",
        createTime: "",
        teaId: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
