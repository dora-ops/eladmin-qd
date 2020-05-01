<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <!-- <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-if="checkPermission(['ADMIN'])"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :sup_this="sup_this" :is-add="true"/>
    </div> -->
     <el-button
      v-if="checkPermission(['ADMIN'])"
      :loading="downloadLoading"
      size="mini"
      class="filter-item"
      type="primary"
      icon="el-icon-download"
      @click="download">导出</el-button>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import eForm from './form'
import { denodeify } from 'q';
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
     sup_this: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      downloadLoading: false,
      queryTypeOptions: [
        { key: 'name', display_name: '案件名称' }
      ]
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
     // 导出
    download() {
      //   <el-table-column prop="id" label="案件编号" />
      // <el-table-column prop="kind" label="案件种类" />
      // <el-table-column prop="name" label="案件名称" />
      // <el-table-column prop="imp" label="重要程度" />
      // <el-table-column prop="result" label="处理结果" />
      // <el-table-column prop="summary" label="案件简述" />
      // <el-table-column prop="uid" label="负责人警号" />
      // <el-table-column prop="uname" label="负责人姓名" />
      // <el-table-column prop="dealId" label="审核人警号" />
      // <el-table-column prop="dealName" label="审核人姓名" />
      // <el-table-column prop="detail" label="案件详情" />
      // <el-table-column prop="startTime" label="发生时间">
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['案件编号', '案件种类', '案件名称', '重要程度', '处理结果', '案件简述', '负责人警号', '负责人姓名', '审核人警号', '审核人姓名', '案件详情', '发生时间', '结案时间', '状态']
        const filterVal = ['id', 'kind', 'name', 'imp', 'result', 'summary', 'uid', 'uname', 'dealId', 'dealName', 'detail', 'startTime', 'endTime', 'status']
      //  debugger
       const data = this.formatJson(filterVal, this.sup_this.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime' || j === 'lastPasswordResetTime') {
          return parseTime(v[j])
        } else if (j === 'enabled') {
          return parseTime(v[j]) ? '启用' : '禁用'
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
