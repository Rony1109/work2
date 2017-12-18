/**
 * 前端模板js文件
 *
 */
seajs.config({
	alias: {
		'top':'m/newtopnav/js/init.js',
		'search': 'm/newsearch/js/init',
		'copyright': 'm/bot-rightcopy/js/init',
		'backTop':'m/back-top/js/init.js'
	}
});
define(function(require, exports, module) {
	require('top');
	require('search');
	require('copyright');
	require('backTop');
	var cookie = require('m/jsM/cookie');

	$('.g-back').addCss().goBack();//返回头部

	//检查是否登录
	$.get("//api.csc86.com/notify/notify",function(data){
		if(data.status==true){
			$(".log-msg").html('<ul class="log-mess"><li><a href="//member.csc86.com/inquiry/list.html" target="_blank">收到的报价(<em>'+data.data.purchase+'</em>)</a><a href="//payment.csc86.com" target="_blank">账户中心(<em>'+data.data.bank+'</em>)</a></li><li><a href="//i.csc86.com/user/message" target="_blank">未读消息(<em>'+data.data.message+'</em>)</a><a href="//member.csc86.com/" target="_blank">进入会员中心</a></li><li class="push"><a href="//member.csc86.com/" target="_blank">发布供求</a></li></ul>');
		}
	},"jsonp");
	
	//防伪提示
	/*$('.top_bar').after('<div class="g-w g-pr fp-tip-box"><span class="close">&times;</span>近日，我公司获悉，有一名为<span class="g-cblue">交易网（网址：http://f2db024k.zjkmechanic.cn:81/）</span>在互联网上冒用华南城网名义开展经营活动，误导公众，并已给部分客户造成损失。为保护广大客户的利益，我司郑重声明，交易网非我公司开展的业务，与我公司无任何关联性。请广大客户提高警惕，谨防受骗。必要时可向有关部门举报，切实维护自身权益。</div>');
	$('.fp-tip-box').on('click','.close',function(){
		$('.fp-tip-box').remove();
		return false;
	});*/

	//头部广告
	function headBan(){
		$("#bannerAll").css("display", "block");
		$(".min-banner").css("display", "none");
		var stime = setTimeout(function() {
			$(".max-banner").slideUp("slow", function() {
				$(".min-banner").show();
			});
		}, 5000);
		$(".min-banner span").click(function() {
			$(this).closest(".g-w").css("display", "none");
		});
		if ($(".min-banner a").length < 1) {
			$(".min-banner").find("span").remove();
		}
		if ($(".max-banner a").length < 1) {
			$(".max-banner").find("span").remove();
		}
	}

	//电商产业园切换
	$(".tab_tit li").hover(function() {
		$th = $(this).index();
		$(".tab_tit li").removeClass("hover");
		$(this).addClass("hover");
		$(".tab_con .tab_item").removeClass("cur");
		$(".tab_con .tab_item").eq($th).addClass("cur");
	});

	//新产地切换
	var $starMenu = $(".star_menu"),
		$tabStar = $(".tab_star");
	$starMenu.each(function(index) {
		$(this).on("click", function() {
			$tabStar.removeClass("starShow");
			$tabStar.eq(index).addClass("starShow");
			$starMenu.find("span").hide();
			$(this).addClass("cur_star").siblings().removeClass("cur_star");
			$(this).find("span").show();
		})

		$(this).hover(function() {
			if (!$(this).hasClass("cur_star")) {
				$(this).find("span").show();
			}
		}, function() {
			if (!$(this).hasClass("cur_star")) {
				$(this).find("span").hide();
			}
		});

	});

	/*幻灯片*/
	function Slide(opt) {
		this.prev = opt.prev,
			this.next = opt.next,
			this.slideLi = opt.slideLi,
			//this.alist=opt.alist,
			this.index = 0,
			this.slide = opt.slide,
			this.len = this.slideLi.length,
			this.apoint = opt.apoint,
			this.timer,
			this.alist;
		if (this.len > 1) {
			this.init();
		} else {
			(this.len == 1) && (this.slideLi[0].style.display = "block");
			this.prev.parentNode.removeChild(this.prev),
				this.next.parentNode.removeChild(this.next);
		}
	}
	Slide.prototype = {
		constructor: Slide,
		load: function(elem, src) {
			var img = new Image();
			img.onload = function() {
				elem.src = src;
				elem.style.backgroundImage = "none";
				elem.removeAttribute("data-src");
			}
			img.src = src;
		},
		slideAuto: function() {
			var len = this.len;
			this.slideLi[this.index].style.display = "none";
			this.alist[this.index].className = "slide_icon";
			this.index < len - 1 ? this.index++ : this.index = 0;
			this.slideLi[this.index].style.display = "block";
			this.alist[this.index].className = "slide_icon active";
		},
		timerSlide: function() {
			var _this = this;
			this.timer = setInterval(function() {
				_this.slideAuto();
			}, 3000);
		},
		getIndex: function(elem, arr) {
			var index;
			for (var i = 0, len = arr.length; i < len; i++) {
				if (elem == arr[i]) {
					index = i;
				}
			}
			return index;
		},
		point: function(len) {
			var arr = [];
			for (var i = 0; i < len; i++) {
				if (i == 0) {
					arr[i] = '<a href="javascript:;" class="slide_icon active"></a>';
				} else {
					arr[i] = '<a href="javascript:;" class="slide_icon"></a>';
				}
			}
			this.apoint.innerHTML = arr.join('');
			this.alist = this.apoint.children;
		},
		init: function() {
			var _this = this;
			this.point(_this.len);
			this.timerSlide();
			/*next上一个*/
			this.prev.onclick = function() {
				clearInterval(_this.timer);
				var len = _this.len;
				_this.slideLi[_this.index].style.display = "none";
				_this.alist[_this.index].className = "slide_icon";
				_this.index > 0 ? _this.index-- : _this.index = _this.len-1;
				_this.slideLi[_this.index].style.display = "block";
				_this.alist[_this.index].className = "slide_icon active";
				_this.timerSlide();
			}
			/*next下一个*/
			this.next.onclick = function() {
				clearInterval(_this.timer);
				var len = _this.len;
				_this.slideLi[_this.index].style.display = "none";
				_this.alist[_this.index].className = "slide_icon";
				_this.index < len - 1 ? _this.index++ : _this.index = 0;
				_this.slideLi[_this.index].style.display = "block";
				_this.alist[_this.index].className = "slide_icon active";
				_this.timerSlide();
			}
			for (var i = 0, len = this.alist.length; i < len; i++) {
				this.alist[i].onmouseover = function() {
					clearInterval(_this.timer);
					/*先隐藏当前*/
					_this.slideLi[_this.index].style.display = "none";
					_this.alist[_this.index].className = "slide_icon";

					var index = _this.getIndex(this, _this.alist);
					_this.slideLi[index].style.display = "block";
					_this.alist[index].className = "slide_icon active";
					_this.index = index;
				}
				this.alist[i].onmouseout = function() {
					_this.timerSlide();
				}
			}
		}
	}

	var slide = new Slide({
		prev: document.getElementById("prev"),
		next: document.getElementById("next"),
		slide: document.getElementById("slide"),
		slideLi: document.getElementById("slide").getElementsByTagName("li"),
		apoint: document.getElementById("apoint")
	})

	//滚动
	require('./scroll');
	var tm;
	$(".scrolling").CscScroll({
		Left: 260,
		Right: 130,
		Time: 2000,
		linedUp: tm,
		Auto: true,
		Visual: 5
	});

	//采购商还是供应商切换
	var list = $(".register_user_menu").find("li"),
		tarde = $(".tab_tarde");
	list.each(function(index) {
		$(this).on("click", function() {
			$(this).addClass("cur_reg_menu").siblings().removeClass("cur_reg_menu");
			tarde.hide();
			tarde.eq(index).show();
		})
	})

	//内容轮播
	function SlideWarp(opt) {
		this.slideLi = opt.slideLi,
			this.slideLista = opt.slideLista,
			this.len = opt.len,
			this.index = 0,
			this.init();
	}
	SlideWarp.prototype = {
		slideAuto: function() {
			var self = this,
				len = this.len,
				slideLi = this.slideLi,
				slideLista = this.slideLista;
			this.timer = setInterval(function() {
				self.index < len - 1 ? self.index++ : self.index = 0;
				slideLi.eq(self.index).addClass("cur_slide_warp").siblings().removeClass("cur_slide_warp");
				slideLista.find("i").eq(self.index).addClass("cur_fiber_sli").siblings().removeClass("cur_fiber_sli");
			}, 2000)

		},
		init: function() {
			var self = this,
				slideLi = this.slideLi,
				slideLista = this.slideLista,
				len = this.len;
			//self.slideAuto();
			if (len > 1) {
				slideLista.show();
				slideLista.find("i").hover(function() {
						clearInterval(self.timer);
						slideLi.eq($(this).index()).addClass("cur_slide_warp").siblings().removeClass("cur_slide_warp");
						$(this).addClass("cur_fiber_sli").siblings().removeClass("cur_fiber_sli");
						self.index = $(this).index();
					}
					/*,function(){
										self.slideAuto();
									}*/
				);
			}
			/*slideLi.hover(function(){
				clearInterval(self.timer);
			},function(){
				self.slideAuto();
			})*/
		}
	}
	var fiber = $(".fiber_lf3"),
		slidew = [];
	for (var i = 0, len = fiber.length; i < len; i++) {
		slidew[i] = new SlideWarp({
			slideLi: fiber.eq(i).find(".slide_warp"),
			slideLista: fiber.eq(i).find(".fiber_slide"),
			len: fiber.eq(i).find(".slide_warp").length
		})
	}
	
	//在线交易引导页
	/*var $zxjyNav=$('#zxjyNav');
	var guideZxjy=function(){
		var top=$zxjyNav.offset().top;
		var left=$zxjyNav.offset().left;
		if(!cookie.get('guideZxjy')){
			$('body').append('<div class="guide-zxjy">'+
				'<div class="bg"></div>'+
				'<p class="step step0">'+
					'<a class="close" href="">关闭</a>'+
					'<a class="next" href="">下一步</a>'+
				'</p>'+
			'</div>');
			var $guideZxjy=$('.guide-zxjy');
			var $step=$guideZxjy.find('.step');
			var step=0;
			
			$step.css('top',top);
			
			//关闭引导页
			$guideZxjy.on('click','.close',function(){
				$guideZxjy.remove();
				headBan();
				return false;
			});
			
			//下一步
			$guideZxjy.on('click','.next',function(){
				step++;
				if(step===1){
					$step.removeClass('step0').addClass('step1').css('left',left).html('<a class="close" href="">关闭</a><a class="next" href="">下一步</a><a class="open" href="//www.csc86.com/purchase/" target="_blank">开启新体验</a>');
				}
				if(step===2){
					$step.removeClass('step1').addClass('step2').css('left','50%').html('<a class="close" href="">关闭</a><a class="go" href="//cncms.csc86.com/special/2015/zxjy" target="_blank">立即去了解</a>');
				}
				return false;
			});
			
			cookie.set('guideZxjy', true, 30 * 24 * 60);
			
		}else{
			headBan();
		}
	};
	if($zxjyNav[0]){
		guideZxjy();	
	}else{
		headBan();
	}*/
	
	headBan();
	
});