<template>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">

           
            <el-form-item label="课程号" prop="courseNumber">
                <el-select v-model="form.courseNumber" placeholder="请选择" style="width: 370px;"  @change="findCourseName">
                            <el-option v-for="item in course_opt" :key="item.number" :label="item.number" :value="item.number">
                            </el-option>
                </el-select>
                <!-- <el-input v-model="form.courseNumber" style="width: 370px;" /> -->
            </el-form-item>
             <el-form-item label="课程名称" prop="courseName">
                <el-input :readonly="true" v-model="form.courseName" style="width: 370px;" />
            </el-form-item>
            
            <el-form-item label="教工号" prop="teaNumber">
                <!-- <el-input v-model="form.teaNumber" style="width: 370px;" /> -->
                <el-select v-model="form.teaNumber" placeholder="请选择" style="width: 370px;"  @change="findUserName">
                            <el-option v-for="item in tea_opt" :key="item.id" :label="item.id" :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="授课教师" prop="teaName">
                <el-input :readonly="true" v-model="form.teaName" style="width: 370px;" />
            </el-form-item>
            <!-- <el-form-item
                        label="创建时间"
                        prop="createTime">
                        <el-date-picker
                                v-model="form.createTime"
                                type="date"
                                style="width: 370px;"
                                placeholder="选择日期">
                        </el-date-picker>
                </el-form-item> -->
            <el-form-item label="容纳人数" prop="hold">
                <el-input v-model="form.hold" style="width: 370px;" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { add, edit } from "@/api/coursePlan";
import { course,userOpt } from "@/sqlMap";
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
        courseName: "",
        courseNumber: "",
        teaName: "",
        teaNumber: "",
        createTime: "",
        hold: ""
      },
      rules: {
        id: [{ required: true, message: "ID", trigger: "blur" }]
      },
      course_opt:[],
      tea_opt:[]
    };
  },
  created(){
      var sql=course.getAll
      this.$http.post("action", { sql: sql }).then(res => {
          this.course_opt=res.data
      })
      sql=userOpt.find
      this.$http.post("action", { sql: sql }).then(res => {
          this.tea_opt=res.data
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
        courseName: "",
        courseNumber: "",
        teaName: "",
        teaNumber: "",
        createTime: "",
        hold: ""
      };
    },
     findCourseName(event) {
       this.course_opt.forEach(item=>{
           if (item.number==event) {
               this.form.courseName=item.name
               return
           }
       })
    },
    findUserName(event) {
       this.tea_opt.forEach(item=>{
           if (item.id==event) {
               this.form.teaName=item.username
               return
           }
       })
    }
  }
};
</script>

<style scoped>
</style>
