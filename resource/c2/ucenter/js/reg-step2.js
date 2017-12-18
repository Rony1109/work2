define(function(require, exports, module) {
    var ucCommon=require('./uc-common');
    var	hostmap = seajs.hostmap;
    var countdown=10;//获取验证码倒计时用的
    var timeCount;//获取验证码倒计时用的
    var regStep2={
        setTimeCount:function(obj,url){
            timeCount=setTimeout(function() {
                regStep2.setTimeCount(obj,url);
            },1000);
            if (countdown == 0) {
                clearTimeout(timeCount);
                location.href=url;
                return;
            } else {
                obj.html(countdown);
                countdown--;
            }
        },

        //采购商账户注册成功页
        cgs:function(){
            var done=ucCommon.getUrlParam(location.href,'done'),
                url='http://www.csc86.com/';
            if(done){
                url=done;
            }
            regStep2.setTimeCount($('.jsTime'),url);
        },

        //供应商账户注册成功页
        gys:function(){
            regStep2.setTimeCount($('.jsTime'),'//'+hostmap.i+'/reg/transfer');
        }
    };

    module.exports=regStep2;
})