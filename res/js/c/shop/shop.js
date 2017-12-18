csc.shop = {};

csc.shop.isHome = (function (){
	return location.pathname === "/";
})();

csc.shop.search = function (){
	seajs.use(csc.url("res","/f=js/m/hover"),function (){
		csc.hover("div.cs-select","cs-select-hover");
	});
	$("div.cs-select>ul>li").on("click",function (){
		$(this).closest("div").toggleClass("cs-select-hover");
	});
};

csc.shop.navCate = function (nav){
	var
		nav = nav || "ul.nav",
		$nav = $(nav),
		n = $nav.children("li").length-1,
		$cate2th = $nav.find("div.cate-2th"),
		$cate2ul = $cate2th.children("ul");
	$cate2th.prev(".frst-t").find("a").append("<span/>");
	$.each($cate2ul,function (i,v){
		var
			$v = $(v),
			$li = $v.children("li"),
			$ocate2th = $(this).parent("div.cate-2th");
		if($li.length<n){
			$ocate2th.css("height","100%");
		}else{
			$ocate2th.css("height","auto");
		}
	});
	csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){
		csc.hover($nav.find("li"));
		csc.hover($nav.children("li.cur"),"cur-hover");
	})
};

csc.shop.type = function (param,type){
	var
		param = param || "",
		type = type || "sort";
	seajs.use(csc.url("res","/f=js/m/param"),function (){
		if( param != csc.param(type) ){
			var par = csc.param(type, ( param || null ));
			if(par){
				location.search = par;
			}else{
				location.href=location.pathname;
			}
		}
	});
};

csc.shop.sort = function (){
	seajs.use(csc.url("res","/f=js/m/param"),function (){
		var
			sort = csc.param("sort"),
			$li = $("ul.order-factor a[href*='" + sort + "']").parent("li"),
			style = "cur";
			switch(csc.param("sort")){
				case "price-asc":
				style += " up-cur";
				break;
				case "price-desc":
				style += " down-cur";
				break;
				default:
				;
			}
		sort && $li.addClass(style);
	});
};

csc.shop.subCate = function (){
	var
		$subCate = $("div.sub-cate");
	$subCate.find("ul").prev(".frst-t").find("a").prepend("<em/>");
	seajs.use(csc.url("res","/f=js/m/param"),function (){
		var catid = csc.param("scateid");
		catid && $subCate.find("a[href$='"+catid+"']").closest("li").addClass("cur").closest(".item").addClass("cur");
	});
	$subCate.delegate("em","click",function (){
		$(this).closest("li").toggleClass("cur");
		return false;
	});
};

csc.shop.detailThumb = function (){
	seajs.use(csc.url("res","/f=js/m/tab"),function (){
		var	$big = $("div.thumb-img>a");
		csc.tab("ul.thumb-items>li",null,"click",function (t){
			var	src = t.children("a").attr("href");
			$big.attr("href",src.replace(/(\d+)\.(.{3,4})$/,"thumbs/$1_t4.$2")).children("img").attr("src",src.replace(/(\d+)\.(.{3,4})$/,"thumbs/$1_t3.$2"));
		});
	});
};

csc.shop.inquiry = function (id){
	seajs.use(csc.url('res','/f=js/m/inquiry'),function (){
		csc.signInquiry(id);
	});
};

csc.shop.signCricle = function (id){
	if($(".ico-followed").length>0){return false;};
	this.cricleId = id;
	seajs.use(csc.url("res","/f=js/m/sign"),function (){
		csc.checkSign("csc.shop.addCircle");
	});
};

csc.shop.addCircle = function (){
	var othis = this;
	csc.signDialogClose();
	if(othis.cricleId !==''){
		$("ul.follow-fav a.ico-follow").addClass("ico-followed").text("已申请");
		window.open(csc.url("quan") +'/index.html?circleId='+ othis.cricleId,'_blank');
	}else{
		csc.useDialog(function (){
			csc.alert('该商家未开通企业商圈');
		});
	}
};

csc.shop.signLike = function (id){
	if($(".ico-faved").length>0){return false;};
	this.memberId = id;
	seajs.use(csc.url("res","/f=js/m/sign"),function (){
		csc.checkSign("csc.shop.iLike");
	});
};

csc.shop.iLike = function (){
	var othis = this;
	csc.signDialogClose();
	$.get(csc.url("api","/sns/addlike.html"),{memberid:othis.memberId},function (data){
		if(data.status){
			$("ul.follow-fav a.ico-fav").addClass("ico-faved").text("已喜欢");
			location.reload();
		}else{
			csc.useDialog(function(){
				csc.tip(data.data);
			});
		}
	},"jsonp");
};

csc.shop.favSuccess = function (){
	var
		othis = this,
		$a = $("a[href*='csc.shop.fav']").filter(":not(a[href*='favRec'])").attr("href","javascript:"),
		tmp;
	if($a.is(".di-fav")){
		$a.addClass("di-faved").html("产品已收藏");
		tmp = '<strong>产品收藏成功！</strong><br/><a href="'+csc.url("i")+'/user/favoriteList?catId=48032572-cbf4-11e2-abef-52540087237d" target="_blank">查看收藏夹>></a>';
	}else{
		tmp = '<strong>旺铺已收藏！</strong><br/><a href="'+csc.url("i")+'/user/favoriteList?catId=5cce42ac-cbf4-11e2-abef-52540087237d" target="_blank">查看收藏夹>></a>'
		$a.find("span").html("旺铺已收藏").closest("div").addClass("shop-faved");
	}
	csc.shop.favTip(tmp);
};

