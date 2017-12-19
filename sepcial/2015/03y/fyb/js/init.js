define(function(require) {
	var dbs = {
		"sc-main-bg": {
			xin: {
				right: 383,
				top: 113
			},
			chun: {
				left: 593,
				top: 189
			},
			zhan: {
				right: 535,
				top: 307
			},
			hong: {
				left: 452,
				top: 343
			},
			tu: {
				right: 263,
				top: 342
			},
			year: {
				left: 306,
				top: 162
			},
			yin: {
				right: 460,
				top: 95
			},
			xiang: {
				left: 470,
				top: 200
			},
			cui: {
				right: 445,
				top: 95
			},
			can: {
				left: 500,
				top: 320
			}
		},
		"survey-inner": {
			stimg1: {
				left: 0,
				top: 145
			},
			st1: {
				left: 300,
				top: 140
			},
			st2: {
				left: 300,
				top: 200
			},
			st3: {
				left: 300,
				top: 235
			},
			st4: {
				left: 300,
				top: 270
			},
			st5: {
				right: 310,
				top: 377
			},
			st6: {
				right: 310,
				top: 440
			},
			st7: {
				right: 310,
				top: 475
			},
			st8: {
				right: 310,
				top: 505
			},
			stimg2: {
				right: 0,
				top: 340
			},
			stimg3: {
				right: 0,
				top: 555
			},
			st9: {
				right: 325,
				top: 575
			},
			st10: {
				right: 325,
				top: 615
			},
			st11: {
				right: 325,
				top: 660
			},
			st12: {
				right: 325,
				top: 685
			}
		},
		"spining-inner": {
			stimg1: {
				left: 31,
				top: 133
			},
			st1: {
				left: 384,
				top: 154
			},
			st2: {
				left: 384,
				top: 213
			},
			st3: {
				left: 384,
				top: 248
			},
			st4: {
				left: 384,
				top: 305
			},
			st5: {
				left: 384,
				top: 335
			},
			st6: {
				right: 245,
				top: 380
			},
			st7: {
				right: 245,
				top: 420
			},
			st8: {
				right: 245,
				top: 455
			},
			st9: {
				left: 310,
				top: 586
			},
			st10: {
				left: 310,
				top: 626
			},
			stimg2: {
				left: 0,
				top: 258
			},
			stimg3: {
				right: -56,
				top: 345
			},
			stimg4: {
				left: -47,
				top: 523
			},
			st11: {
				left: 310,
				top: 656
			},
			st12: {
				left: 765,
				top: 640
			}
		},
		"ec-inner": {
			stimg1: {
				right: 0,
				top: 145
			},
			st1: {
				left: 0,
				top: 140
			},
			st2: {
				left: 0,
				top: 200
			},
			st3: {
				left: 0,
				top: 235
			},
			st4: {
				left: 0,
				top: 270
			},
			st5: {
				right: 310,
				top: 333
			},
			st6: {
				right: 260,
				top: 387
			},
			st7: {
				right: 260,
				top: 458
			},
			st8: {
				right: 260,
				top: 427
			},
			stimg2: {
				right: 0,
				top: 340
			},
			stimg3: {
				left: 0,
				top: 555
			},
			st9: {
				left: 262,
				top: 572
			},
			st10: {
				left: 262,
				top: 611
			},
			st11: {
				left: 262,
				top: 641
			},
			st12: {
				left: 262,
				top: 685
			},
			stimg4: {
				right: 0,
				top: 555
			}
		},
		"pic-inner": {
			stimg1: {
				left: 0,
				top: 145
			},
			stimg2: {
				left: 0,
				top: 304
			},
			stimg3: {
				left: 403,
				top: 145
			},
			stimg4: {
				left: 624,
				top: 145
			},
			stimg5: {
				left: 624,
				top: 358
			},
			stimg6: {
				left: 0,
				top: 497
			},
			stimg7: {
				left: 512,
				top: 497
			}
		}
	};

	require('./jquery.easing');
	$(function() {
		$("html").css("overflow", "hidden");
		$('.slogen').fadeIn(1800);
		for (var z in dbs) {
			+ function() {
				var k = z;
				$("." + k).on("yc", function() {
					var dbsn = dbs[k];
					var fdiv = $(this);
					for (var i in dbsn) {
						var xx = dbsn[i];
						var cssatt = typeof(xx.left) == "undefined" ? "right" : "left";
						fdiv.find("." + i).css(cssatt, (parseInt(Math.random() * 1000)) % 2 != 0 ? "-2000px" : "2000px");
					}
				}).on("xs", function() {
					var dbsn = dbs[k];
					var fdiv = $(this);
					for (var i in dbsn) {
						fdiv.find("." + i).animate(dbsn[i], 1800, 'easeInOutQuint');
					}

				}).on("go", function() {
					var o = $(this);
					$(this).trigger("yc").trigger("xs");
					var numb = o.offset().top;
					var cur_div = o.attr('class').slice(0, o.attr('class').lastIndexOf(' '));
					//if($(this))
					if (numb == 0) {
						$('li[data-divname]:first').addClass('cur ' + $('li[data-divname]:first').attr('data-class')).siblings('li[data-divname]').attr('class', '').parent().prev('span').attr('class', 'navimg _' + $('li[data-divname]:first').attr('data-class'));
					} else {
						$('li[data-divname=' + cur_div + ']').addClass('cur ' + $('li[data-divname=' + cur_div + ']').attr('data-class')).siblings('li[data-divname]').attr('class', '').parent().prev('span').attr('class', 'navimg _' + $('li[data-divname=' + cur_div + ']').attr('data-class'));
					}
					$('html,body').stop(false).animate({
						scrollTop: numb
					}, 1000, function() {

					});
					thisdiv = o;
				});
			}();
			/*
						$(".link").on("go",function(){
							var o = $(this);
							var numb = o.offset().top;
							$('html,body').stop(false).animate({
								scrollTop: numb
							});
						});*/

			$("li[data-divname]").on("click", function() {
				$("." + $(this).attr("data-divname")).trigger("go");
				$(this).addClass('cur ' + $(this).attr('data-class')).siblings('li[data-divname]').attr('class', '');
				$(this).parent().prev('span').attr('class', 'navimg _' + $(this).attr('data-class'));
			})

		}

		$(".sc-main-bg").trigger("yc").trigger("xs").off("xs").off("yc");
	});

	var mark1 = false,
		thisdiv = $(".sc-main-bg"),
		xc = 0;
	$('body').on('mousewheel', function(e) {
		if (!xc) {
			setTimeout(function() {
				mark1 = false;
				xc = 0
			}, 1500);
		}
		var ev = e.originalEvent || e;
		var delta = ev.wheelDelta ? (ev.wheelDelta / 120) : (-ev.detail / 3);
		if (mark1) return false;
		mark1 = true;
		if (delta < 0) {
			var o_div = thisdiv.parent().next().find(".g-o-a");
			if (o_div.length > 0) {
				//o_div.trigger("yc").trigger("xs");
				o_div.trigger("go");
			} else {
				$('html,body').stop(false).animate({
					scrollTop: document.documentElement.offsetHeight - document.documentElement.clientHeight
				});
			}
		} else {
			var o_div = thisdiv.parent().prev().find(".g-o-a");
			if (o_div.length > 0) {
				//o_div.trigger("yc").trigger("xs");
				o_div.trigger("go");
			}
		}
		return false;
	});

	//if(!$.browser.msie){
	$('.survey-inner a.stitem,.spining-inner a.stitem,.ec-inner a.stitem,.pige-inner a.stitem').on({
		mouseenter: function() {
			$(this).find('em').animate({
				opacity: .8
			}, 100);
		},
		mouseleave: function() {
			$(this).find('em').animate({
				opacity: 1
			}, 100);
		}
	});
	//}

	$('.pic-inner a.stitem').on({
		mouseenter: function() {
			$(this).find('.mask,.info').stop(false, true).fadeIn(800);
		},
		mouseleave: function() {
			$(this).find('.mask,.info').stop(false, true).fadeOut(800);
		}
	});

	// 获取当前在哪一屏
	var as = [];
	$.each(dbs, function(i, v) {
		as.push("." + i);
	});

	$(function() {
		var showscroll = function() {
			var top_ = $(document).scrollTop(),
				ids = "";
			for (var i = as.length; i--;) {
				if (top_ >= $(as[i]).offset().top) {
					ids = $(as[i]);
					break;
				};
			};
			ids.trigger("go");
		};
		window.onload = showscroll;
	})

});