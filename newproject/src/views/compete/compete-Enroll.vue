<template>
  <div class="main-box">
    <ErrorPage v-if="flage" />
    <el-form v-if="!flage" ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="Name">
        <el-input v-model="form.Name" />
      </el-form-item>
      <el-form-item label="电话" prop="Iphone">
        <el-input v-model="form.Iphone" />
      </el-form-item>
      <el-form-item label="座右铭" prop="Motto">
        <el-input v-model="form.Motto" />
      </el-form-item>
      <el-form-item label="性别" prop="Sex">
        <el-radio-group v-model="form.Sex">
          <el-radio label="true">男</el-radio>
          <el-radio label="false">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人照片" prop="Img">
        <upload v-model="form.Img" />
      </el-form-item>
      <el-form-item label="出生日期" prop="Age">
        <el-col :span="11">
          <el-date-picker v-model="form.Age" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="个人简介" prop="Biography">
        <el-input v-model="form.Biography" type="textarea" />
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
import ErrorPage from '@/views/error-page/404.vue'
import { CreateEnroll } from '@/api/compete'

export default {
  name: 'CompeteAdd',
  components: {
    Upload,
    ErrorPage
  },
  data() {
    return {
      form: {
        Name: '',
        Iphone: '',
        Age: '',
        Sex: '',
        Motto: '',
        Biography: '',
        Img: '',
        State: '0',
        C_ID: this.$route.params.competeid,
        U_ID: 0
      },
      rules: {
        Name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2-10之间', trigger: 'blur' }
        ],
        Iphone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { pattern: /^\d{11}$/, message: '请输入11位有效电话号码', trigger: 'blur' }
        ],
        Motto: [
          { required: true, message: '请输入座右铭', trigger: 'blur' }
        ],
        Sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        Img: [
          { required: true, message: '请选择个人照片', trigger: 'change' }
        ],
        Age: [
          { required: true, message: '请选择起止时间', trigger: 'change' }
        ],
        Biography: [
          { required: true, message: '请输入个人简介', trigger: 'blur' }
        ]
      },
      flage: false
    }
  },
  created() {
    this.judge()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 计算age值
          const birthDate = this.form.Age
          if (birthDate) {
            const today = new Date()
            const birth = new Date(birthDate)
            const age = today.getFullYear() - birth.getFullYear()
            this.form.Age = age
          }
          this.form.Sex = this.form.Sex === 'true'
          CreateEnroll(this.form)
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
    },

    judge() {
      // console.log(this.$route.params.competeid)
      if (this.$route.params.competeid === undefined) {
        // console.log(this.$route.params.competeid)
        this.flage = true
      }
    }
  }
}
</script>

  <style scoped>
      .main-box{
          padding: 50px;
      }
  </style>

