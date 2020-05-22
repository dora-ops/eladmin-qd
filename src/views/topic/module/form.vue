<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

            <el-form-item label="习题题目" prop="description">
                <el-input type="textarea" v-model="form.description" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="习题类型" prop="type">

                <el-select v-model="form.type" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="答案a" prop="ansA">
                <el-input  v-model="form.ansA" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="答案b" prop="ansB">
                <el-input v-model="form.ansB" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="答案c" prop="ansC">
                <el-input v-model="form.ansC" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="答案d" prop="ansD">
                <el-input v-model="form.ansD" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="正确答案" prop="ans">
                <el-input v-model="form.ans" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="试卷id" prop="examId">
                <el-select v-model="form.examId" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/topic";

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
    this.$http.post("action", { sql: "select * from exam" }).then(res => {
      this.options = res.data;
    });
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        id: "",
        description: "",
        type: "",
        ansA: "",
        ansB: "",
        ansC: "",
        ansD: "",
        ans: "",
        examId: ""
      },
      rules: {
        id: [{ required: true, message: "题号不能为空", trigger: "blur" }],
        description: [
          { required: true, message: "习题题目不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "习题类型不能为空", trigger: "blur" }
        ],

        ans: [{ required: true, message: "正确答案不能为空", trigger: "blur" }],
        examId: [{ required: true, message: "试卷id不能为空", trigger: "blur" }]
      },
      options: [],
      typeList: [
        { id: 1, name: "单选题" },
        { id: 2, name: "填空题" },
        { id: 3, name: "简单题" },
        { id: 4, name: "多选题" },
        { id: 5, name: "判断题题" }
      ]
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
        description: "",
        type: "",
        ansA: "",
        ansB: "",
        ansC: "",
        ansD: "",
        ans: "",
        examId: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
