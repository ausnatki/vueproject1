<template>
  <div>
    <div v-for="item in List" :key="item.id" class="compete-box" @click="changepage(item.id)">
      <div class="left">
        <div class="left-img">
          <el-image
            style="width: 100%; height: 120px; border-radius: 5px;"
            :src="`api/Tool/${item.img}`"
            fit="contain"
          />
        </div>
      </div>
      <div class="right">
        <div class="right-Name">
          <h3>{{ item.name }}</h3>
        </div>
        <div class="right-Topic">
          <span>{{ item.description }}</span>
        </div>
        <div class="right-Time">
          <span>{{ item.startTime }} ---- {{ item.endTime }}</span>
        </div>
      </div>
      <div class="right-top">
        <span>{{ item.state }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAll } from '@/api/compete.js'
export default {
  name: 'CompeteList',
  data() {
    return {
      List: []
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    async getlist() {
      await getAll().then(result => {
        // console.log(result)
        if (result.date) {
          // console.log(result.date)
          this.List = result.date
        }
      })
    },
    changepage(id) {
      this.$router.push({ name: 'CompeteOneContent', params: { competeid: id }})
    }
  }
}
</script>

<style scoped>
.compete-box {
    position: relative;
    width: 96%;
    height: 150px;
    background-color: rgba(247, 247, 247, 0.842);
    border-radius: 10px;
    margin: 20px;
    transition: transform 0.5s, box-shadow 0.5s;
}

.compete-box:hover {
    transform: translateY(-10px);
    box-shadow: 5px 5px 5px rgb(221, 220, 220);
}

.compete-box:hover::after {
    content: "点击进入详情";
    position: absolute;
    top: 20%;
    left: 60%;
    transform: translateX(-50%);
    padding: 5px;
    background-color: rgba(103, 194, 58, 0.733);
    color: white;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 1s, font-size 0.5s; /* 添加 font-size 过渡效果 */
    font-size: 14px; /* 调整字体大小 */
}

.compete-box:hover::after {
    opacity: 1;
    font-size: 16px; /* 调整悬停时的字体大小 */
}
.left{
    width: 300px;
    height: 120px;
    float: left;
    top:10px;
    padding: 14px 10px 10px 30px;
}
.right{
  line-height: 1.3;
  letter-spacing: 2px; /* 设置字符间距为 2 像素 */
  position: relative;
    width: 800px;
    float: left;
    padding: 10px 10px 0 30px ;
}
.compete-box h3{
  padding: 0;
  margin: 0 0 10px 0;
}
.right-Topic{
  font-style: italic;
  position: absolute;
  font-weight: 100;
  top: 42px;
  max-height: 60px;
  text-indent: 2em; /* 设置缩进的像素值或其他单位 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3; /* 设置显示的行数 */
  max-height: 3 * 1.2em; /* 行高的估计值，可以根据需要调整 */
}
.right-Time{
  position: absolute;
  top:108px ;
  color: rgba(173, 172, 172, 0.836);
}
.right-top {
  position: relative;
  width: 100px; /* 调整宽度 */
  height: 80px; /* 调整高度 */
  float: right;

}

.right-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-top: 80px solid #67C23A; /* 调整三角形高度 */
  border-left: 100px solid transparent; /* 调整三角形宽度 */
  border-radius: 0px 10px 0px 0px;
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.3)); /* 调整阴影参数 */
}

.right-top span {
  position: absolute;
  font-weight: 900;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color:#424346;
  top: 20px;
  left: 55px; /* 调整文字位置 */
  transform: rotate(45deg); /* 旋转文字 */
}
</style>
