csc.detail = {};

csc.ie8 = (function(){
	return $.browser.msie&&$.browser.version==8.0;
})();

csc.detailTableMax = function (id){
	var id = id || "div.pro-d-con",
		$id = $(id);
	$id.find("table").each(function (){
		if($(this).width() > $id.width()) $(this).width($id.width())
	});
};

$(function (){
	(csc.ie6 || csc.ie8) && seajs.use(csc.url("res","/f=js/m/imgMax"),function (){
		$("img[data-max]").each(function (index,item){
			var $item = $(item),
				max = $item.data("max");
			csc.imgMax(item,max,max);
			$item.fadeIn("fast");
		});
	});
	seajs.use(csc.url("res","/f=js/m/tab"),function (){
		var	$big = $("div.max-img>a");
		csc.tab("div.d-l-img>ul>li",null,"hover",function (t){
			var	src = t.children("a").attr("href");
			$big.attr("href",src.replace(/(\d+)\.(.{3,4})$/,"thumbs/$1_t4.$2")).children("img").attr("src",src.replace(/(\d+)\.(.{3,4})$/,"thumbs/$1_t3.$2"));
		});
	});
	seajs.use(csc.url('res','/f=js/m/backTop'));
	csc.detailTableMax();
});

csc.detail.favSuccess = function (){
	var tmp = '';
	if(csc.detail.favType == "product"){
		tmp = '<strong>产品收藏成功！</strong><br/><a href="'+csc.url("i")+'/user/favoriteList?catId=48032572-cbf4-11e2-abef-52540087237d" target="_blank">查看收藏夹>></a>';
		$("a.favorite[href*='csc.detail.fav']").attr("href","javascript:").addClass("favorited").html("产品已收藏");
	}else{
		tmp = '<strong>旺铺已收藏！</strong><br/><a href="'+csc.url("i")+'/user/favoriteList?catId=5cce42ac-cbf4-11e2-abef-52540087237d" target="_blank">查看收藏夹>></a>';
		$("a.shop-fav[href*='csc.detail.fav']").attr("href","javascript:").addClass("shop-faved").html("旺铺已收藏");
	}
	csc.detail.favTip(tmp);
};

csc.detail.favTip = function(msg){
	var tmp = msg;
	csc.useDialog(function(){
		artDialog({
			content:tmp,
			title: false,
			fixed: true,
			icon: _ARTDIALOG_SKINS_ICOS_[0] || "mem-w"
		});
	});
};

csc.detail.fav = function (id,fun,type){
	fun = fun || this.favSuccess;
	csc.detail.favType = type || "product";
	seajs.use(csc.url("res","/f=js/m/favorite"),function (){
		csc.signFavorite(id,fun,type);
	});
};

csc.detail.order = function (id){
	seajs.use(csc.url("res","/f=js/m/intOrder"),function (){
		csc.signIntOrder(id);
	});
};