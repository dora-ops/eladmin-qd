<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.identity" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="医疗记录">
        <el-input v-model="form.record" style="width: 370px;"/>
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
import { add, edit } from '@/api/medical'
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
        name: '',
        age: '',
        sex: '',
        identity: '',
        record: '',
        createTime: ''
      },
      rules: {
          id: [
              {required: true,message:'',trigger: 'blur'}
          ],
          title: [
              {required: true,message:'标题',trigger: 'blur'}
          ],
          name: [
              {required: true,message:'姓名',trigger: 'blur'}
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
        name: '',
        age: '',
        sex: '',
        identity: '',
        record: '',
        createTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
