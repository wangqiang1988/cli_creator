<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="您的id">
        <el-input v-model="form.userid" style="width: 40%;"placeholder='稍后用于制作贡献列表' />
      </el-form-item>
      <el-form-item label="菜名">
        <el-input v-model="form.name" style="width: 40%;" />
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="form.des" type="textarea" style="width: 40%; ":rows="4" >
        </el-input>
      </el-form-item>
      <el-form-item label="来历&历史">
        <el-input v-model="form.history" type="textarea" style="width: 40%;" :rows="6"/>
      </el-form-item>
      <el-form-item label="做法">
        <el-input v-model="form.make" type="textarea" style="width: 40%;" :rows="6"/>
      </el-form-item>
      <el-form-item label="注意事项">
        <el-input v-model="form.tips" type="textarea" style="width: 40%;" :rows="6"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
      <el-form-item v-show="form.result" label="提交结果">
        <el-input v-show="form.result" v-model="form.result" type="textarea" :rows="6" style="width: 40%;"/>
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
        userid:'',
        name: '',
        des: '',
        history: '',
        make: '',
        tips: '',
        result: '',
      }
    }
  },
  methods: {
    onSubmit() {
    // 显示提交消息
    this.$message('submit!');

    // 构造要发送的数据对象
    const formData = new FormData();
    formData.append('userid', this.form.userid);
    formData.append('name', this.form.name);
    formData.append('des', this.form.des);
    formData.append('history', this.form.history);
    formData.append('make', this.form.make);
    formData.append('tips', this.form.tips);


    // 打印数据以便调试
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    // 发送 POST 请求
    axios.post('/firewall/food_add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(resp => {
        // 打印响应数据以便调试
        console.log(resp.data);
        
        // 更新表单中的命令
        this.form.result = resp.data.result;

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

