<template>
  <div>
  <div class="dashboard-editor-container">
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


export default {
  name: 'DashboardAdmin',
  components: {
    TodoList
  },
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(255, 255, 255);
  position: relative;
}

</style>