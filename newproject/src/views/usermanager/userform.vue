<template>
  <div class="main-box">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="form.name" :class="['input-box']" />
      </el-form-item>
      <el-form-item label="常用电话" prop="iphone">
        <el-input v-model="form.iphone" :class="['input-box']" />
      </el-form-item>
      <el-form-item label="常用邮箱" prop="email">
        <el-input v-model="form.email" :class="['input-box']" />
      </el-form-item>
      <el-form-item label="上传图片">
        <uploadimag v-model="form.img" />
      </el-form-item>
      <el-form-item label="设置密码" prop="password">
        <el-input v-model="form.password" type="password" :class="['input-box']" />
        <span>默认为123456</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Uploadimag from '@/views/usermanager/components/Uploadimg.vue'
import { Add } from '@/api/user'

export default {
  name: 'UserForm',
  components: {
    Uploadimag
  },
  props: [],
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      form: {
        name: '',
        iphone: '',
        email: '',
        password: '123456',
        img: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度再3-10之间', trigger: 'blur' }
        ],
        iphone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        email: [
          { required: true, trigger: 'blur', validator: checkEmail }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度再6-12之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // alert('submit!')
          Add(this.form).then(result => {
            console.log(result)
            this.$message({
              message: result.message,
              type: 'success'
            })
            this.$refs.form.resetFields()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}

</script>

<style scoped>
    .main-box{
        padding: 50px;
    }

    .input-box{
        width: 400px;
    }

</style>
