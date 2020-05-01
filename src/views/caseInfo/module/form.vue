<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">

            <el-form-item label="案件种类" prop="kind">

                <el-select v-model="form.kind" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in kind_options" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="重要程度" prop="imp">

                <el-select v-model="form.imp" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in imp_options" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="负责人警号" prop="uid">
                <el-input v-model="form.uid" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="负责人姓名" prop="uname">
                <el-input v-model="form.uname" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="审核人警号" prop="dealId">
                <el-select v-model="form.dealId" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核人姓名" prop="dealName">
                <el-input v-model="form.dealName" style="width: 370px;" />
            </el-form-item>

            <el-form-item label="发生时间" prop="startTime">
                <el-date-picker v-model="form.startTime" type="date" style="width: 370px;" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结案时间" prop="endTime">
                <el-date-picker v-model="form.endTime" type="date" style="width: 370px;" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="处理结果" prop="result">
                <el-input type="textarea" v-model="form.result" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="案件简述" prop="summary">
                <el-input type="textarea" v-model="form.summary" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="案件详情" prop="detail">
                <el-input type="textarea" v-model="form.detail" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="案件状态" prop="status">
                <el-input v-model="form.status" style="width: 370px;" />
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
          debugger;
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
