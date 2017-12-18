/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-08-18 17:08:43
 * @version $Id$
 */

define(function(require, exports, module) {
	 require('zepto');
	 // 中断注册
	 $("#cancelReg").on("touchend", function() {
	 	$("#pop").show();
	 	$(".pop-cn").css("display","block");
	 	$("#cancel").off().on("touchend", function() {
	 		$(".pop-cn").animate({
	 			opacity:0
	 		},300,"ease-out");
	 		setTimeout(function(){
	 			$("#pop").css("display","none");
	 			$(".pop-cn").css("opacity","1");
	 		},300);	 		
	 	});
	 	$("#makesure").off().on("touchend", function() {
	 		$(".pop-cn").animate({
	 			opacity:0
	 		},300,"ease-out");
	 		setTimeout(function(){
	 			$("#pop").css("display","none");
	 			$(".pop-cn").css("opacity","1");
	 		},300);
	 		window.location.href="//i.csc86.com/phone/setCode";
	 	});
	 });
	 $("#pwdb").on("input propertychange",function(){
	 	var pwdb=$(this).val(),pwda=$("#pwda").val();
	 	if(pwdb.length>=6 ){
	 		if(pwda.length >=6) $("#subbtn").removeClass("disabled");
	 	}
	 	else{
	 		if(!$("#subbtn").hasClass("disabled")) $("#subbtn").addClass("disabled");
	 	}
	 });
	 // 提交
	 $("#subbtn").on("touchstart",function(e){
	 	var pwda=$("#pwda"),pwdb=$("#pwdb"),phone=$("input[name='phone']");	
	 	e.preventDefault();
	 	var valid=function(o){
	 		var str=o.val(),ispass=true,isequal=function(){
	 			var isp=false;
	 			for(i=0;i<str.length;i++){
	 				if(i!=str.length - 1 && str.substr(i+1,1) != str.substr(i,1)){//依次和上一位比较，如果不相同返回ture
	 					isp=true;
	 					break;
	 				}
	 			}
	 			return isp;//true代表不重复(通过)，false代表6个数字重复（不通过）
	 		};
	 		if(str.length< 6 || str.length >20){
	 			return false;
	 		}else{
	 			return isequal();
	 		}
	 	};	 	
	 	if(!valid(pwda)){
	 		$("#msgtip").tipmsg("密码位数6到20位，不能全部相同，区分大小写",8000);
	 		return;
	 	}
	 	else{
	 		if(pwda.val()!=pwdb.val()){
	 			$("#msgtip").tipmsg("密码不一致");
	 			return;
	 		}
	 		else{
	 			resub(phone.val());	
	 		}
	 	}	 	
	 });
	 //避免重复提交
		 var resub=function(ph){
			 $.ajax({
				 type:"get",
				 url:"//i.csc86.com/phone/verifyPhone",
				 data:{phone:ph},
				 dataType: 'jsonp',
				 success:function(data){
					 if(data.status==1){//未注册
						 document.regform.submit();
					 }
					 else{//已注册过
						 $("#msgtip").tipmsg(data.msg);
					 }
				 }
			 });
	 };
 });