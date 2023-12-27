<template>
  <div class="main-box">
    <ErrorPage v-if="flage" />
    <div v-if="!flage">
      <el-input v-model="search" style="width: 300px; padding: 0 10px 10px 0;" placeholder="请输入内容" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>

    </div>
    <el-table
      v-if="!flage"
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
        label="参赛名称"
        min-width="151"
        show-overflow-tooltip
      />
      <el-table-column
        prop="iphone"
        label="电话"
        min-width="168"
        show-overflow-tooltip
      />
      <el-table-column
        prop="motto"
        label="座右铭"
        min-width="153"
        show-overflow-tooltip
      />
      <el-table-column
        prop="age"
        label="年龄"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="state"
        label="审核状态"
        min-width="90"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-tag :type="getStateClass(scope.row.state)">{{ getStateLabel(scope.row.state) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        min-width="180"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-tag :type="getSexClass(scope.row.sex)">{{ getSexLabel(scope.row.sex) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200px">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="success"
            @click="handleExamine(scope.$index, scope.row)"
          >审核</el-button> -->
          <el-button
            size="mini"
            type="success"
            @click="handleExamine(scope.$index, scope.row)"
          >审核</el-button>
          <ExaminDialog v-if="scope.row.dialogFlag" :dialogflag.sync="scope.row.dialogFlag" :fromdata="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Get_EnrollList } from '@/api/compete'
import ErrorPage from '@/views/error-page/404.vue'
import ExaminDialog from '@/views/compete/components/ExaminDialog.vue'
export default {
  name: 'CompeteExamine',
  components: {
    ErrorPage,
    ExaminDialog
  },
  data() {
    return {
      tableData: [],
      competeid: 0,
      flage: false,
      search: '',
      dialogFlage: false
    }
  },
  watch: {
    // 监视 scope.row.dialogFlag 的变化
    'tableData': {
      handler: function(newTableData, oldTableData) {
        // 获取新数据的 dialogFlag
        const dialogFlag = newTableData.map(item => item.dialogFlag)

        // 判断是否存在 dialogFlag 为 false 的情况
        if (dialogFlag.includes(false)) {
          this.reloadTableData()
        }
      },
      deep: true
    }
  },
  created() {
    this.competeid = this.$route.params.competeid
    // console.log('Competition ID:', this.competeid)
    this.judge()
    this.getlist()
  },
  methods: {
    reloadTableData() {
      // 当 dialogFlag 变为 false 时重新获取数据
      Get_EnrollList(this.competeid).then(result => {
        // console.log(result)
        if (result.data) {
          this.tableData = result.data
        }
      })
    },
    handleExamine(index, row) {
      // 假设你希望将 dialogFlag 设置为 true，以显示点击行的对话框
      this.$set(this.tableData, index, { ...row, dialogFlag: true })
    },
    getlist() {
      Get_EnrollList(this.competeid).then(result => {
        // console.log(result)
        if (result.data) {
          this.tableData = result.data
        }
      })
    },
    judge() {
      // console.log(this.$route.params.competeid)
      if (this.$route.params.competeid === undefined) {
        // console.log(this.$route.params.competeid)
        this.flage = true // 判断是否有比赛值传过来
      }
    },
    getStateLabel(state) {
      switch (state) {
        case 0:
          return '未审核'
        case 1:
          return '已通过'
        case 2:
          return '未通过'
        default:
          return '未知状态'
      }
    },
    getStateClass(state) {
      switch (state) {
        case 0:
          return 'info'
        case 1:
          return 'success'
        case 2:
          return 'danger'
        default:
          return 'warning'
      }
    },

    getSexClass(sex) {
      switch (sex) {
        case true:
          return ''
        case false:
          return 'warning'
        default:
          return 'danger'
      }
    },
    getSexLabel(sex) {
      switch (sex) {
        case true:
          return '男'
        case false:
          return '女'
        default:
          return '位置性别'
      }
    }
  }
}
</script>

<style scoped>
.main-box{
        padding: 20px;
    }
</style>
