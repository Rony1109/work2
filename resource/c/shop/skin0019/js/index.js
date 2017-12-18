define(function(require, exports, module) {
	var isLoginObj=require('c/shop/skin0019/js/newtop.js');
	
	require('c/shop/skin0019/js/newback-top.js');
	//require('l/jQueryCookie/1.4.1/jquery.cookie.js');//cookie插件
	var isSubmit=false,isxljz=false;
	
	
	var isLogin=isLoginObj.status;//是否登录 true为登录 false为未登
	var memberId=isLoginObj.data.id;//登录的会员id

	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];

	var index={
		
		//图片懒加载
		lazyLoadImg:function(){
			require.async('l/lazyload/1.9.1/jquery.lazyload.js',function(){
				$('img').lazyload({
					failure_limit:100,
					effect : "fadeIn",
					isProga:true
				});
			});
		},
		
		//交易动态
		jydt:function(){
			var This = $('.kblist').find('.dyn_list');
			var $img=This.find('img');
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
				$(obj).animate({
					marginTop : -sHeight+"px"
				},500,function(){
					$(obj).css({marginTop : "0px"}).find("li:lt(2)").appendTo(obj);
				});
			};	
			
			//判断是否登录
			/*
			if (isLogin) {
				if(location.host == 'www.csc86.com') {
					var $url='http://'+location.host+'/default/getUserInfo.html';	
					$.get($url,function(data){
						if(data.status==false)
						{
							return;
						}
						$('.usertp').find('em').find('a').html(data.data.username);
						$('.usertp').find('img').attr('src',data.data.imgUrl);
						$('.spdfk').find('p').html(data.data.unPay); //待付款
						$('.spdfh').find('p').html(data.data.unDeliver); //待发货
						$('.spdsh').find('p').html(data.data.unReceive); //待收货
						//$('.log-wdkbs').hide();
						//$('.log-userkbs').show();
						
					},'json');
				}			
			}else
			{
				$('.log-userkbs').hide();
				$('.log-wdkbs').show();
			}
			*/
		},
		//全部类目
		category:function(){
			var $ctgryBox=$('.category_nav'),//商品分类容器
				$ctgryFrstLi=$ctgryBox.find('.category_box li:not(.first)'),
				$ctgryScnd=$ctgryBox.find('.subctg_bigbox'),
				$ctgryScndBd=$ctgryBox.find('.subctg_box');
			$ctgryFrstLi.on('mouseenter',function(){
				var $this=$(this),
					index=$this.index()-1,
					$bd=$ctgryScndBd.eq(index),
					$img=$bd.find('img');
				triggerEventArry=[];
				triggerEventNum++;
				$this.addClass('hover').siblings().removeClass('hover');
				// $this.hover(function(){
				// 	$this.prev().find("a").css({"border-color":"transparent"});
				// },function(){
				// 	$this.prev().find("a").css({"border-color":"#4b4d4e","border-color":"rgba(255,255,255,.2)"});
				// });
				$bd.show().siblings('.subctg_box').hide();
				$img.each(function(){
					var $this=$(this);
					if (!$this.attr('src')||$this.data('original')) {
						// 图片动态载入
						$this.attr("src", $this.data("original"));	
					}
					$this.removeAttr("data-original");
					if(typeof cscgaMd == 'object') {
						triggerEventArry.push({id: cscgaMd.getUrlFileName($this.parents('a:first').attr('href'))});
					}
				});

				//商品曝光(注意同一个页面不可以出现名字相同的跟踪器)
				if(typeof cscgaMd == 'object') {
					cscgaMd.commodityExposure.noScrollEvent('pc', triggerEventNum, triggerEventArry);
				}
				/*
				$scrll.find('.ctgry-scrll-lst').css('left',0);
				$scrll.find('.ctgry-scrll-trg a').removeClass('cur').eq(0).addClass('cur');
				
				if(api){
					api.click(0);
				}*/
			});
			
			$ctgryBox.on('mouseleave',function(){
				
				$ctgryFrstLi.removeClass('hover');
				$ctgryScndBd.hide();
			});
			//品牌类目遮罩层显示王雪莲
			$('.brandzone').on({
				mouseenter: function() {
					$(this).find('.blackbgab').stop().fadeIn(250);
				},
				mouseleave: function() {
					$(this).find('.blackbgab').stop().fadeOut(200);
				}
			},'li');
		},
		
		//首页轮播和tab切换相关js(此函数只放需要依赖cscSwitch.js插件的相关js)
		indexSwitch:function(){
			require.async('l/cscSwitch/js/cscSwitch.js',function(){
				//banner轮播
				(function(){
					var $slideBox=$('#slideBox'),
						$slidePrev=$slideBox.find('.prev'),
						$slideNext=$slideBox.find('.next'),
						$slideTrg=$slideBox.find('.slide-trg'),
						$li=$slideBox.find('.slide-lst li'),
						len=$li.length;
					if(len>0){
						$slideTrg.cscSwitch($li,{
							trigger:'a',
							currCls:'cur',
							effect:'default',
							nextBtn:$slideNext,
							prevBtn:$slidePrev,
							circular:true,
							beforeSwitch:function(i,n){
								var $img=$li.eq(n).find('img');
								if(n!=0){$li.eq(0).removeClass('hover');}
								if (!$img.attr('src')||$img.data('original')) {
									// 图片动态载入
									$img.attr("src", $img.data("original"));	
								}
								$img.removeAttr("data-original");
							}
						}).autoplay(5);
					}
					if(len>1){
						$slideBox.hover(function(){
							$slidePrev.show();
							$slideNext.show();
						},function(){
							$slidePrev.hide();
							$slideNext.hide();
						});
					}
				})();
				
				//精选热销
				(function(){
					var $jxrxBd=$('.limit_banner'),
						$prev=$jxrxBd.find('.limit_prev'),
						$next=$jxrxBd.find('.limit_next'),
						$li=$jxrxBd.find('li'),
						$img,$otherImg,
						len=$li.length,
						jxrxTriggerNum= 0,
						visible=3;
					if(len>0){
						$jxrxBd.cscSwitch($li,{
							effect:'scroll',
							steps:3,
							visible:visible,
							nextBtn:$next,
							prevBtn:$prev,
							beforeSwitch:function(i,n){
								triggerEventArry=[];
								triggerEventNum++;
								//var $img=$jxrxBd.find('img:gt('+n*visible+'):lt('+(n*visible+visible)+')');
								$img=$jxrxBd.find('img:lt('+(n*visible+visible)+')');
								if(n>0){
									$img=$jxrxBd.find('img:lt('+(n*visible+visible)+'):gt('+(n*visible-1)+')');
								}
								$otherImg=$jxrxBd.find('img').not($img);
								$img.show();
								$img.each(function(){
									var $this=$(this);
									if (!$this.attr('src')||$this.data('original')) {
										// 图片动态载入
										$this.attr("src", $this.data("original"));
									}
									$this.removeAttr("data-original");
									if(typeof cscgaMd == 'object') {
										triggerEventArry.push({id: cscgaMd.getUrlFileName($this.parents('a:first').attr('href'))});
									}
								});
								if(jxrxTriggerNum>0 && typeof cscgaMd == 'object'){
									//商品曝光(注意同一个页面不可以出现名字相同的跟踪器)
									cscgaMd.commodityExposure.noScrollEvent('pc',triggerEventNum,triggerEventArry);
								}
								jxrxTriggerNum++;
							},
							onSwitch:function(i,n){
								$otherImg.hide();
							}
						}).carousel();
					}
					if(len>3){
						$prev.show();
						$next.show();
					}else{
						$prev.hide();
						$next.hide();
					}
					
					$('.mem_ct').hover(function(){	
						$(this).addClass('hover').find('.mem_opt').show();
					},function(){
						$(this).removeClass('hover').find('.mem_opt').hide();
					});
						
				})();
				
				//顶部固定导航
				// (function(){
				// 	var fixnav = $(".top_bar");
				// 	var topnavHeight = $(".top_bar").height();
				// 	$(window).scroll(function(){
				// 		var	scrHeight = $(this).scrollTop();
				// 		(scrHeight>=topnavHeight)?fixnav.addClass('fixnav'):fixnav.removeClass('fixnav');
				// 	});
				// })();
				
				//购物车
				(function(){
				var host = location.host;
				$.post('//'+host+'/default/Buycar',function(data){
					if(data.status==true){
						if(data.data.carNum){
						
								$('.shop_cart').find('.amt').text(data.data.carNum);
								$('.aside_cart').find('em').text(data.data.carNum);
								$('.shop_cart').find('.amt').show();
								if(data.data.carNum == 0){
									$('.shop_cart').find('.amt').remove();
									$('.aside_cart').find('em').remove();
								}
							}else{
							
								$('.shop_cart').find('.amt').remove();
								$('.aside_cart').find('em').remove();
							}
						  }else{
						  		
								$('.shop_cart').find('.amt').remove();
								$('.aside_cart').find('em').remove();
						}
						
					},'jsonp');
					})();
				
			});
		},
		tabs:function(){
			
			var navContainer = $('.nav-container'),
                    navBox = $('.navbox'),
                    navBtn = navContainer.find('ul').find('li'),
                    arrTop = [];
                navBox.each(function(){
                	//console.log($('.ppzqsort').height());
                	//console.log($(this).offset().top);
                    arrTop.push($(this).offset().top-180);
                    
                });

			navBtn.on("click", function(){
                    var $this = $(this),
                        $index = $this.index();
                        $this.addClass('hover').siblings().removeClass('hover');
                    $('html,body').animate({scrollTop: arrTop[$index]}, 500);
                    return false;
                })
		},
		//首页入口函数
		init:function(){
			//$('.aside_tools').goBack(true); //右边侧边栏返回调用的JS
			
			$(".top_search ul li>a").click(function(){
				var This=$(this);
				var len=$('.top_search ul li').length;
				for(var i=0;i<len;i++){
					$('.top_search ul li').eq(i).find('a').removeClass('cur');
				}
				This.addClass('cur');

			})

			
			index.tabs(); //点击滚动指定区域

			index.category(); //全部类目
			
			index.indexSwitch();//首页轮播和tab切换相关js
			
			index.jydt(); //交易动态信息

			index.lazyLoadImg();//图片懒加载

						
		}
	};
	index.init();
});