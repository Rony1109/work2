/*
 * 弹窗和非弹窗登录js(此js为旧页面调用的弹窗登录页引用的)
 * */
define(function(require, exports, module) {
    $('#loginFrm').find('.login-smt').removeAttr('disabled');//此js一加载进来首先开启登录页面提交按钮
    var dialog=require('./dialog');//弹窗
    var validator=require('./validator');
    var ucCommon=require('./uc-common');
    document.domain = 'csc86.com';
    var login={

        /*
         *第三方登录
         *arg为对应的第三方参数
         *isPop为true时代表弹窗登录
         */
        threeLogin:function(arg,isPop){
            var isPop=isPop||false;
            $.post("//login.csc86.com/thirdLogin",{"source":arg},function(response){
                if(response.status){
                    if(isPop){
                        top.location.href = response.msg;
                    }else{
                        window.location.href = response.msg;
                    }
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

                //错误提示和验证码显示时重写弹窗高度（只针对弹窗登录）
                var rePopHeight=function(){
                    if ($this.find('.code-li')[0]) {
                        $auiMain.height(popHeight2);
                    } else {
                        $auiMain.height(popHeight1);
                    }
                };

                if(userNameVal==''){
                    validator.showTips({
                        obj:$yztips,
                        frmObj:$userName,
                        validTip:'请输入用户名/邮箱/手机号码'
                    });

                    if(isPop) {
                        rePopHeight();
                    }

                    return false;
                }
                if(passwordVal==''){
                    validator.showTips({
                        obj:$yztips,
                        frmObj:$password,
                        validTip:'请输入密码'
                    });

                    if(isPop) {
                        rePopHeight();
                    }

                    return false;
                }

                if($validCode[0]&&validCodeVal==''){
                    validator.showTips({
                        obj:$yztips,
                        frmObj:$validCode,
                        validTip:'请输入验证码'
                    });

                    if(isPop) {
                        rePopHeight();
                    }

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
                                    location.href=result;
                                }else{//弹窗登录
                                    if(isrefresh){//弹窗登录成功后刷新当前页面
                                        window.top.art.dialog({id:'ifm'}).close();
                                        location.reload();
                                    }else{
                                        //获取登录后的信息
                                        /*require.async('//api.csc86.com/notify/count/all/?callback=define',function(data){
                                         callback(data);
                                         window.top.art.dialog({id:'ifm'}).close();
                                         });*/
                                        $.get("//api.csc86.com/notify/count/all/",function (data){
                                            callback(data);
                                            window.top.art.dialog({id:'ifm'}).close();
                                        },"jsonp");
                                    }
                                }
                                break;
                            case 5:
                                if(isPop){
                                    window.top.art.dialog({id:'ifm'}).close();
                                }
                                location.href='//login.csc86.com/toMobile?done='+encodeURIComponent(location.href);;
                                break;
                            case 0:
                                validator.showTips({
                                    obj:$yztips,
                                    frmObj:$userName,
                                    validTip:msg
                                });

                                if(isPop) {
                                    rePopHeight();
                                }
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

                                if(isPop) {
                                    rePopHeight();
                                }
                                break;
                            default :
                                window.top.art.dialog({id:'ifm'}).close();
                                dialog.tip({
                                    content:msg
                                });
                        }
                    },
                    error:function(){
                        window.top.art.dialog({id:'ifm'}).close();
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
        cmmn:function(isPop){
            var isPop=isPop||false;

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
            $('.qq').on('click',function(){
                login.threeLogin('QQ',isPop);
            });

            //第三方登录：sina
            $('.sina').on('click',function(){
                login.threeLogin('sina',isPop);
            });

            //第三方登录：weixin
            $('.weixin').on('click',function(){
                login.threeLogin('WX',isPop);
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
            var dg=dialog.ifm({

                url:'//login.csc86.com/poplogin',
                //width:350,
                opacity:0.7,
                close:function(){
                    var topWindow = art.dialog.top;// 引用顶层页面window对象
                    var $topMain=$(topWindow.document);//顶层页面jquery对象
                    //关闭后恢复弹窗样式(防止影响线上其他的弹窗)
                    $topMain.find('.aui_header').show();
                    $topMain.find('.aui_inner').css('background','#fff');
                    $topMain.find('.aui_nw').show();
                    $topMain.find('.aui_n').show();
                    $topMain.find('.aui_ne').show();
                    $topMain.find('.aui_w').show();
                    $topMain.find('.aui_e').show();
                    $topMain.find('.aui_sw').show();
                    $topMain.find('.aui_s').show();
                    $topMain.find('.aui_se').show();
                },
                init:function(){
                    var iframe = this.iframe.contentWindow;
                    var topWindow = art.dialog.top;// 引用顶层页面window对象
                    var $iframeMain=$(iframe.document);//iframe页面jquery对象
                    var $topMain=$(topWindow.document);//顶层页面jquery对象

                    //重写弹窗样式
                    $topMain.find('.aui_header').hide();
                    $topMain.find('.aui_inner').css('background','none');
                    $topMain.find('.aui_nw').hide();
                    $topMain.find('.aui_n').hide();
                    $topMain.find('.aui_ne').hide();
                    $topMain.find('.aui_w').hide();
                    $topMain.find('.aui_e').hide();
                    $topMain.find('.aui_sw').hide();
                    $topMain.find('.aui_s').hide();
                    $topMain.find('.aui_se').hide();

                    //新用户注册
                    $iframeMain.find('#goToReg').on('click',function(){
                        top.location.href = '//i.csc86.com/reg/index?done='+encodeURIComponent(location.href);
                        return false;
                    });

                    //忘记密码
                    $iframeMain.find('#goToFindPwd').on('click',function(){
                        top.location.href = '//i.csc86.com/reg/pwdIndex';
                        return false;
                    });

                    //关闭弹窗
                    $iframeMain.find('.close').on('click',function(){
                        art.dialog({id:"ifm"}).close();
                        return false;
                    });

                    //点击登录
                    login.smtFrm($iframeMain.find('#loginFrm'),{
                        isPop:isPop,
                        isrefresh:isrefresh,
                        callback:callback
                    });
                }
            });
        },

        /*弹窗登录页面里面的相关js*/
        pop:function(){
            login.cmmn(true);
        },

        /*非弹窗登录页面里的相关js*/
        notpop:function(){
            login.cmmn();
            login.smtFrm($('#loginFrm'));
        }
    };
    module.exports = login;
});