csc.shop.favRec = function (ele){
	var
	$ele = $("a.ico-favorite[href*='"+ele+"']"),
	proId = $ele.data("id");
	$ele.removeClass("ico-favorite").addClass("ico-favorited").attr("href","javascript:").text("已收藏");
	csc.shop.favTip('<strong>产品收藏成功！</strong><br/><a href="'+csc.url("i")+'/user/favoriteList?catId=48032572-cbf4-11e2-abef-52540087237d" target="_blank">查看收藏夹>></a>');
};

csc.shop.favTip = function(msg){
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

csc.shop.fav = function (id,fun,type){
	var fun = fun || this.favSuccess;
	seajs.use(csc.url("res","/f=js/m/favorite"),function (){
		csc.signFavorite(id,fun,type);
	});
};

csc.shop.skin = function (id){
	$("body").prepend('<div class="shop-use-skin"><div class="g-o-a"><p class="g-d-ib">您的模板将这样展示，如果满意这套模板，立即应用吧！</p><a href="javascript:void(csc.shop.useSkin(\''+id+'\'))" class="g-d-ib">应用模板</a></div></div>');
};

csc.shop.useSkin = function (id){
	$.get(csc.url("member","/shop/replaytemp"),{"patternId":id},function(data){
		csc.useDialog(function (){
			if(data.status){
				csc.success("操作成功");
				setTimeout(function (){
					location.href = location.href;
				},1000);
			}else{
				csc.tip("操作失败");
			}
		});
	},"jsonp");
};

csc.shop.order = function (id){
	seajs.use(csc.url("res","/f=js/m/intOrder"),function (){
		csc.signIntOrder(id);
	});
};

csc.ie8 = (function(){
	return $.browser.msie&&$.browser.version==8.0;
})();

csc.shopAdvMax = function (id,width,height){
	var
		$id = $(id),
		_do = function (id,act,max){
			if(max){
				var ratio = Math.min(max.width /act.width,max.height /act.height);
				if(ratio < 1){
					id.width = act.width*ratio;
					id.height = act.height*ratio;
				}else{
					id.width = Math.min(act.width , max.width);
					id.height = Math.min(act.height , max.height);
				}
			}
		};
	seajs.use(csc.url("res","/f=js/m/imgReady"),function (){
		$.each($id,function (i,v){
			imgReady(v.src, function () {
				_do(v,{width:this.width,height:this.height},{width:width,height:height});
			});
		});
	});
};

$(function (){

	$.get('//api.csc86.com/shop/haveproduct.html',{domain:location.hostname.split('.')[0]},function(data){//是否发布产品
		if(data['status']){
			$('body').append('<div class="shop-guide-bg"></div><div class="shop-guide"><a href="javascript:void($(\'div.shop-guide,div.shop-guide-bg\').remove())" class="shop-guide-close"></a><a href="//member.csc86.com/product/sell/category.html" class="shop-guide-pub"></a><p class="g-d-n">亲，您还未发布产品哦！<br />发布产品更有利于您的旺铺推广和买家收藏哦。</p></div>');

			if(csc.ie6){
				var $bg = $('div.shop-guide-bg'),
					$b = $('body'),
					$g = $('div.shop-guide'),
					timeScoll;
				$bg.css({
					width:$b.width(),
					height:$b.height()
				});
				$(window).bind('scroll', function(event) {
					var $w = $(this);
					clearTimeout(timeScoll);
					timeScoll = setTimeout(function(){
						$g.animate({
							marginTop: $w.scrollTop()-($g.height()/2)
						},50);
					},100);
				}).trigger('scroll');
			}
		}
	},'jsonp');

	(csc.ie6 || csc.ie8) && $("img[data-maxw]").each(function(index,item){
		var
		$item=$(item),
		maxw=$item.data("maxw");
		maxh=$item.data("maxh");
		csc.shopAdvMax(item,maxw,maxh);
		$item.fadeIn("fast");
	});
	
	var	othis = csc.shop;
	$("input[name='speak']").on("change",function (){
		othis.type($(this).prop("checked") ? "y" : "","speak");
	});

	$(".sub-hot-product li:gt(0)").removeClass("first");

	$(".csc-search form").submit(function(){
		var
			$t= $(this),
			$q = $t.find("input[name='q']"),
			$qval = $.trim($q.val()),
			$placeholder = $.trim($q.attr("placeholder"));
		if(($qval==='' || $qval === $placeholder) && $.trim($t.find("li.cur a").text())==='公司' ){
			return false;
		};
	});

	$(".foot-contact li").each(function() {
		var $t = $(this);
		$t.attr("title",$t.text());
	});

	(csc.ie6 || csc.ie8) && seajs.use(csc.url("res","/f=js/m/imgMax"),function (){
		$("img[data-max]").each(function (index,item){
			var $item = $(item),
				max = $item.data("max");
			csc.imgMax(item,max,max);
			$item.fadeIn("fast");
		});
	});
	
	$(".sub-cate .item>ul>li").each(function(){
		var $t= $(this);
		if($t.hasClass("cur")){
			$t.closest("ul").prev("h2").find("a").addClass("txt2");
		}
	});

	$(".about-detail-box:eq(0)").addClass("about-mainpro");
	$(".shop-focus .focus-play li:first").addClass("cur");
});

