<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="策略名称">
        <el-input v-model="form.name" style="width: 40%;"  placeholder="例:dns"/>
      </el-form-item>
      <el-form-item label="源接口">
        <el-input v-model="form.srcif" type="textarea" style="width: 40%;" placeholder="例:x1"/>
      </el-form-item>
      <el-form-item label="目的接口">
        <el-input v-model="form.desif" type="textarea" style="width: 40%;" placeholder="例:x2"/>
      </el-form-item>
      <el-form-item label="源地址">
        <el-input v-model="form.srcadd" type="textarea" style="width: 40%;" placeholder="例:10.1.1.1,10.1.1.2，用英文,隔开">
        </el-input>
      </el-form-item>
      <el-form-item label="目的地址">
        <el-input v-model="form.desadd" type="textarea" style="width: 40%;" placeholder="例:223.5.5.5,119.29.29.29，用英文,隔开"/>
      </el-form-item>
      <el-form-item label="TCP端口">
        <el-input v-model="form.tcpport" type="textarea" style="width: 40%;" placeholder="例:53,icmp，用英文,隔开"/>
      </el-form-item>
      <el-form-item label="UDP端口">
        <el-input v-model="form.udpport" type="textarea" style="width: 40%;" placeholder="例:53，用英文,隔开"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成命令</el-button>
      </el-form-item>
      <el-form-item v-show="form.command" label="命令">
        <el-input v-show="form.command" v-model="form.command" type="textarea" :rows="6" />
        <el-button v-show="form.command" v-clipboard:copy="form.command" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
  directives: {
    clipboard
  },
  data() {
    return {
      form: {
        name: '',
        srcif: '',
        desif: '',
        srcadd: '',
        desadd: '',
        tcpport: '',
        udpport: '',
        command: '',
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      axios.post('/firewall/forticli?name='+this.form.name+'&src_if='+this.form.srcif+'&des_if='+this.form.desif+'&src_add='+this.form.srcadd+'&des_add='+this.form.desadd+'&tcp_port='+this.form.tcpport+'&udp_port='+this.form.udpport)
      .then(resp => {
            console.log(resp.data)
            this.form.command = resp.data.result
            this.listLoading = false
          }).catch(err => {
            console.log(err)
            this.listLoading = false
          })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

