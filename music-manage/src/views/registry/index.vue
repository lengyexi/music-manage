<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm m-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
   
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
     data() {
      //密码框
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      //确认密码框
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '', //密码
          checkPass: '', //确认密码
          username: ''  //用户名
        },
        rules: {
          pass: [
            { required:true,validator: validatePass, trigger: 'blur' } //required:true 必填项
          ],
          checkPass: [
            { required:true,validator: validatePass2, trigger: 'blur' } 
          ],
          username: [
            { required:true, trigger: 'blur',message:'用户名不能为空'} //message 提示信息
          ]
        }
      };
    },
    methods: {
       //注册
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {username,pass} = this.ruleForm;
            this.$api.user.registry({username,password:pass}).then(res=>{
                if(res.data.code === 1){
                    this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                    this.$router.replace('/login')
                }else{
                    this.$message.error('注册失败');
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