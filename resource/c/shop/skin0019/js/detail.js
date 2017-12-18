define(function(require, exports, module){
	var $wpCmmn=require('wpCmmn');
	var isLoginObj=require('c/shop/skin0019/js/newtop.js');
	var isLogin=isLoginObj.status;//是否登录 true为登录 false为未登
	var memberId=isLoginObj.data.id;//登录的会员id
	require('//res.csc86.com/js/m/config.js');
	var $dialog=require('dialog');
	var loginJs=require('c2/ucenter/js/login.js');//获取登录相关js(弹窗和非弹窗)
	
	var isSubmit=false;

	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];

	var Wp={

		//顶部固定导航
		topNav:function(){
				var fixnav = $(".top_bar");
				var topnavHeight = $(".top_bar").height();
				$(window).scroll(function(){
					var	scrHeight = $(this).scrollTop();
					(scrHeight>=topnavHeight)?fixnav.addClass('fixnav'):fixnav.removeClass('fixnav');
				});
			},

		/*收藏*/
		favorite:function(obj,id,type){
			var type=type||"product";
			var favFun=function(){
				//csc.signDialogClose();
				var url=csc.url("api","/favorites/savefor"+(type=="product"?"goods":"shop") +".html"),
					data=type=="product"?{gid:id}:{memberid:id},
					mdObj=type=="product"?{prid:id}:{shopId:id};
					
				if(isSubmit===true){
					return false;
				}
				isSubmit=true;
				$.get(url,data,function(data){
					if(data.status || data.msg.indexOf("收藏过")>-1){
						triggerEventNum++;
						triggerEventArry=[];
						triggerEventArry.push(mdObj);

						if(typeof cscgaMd == 'object'){
							cscgaMd.favSuc('pc',triggerEventNum,triggerEventArry[0]);
						}
						if(type=="product"){
							$dialog.tip('<strong>产品收藏成功！</strong><br/><a href="'+csc.url("i")+'/user/favoriteList?catId=48032572-cbf4-11e2-abef-52540087237d" target="_blank">查看收藏夹>></a>',3);
						}else{
							$dialog.tip('<strong>旺铺收藏成功！</strong><br/><a href="'+csc.url("i")+'/user/favoriteList?catId=5cce42ac-cbf4-11e2-abef-52540087237d" target="_blank">查看收藏夹>></a>',3);
						}
						obj.addClass('favorited');
						if(type=="product"){
							if($('.sub-prodtl')[0]){//详情页收藏商品
								obj.html('该商品已收藏');
							}else{
								obj.html('<i></i>已收藏');
							}
						}else{
							obj.html('旺铺已收藏');
						}
					}else{
						$dialog.tip(data.msg);
					}
					isSubmit=false;
				},"jsonp");
			}
			if(obj.hasClass('favorited')){
				return false;
			}

			if (isLogin != true) {
				location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
				return false;
			}else{
				favFun();
			}
			/*require.async('c/shop/skin0019/js/sign.js',function(){
				csc.checkSign(;
			});*/
		},
		
	
		
		/*点击收藏商品*/
		favPro:function(){
			$('.jsFavPro').on('click',function(){
				var _this=$(this);
				var _id=_this.data('id');
				Wp.favorite(_this,_id);
				return false;
			});
		},
		
		/*首页和产品中心右侧商品列表wppro-lst*/
		wpproLst:function(){
			$('.jsWpproLst').on('mouseenter','li',function(){
				$(this).addClass('hover');
			}).on('mouseleave','li',function(){
				$(this).removeClass('hover');
			});
		},
		
		
		/*左侧产品列表*/
		
		sHotproLst:function(){
			$('.jsSHotProLst li .pic').hover(function(){
				var _li=$(this).parent();
				_li.addClass('hover');
			},function(){
				var _li=$(this).parent();
				_li.removeClass('hover');
			});
		},
		
				//分类导航
		catNavLst:function(){
			$('.jsCatNavLst').on('mouseenter','.itm .hd',function(){
				var $this=$(this);
				//var $thisindex= $this.index();
				var $parent=$this.parent();
				if($parent.find('li').length){
				$parent.addClass('unfold').find('i').addClass('ihover').end().siblings().removeClass('unfold').find('i').removeClass('ihover');	
					}				
				});
		},
		
		
		/*初始的公用js*/
		init:function(){
			//点击收藏店铺
			$('.jsFavShop').on('click',function(){
				var _this=$(this);
				var _id=_this.data('id');
				Wp.favorite(_this,_id,"shop");
				return false;
			});
			
			
			//联系方式
			$('.contact-trg').on('click','a',function(){
				var _this=$(this);
				var _index=_this.index();
				_this.addClass('cur').siblings('a').removeClass('cur');
				$('.contact-lst').eq(_index).show().siblings('.contact-lst').hide();
				return false;
			});
			
					$('.mem_ct').hover(function(){	
						$(this).addClass('hover').find('.mem_opt').show();
					},function(){
						$(this).removeClass('hover').find('.mem_opt').hide();
					});
					
							//购物车
				(function(){
				var host = location.host;
				$.post('//'+host+'/default/Buycar',function(data){
					if(data.status==true){
						if(data.data.carNum){
								$('.shop_cart').find('.amt').text(data.data.carNum);
								$('.aside_cart').find('em').text(data.data.carNum);
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
			
			//Wp.topNav();//顶部固定导航
			Wp.favPro();//收藏商品
			Wp.catNavLst();//左侧分类栏目
			$wpCmmn.proDtlOrder();//下单相关js
			$wpCmmn.proDtlImg();//针对ie6控制图片最大宽度

			//立即询盘
			$('.wyxp-abtn').on('click',function(){
				var href=$(this).attr('href');
				$.get("//api.csc86.com/notify/count/all/",function (data){
					if(data.status!=true){
						loginJs.showPop({
							isPop:true,
							isrefresh:true
						});
					}
					else{
						triggerEventNum++;
						triggerEventArry=[];
						if(typeof cscgaMd == 'object'){
							triggerEventArry.push({
								prid:$wpCmmn.getUrlParam(href,'proid'),
								userName:data.data.username
							})
							cscgaMd.ask('pc',triggerEventNum,triggerEventArry[0]);
						}
						location.href=href;
					}
				},"jsonp");
				return false;
			});
		},
		
		/*产品中心*/
		product:function(){
			Wp.wpproLst();//产品列表
			var type=function(param,type){
				var param = param || "",
					type = type || "sort";
				require.async('//res.csc86.com/js/m/param.js',function(){
					if(param != csc.param(type)){
						var par = csc.param(type,(param || null));
						if(par){
							location.search = par;
						}else{
							location.href=location.pathname;
						}
					}
				});
			};
			
			//排列显示
			$('.jsSort').bind('click',function(){
				var _this=$(this);
				type(_this.data('sort'));
				return false;
			});
			
			//只显示已标价的商品
			$("#showBjPro").on("change",function (){
				type($(this).prop("checked") ? "y" : "","speak");
			});
		},
	
		
		/*动态详情页*/
		gsdtDtl:function(){
			//针对ie6控制图片最大宽度
			$wpCmmn.gsdtDtlImg();
		}
	}
	
	Wp.init();
});