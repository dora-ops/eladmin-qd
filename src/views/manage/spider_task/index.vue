<template>
    <div class="app-container">
        <eHeader :query="query" />
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
            <el-table-column prop="state" label="状态" />
            <el-table-column prop="infoId" label="策略id" />
            <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="任务操作">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.state!='finish'" slot="reference" type="primary" size="mini" @click="operate(scope.row)">{{scope.row.state=='progress'?'继续':'启动'}}</el-button>
                </template>
            </el-table-column>
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
import { del, start } from "@/api/spiderTask";
import { parseTime } from "@/utils/index";
import { spider_task, spider_info } from "@/sqlMap";
import eHeader from "./module/header";
import edit from "./module/edit";
var superagent = require("superagent");
var cheerio = require("cheerio");
var url = require("url");
var eventproxy = require("eventproxy");
var toutiaoUrl = "https://toutiao.io/";
var segmentfaultUrl = "https://segmentfault.com/"; //
var geekUrl = "http://geek.csdn.net/hot";
var html5dreamUrl = "http://www.html5dw.com/dev"; //
var tutorialzineUrl = "http://tutorialzine.com/posts/";//
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
      this.url = "api/spiderTask";
      const sort = "id,desc";
      this.params = { page: this.page, size: this.size, sort: sort };
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
    operate(row) {
      var that = this;
      var ep = new eventproxy();
      var sql = spider_info.getOne.replace("?", row.infoId);
      this.$http.post("action", { sql: sql }).then(res => {
        var data = res.data[0];
        var code = data.charset;
        sql = spider_task.update.replace("?", "progress").replace("?", row.id);
        row.state = "progress";
        this.$http.post("action", { sql: sql }).then(res => {
          if ("CSDNProcess" == code) {
            start(row)
              .then(res => {
                this.finish(row);
              })
              .catch(err => {
                console.log(err.response.data.message);
              });
          } else if (code == "toutiao") {
            superagent.get(toutiaoUrl).end(function(error, sres) {
              var $ = cheerio.load(sres.text);

              var data = {
                data: sres.text,
                task_id: row.id,
                url: toutiaoUrl,
                header: JSON.stringify(sres.header)
              };
              that.$http
                .post("insert", { table: "spider_log", data: data })
                .then(res => {});

              $(".post .content a").each(function(index, element) {
                var $element = $(element);

                var title = $element.text();
                var href = url.resolve(toutiaoUrl, $element.attr("href"));
                that.$http
                  .post("insert", {
                    table: "article",
                    data: {
                      title: title,
                      con_tent: href,
                      pub_time: "2019-05-19 11:11:16"
                    }
                  })
                  .then(res => {});
              });
              that.finish(row);
            });
          }else if (code=='segmentfault') {
            //   不支持在浏览器获取，不支持跨域
            //    this.getPosts(row,segmentfaultUrl+'news')
          }else if (code=='geek') {
            //不支持在浏览器获取，不支持跨域
            //   this.getPosts(row,geekUrl)
          }else if (code=='tutorialzine') {
            //   this.getPosts(row,tutorialzineUrl)
          }
        });
      });
    },
    finish(row) {
      var sql = spider_task.update.replace("?", "finish").replace("?", row.id);
      this.$http.post("action", { sql: sql }).then(res => {
        this.init();
        this.$notify({
          title: "启动成功",
          type: "success",
          duration: 2500
        });
      });
    },
    getPosts(row,url) {
        var that = this;
      superagent.get(url).end(function(error, sres) {
          debugger
        var $ = cheerio.load(sres.text);
        var data = {
          data: sres.text,
          task_id: row.id,
          url: url,
          header: JSON.stringify(sres.header)
        };
        that.$http
          .post("insert", { table: "spider_log", data: data })
          .then(res => {});

        $(".news__item .news__item-title a").each(function(index, element) {
          var $element = $(element);
          var title = $element.text();
          var href = url.resolve(segmentfaultUrl, $element.attr("href"));
          that.$http
            .post("insert", {
              table: "article",
              data: {
                title: title,
                con_tent: href,
                pub_time: "2019-05-19 11:11:16"
              }
            })
            .then(res => {});
        });
        that.finish(row);
      });
    }
  }
};
</script>

<style scoped>
</style>
