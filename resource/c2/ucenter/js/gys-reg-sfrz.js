define(function(require, exports, module) {
    require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');//上传图片插件
    var dialog=require('./dialog');//弹窗
    var ucCommon=require('./uc-common');
    var validator=require('./validator');
    var regxp=validator.regxp;//正则
    var	hostmap = seajs.hostmap;  // 域名配置表
    var sfrz={
        //上传身份证正反两面
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
        focusFun:function(obj,frmObj){
            var id=frmObj.attr('id'),
                focusTip='';
            switch(id) {
                case 'name':
                    focusTip='请输入姓名';
                    break;
                case 'idcardNum':
                    focusTip='请输入身份证号码';
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
                case 'name':
                    nullTip = '请输入姓名';
                    errorTip = '姓名须由2-8个字符组成';
                    regx = regxp.all(2, 8);
                    break;
                case 'idcardNum':
                    nullTip = '请输入身份证号码';
                    errorTip = '身份证号码为15或18位数字和字母X，且X只能放最后一位';
                    regx = regxp.idcard;
                    break;
                case 'idcardImg1':
                    nullTip='请上传身份证正面';
                    break;
                case 'idcardImg2':
                    nullTip='请上传身份证反面';
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
            var $name=$('#name'),//姓名文本框
                $nameTd=$name.parent(),
                $idcardNum=$('#idcardNum'),//身份证号文本框
                $idcardNumTd=$idcardNum.parent(),
                $idcardImg1=$('#idcardImg1'),//身份证正面隐藏域
                $idcardImgLi1=$('#idcardImg1').parents('li'),
                $idcardImg2=$('#idcardImg2'),//身份证反面隐藏域
                $idcardImgLi2=$('#idcardImg2').parents('li'),
                $sfrzFrm=$('#sfrzFrm');//form表单

            //姓名验证
            $name.on('focus',function(){
                sfrz.focusFun($nameTd,$name);
            });
            $name.on('blur',function(){
                sfrz.blurFun($name,$nameTd);
            });

            //身份证验证
            $idcardNum.on('focus',function(){
                sfrz.focusFun($idcardNumTd,$idcardNum);
            });
            $idcardNum.on('blur',function(){
                sfrz.blurFun($idcardNum,$idcardNumTd);
            });

            //上传身份证
            sfrz.upload();

            $sfrzFrm.on('submit',function(){
                var $this=$(this),
                    $smtBtn=$this.find('input[type=submit]'),
                    action=$this.attr('action'),
                    $validError,top;

                sfrz.blurFun($name,$nameTd);
                sfrz.blurFun($idcardNum,$idcardNumTd);
                sfrz.blurFun($idcardImg1,$idcardImgLi1);
                sfrz.blurFun($idcardImg2,$idcardImgLi2);

                //有错误时返回第一个错误表单
                $validError=$('.valid-error:visible');
                if($validError[0]){
                    top=$validError.eq(0).parent().offset().top;
                    $('html,body').animate({scrollTop:top-100},300);
                    return false;
                }

                $smtBtn.attr('disabled',true).css('cursor','default').val('正在提交...');
                $.ajax({
                    type:"post",
                    url:action,
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
                                    if(i=='idCardAImg'||i=='idCardBImg'){
                                        $iParent=$i.parents('li');
                                    }
                                    validator.showTips({
                                        obj:$iParent,
                                        frmObj:$i,
                                        validTip:n
                                    });
                                    $validError=$('.valid-error:visible');
                                    if($validError[0]){
                                        top=$validError.eq(0).parent().offset().top;
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
    sfrz.init();
})