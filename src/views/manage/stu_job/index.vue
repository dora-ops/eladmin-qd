<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="resId" label="资源id"/>
      <el-table-column prop="resUrl" label="资源url"/>
      <el-table-column prop="expName" label="实验名称"/>
      <el-table-column prop="expNumber" label="实验编号"/>
      <el-table-column prop="teaName" label="授课教师"/>
      <el-table-column prop="teaNumber" label="教工号"/>
      <el-table-column prop="stuName" label="学生名称"/>
      <el-table-column prop="stuNumber" label="学号"/>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['JOB_ALL'])" prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" @click="downFile(scope.row.resUrl)" size="mini">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="!checkPermission(['JOB_ALL'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN','REDIS_ALL'])" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN','REDIS_ALL'])"
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
import { del } from '@/api/stuJob'
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
      this.url = 'api/stuJob'
      const sort = 'id,desc'
     var userInfo= JSON.parse(localStorage.getItem('userInfo'))
    //  debugger 
     
      this.params = { page: this.page, size: this.size, sort: sort }
       if (checkPermission(['REDIS_ALL'])) {
        //   this.params.stuName=userInfo.username
        this.params.stuNumber=userInfo.id
      }else if (checkPermission(['JOB_ALL'])) {
        //   this.params.teaName=userInfo.username
        this.params.teaNumber=userInfo.id
      }
      console.log(this.params)
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
    downFile(resUrl){
        window.open(resUrl); 
    }
  }
}
</script>

<style scoped>

</style>
