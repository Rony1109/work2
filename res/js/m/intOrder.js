csc.signIntOrder = function (id,edit){
	var that = this;
	that.intOrderId = id;
	that.intOrderEdit = edit ? edit : null;
	seajs.use(that.url("res","/f=js/m/sign"),function (){
		that.checkSign("csc.intOrder");
	});
};

csc.intCheckSelf = function (fun){
	var
		that = this,
		fun = fun || function (){},
		_tip = function (){
			that.useDialog(function (){
				that.tip("不能对自己的产品进行意向订单！");
			});
		};
	if(!that.intOrderEdit){
		var memberId = $("a[href*='csc.detail.order'],a[href*='csc.shop.order']").data("memberid");
		if(memberId == $("#J_signEd").data("memberid")){
			_tip();
			return;
		}
		$.get(csc.url("api","/member/isLogin.html"),function (data){
			memberId != data.data.memberId ? fun() : _tip();
		},"jsonp");
	}else{
		fun();
	}
};

csc.intOrder = function (){
	var that = this;
	that.signDialogClose && that.signDialogClose();
	that.intCheckSelf(function (){
		document.domain = "csc86.com";
		var html = '<iframe src="'+that.url("res","/css/c/buyoffer/demo/int-order.html")+'" frameborder="0" width="500" height="240" scrolling="no"></iframe>';
		that.useDialog(function (){
			that.intOrderDialog = artDialog({
				id:"intOrder",
				title:"填写意向订单",
				width:500,
				height:240,
				lock:true,
				resize:false,
				fixed:true,
				padding:0,
				content:html
			});
		});
	});
};

csc.intOrderHandler = function (form){
	var that = this,
		data = {proid:that.intOrderId};
	if(form.find("input.aff-text-error").length > 0) return false;
	setTimeout(function (){
		if(form.find("input.aff-text-error").length > 0) return false;
		for(var i in form.serializeArray()){
			data[form.serializeArray()[i]['name']] = form.serializeArray()[i]['value'];
		}
		$.get(form.attr("action"),data,function (data){
			that.intOrderDialog.close();
			if(data.status){
				if(location.hostname.match("member")){
					that.success(data.msg);
					that.int.afterAjax();
				}else{
					artDialog({
						title:false,
						lock:true,
						width:430,
						resize:false,
						fixed:true,
						padding:0,
						content:'<div style="width:350px;padding:30px 40px;overflow:hidden"><div style="padding-left:43px;background:url('+that.url("res","/js/p/artDialog/4.1.5/skins/icons/mem-c.png")+') no-repeat 0 5px"><strong style="font-size:16px">意向订单已发送成功，请等待卖家联系！</strong><p style="margin:5px 0 10px;">您目前共有<strong style="color:#f60;margin:0 6px">'+data.count+'</strong>条意向订单！</p></div><div class="aui_buttons" style="padding-left:25px"><button class="aui_state_highlight" type="button">查看已发送的意向订单</button><button type="button">继续采购</button></div></div>',
						init:function (){
							var othis = this;
							$(othis.DOM.wrap[0]).delegate("button","click",function (){
								othis.close();
								if($(this).is(".aui_state_highlight")){
									location.href=that.url("member","/inquiry/order.html");
								}
							});
						}
					});
				}
			}else{
				that.tip(data.msg);
			}
		},"jsonp");
	},50);
};