/*
 * jquery,搜索框，占位符placeholder配置
 *
 */

seajs.config({

	// 别名配置
	alias: {
		'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'top': 'm/top-bar/js/init.js',
		//'header': 'm/head-search/js/init.js',
		//'placeholder': 'm/sea-modules/placeholder.js'
	},

	// Sea.js 的基础路径
	base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('jquery');
	require('top');
	//require('header');
	//require('placeholder');
	require('./focusPlay');


	/*
	 * 以下为专题js代码
	 * ......
	 */

	csc.foucsPlay("#src-img", null, 2008);
	var $li = $("#src-img ol>li");
	$("#adv-upload").find("li").on("mouseover", function() {
		$li.eq($(this).index()).trigger("mouseover");
	}).on("mouseout", function() {
		$li.eq($(this).index()).trigger("mouseout");
	});



	//左移动
	$(".maito1 .scr-l1").click(function() {
		left_right(".scr-all1", "1");
	});

	//右移动
	$(".maito1 .scr-r1").click(function() {
		left_right(".scr-all1", "2");
	});

	//轮播
	var timer;
	$('.maito1').mouseenter(function() {
		clearInterval(timer);
	}).mouseleave(function() {
		var $th = $(this);
		timer = setInterval(function() {
			left_right($th, "1");
		}, 3000);
	}).trigger("mouseleave");

	// 展会精品滚动
	(function () {
		var maito2 = $( ".maito2" ),
			root = $(".scr-all2"),
			ul = root.find("ul"),
			prev = $(".maito2").find(".scr-l2"),
			next = $(".maito2").find(".scr-r2"),
			li = ul.children().first(),
			w = li.width() + 5,
			c_len = ul.children().length;
		
		ul.css("width", w * c_len);

		//clone.appendTo(root);
		
		prev.click(function (){
			scroll(1);
		});
		next.click(function (){
			scroll(2);
		});

		var timer = null;

		function setTimer () {
			timer = setInterval(function (){
				scroll(2);
			}, 3000);
		}
		setTimer();
		maito2.hover(function (){
			clearInterval(timer);
		}, function (){
			setTimer();
		});
		
		function scroll ( fx ) {
			if ( fx === 1) { // prev
				ul.animate({
					left: - w * 5
				}, 500, function () {
					ul.children().slice(0, 5).appendTo( ul );
					ul.css("left", 0);
				});
			} else if ( fx === 2) { // next
				var clone = ul.clone();
				clone.appendTo(root);
				clone.css("width", w * c_len);
				clone.css("top", 0);
				clone.css("left", -w * c_len);

				ul.animate({
					left: w * 5
				}, 500, function () {
					ul.children().slice(-5).prependTo( ul );
					ul.css("left", 0);
				});
				clone.animate({
					left: -w * c_len + w * 5
				}, 500, function () {
					clone.remove();
				});
			}
		}
	})();

	//轮播
	var left_right = function(tag, un) {
		var $ul = $(tag).find("ul"),
			$w = $ul.find("li:first").width();
		if (!$ul.is(":animated")) {
			if (un == 1) {
				$ul.animate({
					left: -$w
				}, 300, function() {
					$ul.css({
						left: "0px"
					}).find("li:first").appendTo($ul);
				});
			} else {
				$ul.css({
					left: -$w
				}).find("li:last").prependTo($ul);
				$ul.animate({
					left: 0
				}, 300);
			}
		}
	}

	//底部滚动
	//左移动
		$(".maitob .scr-lb").click(function() {
			left_right(".scr-allb", "1");
		});
	
		//右移动
		$(".maitob .scr-rb").click(function() {
			left_right(".scr-allb", "2");
		});
	
		//轮播
		var timer;
		$('.maitob').mouseenter(function() {
			clearInterval(timer);
		}).mouseleave(function() {
			var $th = $(this);
			timer = setInterval(function() {
				left_right($th, "1");
			}, 3000);
		}).trigger("mouseleave");
	
	

	$(window).scroll(function() {
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if (topscr < 600) {
			$(".fiexd").addClass("fiexd_nav");
		} else {
			$(".fiexd").removeClass("fiexd_nav");
		}
	});
	//图片墙
	var $P = require('./photoWall');
	$P
		.PhotoWall('.img-scroll')
		.tabs('.gtop p', '.group-scroll ul');
});