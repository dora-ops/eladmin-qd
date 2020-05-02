<template>
  <div class="app-container">
    <eHeader :sup_this="sup_this" :query="query" />
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="id" label="案件编号" />
      <el-table-column prop="kind" label="案件种类" />
      <el-table-column prop="name" label="案件名称" />
      <el-table-column prop="imp" label="重要程度" />
      <el-table-column prop="result" label="处理结果" />
      <el-table-column prop="summary" label="案件简述" />
      <el-table-column prop="uid" label="负责人警号" />
      <el-table-column prop="uname" label="负责人姓名" />
      <el-table-column prop="dealId" label="审核人警号" />
      <el-table-column prop="dealName" label="审核人姓名" />
      <el-table-column prop="detail" label="案件详情" />
      <el-table-column prop="startTime" label="发生时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结案时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="案件状态" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="scope.row.status=='开始'" :data="scope.row" :sup_this="sup_this" />
          <el-popover v-if="checkPermission(['ADMIN'])" :ref="scope.row.id" placement="top" width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
          <!-- <edit :opt="1" v-if="scope.row.status=='开始'" :data="scope.row" :sup_this="sup_this" /> -->
          <!-- <el-button v-if="scope.row.status=='开始'" slot="reference" @click="addProjectInfo(scope.row)" size="mini">执行案件</el-button> -->
          <el-button v-if="scope.row.status=='通过'" slot="reference" @click="to(scope.row)" size="mini">提交结案</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :append-to-body="true" :visible.sync="dialog" :title="案件执行" width="500px">
      <el-form ref="form" :model="form" size="small" label-width="100px">

        <el-form-item label="处理结果" prop="result">
          <el-input type="textarea" v-model="form.result" style="width: 370px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button type="primary" @click="addClosedInfo">确认</el-button>
      </div>
    </el-dialog>
    <!--分页组件-->
    <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { del } from "@/api/caseInfo";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils/index";
import { add, edit as toEdit} from "@/api/caseInfo";
import eHeader from "./module/header";
import edit from "./module/edit";
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      dialog: false,
      form: {}
    };
  },
  computed: {
    ...mapGetters(["user", "updateAvatarApi"])
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
      this.url = "api/caseInfo";
      const sort = "id,desc";
      this.params = { page: this.page, size: this.size, sort: sort };
      const query = this.query;
      const type = query.type;
      const value = query.value;
      if (type && value) {
        this.params[type] = value;
      }
      this.params["uid"] = this.user.id;
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
    addProjectInfo(form) {
      var param = {
        name: form.name,
        raise_time: parseTime(form.startTime),
        execute_time: parseTime(new Date().getTime()),

        uid: form.uid,

        uname: form.uname,

        deal_uid: form.dealId,
        deal_uname: form.dealName,
        content: form.detail,
        //  start_time:this.form.startTime,
        //  end_time:'',
        cid: form.id
      };
      this.$http
        .post("/insert", { table: "project_info", data: param })
        .then(res => {
          var sql = "update  case_info set status='进行中' where id=?";
          sql = sql.replace("?", form.id);
          this.$http.post("/action", { sql: sql }).then(res => {
            this.init();
          });
        });
    },
    addClosedInfo() {
      toEdit(this.form).then(res => {
        var param = {
          name: this.form.name,
          end_time: parseTime(new Date().getTime()),
          uid: this.form.uid,
          uname: this.form.uname,
          deal_uid: this.form.dealId,
          deal_name: this.form.dealName,
          content: this.form.detail,
          cid: this.form.id
        };
        this.$http
          .post("/insert", { table: "closed_info", data: param })
          .then(res => {
            var sql = "update  case_info set status='结案中' where id=?";
            sql = sql.replace("?", this.form.id);
            this.$http.post("/action", { sql: sql }).then(res => {
              this.dialog = false;
              this.init();
            });
          });
      });
    },
    to(row) {
      this.form = row;
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
</style>
