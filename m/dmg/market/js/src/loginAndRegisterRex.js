define(function (require, exports, module) {
    require("./text_psd_ex").login_psd_eActiveObj(".login_psd_e");//密码与字符串转换
    var dialog=require('layer');//弹框插件
    var isLogin_stu = require('//api.csc86.com/notify/count/all/?callback=define'); //判断是否登录
    var refUrl=require('./url_express')(window.location.href).params.refUrl;
    var jumpOrNot=require('./url_express')(window.location.href).params.jumpOrNot;
    var hostmap=seajs.hostmap;//域名配置
    (function(win){
        var win = win,
            tips = function(tip) {
                dialog.open({
                    content:tip
                    ,skin: 'msg'
                    ,time:2 //2秒后自动关闭
                });
                return false;
            },
            option = {
                regNum : /^\d+$/,
                regxphone:/^1\d{10}$/,
                szReg:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                num:60
            },
            countclear = "",
            codeId=null;
        function toggleFavDel(isEnabled) {//防止重复提交
            var toggle = isEnabled ? "removeClass" : "addClass";
            $("#getPhoneCode")[toggle]("disabled");
        }
        //发送验证码还原到初时状态
        function reductionCount(id){
            clearInterval(countclear);
            option.num=60;
            $("#"+id).val("重新获取验证码").prop("disabled", false)
        }
        //发送验证码倒计时
        function count(id,num) {
            toggleFavDel(false);
            if(num){
                option.num = num;
            }
            var id=id;
            function _c(){
                if(option.num<=0){
                    reductionCount(id);
                    return;
                }
                if($("#"+id).length){ $("#"+id).val(option.num+"秒后重新获取");}
                option.num--;
                if(option.num<60&&option.num>0){
                    toggleFavDel(false)
                }else{
                    toggleFavDel(true)
                }
            };
            _c();
            countclear = setInterval(_c,1000);
        }
        function _uniq($pwd){
            var arr=[],l=$pwd.length;
            for(var i=0;i<l;i++){
                arr.push($pwd.charAt(i));
            }
            for(var i=0;i<arr.length;i++){
                for(var j=i+1;j<arr.length;j++){
                    if(arr[j]===arr[i]) {
                        arr.splice(j,1);
                        j--;
                    }
                }
            }
            if(arr.length<=1){
                return  tips("<label class='sh_font_sz32'>不能使用相同的字母﹑数字或符号作为密码</label>");
            }
            return true;
        }
        //登录成功之后跳转函数
        function _success_jumpTo(url,time){
            setTimeout(function(){
                window.location.href=url
            },time);
        }
        //对象的构造函数
        function sign(){};
        //第三方登录函数
        sign.prototype.login_wei_parent=function(url){
            $.get(url,{"ref_url":document.referrer},function(data) {
                if(data.status==200){
                    if(data.hasOwnProperty("data")){
                        if(data.data.hasOwnProperty("thirdUrl")&&(data.data.thirdUrl!="")){
                            window.location.href=data.data.thirdUrl;
                        }else{
                            tips("<label class='sh_font_sz32'>获取授权链接失败</label>");
                        }
                    }
                }else{
                    tips("<label class='sh_font_sz32'>微信登录失败</label>");
                }
            },"jsonp");
        };
        //注册页面等用手机格式验证长度大于等于11时
        sign.prototype.phonevaliate=function(){
            if($(this).is("[readonly]")) return;
            var $val=$.trim($(this).val());
            if($val.length>=11){//如果输入的号码是大于等于11时，则进行正则验证
                if($val&&option.regxphone.test($val) == false){
                    $("#getPhoneCode").prop("disabled", true).removeClass("sh_bg_color_4").addClass("sh_bg_color_11 disabled");
                    tips("<label class='sh_font_sz32'>格式不正确,手机号码为11位数字</label>");
                }else if($val&&option.regxphone.test($val)){
                    $("#getPhoneCode").prop("disabled", false).addClass("sh_bg_color_4").removeClass("sh_bg_color_11 disabled");
                }
            }else{//如果输入的号码是小于时，则直接不能输入
                $("#getPhoneCode").prop("disabled", true).removeClass("sh_bg_color_4").addClass("sh_bg_color_11 disabled");
            }
            if($val==""){
                toggleFavDel(false);
                return  tips("<label class='sh_font_sz32'>手机号不能为空...</label>");
            }//当已经输入后又清空的提示
        };


        //登录页面用户名验证函数
        sign.prototype.userNamevaliate=function(){
            if($(this).is("[readonly]")) return;
            var $val=$.trim($("#login_userName").val());
            if($val==""){
                return tips("<label class='sh_font_sz32'>用户名不能为空</label>");
            }
        };
        //登录页面使用手机登录时手机格式验证长度小于等于11时
        sign.prototype._login_phonevaliate=function(blurEle){
            if($(this).is("[readonly]")) return;
            var $val=$.trim($("#login_userName").val());
            var l=$val.length;
            if($val==""){
                return  tips("<label class='sh_font_sz32'>用户名不能为空</label>");
            }else if(option.szReg.test($val)==true){
                return tips("<label class='sh_font_sz32'>不能使用邮箱账户,只能手机号码!</label>");
            }else if(option.regxphone.test($val) == false){
                return  tips("<label class='sh_font_sz32'>请输入正确手机号码</label>");
            }else{
                tips("<label class='sh_font_sz32'>亲，请继续...</label>");
            }
        };
        //手机获取验证码(发送get请求)
        sign.prototype.getpluginPhoneCode=function(url){//===================================
            var $val=$("#phone").val();
            if ($("#getPhoneCode").hasClass("disabled")) return;
            toggleFavDel(false);
            $.get(url,{"phoneNumber":$val}, function(data) {
                if(data.status==200){
                    $("#phone").prop("disabled",true);
                    count("getPhoneCode");
                    codeId=data.data.codeId;
                    tips("<label class='sh_font_sz32 li-ht42 '>验证码发送成功，如1分钟后仍未收到,请重新获取</label>");
                }else{
                    tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                    $("#getPhoneCode").prop("disabled",true).removeClass("sh_bg_color_4").addClass("sh_bg_color_11 disabled");
                     return ;
                }
            },"jsonp");
        };
        //验证码是否为空认证.验证码长度认证
        sign.prototype.rcodevaliate = function(){
            var code = $("#rcode").val();
            if(code ==""){
                return   tips("<label class='sh_font_sz32'>短信验证码不能为空</label>");
            }else if(code.length!= 6){
                return   tips("<label class='sh_font_sz32'>请输入正确验证码</label>");
            }
        };
        //密码验证长度及格式及密码验证不能为空
        sign.prototype.pwdvaliate_keyup=function(){
            var $val=$.trim($("#password").val());
            var l=$val.length;
            if(($val&&l<6)||($val&&l>20)||$val == ""){
                return tips("<label class='sh_font_sz32'>密码长度为6-20位，区分大小写</label>");
            }else{
                if($val){
                    return _uniq($val);
                }
            }
        };
        //所有公用(submit提交)
        sign.prototype.submitreg=function (url,eleOpr,content,contentShow,eleOprFinish,type){//========================================================
            var $val=($("#phone").length&&$.trim($("#phone").val())),$pwd=$.trim($("#password").val()),l=$pwd.length;
            var flag=true,ped=true;
            var params;
            if (!$val) {
                flag=tips("<label class='sh_font_sz32'>请输入正确手机号码</label>");
                return
            }else if(option.regxphone.test($val) == false){
                flag=tips("<label class='sh_font_sz32'>格式不正确,手机号码为11位数字</label>");
                return
            }
            if (!$.trim($("#rcode").val())){
                flag=tips("<label class='sh_font_sz32'>短信验证码不能为空</label>");
                return
            } else if ($.trim($("#rcode").val()).length!=6){
                flag=tips("<label class='sh_font_sz32'>请输入正确验证码</label>");
                return
            }
           if(type!="login_newPhone_bind"){
               if(!l&&!$pwd) {
                   flag=tips("<label class='sh_font_sz32'>密码不能为空</label>");
                   return
               }else if(($pwd&&l<6)||($pwd&&l>20)){
                   flag=tips("<label class='sh_font_sz32'>密码长度为6-20位，区分大小写</label>");
                   return
               }else{
                   if($pwd){ped= _uniq($pwd);}
               }
           }
            if(!flag){
                return false;
            }else if(!ped)
            {
                return false;
            }else{
                $(eleOpr).prop("disabled", true).val(content);
            }
            if(type!="login_newPhone_bind"){
                params={
                    "password":$.trim($("#password").val()),
                    "phoneNumber":$.trim($("#phone").val()),
                    "verificationCode":$.trim($("#rcode").val()),
                    "codeId":codeId
                }
            }else{
                params={
                    "phoneNumber":$.trim($("#phone").val()),
                    "verificationCode":$.trim($("#rcode").val()),
                    "codeId":codeId
                }
            }


            if(flag&&ped){
                $.get(url,params, function(data) {
                   if(data.status==200){
                        $(eleOpr).prop("disabled", false).val(eleOprFinish);
                       tips("<label class='sh_font_sz32'>"+contentShow+data.msg+"!"+"</label>");
                        switch (type) {
                            case "login_reg_acc"://注册新用户
                                cscStatis({"data": {"userName": $("#phone").val(), "eventAction": "registerSuccess","userKinds":"CG","eventLabel":"m.csc86.com","hitType": "event"}, "format": {"eventLabel":"el","userName": "userName","hitType": "t","eventAction":"ea"}}).send({"Tracer": "RegistertTracker"});
                                _success_jumpTo("//res.csc86.com/v3/dmg/market/html/login.html?jumpOrNot=0",2000);
                                break;
                            case "login_retCode_toZ"://账户设置里面重置密码
                                cscStatis({"data": {"userName": $("#phone").val(), "eventAction": "resetPasswordSuccess","hitType": "event"}, "format": {"userName": "userName","hitType": "t","eventAction":"ea"}}).send({"Tracer": "resetPasswordSuccessTracker"});
                                _success_jumpTo("//res.csc86.com/v3/dmg/market/html/login.html?jumpOrNot=0",2000);
                                break;
                            case "login_reset_code"://登录页面忘记密码
                                cscStatis({"data": {"userName": $("#phone").val(), "eventAction": "findPwdSuccess","hitType": "event"}, "format": {"userName": "userName","hitType": "t","eventAction":"ea"}}).send({"Tracer": "findPwdSuccessTracker"});
                                _success_jumpTo("//res.csc86.com/v3/dmg/market/html/login.html?jumpOrNot=0",2000);
                                break;
                            case "login_phone_check"://手机号验证（旧手机号换成其他新手机号码）旧手机验证，验证成功后跳转login_bind_tel页面--来源账户设置
                                cscStatis({"data": {"userName": $("#phone").val(), "eventAction": "setPhoneSuccess","hitType": "event"}, "format": {"userName": "userName","hitType": "t","eventAction":"ea"}}).send({"Tracer": "setPhoneSuccessTracker"});
                                _success_jumpTo("//res.csc86.com/v3/dmg/market/html/login_bind_tel.html",2000);
                                break;
                            case "login_newPhone_bind"://微信登陆界面新旧用户验证（手机号是否已注册）没有注册则跳转login_wechat_check页面
                                _success_jumpTo("//res.csc86.com/v3/dmg/market/html/login_wechat_check.html?phoneNumber=" + $.trim($("#phone").val()) +"&verificationCode="+$.trim($("#rcode").val())+ "&codeId=" +codeId +"&newUser=200"+"&refUrl="+refUrl,2000);
                                break;
                            case "login_bind_tel":// 修改手机号绑定（换成其他新手机号码）新手机验证--来源旧手机号验证页面
                                cscStatis({"data": {"userName": $("#phone").val(), "eventAction": "phoneResetSuccess","hitType": "event"}, "format": {"userName": "userName","hitType": "t","eventAction":"ea"}}).send({"Tracer": "phoneResetSuccessTracker"});
                                _success_jumpTo("//res.csc86.com/v3/dmg/market/html/p_centerAccSetting.html",2000);
                                break;
                            default:
                                break;
                        }
                    }else if(data.status == 100){
                       switch (type) {
                           case "login_newPhone_bind"://微信登陆界面新旧用户验证成功后跳转页面
                            _success_jumpTo("//res.csc86.com/v3/dmg/market/html/login_wechat_check.html?phoneNumber="+ $.trim($("#phone").val()) +"&oldUser=100"+"&refUrl="+refUrl,2000);
                       }
                      }else{
                          tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                           $(eleOpr).prop("disabled", false).val(eleOprFinish);
                           return ;
                   }
                },"jsonp");
            }
        };

        //登录(submit提交)
        sign.prototype.login_submit=function (url,eleOpr,content,contentShow,eleOprFinish){
            var $val=($("#login_userName").length&&$.trim($("#login_userName").val())),$pwd=$.trim($("#password").val()),l=$pwd.length;
            var flag=true,ped=true;
            if (!$val){
                flag=tips("<label class='sh_font_sz32'>用户名不能为空</label>");
                return
            }else if(option.szReg.test($val)== true){
                flag=tips("<label class='sh_font_sz32'>不能使用邮箱账户,只能手机号码!</label>");
                return
            }else if(option.regxphone.test($val)==false){
                flag=tips("<label class='sh_font_sz32'>格式不正确,只能是手机号码!</label>");
                return
            }
            if(!l&&!$pwd) {
                flag=tips("<label class='sh_font_sz32'>密码不能为空</label>");
                return;
            }else if(($val&&l<6)||($val&&l>20)){
                flag=tips("<label class='sh_font_sz32'>密码长度为6-20位，区分大小写</label>");
                return;
            }else{
                if($pwd){
                    ped= _uniq($pwd);
                }
            }
            if(!flag){
                return false;
            }else if(!ped)
            {
                return false;
            }else{
                $(eleOpr).prop("disabled", true).val(content);
            }
            if(flag&&ped){
                if (!isLogin_stu.status){//判断是否已经登录，没有登录时
                    $.get(url,{
                        "userName":$.trim($("#login_userName").val()),
                        "password":$.trim($("#password").val())
                    }, function(data) {
                        if(data.status==200){

                            /*cscga('create', 'SU-10001-2', 'auto','logintracker');
                            cscga('logintracker.require', 'cscplugin',{userName: $("#login_userName").val(),eventAction:'loginSuccess', eventLabel: 'csc86'});
                            cscga('logintracker.cscplugin:LoginInit');*/

                            cscStatis({"data": {"userName": $("#login_userName").val(), "eventAction": "loginSuccess","eventLabel":"m.csc86.com","hitType": "event"}, "format": {"eventLabel":"el","userName": "userName","hitType": "t","eventAction":"ea"}}).send({"Tracer": "logintracker"});

                            $(eleOpr).prop("disabled", false).val(eleOprFinish);
                            tips("<label class='sh_font_sz32'>"+contentShow+"</label>");
                            if(jumpOrNot==0){
                                window.location.href="//"+hostmap.test;//登录成功后只要历史页面是重置密码等，则回到首页
                            }else{
                                window.location.href=document.referrer;
                            }
                        }else{
                            tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                            $(eleOpr).prop("disabled", false).val(eleOprFinish);
                            return;
                        }
                    },"jsonp");
                }else{
                    if(isLogin_stu.data.id){ //已经重复登录时
                        tips("<label class='sh_font_sz32'>您已经登录！不能重复登录</label>");
                        setTimeout(function(){
                            window.location.href="//"+hostmap.test;//重复登录，2秒后回到首页
                        },2000)
                    }
                }
            }
        };
        if(!win["sign"]){
            win["sign"]=new sign();
        }
        module.exports=sign
    })(window);
    $(function(){
        //用户名登录验证（失去焦点触发验证）
        $("#login_userName").on({"blur":sign._login_phonevaliate});
        //手机格式验证（失去焦点触发验证）
        $("#phone").on({"keyup":sign.phonevaliate});
        //注册验证码
        $("#rcode").on({"blur":sign.rcodevaliate});
        //密码验证（失去焦点触发验证）
        $("#password").on({"blur":sign.pwdvaliate_keyup});

    });
});