// 账户中心 支付选择页面JS by lg 2013.07.12
$(function(){
	hoverSelected("#payList>li");
	verifyPayment.showMoney('#otherMoney','#dynamicMoney','#payMoney');
	$("#submitPay").bind("click",function(){$("#payment_form").trigger("submit")});
	$("input[name='payPwd']").bind("blur",function(){
		verifyPayment.payPassword();
	});
});
function hoverSelected(id){
	var _id = $(id);
	_id.bind("click",function(){
		$(this).siblings().removeClass("hover");
		$(this).addClass("hover");
	});
}
var verifyPayment = {
	verifyTips :function(){//自定义错误信息
		var html = {
			"html":"<span class='ver-tips'></span>",
			"erro":"<b class='erro_icon'></b>",
			"selectMoney":"请选择支付金额",
			"notSelectedMoney":"请选择或输入充值金额",
			"blank":"充值金额不能为空",
			"formatMoney":"输入的金额格式不正确，最多两位小数",
			"selectPay":"请选择支付方式",
			"payPassword":"请输入支付密码",
			"passwrdFail":"您输入的支付密码不正确"
		};
		return html;
	},
	payMoney : function(id){//选择充值金额
		var input = $(id).find("input:checked").val(),
			regMoney = new RegExp(/^(([1-9]\d{0,8})(.\d{1,2})?)$|(0\.(([1-9]\d?)|(\d?[1-9])))$/);
		if(input != "" && input != null && input != "undefined"){
			if(input == "otherMoney"){
				var m = $("#"+input).val();
				if( m != "" ){
					if( regMoney.test(m) && m <= 999999999.99 && m >= 0.01 ){
						return true;
					}else{
						return -1;
					}
				}else{
					return 0;
				}
			}else{
				return -3;
			}
		}else{
			return -2;
		}
	},
	showMoney : function(otherMoney,dynamicMoney,paymoney){
		var otherMoney = otherMoney ,
			dynamicMoney = dynamicMoney ,
			paymoney = paymoney , 
			tips = verifyPayment.verifyTips() ,
			tipsClass = $(tips["html"]).attr("class") ,
			lab = $(otherMoney).parent("label");
			$(dynamicMoney).text("0.00");
		$(otherMoney).bind("focus",function(){
			var _this = this , m = verifyPayment.payMoney(paymoney);
			if( m == true ) $(dynamicMoney).text($(_this).val()); else $(dynamicMoney).text("0.00");
		});
		$(otherMoney).bind("blur",function(){
			var _this = this , m = verifyPayment.payMoney(paymoney);
			$(lab).children().remove("."+tipsClass);
		
			switch(m){
				case 0:
				$(lab).append($(tips["html"]).append(tips["erro"]).append(tips["blank"])).focus();
				$(dynamicMoney).text("0.00");
				return false;
				break;

				case -1:
				$(_this).parent("label").append($(tips["html"]).append(tips["erro"]).append(tips["formatMoney"])).focus();
				$(dynamicMoney).text("0.00");
				return false;
				break;

				case -2:
				$(_this).parent("label").append($(tips["html"]).append(tips["erro"]).append(tips["notSelectedMoney"])).focus();
				$(dynamicMoney).text("0.00");
				return false;
				break;

				case -3:
				$(dynamicMoney).text($(payMoney).find("input:checked").val());
				break;

				case true:
				$(dynamicMoney).text($(_this).val());
				break;

				default:break;

			}
		});
		$(paymoney).find("input[type=radio]").each(function(i){
			var _this = this, _id = $(this).attr("id") , v = 0 , o = otherMoney.replace(/#/,"");
			if($(_this).is(":checked")){
				v = $(_this).val();
				var m = verifyPayment.payMoney(paymoney);
				if( m == true ){ 
					var oter=$(_this).val();
					if(oter=="otherMoney"){
						$(dynamicMoney).text($("#otherMoney").val())
					}else{
						$(dynamicMoney).text($(_this).val())
					}
				} else {
					$(dynamicMoney).text("0.00");
					
				};
			}
			$(_this).bind("click",function(){
				$(lab).children().remove("."+tipsClass);
				v = $(_this).val();
				if( o != v ){
					$(dynamicMoney).text(v);
				}
			})
		})
	},
	selectMoney : function(paymoney){//输出充值金额验证信息
		var paymoney = paymoney , 
			pm = verifyPayment.payMoney(paymoney) , 
			tips = verifyPayment.verifyTips() ,
			tipsClass = $(tips["html"]).attr("class") ,
			label = $(paymoney).children("label").last();//确定错误信息插入的位置
			$(label).children().remove("."+tipsClass);//先清空错误信息
		if( pm === 0 ){
			$(label).append($(tips["html"]).append(tips["erro"]).append(tips["blank"])).focus();
			return false;
		}else if( pm === -1 ){
			$(label).append($(tips["html"]).append(tips["erro"]).append(tips["formatMoney"])).focus();
			return false;
		}else if( pm === -2 ){
			$(label).append($(tips["html"]).append(tips["erro"]).append(tips["notSelectedMoney"])).focus();
			return false;
		}else{return true;}
	},
	payList : function(id){
		var plv = $(id).find("input:checked").val();
		if(plv != "" && plv != null && plv != "undefined"){
			return true;
		}else{return false;}
	},
	selectPayList : function(paylist){//输出支付平台选择验证信息
		var paylist = paylist , 
			pl = verifyPayment.payList(paylist) , 
			tips = verifyPayment.verifyTips() ,
			tipsClass = $(tips["html"]).attr("class") ;
			$(paylist).next().remove("."+tipsClass);//先清空错误信息
			
		if(!pl){
			$(paylist).after($(tips["html"]).append(tips["erro"]).append(tips["selectPay"]));
			$(paylist).find("label").each(function(){
                $(this).bind("click",function(){
					$(paylist).next().remove("."+tipsClass);
				});
            });
			return false;
		}else{return true;}
	},
	payPassword:function(id,verify){
		id = id || $("input[name='payPwd']");
		var tips = verifyPayment.verifyTips(),
			error = function(error){
				id.next().is("span.ver-tips") ? id.next().html(tips["erro"]+error) : id.after($(tips["html"]).html(tips["erro"]+error));
			};
		if(id.val() == ""){
			error(tips["payPassword"]);
			return false;
		}else{
			id.next("span.ver-tips").remove();
		}
		!verify || $.ajax({
			async:false,
			data:{
				password:id.val()
			},
			url:"/account/checkPassword.html",
			success:function(data){
				verify = data.status;
			},
			type:"post",
			dataType:"jsonp"
		});
		if(verify === false){
			error(tips["passwrdFail"]);
			return false;
		}
		id.next("span.ver-tips").remove();
		return true;
	},
	paySubmit : function(paymoney,paylist){//提交表单
		var pm = verifyPayment.selectMoney(paymoney),
			pl = verifyPayment.selectPayList(paylist);
		if( ( pm > 0 || pm ==true ) && pl ){
			dialogPay();
		}else{return false;}
	},
	payBalance:function(payList){
		if($("input[name='payPwd']").length > 0 && !verifyPayment.payPassword(null,true)){
			return false;
		}
		if(payList){
			if(!verifyPayment.selectPayList("#payList")){
				return false;
			}
		}
		if($("#payment_form").attr("target") == "_blank"){
			dialogPay();
		}
	}
}
function dialogPay(){
	var
		url = $("input[name='returnUrl']").val() || "/account/index.html",
		html = '<div class="pay_tips clearfix"><span class="f-l m-r-10"><b class="tips-icon"></b></span><div class="pay_tips_c"><h3>请您在新打开的页面完成支付！</h3><span class="c-888 block f-s-14 m-t-10">支付完成前请勿关闭窗口</span><span class="m-t-20 block"><a href="'+url+'" target="_self" class="y-btn m-r-10"><em>支付成功</em></a><a href="javascript://" onClick="artDialog({id:\'payment_pop\'}).close()" target="_self" class="g-btn"><em>失败重新支付</em></a></span></div></div>';
	csc.useDialog(function(){
		artDialog({
			id:'payment_pop',
			title:'温馨提醒',
			lock:true,
			background:'#000',
			opacity:'0.6',
			ok:false,
			content: html,
			closet : true
		});
	})
}