define(function(require, exports, module) {
    var isSubmit = false;
    var triggerEventArry=[],triggerEventNum=0;
    var dialog = require('dialog'); //弹窗插件
    require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');//上传图片插件

    require('newtop'); //顶部会员登陆验证JS

    //新增余额支付start
    require('placeholder'); //兼容ie7的placeholder功能
    //新增余额支付end

    //支付页面临时通告 start
    require("//res.csc86.com/v2/c/order/css/notice.css");
    var notice = require('notice'); 
    notice.pinganBank(notice.payCon);

    var curHref=location.href;

    //支付页面临时通告 start
	
    /*//个人银行和信用卡切换
	var $sroll=$('.sroll');
	$sroll.on('click','.jsli',function(){
		var $this=$(this);
		var $paymentslst=$sroll.find('.payments-lst');
		$thisnum=$this.index();
		$this.addClass("active").siblings().removeClass("active");
		$paymentslst.eq($thisnum).removeClass("none").siblings().addClass("none");
		});
	*/
//新增余额支付start王雪莲
    var option = {
        num:120
    },countclear = "",balancePay=false;//标记是否是有余额支付发起支付以及能否发起支付;

    function toggleFavDel(isEnabled) {//防止重复提交
        var toggle = isEnabled ? "removeClass" : "addClass";
        $("#getPhoneCode")[toggle]("disabled");
    }
    //发送验证码还原到初时状态
    function reductionCount(id){
        clearInterval(countclear);
        option.num=120;
        toggleFavDel(true);
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
            $("#"+id).val(option.num+"秒后重新获取");
            option.num--;
        };
        _c();
        countclear = setInterval(_c,1000);
    }
    //手机获取验证码(发送get请求)
    function getpluginPhoneCode(url){
        if ($("#getPhoneCode").hasClass("disabled")) return;
        toggleFavDel(false);
        $.get(url,{}, function(data) {
            if(data.status==0){
                count("getPhoneCode");
                dialog.tip('验证码发送成功，如2分钟后仍未收到,请重新获取！', 2);
            }else{
                setTimeout(function(){
                    toggleFavDel(true);
                },2000);
                dialog.tip(data.data.errorMsg, 2);
                return ;
            }
        },"jsonp");
    };
    //是否选中以及金额是否足够验证函数
    function checkSub(type){
        var count_balance=+$(".count-balance").html();
        var need_pay=+$(".need-pay").html();
        var val=$('input:radio[name="receiveWay"]:checked').val();//对公账户和个人账户是否选中
        var check_code= $.trim($(".security-code").val());
        if((count_balance-need_pay)<0){
            dialog.tip('可供使用余额不足', 2);
            return false;
        }else if(val==null){
            dialog.tip('请选择收款账户', 2);
            return false;
        }else{
            if(type){
                getpluginPhoneCode("https://i.csc86.com/B2BPay/getValidateCodeForBalancePay?orderId="+$('input[name="orderId"]').val()+"&defaultbank=balancePay");//如果是直接点击获取验证码则执行该函数
            }else{
                if(check_code==""){//如果是直接点击支付，则需要进行验证验证码格式
                    dialog.tip('验证码不能为空！', 2);
                    return false;
                }else if(check_code.length!=7){
                    dialog.tip('验证码长度不符合要求！', 2);
                    return false;
                }else{
                    return true
                }
            }
        }
    }
    //新增余额支付end王雪莲

    //点击支付切换	
    var $jspaylst = $('.jspaylst'),dsqgo = null;
    $jspaylst.on('click', 'li',function() {
        var $this = $(this);
        var $thisul = $(this).parents('.jspaylst');
        var $isEnterprise = $('input[type=hidden][name=isEnterprise]');
        var $thisparentstype = $(this).parents('.payments-lst').data('type');
       // var $thisparentsid = $(this).parents('.payments-lst').data('plant');
		var $thisplant = $(this).find('input[type=hidden][name=defaultbank]').data('plant');
        var $jspayitm = $('.jspayitm');
        var $jseditli = $('.jseditli');
        var $jsPaySmt = $('.jsPaySmt');
        var $jspayFrm = $('.jspayFrm');
        var $xxzfk = $('.xxzfk');
        var $jszftit = $('.jszftit');
        var $wxsm = $('.wxsm');
        var $wxzf = $('.wxzf');
		var $orderIdval = $('input[type=hidden][name=orderId]').val();
		var $sorderIdval = $('input[type=hidden][name=sorderId]').val();
		var $serveIdval = $('input[type=hidden][name=serveId]').val();
        var $frmbtns = $('.frm-btns');
        var $form = $('.jsPymntFrm');
        var $thisparentstit = $(this).parents('.jspayitm').find('.jstit').text();
        var $jsPaySmtparents = $jsPaySmt.parent();

        if($thisul.is('.qy')){
            $isEnterprise.val('1')
        }else{$isEnterprise.val('')};
        $thisbankval = $this.find('input[type=hidden][name=defaultbank]').val();
        $thisid = $this.find('input').attr('id');
        $thisimg = $this.find('img').attr('src');
        $thisimgalt = $this.find('img').attr('alt');
        $jseditli.find('input[type=hidden][name=defaultbank]').val($thisbankval).attr('id', $thisid);
        $jseditli.find('input[type=hidden][name=plantId]').val($thisplant);
        $jseditli.find('img').attr('src', $thisimg).attr('alt', $thisimgalt);
        //$jseditli.find('em').text($thisparentstype);
        $jspayFrm.css({
            'display': 'block',
            'border-bottom': '1px solid #ffffff'
        });
        $jspayitm.css('display', 'none');
        $jszftit.text($thisparentstit);
        $jsPaySmt.css('background', '#ff6700');
        $jsPaySmtparents.css('float', 'left');
        $jsPaySmt.data({
            pay: 1
        });
        //新增余额支付start王雪莲
        if($this.is('.balancePayC')){
            $(".balance_payForm").css('display', 'block');
            //$('input[name="isEnterprise"]').after("<input type='hidden' name='bank' value='balancePay'>");
            balancePay=true;
            //发送post请求获取手机验证码
            $("#getPhoneCode").on("click",function(){
                checkSub(true)
            });
        }
        //新增余额支付end王雪莲
        //选择微信支付
        if ($this.is('.wxsm')) {
            $jsPaySmt.css('display', 'none');
            $frmbtns.css('padding', '0px 55px');
			$wxzf.css('display', 'block');
            $.post($form.attr('action'), $form.serializeArray(),function(data) {
                if (data.status === "200") {
                    $(".wximg").attr("src", 'https://i.csc86.com/qr/init?t=5&s=7&d=' + data.data);

                    var paydefaultbank=$('.jseditli').find('input[name="defaultbank"]').val();
                    var payplantId=$('input[name="plantId"]').val();
                    var paytracker=paydefaultbank+paydefaultbank;
                    cscga('create', 'SU-10001-1', 'auto',paytracker);
                    cscga(paytracker+'.require', 'cscplugin',{orderId: $('input[name="orderId"]').val(),defaultbank:paydefaultbank, plantId: payplantId,eventAction:'ConfirmPayments',payMoney: $('.price').find('.s2').text()*1});
                    cscga(paytracker+'.cscplugin:PaymentsInit');

					if(data.token){$('input[name="conPayToken"]').val(data.token);}

                    //获取二维码后进行定时器判断跳转
                    var payhost = location.host;
                    var paydsq = function() {

                        if ($jsPaySmt.data("pay") == 1) {
                            var $form = $('.jsPymntFrm');
                            var $formoption = $form.serializeArray();
                            $.post('https://i.csc86.com/B2BPay/checkPayStatus', $formoption,function(data) {
                                if (data.status == "0") {
                                    !$sorderIdval?location.href = 'https://' + payhost + '/B2BPay/toPayResultPage?status=1&orderId=' + $orderIdval:location.href = 'https://payment.csc86.com/serve.result.do?orderId=' + $sorderIdval+'&serveId='+$serveIdval;
                                    clearTimeout(dsqgo);
                                }
                            },
                            'jsonp');
                            $("head").find("script").eq(0).remove();
                            dsqgo = setTimeout(paydsq, 2000);
                        }
                    }
                    paydsq();
                }
                //支付失败弹窗提示
                else {
                    var payErrortxt='您的支付请求提交失败';
                    var repayHtml='<a class="repay-btn jsRePay" href="">重新支付</a>';
                    if(data.status==="201"){
                        payErrortxt=data.msg;
                        repayHtml='';
                    }
                    var tipHtml = '<div class="payment-fail-pop"><div class="bd">'+payErrortxt+'</div><div class="ft">'+repayHtml+'<a class="cancel-btn jsCancel" href="">取消</a></div></div>';
                    var dg = dialog({
                        id: 'payFail',
                        title: "提交支付",
                        content: tipHtml,
                        padding: 0,
                        fixed: true,
                        lock: true,
                        opacity: 0.2,
                        init: function() {
                            //取消
                            $('.jsCancel').on('click',function() {
                                $('.jsre').trigger('click');
                                dg.close();
                                return false;
                            });

                            //重新提交
                            $('.jsRePay').on('click',function() {
                                $('.wxsm').trigger('click');
                                dg.close();
                                return false;
                            });
                        },
                        width: 366,
                        height: 196
                    });
                }
            },
            'jsonp');
        }

        //选择线下支付
        if ($this.is('.xxzf')) {
            $xxzfk.css('display', 'block');
            $jsPaySmt.css('display', 'none');
            $wxzf.css('display', 'none');
        }
		return false;
    });

    //返回操作,选择其他支付方式 
    var $jsre = $('.jsre');
    $jsre.on('click',function() {
        var $jspayitm = $('.jspayitm');
        var $jsPaySmt = $('.jsPaySmt');
        var $jspayFrm = $('.jspayFrm');
        var $wxzf = $('.wxzf');
        var $xxzfk = $('.xxzfk');
		var $wximg = $('.wximg');
        var $frmbtns = $('.frm-btns');
        var $jsPaySmtparents = $jsPaySmt.parent();
        //新增余额支付start王雪莲
        $(".balance_payForm").css('display', 'none');
        balancePay=false;
        //$("input").remove("input[name='bank']");
        //新增余额支付end王雪莲
        $xxzfk.css('display', 'none');
		$wximg.attr('src','https://res.csc86.com/v2/c/order/image/payments/loading.gif');
        $jspayFrm.css('display', 'none');
        $jspayitm.css('display', '');
        $jsPaySmt.css({
            'background': '#666',
            'display': ''
        });
        $wxzf.css('display', 'none');
        $jsPaySmtparents.css('float', 'right');
        $frmbtns.css('padding', '23px 55px');
        $jsPaySmt.data({
            pay: 0
        });
        clearTimeout(dsqgo);
		return false;
    });

    //切换企业银行	
    var $jsqy = $('.jsqy');
    $jsqy.on('click',function() {
        var $this = $(this);
        var $thisqx = $this.find('.qx');
        var $ul = $this.parent().find('.payments-lst');
        if ($ul.is(':visible')) {
            $ul.hide();
            $thisqx.text('∨');
        } else {
            $ul.show();
            $thisqx.text('∧');
        }
    });




    var upload = function(obj){
        var loading;
        obj.each(function(){
            //document.domain = "csc86.com";
            var $this=$(this);
            //$prvwBox=$this.parents('.upld-box:first').siblings('.prvw-box');
            $this.fileupload({
                dataType:'json',
                url:'//i.csc86.com/pay/imgUpload?type=orderVoucherPic',
                formData:function(){//指定上传的参数
                    var dataObj={};
                    return dataObj;
                },
                progressall:function(e,data){
                    dialog.loading('文件正在上传中，请稍后...');
                },
                add:function(e,data){
                    var fileInfo=data.files[0],
                        regx=/(\.|\/)(jpe?g|png|gif)$/i,
                        fileName=fileInfo.name,
                        fileSize=fileInfo.size;
                    if(!regx.test(fileName)){
                        dialog.tip('仅持jpg,png,gif格式文件，请选择正确的文件格式！',2);
                        return false;
                    }else{
                        if(fileSize>1024*1024*5){

                            dialog.tip('文件大小不得超过5M！',2);
                            return false;
                        }else{

                            data.submit();
                        }
                    }
                },
                done:function(e,data){
                    art.dialog({id:"cscLoading"}).close();

                    if(data.result.status=='1'){
                        $('input[name="xxzfimginp"]').val(data.result.key);
                       // dialog.tip(data.result.msg?data.result.msg:'上传成功！',3,function(){
                            //location.href=location.href;
                         //   console.log(1);
                       // });
                        $('.imgsrc').attr('src','//img.csc86.com'+data.result.key);
                    }else{

                        dialog.tip(data.result.msg?data.result.msg:'上传失败，请稍后重试！',3);
                    }
                },
                fail:function(e,data){
                    art.dialog({id:"cscLoading"}).close();
                    dialog.tip(data.result.msg?data.result.msg:'上传失败，请稍后重试！',3);
                }
            });
        });
    };

    upload($('.fileUploadBtn'));



    //线下支付提交

    $('.xxzfbtn').on('click',function(){
        var arr=[];
        $.each($('input[name*="xxzf"]'),function(){
            var meval=$(this).val();
            if(!$.trim(meval)){
                arr.push(false);
            }
        });
        if($.inArray(false,arr)>=0){
            dialog.tip('请填写付款流水号及上传凭证',3);
            return false;
        };

        if(isSubmit===true){return false;}//阻止表单重复提交
        isSubmit=true;
        var dataobj={"payNumber":$.trim($('input[name="xxzflshinp"]').val()),"voucherImgUrl":$('input[name="xxzfimginp"]').val(),"orderNo":$('input[name="orderId"]').val(),"conPayToken":$('input[name="conPayToken"]').val()};
        $.post('/pay/doOffLinePay', dataobj,function(data) {
            if(data.status=="1"){
                triggerEventArry=[];
                triggerEventNum=0;
                if(typeof cscgaMd == 'object'){
                    triggerEventArry.push({
                        orderId:cscgaMd.getUrlParam(curHref,'orderNo'),
                        payMoney:cscgaMd.getUrlParam(curHref,'payMoney'),
                        payNumber:$.trim($('input[name="xxzflshinp"]').val())
                    });
                    cscgaMd.offlinePayment('pc', triggerEventNum, triggerEventArry[0]);
                }
                location.href=data.data;
            }else{
                isSubmit=false;
                dialog.tip(data.msg?data.msg:'上传失败，请稍后重试！',3);
            }

        },'json');

    });

    //确认支付
    $('.jsPaySmt').on('click',function() {
        var $this = $(this);
        var $form = $this.parents('.jsPymntFrm');
        var $datapay = $this.data('pay');
        if (!$datapay) {
            dialog.tip('请选择支付方式！', 2);
            return false;
        }
        //新增余额支付start王雪莲
        if(balancePay){//如果是余额支付需进行验证后发起支付ajax
            checkSub(false);
            if(!checkSub(false)){return}
        }
        //新增余额支付end王雪莲
        if (!$datapay) {
            dialog.tip('请选择支付方式！', 2);
            return false;
        }
        if (isSubmit === true) {
            return false;
        } 
		//阻止表单重复提交
        isSubmit = true;
        $.post($form.attr('action'), $form.serializeArray(),function(data) {
            if (data.status === "200") {
                var paydefaultbank=$('.jseditli').find('input[name="defaultbank"]').val();
                var payplantId=$('input[name="plantId"]').val();
                var paytracker=paydefaultbank+paydefaultbank;
                cscga('create', 'SU-10001-1', 'auto',paytracker);
                if(typeof cscgaMd == 'object') {
                    cscga(paytracker + '.require', 'cscplugin', {
                        orderId: $('input[name="orderId"]').val(),
                        defaultbank: paydefaultbank,
                        plantId: payplantId,
                        eventAction: 'ConfirmPayments',
                        payprice: cscgaMd.getUrlParam(curHref,'payMoney')
                    });
                }
                cscga(paytracker+'.cscplugin:PaymentsInit');
                $(document.body).html(data.data);
                if(balancePay){
                    window.location.href=data.data
                }
            }
            else {
                var payErrortxt='您的支付请求提交失败';
                var repayHtml='<a class="repay-btn jsRePay" href="">重新支付</a>';
                if(data.status==="201"){
                    payErrortxt=data.msg;
                    repayHtml='';
                }
                var tipHtml = '<div class="payment-fail-pop"><div class="bd">'+payErrortxt+'</div><div class="ft">'+repayHtml+'<a class="cancel-btn jsCancel" href="">取消</a></div></div>';
                var dg = dialog({
                    id: 'payFail',
                    title: "提交支付",
                    content: tipHtml,
                    padding: 0,
                    fixed: true,
                    lock: true,
                    opacity: 0.2,
                    init: function() {
                        //取消
                        $('.jsCancel').on('click',function() {
                            dg.close();
                            return false;
                        });

                        //重新支付
                        $('.jsRePay').on('click',function() {
                            $('.jsPaySmt').trigger('click');
                            return false;
                        });
                    },
                    width: 366,
                    height: 196
                });
            }
            isSubmit = false;
        },
        'jsonp');
        return false;
    });
});