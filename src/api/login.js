// 对应views/Login文件夹中的login.vue
import service from "@/utils/request"
/**
 * 获取验证码
 */
export function GetSms(data){
    return service.request({
        method: 'get',
        // url:'login',
        data: data,
    })
}

 /**
 * 获取用户角色
 */


 /**
 * 登陆
 */

 /**
 * 注册
 */
export function Register(data){
    return service.request({
        method: 'get',
        // url:'login',
        data: data,
    })
}