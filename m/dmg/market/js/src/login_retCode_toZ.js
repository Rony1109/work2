define(function (require, exports, module) {
    require("./text_psd_ex").login_psd_eActiveObj(".login_psd_e");//密码与字符串转换
    var sign= require("./loginAndRegisterRex");//引入注册公用代码
    var hostmap=seajs.hostmap;//域名配置
    var _new_sign=new sign();
    $(function(){
        //发送post请求获取手机验证码
        $("#getPhoneCode").on("click",function(){
            _new_sign.getpluginPhoneCode("//"+hostmap.test+"/password/getCode?codeType=phonePassword")
        });
        //发送post请求submit
        $("#phonesbmit").on("click",function(){
            _new_sign.submitreg("//"+hostmap.test+"/password/retrieve","#phonesbmit","重置密码中...","重置密码成功!","完成","login_retCode_toZ")
        });
    });
});