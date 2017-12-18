define(function(require, exports, module) {
	var partMasker = require('./partMasker'),
		cookie = require('m/jsM/cookie'),
		wrap = $('<div>');
	if (cookie.get('uc2-intro') === 'intro' && location.href.indexOf('?intro') === -1) {
		return;
	}
	cookie.set('uc2-intro', 'intro', 60*24*365*18);

	$(document.body).append(wrap);

	(function intro (step) {
		wrap.empty();

		var root = $('<div>');
		root.css({
			position: 'absolute',
			zIndex: 101
		});
		$(window).scrollTop(0);

		switch (step) {
			case 1:
				var step1 = root.clone(true);
				var next = $('<a href="javascript:;" class="intro-btn intro-btn-1">');
				var close = $('<a href="javascript:;" class="intro-btn intro-btn-close">');
				var m = new partMasker();
				step1.css({
					background: 'url(//res.csc86.com/v2/c2/uc/css/img/intro/1.png)',
					width: 649,
					height: 538,
					left: ($(window).width() - 649) / 2,
					top: ($(window).height() - 538) / 2
				});
				step1.append(next).append(close);
				wrap.append(step1);
				next.click(function(event) {
					m.remove();
					intro(2);
				});
				close.click(function(event) {
					m.remove();
					wrap.empty();
				});
				break;
			case 2:
				var step1 = root.clone(true);
				var prev = $('<a href="javascript:;" class="intro-btn intro-btn-2">');
				var next = $('<a href="javascript:;" class="intro-btn intro-btn-3">');
				var close = $('<a href="javascript:;" class="intro-btn intro-btn-close intro-btn-close-2">');
				var m = new partMasker($('.navbar'));
				step1.css({
					background: 'url(//res.csc86.com/v2/c2/uc/css/img/intro/2.png)',
					width: 623,
					height: 582,
					left: ($(window).width() - 649) / 2 + 68,
					top: 82
				});
				step1.append(next).append(prev).append(close);
				wrap.append(step1);
				next.click(function(event) {
					m.remove();
					intro(3);
				});
				prev.click(function(event) {
					m.remove();
					intro(1);
				});
				close.click(function(event) {
					m.remove();
					wrap.empty();
				});
				break;
			case 3:
				var step1 = root.clone(true);
				var next = $('<a href="javascript:;" class="intro-btn intro-btn-4">');
				var prev = $('<a href="javascript:;" class="intro-btn intro-btn-5">');
				var close = $('<a href="javascript:;" class="intro-btn intro-btn-close">');
				var m = new partMasker($('.usr'));
				step1.css({
					background: 'url(//res.csc86.com/v2/c2/uc/css/img/intro/3.png)',
					width: 756,
					height: 538,
					left: ($(window).width() - 649) / 2 - 69,
					top: 82
				});
				step1.append(next).append(prev).append(close);
				wrap.append(step1);
				next.click(function(event) {
					m.remove();
					intro(4);
				});
				prev.click(function(event) {
					m.remove();
					intro(2);
				});
				close.click(function(event) {
					m.remove();
					wrap.empty();
				});
				break;
			case 4:
				$(window).scrollTop(200);

				var step1 = root.clone(true);
				var prev = $('<a href="javascript:;" class="intro-btn intro-btn-6">');
				var next = $('<a href="javascript:;" class="intro-btn intro-btn-7">');
				var close = $('<a href="javascript:;" class="intro-btn intro-btn-close">');
				var m = new partMasker($('.leftmenu'));
				step1.css({
					background: 'url(//res.csc86.com/v2/c2/uc/css/img/intro/4.png)',
					width: 749,
					height: 539,
					left: ($(window).width() - 649) / 2 - 69,
					top: 82 + 200
				});
				step1.append(next).append(prev).append(close);
				wrap.append(step1);
				next.click(function(event) {
					m.remove();
					intro(5);
				});
				prev.click(function(event) {
					m.remove();
					intro(3);
				});
				close.click(function(event) {
					m.remove();
					wrap.empty();
				});
				break;
			case 5:
				$(window).scrollTop(100);
				var role = 0;
				$('#navmenu').children().each(function(index, el) {
					if (el.className.indexOf('hover') > 0) {
						role = index;
						return false;
					}
				});
				var step1 = root.clone(true);
				var prev = $('<a href="javascript:;" class="intro-btn">');
				var next = $('<a href="javascript:;" class="intro-btn">');
				var close = $('<a href="javascript:;" class="intro-btn intro-btn-close">');
				var m = new partMasker($('#companyInfo'));
				if (role === 0) {
					step1.css({
						background: 'url(//res.csc86.com/v2/c2/uc/css/img/intro/51.png)',
						width: 529,
						height: 585,
						left: ($(window).width() - 649) / 2 + 190,
						top: 174
					});
					prev.css('left', 100);
					next.css('left', 255);
					close.addClass('intro-btn-close-2');
				} else {
					step1.css({
						background: 'url(//res.csc86.com/v2/c2/uc/css/img/intro/52.png)',
						width: 657,
						height: 553,
						left: ($(window).width() - 649) / 2 + 20,
						top: 267
					});
					prev.css('left', 228);
					next.css('left', 383);
					close.css('top', 10);
				}
				step1.append(next).append(prev).append(close);
				wrap.append(step1);
				next.click(function(event) {
					m.remove();
					intro(6);
				});
				prev.click(function(event) {
					m.remove();
					intro(4);
				});
				close.click(function(event) {
					m.remove();
					wrap.empty();
				});
				break;
			case 6:
				$(window).scrollTop(100);
				var step1 = root.clone(true);
				var prev = $('<a href="javascript:;" class="intro-btn">');
				var next = $('<a href="javascript:;" class="intro-btn">');
				var close = $('<a href="javascript:;" class="intro-btn intro-btn-close">');
				var m = new partMasker({
					l: $('#companyInfo').offset().left,
					t: $('#companyInfo').offset().top + $('#companyInfo').outerHeight() + 27,
					w: 160,
					h: 40
				}, {
					l: 0,
					t: 0,
					r: $(document).width(),
					b: $('#ordertab').offset().top
				});
				var m2 = new partMasker({
					l: $('#companyInfo').offset().left,
					t: $('#mybuyer').offset().top + 20,
					w: 160,
					h: 40
				}, {
					l: 0,
					t: $('#ordertab').offset().top,
					r: $(document).width(),
					b: $(document).height()
				});

				step1.css({
					background: 'url(//res.csc86.com/v2/c2/uc/css/img/intro/6.png)',
					width: 691,
					height: 538,
					left: ($(window).width() - 649) / 2,
					top: $('#ordertab').offset().top -130
				});
				prev.css('left', 262);
				next.css('left', 416);
				step1.append(next).append(prev).append(close);
				wrap.append(step1);
				next.click(function(event) {
					m.remove();
					m2.remove();
					wrap.empty();
				});
				prev.click(function(event) {
					m.remove();
					m2.remove();
					intro(5);
				});
				close.click(function(event) {
					m.remove();
					m2.remove();
					wrap.empty();
				});
				break;
		}
	}(1));
});