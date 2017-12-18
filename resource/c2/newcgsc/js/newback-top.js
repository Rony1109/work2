define(function(require, exports, module) {
	$.fn.extend({
		addCss: function() {
			$('body').append('<style>.g-back{position: fixed;_position:absolute;bottom:10px;width:60px;background-image:url(about:blank);background-attachment:fixed;z-index:9999;display:none}' +
				'.g-back-btn{display:block;width:42px;height:42px;overflow:hidden;text-indent:-999px;background:#e94544 url(//res.csc86.com/v2/c2/newcgsc/image/sysy.png) no-repeat 8px -685px;}' +
				'.g-wslm-btn{display:block;width:40px;height:40px;overflow:hidden;text-indent:-999px;background:#fff url(//res.csc86.com/v2/c2/newcgsc/image/sysy.png) no-repeat  10px -638px;}' +
				'.g-code{position: absolute;right: 62px;z-index: 9999;bottom:0;padding: 15px 18px 16px 15px;width: 152px;height: 148px;background: url(//res.csc86.com/v2/m/back-top/img/bg.png) no-repeat;}</style>');
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
						$this[Tpr >0 ? 'show' : 'hide']();
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
				/*resize: function() {//老版的，窗口缩小的时候会导致右侧浮动覆盖到内容上
					var winWh = $window.width();
					var $domWidth = $this.parent().width();
					var domMr = (winWh - $domWidth) / 2 - $this.width() - 12;
					if (rTimer) {
						clearTimeout(rTimer);
					}
					rTimer = setTimeout(function() {
						$this.css({
							'right': domMr > -1 ? 'auto' : 0,
							'marginLeft': domMr > -1 ? $domWidth + 12 : 'auto'
						}).show();
						$window.trigger('scroll');
					}, 100);
				}*/
				resize: function() {//新版的，窗口缩小不能导致右侧浮动覆盖到内容上，即一直让它在右侧
					var winWh = $window.width();
					var $domWidth = $this.parent().width();
					if (rTimer) {
						clearTimeout(rTimer);
					}
					rTimer = setTimeout(function() {
						$this.css({
							'left': '50%',
							'marginLeft': $domWidth/2+10
						}).show();
						$window.trigger('scroll');
					}, 100);
				}
			}).trigger('resize');
			$this.find('.g-back-btn').on('click', function() {
				$window.scrollTop(0);
			});
			$this.find('.scrolltop').on('click', function() {
				$window.scrollTop(0);
			});


			$this.find('.g-wslm-btn').on('mouseenter mouseleave', function(e) {
				$this.find('.g-code')[e.type === 'mouseenter' ? 'show' : 'hide']();
			});

			$this.find('.scrollwx').on('mouseenter mouseleave', function(e) {
				$this.find('.g-code')[e.type === 'mouseenter' ? 'show' : 'hide']();
			});

			$('.scrollzx').hover(function(){
				$(this).css({'color':'#3385ff','text-decoration':'none'});
				$(this).find('img').attr('src','//res.csc86.com/v2/c2/newcgsc/image/sq-2.png');
			},function(){
				$(this).find('img').attr('src','//res.csc86.com/v2/c2/newcgsc/image/sq-12.png');
				$(this).css('color','#818181');
			})

			$('.scrolljhc').hover(function(){
				$(this).css({'color':'#3385ff','text-decoration':'none'});
				$(this).find('img').attr('src','//res.csc86.com/v2/c2/newcgsc/image/sq-1.png');
				$(this).find('em').css('background-image','url(//res.csc86.com/v2/c2/newcgsc/image/sqicon.png)');
			},function(){
				$(this).find('img').attr('src','//res.csc86.com/v2/c2/newcgsc/image/sq-11.png');
				$(this).css('color','#818181');
				$(this).find('em').css('background-image','url(//res.csc86.com/v2/c2/newcgsc/image/sqicon1.png)');
			})

			$('.scrollwx').hover(function(){
				$(this).css({'color':'#3385ff','text-decoration':'none'});
				$(this).find('img').attr('src','//res.csc86.com/v2/c2/newcgsc/image/sq-3.png');
			},function(){
				$(this).find('img').attr('src','//res.csc86.com/v2/c2/newcgsc/image/sq-13.png');
				$(this).css('color','#818181');
			})

			$('.scrolltop').hover(function(){
				$(this).css({'color':'#3385ff','text-decoration':'none'});
				$(this).find('img').attr('src','//res.csc86.com/v2/c2/newcgsc/image/sq-4.png');
			},function(){
				$(this).find('img').attr('src','//res.csc86.com/v2/c2/newcgsc/image/sq-14.png');
				$(this).css('color','#818181');
			})
		}
	});
});