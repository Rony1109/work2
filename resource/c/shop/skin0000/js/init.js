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
							obj.html('<i></i><span>旺铺已收藏</span>');
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
		
		/*初始的公用js*/
		init:function(){
		
			//点击收藏商品
			$('.jsFavPro').bind('click',function(){
				var _this=$(this);
				var _id=_this.data('id');
				Wp.favorite(_this,_id);
				return false;
			});
			
			//点击收藏店铺
			$('.jsFavShop').bind('click',function(){
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
			$('.jsLike').bind('click',function(){
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
			
			//分类导航
			$('.jsCatNavLst').delegate('.itm .hd','click',function(){
				var $this=$(this);
				var $parent=$this.parent();
				if($parent.hasClass('unfold')){
					$parent.removeClass('unfold');
				}else{
					$parent.addClass('unfold');
				}
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
			$('.contact-trg').delegate('a','click',function(){
				var _this=$(this);
				var _index=_this.index();
				_this.addClass('cur').siblings('a').removeClass('cur');
				$('.contact-lst').eq(_index).show().siblings('.contact-lst').hide();
				return false;
			});
			
		},
		
		/*首页*/
		index:function(){
			
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
			
			//图片轮播
			require.async('cscSwitch',function(){
				var _jsSlideBox=$('.jsSlideBox');
				var _prev=_jsSlideBox.find('.prev');
				var _next=_jsSlideBox.find('.next');

				var api=_jsSlideBox.cscSwitch(".jsSlideBox > ul > li",{
					effect:'scroll',//移动方式，此处为scroll滚动移动
					steps:1,//每次移动1个
					visible:1,//默认可见1个
					speed:.6,//图片移动的速度
					nextBtn:_next,//向后按钮
					prevBtn:_prev//向前按钮
				}).carousel().autoplay({interval:5,api:true});
				
				_jsSlideBox.hover(function(){
					_jsSlideBox.find('.slide-page').show();
					api.stop();
				},function(){
					_jsSlideBox.find('.slide-page').hide();
					api.play();
				});
			});

			$wpCmmn.FlyQR();//插入浮动层二维码

			$wpCmmn.proShowCscga($('img'));//商品曝光埋点
			
		},
		
		/*产品中心*/
		product:function(){
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
			
			/*var htm='';
                htm+='<div class="mask" style=\"left:0;top:0; display:none; border:0px;width:100%;height:100%;background:#000;z-index:99;position:fixed;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;\"></div>';
				htm+='<div class="tpbk" style="position:fixed; display:none; z-index:999; text-align:center; background:#fff;">';
				htm+='<div class="tpls" style="margin:auto; text-align:center;overflow-y:auto; overflow-x:hidden;height:550px;  width:1000px; position:relative;">';
				htm+='<span style="display:inline-block;position:relative;"><em style="position:absolute;right:-5px;top:0;">关闭</em><img src="" style="max-width:1000px;"></span>';
				//htm+='<div class="mask-colse" style="color:#fff; font-size:14px; width:28px; background:#acacac; height:28px; line-height:28px; text-align:center; font-family:\'Helvetica,STHeiti\'; position:absolute; right:0; top:0; cursor:pointer;"><span>×</span></div>';
				htm+='</div>';
				htm+='</div>';*/
			//$(document.body).append(htm);
				
			$('.zzry-list li').find('.pic').find('img').on('click',function(){
				
				/*$('.tpls').find('img').attr('src',imgurl);
				var tps=($(window).height()-$('body .tpbk').height())/2;
				var lfs=($(window).width()-$('body .tpbk').width())/2;
				if(tps<0){tps=0};
				$('.tpbk').css({'left':lfs,'top':tps});
				$('.mask').show();	
				$('.tpbk').show();*/
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
			});

		},
		
		/*动态详情页*/
		gsdtDtl:function(){
			//针对ie6控制图片最大宽度
			$wpCmmn.gsdtDtlImg();
		}
	}
	Wp.init();
	module.exports=Wp;
});