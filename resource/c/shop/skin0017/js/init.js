define(function(require, exports, module){
	var $wpCmmn=require('wpCmmn');
	require('//res.csc86.com/js/m/config.js');
	var $dialog=require('dialog');
	var hasLoginInfo=require('hasLoginInfo');//获取弹窗登录后不刷新页面改变页面登录后的信息
	var isSubmit=false;
	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];
	var Wp={
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

			$.get("//api.csc86.com/notify/count/all/",function (data){

				//未登录时弹出弹窗登录
				if(data.status!=true){
					hasLoginInfo.loginInfo();
					return false;
				}
				

				favFun();

			},'jsonp');
			/*require.async('//res.csc86.com/js/m/sign.js',function(){
			 csc.checkSign(favFun());
			 });*/
		},
		
		/*分类导航*/
		catNavLst:function(){
			$('.jsCatNavLst').delegate('.itm .hd','click',function(){
				var $this=$(this);
				var $parent=$this.parent();
				if($parent.hasClass('unfold')){
					$parent.removeClass('unfold');
				}else{
					$parent.addClass('unfold');
				}
			});
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
		
		
		/*初始的公用js*/
		init:function(){
			//点击收藏店铺
			$('.jsFavShop').on('click',function(){
				var _this=$(this);
				var _id=_this.data('id');
				Wp.favorite(_this,_id,"shop");
				return false;
			});
			
			//点击我喜欢
			var iLikeFun=function(id){
				//csc.signDialogClose();
				$.get(csc.url("api","/sns/addlike.html"),{memberid:id},function (data){
					if(data.status){
						location.reload();
					}else{
						$dialog.tip(data.data);
					}
				},"jsonp");
			};
			$('.jsLike').on('click',function(){
				var _this=$(this);
				var _id=_this.data('id');
				if(_this.hasClass('liked')){
					return false;
				}

				$.get("//api.csc86.com/notify/count/all/",function (data){

					//未登录时弹出弹窗登录
					if(data.status!=true){
						hasLoginInfo.loginInfo();
						return false;
					}
					

					iLikeFun(_id);

				},'jsonp');
				/*require.async('//res.csc86.com/js/m/sign.js',function(){
				 csc.checkSign(iLikeFun(_id));
				 });*/
				return false;
			});
			
			//导航
			$('.jsNavLst li:has("ul")').hover(function(){
				var _this=$(this);
				_this.addClass('hover');
			},function(){
				var _this=$(this);
				_this.removeClass('hover');
			});
			
			//联系方式
			$('.contact-trg').on('click','a',function(){
				var _this=$(this);
				var _index=_this.index();
				_this.addClass('cur').siblings('a').removeClass('cur');
				$('.contact-lst').eq(_index).show().siblings('.contact-lst').hide();
				return false;
			});
			
			//他的商圈
			$('.jsHesqLst').on('mouseenter','li',function(){
				$(this).addClass('hover');
			}).on('mouseleave','li',function(){
				$(this).removeClass('hover');
			});
		},
		
		/*首页*/
		index:function(){
			
			var times=3;
			var url="http://"+window.location.host+"/Getlbtime";
			 $.post(url,function(res){
	  
			require.async('cscSwitch',function(){
				//图片轮播
				var $jsSlideBox=$('.jsSlideBox');
				var $slideLi=$jsSlideBox.find('li');
				var $slidePrev=$jsSlideBox.find('.prev');
				var $slideNext=$jsSlideBox.find('.next');
				if($slideLi.length>1){
					$jsSlideBox.find('.slide-trg').cscSwitch($slideLi,{
						trigger:'a',
						currCls:'cur',
						triggerType:'mouse',
						effect:'scroll',//移动方式，此处为scroll滚动移动
						steps:1,//每次移动1个
						visible:1,//默认可见1个
						speed:.6,//图片移动的速度
						nextBtn:$slideNext,//向后按钮
						prevBtn:$slidePrev//向前按钮
					}).carousel().autoplay(res.lbtime);
					
					$jsSlideBox.hover(function(){
						$jsSlideBox.find('.slide-page').show();
					},function(){
						$jsSlideBox.find('.slide-page').hide();
					});
				}	
			});
			 },'json');
			 
			//产品分类
			$('.jsProcatLst .bd:has("ul")').each(function(){
				var _this=$(this);
				_this.find('a:first').append('<i class="jt"></i>');
			});
			$('.jsProcatLst .bd:has("ul")').hover(function(){
				var _this=$(this);
				_this.addClass('hover');
			},function(){
				var _this=$(this);
				_this.removeClass('hover');
			});		
			
			$(".wp-rmpro-1").find('li').on('mouseover',function(){
				 var that=$(this);
				 var len=$(".wp-rmpro-1").find('li').length;
				 
				 // for(var i=0;i<len;i++)
				 // {
				     // $(".rmpro-hd").find('li').css({"border":'1px solid #ccc',"width":'168px',"height":'168px',"line-height":"168px"});
					 // $(".rmpro-hd").find('li').find('a').css({"width":"168px","height":"168px","line-height":"168px"});
				 // }
				 // that.find('a').css({"width":"166px","height":"166px","line-height":"166px"});
				 // that.css({"border":'2px solid #1d2e66',"width":'166px',"height":'166px',"line-height":"166px"});
				 var jsonlist=$.parseJSON(that.find('a').attr('data-inf'));
				 if ( !jsonlist.id ) {
					return false;
				 }
				 $(".wp-rmpro-3").find('.pic').find('a').attr('href',jsonlist.href);
				 $(".wp-rmpro-3").find('.pic').find('a').find('img').attr('src',jsonlist.bigPic);
				 $(".wp-rmpro-3").find('.price').html(jsonlist.price);
				 $(".wp-rmpro-3").find('.cctj-buy-button').attr('href',jsonlist.href);
				 $(".wp-rmpro-3").find('.title').find('a').html(jsonlist.title);
				 $(".wp-rmpro-3").find('.title').find('a').attr('href',jsonlist.href);
				 $(".wp-rmpro-3").find('.cctj-fav-button').attr('data-id',jsonlist.id);
				 return false;
			})
			
			//默认宣传位
			//$wpCmmn.xcwDefault($('.jsAdXcw'));
			
			Wp.favPro();//收藏商品
			Wp.catNavLst();//分类导航
			Wp.wpproLst();//产品列表
			$wpCmmn.FlyQR();//插入浮动层二维码
			$wpCmmn.proShowCscga($('img'));//商品曝光埋点
		},
		
		/*产品中心*/
		product:function(){
			Wp.catNavLst();//分类导航
			Wp.wpproLst();//产品列表
		//	Wp.sHotproLst();//左侧产品列表
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
			$wpCmmn.proShowCscga($('img'));//商品曝光埋点
		},
		
		/*产品详情页*/
		proDetail:function(){
			Wp.favPro();//收藏商品
			Wp.catNavLst();//分类导航
		//	Wp.sHotproLst();//左侧产品列表
			
			//下单相关js
			$wpCmmn.proDtlOrder();
			
			//针对ie6控制图片最大宽度
			$wpCmmn.proDtlImg();
		},
		
		/*诚信认证页*/
		auth:function(){
			//tab切换
			$('.jsWpTab li a').bind('click',function(){
				var _this=$(this);
				var _index=$('.jsWpTab li a').index(this);
				var _parent=_this.parent();
				_parent.addClass('cur').siblings('li').removeClass('cur');
				$('.sub-auth-bd').hide().eq(_index).show();
				return false;
			});
			$('.zzry-list li').find('.pic').find('img').on('click',function(){
				var imgurl=$(this).attr('src');
				art.dialog({
					title:'',
					padding: 0,
					background:"#000",
					opacity:"0.3",
					
					resize:false,
					fixed:true,
					content:'<div class="imgbl" style=\'margin:auto; text-align:center;overflow-y:auto; overflow-x:hidden; width:1000px; heigh:550px\'><img src='+imgurl+'></div>',
					lock:true,
					init: function () {
						var wid=$('.imgbl').find('img').width();
						var hed=$('.imgbl').find('img').height();
						if(wid>1000){
							$('.imgbl').find('img').css('width','1000px');	
						}
						if(hed>550){
							$('.imgbl').find('img').css('height','550px');	
						}
						//console.log($('.imgbl').find('img').width());
						var newwid=$('.imgbl').find('img').width()<506?506:$('.imgbl').find('img').width();
						var newhed=$('.imgbl').find('img').height();
						var nw=($(window).width()-newwid)/2;
						var nh=($(window).height()-newhed)/2;
						$('.imgbl').css({"width":newwid+"px","height":newhed+"px"});
						$('.aui_state_focus').css({"left":nw,"top":nh});

					}
				})
			})
		},
		
		/*动态详情页*/
		gsdtDtl:function(){
			//针对ie6控制图片最大宽度
			$wpCmmn.gsdtDtlImg();
		}
	}
	
	/*<!-- 上下移动DIV层 -->
    $(".wp-colsub").each(function() {
        var listlen=$(".wp-colsub").find(".wp-mdl").length;
		$(".wp-colsub").find(".wp-mdl").eq(0).find('.wp-updn').find('.wp-up').css("display","none");
		$(".wp-colsub").find(".wp-mdl").eq($(".wp-colsub").find(".wp-mdl").length-1).find('.wp-updn').find('.wp-down').css("display","none");
		<!-- 点击上移按钮触发事件-->
		$(".wp-up").on("click", function(){
			var _div=$(this).parent().parent().parent().parent();
			var _divindex=$(".wp-colsub").find(".wp-mdl").index(_div);
			 
			if(_divindex>0){
			   $(".wp-colsub").find(".wp-mdl").eq(_divindex-1).before(_div);
            }
			if(_divindex==1)
			{
				for(var i=0;i<listlen;i++)
				{
					$('.wp-up').css("display","block")
				}
				$(this).css("display","none");
			}
			if(_divindex==listlen-1)
			{
				$(".wp-colsub").find(".wp-mdl").eq($(".wp-colsub").find(".wp-mdl").length-1).find('.wp-down').css("display","none");
				$(this).next(".wp-down").css("display","block");
			}
		});
		<!-- 点击下移按钮触发事件-->
		$(".wp-down").on("click", function(){
			var _div=$(this).parent().parent().parent().parent();
			var _divindex=$(".wp-colsub").find(".wp-mdl").index(_div);
			if(_divindex<$(".wp-colsub").find(".wp-mdl").length-1){
			   $(".wp-colsub").find(".wp-mdl").eq(_divindex+1).after(_div);
            }
			if(_divindex==0)
			{
				for(var i=0;i<listlen;i++)
				{
					$('.wp-up').css("display","block")
				}
				$(".wp-colsub").find(".wp-mdl").eq(0).find('.wp-up').css("display","none");
			}
			
			if(_divindex==listlen-2)
			{
                $(this).css("display","none");
				$(".wp-colsub").find(".wp-mdl").eq($(".wp-colsub").find(".wp-mdl").length-2).find('.wp-down').css("display","block");
			}
		});
    });*/

	Wp.init();
	module.exports=Wp;
	
	// 橱窗产品滚动
	(function () {
		var $cctj = $( "#cctj" ),
			maito2 = $cctj.find(".cctj"),
			root = $cctj.find(".cctj-scroll-wrap"),
			ul = root.find("ul"),
			prev = $cctj.find(".cctj-page-prev"),
			next = $cctj.find(".cctj-page-next"),
			li = ul.children().first(),
			w = li.width() + 18,
			c_len = ul.children().length;

		$wpCmmn.proShowCscga(ul.find('img'));

		ul.css("width", w * c_len);

		//clone.appendTo(root);
		
		prev.click(function (){
			scroll(2);
		});
		next.click(function (){
			scroll(1);
		});

		/*var timer = null;

		function setTimer () {
			timer = setInterval(function (){
				scroll(2);
			}, 3000);
		}
		setTimer();
		maito2.hover(function (){
			clearInterval(timer);
		}, function (){
			setTimer();
		});*/
		
		function scroll ( fx ) {
			triggerEventArry=[];
			triggerEventNum++;

			if ( fx === 1) { // prev
				ul.animate({
					left: - w * 5
				}, 500, function () {
					ul.children().slice(0, 5).appendTo( ul );
					ul.css("left", 0);
				});
			} else if ( fx === 2) { // next
				var clone = ul.clone();
				clone.appendTo(root);
				clone.css("width", w * c_len);
				clone.css("top", 0);
				clone.css("left", -w * c_len);

				ul.animate({
					left: w * 5
				}, 500, function () {
					ul.children().slice(-5).prependTo( ul );
					ul.css("left", 0);
				});
				clone.animate({
					left: -w * c_len + w * 5
				}, 500, function () {
					clone.remove();
				});
			}

			setTimeout(function(){
				require.async('m/inVisible/inVisible.js', function (inVisible) {
					ul.find('img').each(function(){
						var $this=$(this);
						var isInVisible=inVisible.isIn({
							targetE:$this,
							container:root
						});
						if(isInVisible && typeof cscgaMd == 'object'){
							triggerEventArry.push({id:cscgaMd.getUrlFileName($this.parents('a:first').attr('href'))});
						}
					});
					if(typeof cscgaMd == 'object'){
						cscgaMd.commodityExposure.noScrollEvent('pc',triggerEventNum,triggerEventArry);
					}
				});
			},1000);
		}
	})();
	// 标时第17套模板，design.JS使用到这个标示
	window.MODULEINDEX = "skin0017";
});