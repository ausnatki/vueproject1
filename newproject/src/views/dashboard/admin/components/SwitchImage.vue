<template>
  <el-carousel direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in 3" :key="item">
      <el-image
        style="width: 100%; height: 100%;"
        :src="`api/Tool/0001.png`"
        fit="fill"
      />
    </el-carousel-item>
  </el-carousel>
</template>

  <style>
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  </style>
