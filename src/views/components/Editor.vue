<template>
  <div>
      <h1>实习报告</h1>
       <span>标题</span>
    <el-input v-model="title" style="width: 370px;"/>
        
  
      
    <div ref="editor" style="text-align:left;margin: 5px">
    </div>
    <el-button  type="primary" @click="doSubmit">上传</el-button>
    <!-- <div style="margin: 12px 5px;font-size: 16px;font-weight: bold;color: #696969">HTML渲染如下：</div>
    <div class="editor-content" v-html="editorContent"/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import E from 'wangeditor'
import { getToken } from '@/utils/auth'
import { html_encode ,html_decode} from '@/sqlMap'
export default {
  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      editorContent:'',
      title:''
    }
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi'
    ])
  },
  mounted() {
    var editor = new E(this.$refs.editor)
    editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    // 不可修改
    editor.customConfig.uploadImgHeaders = this.headers
    // 自定义文件名，不可修改，修改后会上传失败
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.uploadImgServer = this.imagesUploadApi // 上传图片到服务器
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  },
  methods:{
      doSubmit() {
          var userInfo= JSON.parse(localStorage.getItem('userInfo')) 
          var data={title:this.title,content:this.editorContent,cus:userInfo.username}
       this.$http.post("insert", { table: 'article',data:data }).then(res => {
          
      })
    },
  }
}
</script>

<style scoped>
  .editor-content{
    padding-left: 5px;
  }
</style>
