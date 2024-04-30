<template>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="文本">
        <el-input v-model="form.text" type="textarea" :rows="6" style="width: 50%;" placeholder="输入固定内容,用$表示变量位置,支持多行
例:set routing-options static route $ next-hop 172.16.16.1 "/>
      </el-form-item>
      <el-form-item label="变量">
        <el-input v-model="form.str" type="textarea" :rows="10" style="width: 50%;" placeholder="输入变量,支持多行
例如:192.168.0.0/16"/>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
        </el-form-item>
        <el-form-item v-show="form.text_str" label="结果">
          <el-input v-show="form.text_str" v-model="form.text_str" type="textarea" :rows="16" style="width: 50%;"/>
        </el-form-item>
        <el-form-item>
        <el-button v-show="form.text_str" v-clipboard:copy="form.text_str" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
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
          text: '',
          str: '',
          text_str:'',
        }
      }
    },
    methods: {
      onSubmit() {
      // 显示提交消息
      this.$message('submit!');
  
      // 构造要发送的数据对象
      const formData = new FormData();
      formData.append('text', this.form.text);
      formData.append('str', this.form.str);
      // 打印数据以便调试
      for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }
  
      // 发送 POST 请求
      axios.post('/text/traversal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(resp => {
          // 打印响应数据以便调试
          console.log(resp.data.result);
          
          // 更新表单中的命令
          this.form.text_str = resp.data.message;
  
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
  
  