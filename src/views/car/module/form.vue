<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

            <el-form-item label="车名" prop="name">
                <el-input v-model="form.name" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="form.price" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="牌子" prop="type">
                <el-select v-model="form.type" style="width: 370px;">
                    <el-option v-for="item in typeList" :key="item" :label="item" :value="item" />

                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-input v-model="form.status" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="介绍" prop="introduction">
                <el-input v-model="form.introduction" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="form.desc" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="图片" prop="img">
                <el-input v-model="form.img" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="发布人" prop="uid">
                <el-input v-model="form.uid" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
                <el-date-picker v-model="form.createTime" type="date" style="width: 370px;" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/car";
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
      typeList: ["宝马", "奥迪"],
      loading: false,
      dialog: false,
      form: {
        id: "",
        name: "",
        price: "",
        type: "",
        status: "",
        introduction: "",
        desc: "",
        img: "",
        uid: "",
        createTime: ""
      },
      rules: {
        id: [{ required: true, message: "id不能为空", trigger: "blur" }],
        name: [{ required: true, message: "车名不能为空", trigger: "blur" }],
        price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
        type: [{ required: true, message: "牌子不能为空", trigger: "blur" }],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }],
        introduction: [
          { required: true, message: "介绍不能为空", trigger: "blur" }
        ],
        desc: [{ required: true, message: "描述不能为空", trigger: "blur" }],
        img: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        uid: [{ required: true, message: "发布人不能为空", trigger: "blur" }],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
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
        price: "",
        type: "",
        status: "",
        introduction: "",
        desc: "",
        img: "",
        uid: "",
        createTime: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
