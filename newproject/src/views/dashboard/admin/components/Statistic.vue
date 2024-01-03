<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card shadow="hover" style="width: 100%;">
          <div style="width: 100%; display: inline-block; ">
            <el-statistic :value="dateone" time-indices title="🎉比赛报名倒计时🎉">
              <template slot="suffix">
                报名即将结束
              </template>
            </el-statistic>
          </div>
        </el-card>
        <el-card shadow="hover" style="width: 100%;margin-top: 20px; ">
          <div style="width: 100%; display: inline-block; ">
            <el-statistic title="报名人数">
              <template slot="formatter">
                📪{{ mytempdata[0].count }}📪
              </template>
            </el-statistic>
          </div>
        </el-card>
        <el-card shadow="hover" style="width: 100%;margin-top: 20px; ">
          <div style="width: 100%; display: inline-block;">
            <el-statistic title="比赛形式">
              <template slot="formatter">
                🚩{{ getStage(mydata[0].c.stage) }}
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover" style="width: 100%;">
          <div slot="header" class="clearfix">
            <span>{{ mydata[0].c.name }}</span>
          </div>
          <div style="font-size: 18px;text-align: center; margin-top: 35px;" @click="onSubmit(mydata[0].c.id)">
            <el-image
              style="width: 230px; height: 111px"
              :src="`api/Tool/${mydata[0].c.img}`"
              fit="fill"
            />
          </div>
          <el-statistic
            ref="statistic"
            format="HH:mm:ss"
            :value="dateone"
            title="距离开始："
            time-indices
            @finish="hilarity"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    mydata: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      deadline2: Date.now() + 1000 * 60 * 60 * 8,
      deadline3: Date.now() + 1000 * 60 * 30,
      deadline4: Date.now() + (new Date().setHours(23, 59, 59) - Date.now()),
      deadline5: new Date('2023-05-06'),
      stop: true,
      dateone: '',
      mytempdata: ''
    }
  },
  watch: {
    mydata(newVal) {
      this.mytempdata = newVal
      this.dateone = this.mytempdata[0].c.startTime
      this.dateone = new Date(this.dateone)
    }
  },
  created() {
  },
  methods: {
    hilarity() {
      this.$notify({
        title: '提示',
        message: '时间已到',
        duration: 0
      })
    },
    clickFn() {
      this.$refs.statistic.suspend(this.stop)
      this.stop = !this.stop
    },
    add() {
      this.deadline3 = this.deadline3 + 1000 * 10
    },
    getStage(id) {
      switch (id) {
        case 1:
          return '决赛'
        case 2:
          return '初赛-决赛'
        case 3:
          return '初赛-复赛-决赛'
        default:
          return '未知'
      }
    },
    onSubmit(id) {
      console.log(id)
      this.$router.push({ path: '/compete/oneContent', query: { competeid: id }})
    }
  }
}
</script>
