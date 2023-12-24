<template>
  <el-table
    :data="dataTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
  >
    <el-table-column
      label="ID"
      prop="uid"
    />
    <el-table-column
      label="电话"
      prop="iphone"
    />
    <el-table-column
      label="邮箱"
      prop="email"
    />
    <el-table-column
      label="Name"
      prop="name"
    />
    <el-table-column
      align="right"
    >
      <template slot="header">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
        />
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
        >Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getAll } from '@/api/user'
export default {
  data() {
    return {
      dataTable: [],
      search: ''
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async getlist() {
      await getAll().then(result => {
        if (result.data) {
          console.log(result.data)
          this.dataTable = result.data
        }
      })
    }
  }
}
</script>
