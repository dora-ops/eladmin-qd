<template>
    <div class="app-container">
        <eHeader :query="query" />
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
            <el-table-column prop="title" label="标题" />
            <!-- <el-table-column prop="content" label="内容"/> -->
            <el-table-column prop="cus" label="学生" />
            <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="成绩">
                <template slot-scope="scope">
                    <el-button @click="toScore(scope.row)" size="mini">打分</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.read!=1" @click="read(scope.row.id)" size="mini">批阅</el-button>
                    <!-- <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this"/> -->
                    <el-popover v-if="checkPermission(['ADMIN'])" :ref="scope.row.id" placement="top" width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
        <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'打分'" width="500px">
            <el-form ref="form" :model="form" size="small" label-width="80px">
                <el-form-item label="标题" prop="title">
                    <el-input :readonly="true" v-model="form.title" style="width: 370px;" />
                </el-form-item>
                <el-form-item label="分数" prop="title">
                    <el-input  v-model="form.score" style="width: 370px;" />
                </el-form-item>
                <el-form-item label="学生" prop="cus">
                    <el-input :readonly="true" v-model="form.cus" style="width: 370px;" />
                </el-form-item>
                <el-form-item label="老师" prop="cus">
                    <el-input :readonly="true" v-model="form.tea" style="width: 370px;" />
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancel">取消</el-button>
                <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { del } from "@/api/article";
import { parseTime } from "@/utils/index";
import eHeader from "./module/header";
import edit from "./module/edit";
import { html_encode, html_decode, article } from "@/sqlMap";
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      dialog: false,
      form: {},
      loading: false
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
      this.url = "api/article";
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
    read: function(id) {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var sql = article.read.replace("?", userInfo.username).replace("?", id);
      this.$http.post("/action", { sql: sql }).then(res => {});
      let routeData = this.$router.resolve({ path: "/art_detail/" + id });
      window.open(routeData.href, "_blank");
    },
    cancel() {
      this.resetForm();
    },
    toScore(row) {
        this.dialog=true
        this.form.cus=row.cus
        this.form.title=row.title
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.form.tea=userInfo.username
    },
     doSubmit() {
      this.$http.post("insert", { table: 'grade',data:this.form }).then(res => {
          this.dialog=false
      })
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        title: "",
        content: "",
        cus: "",
        createTime: "",
        tea: "",
        read: ""
      };
    }
  }
};
</script>

<style scoped>
</style>
