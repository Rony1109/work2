csc.checkSign = function (fun,signFun){
	var	othis = this;
	fun = fun || 'csc.signEd';
	if(othis.signStatus === true){//已登录状态
		eval(fun + "()");
		fun == 'csc.signEd' || othis.signEd();
		return;
	}
	$.get("//login.csc86.com/islogin/ajax",function (data){
		if(data.status){
			othis.signStatus = true;
			eval(fun + "()");
			fun == 'csc.signEd' || othis.signEd();
		}else{
			signFun = signFun || fun;
			othis.useDialog(function (){
				othis.signIn(signFun);
			});
		}
	},"jsonp");
};

csc.signIn = function (callback){
	var	othis = this;
	callback = encodeURIComponent(callback || 'csc.signEd');
	if(othis.signDialog){
		$("div.aui_outer>iframe").attr("src",csc.url("login","/poplogin?callback="+callback+"&random="+Math.random(10)*Math.random(10),'csc86.com'));
		othis.signDialog.show();
	}else{
		othis.signDialog = artDialog({
			id:"signDialog",
			content:"",
			title: false,
			width: 460,
			height:400,
			padding:0,
			fixed:true,
			lock:true,////login.csc86.com:8086/center-app/poplogin
			init:function (){
				document.domain = othis.url().replace(location.protocol + "//","").replace(":"+location.port,"");

				var html = '<div style="background:#fff url('+csc.url("res","/css/m/logindialog/img/loading.gif")+') no-repeat 20px center;padding: 30px 0 30px 70px;border: solid 3px #585858;font-size: 14px;">加载中……</div><iframe id="iframe_login" src="'+csc.url("login","/poplogin?callback="+callback,'csc86.com')+'" style="width:100%;height:100%;background:#fff;overflow:visible;display:none" frameborder="0" scrolling="no"></iframe>';

				$(this.DOM.wrap[0]).find("div.aui_outer").css({width:460,overflow:"hidden"}).html( html );

			},
			close:function (){
				this.hide();
				return false;
			}
		});
	}
};

csc.signInfo = function (type){//登录后刷新顶部登录状态
	type = type || "default";
	$("#J_signEd").length || $.get("//login.csc86.com/islogin/ajax",function (dataMember){
		 dataMember.status && $.get(csc.url("api","/member/messagecount.html"),{type:"json"},function (dataMsg){
		 		switch(type){
					case "default":
					default:
					$("div.top-sign-info").find("span.bd").html('<a href="'+csc.url("member")+'" target="_blank" id="J_signEd" data-memberid="'+dataMember.data.memberId+'">'+dataMember.data.userName+'</a>！消息<a href="//member.csc86.com/membercenter/messagelist/" target="_blank" class="top-msg-num">'+dataMsg.data.count+'</a><span class="v-line"></span><a href="//login.csc86.com/signout">退出</a>');
					break;
				}
			},"jsonp");
	},"jsonp");
	return this;
};

csc.signDialogClose = function (refresh){
	var	othis = this;
	if(window.art && othis.signDialog){
		othis.signInfo().signDialog.close();
		//refresh && othis.signInfo(refresh);
	}
};

csc.signEd = function (){//触发自定义事件
	//$(document).trigger('cscSignEd');
	location.reload();
};

//建议所有登录后的操作都绑定到document中，自定义登录后操作演示
/*
$(document).bind('cscSignEd',function(){
	console.info('我已经登录了');
});
 */