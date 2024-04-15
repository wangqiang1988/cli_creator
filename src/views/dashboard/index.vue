<template>
  <div class="dashboard-container">
    <div class="dashboard-text">cli_creator v1.1
    </div>
    <p>飞塔防火墙策略生成</p>
    <p>飞塔防火墙策略修改</p>
    
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>