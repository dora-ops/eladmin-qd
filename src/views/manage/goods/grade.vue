<template>
  <div class="app-container">

    <!--表格渲染-->
    <el-table v-loading="loading" :data="year" size="small" style="width: 100%;">
      <el-table-column prop="year" label="年份" />
      <el-table-column prop="type" label="学期" :formatter="stateFormat" />

      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT'])"  :data="scope.row" :sup_this="sup_this"/>
          <!-- <el-button  type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button> -->
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
import { type } from "os";
import { types } from "util";
export default {
  components: { eHeader, edit },
  // mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      userInfo: {},
      loading: true,
      year: []
    };
  },
  created() {
    var sql = "select * from user where id='?'";
    sql = sql.replace("?", this.$route.query.id);

    this.$http.post("action", { sql: sql }).then(item => {
      
      var user = (this.userInfo = item.data[0]);
      var start = new Date(user.start_time).getUTCFullYear();
      var end = new Date(user.end_time).getUTCFullYear();
      // debugger,时间读取问题
      var count = (end - start) * 2;
      for (let i = 0; i < count; i++) {
        this.year.push({
          year: Math.ceil(i / 2) + start,
          type: i % 2 == 0 ? "1" : "2",
          uid:user.id,
          uname:user.username
        });
      }
      //  new Date(use.start_time)
    });

    this.loading = false;
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
      var params = { uid: row.uid, type: this.type, uname: row.name };
      this.$http.post("insert", { table: "award", data: params }).then(item => {
        this.delLoading = false;
      });
    },
    stateFormat(row, column) {
      if (row.type === "1") {
        return "上学期";
      } else if (row.type === "2") {
        return "下学期";
      }
      return row.type;
    },

    // 导出
    download() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "姓名",
          "排名",
          "综合成绩",
          "品德",
          "文体表现",
          "个人能力"
        ];
        const filterVal = [
          "name",
          "sort",
          "grade",
          "pinden",
          "wenhua",
          "ability"
        ];
        const data = this.formatJson(filterVal, this.allscore);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "综合测评报告"
        });
        this.downloadLoading = false;
      });
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "createTime" || j === "lastPasswordResetTime") {
            return parseTime(v[j]);
          } else if (j === "enabled") {
            return parseTime(v[j]) ? "启用" : "禁用";
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>

<style scoped>
</style>
