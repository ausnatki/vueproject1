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
        <el-form-item v-if="form.img" label="照片" :label-width="formLabelWidth">
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

        <el-form-item v-for="(item,index) in songs" :key="item.ID" :label="getStage(index+1)" :label-width="formLabelWidth">
          <el-input v-model="item.SongName" placeholder="请填写比赛作品" :disabled="competelist[index].State !== 0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">

        <el-button v-if="!songs === ''" type="primary" @click="onsubmit()">提交歌曲</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetEnrollByName, GetSongs, EditSongs } from '@/api/compete'
export default {
  props: {
    competeid: {
      type: Number,
      required: true
    },
    competelist: {
      type: Array,
      required: true
    },
    stage: {
      type: Number,
      required: true
    },
    name: {
      type: String,
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
      form: {},
      formLabelWidth: '150px',
      songs: ''
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
    this.InitForm(this.name, this.competeid)
    this.InitSongs()
  },
  methods: {
    onSubmit() {
      EditSongs().then(result => {
        console.log(result)
        if (result.data) {
          if (result.data.code === 20000) {
            this.$message({
              message: result.data.message,
              tyep: 'success'
            })
          } else {
            this.$message({
              message: result.data.message,
              tyep: 'error'
            })
          }
        }
      }).catch(error => {
        this.$message({
          message: error.data.message,
          tyep: 'error'
        })
      })
    },
    InitForm(name, competeid) {
      GetEnrollByName(name, competeid)
        .then(result => {
          console.log('通过名字获取报名表信息', result)
          this.form = result.data
        })
        .catch(error => {
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
    },
    InitSongs() {
      GetSongs(this.name, this.competeid)
        .then(result => {
          console.log(result)
          this.songs = result.data
        }).catch(error => {
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
    },
    getStage(stage) {
      switch (stage) {
        case 1:
          return '初赛'
        case 2:
          return '复赛'
        case 3:
          return '决赛'
      }
    }
  }
}
</script>

