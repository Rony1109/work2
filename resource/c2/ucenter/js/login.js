/*
* 弹窗和非弹窗登录js
* */
define(function(require, exports, module) {
    $('#loginFrm').find('.login-smt').removeAttr('disabled');//此js一加载进来首先开启登录页面提交按钮
    var dialog=require('./dialog');//弹窗
    var validator=require('./validator');
    var ucCommon=require('./uc-common');
    var regxp=validator.regxp;
    var	hostmap = seajs.hostmap;  // 域名配置表
    var countdown=120;//获取验证码倒计时用的
    var timeCount;//获取验证码倒计时用的




    var login={

        /*
        *第三方登录
        *arg为对应的第三方参数
        *isPop为true时代表弹窗登录
        */
        gafun:function(){
            cscga('create', 'SU-10001-1', 'auto','logintracker');
            cscga('logintracker.require', 'cscplugin',{userName: $('#userName').val(),eventAction:'loginSuccess', eventLabel: 'csc86'});
            cscga('logintracker.cscplugin:LoginInit');
        },

        threeLogin:function(arg){
            $.post("//login.csc86.com/thirdLogin",{"source":arg},function(response){
                if(response.status){
                    location.href = response.msg;
                }else{
                    dialog.tip({
                        content:response.msg
                    });
                }
            },"jsonp");
        },

        /*
        * 点击登录按钮
        * isPop 是否为当前页面,true代表为弹窗登录
        * isrefresh 登录成功后是否刷新页面,true代表刷新页面(此属性主要用于弹窗登录成功后是否刷新当前页面)
        * callback 回调函数，此函数主要用弹于窗登录成功后不刷新页面时要调用的函数(必须为函数，代码中未对非函数的处理，若不是函数会报错)
        * callback需在isrefresh为false的时候才执行
        * */
        smtFrm:function(obj,options){
            var opts={
                isPop:false,
                isrefresh:false,
                callback:function(){}
            };
            opts=$.extend({},opts,options);
            var isPop=opts.isPop;
            var isrefresh=opts.isrefresh;
            var callback=opts.callback;
            var $auiMain=$('.aui_main');//弹窗容器，弹窗登录时才用到
            var popHeight1=402;
            var popHeight2=464
            obj.on('submit',function(){
                var $this=$(this),
                    $userName=$this.find('#userName'),//用户名/邮箱/手机号码文本框
                    $password=$this.find('#password'),//密码文本框
                    $validCode=$this.find('#validCode'),//验证码文本框
                    $yztips=$this.find('.yztips'),//存放验证信息的容器
                    $loginFrmUl=$this.find('.login-frm'),
                    $smtBtn=$this.find('.login-smt'),//提交按钮
                    userNameVal=$userName.val(),
                    passwordVal=$password.val(),
                    validCodeVal=$validCode.val(),
                    validHtml='<li class="code-li">'+
                        '<input class="ipt-txt" id="validCode" type="text" name="code" placeholder="验证码" value="">'+
                        '<span class="code-img"><img src="" width="93" height="42" alt=""></span>'+
                        '<span class="refresh"></span>'+
                        '</li>';

                if(userNameVal==''){
                    validator.showTips({
                        obj:$yztips,
                        frmObj:$userName,
                        validTip:'请输入用户名/邮箱/手机号码'
                    });
                    return false;
                }
                if(passwordVal==''){
                    validator.showTips({
                        obj:$yztips,
                        frmObj:$password,
                        validTip:'请输入密码'
                    });
                    return false;
                }

/*                    flag=validator.init({
                        isMust:true,
                        obj:$password,
                        tipObj:$('.yztips'),
                        isAjax:true,
                        nullTip:'请输入密码',
                        errorTip:'密码须8-20个字符，包含字母和数字',
                        isUniq:false,
                        notUniqTip:'密码过于简单，请重新设置',
                        regx:regxp.pwd
                    });
                 if(!flag){return false}*/


                if($validCode[0]&&validCodeVal==''){
                    validator.showTips({
                        obj:$yztips,
                        frmObj:$validCode,
                        validTip:'请输入验证码'
                    });
                    return false;
                }
                $smtBtn.attr('disabled',true).css('cursor','default').val('正在登录...');



                $.ajax({
                    type:"post",
                    url:$this.attr('action'),
                    data:$this.serializeArray(),
                    dataType:"jsonp",
                    success:function(data){
                        var status=data.status,
                            msg=data.msg,
                            result=data.data;

                        //status:1 代表成功 0代表有表单字段错误 500代表系统错误 3代表登录三次未登录成功 5代表未绑定手机
                        switch(status){
                            case 1:
                                if(!isPop){//非弹窗登录
                                    login.gafun();
                                    location.href=result;
                                }else{//弹窗登录
                                    if(isrefresh){//弹窗登录成功后刷新当前页面
                                        login.gafun();
                                        art.dialog({id: "loginDialog"}).close();
                                        location.reload();
                                    }else{

                                        //获取登录后的信息
                                        $.get("//api.csc86.com/notify/count/all/",function (data){
                                            callback(data);
                                            login.gafun();
                                            art.dialog({id: "loginDialog"}).close();
                                        },"jsonp");
                                    }
                                }
                                break;
                            case 5:
                                if(isPop){
                                    art.dialog({id: "loginDialog"}).close();
                                }
                                location.href='//login.csc86.com/toMobile?done='+encodeURIComponent(location.href);;
                                break;
                            case 0:
                                validator.showTips({
                                    obj:$yztips,
                                    frmObj:$userName,
                                    validTip:msg
                                });
                                break;
                            case 6:


                                dataphone=data.phone.replace(/(\d{3})\d{4}(\d{3})/,'$1****$2');
                                var yzhtml='<div class="loginyzm">\
        <form id="regFrm" method="post" action="//login.csc86.com/smsVerification">\
        <table class="uc-lrtbl reg-step1-lrtbl">\
        <colgroup>\
        <col width="130">\
        <col>\
        </colgroup>\
        <tbody>\
        <tr>\
        <th>手机号码</th>\
        <td><input class="ipt-txt" id="phone" type="hidden" name="phone" value="'+data.phone+'">'+dataphone+'</td>\
        </tr>\
        <tr class="valid-code">\
        <th>手机验证码</th>\
        <td>\
        <input class="ipt-txt ipt-txt-code" id="validCode" type="text" name="verificationCode" value="">\
        <input id="getCodeBtn" class="uc-btn gray-btn" type="button" value="获取验证码" style="cursor: pointer;"></td>\
        </tr>\
        <tr>\
        <th></th>\
        <td><input id="smtBtn" class="uc-btn yllw-btn" type="submit" name="" value="确定">\
        </td>\
        </tr>\
        </tbody>\
        </table>\
        </form>\
        </div>';
                                dialog.dft({
                                    id: 'firstyz',
                                    title: "短信安全验证",
                                    content: yzhtml,
                                    padding: 0,
                                    fixed: true,
                                    drag:false,
                                    lock: true,
                                    opacity: 0.2,
                                    init: function() {
                                        var $form=$('#regFrm'),$smtBtn=$('#smtBtn'),$getCodeBtn=$('#getCodeBtn'),$validCode=$('#validCode'),$phone=$('#phone'),$phoneParent=$phone.parent();
                                        $(this.DOM.wrap[0]).addClass('firstyz');

                                        //手机失去焦点时的表单验证
                                        var  phoneBlur=function(obj,tipObj){
                                            var istrue= validator.init({
                                                isMust:true,
                                                obj:obj,
                                                tipObj:tipObj,
                                                nullTip:'请输入手机号',
                                                errorTip:'格式不正确，手机号码为11位数字',
                                                regx:regxp.phone,
                                                isAjax:false
                                            });
                                            /*if(istrue){
                                                $.get('//'+hostmap.i+'/reg/checkPhone?phone='+obj.val(),function(data){
                                                    var status=data.status,
                                                        msg=data.msg;
                                                    if(status==-1){
                                                        validator.showTips({
                                                            obj:tipObj,
                                                            frmObj:obj,
                                                            validTip:msg
                                                        });
                                                    }else{
                                                        validator.showRightTips({
                                                            obj:obj,
                                                            tipObj:tipObj
                                                        });
                                                    }
                                                },'jsonp');
                                            }*/
                                        };


                                        //倒计时
                                        var   setTimeCount=function(obj){
                                            timeCount=setTimeout(function() {
                                                setTimeCount(obj);
                                            },1000);
                                            if (countdown == 0) {
                                                obj.val('获取验证码');
                                                obj.removeAttr('disabled').css('cursor','pointer');
                                                clearTimeout(timeCount);
                                                countdown=120;
                                                return;
                                            } else {
                                                obj.val(countdown+'秒');
                                                countdown--;
                                            }
                                        };


                                        //手机号验证
                                        $phone.on('focus',function(){
                                            validator.focusTips({
                                                obj:$phoneParent,
                                                frmObj:$phone,
                                                focusTip:'请输入手机号'
                                            });
                                        });

                                        $phone.on('blur',function(){
                                            phoneBlur($phone,$phoneParent);
                                        });


                                        //手机验证码验证
                                        $validCode.on('focus blur keyup',function(e){
                                            var $this=$(this),
                                                $parent=$this.parent(),
                                                val=$this.val();

                                            if(e.type=='keyup') {
                                                if (regxp.num(6, 6).test(val)) {
                                                    validator.showRightTips({
                                                        obj: $this,
                                                        tipObj: $parent
                                                    });
                                                }
                                            }
                                            if(e.type=='focus'){
                                                validator.focusTips({
                                                    obj:$parent,
                                                    frmObj:$this,
                                                    focusTip:'请输入手机验证码'
                                                });
                                            }

                                            if(e.type=='blur'){
                                                if(val==''){
                                                    validator.showRightTips({
                                                        obj:$this,
                                                        tipObj:$parent
                                                    });
                                                }
                                                if(!regxp.num(6,6).test(val)){
                                                    validator.showTips({
                                                        obj:$parent,
                                                        frmObj:$this,
                                                        validTip:'请输入正确的验证码'
                                                    });
                                                }/*else{
                                                    if(regxp.num(6,6).test(val)){
                                                        validator.showRightTips({
                                                            obj:$this,
                                                            tipObj:$parent
                                                        });
                                                    }else{
                                                        validator.showTips({
                                                            obj:$parent,
                                                            frmObj:$this,
                                                            validTip:'请输入正确的验证码'
                                                        });
                                                    }
                                                }*/
                                            }
                                        });


                                        //获取手机验证码
                                        $getCodeBtn.on('click', function () {
                                            var phoneVal = $phone.val(),$code=$('#code'),$dest=$('#dest'),$codeParent=$validCode.parent(),arr=[];;

                                            var sjhm=validator.init({
                                                isMust:true,
                                                obj:$('#phone'),
                                                tipObj:$('#phone').parent(),
                                                nullTip:'请输入手机号',
                                                errorTip:'格式不正确，手机号码为11位数字',
                                                regx:regxp.phone
                                            });
                                            arr.push(sjhm);
                                            if($.inArray(false,arr)>=0){
                                                return false;
                                            }

                                            $getCodeBtn.attr('disabled', true).css('cursor', 'default');
                                            $.get('//login.csc86.com/getPhoneCode?phoneNumber=' + phoneVal + '&type=phoneLogin', function (data) {
                                                var status = data.status;
                                                var result = data.data;
                                                if (status === true) {
                                                    setTimeCount($getCodeBtn);
                                                } else {
                                                    $getCodeBtn.removeAttr('disabled').css('cursor', 'pointer');
                                                    validator.showTips({
                                                        obj: $codeParent,
                                                        frmObj: $validCode,
                                                        validTip: data.msg
                                                    })

                                                }
                                            }, 'jsonp');
                                            return false;
                                        });


                                        //提交表单
                                        $form.on('submit',function(){
                                            var action=$form.attr('action');
                                            var $validError,top;
                                            var arr=[];
                                            var $doneval=$('#done').val()||"",$ref=$('#ref').val()||"";

                                            var sjhm=validator.init({
                                                isMust:true,
                                                obj:$('#phone'),
                                                tipObj:$('#phone').parent(),
                                                nullTip:'请输入手机号',
                                                errorTip:'格式不正确，手机号码为11位数字',
                                                regx:regxp.phone
                                            });

                                            var sjyzm=validator.init({
                                                isMust:true,
                                                obj:$('#validCode'),
                                                tipObj:$('#validCode').parent(),
                                                nullTip:'请输入手机验证码',
                                                errorTip:'请输入正确的验证码',
                                                regx:regxp.num(6,6)
                                            });
                                            arr.push(sjhm,sjyzm);
                                            if($.inArray(false,arr)>=0){
                                                return false;
                                            }
                                            var dataobjs=$form.serialize()+"&ref="+$ref+'&done='+$doneval;


                                            $smtBtn.attr('disabled',true).css('cursor','default').val('正在提交...');

                                            $.ajax({
                                                type:"post",
                                                url:action,
                                                data:dataobjs,
                                                dataType:"jsonp",
                                                success:function(data){

                                                    var status=data.status,
                                                        msg=data.msg,
                                                        result=data.data;
                                                    //status:1 代表成功 0代表有表单字段错误 500代表系统错误 6手机短信验证
                                                    if(status==1){
                                                        login.gafun();

                                                       location.href=data.data;
                                                    }else{
                                                        dialog.tip({
                                                            content:msg
                                                        });
                                                    }
                                                },
                                                error:function(){
                                                    dialog.tip({
                                                        content:'系统异常，请稍候再试'
                                                    });
                                                },
                                                complete:function(){
                                                    $smtBtn.removeAttr('disabled').css('cursor','pointer').val('确定');
                                                }
                                            });
                                            return false;
                                        });


                                        $('.ydty span').on('click',function() {
                                            dg.close();
                                            return false;
                                        });
                                    }

                                });



                                break;
                            case 3:
                                if(!$validCode[0]){
                                    $loginFrmUl.append(validHtml);
                                    $loginFrmUl.find('.code-img img').attr('src','//login.csc86.com/code');
                                }
                                validator.showTips({
                                    obj:$yztips,
                                    frmObj:$validCode,
                                    validTip:msg
                                });
                                break;
                            default :
                                art.dialog({id: "loginDialog"}).close();
                                dialog.tip({
                                    content:msg
                                });
                        }
                    },
                    error:function(){
                        art.dialog({id: "loginDialog"}).close();
                        dialog.tip({
                            content:'系统异常，请稍候再试'
                        });
                    },
                    complete:function(){
                        $smtBtn.removeAttr('disabled').css('cursor','pointer').val('登录');
                    }
                });

                return false;
            });
        },

        /*
        *弹窗和非弹窗公用的功能
        *isPop为true时代表弹窗登录
        * */
        cmmn:function(){

            //当url里有done参数且该参数不为空(done参数用于存放上一个页面的地址)时，登录后跳转后done参数所对应的页面
            var doneUrl=ucCommon.getUrlParam(location.href,'done')||'';
            $('#done').val(doneUrl);

            //placeholder兼容ie
            require.async('m/sea-modules/placeholder.js', function(m) {
               m.placeholder('#userName','#aaa');
               m.placeholder('#password','#aaa');
               m.placeholder('#validCode','#aaa');
            });

            //第三方登录：QQ
            $('.login-three .qq').on('click',function(){
                login.threeLogin('QQ');
            });

            //第三方登录：sina
            $('.login-three .sina').on('click',function(){
                login.threeLogin('sina');
            });

            //第三方登录：weixin
            $('.login-three .weixin').on('click',function(){
                login.threeLogin('WX');
            });

            //刷新验证码
            $('.login-frm').on('click','.refresh',function(){
                ucCommon.refreshCode($(this).siblings('.code-img').find('img'));
            });
        },

        /*
        * 显示弹窗登录页面
        * isPop 是否为当前页面,true代表为弹窗登录
        * isrefresh 登录成功后是否刷新页面,true代表刷新页面(此属性主要用于弹窗登录成功后是否刷新当前页面)
        * callback 回调函数，此函数主要用弹于窗登录成功后不刷新页面时要调用的函数(必须为函数，代码中未对非函数的处理，若不是函数会报错)
        * callback需在isrefresh为false的时候才执行
        * */
        showPop:function(options){
            var opts={
                isPop:true,
                isrefresh:false,
                callback:function(){}
            };
            opts=$.extend({},opts,options);
            var isPop=opts.isPop;
            var isrefresh=opts.isrefresh;
            var callback=opts.callback;
            var html='<div class="login">'
                +'<div class="bg"></div>'
                +'<div class="login-c">'
                +'<form id="loginFrm" method="post" action="//login.csc86.com/dologin">'
                +'<div class="g-pr login-top">'
                +'<h2>华南城网会员</h2>'
                +'<a class="close">关闭</a>'
                +'</div>'
                +'<ul class="login-frm">'
                +'<li><input class="ipt-txt" id="userName" type="text" name="loginName" placeholder="用户名/邮箱/手机号码" value=""></li>'
                +'<li><input class="ipt-txt" id="password" type="password" name="password" placeholder="密码" value=""></li>'
                +'</ul>'
                +'<p class="yztips"></p>'
                +'<p class="login-opts"><input class="uc-btn login-smt" type="submit" name="" value="登录"></p>'
                +'<p class="g-cf login-lk">'
                +'<a id="goToReg" class="g-fl" >新用户注册</a>'
                +'<a  id="goToFindPwd"   class="g-fr">忘记密码？</a>'
                +'</p>'
                +'<div class="login-three">'
                +'<span class="t">用第三方帐号登录</span>'
                +'<span class="qq"></span>'
                +'<span class="sina"></span>'
                +'<span class="weixin"></span>'
                +'</div>'
                +'<input type="hidden" id="done" name="done" value=""/>'
                +'</form>'
                +'</div>'
                +'</div>';
            require.async('../css/pop-login.css?v=20170104',function() {
                var dg = dialog.dft({
                    id: 'loginDialog',
                    content: html,
                    opacity: 0.7,
                    width:350,
                    height:465,
                    cancel: false,
                    close: function () {
                        $('.aui_outer').parent().removeClass('dialog-login');
                    },
                    init: function () {

                        $('.aui_outer').parent().addClass('dialog-login');

                        login.cmmn();

                        //新用户注册
                        $('#goToReg').on('click', function () {
                            location.href = '//i.csc86.com/reg/index?done=' + encodeURIComponent(location.href);
                            return false;
                        });

                        //忘记密码
                        $('#goToFindPwd').on('click', function () {
                            location.href = '//i.csc86.com/reg/pwdIndex';
                            return false;
                        });

                        //关闭弹窗
                        $('.login .close').on('click', function () {
                            art.dialog({id: "loginDialog"}).close();
                            return false;
                        });

                        //点击登录
                        login.smtFrm($('#loginFrm'), {
                            isPop: isPop,
                            isrefresh: isrefresh,
                            callback: callback
                        });

                    }
                });
            });
        },

        pop:function(){},

        /*非弹窗登录页面里的相关js*/
        notpop:function(){
            login.cmmn();
            login.smtFrm($('#loginFrm'));
        }
    };
    module.exports = login;
});