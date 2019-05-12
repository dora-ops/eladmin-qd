
<template>
    <div>
        <h1 style="center">标题:{{form.title}}
            <!-- <i :class="soucan?'el-icon-star-on':'el-icon-star-off'" @click="tosoucan(form.topic)" style="font-size:25px"></i> -->
        </h1>
        <h2>内容:{{form.content}}</h2>
        <h2>创建时间：{{form.create_time}}</h2>
        <div>阅读次数：{{form.count}}</div>
        <div></div>
    </div>
</template>

<script>
import { initData } from "@/api/data";
import { resource, topic, collect } from "@/sqlMap";
import Cookies from "js-cookie";
export default {
  name: "home",
  data() {
    return {
      form: {
        
      },
      pic: [],
      video: [],
      soucan: false
    };
  },
  created() {
    var id = this.$route.params.id;
    // debugger
    var sql = topic.getOne.replace("?", id);
    this.$http.post("/action", { sql: sql }).then(res => {
      
      var data = res.data[0];
      this.form = data;
      sql = topic.inc.replace("?", id);
        this.$http.post("/action", { sql: sql }).then(res => {})
    });
   
  },
  methods: {
    tosoucan: function(topic) {
      var sql = "";
      var id = this.$route.params.id;

      if (!this.soucan) {
        //   debugger
        var username = Cookies.get("username");
        this.$http
          .post("/insert", {
            table: "collect",
            data: {
              topic: topic,
              user_id:username,
              pub_id: id
            }
          })
          .then(res => {
            this.soucan = !this.soucan;
          });
      } else {
        sql = collect.delete
          .replace("?", Cookies.get("username"))
          .replace("?", id);
        this.$http.post("/action", { sql: sql }).then(res => {
          this.soucan = !this.soucan;
        });
      }
    }
  }
};
</script>
<style scoped>
</style>
