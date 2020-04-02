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
            <el-input type="text" v-model="ruleForm.password" autocomplete="off"  ></el-input>
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
import {reactive, ref,isRef,toRefs,onMounted} from '@vue/composition-api'
import {stripscript,validateEmail,validatePass1,validatCode} from '@/utils/validate'
export default {
  name: "login",
  setup(props,context){
      /**
     * 声明数据
     */
    // 这里放置data数据、生命周期、自定义的函数
     //表单的数据
    const  ruleForm=reactive( {
          username: '',
          password: '',
          password2: '',
          code: ''
        });
    //验证用户名
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if(validateEmail(value)){
        callback(new Error('请输入正确的邮箱地址'));
      } else {
        if (ruleForm.checkPass !== '') {
          context.refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    }; 
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value)
      console.log(ruleForm.password)
      value =ruleForm.password
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(validatePass1(value)){
        callback(new Error('请输入正确的密码'));
      }else {
        if (ruleForm.checkPass !== '') {
          context.refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    // 验证重复密码
      var validatePassword2 = (rule, value, callback) => {
      ruleForm.password2 = stripscript(value)
      value = ruleForm.password2
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== ruleForm.password) {
        callback(new Error('两次输入密码不一样!'));
      } else {
        callback();
      }
    };
    //验证码
    var checkpass = (rule, value, callback) => {
      ruleForm.code = stripscript(value)
      value = ruleForm.code
      
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }else if (validatCode(value)) {
        callback(new Error('请输入正确的验证码'));
      } else {
          callback();
        }
    
    };
    const rules =reactive({
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
        })

    const  menuTab = reactive([
          {txt:'登陆',current:true,type:'login'},
          {txt:'注册',current:false,type:'register'},
        ]);
      //声明模块值 ref用于一般数据类型  reactive 用于数组 对象
    const model = ref('login');

    /**
     * 声明函数
     */

    const handleChange=(value=>{
      console.log(value)
    }) ;
    
    const toggleMenu = (data=>{
      menuTab.forEach(element => {
        element.current = false
      });
      console.log(data)
      //高光
      data.current = true
      model.value = data.type
    });

    const submitForm=(formName=>{
      context.refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    });
    //生命周期
    onMounted(()=>{

    })
    return{
      menuTab,
      model,
      rules,
      ruleForm,
      handleChange,
      toggleMenu,
      submitForm


    }
  },

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