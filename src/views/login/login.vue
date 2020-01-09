<template>
  <div>
    <div id='login'>
      <div  class='login-wrap'>
        <ul class='menu-tab'>
          <li :class="{'current':item.current}" v-for="item in menuTab" :key='item.id' @click="toggleMenu(item)" > {{item.txt}}</li>
        </ul>
      <!--表单的开始-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class ='login-form'  size='medium'>
          
          <el-form-item  prop="username" class = 'item_form'>
            <label>邮箱</label>
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
           
          <el-form-item  prop="password"  class = 'item_form'>
            <label >密码</label>
            <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength='5' maxlength="20" show-word-limit></el-input>
          </el-form-item>

          <el-form-item  prop="password2"  class = 'item_form' v-if="model ==='register' ">
            <label >重复密码</label>
            <el-input type="text" v-model="ruleForm.password2"  autocomplete="off" minlength='5' maxlength="20" show-word-limit></el-input>
          </el-form-item>

          <el-form-item  prop="code"  class = 'item_form'>
            <label>验证码</label>

            <el-row :gutter="20">
              <el-col :span="15"><el-input v-model.number="ruleForm.code"></el-input></el-col>
             
              <el-col :span="9" ><el-button type = 'success' class='block'>获取验证码</el-button>  </el-col>
            </el-row>
          </el-form-item>
          <!-- <el-form-item  prop="age"  class = 'item_form'>
            <label>年龄</label>
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class='login-bnt block'>提交</el-button>
            
          </el-form-item>
        </el-form>
        
      </div>  
        
    </div>
  </div>
    
</template>



<script>
// @ is an alias to /src
import {stripscript} from '@/utils/validate'
export default {
  name: "login",
  data() {
     
      //验证用户名
      var validatePass = (rule, value, callback) => {

        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(!reg.test(value)){
          callback(new Error('请输入正确的邮箱地址'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      // 验证密码
      var validatePassword = (rule, value, callback) => {
        this.ruleForm.password = stripscript(value)
        value = this.ruleForm.password
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)){
          callback(new Error('请输入正确格式密码'));
        }
         else {
          callback();
        }
      };
      // 验证重复密码
       var validatePassword2 = (rule, value, callback) => {
        this.ruleForm.password2 = stripscript(value)
        value = this.ruleForm.password2
        let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //验证码
      var checkpass = (rule, value, callback) => {
        this.ruleForm.code = stripscript(value)
        value = this.ruleForm.code
        let reg = /^[a-z0-9]{6}$/
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if (!reg.test(value)) {
          callback(new Error('请输入正确的验证码'));
        } else {
            callback();
          }
      
      };
      return {
        menuTab:[
          {txt:'登陆',current:true,type:'login'},
          {txt:'注册',current:false,type:'register'},
        ],
        //模块值
        model: 'login',
        //表达的数据
        ruleForm: {
          username: '',
          password: '',
          password2: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          password2: [
            { validator: validatePassword2, trigger: 'blur' }
          ],
          code: [
            { validator: checkpass, trigger: 'blur' }
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
        //高光
        data.current = true
        this.model = data.type
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
  .login-form{
    margin-top: 29px;
    label{
      display: block;
      margin-bottom: 2px;
      font-size: 14px;
      color:#ffffff
    }
    .item_form{
      margin-bottom: 3px;
    }
    .block{
      display: block;
      width: 100%;
    }
    .login-bnt{
      margin-top: 15px;
    }
  }
 
</style>