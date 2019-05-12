<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" style="width: 370px;"/>
      </el-form-item>
      <!-- <el-form-item label="类型">
        <el-input type='hidden' v-model="form.type" style="width: 370px;"/>
      </el-form-item> -->
      <el-form-item label="发送人id" prop="send">
        <el-input v-model="form.send" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="接受人id" prop="receive">
        <el-input v-model="form.receive" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type='textarea' v-model="form.content" style="width: 370px;"/>
      </el-form-item>
      <!-- <el-form-item label="创建日期">
        <el-input v-model="form.createTime" style="width: 370px;"/>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/notice'
import checkPermission from '@/utils/permission'
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
  created(){
     this.form.type= checkPermission(['JOB_ALL'])?'express':checkPermission(['PICTURE_ALL'])?'pro_topic':'admin'
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        title: '',
        type: '',
        send: '',
        receive: '',
        content: '',
        createTime: ''
      },
      rules: {
          id: [
              {required: true,message:'',trigger: 'blur'}
          ],
          title: [
              {required: true,message:'标题',trigger: 'blur'}
          ],
          type: [
              {required: true,message:'类型',trigger: 'blur'}
          ],
        send: [
              {required: true,message:'类型',trigger: 'blur'}
          ],
          receive: [
              {required: true,message:'类型',trigger: 'blur'}
          ],

          content: [
              {required: true,message:'内容',trigger: 'blur'}
          ],
          createTime: [
              {required: true,message:'创建日期',trigger: 'blur'}
          ]
      },
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        title: '',
        type: '',
        send: '',
        receive: '',
        content: '',
        createTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
