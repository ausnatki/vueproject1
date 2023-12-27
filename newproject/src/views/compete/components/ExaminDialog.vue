<template>
  <div>
    <!-- Form -->
    <!-- <el-button type="text">打开嵌套表单的 Dialog</el-button> -->
    <!-- <el-button
      size="mini"
      type="success"
      @click="dialogFormVisible = true"
    >审核</el-button> -->
    <el-dialog title="选手信息" :visible.sync="dialogFormVisible">

      <el-form :model="form" style="margin: 0 0 0 -50px;">
        <el-form-item label="照片" :label-width="formLabelWidth">
          <el-image
            style="width: 100px; height: 150px"
            :src="`api/Tool/${form.img}`"
            fit="contain"
          />
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" :disabled="true" />
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" :disabled="true" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.sex" label="true" :disabled="true">男</el-radio>
          <el-radio v-model="form.sex" label="false" :disabled="true">女</el-radio>
        </el-form-item>
        <el-form-item label="座右铭" :label-width="formLabelWidth">
          <el-input v-model="form.motto" :disabled="true" />
        </el-form-item>
        <el-form-item label="个人介绍" :label-width="formLabelWidth">
          <el-input
            v-model="form.biography"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.iphone" :disabled="true" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="NoPass()">审核 不通过</el-button>
        <el-button type="primary" @click="Pass()">审核 通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Examin } from '@/api/compete'
export default {
  props: {
    fromdata: {
      type: Object,
      required: true
    },
    dialogflag: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogFormVisible: true,
      form: {
        name: this.fromdata.name,
        biography: this.fromdata.biography,
        id: this.fromdata.id,
        iphone: this.fromdata.iphone,
        motto: this.fromdata.motto,
        sex: this.fromdata.sex,
        img: this.fromdata.img,
        age: this.fromdata.age,
        state: this.fromdata.state,
        c_ID: this.fromdata.c_ID,
        u_ID: this.fromdata.u_ID
      },
      formLabelWidth: '150px'
    }
  },
  watch: {
    // 监听子组件内部的 dialogFormVisible 变化
    dialogFormVisible(newVal) {
      // 向上传递关闭信息给父组件
      if (newVal === false) {
        this.$emit('update:dialogflag', newVal)
      }
    }
  },
  created() {
    console.log(this.fromdata)
  },
  methods: {
    Pass() {
      if (this.form.state === 1) {
        this.$message({
          message: '你已通过无需再次审核',
          type: 'warning'
        })
        return
      }
      this.form.state = 1
      Examin(this.form).then(result => {
        this.$message({
          message: result.message,
          type: 'success'
        })
        this.dialogFormVisible = false
      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    },
    NoPass() {
      if (this.form.state === 2) {
        this.$message({
          message: '已经是该状态无需再次审核',
          type: 'warning'
        })
        return
      }
      this.form.state = 2
      Examin(this.form).then(result => {
        this.$message({
          message: result.message,
          type: 'success'
        })
        this.dialogFormVisible = false
      }).catch(error => {
        this.$message({
          message: error.message,
          type: 'error'
        })
      })
    }
  }
}
</script>
