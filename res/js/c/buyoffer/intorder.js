csc.int = {};

csc.int.selectAll = function (){
	var
		$all = $("[name='all']"),
		$inquiryId = $(".c :checkbox");
	$all.on("change",function (){
		var	prop = $(this).prop("checked");
		$all.prop("checked",prop);
		$inquiryId.prop("checked",prop);
	});
	$inquiryId.on("change",function (){
		$inquiryId.filter(":not(:checked)").length ? $all.prop("checked",false) : $all.prop("checked",true);
	});
	return this;
};

csc.int.checkedLength = function (){
	return $(".c :checkbox:checked").length
};

csc.int.afterAjax = function (){
	var that = this;
	$.get(location.href,function (data){
		$("div.af-bd").html($("div.af-bd",data).html());
		that.search().selectAll();
	});
};

csc.int.ajaxDo = function (ids, type){
	var
		othis = this,
		ids = $.isArray(ids) ? ids : [ids],
		url;
	switch(type){
		case "deleteInquiryOrder":
		url = "inquiry/orderDM";
		break;
		case "deleteQuoteOrder":
		url = "inquiry/orderDC";
		break;
		default:
		;
	}
	$.post("/" + url,{"ids":ids},function (data){
		csc.useDialog(function (){
			if(data.status){
				csc.success(data.msg);
				othis.afterAjax();
			}else{
				csc.tip(data.msg);
			}
		});
	},"jsonp");
};

csc.int.delOne = function (id,type){
	var	othis = this;
	csc.useDialog(function (){
		csc.confirm("确定要删除所选的意向订单吗？",function (){
			othis.ajaxDo(id, type);
		});
	});
};

csc.int.del = function (){
	var	othis = this;
	csc.useDialog(function (){
		if(othis.checkedLength()){
			var	msg = "确定要删除所选的意向订单吗？";
			csc.confirm(msg,function (){
				var
					ids = [],
					type = (function (){
						var	str = location.pathname;
						return str.match("inquiry") ? "deleteInquiryOrder" : "deleteQuoteOrder";
					})();
				$(".c :checkbox:checked").each(function (i,v){
					ids[i] = v.value;
				});
				othis.ajaxDo(ids, type);
			});
		}else{
			csc.tip("请选中数据后操作");
		}
	});
};

csc.int.changeStatus = function (id,s,dom){
	if($(dom).is(".cur")) return;
	var
		that = this,
		url = location.pathname.match("inquiry") ? "inquiry/stateDM" : "inquiry/stateDC";
	$.post("/"+url,{id:id,state:s},function (data){
		if(data.status){
			csc.success(data.msg);
			that.afterAjax();
		}else{
			csc.tip(data.msg);
		}
	},"jsonp");
};

csc.int.search = function (form){
	var
		that = this,
		form = form || "div.int-order-search>form",
		$form = $(form),
		$select = $form.find("select"),
		$key = $form.find("input.key");
	$form.bind("submit",function(event,filter){
		if(!filter && $.trim($key.val()).length == 0){
			csc.tip("请输入关键字后搜索");
			return false;
		}
		$select.val() != 0 || $select.removeAttr("name");
	});
	$select.bind("change",function (){
		$form.trigger("submit",['filter']);
	});
	return that;
};

csc.int.message = function (){
	var $form = $("form"),
		$content = $form.find("textarea");
	$form.bind("submit",function(){
		var content = $.trim($content.val());
		if(content.length > 0){
			if(content.length>2000){
				csc.tip("留言内容长度不能超过2000个字！");
				return false;
			}
			$.post($form.attr("action"),$form.serializeArray(),function(data){
				if(data.status){
					csc.success(data.msg);
					$("ul.message-list").length || $("div.int-message>div:last").before('<ul class="message-list" />');
					$("ul.message-list").load(location.href + " ul.message-list>li");
					$content.val("");
				}else{
					csc.success(data.msg);
				}
			},"jsonp");
		}else{
			csc.tip("留言信息不能为空！");
		}
		return false;
	});
};

$(function (){
	csc.int.selectAll();
	$("div.app-frame").delegate("div.order-concact>a","click",function (event){
		var t = this;
		$(t).closest("tr").siblings("tr").find("div.fllow-contact-info:visible").addClass("g-v-h");
		seajs.use(csc.url("res","/f=js/m/contact"),function (){
			csc.contact(t);
		});
		return false;
	}).delegate("div.status-select-hover","mouseout click",function(){
		$(this).removeClass("status-select-hover");
	}).delegate("div.status-select","mouseover",function(){
		$(this).addClass("status-select-hover");
	});
});