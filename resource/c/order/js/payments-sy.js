define(function(require, exports, module) {
	var isSubmit=false;
	var dialog=require('dialog');
	require('newtop');
	require('l/My97DatePicker/4.8/buyoffer_WdatePicker.js');
	
	//$('.top_bar').after('<div style="background-color:#fff; padding-top:10px; overflow:hidden;"><div class="g-w" style="border: 1px solid #EA0000;background: url(//res.csc86.com/v2/c2/newcgsc/css/img/warning.png) 13px 8px no-repeat;"><p style="font-size: 14px;line-height: 25px;padding: 5px 0 5px 45px;">国庆放假期间（2017年10月1日到10月8日），由于部分银行业务暂停，平台提现业务可能受到一定影响，由此给您带来的不便，我们深表歉意！最后，祝大家节日快乐！</p></div></div>');
	
	//钱包首页临时通告 start
	require('//res.csc86.com/v2/c/order/css/notice.css');
	var notice = require('notice');
	notice.pinganBank(notice.walletCon);
	//钱包首页临时通告 end
	
	var $sroll=$('.sroll');
	$sroll.on('click','.jsli',function(){
		var $this=$(this);
		var $paymentslst=$sroll.find('.payments-lst');
		$thisnum=$this.index();
		//console.log($thisnum);
		$this.addClass("active").siblings().removeClass("active");
		$paymentslst.eq($thisnum).removeClass("none").siblings().addClass("none");
		});

	$('.left2 .zj,.left2 .title').find("span").hover(function(){
		$(this).find('.d1').css("display","block");
		},function(){
			$(this).find('.d1').css("display","none");
			});	
	var $yhkcont= $('.yhkcont');
	$yhkcont.find("li").hover(function(){
		$(this).find(".jsdel").show();
		},function(){
			$(this).find(".jsdel").hide();
			});		
			



  $("#pageBut").click(function(){
  	var $inPageNO= $("#inPageNO");
  	var maxPage=parseInt($inPageNO.attr('data-maxPage'));
  	var pageNo =parseInt($inPageNO .val());
  	if(pageNo){
  		if(pageNo>maxPage){
  			pageNo=maxPage;
  		}
  		gotoPage(pageNo);
  	}
  });
		
			
	$yhkcont.on('click','.jsdel',function(){
		var $this=$(this);
		var $thisparent=$this.parents('li');
		var $thistype=$thisparent.find('input[type=hidden][name=type]').val();
		var $thisbankId=$thisparent.find('input[type=hidden][name=bankId]').val();
		var dataObj={"type":$thistype,"bankId":$thisbankId};
		dialog.confirm("确定要删除该银行卡吗？",function(){
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			$.post('//payment.csc86.com/deleteBank.do',dataObj,function(data){
				var _msg=data.data.errorMsg;
				if(data.status===0){
					location.href=location.href;
				}else{
					dialog.tip(_msg?_msg:'删除该银行卡失败！',2);
				}
				isSubmit=false;
			},'json');
		},function(){
			//取消
		});	
		
		return false; 
	});	
	
		$yhkcont.on('click','.jstjk',function(){
		var $this=$(this);
		var host = location.host;
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			
			$.post('https://'+host+'/'+$this.attr('href'),function(data){
				if(data.status===0){
					location.href='//'+host+'/'+data.data;
				}else{
					dialog.tip(data.data.errorMsg?data.data.errorMsg:'最多只能添加5张个人银行卡！',2);
				}
				isSubmit=false;
			},'json');
		return false; 
		
	});	
	
			$('.aqtable').on('click','.s2 a',function(){
		var $this=$(this);
		var host = location.host;
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			
			$.post('//'+host+'/'+$this.attr('href'),function(data){
				if(data.status===0){
					$(document.body).html(data.data);
				}else{
					dialog.tip(data.data.errorMsg?data.data.errorMsg:'请求失败，请重试',2);
				}
				isSubmit=false;
			},'json');
		return false; 
		
	});			
	
	
				$('.jstxb').on('click',function(){
		var $this=$(this);
		var host = location.host;
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			
			$.post('//'+host+'/'+'drawCashVerifyCompany.do',function(data){
				if(data.status===0){
					location.href='//'+host+'/'+$this.attr('href');
				}else{
					dialog.tip(data.data.errorMsg?data.data.errorMsg:'请求失败，请重试',2);
				}
				isSubmit=false;
			},'json');
		return false; 
		
	});


	$('.addcomfirst').on('click',function(){
		var $this=$(this);
		var host = location.host;
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;

		$.post('//'+host+'/'+'hasCompanyCard.do',function(data){
			if(data.status===0){
				location.href='//'+host+'/'+$this.attr('href');
			}else{
				dialog.tip(data.data.errorMsg?data.data.errorMsg:'请求失败，请重试',2);
			}
			isSubmit=false;
		},'json');
		return false;

	});


	$('.jstxa').on('click',function(){
		var $this=$(this);
		var host = location.host;
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;

		$.post('//'+host+'/'+'drawCashVerify.do',function(data){
			if(data.status===0){
				location.href='//'+host+'/'+$this.attr('href');
			}else{
				dialog.tip(data.data.errorMsg?data.data.errorMsg:'请求失败，请重试',2);
			}
			isSubmit=false;
		},'json');
		return false;

	});


	var $jspaylst=$('.jspaylst');
	 $jspaylst.on('click','li',function(){
		var $this=$(this);
		var $thisparentstype=$(this).parents('.payments-lst').data('type');
		var $jspayitm=$('.jspayitm');
		var $jseditli= $('.jseditli');
		var $jsPaySmt= $('.jsPaySmt');
		var $jspayFrm=$('.jspayFrm');
		var $jszftit = $('.jszftit');
		var $wxsm = $('.wxsm');
		var $wxzf = $('.wxzf');
		var $frmbtns = $('.frm-btns');
		var $thisparentstit = $(this).parents('.jspayitm').find('.jstit').text();
		var $jsPaySmtparents=$jsPaySmt.parent();
		$thisval= $this.find('input').val();
		$thisid= $this.find('input').attr('id');
		$thisimg = $this.find('img').attr('src');
		$thisimgalt = $this.find('img').attr('alt');
		$jseditli.find('input').val($thisval).attr('id',$thisid);
		$jseditli.find('img').attr('src',$thisimg).attr('alt',$thisimgalt);
		$jseditli.find('em').text($thisparentstype);
		$jspayFrm.css({'display':'block','border-bottom':'1px solid #ffffff'});
		$jspayitm.css('display','none');
		$jszftit.text($thisparentstit);
		$jsPaySmt.css('background','#e94545');
		$jsPaySmtparents.css('float','left');
		$jsPaySmt.data({pay:1});
		if($this.is('.wxsm')){
			$wxzf.css('display','block');
			$jsPaySmt.css('display','none');
			$frmbtns.css('padding','0px 55px');
			}
		 });
	var $jsre = $('.jsre');
	$jsre.on('click',function(){
		var $jspayitm=$('.jspayitm');
		var $jsPaySmt= $('.jsPaySmt');
		var $jspayFrm=$('.jspayFrm');
		var $wxzf = $('.wxzf');
		var $frmbtns = $('.frm-btns');
		var $jsPaySmtparents=$jsPaySmt.parent();
		$jspayFrm.css('display','none');
		$jspayitm.css('display','');
		$jsPaySmt.css({'background':'#666','display':''});
		$wxzf.css('display','none');
		$jsPaySmtparents.css('float','right');
		$frmbtns.css('padding','23px 55px');
		$jsPaySmt.data({pay:0});
		});
	var $jsqy= $('.jsqy');
	$jsqy.on('click',function(){
		var $this=$(this);
		var $thisqx=$this.find('.qx');
		var $ul=$this.parent().find('.payments-lst');
		if($ul.is(':visible')){
			$ul.hide();
			$thisqx.text('∨');
			}else{
			$ul.show();
			$thisqx.text('∧');	
				}
		});
	//确认支付
	$('.jsPaySmt').on('click',function(){
		var $this=$(this);
		var $form=$this.parents('.jsPymntFrm');
		var $datapay=$this.data('pay');
		if(!$datapay){
			dialog.tip('请选择支付方式！',2);
			return false;
		}
		//console.log(isSubmit);
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		$.post($form.attr('action'),$form.serializeArray(),function(data){
			if(data.status==="200"){
				//document.write(data.data);
				$(document.body).html(data.data);
			}
			else{
				var tipHtml='<div class="payment-fail-pop"><div class="bd">您的支付请求提交失败</div><div class="ft"><a class="repay-btn jsRePay" href="">重新支付</a><a class="cancel-btn jsCancel" href="">取消</a></div></div>';
				var dg=dialog({
					id:'payFail',
					title:"提交支付",
					content:tipHtml,
					padding:0,
					fixed:true,
					lock:true,
					opacity:0.2,
					init:function(){
						//取消
						$('.jsCancel').on('click',function(){
							dg.close();
							return false;
						});
						
						//重新支付
						$('.jsRePay').on('click',function(){
							$('.jsPaySmt').trigger('click');
							return false;
						});
					},
					width:366,
					height:196
				});
			}
			isSubmit=false;
		},'jsonp');
		return false;
	});


	
});