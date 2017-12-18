define(function(require, exports, module) {
    var dialog=require('./dialog');//弹窗
    var validator=require('./validator');
    var ucCommon=require('./uc-common');
    var regxp=validator.regxp;
    var	hostmap = seajs.hostmap;  // 域名配置表
    var countdown=120;//获取验证码倒计时用的
    var timeCount;//获取验证码倒计时用的
    var triggerEventNum= 0,triggerEventArry=[];
    var findPwd={
        focusFun:function(obj,frmObj){
            var id=frmObj.attr('id'),
                focusTip='';
            switch(id) {
                case 'acountNum':
                    focusTip = '请输入会员名/手机号/邮箱';
                    break;
                case 'validCode':
                    focusTip = '请输入短信验证码';
                    break;
                case 'newPwd':
                    focusTip = '密码须8-20个字符，包含字母和数字';
                    break;
                case 'reNewPwd':
                    focusTip = '请再次输入新密码';
                    break;
            }
            validator.focusTips({
                obj:obj,
                frmObj:frmObj,
                focusTip:focusTip
            });
        },
        blurFun:function(obj,tipObj){
            var id=obj.attr('id'),
                isMust=true,
                nullTip='',
                errorTip='',
                regx=null,
                isAjax=false;
            switch(id) {
                case 'acountNum':
                    nullTip='请输入会员名/手机号/邮箱';
                    isAjax=true;
                    break;
                case 'validCode':
                    nullTip = '请输入短信验证码';
                    errorTip='请输入正确的短信验证码';
                    regx=regxp.num(6,6);
                    break;
            }
            return validator.init({
                isMust:isMust,
                obj:obj,
                tipObj:tipObj,
                nullTip:nullTip,
                errorTip:errorTip,
                regx:regx,
                isAjax:isAjax
            });
        },

        //倒计时
        setTimeCount:function(obj){
            timeCount=setTimeout(function() {
                findPwd.setTimeCount(obj);
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

        smtfun:function(obj,smtBtn){
            smtBtn.attr('disabled',true).css('cursor','default').val('正在提交...');
            $.ajax({
                type:"post",
                url:obj.attr('action'),
                data:obj.serializeArray(),
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
                            if(obj.attr('id')=='findPwdFrm3'){
                                triggerEventArry.push({
                                   userName:$('#acount').val()
                                });
                                if(typeof cscgaMd == 'object'){
                                    cscgaMd.findPwd('pc',triggerEventNum,triggerEventArry[0]);
                                }
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
                    smtBtn.removeAttr('disabled').css('cursor','pointer').val('下一步');
                }
            });
        },

        /*找回密码第一步*/
        step1:function(){

            var $acountNum=$('#acountNum'),//账号文本框
                $acountNumTd=$acountNum.parent(),
                $findPwdFrm1=$('#findPwdFrm1'),//表单form
                $smtBtn=$findPwdFrm1.find('input[type=submit]');//提交按钮

            //placeholder兼容ie
            require.async('m/sea-modules/placeholder.js', function(m) {
                m.placeholder('#acountNum','#aaa');
            });

            /*账号表单验证*/
            $acountNum.on('focus',function(){
                dfAccount=$(this).val();
                findPwd.focusFun($acountNumTd,$acountNum);
            });
            $acountNum.on('blur',function(){
                if(findPwd.blurFun($acountNum,$acountNumTd)){
                    $.get('//'+hostmap.i+'/reg/checkMember?account='+$acountNum.val(),function(data){
                        var status = data.status,
                            msg = data.msg;
                        //status:1 代表成功 0代表有表单字段错误 500代表系统错误
                        switch (status) {
                            case 1:
                                validator.showRightTips({
                                    obj: $acountNum,
                                    tipObj: $acountNumTd
                                });
                                break;
                            case 0:
                                $.each(msg, function (i, n) {
                                    var $i = $('input[name=' + i + ']'),
                                        $iParent = $('input[name=' + i + ']').parent();
                                    validator.showTips({
                                        obj: $iParent,
                                        frmObj: $i,
                                        validTip: n
                                    });
                                });
                                break;
                            default :
                                dialog.tip({
                                    content: msg.sysMsg
                                });
                        }
                    },'jsonp');
                }
            });

            //点击下一步(此步提交直接form提交，非ajax提交)
            $findPwdFrm1.on('submit',function(){
                var $validError;

                $acountNum.trigger('blur');

                $validError=$('.valid-error:visible');
                if($validError[0]){
                    return false;
                }
            });

        },

        /*找回密码第二步*/
        step2:function(){
            var $phone=$('#phone'),
                $validCode=$('#validCode'),//验证码文本框
                $validCodeTd=$validCode.parent(),
                $vCode=$('#vCode'),
                ip=ucCommon.getLocalIPAddress(); //获取ip地址

            /*验证码表单验证*/
            $validCode.on('focus',function(){
                findPwd.focusFun($validCodeTd,$validCode);
            });
            $validCode.on('blur',function(){
                findPwd.blurFun($validCode,$validCodeTd);
            });

            //获取验证码
            $('#getCodeBtn').on('click',function(){
                var $this=$(this);
                $this.attr('disabled',true).css('cursor','default');
                $.get('//'+hostmap.i+'/reg/getCode?dest='+$phone.val()+'&ip='+ip,function(data){
                    var status = data.status,
                        msg = data.msg;
                    //status:1 代表成功 0代表有表单字段错误 500代表系统错误
                    switch (status) {
                        case 1:
                            $vCode.val(data.data);
                            findPwd.setTimeCount($this);
                            break;
                        case 0:
                            $this.removeAttr('disabled').css('cursor','pointer');
                            $.each(msg,function(i,n){
                                var $i=$('input[name='+i+']'),
                                    $iParent=$('input[name='+i+']').parent();
                                validator.showTips({
                                    obj:$iParent,
                                    frmObj:$i,
                                    validTip:n
                                });
                            });
                            break;
                        default :
                            $this.removeAttr('disabled').css('cursor','pointer');
                            dialog.tip({
                                content:msg.sysMsg
                            });
                    }
                },'jsonp');
            });

            $('#findPwdFrm2').on('submit',function(){
                var $this=$(this);
                var $smtBtn=$this.find('input[type=submit]')
                var $validError;

                findPwd.blurFun($validCode,$validCodeTd);

                $validError=$('.valid-error:visible');
                if($validError[0]){
                    return false;
                }

                findPwd.smtfun($this,$smtBtn);
                return false;
            });
        },

        /*找回密码第三步*/
        step3:function(){
            var $newPwd=$('#newPwd'),//新密码文本框
                $newPwdTd=$newPwd.parent(),
                $reNewPwd=$('#reNewPwd'),//再次输入新密码文本框
                $reNewPwdTd=$reNewPwd.parent();

            $newPwd.val('');//一进来先让新密码文本框设为空值，以防将记住的密码直接展示在这里

            $newPwd.on('focus',function(){
                findPwd.focusFun($newPwdTd,$newPwd);
            });

            $newPwd.on('blur',function(){
                validator.init({
                    isMust:true,
                    obj:$newPwd,
                    tipObj:$newPwdTd,
                    nullTip:'请输入新密码',
                    errorTip:'密码须8-20个字符，包含字母和数字',
                    isUniq:false,
                    notUniqTip:'密码过于简单，请重新设置',
                    regx:regxp.pwd
                });
            });

            $newPwd.on('keyup',function(){
                var val=$newPwd.val();
                $reNewPwd.val('').removeClass('frm-error frm-warn');
                $reNewPwdTd.find('.valid-tips').remove();
            });

            $reNewPwd.on('focus',function(){
                findPwd.focusFun($reNewPwdTd,$reNewPwd);
            });

            $reNewPwd.on('blur',function(){
                var pwdVal=$newPwd.val(),
                    val=$reNewPwd.val(),
                    errorTip='';
                if(val==''){
                    validator.showTips({
                        obj:$reNewPwdTd,
                        frmObj:$reNewPwd,
                        validTip:'请再次输入新密码'
                    });
                }else{
                    if(val==pwdVal){
                        validator.showRightTips({
                            obj:$reNewPwd,
                            tipObj:$reNewPwdTd
                        });
                    }else{
                        validator.showTips({
                            obj:$reNewPwdTd,
                            frmObj:$reNewPwd,
                            validTip:'密码不一致'
                        });
                    }
                }
            });

            //点击下一步
            $('#findPwdFrm3').on('submit',function(){
                var $this=$(this);
                var $smtBtn=$this.find('input[type=submit]')
                var $validError;

                $newPwd.trigger('blur');
                $reNewPwd.trigger('blur');

                $validError=$('.valid-error:visible');
                if($validError[0]){
                    return false;
                }

                findPwd.smtfun($this,$smtBtn);

                return false;
            });
        }
    };
    module.exports=findPwd;
});