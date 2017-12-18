define(function(require, exports, module) {
	var common=require('./common.js');

	var dfz = {
		index:function(){
			this.carous();
			this.dynamic();
			this.imgcur();
			this.frch();
			this.lcgd();
			var len=$('.lc-bl').length;
			
			for(var i=0;i<len;i++)
			{
				var lilen=$('#lc-bl'+i).find('li').length;
				var crt=5;
				if(lilen>=7)
				{
					$('#lc-bl'+i).find('li:gt(4)').hide();
					$('#lc-bl'+i).find('.swhd').show();
				}
			};
			$('.lc-show').on('click',function(){
				$(this).parents('.lc-lb').find('li:gt(4)').show();
				$(this).hide();
				//var hei=(lilen-5)*$('.lc-lb').find('li').height();
				
				$(this).next().css('display','block');
				return false;
			});
			
			$('.lc-hide').on('click',function(){
				$(this).parents('.lc-lb').find('li:gt(4)').hide();
				$(this).hide();
				$(this).prev().css('display','block');
				return false;
			});
/*			
			$('.rmd-lp').hover(function(){
				$(this).css('border','1px solid #ff7300');
			},function(){
				$(this).css('border','1px solid #ccc');
			});*/
		},
		lcgd:function(){
			var len=$('.gc-txt').length;
			var gcall=$('.gc-all').height();
			for(var i=0;i<len;i++)
			{
				var hts=(gcall-$('.gc-txt').eq(i).height())/2+"px";
				
				$('.gc-txt').eq(i).css('padding-top',hts);
			}
		},
		frch:function(){
			var num=0;
			$('.frchang').on('click',function(){
				//debugger
				num=num+1;
				
				var lenh=$('.gsj-nr').find('li').length; 

				var pagenum=Math.ceil(lenh/5);
				
				if(num==pagenum)
				{
					num=0;
				}
				var frchWidth=$('.gsj-nr').width()-2;
				var new_width = -num * frchWidth;
				$('.gsj-nr').find('ul').stop(true,false).animate({'left' : new_width},300);
				
			})
		},
		/* 首页轮播*/
		carous:function(){
			//轮播相关js
			require.async('l/cscSwitch/js/cscSwitch.js',function(){
				//banner轮播
				(function(){
					var $jsSlideBox=$('.jsSlideBox'),
						$slidePrev=$jsSlideBox.find('.prev'),
						$slideNext=$jsSlideBox.find('.next'),
						$slideTrg=$jsSlideBox.find('.slide-trg'),
						$li=$jsSlideBox.find('.slide-lst li'),
						len=$li.length;
					if(len>0){
						$slideTrg.cscSwitch('.jsSlideBox .slide-lst li',{
							trigger:'a',
							currCls:'cur',
							effect:'fade',
							lazyload:true,
							nextBtn:$slideNext,
							prevBtn:$slidePrev,
							circular:true,
							beforeSwitch:function(i,n){
								var $img=$jsSlideBox.find('.slide-lst img').eq(n);
								if (!$img.attr('src')||$img.data('original')) {
									// 图片动态载入
									$img.attr("src", $img.data("original"));	
								}
								$img.removeAttr("data-original");
							}
						}).autoplay(3);
					}
					if(len>1){
						$jsSlideBox.hover(function(){
							$slidePrev.show();
							$slideNext.show();
						},function(){
							$slidePrev.hide();
							$slideNext.hide();
						});
					}
				})();
			});
			//图片懒加载
			common.lazyload();
		},
		/*交易动态*/
		dynamic:function(){
			
			var This = $('.jy-xx');
			var sHeight =This.find('li').height(),
				Timer;
			$(This).hover(function(){
				clearInterval(Timer);
			},function(){
				Timer=setInterval(function(){
					Tony(This);
				}, 3000)
			}).trigger("mouseleave");
			function Tony(obj){
				$(obj).find('ul').animate({
				marginTop : "-24px"
			},500,function(){
				$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
			});
			};
		},
		imgcur:function()
		{
			require.async('l/cscSwitch/js/cscSwitch.js',function(){
				var $scrllLst=$('#scrllLst1'),
					$scrllLi=$scrllLst.find('li'),
					scrllLen=$scrllLi.length,
					$scrllTrg=$('#scrllTrg1');
				if(scrllLen>0){
					$scrllTrg.cscSwitch($scrllLi,{
						trigger:'li',
						currCls:'cur',
						triggerType:'mouse',
						effect:'scroll',
						speed: .4,
						beforeSwitch:function(i,n){
							var $img=$scrllLi.find('img').eq(n);
							if (!$img.attr('src')||$img.data('original')) {
								// 图片动态载入
								$img.attr("src", $img.data("original"));	
							}
							$img.removeAttr("data-original");
						}
					}).carousel().autoplay(5);
				}
			});
			
			//图片懒加载
			common.lazyload();
		
		},
		/*图文列表页面*/
		picLst:function(){
			common.lazyload();//图片懒加载
		}
		
	}
	module.exports = dfz;		
});