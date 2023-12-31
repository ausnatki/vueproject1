<template>
  <div>
    <el-dialog title="选手信息" :visible.sync="dialogFormVisible">

      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="比赛阶段">
          <el-input :value="Initstage()" disabled />
        </el-form-item>
        <el-form-item label="设置比赛海报">
          <el-upload
            class="upload-demo"
            drag
            :on-success="imgSuccess"
            action="/api/Tool/imgupload"
            multiple
          >
            <i v-if="compete.img === null" class="el-icon-upload" />
            <el-image
              v-if="compete.img !== null"
              style="width: 100%; height: 100%"
              :src="`/api/Tool/${form.Img}`"
              fit="fill"
            />
            <div v-if="compete.img === null" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="比赛起止时间">
          <el-date-picker
            v-model="timearr"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            disabled
          />
        </el-form-item>
        <el-form-item label="查看参赛选手">
          <el-button type="primary" icon="el-icon-edit" @click="viewP=true">查看参赛选手</el-button>
          <el-button type="primary" icon="el-icon-star-off" @click="setJudge = true">分配评委</el-button>
        </el-form-item>
        <el-form-item v-if="form.Stage!==3" label="设置比赛晋级人数" prop="Description">
          <el-input-number v-model="num" :min="1" :max="20" label="描述文字" />
        </el-form-item>
        <el-form-item label="设置比赛">
          <el-button v-if="form.State === 0" type="warning" icon="el-icon-circle-check">开始比赛</el-button>
          <el-button v-if="form.State === 1" type="danger" icon="el-icon-warning-outline">结束比赛</el-button>
        </el-form-item>
        <el-divider />
        <!-- 查看参赛选手 -->
        <el-dialog
          width="30%"
          title="参赛选手"
          :visible.sync="viewP"
          append-to-body
        />

        <!-- 分配评委 -->
        <el-dialog
          width="650px"
          title="分配评委"
          :visible.sync="setJudge"
          append-to-body
        >
          <el-transfer
            v-model="value"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入姓名查询"
            :data="judegdata"
          />
          <el-divider />
          <el-button type="primary" icon="el-icon-edit" circle @click="SetJudge()" />
        </el-dialog>
        <el-form-item>
          <el-button type="success">确认修改</el-button>
          <el-button @click="dialogFormVisible =false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { Set_Init, Edit_Judegeg } from '@/api/judege'
export default {
  props: {
    compete: {
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
      },
      num: 2,
      formLabelWidth: '150px',
      timearr: [this.compete.StatrtTime, this.compete.EndTime],
      setJudge: false,
      viewP: false,
      judegdata: '',
      value: [],
      userlist: [],
      judegelist: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10之间', trigger: 'blur' }
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
    // console.log(this.fromdata)
    this.form = this.compete
    this.InitJudge()
    // console.log(this.judegdata)
  },
  mounted() {
    // console.log('Create', this.userlist)
  },
  methods: {
    // 这是我评委初始化的值的方法
    generateData() {
      const data = []
      // console.log(this.userlist)
      const users = this.userlist.map(element => element)
      const pinyin = this.userlist.map(element => element.name)
      users.forEach((user, index) => {
        const uname = user.name
        const uid = user.uid
        data.push({
          label: uname,
          key: uid,
          pinyin: pinyin[index],
          disabled: this.form.State !== 0
        })
      })
      return data
    },
    imgSuccess(response) {
      if (response.data && response.data.imageUrl) {
        const Img = response.data.url
        console.log(Img)
      }
    },
    Initstage() {
      switch (this.form.Stage) {
        case 1: return '初赛'
        case 2: return '复赛'
        case 3: return '决赛'
      }
    },
    // 比赛开始的按钮
    GameBegin() {
      // 我需要传入我的具体id
      console.log(this.form.ID)
    },
    // 比赛结束按钮
    GameEnd() {
      // 通过id查找到这张表将这张表的state状态改变，然后再通过设置的比赛晋级人数将这张表的参赛选手添加到下一张表去
      console.log(this.form)
    },
    // 查看参赛选手
    QueryCompeteMan() {
      console.log(this.form.ID)
    },
    // 初始化评委的数据
    InitJudge() {
      // console.log(this.form.ID)
      if (this.form.ID) {
        Set_Init(this.form.ID)
          .then(result => {
            this.userlist = result.userlist
            this.judegelist = result.judegelist
            this.judegdata = this.generateData()
            // console.log(this.userlist)
          })
      }
    },
    // 设置评委
    SetJudge() {
      console.log(this.form.ID)
      this.$confirm('是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.form.ID) {
          Edit_Judegeg(this.form.ID, this.value).then(result => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error.message
            })
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 这是主要是修改比赛的图片
    Onsubmit() {
      console.log(this.form.ID)
    }
  }
}
</script>

