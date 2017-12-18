define(function(require, exports, module){
    //浏览器参数获取
    var localUrl = require('./url_express')(window.location.href);
    var phoneNumber = localUrl.params.phoneNumber,
        oldUser = localUrl.params.oldUser,
        newUser = localUrl.params.newUser,
        verificationCode = localUrl.params.verificationCode,
        codeId = localUrl.params.codeId,
        refUrl = localUrl.params.refUrl;
    var hostmap = seajs.hostmap;
    var sign = require("./loginAndRegisterRex");
    var checkSign = new sign();
    var dialog=require('layer');//弹框插件
    var tips = function(tip) {
        dialog.open({
            content:tip
            ,skin: 'msg'
            ,time:2 //2秒后自动关闭
        });
        return false;
    };
    $(function(){
        var passWordInput = $("#password"),
            phoneSubmit = $("#phonesubmit");
        if(oldUser == 100){
            document.title= "用户登录";
            $("#notice_msg").html("用户登录");
            $(".checkUser").html("*已检测到您是老用户，请用原账号密码登录。");
            $(".checkUser").css("padding",".3rem 0");
            passWordInput.prop("placeholder", "请输入密码");
            phoneSubmit.val("登录");
            phoneSubmit.on("click", function(){
                userType({
                    type: "get",
                    api: "/password/newbindPhoneAddPassword",
                    data: {
                        phoneNumber: phoneNumber,
                        password: passWordInput.val()
                    }
                })
            });
        }else if(newUser == 200){//新用户
            passWordInput.prop("placeholder","请设置密码");
            phoneSubmit.val("完成");
            phoneSubmit.on("click", function() {
                userType({
                    api: "/password/bindPhoneAassword",
                    type: "post",
                    data: {
                        phoneNumber: phoneNumber,
                        password: passWordInput.val(),
                        verificationCode: verificationCode,
                        codeId: codeId
                    }
                })
            });
        }else{
            tips("<label class='sh_font_sz32'>数据请求异常，请返回页面重试！</label>");
        }

         function userType(option){
                    checkSign.pwdvaliate_keyup();
                    $.ajax({
                        type: option.type,
                        url:"//"+ hostmap.test+ option.api,
                        data: option.data,
                        dataType: "jsonp",
                        success:function(data){
                            if(data.status == 200){
                                phoneSubmit.val("验证中...");
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                window.location.href = refUrl;
                            }else if(data.status == 301){
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                window.location.href = "//res.csc86.com/v3/shopping_center/market/html/login.html";
                            }else{
                                tips("<label class='sh_font_sz32'>"+data.msg+"</label>");
                                return;
                            }
                        },
                        error: function(){
                            tips("<label class='sh_font_sz32'>数据请求异常，请返回页面重试！</label>");
                            return false
                        }
                    })
             }

    });
});