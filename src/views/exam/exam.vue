<template>
  <div>

    <div class="left-menu">
      <div class="title-wrap">
        <img src="@/assets/logo/logo.png" alt="">
        <span>洋洋洋</span>
      </div>

      <el-button style="width:117px;margin:16px auto 0 24px;">我的试卷
        <i class="el-icon-document el-icon--right"></i>
      </el-button>
    </div>
    <!--    -->
    <div class="right-menu">

      <!-- <el-calendar :range="['2019-04-01', '2019-04-30']"></el-calendar> -->

      <div>
        <h2 style="color: #666;">您所在班级为 {{cla.name}}，该班教师有
          <el-button type="text" style="font-size: 22px">{{cla.tea_name}}</el-button>

          。
        </h2>
        <h3 style="color: #666;">您完成的试卷共
          <el-button type="text" style="font-size: 22px">{{count}}</el-button>
          份。
        </h3>
      </div>

      <div class="block">

        <el-card v-for="item in  examList" :key="item.id" shadow="hover">

          <h4>创建
            <router-link :to="'/exam/'+item.id" target="_blank"  tag="a">
              <span>{{item.name}}</span>
            </router-link> 试卷,及格：{{item.ok_score}}</h4>
          <p>{{item.create_name}}教师</p>
          <p>考试时间{{item.start}}---{{item.end}}</p>
        </el-card>
      </div>

    </div>

  
  </div>
</template>

<script>
import axios from "axios";
import { examOpt, claOpt } from "../../sqlMap.js";
export default {
  name: "self",
  data() {
    return {
      dialogVisible: false,
      cla: {
        name: "",
        tea_name: ""
      },
      examList: [],
      count: 0
    };
  },
  watch: {
    newVal(newVal) {}
  },

  created() {
   
    this.$http.post("action", { sql: 'select * from exam' }).then(res => {   
      this.examList = res.data;
      this.count = res.data.length;
    });
  },
  methods: {
    //换背景

    singup: function() {
      var _this = this;
      if (!_this.needSign) {
        _this.needSign = true;
      } else {
        if (!_this.checkName(_this)) {
          _this.signAxiox(_this);
          _this.canSign = false;
        } else {
          _this.errorTxt = "账号含特殊字符，请重新输入";
          _this.showLoginError = true;
        }
      }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped>
h4 {
  font-weight: normal;
}
h4 span {
  font-weight: bold;
}
.el-card {
  margin-bottom: 8px;
}

.left-menu {
  float: left;
  width: 160px;
  height: 100%;
  background: #fafafa;
  overflow: hidden;
  border-right: 1px dashed #eee;
}

.right-menu {
  float: left;
  width: 976px;
  height: 100%;
  overflow: hidden;
  padding: 32px 16px;
}

.title-wrap {
  width: 128px;
  height: 48px;
  float: left;
  padding: 32px 16px;
}

.title-wrap img {
  float: left;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  vertical-align: middle;
}

.title-wrap span {
  float: left;
  height: 64px;
  margin-left: 8px;
  line-height: 64px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

label {
  margin-bottom: 8px;
}

label i {
  color: #ff3333;
  margin-right: 4px;
}

.el-dialog {
  overflow: hidden;
}

.btn-wrap {
  width: 100%;
  height: 40px;
  margin-top: 16px;
  margin-bottom: 16px;
  float: left;
}

.btn-wrap button {
  float: right;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
