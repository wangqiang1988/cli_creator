<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="策略id">
        <el-input v-model="form.policy_id" style="width: 40%;"  placeholder="例:100"/>
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
      <el-form-item label="修改类型增or删" >
        <el-tooltip content="修改" placement="top">
        <el-radio-group v-model="form.select" >
          <el-radio label="append" />
          <el-radio label="unselect" />
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
        policy_id: '',
        srcadd: '',
        desadd: '',
        tcpport: '',
        udpport: '',
        select: 'append',
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
    formData.append('policy_id', this.form.policy_id);
    formData.append('src_add', this.form.srcadd);
    formData.append('des_add', this.form.desadd);
    formData.append('tcp_port', this.form.tcpport);
    formData.append('udp_port', this.form.udpport);
    formData.append('select', this.form.select);

    // 打印数据以便调试
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    // 发送 POST 请求
    axios.post('/firewall/forticli_modify', formData, {
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

