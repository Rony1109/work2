define(function(require, exports, module) {
    var dialog=require('./dialog');//弹窗
    var ucCommon=require('./uc-common');
    var validator=require('./validator');

    var regxp=validator.regxp;
    var	hostmap = seajs.hostmap;  // 域名配置表
    var countdown=120;//获取验证码倒计时用的
    var timeCount;//获取验证码倒计时用的
    var regStep={
        //判断密码强度
        pwdStrength:{
            //判断输入密码的类型
            charMode:function(n){
                if (n>=48 && n <=57) //数字
                    return 1;
                if (n>=65 && n <=90) //大写
                    return 2;
                if (n>=97 && n <=122) //小写
                    return 4;
                else
                    return 8;
            },
            //计算密码模式
            bitTotal:function(num){
                modes=0;
                for (i=0;i<4;i++){
                    if (num & 1) modes++;
                    num>>>=1;
                }
                return modes;
            },
            //返回强度级别
            checkStrong:function(val){
                if (val=='')
                    return 0; //密码太短，不检测级别
                Modes=0;
                for (i=0;i<val.length;i++){
                    //密码模式
                    Modes|=regStep.pwdStrength.charMode(val.charCodeAt(i));
                }
                return regStep.pwdStrength.bitTotal(Modes);
            },
            //密码强度入口函数
            init:function(obj,val){
                if(val==''){
                    obj.removeClass('lower middle high');
                }else{
                    var level=regStep.pwdStrength.checkStrong(val);
                    switch(level) {
                        case 0:
                            objt.removeClass('lower middle high');
                            break;
                        case 1:
                            obj.removeClass('middle high').addClass('lower');
                            break;
                        case 2:
                            obj.removeClass('lower high').addClass('middle');
                            break;
                        default:
                            obj.removeClass('lower middle').addClass('high');
                    }
                }
            }
        },

        //倒计时
        setTimeCount:function(obj){
            timeCount=setTimeout(function() {
                regStep.setTimeCount(obj);
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
        },

        //手机失去焦点时的表单验证
        phoneBlur:function(obj,tipObj){
            var istrue= validator.init({
                isMust:true,
                obj:obj,
                tipObj:tipObj,
                nullTip:'请输入手机号',
                errorTip:'格式不正确，手机号码为11位数字',
                regx:regxp.phone,
                isAjax:true
            });
            if(istrue){
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
            }
        },

        /*验证码失去焦点时验证*/
        vldcodeBlur:function(obj,tipObj){
            var istrue= validator.init({
                isMust:true,
                obj:obj,
                tipObj:tipObj,
                nullTip:'请输入验证码',
                isAjax:true
            });
            if(istrue){
                $.get('//'+hostmap.i+'/reg/checkImgCode?imgCode='+obj.val(),function(data){
                    var status=data.status,
                        msg=data.msg;
                    if(status==1){
                        validator.showRightTips({
                            obj:obj,
                            tipObj:tipObj
                        });
                    }else{
                        validator.showTips({
                            obj:tipObj,
                            frmObj:obj,
                            validTip:msg
                        });
                    }
                },'jsonp');
            }
        },
        dialogs:function(options){
            var Thiss=$(this);
            artDialog({
                id: options,
                title: '',
                fixed: true,
                lock: true,
                background: "#000",
                opacity: "0.3",
                content: $("#" + options).html(),
                init: function () {
                    $('.aui_state_lock').addClass('paymentszf');
                    $('.aui_title').css('border-bottom', '0px');

                    $("#reg_sel").change(function () {
                        var checkText = $("#reg_sel").find("option:selected").text();
                        if (checkText == '请选择') {
                            $('#reg_big').hide();
                            $('#reg_ts').show();
                        } else {
                            $('#reg_ts').hide();
                            $('#reg_big').show();
                        }
                    })

                    $('#reg_cgsub').on('click', function () {
                        var checkText = $("#reg_sel").find("option:selected").text();
                        if (checkText == '请选择') {
                            $('#reg_big').hide();
                            $('#reg_ts').show();
                        } else {
                            $('#reg_ts').hide();
                            $('#reg_big').show();
                            $('#trade').val(checkText);
                            $('#reg_cgsub').attr('disabled',true).css('cursor','default').val('正在注册...');//reg_cgsub
                            $.ajax({
                                type:"post",
                                url:$('#regFrm').attr('action'),
                                data:$('#regFrm').serializeArray(),
                                dataType:"jsonp",
                                success:function(data){
                                    var status=data.status,
                                        msg=data.msg,
                                        result=data.data;
                                    //status:1 代表成功 0代表有表单字段错误 500代表系统错误
                                    if(status==1){
                                        artDialog.close();
                                        cscga('create', 'SU-10001-1', 'auto','RegistertTracker');
                                        cscga('RegistertTracker.require', 'cscplugin',{userName: $('#phone').val(),eventAction:'registerSuccess', userKinds: $('#regType').val()});
                                        cscga('RegistertTracker.cscplugin:RegisterInit');
                                        location.href='//'+hostmap.i+'/'+result.url+'?done='+result.done;
                                    }else{
                                        if(status==500){
                                            dialog.tip({
                                                content:msg.sysMsg
                                            });
                                        }else{
                                            $.each(msg,function(i,n){
                                                var $i=$('input[name='+i+']'),
                                                    $iParent=$('input[name='+i+']').parent();
                                                validator.showTips({
                                                    obj:$iParent,
                                                    frmObj:$i,
                                                    validTip:n
                                                });
                                                $validError=$('.valid-error:visible');
                                                if($validError[0]){
                                                    top=$validError.eq(0).offset().top;
                                                    $('html,body').animate({scrollTop:top-100},300);
                                                    return false;
                                                }
                                            });
                                        }
                                    }
                                },
                                error:function(){
                                    dialog.tip({
                                        content:'系统异常，请稍候再试'
                                    });
                                },
                                complete:function(){
                                    $('#reg_cgsub').removeAttr('disabled').css('cursor','pointer').val('确认');
                                }
                            });
                        }

                    })
                },
                close: function () {
                    this.hide();
                    $('#smtBtn').removeAttr('disabled').css('cursor','pointer').val('立即注册');
                    //return false;
                }
            });
        },
        init:function(){
            var $form=$('#regFrm'),
                $phone=$('#phone'),//手机号码文本框
                $phoneParent=$phone.parent(),
                $pwd=$('#pwd'),//密码文本框
                $pwdParent=$pwd.parent(),
                $rpwd=$('#rpwd'),//确认密码文本框
                $rpwdParent=$rpwd.parent(),
                $vldcode=$('#vldcode'),//验证码文本框
                $vldcodeTd=$vldcode.parent(),
                $validCode=$('#validCode'),//手机验证码文本框
                $codeParent=$validCode.parent(),
                $pwdStrngthLst=$('#pwdStrngthLst'),
                $jsGetCode=$('#getCodeBtn'),
                $smtBtn=$('#smtBtn'),
                $readChk=$('#readChk'),
                $readChkParent=$readChk.parent(),
                $iptTxt=$('.ipt-txt'),
                $pwdStrngthLst=$('#pwdStrngthLst'),
                $cCode=$('#cCode'),
                $code=$('#code'),
                $dest=$('#dest'),
                $regType=$('#regType');//存放注册类型（采购商还是注册商）

            var ip=ucCommon.getLocalIPAddress(); //获取ip地址
            var doneUrl=ucCommon.getUrlParam(location.href,'done')||'';

            //当url里有done参数且该参数不为空(done参数用于存放上一个页面的地址)时，登录后跳转后done参数所对应的页面
            $('#done').val(doneUrl);

            //采购商和供应商注册切换
            $('.jsRegTab li').on('click',function(){
                var $this=$(this),
                    index=$('.jsRegTab li').index(this);
                if(index===0){
                    $this.addClass('cgs-cur').siblings().removeClass('gys-cur');
                    $jsGetCode.removeClass('yllw-btn').addClass('gray-btn');
                    $smtBtn.removeClass('blue-btn').addClass('yllw-btn');
                    $regType.val('CG');
                    $('.res-gystit').hide();
                    $('.res-cgstit').show();
                }else{
                    $this.addClass('gys-cur').siblings().removeClass('cgs-cur');
                    $jsGetCode.removeClass('gray-btn').addClass('yllw-btn');
                    $smtBtn.removeClass('yllw-btn').addClass('blue-btn');
                    $regType.val('GY');
                    $('.res-gystit').show();
                    $('.res-cgstit').hide();
                }
                $form[0].reset();
                $iptTxt.removeClass('frm-error frm-warn');
                $('.valid-tips').remove();
                $pwdStrngthLst.removeClass('lower middle high');
                $jsGetCode.removeAttr('disabled').css('cursor','pointer').val('获取验证码');
                clearTimeout(timeCount);
            });

            //手机号验证
            $phone.on('focus',function(){
                validator.focusTips({
                    obj:$phoneParent,
                    frmObj:$phone,
                    focusTip:'请输入手机号'
                });
            });
            $phone.on('blur',function(){
                regStep.phoneBlur($phone,$phoneParent);
            });

            //密码验证
            $('#pwd,#rpwd').on('focus',function(){
                var $this=$(this),
                    $parent=$this.parent(),
                    id=$this.attr('id'),
                    focusTip='密码须8-20个字符，包含字母和数字';
                if(id=='rpwd'){
                    focusTip='请再次输入密码';
                }
                validator.focusTips({
                    obj:$parent,
                    frmObj:$this,
                    focusTip:focusTip
                });
            });
            $pwd.on('blur',function(){
                validator.init({
                    isMust:true,
                    obj:$pwd,
                    tipObj:$pwdParent,
                    nullTip:'请输入密码',
                    errorTip:'密码须8-20个字符，包含字母和数字',
                    isUniq:false,
                    notUniqTip:'密码过于简单，请重新设置',
                    regx:regxp.pwd
                });

            });
            $pwd.on('keyup',function(){
                var val=$pwd.val();
                regStep.pwdStrength.init($pwdStrngthLst,val);
                $rpwd.val('').removeClass('frm-error frm-warn');
                $rpwd.siblings('.valid-tips').remove();
            });
            $rpwd.on('blur',function(){
                var pwdVal=$pwd.val(),
                    val=$rpwd.val(),
                    errorTip='';
                if(val==''){
                    validator.showTips({
                        obj:$rpwdParent,
                        frmObj:$rpwd,
                        validTip:'请再次输入密码'
                    });
                }else{
                    if(val==pwdVal){
                        validator.showRightTips({
                            obj:$rpwd,
                            tipObj:$rpwdParent
                        });
                    }else{
                        validator.showTips({
                            obj:$rpwdParent,
                            frmObj:$rpwd,
                            validTip:'密码不一致'
                        });
                    }
                }
            });

            //刷新验证码
            $vldcodeTd.on('click','.refresh',function(){
                ucCommon.refreshCode($(this).siblings('.code-img').find('img'));
            });
            //验证码验证
            $vldcode.on('focus',function(){
                validator.focusTips({
                    obj:$vldcodeTd,
                    frmObj:$vldcode,
                    focusTip:'请输入验证码'
                });
            });
            $vldcode.on('blur',function(){
                regStep.vldcodeBlur($vldcode,$vldcodeTd);
            });

            //获取手机验证码
            $jsGetCode.on('click',function(){
                var $phoneRight=$phoneParent.find('.valid-right'),
                    $vldcodeRight=$vldcodeTd.find('.valid-right'),
                    phoneVal=$phone.val();
                if(!$phoneRight[0]||!$vldcodeRight[0]){
                    $validCode.removeClass('frm-error frm-warn');
                    $validCode.siblings('.valid-tips').remove();
                }
                if(!$phoneRight[0]){
                    regStep.phoneBlur($phone,$phoneParent);
                }else if(!$vldcodeRight[0]){
                    regStep.vldcodeBlur($vldcode,$vldcodeTd);
                }
                else{
                    $jsGetCode.attr('disabled',true).css('cursor','default');
                    $.get('//'+hostmap.i+'/reg/getCodeId?phone='+phoneVal+'&group=phoneRegister&ip='+ip,function(data){
                        var status=data.status;
                        var result=data.data;
                        if(status===1){
                            $code.val(result.code);
                            $dest.val(result.dest);
                            regStep.setTimeCount($jsGetCode);
                        }else{
                            $jsGetCode.removeAttr('disabled').css('cursor','pointer');
                            validator.showTips({
                                obj:$codeParent,
                                frmObj:$validCode,
                                validTip:data.msg
                            });
                        }
                    },'jsonp');
                }
                return false;
            });
            //手机验证验证
            $validCode.on('focus blur keyup',function(e){
                var $this=$(this),
                    $parent=$this.parent(),
                    $phoneRight=$phoneParent.find('.valid-right'),
                    $vldcodeRight=$vldcodeTd.find('.valid-right'),
                    val=$this.val();

                if(!$phoneRight[0]||!$vldcodeRight[0]){
                    $this.val('');
                    $this.removeClass('frm-error frm-warn');
                    $this.siblings('.valid-tips').remove();
                }

                if(!$phoneRight[0]){
                    regStep.phoneBlur($phone,$phoneParent);
                    return;
                }

                if(!$vldcodeRight[0]){
                    regStep.vldcodeBlur($vldcode,$vldcodeTd);
                    return;
                }

                if(e.type=='focus'){
                    validator.focusTips({
                        obj:$parent,
                        frmObj:$this,
                        focusTip:'请获取并输入手机验证码'
                    });
                }

                if(e.type=='blur'){
                    if(val==''){
                        validator.showTips({
                            obj:$parent,
                            frmObj:$this,
                            validTip:'请输入手机验证码'
                        });
                    }else{
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
                    }
                }
            });

            //协议验证
            $readChk.on('change',function(){
                if(!$readChk.is(':checked')){
                    validator.showTips({
                        obj:$readChkParent,
                        frmObj:$readChk,
                        validTip:'请先阅读并同意《华南城网服务条款》和《华南城网在线交易平台服务协议》'
                    });
                }else{
                    validator.showRightTips({
                        obj:$readChk,
                        tipObj:$readChkParent
                    });
                }
            });


            //提交表单
            $form.on('submit',function(){

                var regTypeid=$('#regType').val();
                var action=$form.attr('action');
                var $validError,top;

                $phone.trigger('blur');
                $pwd.trigger('blur');
                $rpwd.trigger('blur');
                $vldcode.trigger('blur');
                $validCode.trigger('blur');

                if(!$readChk.is(':checked')){
                    validator.showTips({
                        obj:$readChk.parent(),
                        frmObj:$readChk,
                        validTip:'请先阅读并同意《华南城网服务条款》和《华南城网在线交易平台服务协议》'
                    });
                }

                $validError=$('.valid-error:visible');
                if($validError[0]){
                    top=$validError.eq(0).offset().top;
                    $('html,body').animate({scrollTop:top-100},300);
                    return false;
                }
                $smtBtn.attr('disabled',true).css('cursor','default').val('正在注册...');
                if(regTypeid=="CG")
                {
                    regStep.dialogs('res_cgpl');
                }else{
                    $.ajax({
                        type:"post",
                        url:action,
                        data:$form.serializeArray(),
                        dataType:"jsonp",
                        success:function(data){
                            var status=data.status,
                                msg=data.msg,
                                result=data.data;
                            //status:1 代表成功 0代表有表单字段错误 500代表系统错误
                            if(status==1){
                                cscga('create', 'SU-10001-1', 'auto','RegistertTracker');
                                cscga('RegistertTracker.require', 'cscplugin',{userName: $('#phone').val(),eventAction:'registerSuccess', userKinds: $('#regType').val()});
                                cscga('RegistertTracker.cscplugin:RegisterInit');
                                location.href='//'+hostmap.i+'/'+result.url+'?done='+result.done;
                            }else{
                                if(status==500){
                                    dialog.tip({
                                        content:msg.sysMsg
                                    });
                                }else{
                                    $.each(msg,function(i,n){
                                        var $i=$('input[name='+i+']'),
                                            $iParent=$('input[name='+i+']').parent();
                                        validator.showTips({
                                            obj:$iParent,
                                            frmObj:$i,
                                            validTip:n
                                        });
                                        $validError=$('.valid-error:visible');
                                        if($validError[0]){
                                            top=$validError.eq(0).offset().top;
                                            $('html,body').animate({scrollTop:top-100},300);
                                            return false;
                                        }
                                    });
                                }
                            }
                        },
                        error:function(){
                            dialog.tip({
                                content:'系统异常，请稍候再试'
                            });
                        },
                        complete:function(){
                            $smtBtn.removeAttr('disabled').css('cursor','pointer').val('立即注册');
                        }
                    });
                }

                return false;
            });

        }

    };
    regStep.init();
});