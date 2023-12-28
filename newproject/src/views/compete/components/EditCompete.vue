<template>
  <div>
    <el-dialog title="选手信息" :visible.sync="dialogFormVisible">

      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="比赛名称" prop="Name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="比赛主题" prop="Topic">
          <el-input v-model="form.topic" />
        </el-form-item>
        <el-form-item label="比赛形式" prop="stage">
          <el-select v-model="form.stage" placeholder="请选择活动方式">
            <el-option key="1" label="决赛" value="1" :disabled="true" />
            <el-option key="2" label="初赛-决赛" value="2" :disabled="true" />
            <el-option key="3" label="初赛-半决赛-决赛" value="3" :disabled="true" />
          </el-select>
        </el-form-item>
        <el-form-item label="比赛图片">
          <el-image
            style="width: 200px; height: 150px"
            :src="`api/Tool/${form.img}`"
            fit="fill"
          />
        </el-form-item>
        <el-form-item label="起止时间" prop="StartTime">
          <el-col :span="11">
            <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="form.endTime" placeholder="选择时间" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="比赛说明" prop="Description">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { EditCompete } from '@/api/compete'

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
        description: this.fromdata.description,
        id: this.fromdata.id,
        count: this.fromdata.count,
        endTime: this.fromdata.endTime,
        img: this.fromdata.img,
        stage: this.fromdata.stage.toString(),
        state: this.fromdata.state,
        startTime: this.fromdata.startTime,
        topic: this.fromdata.topic
      },
      formLabelWidth: '150px',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10之间', trigger: 'blur' }
        ],
        topic: [
          { required: true, message: '请输入话题', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请输入开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请输入结束时间', trigger: 'change' }
        ],
        stage: [
          { required: true, message: '请选择阶段', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  // 监听子组件内部的 dialogFormVisible 变化
    dialogFormVisible(newVal) {
    // 向上传递关闭信息给父组件
      if (newVal === false) {
        console.log('这是我子组建中的修改')
        this.$emit('update:dialogflag', newVal)
      }
    }
  },
  created() {
    console.log(this.fromdata)
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          EditCompete(this.form)
            .then(result => {
              // console.log(result)
              this.$message({
                message: result.message,
                type: 'success'
              })
              this.dialogFormVisible = false
            })
            .catch(error => {
              this.$message({
                message: error.message,
                type: 'error'
              })
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

