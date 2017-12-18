/**
 * 会员中心
 * 
 */
define(function(require, exports, module) {
	require("//res.csc86.com/v2/l/bootstrap-tour/css/bootstrap-tour-standalone.css");
	require("//res.csc86.com/v2/l/bootstrap-tour/js/bootstrap-tour-standalone.js");
	var Model = {
		// 新手引导
		intro: function () {
			var tour = new Tour({
			  name: "shopinfo",
			  steps: [
				  {
					element: "#step-1",
					title: "旺铺装修全新改版啦 !",
					content: "轻松装修出您心中的旺铺 , 快速吸引买家 !"
				  }
			   ],
				debug: false,
				backdrop: true,
				template: function (i, step) {
					var html = '<div class="intro-wrap popover">' +
						  '<div class="intro-arrow"></div>' +
						  '<div class="intro-desc">' +
				          '<div class="fs30 fb c-7c2c00 popover-title"></div>' +
						  '<div class="fs26 fb lh_d g-tl g-mt20 popover-content"></div>' +
				          '<div class="g-mt30"><div class="popover-navigation"><a href="javascript:;" title="我知道了" class="intro-btn" data-role="end">我知道了</a></div></div>' +
				          '</div>' +
				          '<div class="intro-fg1"></div>' +
				          '<div class="intro-fg2"></div>' +
					      '</div>';
					
					return html;
				},
				onShown: function ( tour ) {
					var el = $( ".popover" );
					el.css({
						'left': el.position().left + 20,
						'top': el.position().top + 110
					});
				}
			});

			// 初始化
			tour.init();
			// 开始
			tour.start();
		}
	}
	Model.intro();
});