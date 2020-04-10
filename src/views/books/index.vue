<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="_id" label="_id"/>
      <el-table-column prop="title" label="书名"/>
      <el-table-column prop="subtitle" label="副书名"/>
      <el-table-column prop="pic" label="图片"/>
      <el-table-column prop="author" label="作者"/>
      <!-- <el-table-column prop="summary" label="摘要"/> -->
      <el-table-column prop="publisher" label="出版社"/>
      <el-table-column prop="pubplace" label="出版地"/>
      <el-table-column prop="pubdate" label="出版时间"/>
      <el-table-column prop="dura" label="出版时间"/>
      <el-table-column prop="page" label="页数"/>
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="binding" label="装帧方式"/>
      <el-table-column prop="isbn" label="ISBN"/>
      <el-table-column prop="isbn10" label="ISBN 10位"/>
      <el-table-column prop="keyword" label="主题词"/>
      <el-table-column prop="edition" label="版次"/>
      <el-table-column prop="impression" label="印次"/>
      <el-table-column prop="language" label="正文语种"/>
      <el-table-column prop="format" label="开本"/>
      <el-table-column prop="class" label="中图法分类"/>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN'])" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row._id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/books'
import eHeader from './module/header'
import edit from './module/edit'
import axios from "axios";
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = 'books'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
        this.params = { sql: "db.collection('books').get()", type: "query" };
      return true
    },
    subDelete(id) {
      this.delLoading = true
      var sql = "db.collection('books').doc('?').remove()";
      sql = sql.replace("?", id);
      this.params = { sql: sql, type: "delete" };
      axios.post("http://localhost:3000/api/base/vx", this.params).then(res => {
        this.delLoading = false
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        console.log(err.response.data.message)
      })
    },
      formatBoolean: function (row, column, cellValue) {
          var ret = ''
          if (cellValue) {
              ret = "true"
          } else {
              ret = "false"
          }
          if (cellValue instanceof Object){
              ret=JSON.stringify(cellValue)
          }
          return ret;
      },
  }
}
</script>

<style scoped>

</style>
