define(function(require, exports, module) {
	require('./init');
	var tabs=require('tab');
	var slide = require('slide');
	
	var lrScroll=function(tag,un,time){
		var $ul=$(tag).find("ul"),
			$w=$ul.find("li:first").width();
		if(!$ul.is(":animated")){
			if(un==1){
				$ul.animate({
					left:-$w
				},time,function(){
					$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
			}else{
				$ul.css({left:-$w}).find("li:last").prependTo($ul);
				$ul.animate({
					left:0
				},time);
			}
		}
	};
	var lrAutoPlay=function(tag,un,time){
		var scrollTimer;
		$(tag).hover(function(){
			clearInterval(scrollTimer);
		},function(){
			var _this=$(this);
			scrollTimer=setInterval(function(){
				 lrScroll(_this,un);
			},time);
		}).trigger("mouseleave");
	};
	
	//检查是否登录
	$.get("//api.csc86.com/notify/notify",function(data){
		if(data.status==true){
			$(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>'+data.data.purchase+'</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>'+data.data.bank+'</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>'+data.data.message+'</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
		}
	},"jsonp");
	tabs($(".r-sev .tab-sev-til a"),$(".r-sev .sev-til"),"mouseover","cur");
	
	/*热门求购 热门供应切换*/
	tabs($(".hot-qggy .box1-hd a"),$(".hot-qggy .box1-bd"),"mouseover","curr");
	$(".hot-qggy .list-box").each(function(){
		var $this=$(this);
		var scrollTimer;
		$this.hover(function(){
			clearInterval(scrollTimer);
		},function(){
			scrollTimer=setInterval(function(){
				var _ul=$this.find("ul:first");
				var _liH=_ul.find("li:first").height();
				_ul.animate({"marginTop":-_liH +"px" },500,function(){
					_ul.css({marginTop:0}).find("li:first").appendTo(_ul); 
			    });
			},2500);
		}).trigger("mouseleave");
	});
	
	/*广告轮播*/
	new slide(".actv-slide ul",".actv-slide ul>li",{
		slideWidth:520,
		slideHeight:220, 
		slideDirection:0,
		slides_xssm:1,
		slideSeries:1,
		zantin:true,
		slides_auto_span:6000,
		slideButs:'.actv-slide>ol', 
		slideButs_html:function(i){return "<li>"+i+"</li>";}, 
		slideButs_bindsj:"mouseover",
		slideButs_selectclass:"curr",
		slides_controller:'.actv-slide>ol',
		slides_fun:slide.definedfun
	});
   	
	/*行业热点点击左右切换*/
	lrAutoPlay(".hyrd-hd","1",5000);
	$(".hyrd-hd .prev").click(function(){
		lrScroll(".hyrd-hd .txt-slide","2",300);
	});
	$(".hyrd-hd .next").click(function(){
		lrScroll(".hyrd-hd .txt-slide","1",300);
	});
	
	/*品牌商家点击左右切换*/
	lrAutoPlay(".ppsj-bd","1",5000);
	$(".ppsj-hd .prev").click(function(){
		lrScroll(".ppsj-bd","2",500);
	});
	$(".ppsj-hd .next").click(function(){
		lrScroll(".ppsj-bd","1",500);
	});
	
	/*新品导购*/
	lrAutoPlay(".xpdg-c","1",5000);
	$(".xpdg .prev").click(function(){
		lrScroll(".xpdg-c","2",500);
	});
	$(".xpdg .next").click(function(){
		lrScroll(".xpdg-c","1",500);
	});
	
	var lh2s = $(".floors_lhbox"),lh2s_1 = $(".lh_box3");
	lh2s.each(function(index, element) {
		var o = $(element);
		new slide(o.find(".li_lh"), o.find(".li_lh>li"), {
			slideWidth : 200,
			slideHeight : 210,
			slideDirection : 0,
			slideSeries:1,
			slides_auto_span : 5000,
			slideButs_bindsj : "mouseover",
			slideButs : o.find(".but"),
			slides_fun : slide.definedfun
		});
	});
	lh2s_1.each(function(index, element) {
		var o = $(element);
		new slide(o.find(".li_lh"), o.find(".li_lh>ul"), {
			slideWidth : 565,
			slideHeight : 230,
			slideDirection : 1,
			slideSeries:1,
			slides_auto_span : 6000,
			slideButs_bindsj : "mouseover",
			slideButs : o.find(".but"),
			slides_fun : slide.definedfun
		});
	});
});