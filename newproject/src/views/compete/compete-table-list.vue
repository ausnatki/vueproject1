<template>
  <div class="main-box">
    <div>
      <el-input v-model="search" style="width: 300px; padding: 0 10px 10px 0;" placeholder="请输入内容" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-share" @click="competeAdd">添加</el-button>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="序号"
        min-width="52"
      />
      <el-table-column
        prop="name"
        label="比赛名称"
        min-width="151"
        show-overflow-tooltip
      />
      <el-table-column
        prop="topic"
        label="比赛主题"
        min-width="168"
        show-overflow-tooltip
      />
      <el-table-column
        prop="description"
        label="比赛说明"
        min-width="153"
        show-overflow-tooltip
      />
      <el-table-column
        prop="state"
        label="比赛状态"
        min-width="90"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span :class="getStateClass(scope.row.state)">
            {{ getStateLabel(scope.row.state) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        min-width="180"
        show-overflow-tooltip
      />
      <el-table-column
        prop="endTime"
        label="结束时间"
        min-width="180"
        show-overflow-tooltip
      />

      <el-table-column label="操作" min-width="200px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleExamine(scope.$index, scope.row)"
          >审核</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAll } from '@/api/compete'
export default {
  name: 'CompeteTableList',
  data() {
    return {
      tableData: [],
      search: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getStateLabel(state) {
      switch (state) {
        case 0:
          return '未开始'
        case 1:
          return '正在进行中'
        case 2:
          return '已经结束'
        default:
          return '未知状态'
      }
    },
    getStateClass(state) {
      switch (state) {
        case 0:
          return 'not-started'
        case 1:
          return 'in-progress'
        case 2:
          return 'finished'
        default:
          return ''
      }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleExamine(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    competeAdd() {
      this.$router.push('/compete/add') // 你的新增比赛页面的路径
    },
    getList() {
      getAll().then(result => {
        if (result.date) {
          console.log(result)
          this.tableData = result.date
        }
      })
    }
  }
}
</script>

<style scoped>
.main-box{
        padding: 20px;
    }
.not-started {
  display: inline-block;
  background: rgba(144, 147, 153, 0.2); /* Set your desired background color for "未开始" */
  padding: 6px; /* Adjust padding as needed */
  border-radius: 4px; /* Add border-radius for rounded corners */
}

.in-progress {
    display: inline-block;
  background: rgba(103, 194, 58, 0.3); /* Set your desired background color for "未开始" */
  padding: 6px; /* Adjust padding as needed */
  border-radius: 4px; /* Add border-radius for rounded corners */
}

.finished {
    display: inline-block;
  background: rgba(245, 108, 108, 0.3); /* Set your desired background color for "未开始" */
  padding: 6px; /* Adjust padding as needed */
  border-radius: 4px; /* Add border-radius for rounded corners */
}
</style>
