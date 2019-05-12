<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="发货人id">
        <el-input v-model="form.send" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="收货人id">
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
import { add, edit } from '@/api/express'
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
      loading: false, dialog: false,
      form: {
        id: '',
        title: '',
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
