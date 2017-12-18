/*
* 此js仅用于兼容老版页面的弹窗登录，使老版页面的弹窗登录应用新版登录
* 若新项目或新页面中需要弹窗登录请调用 v2/c2/ucenter/js/login.js，用法请参考v2/c2/ucenter/poplogin-demo.html
* */
document.domain = 'csc86.com';
csc.checkSign = function (fun,signFun){
	var	othis = this;
	var isPop=true;
	var isrefresh = false;
	fun = fun || 'csc.signEd';
	signFun = signFun||'';
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
			if(!signFun){
				isrefresh=true;
			}
			signFun = signFun || fun;
			othis.signIn({
				isPop:isPop,
				isrefresh:isrefresh,
				callback:signFun
			});
		}
	},"jsonp");
};

//登录表单验证
csc.validator={
	showTips:function(options){
		var opts={
			obj:null,//开发时不可为空，否则报错
			frmObj:null,
			frmWarnClass:'frm-warn',
			frmErrorClass:'frm-error',
			tipClass:'valid-tips',//提示信息的默认类名
			rightClass:'valid-right',//正确提示信息的类名
			errorClass:'valid-error',//错误提示信息的类名
			warnClass:'valid-warn',
			validTip:'',//错误提示信息
			isEanimation:true,
			animationClass:'shake'//动画的类名
		};
		opts=$.extend({},opts,options);
		var obj=opts.obj,
			frmObj=opts.frmObj,
			frmWarnClass=opts.frmWarnClass,
			frmErrorClass=opts.frmErrorClass,
			tipClass=opts.tipClass,
			rightClass=opts.rightClass,
			errorClass=opts.errorClass,
			warnClass=opts.warnClass,
			validTip=opts.validTip,
			isEanimation=opts.isEanimation,
			animationClass=opts.animationClass,
			$tip;
		$tip=obj.find('.'+tipClass);
		$tip.removeClass(animationClass+' '+warnClass+' '+rightClass);
		frmObj.removeClass(frmWarnClass).addClass(frmErrorClass);

		if($tip[0]){
			if(!$tip.hasClass(errorClass)){
				$tip.addClass(errorClass);
			}
			$tip.html(validTip);
		}else{
			obj.append('<span class="'+tipClass+' '+errorClass+'">'+validTip+'</span>');
		}
		if(isEanimation){
			$tip=obj.find('.'+tipClass);
			$tip.addClass(animationClass);
			setTimeout(function(){
				$tip.removeClass(animationClass);
			},1000);
		}
	}
};

/*
 * 点击登录按钮
 * isPop 是否为当前页面,true代表为弹窗登录
 * isrefresh 登录成功后是否刷新页面,true代表刷新页面(此属性主要用于弹窗登录成功后是否刷新当前页面)
 * callback 回调函数，此函数主要用弹于窗登录成功后不刷新页面时要调用的函数(必须为函数，代码中未对非函数的处理，若不是函数会报错)
 * callback需在isrefresh为false的时候才执行
 * */
