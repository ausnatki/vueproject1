<template>
  <div class="main-box">
    <div class="top">
      <el-button type="primary" round @click="Enroll(competeid)">报名比赛</el-button>
    </div>
    <div class="buttom">
      <h2>比赛列表</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompeteOneContent',
  data() {
    return {
      competeid: 0
    }
  },
  created() {
    this.competeid = this.$route.params.competeid // 这是我的比赛id
  },
  methods: {
    Enroll(id) {
      this.$router.push({ name: 'CompeteEnroll', params: { competeid: id }})
    }
  }
}
</script>

<style scoped>
 .mian-box{
  padding: 10px;
 }
</style>
