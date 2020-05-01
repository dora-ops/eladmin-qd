<template>
  <div class="app-container">
    <eHeader :query="query" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="kind" label="案件种类" />
      <el-table-column prop="name" label="案件名称" />
      <el-table-column prop="handleTime" label="处理时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.handleTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uname" label="负责人姓名" />
      <el-table-column prop="uid" label="负责人警号" />
      <el-table-column prop="dealUid" label="审核人警号" />
      <el-table-column prop="content" label="侦查详情" />
      <el-table-column prop="dealUname" label="审核人姓名" />
      <el-table-column prop="cid" label="登记编号" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this" />
          <el-popover v-if="checkPermission(['ADMIN'])" :ref="scope.row.id" placement="top" width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
          <el-button v-if="scope.row.dealUname!='-1'" slot="reference" @click="addCaseInfo(scope.row)" size="mini">审核通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { del } from "@/api/investigationInfo";
import { parseTime } from "@/utils/index";
import eHeader from "./module/header";
import edit from "./module/edit";
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = "api/investigationInfo";
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
    subDelete(id) {
      this.delLoading = true;
      del(id)
        .then(res => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500
          });
        })
        .catch(err => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err.response.data.message);
        });
    },
    addCaseInfo(form) {
      var sql = "select * from reg_info where id=?";
      sql = sql.replace("?", form.cid);
      this.$http.post("/action", { sql: sql }).then(res => {
        var data=res.data[0]
        var param = {
          kind: form.kind,
          name: form.name,
          imp: data.imp,
          //  result:'',
          summary: data.summary,
          uid: data.uid,

          uname: data.uname,
          deal_id: form.dealUid,
          deal_name: form.dealUname,
           detail:form.content,
          //  start_time:this.form.startTime,
          //  end_time:'',
          status: "开始"
        };
        this.$http
          .post("/insert", { table: "case_info", data: param })
          .then(res => {
             sql = "update  investigation_info set deal_uname='-1' where id=?";
            sql = sql.replace("?", form.id);
            this.$http.post("/action", { sql: sql }).then(res => {
                this.init();
            })
          });
      });
    }
  }
};
</script>

<style scoped>
</style>
