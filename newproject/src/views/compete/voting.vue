<template>
  <div class="flex-container">
    <div v-for="item in items" :key="item.id" class="item">
      <p>
        <label style="margin-right: 16px;">参赛作品:{{ item.c.SongName }}</label>
      </p>
      <div style="width: 240px" :loading="loading" animated>
        <template slot="template">
          <div
            variant="image"
            style="width: 240px; height: 240px;"
          />
          <div style="padding: 14px;">
            <div variant="h3" style="width: 50%;" />
            <div
              style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;"
            >
              <div variant="text" style="margin-right: 16px;" />
              <div variant="text" style="width: 30%;" />
            </div>
          </div>
        </template>
        <template>
          <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
            <img
              style="width: 230px; height: 200px ;"
              :src="`api/Tool/${item.img}`"
              fit="fill"
            >
            <div style="padding: 14px;">
              <div class="bottom card-header">
                <p style="display: block; margin: 0;">姓名：{{ item.name }}</p>
                <el-divider />
                <span>得票数：{{ item.c.count }}  </span>
                <el-button type="text" class="button" style="font-size: 15px;margin-left: 60px;" @click="vote(item)">投票</el-button>
              </div>
            </div>
          </el-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Getinfo, Vote, GetCompete } from '@/api/vote'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      currentDate: '2021-06-01',
      competeid: '',
      uid: this.$store.state.user.uid,
      items: [],
      role: '', // 这是我的结束
      count: '' // 这是我的投票数
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.competeid = this.$route.query.competeid // 这是我的比赛id
    // console.log(this.$store.state.user.uid)
    this.getinfo()
    this.InitCompete()
  },
  methods: {
    getinfo() {
      Getinfo(this.competeid, this.uid).then(result => {
        // console.log(result.data.result.result.result)
        this.count = result.data.result.result.result
        this.role = result.data.result.result.role
        // console.log(result.data.result.result.role)
      }).catch(Response => {
        console.log(Response)
        // 如果这个用户是普通用户的话是0，如果是歌手的话是1，如果是评委的话是2
      })
    },
    vote(data) {
      // 判断用户角色
      // 0普通用户 1参赛选手 2评委
      const flag = this.roles.includes('admin')
      // 如果是管理员的话
      if (!flag) {
        if (this.role === 0 && this.count >= 1) {
          this.$message({
            type: 'warning',
            message: '您已经投过票了！'
          })
          return
        }
        if (this.role === 2 && this.count === 20) {
          this.$message({
            type: 'warning',
            message: '您的投票数已经用完'
          })
          return
        }
        if (this.role === 1) {
          this.$message({
            type: 'info',
            message: '参赛选手不可投票'
          })
          return
        }
      }
      this.$confirm('确定要投票给这位选手吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Vote(this.competeid, this.uid, data.c.id).then(result => {
          this.$message({
            type: 'success',
            message: '投票成功！'
          })
          // this.InitCompete()
          data.c.count++
          this.count++
        }).catch(Response => {
          this.$message({
            type: 'error',
            message: '服务器错误投票失败！！'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    InitCompete() {
      GetCompete(this.competeid).then(result => {
        console.log(result.data.result)
        this.items = result.data.result
      }).catch(Response => {
        console.log(Response)
      })
    }
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  /* padding: 10px; */
  flex-direction:row;
  padding: 0 0 0 10px;
}

.item {
  width: 250px;
  padding: 20px 20px;
  margin-bottom: 16px;
}

.el-divider--horizontal {
    margin: 6px 0;
}
</style>

