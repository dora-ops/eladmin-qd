<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">

            <el-form-item label="案件编号" prop="cid">
                <el-select v-model="form.cid" placeholder="请选择" style="width: 370px;">
                    <el-option v-for="item in cidList" :key="item.id" :label="item.id" :value="item.id">
                    </el-option>
                </el-select>
                <!-- <el-input v-model="form.cid" style="width: 370px;"/> -->
            </el-form-item>
            <el-form-item label="案件名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;" />
            </el-form-item>
            <!-- <el-form-item label="处理时间" prop="handleTime">
                <el-date-picker v-model="form.handleTime" type="date" style="width: 370px;" placeholder="选择日期">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item label="奖惩人姓名" prop="uname">
                <el-input v-model="form.uname" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="奖惩人警号" prop="uid">
                <el-input v-model="form.uid" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="处理人警号" prop="dealUid">
                <el-input v-model="form.dealUid" style="width: 370px;" />
            </el-form-item>
          
            <el-form-item label="处理人姓名" prop="handleUname">
                <el-input v-model="form.handleUname" style="width: 370px;" />
            </el-form-item>
              <el-form-item label="奖惩详情" prop="content">
                <el-input type="textarea" v-model="form.content" style="width: 370px;" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/awardInfo";
import { parseTime } from '@/utils/index'

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
    var sql = "select * from case_info";

    this.$http.post("/action", { sql: sql }).then(res => {
      this.cidList = res.data;
    });
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        id: "",
        cid: "",
        name: "",
        // handleTime: parseTime(new Date),
        uname: "",
        uid: "",
        dealUid: "",
        content: "",
        handleUname: ""
      },
      rules: {
        id: [{ required: true, message: "不能为空", trigger: "blur" }],
        cid: [{ required: true, message: "案件编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "案件名称不能为空", trigger: "blur" }
        ],
        handleTime: [
          { required: true, message: "处理时间不能为空", trigger: "blur" }
        ],
        uname: [
          { required: true, message: "奖惩人姓名不能为空", trigger: "blur" }
        ],
        uid: [
          { required: true, message: "奖惩人警号不能为空", trigger: "blur" }
        ],

        content: [
          { required: true, message: "奖惩详情不能为空", trigger: "blur" }
        ]
      },
      options: [],
      cidList: []
    };
  },
  methods: {
    parseTime,
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
        cid: "",
        name: "",
        handleTime: "",
        uname: "",
        uid: "",
        dealUid: "",
        content: "",
        handleUname: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
