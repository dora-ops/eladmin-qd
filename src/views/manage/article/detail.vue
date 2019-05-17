<template>
    <div>
        <h1>实习报告</h1>
        <span>标题:{{form.title}}</span>
        <!-- <el-input v-model="title" style="width: 370px;" /> -->

        <div style="margin: 12px 5px;font-size: 16px;font-weight: bold;color: #696969">内容：</div>
        <div class="editor-content" v-html="form.content" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import E from "wangeditor";
import { getToken } from "@/utils/auth";
import { html_encode, html_decode,article } from "@/sqlMap";
export default {
  data() {
    return {
      headers: {
        Authorization: "Bearer " + getToken()
      },
      editorContent: "",
      title: "",
      form:{}
    };
  },
  computed: {
    ...mapGetters(["imagesUploadApi"])
  },
  created() {
    var id = this.$route.params.id;
    // debugger
    var sql = article.getOne.replace("?", id)
    this.$http.post("/action", { sql: sql }).then(res => {
      //   debugger
      var data = res.data[0];
      this.form = data;

    });
   
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    // 不可修改
    editor.customConfig.uploadImgHeaders = this.headers;
    // 自定义文件名，不可修改，修改后会上传失败
    editor.customConfig.uploadFileName = "file";
    editor.customConfig.uploadImgServer = this.imagesUploadApi; // 上传图片到服务器
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
  },
  methods: {
    doSubmit() {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var data = {
        title: this.title,
        content: this.editorContent,
        cus: userInfo.username
      };
      this.$http
        .post("insert", { table: "article", data: data })
        .then(res => {});
    }
  }
};
</script>

<style scoped>
.editor-content {
  padding-left: 5px;
}
</style>