csc.signSmtFrm=function(obj,options){
	var opts={
		isPop:false,
		isrefresh:false,
		callback:function(){}
	};
	opts=$.extend({},opts,options);
	var isPop=opts.isPop;
	var isrefresh=opts.isrefresh;
	var callback=opts.callback;
	var $auiMain=$('.aui_main');//弹窗容器，弹窗登录时才用到
	var popHeight1=402;
	var popHeight2=464;
	var tipFun=function(msg){
		artDialog({
			id:'tip',
			title:false,
			content:msg,
			icon:'mem-w',
			fixed:true,
			lock:true,
			opacity: 0,
			time:2,
			dbClickHide:false
		});
	};
	obj.on('submit',function(){
		var $this=$(this),
			$userName=$this.find('#userName'),//用户名/邮箱/手机号码文本框
			$password=$this.find('#password'),//密码文本框
			$validCode=$this.find('#validCode'),//验证码文本框
			$yztips=$this.find('.yztips'),//存放验证信息的容器
			$loginFrmUl=$this.find('.login-frm'),
			$smtBtn=$this.find('.login-smt'),//提交按钮
			userNameVal=$userName.val(),
			passwordVal=$password.val(),
			validCodeVal=$validCode.val(),
			validHtml='<li class="code-li">'+
				'<input class="ipt-txt" id="validCode" type="text" name="code" placeholder="验证码" value="">'+
				'<span class="code-img"><img src="" width="93" height="42" alt=""></span>'+
				'<span class="refresh"></span>'+
				'</li>';

		//错误提示和验证码显示时重写弹窗高度（只针对弹窗登录）
		var rePopHeight=function(){
			if ($this.find('.code-li')[0]) {
				$auiMain.height(popHeight2);
			} else {
				$auiMain.height(popHeight1);
			}
		};

		if(userNameVal==''){
			csc.validator.showTips({
				obj:$yztips,
				frmObj:$userName,
				validTip:'请输入用户名/邮箱/手机号码'
			});

			if(isPop) {
				rePopHeight();
			}

			return false;
		}
		if(passwordVal==''){
			csc.validator.showTips({
				obj:$yztips,
				frmObj:$password,
				validTip:'请输入密码'
			});

			if(isPop) {
				rePopHeight();
			}

			return false;
		}

		if($validCode[0]&&validCodeVal==''){
			csc.validator.showTips({
				obj:$yztips,
				frmObj:$validCode,
				validTip:'请输入验证码'
			});

			if(isPop) {
				rePopHeight();
			}

			return false;
		}
		$smtBtn.attr('disabled',true).css('cursor','default').val('正在登录...');
		$.ajax({
			type:"post",
			url:$this.attr('action'),
			data:$this.serializeArray(),
			dataType:"jsonp",
			success:function(data){
				var status=data.status,
					msg=data.msg,
					result=data.data;
				//status:1 代表成功 0代表有表单字段错误 500代表系统错误 3代表登录三次未登录成功
				switch(status){
					case 1:
						if(!isPop){//非弹窗登录
							location.href=result;
						}else{//弹窗登录
							window.top.art.dialog({id:'ifm'}).close();
							if(isrefresh){//弹窗登录成功后刷新当前页面
								location.reload();
							}else{
								if(typeof(callback)=='string'){
									eval(callback + "()");
								}else{
									callback();
								}
							}
						}
						break;
					case 0:
						csc.validator.showTips({
							obj:$yztips,
							frmObj:$userName,
							validTip:msg
						});

						if(isPop) {
							rePopHeight();
						}

						break;
					case 3:
						if(!$validCode[0]){
							$loginFrmUl.append(validHtml);
							$loginFrmUl.find('.code-img img').attr('src','//login.csc86.com/code');
						}
						csc.validator.showTips({
							obj:$yztips,
							frmObj:$validCode,
							validTip:msg
						});

						if(isPop) {
							rePopHeight();
						}

						break;
					default :
						window.top.art.dialog({id:'ifm'}).close();
						tipFun(msg);
				}
			},
			error:function(){
				window.top.art.dialog({id:'ifm'}).close();
				tipFun('系统异常，请稍候再试');
			},
			complete:function(){
				$smtBtn.removeAttr('disabled').css('cursor','pointer').val('登录');
			}
		});
		return false;
	});
};

csc.signIn = function (options){
	var	othis = this;
	var opts={
		isPop:true,
		isrefresh:true,
		callback:function(){}
	};
	opts=$.extend({},opts,options);
	var isPop=opts.isPop;
	var isrefresh=opts.isrefresh;
	var callback = encodeURIComponent(opts.callback || 'csc.signEd');

	artDialog.open('//login.csc86.com/poplogin',{
		id:'ifm',
		title:false,
		fixed:true,
		lock:true,
		opacity: 0.7,
		padding:0,
		cancel:false,
		close:function(){
			var topWindow = art.dialog.top;// 引用顶层页面window对象
			var $topMain=$(topWindow.document);//顶层页面jquery对象
			//重写弹窗样式(防止影响线上其他的弹窗)
			$topMain.find('.aui_header').show();
			$topMain.find('.aui_inner').css('background','#fff');
			$topMain.find('.aui_nw').show();
			$topMain.find('.aui_n').show();
			$topMain.find('.aui_ne').show();
			$topMain.find('.aui_w').show();
			$topMain.find('.aui_e').show();
			$topMain.find('.aui_sw').show();
			$topMain.find('.aui_s').show();
			$topMain.find('.aui_se').show();
		},
		init:function(){
			var iframe = this.iframe.contentWindow;
			var topWindow = art.dialog.top;// 引用顶层页面window对象
			var $iframeMain=$(iframe.document);//iframe页面jquery对象
			var $topMain=$(topWindow.document);//顶层页面jquery对象

			//重写弹窗样式
			$topMain.find('.aui_header').hide();
			$topMain.find('.aui_inner').css('background','none');
			$topMain.find('.aui_nw').hide();
			$topMain.find('.aui_n').hide();
			$topMain.find('.aui_ne').hide();
			$topMain.find('.aui_w').hide();
			$topMain.find('.aui_e').hide();
			$topMain.find('.aui_sw').hide();
			$topMain.find('.aui_s').hide();
			$topMain.find('.aui_se').hide();

			//新用户注册
			$iframeMain.find('#goToReg').on('click',function(){
				top.location.href = '//i.csc86.com/reg/index?done'+encodeURIComponent(location.href);
				return false;
			});

			//忘记密码
			$iframeMain.find('#goToFindPwd').on('click',function(){
				top.location.href = '//i.csc86.com/reg/pwdIndex';
				return false;
			});

			//关闭弹窗
			$iframeMain.find('.close').on('click',function(){
				art.dialog({id:"ifm"}).close();
				return false;
			});

			//点击登录
			 csc.signSmtFrm($iframeMain.find('#loginFrm'),{
				 isPop:isPop,
				 isrefresh:isrefresh,
				 callback:callback
			 });
		},
		dbClickHide:false //双击不关闭弹窗
	});
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
	}
};

csc.signEd = function (){//触发自定义事件
	location.reload();
};
