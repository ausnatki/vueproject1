<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>比赛中</span>
      </div>
      <div v-for="item in mydata" :key="item.name" class="text item">
        <el-tooltip content="点击进入详情页" placement="bottom" effect="light">
          <p class="fontlist" @click="onSubmit(item.c.compete_ID)">{{ item.name }} —— {{ getState(item.c.stage) }}</p>
        </el-tooltip>
      </div>
    </el-card>
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
  methods: {
    onSubmit(id) {
      this.$router.push({ path: '/compete/oneContent', query: { competeid: id }})
    },
    getState(id) {
      switch (id) {
        case 1:
          return '第一场'
        case 2:
          return '第二场'
        case 3:
          return '第三场'
        default:
          return '未知'
      }
    }
  }
}
</script>

<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
}

.fontlist {
    font-size: 15px;
    font-style: italic;
    transition: transform 0.5s, box-shadow 0.5s;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select:none;
}

.fontlist:hover {
    /* background-color: rgb(206, 206, 206); */
    color: #409EFF;
    transform: translateX(10px);
}

</style>
