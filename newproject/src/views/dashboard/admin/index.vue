<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group :mydata="countData" />
    <el-row style="background:#fff;margin-bottom:32px;">
      <!-- <line-chart :chart-data="lineChartData" /> -->
      <div style="width: 100%; height: 300px;">
        <SwitchImage :mydata="competelist" />
      </div>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <!-- <raddar-chart /> -->
          <div style="width: 100%;height: 300px;">
            <Competelist :mydata="competelist" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <div style="width: 100%;height: 300px;">
            <Statistic :mydata="nocompete" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetDashboard } from '@/api/compete'
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import Statistic from './components/Statistic.vue'
import Competelist from './components/CompeteList.vue'
import SwitchImage from './components/SwitchImage.vue'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    Statistic,
    Competelist,
    SwitchImage
  },
  data() {
    return {
      competelist: [],
      countData: [],
      nocompete: []
    }
  },
  created() {
    this.getdashboardinfo()
  },
  methods: {
    getdashboardinfo() {
      GetDashboard().then(result => {
        // console.log(result.data)
        this.competelist = result.data.competelist
        this.countData = result.data.countData
        this.nocompete = result.data.nocompete
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

</style>
