<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="地址">
        <el-input v-model="form.address_list" type="textarea" style="width: 40%;" :rows="6" placeholder="例:10.1.1.1,10.1.1.2-10，用英文逗号隔开，支持ip/掩码">
        </el-input>
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
        address_list: '',
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
    formData.append('address_list', this.form.address_list);

    // 打印数据以便调试
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    // 发送 POST 请求
    axios.post('/firewall/juniper_address_create', formData, {
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

