csc.list = {};

csc.list.reMargin = function (id){
	id = id || "ul.cl-bd li>h2";
	var $id = $(id);
	$id.css("margin-top",($id.parent().height()-$id.height())/2);
	return this;
};

csc.list.cateMore = function (id){
	var
		$catefilter = $("div.cate-filter"),
		$ul = $catefilter.find("ul"),
		$li = $ul.find("li"),
		$liLast = $ul.find("li:last"),
		$liCur = $ul.find("li.cur");
	if($li.length>5 && $li.length%6 !=0){
		var n = 6 - $li.length%6;
			tmp = '';
		for(var i = 0;i<n;i++){
			tmp +='<li />';
		}
		$ul.append(tmp);
	}
	if($liLast.offset().top-$ul.offset().top>31){
		var $hide = $catefilter.find("div.cate-bd");
		$catefilter.find("div.item").after('<div class="cate-more"/><div class="cate-more-bd"><a href="javascript:" class="cate-more-btn"> 更多 </a></div>');
		$("a.cate-more-btn").on("click",function (){
			var
				$t = $(this),
				$tP = $t.parent();
			$tP.toggleClass("less");
			$hide.toggleClass("hide");
			$t.text($tP.is(".less") ? " 收起 " : " 更多 ");
		});
		if($catefilter.find("div.cate3th").length == 0){
			$catefilter.css("margin-bottom",27);
		}
		if($liCur.length != 0 && $liCur.offset().top-$ul.offset().top>61){
			$("a.cate-more-btn").trigger("click");
		}
	}
	$ul.find("li:lt(6)").addClass("first-line");
	return this;
};

csc.list.attrMore = function (id){
	$(".attr-items3 .item:gt(2)").addClass("hide-item");
	id = id || "div.ca-ft>a.more";
	var	$id = $(id),
			$item = $("li.hide-item");
	$id.closest("div.cate-filter").css("margin-bottom",35);
	$id.bind("click",function (){
		$id.toggleClass("less");
		$item.toggleClass("hide-item");
		$id.html($id.is(".less") ? '隐藏<span class="ico">&uarr;</span>' : '更多<span class="ico">&darr;</span>');
	});
	return this;
};

csc.list.showCate3 = (function (){
	$(function (){
		$("div.cate2th>ul>li").on("click",function (){
			var	$t = $(this),
					$tbd = $("#" + $t.attr("id") + "-bd");
			if($tbd.length){
				$t.addClass("cur").siblings(".cur").removeClass("cur");
				$tbd.addClass("cur").siblings(".cur").removeClass("cur");
				return false;
			}
		});
	});
})();

csc.list.inquiry = function (id){
	seajs.use(csc.url('res','/f=js/m/inquiry'),function (){
		csc.signInquiry(id);
	});
};

csc.list.type = function (param,type,t){
	var
		param = param || "",
		type = type || "sort";
	seajs.use(csc.url("res","/f=js/m/param"),function (){
		if( param != csc.param(type) ){
			var par = csc.param(type, ( param || null ));
			par = csc.param("page",1,par);
			if(type == "city"){
				par = csc.param("area",t.find("li>a:contains('"+param+"')").closest("ul").prev("a").text(),par);
			}else if(type == "area"){
				par = csc.param("city",null,par);
			}
			if(par){
				location.search = par;
			}else{
				location.href=location.pathname;
			}
		}else{
			if(type == "area" && csc.param("city")){
				location.search = csc.param("city",null);
			}else if(type == "city" && param == ""){
				location.search = csc.param("area",null);
			}
		}
	});
};

csc.list.searchArea = function (dVal){
	var	othis = this;
	seajs.use(csc.url("res","/f=js/m/area"),function (){
		seajs.use(csc.url("res","/f=js/m/param"),function (){
			csc.selectArea("#selectArea",function (val,t){
				othis.type( val!="所有地区" ? val : "",t.parent().is("li.prov-item") ? "area" : "city",$("#selectArea"));
			},dVal);
			city = csc.param("city");
			if(city){
				$("#selectArea").find("a.s-txt").text(city);
			}
		});
	});
	return othis;
	console.info(location.search);
};

csc.list.searchModel = function (dId){
	var	othis = this;
	seajs.use(csc.url("res","/f=js/m/select"),function (){
		csc.select("#selectModel",function (val){
			val = val == "经营模式" ? "" : val;
			othis.type(val,"mode_id");
		},dId);
	});
	return othis;
};

csc.list.searchBusinesses = function (dId){
	var	othis = this;
	seajs.use(csc.url("res","/f=js/m/select"),function (){
		csc.select("#selectBusinesses",function (val){
			othis.type(val,"businessType");
		},dId);
	});
	return othis;
};

csc.list.clearFloat = function(dId){
	$(dId).addClass('g-h-01');
};

csc.list.proIdRecord = function(check,event){
	var check = check;
		if(Boolean(check)){
			if(check !=="Y"){
				event.preventDefault();
				csc.useDialog(function(){
					csc.tip("该产品已过期，无法对其询盘！");
				});
			}
		}
};

csc.ie8 = (function(){
	return $.browser.msie&&$.browser.version==8.0;
})();

$(function (){
	//seajs.use(csc.url('res','/f=js/m/backTop'));
	/*(csc.ie6 || csc.ie8)*/(csc.ie6) && seajs.use(csc.url("res","/f=js/m/imgMax"),function (){
		$("img[data-max]").each(function (index,item){
			var $item = $(item),
				max = $item.data("max");
			csc.imgMax(item,max,max);
			$item.fadeIn("fast");
		});	
	});

	var
		locaUrl = location.href,
		locaIndex = locaUrl.indexOf("&sort");
	if(locaIndex!=-1){
		locaUrlStr = locaUrl.slice(locaIndex+6,locaIndex+15);
		if(locaUrlStr=="price-des"){
			$(".order-by .desc").addClass('desc-cur');
		}else if(locaUrlStr=="price-asc"){
			$(".order-by .asc").addClass('asc-cur');
		}
	}

	$("div.lih-pro,ul.company-list,div.thumb-pro").delegate("li a[data-memberid]","click",function (){
		var t = this;
		$(t).closest("li.item,li.cl-item").siblings("li").find("div.fllow-contact-info:visible").addClass("g-v-h").next().html("联系方式");
		seajs.use(csc.url("res","/f=js/m/contact"),function (){
			csc.contact(t);
		});
		return false;
	});
	
	
	$("div.lih-pro").delegate("li.active a:contains('立即询盘')","click",function(event){
		var
		$t = $(this),
		check = $t.data("check");
		csc.list.proIdRecord(check,event);
	});
	
	$("div.thumb-pro").delegate("li a.inquiry","click",function(event){
		var
		$t = $(this),
		check = $t.data("check");
		csc.list.proIdRecord(check,event);
	});
	
	$(".s_link").delegate(".arr","click",function(){
		$(this).parent(".s_link").toggleClass('e-l-m');
	});
	
	$(".rank-ad").delegate("em","click",function(){
		$(this).parents(".rank-ad").hide();
	});
	
	if($('.jsSproLst')[0]){
		$('.jsSproLst').on('mouseenter','.item .img',
			function(){
			var _this=$(this);
			_this.find('.bpro-img').show();
		});
			
		$('.jsSproLst').on('mouseleave','.item .img',
			function(){
			var _this=$(this);
			_this.find('.bpro-img').hide();
		});
			/*
		$('.jsSproLst .item .img').hover(function(){
			var _this=$(this);
			_this.find('.bpro-img').show();
		},function(){
			var _this=$(this);
			_this.find('.bpro-img').hide();
		});
		*/
	}
});