<template>
  <div class="dashboard-editor-container">
  <h1 style="text-align:center" >课程</h1>
    <el-row>
      <el-col :span="8" v-for="(o, index) in picList" :key="o" :offset="index > 0 ? 3 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <video :src="o.img" controls="controls">
    
        </video>
          <!-- <img :src="o.img" class="image"> -->
          <div style="padding: 14px;">
            <span>课程名：{{o.name}}</span>
            <div>简介：{{o.introduction}}</div>
            <div class="bottom clearfix">
              <time class="time">{{ o.create_time }}</time>
              <el-button type="text" class="button">查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
   

    <h1 style="text-align:center" >访问记录</h1>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart/>
    </el-row>



  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import { initData } from "@/api/data";
import { resource, erea_info, topic } from "@/sqlMap";
export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  created() {
    this.$http.post("/action", { sql: 'select * from course' }).then(res => {
      this.picList = res.data;
    });
   

    //  initData('api/pictures',{type:'huandengpian'}).then(res => {
    //     this.picList = res.content
    // }).catch(err => {
    // })
  },
  data() {
    return {
      value3: 3,
      currentDate: new Date(),
      setting: {
        autoplay: true,
        autoplaySpeed: 4000,
        dots: "inside",
        trigger: "click",
        arelRow: "hover"
      },
      toDoList: [],
      toDoList1: [],
      picList: []
    };
  },

  methods: {
    toDetail: function(id) {
      let routeData = this.$router.resolve({ path: "/detail/" + id });
      window.open(routeData.href, "_blank");
    },
    toTopic: function(id) {
      let routeData = this.$router.resolve({ path: "/topic/" + id });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.carousel {
  width: 100%;
  height: 420px;
  background-size: cover;
  background-position: center;
}
.cal1 {
  background-image: url("./b4.jpg");
}
.cal2 {
  background-image: url("./b5.jpg");
}
.cal3 {
  background-image: url("./b6.jpg");
}
.cal4 {
  background-image: url("./b3.jpg");
}
.Li {
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
