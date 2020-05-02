<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">

          
            <el-form-item label="案件详情" prop="detail">
                <el-input type="textarea" v-model="form.detail" style="width: 370px;" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/caseInfo";

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
        kind: "",
        name: "",
        imp: "",
        result: "",
        summary: "",
        uid: "",
        uname: "",
        dealId: "",
        dealName: "",
        detail: "",
        startTime: "",
        endTime: "",
        status: ""
      },
      rules: {
        id: [{ required: true, message: "案件编号不能为空", trigger: "blur" }],
        kind: [
          { required: true, message: "案件种类不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "案件名称不能为空", trigger: "blur" }
        ],
        imp: [{ required: true, message: "重要程度不能为空", trigger: "blur" }],

        uid: [
          { required: true, message: "负责人警号不能为空", trigger: "blur" }
        ],

        detail: [
          { required: true, message: "案件详情不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "发生时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结案时间不能为空", trigger: "blur" }
        ]
      },
      options: [],
      kind_options: ["民事案件", "刑事案件", "行政案件"],
      imp_options: ["轻", "严重", "紧急"]
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
          this.form.cid = res.id;
          this.$http
            .post("/insert", { table: "investigation_info", data: this.form })
            .then(res => {});
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
        kind: "",
        name: "",
        imp: "",
        result: "",
        summary: "",
        uid: "",
        uname: "",
        dealId: "",
        dealName: "",
        detail: "",
        startTime: "",
        endTime: "",
        status: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
