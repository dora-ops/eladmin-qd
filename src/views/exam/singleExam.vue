<template>
  <div id="exam">
    <!-- <template>
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="共享">共享</el-tab-pane>
        <el-tab-pane label="新建"></el-tab-pane>
        <el-tab-pane label="我的">我的试卷</el-tab-pane>
      </el-tabs>
    </template> -->

    <div class="goals">
      <div class="left-class">
        <div class="item">
          <span class="item-name">试卷名称：</span>
          <span>{{exam.name}}</span>
        </div>
        <div class="item">
          <span class="item-name">出卷人：</span>
          <span>{{exam.create_name}}</span>
        </div>
        <div class="item">
          <span class="item-name">试卷合格分：</span>
          <span>{{exam.ok_score}}</span>
        </div>

        <div class="item">
          <span class="item-name">试卷作答时间：</span>
          <span>{{exam.start_time}}~{{exam.end_time}}</span>
        </div>
        <!-- <div class="item"><span class="item-name">本人作答时间：</span><span style="color: #4cbd74">219-05-05 11:08:31</span></div> -->
      </div>

      <div class="chart">
        <el-progress type="circle" :percentage="50" color="#4cbd74"></el-progress>
      </div>
    </div>
    <div class="detail-content">
      <div class="wrap">
        <span class="topic">姓名：{{user.username}},学号：{{user.id}}</span>

      </div>
      <h1 style="text-align:center">题目部分</h1>
      <div class="wrap" v-for="(item,index) in  topicList" :key="index">
        <span class="topic">{{item.description}}：</span>

        <div v-show="item.type==1" class="answer">
          <el-radio v-model="item.rea_ans" label="a">{{item.ans_a}}</el-radio>
          <el-radio v-model="item.rea_ans" label="b">{{item.ans_b}}</el-radio>
          <el-radio v-model="item.rea_ans" label="c">{{item.ans_c}}</el-radio>
          <el-radio v-model="item.rea_ans" label="d">{{item.ans_d}}</el-radio>
        </div>
        <div v-show="item.type==2" class="answer">
          <el-input type="textarea" v-model="item.rea_ans" />
        </div>

        <div v-show="item.type==3" class="wrap">
          <span class="topic">上传答案</span>
          <div class="answer">
            <el-upload :file-list="fileList" action="http://localhost:3000/api/base/upload" accept=".jpg,.zip,.doc,.ppt" :on-success="handleAvatarSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div v-show="item.type==4" class="answer">
          <el-checkbox-group v-model="checkedAns[index]">
            <el-checkbox label="a">{{item.ans_a}}</el-checkbox>
            <el-checkbox label="b">{{item.ans_b}}</el-checkbox>
            <el-checkbox label="c">{{item.ans_c}}</el-checkbox>
            <el-checkbox label="d">{{item.ans_d}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div v-show="item.type==5" class="answer">
          <el-radio v-model="item.rea_ans" label="a" class="answer_ok">{{item.ans_a}}</el-radio>
          <el-radio v-model="item.rea_ans" label="b">{{item.ans_b}}</el-radio>
        </div>

      </div>

    </div>
    <div style="text-align:center">
      <el-button @click="submit">提交</el-button>
    </div>

    <!-- <router-link to="/newExam">新建试卷</router-link>
    <router-view></router-view> -->
  </div>
</template>

<script>
import { examOpt, topicOpt } from "../../sqlMap.js";
import { getInfo } from "@/api/login";
export default {
  name: "exam",
  data() {
    return {
      one_answer: "1",
      exam: {},
      topicList: [],
      user: {},
      fileList: [],
      checkedAns: [[]]
    };
  },
  created() {
    getInfo().then(res => {
      this.user = res;
      var ex_id = this.$route.params.id;
      var sql = 'select * from exam where id = "?"'.replace("?", ex_id);
      this.$http.post("action", { sql: sql }).then(res => {
        this.exam = res.data[0];
      });
      sql = 'select * from topic where exam_id = "?"'.replace("?", ex_id);
      this.$http.post("action", { sql: sql }).then(res => {
        this.topicList = res.data;

        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].type == 4) {
            this.checkedAns[index] = new Array();
          }
        }
      });
    });
  },
  methods: {
    submit() {
      var data = {
        exam_name: this.exam.name,
        exam_id: this.exam.id,
        user_id: this.user.id,
        user_name: this.user.username
      };
      var count = 0;

      var array = this.topicList;
      for (let index = 0; index < array.length; index++) {
        const item = array[index];
        if (item.type == 1 || item.type == 2 || item.type == 5) {
          if (item.rea_ans == item.ans) {
            count++;
          }
        } else if (item.type == 4) {
          debugger;
          var box_ans = this.checkedAns[index];
          var f = true;
          var ans_list = item.ans.split(",");
          for (let j = 0; j < 4; j++) {
            if (j < box_ans.length && j < ans_list.length) {
              if (box_ans[j] != ans_list[j]) {
                f = false;
                break;
              }
            }
          }
          if (f) {
            count++;
          }
        }
      }

      data.score = count + "/" + this.topicList.length;
      data.average = count / this.topicList.length;
      this.$http.post("insert", { table: "grade", data: data }).then(res => {
        this.$router.push("/grade");
      });
    },
    handleAvatarSuccess(res, file) {}
  }
};
</script>

<style scoped>
.wrap {
  padding-bottom: 16px;
  border-bottom: 1px dashed #eee;
}
.answer_ok .el-radio__label {
  color: #4cbd74 !important;
}

.detail-content {
  width: 1136px;
  margin: 16px;
  border: 1px dashed #666;
}
.detail-content .topic {
  width: 100%;
  height: 32px;
  float: left;
  font-weight: bold;
  font-size: 16px;
  margin-left: 16px;
}
.detail-content .answer {
  margin-top: 8px;
  margin-left: 16px;
}

.goals {
  width: 1104px;
  height: 190px;
  margin: 16px;
  padding: 16px;
  background: #fafafa;
  border: 1px dashed #666;
  overflow: hidden;
}
.goals .left-class {
  width: 70%;
  height: 100%;
  float: left;
}
.goals .left-class .item {
  width: 100%;
  font-size: 14px;
  line-height: 32px;
  color: #666;
  float: left;
}
.goals .left-class .item .item-name {
  float: left;
  width: 120px;
  margin-right: 8px;
  text-align: right;
  display: block;
  font-weight: bold;
}
.goals .chart {
  margin-left: 496px;
  height: 100%;
}
.is-selected {
  color: #1989fa;
}
</style>
