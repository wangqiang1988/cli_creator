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
      <el-form-item label="log记录默认all" >
        <el-tooltip content="请选择日志记录方式" placement="top">
        <el-radio-group v-model="form.log" >
          <el-radio label="all" />
          <el-radio label="utm" />
          <el-radio label="disable" />
        </el-radio-group>
       </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成命令</el-button>
      </el-form-item>
      <el-form-item v-show="form.command" label="命令">
        <el-input v-show="form.command" v-model="form.command" type="textarea" :rows="6" style="width: 40%;"/>
      </el-form-item>
      <el-form-item>
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
        log: 'all',
        command: '',
      }
    }
  },
  methods: {
    onSubmit() {
    // 显示提交消息
    this.$message('submit!');

    // 构造要发送的数据对象
    const formData = new FormData();
    formData.append('name', this.form.name);
    formData.append('src_if', this.form.srcif);
    formData.append('des_if', this.form.desif);
    formData.append('src_add', this.form.srcadd);
    formData.append('des_add', this.form.desadd);
    formData.append('tcp_port', this.form.tcpport);
    formData.append('udp_port', this.form.udpport);
    formData.append('log', this.form.log);

    // 打印数据以便调试
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    // 发送 POST 请求
    axios.post('/firewall/forticli', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(resp => {
        // 打印响应数据以便调试
        console.log(resp.data);
        
        // 更新表单中的命令
        this.form.command = resp.data.result;

        // 关闭加载状态
        this.listLoading = false;
      })
      .catch(err => {
        // 打印错误信息以便调试
        console.error(err);

        // 关闭加载状态
        this.listLoading = false;
      });
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

