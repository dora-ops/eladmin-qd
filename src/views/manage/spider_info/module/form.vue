<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="域名" prop="domain">
                <el-input v-model="form.domain" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="网站名称" prop="siteName">
                <el-input v-model="form.siteName" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="起始链接" prop="startUrl">
                <el-input v-model="form.startUrl" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="动态字段列表" prop="dynamicField">
                <el-input type="textarea" v-model="form.dynamicField" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="正文正则表达式" prop="titleReg">
                <el-input v-model="form.titleReg" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="正文Xpath" prop="titleXpath">
                <el-input v-model="form.titleXpath" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="线程数" prop="thread">
                <el-input v-model="form.thread" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="失败的网页重试次数" prop="retry">
                <el-input v-model="form.retry" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="抓取每个网页睡眠时间" prop="sleep">
                <el-input v-model="form.sleep" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="网站权重" prop="priority">
                <el-input v-model="form.priority" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="url正则" prop="urlReg">
                <el-input v-model="form.urlReg" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="编码" prop="charset">
                <el-input v-model="form.charset" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="回调url" prop="callbackUrl">
                <el-input v-model="form.callbackUrl" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="User Agent" prop="userAgent">
                <el-input v-model="form.userAgent" style="width: 370px;" />
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/spiderInfo";

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
        domain: "",
        siteName: "",
        startUrl: "",
        dynamicField: "",
        titleReg: "",
        titleXpath: "",
        thread: "",
        retry: "",
        sleep: "",
        priority: "",
        urlReg: "",
        charset: "",
        callbackUrl: "",
        userAgent: "",
        createTime: ""
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
        domain: "",
        siteName: "",
        startUrl: "",
        dynamicField: "",
        titleReg: "",
        titleXpath: "",
        thread: "",
        retry: "",
        sleep: "",
        priority: "",
        urlReg: "",
        charset: "",
        callbackUrl: "",
        userAgent: "",
        createTime: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
