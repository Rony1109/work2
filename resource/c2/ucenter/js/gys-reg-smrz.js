define(function(require, exports, module) {
    require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');//上传图片插件
    var dialog=require('./dialog');//弹窗
    var ucCommon=require('./uc-common');
    var validator=require('./validator');
    var regxp=validator.regxp;//正则
    var	hostmap = seajs.hostmap;  // 域名配置表

    var smrz={
        //上传身份证正反两面、营业执照扫描件、授权书
        upload:function(){
            $('.jsUploadBtn').each(function(){
                var $this=$(this);
                var $previewBox=$this.parents('.upload-box').siblings('.preview-box');
                var type=$this.data('type');
                ucCommon.upload({
                    url:'//'+hostmap.i+'/reg/imgUpload',
                    uploadBtn:$this,
                    previewObj:$previewBox,
                    formData:{imgType:type}
                });
            });
        },

        //表单获取焦点
        focusFun:function(obj,frmObj){
            var id=frmObj.attr('id'),
                focusTip='';
            switch(id){
                case 'qyName':
                    focusTip='请输入企业名称';
                    break;
                case 'yyzzRegNum':
                    focusTip='请输入营业执照注册号';
                    break;
                case 'djjg':
                    focusTip='请输入登记机构';
                    break;
                case 'frName':
                    focusTip='请输入企业法人';
                    break;
                case 'idcardNum':
                    focusTip='请输入身份证号码';
                    break;
                case 'frPhone':
                    focusTip='请输入手机号';
                    break;
                case 'frEmail':
                    focusTip='请输入联系邮箱';
                    break;
                case 'dlrName':
                    focusTip='请输入申请人姓名';
                    break;
                case 'dlrPart':
                    focusTip='请输入申请人部门';
                    break;
                case 'dlrZw':
                    focusTip='请输入申请人职位';
                    break;
                case 'dlrTel':
                    focusTip='请输入固定电话';
                    break;
                case 'dlrPhone':
                    focusTip='请输入手机号';
                    break;
            }
            validator.focusTips({
                obj:obj,
                frmObj:frmObj,
                focusTip:focusTip
            });
        },

        //表单失去焦点
        blurFun:function(obj,tipObj){
            var id=obj.attr('id'),
                isMust=true,
                nullTip='',
                errorTip='',
                regx=null,
                isAjax=false;
            switch(id) {
                case 'qyName':
                    nullTip='请输入企业名称';
                    errorTip='企业名称须由4-128位字符组成'
                    regx=regxp.all(4,128);
                    isAjax=true;
                    break;
                case 'yyzzRegNum':
                    nullTip='请输入营业执照注册号';
                    errorTip='营业执照注册号须由15或18位字母或数字组成';
                    regx=regxp.yyzzzch;
                    break;
                case 'province':
                    nullTip='请选择营业执照注册地';
                    break;
                case 'licenseCity':
                    nullTip='请选择营业执照注册地';
                    break;
                case 'yyqx':
                    nullTip='请选择营业期限';
                    break;
                case 'djjg':
                    nullTip='请输入登记机构';
                    errorTip='登记机构须由1-20位字母或汉字组成';
                    regx=regxp.cnEn(1,20);
                    break;
                case 'frName':
                    nullTip='请输入企业法人';
                    errorTip='企业法人须由1-60位汉字组成';
                    regx=regxp.cn(1,60);
                    break;
                case 'idcardNum':
                    nullTip='请输入身份证号码';
                    errorTip='身份证号码为15或18位数字和字母X，且X只能放最后一位';
                    regx=regxp.idcard;
                    break;
                case 'frIdcardImg1':
                    nullTip='请上传法人身份证正面';
                    break;
                case 'frIdcardImg2':
                    nullTip='请上传法人身份证反面';
                    break;
                case 'yyzzImg':
                    nullTip='请上传营业执照扫描件';
                    break;
                case 'frPhone':
                    nullTip='请输入手机号';
                    errorTip='格式不正确，手机号码为11位数字';
                    regx=regxp.phone;
                    break;
                case 'frEmail':
                    isMust=false;
                    errorTip='联系邮箱格式不正确';
                    regx=regxp.email;
                    break;
                case 'dlrName':
                    nullTip='请输入申请人姓名';
                    errorTip='申请人姓名须由1-12个汉字组成';
                    regx=regxp.cn(1,12);
                    break;
                case 'dlrPart':
                    nullTip='请输入申请人部门';
                    errorTip='须由1-20位中文、英文、数字组成，且不可全为数字';
                    regx=regxp.dlrPart;
                    break;
                case 'dlrZw':
                    nullTip='请输入申请人职位';
                    errorTip='申请人职位须由1-20位字母或汉字组成';
                    regx=regxp.cnEn(1,20);
                    break;
                case 'dlrTel':
                    isMust=false;
                    errorTip='固定电话格式不正确';
                    regx=regxp.tel;
                    break;
                case 'dlrPhone':
                    nullTip='请输入手机号';
                    errorTip='格式不正确，手机号码为11位数字';
                    regx=regxp.phone;
                    break;
                case 'dlrIdcardImg1':
                    nullTip='请上传申请人身份证正面';
                    break;
                case 'dlrIdcardImg2':
                    nullTip='请上传申请人身份证反面';
                    break;
                case 'sqsImg':
                    nullTip='请上传授权书扫描件';
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

        init:function(){
            var $smrzFrm=$('#smrzFrm'),//表单form
                $enterpriseType=$('input[name=enterpriseType]'),//企业类型单选框
                $enterpriseTypeTd=$enterpriseType.parent(),
                $qyName=$('#qyName'),//企业名称文本框
                $qyNameParent=$qyName.parent(),
                $yyzzRegNum=$('#yyzzRegNum'),//营业执照注册号文本框
                $yyzzRegNumTd=$yyzzRegNum.parent(),
                $province=$('#province'),//营业执照注册地身份下拉列表
                $provinceTd=$province.parent(),
                $yyqx=$('#yyqx'),//营业期限文本框
                $yyqxTd=$yyqx.parents('td'),
                $djjg=$('#djjg'),//登记机构文本框
                $djjgTd=$djjg.parent(),
                $frName=$('#frName'),//企业法人文本框
                $frNameTd=$frName.parent(),
                $idcardNum=$('#idcardNum'),//身份证号码文本框
                $idcardNumTd=$idcardNum.parent(),
                $proposerType=$('input[name=proposerType]'),//法人申请和代理人申请单选框
                $jsApplyC=$('.jsApplyC'),
                $frPhone=$('#frPhone'),//法人申请：联系人手机文本框
                $frPhoneTd=$frPhone.parent(),
                $frEmail=$('#frEmail'),//法人申请：联系邮箱文本框
                $frEmailTd=$frEmail.parent(),
                $dlrName=$('#dlrName'),//代理人申请：申请人姓名文本框
                $dlrNameTd=$dlrName.parent(),
                $dlrPart=$('#dlrPart'),//代理人申请：申请人部门文本框
                $dlrPartTd=$dlrPart.parent(),
                $dlrZw=$('#dlrZw'),//代理人申请：申请人职位文本框
                $dlrZwTd=$dlrZw.parent(),
                $dlrTel=$('#dlrTel'),//代理人申请：固定电话文本框
                $dlrTelTd=$dlrTel.parent(),
                $dlrPhone=$('#dlrPhone'),//代理人申请：手机号文本框
                $dlrPhoneTd=$dlrPhone.parent(),
                $frIdcardImg1=$('#frIdcardImg1'),//法人身份证正面隐藏域
                $frIdcardImgLi1=$frIdcardImg1.parents('li'),
                $frIdcardImg2=$('#frIdcardImg2'),//法人身份证反面隐藏域
                $frIdcardImgLi2=$frIdcardImg2.parents('li'),
                $yyzzImg=$('#yyzzImg'),//营业执照扫描件隐藏域
                $yyzzImgTd=$yyzzImg.parents('td'),
                $dlrIdcardImg1=$('#dlrIdcardImg1'),//代理人申请：申请人身份证正面隐藏域
                $dlrIdcardImgLi1=$dlrIdcardImg1.parents('li'),
                $dlrIdcardImg2=$('#dlrIdcardImg2'),//代理人申请：申请人身份证反面隐藏域
                $dlrIdcardImgLi2=$dlrIdcardImg2.parents('li'),
                $sqsImg=$('#sqsImg'),//代理人申请：授权书扫描件隐藏域
                $sqsImgTd=$sqsImg.parents('td'),
                $readChk=$('#readChk'),
                $readChkP=$readChk.parent();

            //营业期限选择日期
            require.async('l/My97DatePicker/4.8/buyoffer_WdatePicker', function(m) {
                $('#yyqx,.date-icon').on('click',function(){
                    WdatePicker({
                        readOnly:true,
                        el:'yyqx',
                        isShowClear:false,
                        onpicked:function(){
                            smrz.blurFun($yyqx,$yyqxTd);
                        }
                    });
                });
            });

            //营业执照注册地获取地址
            ucCommon.getAddress($province,'licenseCity');

            //申请人切换
            $proposerType.on('change',function(){
                var $this=$(this),
                    index=$('input[name=proposerType]').index(this),
                    $uploadFbtn=$jsApplyC.find('.upload-fbtn');
                if(index==1){//加上才兼容ie7,原因不清楚
                    $uploadFbtn.css('visibility','visible');
                }else{
                    $uploadFbtn.css('visibility','hidden');
                }
                $jsApplyC.hide().eq(index).show();
                /*$jsApplyC.find('input').val('').removeClass('frm-error frm-warn');
                $jsApplyC.find('.valid-tips').remove();
                $dlrIdcardImg1.siblings('img').attr('src','//res.csc86.com/v2/c2/ucenter/images/card-img1.jpg');
                $dlrIdcardImg2.siblings('img').attr('src','//res.csc86.com/v2/c2/ucenter/images/card-img2.jpg');
                $sqsImg.siblings('img').attr('src','//res.csc86.com/v2/c2/ucenter/images/yyzz-img.jpg');*/
            });

            //上传图片
            smrz.upload();

            //企业类型验证
            $enterpriseType.on('click',function(){
                if(!$enterpriseTypeTd.find('.valid-right')[0]){
                    validator.showRightTips({
                        obj:$enterpriseType,
                        tipObj:$enterpriseTypeTd
                    });
                }
            });

            //企业名称验证
            $qyName.on('focus',function(){
                smrz.focusFun($qyNameParent,$qyName);
            });
            $qyName.on('blur',function(){
                var $this=$(this),
                    val=$this.val();
                if(smrz.blurFun($qyName,$qyNameParent)){
                    //status:1 代表成功 0代表有表单字段错误 500代表系统错误 2代表未登录
                    $.get('//'+hostmap.i+'/reg/checkEnterpriseName?enterpriseName='+val,function(data){
                        var status=data.status,
                            msg=data.msg;
                        if(status==1){
                            validator.showRightTips({
                                obj:$qyName,
                                tipObj:$qyNameParent
                            });
                        }
                        else if(status==2){
                            dialog.tip({
                                content:msg,
                                close:function(){
                                    location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
                                }
                            });
                        }
                        else{
                            validator.showTips({
                                obj:$qyNameParent,
                                frmObj:$qyName,
                                validTip:msg
                            });
                        };
                    },'jsonp');
                }
            });

            //营业执照注册号验证
            $yyzzRegNum.on('focus',function(){
                smrz.focusFun($yyzzRegNumTd,$yyzzRegNum);
            });
            $yyzzRegNum.on('blur',function(){
                smrz.blurFun($yyzzRegNum,$yyzzRegNumTd);
            });

            //营业执照注册地验证
            $province.on('change',function(){
                var isTrue=smrz.blurFun($province,$provinceTd);
                if(isTrue&&$('#licenseCity')[0]){
                    smrz.blurFun($('#licenseCity'),$provinceTd);
                }
            });
            $('body').on('change','#licenseCity',function(){
                var $this=$(this);
                smrz.blurFun($this,$provinceTd);
            });

            //登记机构验证
            $djjg.on('focus',function(){
                smrz.focusFun($djjgTd,$djjg);
            });
            $djjg.on('blur',function(){
                smrz.blurFun($djjg,$djjgTd);
            });

            //企业法人验证
            $frName.on('focus',function(){
                smrz.focusFun($frNameTd,$frName);
            });
            $frName.on('blur',function(){
                smrz.blurFun($frName,$frNameTd);
            });

            //身份证号码验证
            $idcardNum.on('focus',function(){
                smrz.focusFun($idcardNumTd,$idcardNum);
            });
            $idcardNum.on('blur',function(){
                smrz.blurFun($idcardNum,$idcardNumTd);
            });

            //法人申请：联系手机验证
            $frPhone.on('focus',function(){
                smrz.focusFun($frPhoneTd,$frPhone);
            });
            $frPhone.on('blur',function(){
                smrz.blurFun($frPhone,$frPhoneTd);
            });

            //法人申请：联系邮箱验证
            $frEmail.on('focus',function(){
                smrz.focusFun($frEmailTd,$frEmail);
            });
            $frEmail.on('blur',function(){
                smrz.blurFun($frEmail,$frEmailTd);
            });

            //代理人申请：申请人姓名验证
            $dlrName.on('focus',function(){
                smrz.focusFun($dlrNameTd,$dlrName);
            });
            $dlrName.on('blur',function(){
                smrz.blurFun($dlrName,$dlrNameTd);
            });

            //代理人申请：申请人部门验证
            $dlrPart.on('focus',function(){
                smrz.focusFun($dlrPartTd,$dlrPart);
            });
            $dlrPart.on('blur',function(){
                smrz.blurFun($dlrPart,$dlrPartTd);
            });

            //代理人申请：申请人职位验证
            $dlrZw.on('focus',function(){
                smrz.focusFun($dlrZwTd,$dlrZw);
            });
            $dlrZw.on('blur',function(){
                smrz.blurFun($dlrZw,$dlrZwTd);
            });

            //代理人申请：固定电话验证
            $dlrTel.on('focus',function(){
                smrz.focusFun($dlrTelTd,$dlrTel);
            });
            $dlrTel.on('blur',function(){
                smrz.blurFun($dlrTel,$dlrTelTd);
            });

            //代理人申请：手机号验证
            $dlrPhone.on('focus',function(){
                smrz.focusFun($dlrPhoneTd,$dlrPhone);
            });
            $dlrPhone.on('blur',function(){
                smrz.blurFun($dlrPhone,$dlrPhoneTd);
            });

            //点击下一步
            $smrzFrm.on('submit',function(){
                var $this=$(this),
                    $licenseCity=$('#licenseCity'),
                    $smtBtn=$this.find('input[type=submit]'),
                    $validError,top;

                //企业类型验证
                if(!$('input[name=enterpriseType]:checked')[0]){
                    validator.showTips({
                        obj:$enterpriseTypeTd,
                        frmObj:$enterpriseType,
                        validTip:'请选择企业类型'
                    });
                }else{
                    validator.showRightTips({
                        obj:$enterpriseType,
                        tipObj:$enterpriseTypeTd
                    });
                }

                $qyName.trigger('blur');//企业名称验证
                smrz.blurFun($yyzzRegNum,$yyzzRegNumTd);//营业执照注册号验证


                //营业执照注册地验证
                $('.yyzzzch-td').find('select:last').trigger('change');

                smrz.blurFun($yyqx,$yyqxTd);//营业期限验证
                smrz.blurFun($djjg,$djjgTd);//登记机构验证
                smrz.blurFun($frName,$frNameTd);//企业法人验证
                smrz.blurFun($idcardNum,$idcardNumTd);//身份证号码验证

                smrz.blurFun($frIdcardImg1,$frIdcardImgLi1);//法人身份证正面验证
                smrz.blurFun($frIdcardImg2,$frIdcardImgLi2);//法人身份证反面验证
                smrz.blurFun($yyzzImg,$yyzzImgTd);//营业执照扫描件验证

                if($('input[name=proposerType]:checked').attr('id')=='frApply'){
                    smrz.blurFun($frPhone,$frPhoneTd);//联系手机验证
                    smrz.blurFun($frEmail,$frEmailTd);//联系邮箱验证
                }else{
                    smrz.blurFun($dlrName,$dlrNameTd);//申请人姓名验证
                    smrz.blurFun($dlrPart,$dlrPartTd);//申请人部门验证
                    smrz.blurFun($dlrZw,$dlrZwTd);//申请人职位验证
                    smrz.blurFun($dlrTel,$dlrTelTd);//固定电话验证
                    smrz.blurFun($dlrPhone,$dlrPhoneTd);//手机号验证
                    smrz.blurFun($dlrIdcardImg1,$dlrIdcardImgLi1);//申请人身份证正面验证
                    smrz.blurFun($dlrIdcardImg2,$dlrIdcardImgLi2);//申请人身份证反面验证
                    smrz.blurFun($sqsImg,$sqsImgTd);//授权书扫描件验证
                }

                $validError=$('.valid-error:visible');
                if($validError[0]){
                    top=$validError.eq(0).offset().top;
                    $('html,body').animate({scrollTop:top-100},300);
                    return false;
                }

                $smtBtn.attr('disabled',true).css('cursor','default').val('正在提交...');
                $.ajax({
                    type:"post",
                    url:$this.attr('action'),
                    data:$this.serializeArray(),
                    dataType:"jsonp",
                    success:function(data){
                        var status=data.status,
                            msg=data.msg,
                            result=data.data,
                            html='';
                        //status:1 代表成功 0代表有表单字段错误 500代表系统错误 2代表未登录 4代表违禁词
                        switch(status){
                            case 1:
                                location.href='//'+hostmap.i+'/'+result.url;
                                break;
                            case 2:
                                dialog.tip({
                                    content:msg.sysMsg,
                                    close:function(){
                                        location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
                                    }
                                });
                                break;
                            case 0:
                                $.each(msg,function(i,n){
                                    var $i=$('input[name='+i+']'),
                                        $iParent=$i.parent();
                                    if(i=='licenseProvince'||i=='licenseCity'){
                                        $i=$('select[name='+i+']');
                                        $iParent=$i.parent();
                                    }
                                    if(i=='uploadLegalPersonCard'||i=='uploadLegalPersonCard2'||i=='uploadApplicantCard'||i=='uploadApplicantCard2'){
                                        $iParent=$i.parents('li');
                                    }
                                    if(i=='businessTern'||i=='licenseImg'||i=='uploadProposerWarrant'){
                                        $iParent=$i.parents('td');
                                    }
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
                            case 4:
                                $.each(msg,function(i,n){
                                    html+='<p>'+(i+1)+'、<span class="g-fwb">'+n.frmTxt+'</span>中的<span>“'+n.wjc.replace(/[\[\]]/g,'')+'”</span>属于违禁词或敏感词，请修改</p>';
                                });
                                dialog.stop({
                                    width:450,
                                    content:'<h2 class="g-fs16">对不起，您填写的信息不规范！</h2>'+html,
                                    ok:function(){}
                                });
                                break;
                            default:
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
                        $smtBtn.removeAttr('disabled').css('cursor','pointer').val('下一步');
                    }
                });
                return false;
            });

        }
    };
    smrz.init();
})