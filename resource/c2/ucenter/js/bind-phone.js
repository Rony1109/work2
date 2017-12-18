define(function(require, exports, module) {
    var dialog=require('./dialog');//弹窗
    var ucCommon=require('./uc-common');
    var validator=require('./validator');
    var cookie = require('m/jsM/cookie');
    var regxp=validator.regxp;
    var	hostmap = seajs.hostmap;  // 域名配置表
    var countdown=120;//获取验证码倒计时用的
    var timeCount;//获取验证码倒计时用的
    var triggerEventNum= 0,triggerEventArry=[];
    var bindPhone={
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
        //倒计时
        setTimeCount:function(obj){
            timeCount=setTimeout(function() {
                bindPhone.setTimeCount(obj);
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
        init:function(){
            var $phone=$('#phone'),//手机号文本框
                $phoneTd=$phone.parent(),
                $validCode=$('#validCode'),//验证码文本框
                $validCodeTd=$validCode.parent(),
                $getCodeBtn=$('#getCodeBtn'),//获取验证码按
                $vcode=$('#vcode'),
                $dest=$('#dest'),
                ip=ucCommon.getLocalIPAddress(); //获取ip地址

            //当url里有done参数且该参数不为空(done参数用于存放上一个页面的地址)时，登录后跳转后done参数所对应的页面
            var doneUrl=ucCommon.getUrlParam(location.href,'done')||'';
            $('#done').val(doneUrl);

            /*手机验证*/
            $phone.on('focus',function(){
                validator.focusTips({
                    obj:$phoneTd,
                    frmObj:$phone,
                    focusTip:'请输入手机号'
                });
            });
            $phone.on('blur',function(){
                bindPhone.phoneBlur($phone,$phoneTd);
            });

            //获取手机验证码
            $getCodeBtn.on('click',function(){
                var $this=$(this),
                    $phoneRight=$phoneTd.find('.valid-right'),
                    phoneVal=$phone.val();
                if(!$phoneRight[0]){
                    bindPhone.phoneBlur($phone,$phoneTd);
                    $validCode.removeClass('frm-error frm-warn');
                    $validCode.siblings('.valid-tips').remove();
                }else{
                    $this.attr('disabled',true).css('cursor','default');
                    $.get('//'+hostmap.i+'/reg/getCodeId?phone='+phoneVal+'&group=phoneRegister&ip='+ip,function(data){
                        var status=data.status;
                        var result=data.data;
                        if(status===1){
                            $vcode.val(result.code);
                            $dest.val(result.dest);
                            bindPhone.setTimeCount($this);
                        }else{
                            $this.removeAttr('disabled').css('cursor','pointer');
                            validator.showTips({
                                obj:$validCodeTd,
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
                    $phoneRight=$phoneTd.find('.valid-right'),
                    val=$this.val(),
                    phoneVal=$phone.val();

                if(!$phoneRight[0]){
                    bindPhone.phoneBlur($phone,$phoneTd);
                    $this.val('');
                    $this.removeClass('frm-error frm-warn');
                    $this.siblings('.valid-tips').remove();
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

            //点击提交
            $('#bindPhoneFrm').on('submit',function(){
                var $this=$(this),
                    $smtBtn=$this.find('input[type=submit]'),
                    $validError,top;

                /*$phone.trigger('blur');//手机号码验证
                $validCode.trigger('blur');//验证码验证

                $validError=$('.valid-error:visible');
                if($validError[0]){
                    top=$validError.eq(0).offset().top;
                    $('html,body').animate({scrollTop:top-100},300);
                    return false;
                }*/

                $smtBtn.attr('disabled',true).css('cursor','default').val('正在提交...');
                $.ajax({
                    type:"post",
                    url:$this.attr('action'),
                    data:$this.serializeArray(),
                    dataType:"jsonp",
                    success:function(data){
                        var status=data.status,
                            msg=data.msg,
                            result=data.data;
                        //status:1 代表成功 0代表有表单字段错误 500代表系统错误
                        switch(status){
                            case 1:
                                triggerEventNum=0;
                                triggerEventArry=[];
                                triggerEventArry.push({
                                    userName:cookie.get('username'),
                                    phone:$phone.val()
                                });
                                if(typeof cscgaMd == 'object'){
                                    cscgaMd.bindPhone('pc',triggerEventNum,triggerEventArry[0]);
                                }
                                location.href=result;
                                break;
                            case 0:
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
                                    }
                                });
                                break;
                            default :
                                dialog.tip({
                                    content:msg.sysMsg
                                });
                        }
                    },
                    error:function(){
                        dialog.tip({
                            content:'系统异常，请稍候再试'
                        });
                    },
                    complete:function(){
                        $smtBtn.removeAttr('disabled').css('cursor','pointer').val('提交');
                    }
                });
                return false;
            });

        }
    };
    bindPhone.init();
});