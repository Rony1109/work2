define(function(require, exports, module) {
	$.fn.extend({
		addCss: function() {
			$('body').append('<style>.g-back{position: fixed;_position:absolute;bottom:10px;width:60px;background-image:url(about:blank);background-attachment:fixed;z-index:9999}' +
				'.g-back-btn{display:block;width:48px;height:48px;overflow:hidden;text-indent:-999px;background:#e94544 url(//res.csc86.com/v2/m/back-top/img/icon.png) no-repeat 12px 18px;_background:#e94544 url(//res.csc86.com/v2/m/back-top/img/icon-ie6.png) no-repeat 12px 18px;}' +
				'.g-wslm-btn{display:block;width:48px;height:48px;overflow:hidden;text-indent:-999px;background:#636363 url(//res.csc86.com/v2/m/back-top/img/icon.png) no-repeat 14px -60px;_background:#636363 url(//res.csc86.com/v2/m/back-top/img/icon-ie6.png) no-repeat 14px -60px;}' +
				'.g-code{position: absolute;right: 62px;z-index: 9999;bottom:0;padding: 15px 18px 16px 15px;width: 152px;height: 148px;background: url(//res.csc86.com/v2/m/back-top/img/bg.png) no-repeat;_background: url(//res.csc86.com/v2/m/back-top/img/bg-ie6.png) no-repeat;}</style>');
			return this;
		},
		goBack: function(hide) {
			var sTimer = null;
			var rTimer = null;
			var $this = $(this);
			var ie6 = /MSIE.6/.test(navigator.userAgent);
			var $window = $(window);
			var $document = $(document);
			var num = parseInt($this.css('bottom'), 10);
			var maxTop = $document.height() - $this.height() - num;
			$window.on({
				scroll: function() {
					var Ht = $window.height() - $this.height() - num;
					var Tpr = $document.scrollTop();
					if (hide) {
						$this[Tpr > 200 ? 'show' : 'hide']();
					}
					if (sTimer) {
						clearTimeout(sTimer);
					}
					if (ie6) {
						sTimer = setTimeout(function() {
							$this.stop(true).animate({
								'top': Math.min(maxTop, Tpr + Ht)
							}, 'fast');
						}, 100);
					}
				},
				resize: function() {
					var winWh = $window.width();
					var $domWidth = $this.parent().width();
					var domMr = (winWh - $domWidth) / 2 - $this.width() - 12;
					if (rTimer) {
						clearTimeout(rTimer);
					}
					rTimer = setTimeout(function() {
						if(domMr > -1)
						{
							$('.g-back').css({'right':'auto','marginLeft':$domWidth + 12,'display':'block'});
						}else
						{
							$('.g-back').css('display','none');
						}
						/*$this.css({
							'right': domMr > -1 ? 'auto' : 0,
							'marginLeft': domMr > -1 ? $domWidth + 12 : 'auto',
						}).show();*/
						
						$window.trigger('scroll');
					}, 100);
				}
			}).trigger('resize');
			$this.find('.g-back-btn').on('click', function() {
				$window.scrollTop(0);
			});
			$this.find('.g-wslm-btn').on('mouseenter mouseleave', function(e) {
				$this.find('.g-code')[e.type === 'mouseenter' ? 'show' : 'hide']();
			});
		}
	});
});