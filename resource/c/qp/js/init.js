/**
 * 前端模板js文件
 *
 */
define(function(require, exports, module) {
	
	var hover = require("hover");
	var slide = require("slide");
	var tab = require("tab");
	var isIndex = $('.index').length;
	if (isIndex != 0) {
		$.get("//api.csc86.com/notify/notify", function(data) {
			//console.log(data);
			if (data.status == true) {
				$("#dz_user_box").find("div.log-reg").remove().end().prepend('<div class="islog"><ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>' + data.data.purchase + '</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>' + data.data.bank + '</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>' + data.data.message + '</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul></div>');
			}
		}, "jsonp");

		var ie6 = /MSIE.6/.test(navigator.userAgent);

		//分类导航条效果;
		hover(".fl_box", "hover", function(ele) {
			var o = $(ele);
			var l = o.find(".navlist_dl"),
				r = o.find(".list_r"),
				navbox = $(".box_navlist");
			var l_offs = l.offset(),
				l_oH = l.outerHeight(),
				r_oH = r.outerHeight(),
				cH = document.documentElement.clientHeight,
				bs = $(document).scrollTop(),
				csstop = 0;
			if (l_offs.top + l_oH > bs + cH) {
				csstop = l_oH - r_oH;
			} else if (l_offs.top + r_oH > bs + cH) {
				csstop = bs + cH - l_offs.top - r_oH;
			}
			csstop = csstop + l_offs.top > navbox.offset().top ? csstop : navbox.offset().top - l_offs.top;
			r.css("top", csstop + "px");
		});
		tab("#dz_user_box .tab-set li", "#dz_user_box .tab-inner>div", "mouseover", "cur", 0, function(i) {
			$("#tab1 .tab_d1 .text_type1").trigger("gd_stop").eq(i).trigger("gd_play");
		});

		if (ie6) {
			hover(".dz_h_box2 .ul_img2 li", "hover");
			hover("lh_box3 ul.lh3_item li", "hover");
		}
		window.lh1 = new slide("#lh_box .li_lh", "#lh_box .li_lh>li", {
			slideWidth: 540,
			slideHeight: 220,
			slideDirection: 0,
			slides_auto_span: 5000,
			slideSeries: 1,
			slideButs_bindsj: "mouseover",
			slideButs: "#lh_box .but",
			slides_fun: slide.definedfun
		});
		new slide("#lh_box1 .li_lh", "#lh_box1 .li_lh>li", {
			slideWidth: 160,
			slideHeight: 120,
			slideDirection: 2,
			slides_auto_span: 6000,
			slideButs_bindsj: "click",
			slideButs: "#lh_box1 .but",
			slides_fun: function(i) {
				slide.definedfun.call(this, i);
				var url = $(this.slides[i]).find("a").attr("href"),
					txt = $(this.slides[i]).find("a").attr("title");
				$("#lh_box1 .txt").html('<a href="' + url + '" title="' + txt + '" target="_blank">' + txt + '</a>');
			}
		});

		//供求20条记录滚动效果
		$("#tab1 .tab_d1 .text_type1").on("gd_play mouseleave", function() {
			var o = $(this);
			//$(this).attr("gd_scid") = setInterval(function(){
			$(this).attr("gd_scid", setInterval(function() {
				o.find(">li").eq(0).slideUp(500, function() {
					o.find(">li").first().appendTo(o).show();
				})
			}, 2500));
		}).on("gd_stop mouseenter", function() {
			clearInterval($(this).attr("gd_scid"));
		});
		tab("#tab1 .tab_t a", ["#tab1 .more a", "#tab1 .tab_d1"], "mouseover", "s", 0, function(i) {
			$("#tab1 .tab_d1 .text_type1").trigger("gd_stop").eq(i).trigger("gd_play");
		});

		//各楼层幻灯效果
		var lh2s = $(".floors_lhbox"),
			lh2s_1 = $(".lh_box3");
		lh2s.each(function(index, element) {
			var o = $(element);
			new slide(o.find(".li_lh"), o.find(".li_lh>li"), {
				slideWidth: 200,
				slideHeight: 210,
				slideDirection: 0,
				slideSeries: 1,
				slides_auto_span: 5000,
				slideButs_bindsj: "mouseover",
				slideButs: o.find(".but"),
				slides_fun: slide.definedfun
			});
		});
		//展会信息表列效果
		var box3_l3 = $(".box3_l3");
		tab(box3_l3.find(".text_type1 li>a"), box3_l3.find(".text_type1 li>div"), "mouseover");

		//友情链接更多
		var dz_f_links = $(".dz_f_links");
		if (dz_f_links.height() > 26) {
			dz_f_links.addClass("dz_hide").find(".more span").bind("click", function() {
				var $t = $(this),
					$div = $(".dz_f_links");
				if ($t.hasClass("s1")) {
					$t.removeClass("s1");
					$div.addClass("dz_hide");
				} else {
					$t.addClass("s1");
					$div.removeClass("dz_hide");
				}
			});
		}
	}
	var guide = $('.guide').length;
	if (guide != 0) {
		new slide(".J-slide ul", ".J-slide ul>li", {
			slideWidth: 360,
			slideHeight: 250,
			slideDirection: 0,
			slides_xssm: 1,
			slideSeries: 1,
			zantin: true,
			slides_auto_span: 6000,
			slideButs: '.J-slide>ol', //切换按钮容器，样式自定义
			slideButs_html: function(i) {
				return "<li>" + i + "</li>";
			}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
			slideButs_bindsj: "mouseover",
			slideButs_selectclass: "cur",
			slides_controller: '.J-slide>ol',
			slides_fun: slide.definedfun
		});
	}
	var exhibition = $('.exhibition').length;
	if (exhibition != 0) {
		new slide(".J-slide ul", ".J-slide ul>li", {
			slideWidth: 360,
			slideHeight: 220,
			slideDirection: 0,
			slides_xssm: 1,
			slideSeries: 1,
			zantin: true,
			slides_auto_span: 6000,
			slideButs: '.J-slide>ol', //切换按钮容器，样式自定义
			slideButs_html: function(i) {
				return "<li>" + i + "</li>";
			}, //切换按钮html 可以是反回HTML函数，具体参看shenchen_buts;
			slideButs_bindsj: "mouseover",
			slideButs_selectclass: "cur",
			slides_controller: '.J-slide>ol',
			slides_fun: slide.definedfun
		});
		/*tab(".tab-nav li", ".tab-content", "mouseover", "cur")*/
		$('.tab-nav').on('mouseover', 'li', function(e) {
			
			var index = $('.tab-nav').find('li').index(this);
			$(this).addClass('cur').siblings('li').removeClass('cur');
			$('.tab-content').eq(index).show().siblings('.tab-content').hide();
			var $a = $('.tab-nav').siblings('a.more');
			$a.eq(index).addClass('cur').siblings('a.more').removeClass('cur');
		})
	}
	require('m/newtopnav/js/init');
	require('m/head-search/js/init');
	require('m/back-top/js/init');
	$('.g-back').goBack(true);
});