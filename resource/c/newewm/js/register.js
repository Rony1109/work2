/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-08-18 09:53:01
 * @version $Id$
 */
 define(function(require, exports, module) {
 	require('zepto');
 	var dest,verricode,dis=false;
 	// 获取验证码
 	$("#getcode").on("touchstart", function(e) {		
 		if ($("#phoneNum").val().match(/1[34578]\d/g)) {
 			var num = $("#phoneNum").val();
 			if (num.length < 11) {
 				$("#msgtip").tipmsg("手机号码位数不正确噢！");
 			} else { 
				if(dis){ 
					return false;
				}
				$("#getcode").prop("disabled",true).css('color','#666');
				dis =true;                     
 				$.ajax({
 					type: "get",
 					url: '//i.csc86.com/phone/getCodeId',
 					data: {
 						phone: num,
 						group: "phoneRegister",
 						ip: "123.123.123.456"
 					},
 					dataType: 'jsonp',
 					// jsonp: "callback",
 					success: function(d) {
 						var t=120,interval;                                    
				 		var time=function(){
				 			$("#getcode").prop("disabled",true).css('color','#666'); 					 			  						
				 			$("#getcode").text(t+"秒后重新获取"); 								
				 			if(t!=0){
				 				t--;
				 			}
				 			else{
				 				clearInterval(interval);
				 				$("#getcode").prop("disabled",false).css('color','inherit');
				 				$("#getcode").text("重新获取");
								dis=false;
				 			}
				 		};				 		
 						if(d.status==-1){
 							$("#msgtip").tipmsg(d.msg);
							$("#getcode").prop("disabled",false).css('color','inherit');
 							dis=false;
 						}
 						else{//验证成功
 							verricode=d.data.code;
 							dest=d.data.dest;
 							interval=setInterval(time,1000);
 						}
 					},
 					error:function(){
 						$("#msgtip").tipmsg("接口数据出错！");
						$("#getcode").prop("disabled",false).css('color','inherit');
 						dis=false;
 					}
 				});
 			}
 		} else {
 			$("#msgtip").tipmsg("仅支持中国内地手机号码，请重新输入！");
 		}
 	});
 	// 为空限制
 	$("#valCode").on("input propertychange", function() {
 		var _this = $(this),nextObj = $("#next");
 		_this.val().length == 6 && $("#phoneNum").val()!=""?nextObj.removeClass("disabled"):nextObj.addClass("disabled");
 	});

 	// 下一步
 	$("#next").on("touchstart", function(e) { 	
 		if($("#phoneNum").val()==""){
 			$("#msgtip").tipmsg("请填写手机号码");
 			return;
 		}
 		if($("#valCode").val()==""){
 			$("#msgtip").tipmsg("请填写验证码");
 			return;
 		}
 		e.preventDefault();	
 		var valcode=$("#valCode").val(), num = $("#phoneNum").val(),hrefval=$(this).prop("href"),vericode=verricode;
 		$.ajax({
 			type: "get",
 			url: '//i.csc86.com/phone/verifyCode',
 			data: {code:valcode,verificationCode:vericode,dest:dest},
 			dataType: 'jsonp',
 			success: function(data) {
 				if(data.status==1){
 					window.location.href='//i.csc86.com/phone/gjh/setPwd?phone='+num+'&code='+valcode+'&verificationCode='+vericode+'&dest='+dest;
 				}
 				else{ 					
 					$("#msgtip").tipmsg(data.msg); 	
 				}
				dis=false; 				
 			},
 			error:function(){
 				$("#msgtip").tipmsg("接口数据出错！");
 			}
 		});
 	});
 	
 });
