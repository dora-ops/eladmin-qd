<template>
  <div class="app-container">
    <!-- <eHeader :query="query" /> -->
    <el-button
      
      :loading="downloadLoading"
      size="mini"
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="download">导出</el-button>
  
    <!--表格渲染-->
    <el-table v-loading="loading" :data="allscore" size="small" style="width: 100%;">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="sort" label="排名" />
      <el-table-column prop="grade" label="综合成绩" />
      <el-table-column prop="pinden" label="品德"/>
      <el-table-column prop="wenhua" label="文体表现" />
      <el-table-column prop="ability" label="个人能力" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button v-if="type!=0" :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row)">申请{{type==1?'一':type==2?'二':'三'}}等奖学金</el-button>
          <!-- <el-popover v-if="checkPermission(['ADMIN','DICT_DELETE'])" :ref="scope.row.id" placement="top" width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover> -->
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <!-- <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" /> -->
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { del } from "@/api/goods";
import { getInfo } from "@/api/login";
import { parseTime } from "@/utils/index";
import eHeader from "./module/header";
import edit from "./module/edit";
import { type } from 'os';
import { types } from 'util';
export default {
  // components: { eHeader, edit },
  // mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      allscore:[],
      loading:true,
      type:0
    };
  },
  created() {
    getInfo().then(res => {
      // debugger
      var sql = "select * from user where username='?'";
      sql = sql.replace("?", res.username);
      if (res.job === "学生") {
        this.$http.post("action", { sql: sql }).then(item => {
          var sql = "call showGrade(?,?,@ability,@sort,@grade,@pinden,@wenhua,@name,@count)";
          var userInfo = item.data[0];
          sql = sql.replace("?", userInfo.dept_id).replace("?", userInfo.id);
          this.$http.post("action", { sql: sql }).then(item => {
            
            // var data=[]
            // data.push()
            this.allscore=item.data[0]
            var detail=item.data[0][0]
            var percent=1-detail.sort/detail.count;
            // debugger;
            if (percent<0.05) {
              this.type=1
            }else if(percent>0.05&&percent<0.15){
              this.type=2
            }if (percent>0.15&&percent<0.4) {
              this.type=3
            }
            // console.log(this.data);
          });
        });
      }
      this.loading=false
    });
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = "api/goods";
      const sort = "id,desc";
      this.params = { page: this.page, size: this.size, sort: sort };
      const query = this.query;
      const type = query.type;
      const value = query.value;
      if (type && value) {
        this.params[type] = value;
      }
      return true;
    },
    subDelete(row) {
      this.delLoading = true;
      var params={uid:row.uid,type:this.type,uname:row.name}
      this.$http.post("insert", { table:'award',data:params }).then(item => {
        this.delLoading=false
      })
    },
    // 导出
    download() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '排名', '综合成绩', '品德', '文体表现', '个人能力']
        const filterVal = ['name', 'sort', 'grade', 'pinden', 'wenhua', 'ability']
        const data = this.formatJson(filterVal, this.allscore)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '综合测评报告'
        })
        this.downloadLoading = false
      })
    },
     // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime' || j === 'lastPasswordResetTime') {
          return parseTime(v[j])
        } else if (j === 'enabled') {
          return parseTime(v[j]) ? '启用' : '禁用'
        } else {
          return v[j]
        }
      }))
    }
  }
};
</script>

<style scoped>
</style>
