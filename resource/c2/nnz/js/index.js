define(function(require, exports, module) {
	var common=require('./common.js');

	var index={
		scroll:function(){
			require.async('l/cscSwitch/js/cscSwitch.js',function(){
				//banner轮播
				(function(){
					var $banner=$('.banner'),
						$bannerTrg=$banner.find('.banner-trg'),
						$li=$banner.find('.banner-list li'),
						len=$li.length;
					if(len>0){
						$bannerTrg.cscSwitch($li,{
							trigger:'a',
							currCls:'cur',
							effect:'fade',
							lazyload:true,
							circular:true,
							beforeSwitch:function(i,n){
								var $img=$banner.find('.banner-list img').eq(n);
								if (!$img.attr('src')||$img.data('original')) {
									// 图片动态载入
									$img.attr("src", $img.data("original"));
								}
								$img.removeAttr("data-original");
							}
						}).autoplay(5);
					}
				})();

				//选商家
				//精选推荐滚动
				(function(){
					var $chsesj=$('.chsesj'),
						$chsesjTrg=$('.chsesj-trg'),
						$refresh=$chsesj.siblings('.flr-hd').find('.refresh'),
						$li=$chsesj.find('.chsesj-list .chsesj-itm'),
						len=$li.length;
					if(len>0){
						$chsesjTrg.cscSwitch($li,{
							effect:'scroll',
							steps:5,
							visible:5,
							nextBtn:$refresh,
							onSwitch:function(i,n){
								var $img=$chsesj.find('.chsesj-list img');
								$img.each(function(){
									var $this=$(this);
									if (!$this.attr('src')||$this.data('original')) {
										// 图片动态载入
										$this.attr("src", $this.data("original"));
									}
									$this.removeAttr("data-original");
								});
							}
						}).carousel();
					}
				})();

				//生意圈
				(function(){
					var $syqScroll=$('.syq-scroll'),
						$syqTrg=$syqScroll.find('.syq-trg'),
						$li=$syqScroll.find('.syq-scroll-list li'),
						len=$li.length;
					if(len>0){
						$syqTrg.cscSwitch($li,{
							trigger:'a',
							currCls:'cur',
							effect:'scroll',
							lazyload:true,
							circular:true,
							beforeSwitch:function(i,n){
								var $img=$syqScroll.find('.syq-scroll-list img').eq(n);
								if (!$img.attr('src')||$img.data('original')) {
									// 图片动态载入
									$img.attr("src", $img.data("original"));
								}
								$img.removeAttr("data-original");
							}
						}).autoplay(5);
					}
				})();
			})
		},
		init:function(){
			index.scroll();
			common.lazyload();
		}
	}

	index.init();
});