//旺铺模板装饰
csc.shopSkin = {};

csc.shopSkin.use = function (){//应用模板
	var
		$liUsed = $("ul.skin-list").find("li.cur"),
		patternId = $.trim($("form[action$='csc86.com']").find("input[name='patternId']").val());
	$.get(csc.url("member","/shop/replaytemp"),{"patternId":patternId},function(data){
		csc.useDialog(function (){
			if(data.status){
				csc.success("操作成功");
				$liUsed.addClass("used").removeClass("cur").append('<span class="g-d-ib used-ico" />');
				csc.shopSkin.useCount($liUsed,true);
				csc.shopSkin.title($liUsed.data("skin"));
				var $prveUsed = $liUsed.siblings(".used");
				$prveUsed.removeClass("used").find("span.used-ico").remove();
				csc.shopSkin.useCount($prveUsed);
			}else{
				csc.tip("操作失败");
			}
		});
	},"jsonp");
};

csc.shopSkin.preview = function (){//预览模板
	open($('div.skin-thumb>img').attr('src').replace('-max','-org'));
	//$("form[action*='csc86.com']").trigger("submit");
};

csc.shopSkin.title = function (obj){
	var $skinTitle = $("div.skin-title");
	$skinTitle.html('<strong>'+obj['styleName']+' '+obj['tradeName']+' '+obj['patternName']+'</strong><div class="g-d-ib stars-bd"><div class="g-d-ib star-'+obj['hotLevel']+'"></div></div>');
};

csc.shopSkin.useCount= function (id,add){
	var data = id.data("skin");
	data['useCount']=parseInt(data['useCount']);
	if(add){
		data['useCount'] +=1;
	}else{
		data['useCount'] -=1;
	}
	id.data("skin",data);
};

csc.shopSkin.choose = function (){
	var
		$skinThumb = $("div.skin-thumb"),
		$skinFormId = $("form[action$='csc86.com']").find("input[name='patternId']");
	$("ul.skin-list").delegate("li:not(.cur,.used)","click",function (){
		var $t = $(this).addClass("cur").removeClass("hover");
		$t.siblings(".cur").removeClass("cur");
		$skinThumb.html('<img src="'+csc.url("res","/v2/c/shop/"+$t.data("skin")['stylePath'])+'/image/thumb-max.jpg" width="315" height="420" />');
		csc.shopSkin.title($t.data("skin"));
		$skinFormId.val($t.data("skin")['patternId']);
		if($t.is(".skin-rec")){
			$t.find("div.use-info").remove();
		}
		if($t.data("skin")['flag']=="0"){
			$('.btn-apply').addClass('g-c9').removeAttr('href');
		}else{
			$('.btn-apply').removeClass('g-c9').attr('href','javascript:void(csc.shopSkin.use());');
		}
		$('.btn-preview').attr('href',$t.data("skin")['url']);
		
	}).delegate("li","mouseenter",function (){
		var $t = $(this).addClass("hover");
		if($t.is(".skin-rec")){
			$t.append('<div class="use-info"><div class="skin-rec-bg"></div><div class="skin-rec-bd">'+$t.data("skin")['patternName']+'</div></div>');
		}
	}).delegate("li","mouseleave",function (){
		var $t = $(this).removeClass("hover");
		if($t.is(".skin-rec")){
			$t.find("div.use-info").remove();
		}
	}).find("li[data-used='true']").addClass("used").append('<span class="g-d-ib used-ico"></span>');
};

$(function(){
	$('ul.prices').delegate('li', 'click', function(event) {
		$(this).addClass('cur').siblings('.cur').removeClass('cur');
		$('input[name="time"]').val($(this).data('time'));
	});
});