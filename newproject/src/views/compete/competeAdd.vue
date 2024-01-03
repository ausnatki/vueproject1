<template>
  <div class="main-box">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="比赛名称" prop="Name">
        <el-input v-model="form.Name" />
      </el-form-item>
      <el-form-item label="比赛主题" prop="Topic">
        <el-input v-model="form.Topic" />
      </el-form-item>
      <el-form-item label="比赛形式" prop="Stage">
        <el-select v-model="form.Stage" placeholder="请选择活动方式">
          <el-option label="决赛" value="1" />
          <el-option label="初赛-决赛" value="2" />
          <el-option label="初赛-半决赛-决赛" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="比赛图片">
        <upload v-model="form.Img" />
      </el-form-item>
      <el-form-item label="预计报名截止时间">
        <el-date-picker
          v-model="form.StartTime"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item label="比赛说明" prop="Description">
        <el-input v-model="form.Description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/views/compete/components/Uploadimg.vue'
import { CreateCompete } from '@/api/compete'

export default {
  name: 'CompeteAdd',
  components: {
    Upload
  },
  data() {
    return {
      form: {
        Name: '',
        Topic: '',
        Description: '',
        StartTime: '',
        Stage: '',
        Count: '1',
        Img: '',
        State: '0'
      },
      timearr: '',
      rules: {
        Name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10之间', trigger: 'blur' }
        ],
        Topic: [
          { required: true, message: '请输入话题', trigger: 'blur' }

        ],
        Description: [
          { required: true, message: '请输入描述', trigger: 'blur' }

        ],
        Stage: [
          { required: true, message: '请选择阶段', trigger: 'blur' }

        ],
        Img: [
          { required: true, message: '请选择一张图片', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$nextTick(() => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            CreateCompete(this.form)
              .then(result => {
              // console.log(result)
                this.$message({
                  message: result.message,
                  type: 'success'
                })
                this.$refs.form.resetFields()
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
      })
    }
  }
}
</script>

<style scoped>
    .main-box{
        padding: 50px;
    }
</style>
