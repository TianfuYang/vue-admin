<template>
  <div>
    <div id='login'>
      <div  class='login-wrap'>
        <ul class='menu-tab'>
          <li :class="{'current':item.current}" v-for="item in menuTab" :key='item.id' @click="toggleMenu(item)" > {{item.txt}}</li>
        </ul>
      <!--表单的开始-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm" size='medium'>
          
          <el-form-item  prop="pass">
            <label>密码</label>
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
           
          <el-form-item  prop="checkPass">
            <label>确认密码</label>
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
           
          <el-form-item  prop="age">
            <label>年龄</label>
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        
      </div>  
        
    </div>
  </div>
    
</template>



<script>
// @ is an alias to /src

export default {
  name: "login",
  data() {
     var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
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
        menuTab:[
          {txt:'登陆',current:true},
          {txt:'注册',current:false},
        ],
      
        //表达的数据
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };

    },
    methods: {
      handleChange(value) {
        console.log(value)
        },
      
      toggleMenu(data){
        this.menuTab.forEach(element => {
          element.current = false
        });
        console.log(data)
        data.current = true
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
<style lang='scss' scoped>
  #login{
    height: 100vh;
    background-color: blueviolet;
  }
  .login-wrap{
    width: 330px;
    margin:auto;
  }

  .menu-tab{
    text-align: center;
    li{
      display: inline-block;
      width:88px;
      line-height: 36px;
      font-size: 14px;
      color: #ffffff;
      border-radius: 2px;
      cursor: pointer;
      }
    .current{
      background-color: rgba($color: #000000, $alpha: 1.0)
    }
  }
</style>