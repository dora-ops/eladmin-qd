<template>
    <!-- 另一个项目页面，引用了公共css，在此不引入 -->
    <div id="authorityBox">
        <h1 style="text-align:center">教案</h1>
        <el-row>
            <el-col :span="8" v-for="(o, index) in topicList" :key="o" :offset="index > 0 ? 3 : 0">
                <el-card :body-style="{ padding: '0px' }">
                    <p class="type">{{o.type}}</p>
                    <img :src="o.file_type" class="image">
                    <p class="title">
                        <a href="#">教案名：{{o.name}}</a>
                    </p>
                    <div style="padding: 14px;">

                        <div>简介：{{o.info}}</div>
                        <!-- <div class="org-info" style="top: 44px;">
                            <a href="/org/view?org=eduky" target="_blank">
                                <div class="pic-size">
                                    <div class="pic-wrap">
                                        <img src="https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/doc/pic/item/9e3df8dcd100baa16a8a680f4410b912c9fc2edb.jpg" alt="考研资料专区">
                                    </div>
                                </div>
                            </a>
                            <div class="brief">
                                <p>来自机构&nbsp;
                                    <a href="/org/view?org=eduky" target="_blank">{{o.create_name}}</a>
                                    <b class="bg-index ic-vrfeh"></b>
                                </p>
                                <p>
                                    <span>贡献
                                        <b>801870</b>篇文档</span>
                                </p>
                            </div>
                        </div> -->
                        <div class="bottom clearfix">
                            <time class="time">{{ o.create_time }}</time>
                            <el-button type="text" class="button">查看</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- <div class="top-box">

            <ul>
                <li class="" v-for="item in  topicList" :key="item.id">
                    <a href="#" target="_blank">
                        <p class="type">{{item.type}}</p>
                        <img class="img-hover" :src="item.file_type" width="261" height="125">
                    </a>
                    <p class="title">
                        <a href="#" target="_blank">{{item.name}}</a>
                    </p>
                    <div class="show-box">
                        <p class="summary" style="top: 0px;">{{item.info}}</p>

                    </div>
                </li>
            </ul>
        </div> -->
    </div>

</template>

<script>
import { mapGetters } from "vuex";
import { examOpt, topicOpt, tea_resource } from "../../sqlMap.js";
export default {
  name: "authorityBox",
  data() {
    return {
      topicList: []
    };
  },
  computed: {
    ...mapGetters(["user", "updateAvatarApi"])
  },
  created() {
    this.$http
      .post("action", {
        sql: "select * from tea_resource where create_id=?".replace(
          "?",
          this.user.id
        )
      })
      .then(res => {
        this.topicList = res.data;
      });
  }
};
</script>

<style scoped>
</style>
