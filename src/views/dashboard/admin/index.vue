<template>
  <div class="dashboard-editor-container">

    

    <panel-group/>
     <el-row>
        <el-col span="24">
          <el-carousel
            v-model="value3"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arel-row="setting.arelRow">
            <!-- <el-carousel-item v-for="pic in picList" :key="pic.id">
              <img class="carousel" v-bind:src="pic.url"/>
            </el-carousel-item> -->
            <el-carousel-item>
              <div class="carousel cal2"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="carousel cal3"></div>
            </el-carousel-item>
            <el-carousel-item>
              <div class="carousel cal4"></div>
            </el-carousel-item>
          </el-carousel>
        </el-col>
       
      </el-row>
    

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart/>
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row> -->
    
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import { initData } from '@/api/data'
import { resource, erea_info, topic } from "@/sqlMap";
export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  created() {
      this.$http.post("/action", { sql: erea_info.getAll }).then(res => {
      this.toDoList = res.data
    });
    this.$http.post("/action", { sql: topic.getAll }).then(res => {
      this.toDoList1  = res.data
    });
       
        //  initData('api/pictures',{type:'huandengpian'}).then(res => {
        //     this.picList = res.content
        // }).catch(err => {
        // })
  },
  data () {
        return {
          value3: 3,
          setting: {
            autoplay: true,
            autoplaySpeed: 4000,
            dots: 'inside',
            trigger: 'click',
            arelRow: 'hover'
          },
          toDoList: [
          ],
          toDoList1: [
          ],
          picList: [
           
          ],
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
    },
    }
  
}
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
 .carousel{
    width: 100%;
    height: 420px;
    background-size: cover;
    background-position: center;
  }
  .cal1{
    background-image: url('./b4.jpg');
  }
  .cal2{
    background-image: url('./b5.jpg');
  }
  .cal3{
    background-image: url('./b6.jpg');
  }
  .cal4{
     background-image: url('./b3.jpg');
   }
  .Li{
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
