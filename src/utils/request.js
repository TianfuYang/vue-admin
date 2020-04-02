/**
 * 拦截器相关
*/
import axios from 'axios'
import { Message } from 'element-ui';
const BASEURL = process.env.NODE_DEV ==='production'? '':'/devApi';

//创建拦截器  创建axios 赋值给service
const service = axios.create({
    baseURL: BASEURL,
    timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data
    if (data.resCode!==0){
      Message.error(data.Message);
      return Promise.reject(data)
      
    }else{
      return response;
    }
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default service;  //这里记得加分号