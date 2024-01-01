<template>
  <div class="flex-container">
    <div v-for="item in items" :key="item.id" class="item">
      <p>
        <label style="margin-right: 16px;">参赛作品:《狼人情歌》</label>
      </p>
      <el-skeleton style="width: 240px" :loading="loading" animated>
        <template slot="template">
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px;"
          />
          <div style="padding: 14px;">
            <el-skeleton-item variant="h3" style="width: 50%;" />
            <div
              style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;"
            >
              <el-skeleton-item variant="text" style="margin-right: 16px;" />
              <el-skeleton-item variant="text" style="width: 30%;" />
            </div>
          </div>
        </template>
        <template>
          <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
            <img
              style="width: 230px; height: 200px ;"
              :src="`api/Tool/20231226001604.jpg`"
              fit="fill"
            >
            <div style="padding: 14px;">
              <div class="bottom card-header">
                <p style="display: block; margin: 0;">姓名：冉总</p>
                <el-divider />
                <span>得票数：32  </span>
                <el-button type="text" class="button" style="font-size: 15px;margin-left: 60px;">投票</el-button>
              </div>
            </div>
          </el-card>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      currentDate: '2021-06-01',
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 1' },
        { id: 4, name: 'Item 2' },
        { id: 5, name: 'Item 1' },
        { id: 6, name: 'Item 2' },
        { id: 7, name: 'Item 1' },
        { id: 8, name: 'Item 2' },
        { id: 9, name: 'Item 1' },
        { id: 10, name: 'Item 2' },
        { id: 10, name: 'Item 2' },
        { id: 10, name: 'Item 2' },
        { id: 10, name: 'Item 2' },
        { id: 10, name: 'Item 2' }
      ]
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

