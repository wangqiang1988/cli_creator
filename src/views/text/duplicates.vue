<template>
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="原文本">
        <el-input v-model="form.src_text" type="textarea" :rows="16" style="width: 50%;" placeholder="输入原文本"/>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">去重</el-button>
        </el-form-item>
        <el-form-item v-show="form.text" label="去重后文本">
          <el-input v-show="form.text" v-model="form.text" type="textarea" :rows="16" style="width: 50%;"/>
        </el-form-item>
        <el-form-item>
        <el-button v-show="form.text" v-clipboard:copy="form.text" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
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
          src_text: '',
          text: '',
        }
      }
    },
    methods: {
      onSubmit() {
      // 显示提交消息
      this.$message('submit!');
  
      // 构造要发送的数据对象
      const formData = new FormData();
      formData.append('src_text', this.form.src_text);
  
      // 打印数据以便调试
      for (var pair of formData.entries()) {
          console.log('formdata' + pair[0]+ ', ' + pair[1]); 
      }
  
      // 发送 POST 请求
      axios.post('/text/duplicates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(resp => {
          // 打印响应数据以便调试
          console.log(resp.data.result);
          
          // 更新表单中的命令
          this.form.text = resp.data.message;
  
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
  
  