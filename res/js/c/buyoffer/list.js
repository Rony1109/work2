csc.buyoffer = {};

csc.buyoffer.selectAll = function (){
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

csc.buyoffer.checkedLength = function (){
	return $(".c :checkbox:checked").length
};

csc.buyoffer.ajaxDo = function (ids, type){
	var
		othis = this,
		ids = $.isArray(ids) ? ids : [ids],
		url;
	switch(type){
		case "deleteQuote":
		url = "quote/deleteinquiry.html";
		break;
		case "deletePrice":
		url = "quote/deleteprice.html";
		break;
		case "closeInquiry":
		url = "inquiry/close.html";
		break;
		case "deleteInquiry":
		url = "inquiry/delete.html";
		break;
		default:
		;
	}
	$.post("/" + url,{"ids":ids},function (data){
		csc.useDialog(function (){
			if(data.status){
				csc.success(data.msg);
				$.get(location.href,function (data){
					$("div.af-bd").html($("div.af-bd",data).html());
					othis.selectAll().doClose().rePublish();
				});
			}else{
				csc.alert(data.msg);
			}
		});
	},"jsonp");
};

csc.buyoffer.doClose = function (){
	var	othis = this;
	$("table").delegate("td>a[href*='/close.html?id=']","click",function (){
		var
			href = $(this).attr("href"),
			ids = href.slice(-36),
			type = href.match("quote") ? "closeQuote" : "closeInquiry";
		othis.ajaxDo(ids, type);
		return false;
	});
	return this;
};

csc.buyoffer.rePublish = function (){
	var	othis = this;
	$("table").delegate("td>a[href*='/republish.html?id=']","click",function (){
		var
			$t = $(this),
			href = $t.attr("href"),
			ids = href.slice(-36);
		csc.useDialog(function (){
			if($t.data("reptype") == 1){
				$.post("/inquiry/republish.html",[{name:"inquiryId",value:ids}],function (data){
					if(data.status){
						csc.success(data.msg);
						$.get(location.href,function (data){
							$("div.af-bd").html($("div.af-bd",data).html());
							othis.selectAll().doClose().rePublish();
						});
					}else{
						csc.alert(data.msg);
					}
				},"jsonp");
			}else{
				var tmp = {
						id:"rePublish",
						content:'<form id="rePublishForm"><input type="hidden" name="reptype" value="'+$t.data("reptype")+'" /><ul class="republish">',
						title:"重发询盘",
						padding:"10px 80px 25px 10px",
						button:[{
							name:"重发询盘",
							callback:function (){
								$("#rePublishForm").trigger("submit");
								return false;
							},
							focus:true
						}],
						lock:true,
						init:function (){
							var
								that = this,
								$rePublishForm = $("#rePublishForm");
							timeOn();
							$rePublishForm.on("submit",function (){
								var data = $(this).serializeArray();
								data.push({
									name:"inquiryId",
									value:ids
								});
								$.post("/inquiry/republish.html",data,function (data){
									that.close();
									if(data.status){
										csc.success(data.msg);
										$.get(location.href,function (data){
											$("div.af-bd").html($("div.af-bd",data).html());
											othis.selectAll().doClose().rePublish();
										});
									}else{
										csc.alert(data.msg,function (){
											$t.trigger("click");
										});
									}
								},"jsonp");
								return false;
							}).closest("tr").next("tr").find("div").css("textAlign","center");
						}
					};
				switch($t.data("reptype")){
					case 3:
					tmp.content += $("#rePublishContent>li:first").html()+'</ul></form>';
					break;
					case 2:
					tmp.content += $("#rePublishContent>li:last").html()+'</ul></form>';
					break;
					case 4:
					tmp.content += $("#rePublishContent").html()+'</ul></form>';
					break;
					default:
					;
				}
				artDialog(tmp);
			}
		});
		return false;
	});
	return this;
};

csc.buyoffer.doDel = function (){
	var	othis = this;
	csc.useDialog(function (){
		if(othis.checkedLength()){
			var	msg = "删除后不可恢复，确定要删除吗？";
			csc.confirm(msg,function (){
				var
					ids = [],
					type = (function (){
						var	str = location.pathname;
						return str.match("quote") ? str.match("pricelist") ? "deletePrice" : "deleteQuote" : "deleteInquiry";
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

csc.buyoffer.listFilter = function (){
	$("div.list-filter").delegate("select","change",function(){
		var param = $(this).attr("name"),
			val = $(this).val();
		if(val == "all"){
			val = "";
		}
		seajs.use(csc.url("res","/f=js/m/param"),function (){
			if(csc.param(param) != val){
				location.search = csc.param(param,val);
			}
		});
	});
};

$(function (){
	csc.buyoffer.selectAll().doClose().rePublish();
});