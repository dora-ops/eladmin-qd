<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="kind" label="案件种类"/>
      <el-table-column prop="name" label="案件名称"/>
      <el-table-column prop="imp" label="重要程度"/>
      <el-table-column prop="summary" label="案件简述"/>
      <el-table-column prop="regTime" label="录入时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.regTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="uname" label="负责人姓名"/>
      <el-table-column prop="uid" label="负责人警号"/>
      <el-table-column prop="dealUid" label="审核人警号"/>
      <el-table-column prop="provider" label="提供联系"/>
      <el-table-column prop="startTime" label="发生时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dealUname" label="审核人姓名"/>
      <!-- <el-table-column prop="cid" label="案件编号"/> -->
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
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
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
import { del } from '@/api/regInfo'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
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
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/regInfo'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      if (type && value) { this.params[type] = value }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    
  }
}
</script>

<style scoped>

</style>
