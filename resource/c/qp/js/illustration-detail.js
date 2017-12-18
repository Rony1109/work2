define(function(require, exports, module) {
	var tabs = require('tab');
	tabs($(".rank-list ul li"), $(".rank-list ol"), 'mouseover', 'cur');
	require('m/newtopnav/js/init');
	require('m/head-search/js/init');
	require('m/back-top/js/init');
	require('./photo-wall');
	$('.detail-box').photoWall({
		ScrollWidth: 145,
		Visual: 5
	});
	$('.g-back').goBack(true);
	$(function() {
		$('.photo-show').find('img').each(function() {
			DrawImage(this, 700, 450);
			var TP = (450 - $(this).height()) / 2;
			this.style.cssText = "margin-top:" + TP + "px";
		});
		var ie6 = /MSIE.6/.test(navigator.userAgent);
		if (ie6) {
			$('.pic-show-small').find('img').each(function() {
				DrawImage(this, 120, 70);
			});
		}
	})
	function DrawImage(ImgD, iwidth, iheight) {
		//参数(图片,允许的宽度,允许的高度)    
		var image = new Image();
		image.src = ImgD.src;
		if (image.width > 0 && image.height > 0) {
			if (image.width / image.height >= iwidth / iheight) {
				if (image.width > iwidth) {
					ImgD.width = iwidth;
					ImgD.height = (image.height * iwidth) / image.width;
				} else {
					ImgD.width = image.width;
					ImgD.height = image.height;
				}
			} else {
				if (image.height > iheight) {
					ImgD.height = iheight;
					ImgD.width = (image.width * iheight) / image.height;
				} else {
					ImgD.width = image.width;
					ImgD.height = image.height;
				}
			}
		}
	}

})