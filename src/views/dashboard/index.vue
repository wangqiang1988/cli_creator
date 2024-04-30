<template>
  <div>
    <div class="dashboard-editor-container">
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row>
      <el-row :gutter="8">
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:10px;">
          <todo-list />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import LineChart from './components/LineChart'
import PanelGroup from './components/PanelGroup'
import axios from 'axios'

const lineChartData1 = {
  newVisitis: {
    expectedData: [1,2,3,4,5,6,7]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    TodoList,
    LineChart,
    PanelGroup
  },
  data() {
    return {
      lineChartData: lineChartData1.newVisitis
    }
  },
  created() {
    this.fetchExpectedData()
  },
  methods: {
    fetchExpectedData() {
      axios.get('/firewall/logs_count')
        .then(response => {
          // 请求成功，更新 expectedData
          lineChartData1.newVisitis.expectedData = response.data;
          console.log(lineChartData1.newVisitis.expectedData)
        })
        .catch(error => {
          console.error('Error fetching expected data:', error)
        })
    }
  }
  }
</script>


<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(255, 255, 255);
  position: relative;
}
</style>
