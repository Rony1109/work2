var $_id='',$_name='';
$(function(){
	$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(data.status){
				$_id=data.data.memberId;
				$_name=data.data.userName;
				$.get(csc.url("api","/member/messagecount.html"),{type:"json"},function (dataMsg){
					$("div.top-sign-info").find("span.bd").html('<a href="http://member.csc86.com/" target="_blank" rel="nofollow">'+data.data.userName+'</a>！消息<a class="top-msg-num" href="http://member.csc86.com/membercenter/messageall/" target="_blank" rel="nofollow">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="http://member.csc86.com/login/logout" rel="nofollow">退出</a>');
				},"jsonp");
			}else{
				$("div.top-sign-info").find("span.bd").html('欢迎光临华南城网！ <a rel="nofollow" href="http://member.csc86.com/login/phone/" class="tit">登录</a><span class="v-line"></span><a rel="nofollow" target="_blank" href="http://member.csc86.com/register/phonereg">免费注册</a>');
			}
	},"jsonp");
	
	$.get(csc.url("api","/api/search/hotkey"),function (data){
		var con=$("#dist-list");
		var str='';
		for(var i = 0,len = data.length;i<len;i++){
			str+='<li><a target="_blank" href="http://search.csc86.com/offer/products.html?q='+encodeURIComponent(data[i])+'">'+data[i]+'</a></li>';
		}
		
		$("#didst-list").html(str);
		//console.log(str);
	},"jsonp");
	
	
		//新闻滚动
	var textTimer,AutoScroll = function (obj){
		    var self=obj.find("ul:first");
			var h = self.height();
			var w = self.find("li:first").height();
			if(h>342){
			self.animate({
					top:-w
			},500,function(){
				self.css({top:"0px"}).find("li:first").appendTo(self);
			});}
	}

	$('#con_aj').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$(this);
			textTimer = setInterval(function(){
				 AutoScroll($t)
			} ,2000);
	 }).trigger("mouseleave");	
	 
	
	$("#dosubmit").live("click",function(){
		var flag=true, $com = $("#company"),companyVal=$.trim($com.val()), $con = $("#contact"),contactVal=$.trim($con.val()),$tel = $("#tel"),telVal=$.trim($tel.val()),$cat = $("#category"), categoryVal = $.trim($cat.val());
		isFocus=true;
		if(!companyVal){
			flag = tips($com,"#t_com","请填写正确的企业名称");
		}else if(companyVal.length>30){
			flag = tips($com,"#t_com","请填写正确的企业名称");
		}
		if(!contactVal){
			flag = tips($con,"#t_con","请填写正确联系信息");
		}else if(contactVal.length>6){
			flag = tips($con,"#t_con","请填写正确联系信息");
		}
		
		if(!telVal){
			flag = tips($tel,"#t_tel","请填写正确联系信息");
		}else if(reg.test(telVal)==false){
			flag = tips($tel,"#t_tel","请填写正确联系信息");
		}else if(telVal.length<8){
			flag = tips($tel,"#t_tel","请填写正确联系信息");
		}
		if(!categoryVal){
			flag = tips($cat,"#t_cat","请填写正确的采购信息");
		}else if(categoryVal.length>50){
			flag = tips($cat,"#t_cat","请填写正确的采购信息");
		}
		
		if(flag){
			$.post('http://pgmanage.csc86.com/index.php',{"m":"formguide","c":"index","a":"show","formid":"20","siteid":"1","ajax":"true","info[company]":$("#company").val(),"info[contact]":$("#contact").val(),"info[tel]":$("#tel").val(),"info[category]":$("#category").val(),"info[membeId]":$_id,"info[name]":$_name},function(data){
			
				art.dialog({id:'memtool'}).close();
				var arg=artDialog({id: "sueecc",
					content: "",
					opacity:0.4,
					fixed: true,
					init:function (){
						$("div.aui_content").html('<div class="bg"></div');
					},
					title: "",
					width: 509,
					height:192,
					padding: "0",
					lock:true
				});	
			},"jsonp");
		}
	});
	
	$(".diag_btn").click(function(){
				artDialog({id: "memtool",
					content: $("#mem-toolct").html(),
					opacity:0.4,
					fixed: true,
					title: "",
					width: 611,
					padding: "0",
					lock:true
				});	
	});
	
})