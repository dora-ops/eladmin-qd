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
                <!-- <el-input v-model="form.imp" style="width: 370px;" /> -->
                <el-select v-model="form.imp" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in imp_options" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件简述" prop="summary">
                <el-input type="textarea" v-model="form.summary" style="width: 370px;" />
            </el-form-item>
            <!-- <el-form-item label="录入时间" prop="regTime">
                <el-date-picker v-model="form.regTime" type="date" style="width: 370px;" placeholder="选择日期">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item label="负责人姓名" prop="uname">
                <el-input readonly="true" v-model="form.uname" :value="userInfo.username" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="负责人警号" prop="uid">
                <el-input readonly="true" v-model="form.uid" :value="userInfo.id" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="审核人警号" prop="dealUid">
                <el-input v-model="form.dealUid" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="提供联系" prop="provider">
                <el-input v-model="form.provider" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="发生时间" prop="startTime">
                <el-date-picker v-model="form.startTime" type="date" style="width: 370px;" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审核人姓名" prop="dealUname">
                <el-input v-model="form.dealUname" style="width: 370px;" />
            </el-form-item>
            <!-- <el-form-item label="登记编号" prop="cid">
                <el-input v-model="form.cid" style="width: 370px;" />
            </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/regInfo";
import { getInfo} from "@/api/login";
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
        summary: "",
        regTime: "",
        uname: "",
        uid: "",
        dealUid: "",
        provider: "",
        startTime: "",
        dealUname: "",
        cid: ""
      },
      rules: {
        id: [{ required: true, message: "案件编号不能为空", trigger: "blur" }],
        kind: [
          { required: true, message: "案件种类不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "案件名称不能为空", trigger: "blur" }
        ],
         imp: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],

        regTime: [
          { required: true, message: "录入时间不能为空", trigger: "blur" }
        ],
        uname: [
          { required: true, message: "负责人姓名不能为空", trigger: "blur" }
        ],
        uid: [
          { required: true, message: "负责人警号不能为空", trigger: "blur" }
        ],
        dealUid: [
          { required: true, message: "审核人警号不能为空", trigger: "blur" }
        ],
        dealUname: [
          { required: true, message: "审核人警号不能为空", trigger: "blur" }
        ],

        startTime: [
          { required: true, message: "发生时间不能为空", trigger: "blur" }
        ],

        cid: [{ required: true, message: "案件编号不能为空", trigger: "blur" }]
      },
      options: [],
      kind_options: ["民事案件", "刑事案件", "行政案件"],
      imp_options: ["轻", "严重", "紧急"],
      userInfo:{}
    };
  },
  created(){
    getInfo().then(res=>{
      // debugger
      this.userInfo=res
      this.form.uid=res.id
       this.form.uname=res.username
    })
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
         var param = {
            kind: this.form.kind,
            name: this.form.name,
            uname: this.form.uname,
            uid: this.form.uid,
            deal_uid: this.form.dealUid,
            deal_uname: this.form.dealUname,
            cid: res.id
          };
          this.$http
            .post("/insert", {
              table: "investigation_info",
              data: param
            })
            .then(res => {
              this.resetForm();
              this.$notify({
                title: "添加成功",
                type: "success",
                duration: 2500
              });
              this.loading = false;
              this.$parent.$parent.init();
            });
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
        summary: "",
        regTime: "",
        uname: "",
        uid: "",
        dealUid: "",
        provider: "",
        startTime: "",
        dealUname: "",
        cid: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
