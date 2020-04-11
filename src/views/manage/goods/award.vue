<template>
  <div class="app-container">

    <!--表格渲染-->
    <el-table v-loading="loading" :data="allscore" size="small" style="width: 100%;">
      <el-table-column prop="uname" label="姓名" />
      <el-table-column prop="type" label="类型"  :formatter = "stateFormat" />
     
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
         
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
  // components: { eHeader, edit },
  // mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      allscore: [],
      loading: true,
      type: 0
    };
  },
  created() {
    getInfo().then(res => {
      // debugger
      var sql = "select * from award where uname='?'";
      sql = sql.replace("?", res.username);
      if (res.job === "学生") {
        this.$http.post("action", { sql: sql }).then(item => {
          this.allscore = item.data;
        });
      }
      this.loading = false;
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
      var params = { uid: row.uid, type: this.type, uname: row.name };
      this.$http.post("insert", { table: "award", data: params }).then(item => {
        this.delLoading = false;
      });
    },
     stateFormat(row, column) {

        if (row.type === '1') {
          return '一等'
        } else if (row.type === '2') {
          return '二等'
        } else if (row.type === '3') {
          return '三等'
        }
        return row.type
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
