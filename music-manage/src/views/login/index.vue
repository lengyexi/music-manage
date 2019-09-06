<template>
  <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm m-form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>  
</template>

<script>
export default {
  data() {
      return {
        ruleForm: {
          pass: '', //密码
          username: ''  //用户名
        },
        rules: {
          pass: [
            { required:true,trigger: 'blur',message:'密码不能为空' }
          ],
          username: [
            { required:true, trigger: 'blur',message:'用户名不能为空'} //message 提示信息
          ]
        }
      };
    },
    methods: {
       //登录
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {username,pass} = this.ruleForm;
            this.$api.user.login({username,password:pass}).then(res=>{
                if(res.data.code === 1){
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    localStorage.setItem('token',res.data.token)
                    this.$router.replace('/music')
                }else{
                    this.$message.error('登录失败');
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
    .m-form{
        width:50%;
        margin:200px auto;
    }
</style>