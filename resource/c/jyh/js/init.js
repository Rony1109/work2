seajs.config({
    // 别名配置
    alias: {
        'placeholder': 'm/sea-modules/placeholder.js',
		//'top':'m/newtopnav/js/init.js',
		'top':'c2/newcgsc/js/newtop.js',/*统一用www.csc86.com页面的顶部导航*/
		'search':'m/newsearch/js/init.js',
		'footer':'m/bot-rightcopy/js/init.js',
		'cscSwitch': 'c/jyh/js/cscSwitch.js',
		'backTop':'m/back-top/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});
define(function(require, exports, module) {
	require('top');
	require('backTop');
	require('search');
	require('footer');
	
	$('.g-back').addCss().goBack();//返回头部
	
    var jyh={
		index:function(){//首页相关js
			
			//轮播相关js
			require.async('cscSwitch',function(){
				
				//图片轮播
				var $jsSlideBox=$('.jsSlideBox');
				var $slidePrev=$jsSlideBox.find('.prev');
				var $slideNext=$jsSlideBox.find('.next');
				if($jsSlideBox.find('.slide-lst li').length>0){
					var slideApi=$jsSlideBox.find('.slide-trg').cscSwitch($jsSlideBox.find('.slide-lst li'),{
						trigger:'a',
						triggerType:'mouse',
						effect:'scroll',
						speed: .4,
						nextBtn:$slideNext,
						prevBtn:$slidePrev
					}).carousel().autoplay({interval:5,api:true});
					$jsSlideBox.hover(function(){
						var len=$(this).find('.slide-lst li').length;
						$slidePrev.show();
						$slideNext.show();
					},function(){
						$slidePrev.hide();
						$slideNext.hide();
					});
				}
				
				//优质商家轮播
				var yzsjLstLen=$('.yzsj-scroll .yzsj-lst').length;
				if(yzsjLstLen>0){
					$('.yzsj-trg').cscSwitch('.yzsj-scroll > .scroll-bd > .yzsj-lst',{
						trigger:'a',
						effect: "scroll",
						beforeSwitch:function(){
							if(yzsjLstLen<2){
								$('.yzsj-trg').hide();
							}else{
								$('.yzsj-trg').show();
							}
						}
					});
				}
				
				//产品滚动
				var $jsProscrll=$('.jsProscrll');
				var $proscrllPrev=$jsProscrll.find('.prev');
				var $proscrllNext=$jsProscrll.find('.next');
				var proLstLen=$jsProscrll.find('.pro-lst li').length;
				if(proLstLen>0){
					var proscrllApi=$jsProscrll.cscSwitch($jsProscrll.find('.pro-lst li'),{
						effect:'scroll',
						steps:1,
						visible:5,
						nextBtn:$proscrllNext,
						prevBtn:$proscrllPrev
					}).carousel();
				}
				$jsProscrll.hover(function(){
					if(proLstLen>5){
						$proscrllPrev.show();
						$proscrllNext.show();
					}
				},function(){
					if(proLstLen>5){
						$proscrllPrev.hide();
						$proscrllNext.hide();
					}
				});
				
				//图片选项卡和优质供应商
				$('.yzpic-lst li').hover(function(){
					var $this=$(this);
					var $yzpicTabBd=$('.yzpic-tab-bd');
					var index=$('.yzpic-lst li').index(this);
					$('.yzpic-lst li').stop(true,false).animate({height:60},200).removeClass('cur')
					$this.stop(true,false).animate({height:350},200).addClass('cur');
					$yzpicTabBd.addClass('g-dn');
					$yzpicTabBd.eq(index).removeClass('g-dn');
					var $yzgysTrg=$yzpicTabBd.eq(index).find('.yzgys-trg');
					var $yzgysLst=$yzpicTabBd.eq(index).find('.yzgys-lst');
					var yzgysLstLen=$yzgysLst.length;
					if(yzgysLstLen>0){
						$yzgysTrg.cscSwitch($yzgysLst,{
							trigger:'a',
							effect: "scroll",
							beforeSwitch:function(){
								if(yzgysLstLen<2){
									$yzgysTrg.hide();
								}else{
									$yzgysTrg.show();
								}
							}
						});
					}
				},function(){}).eq(0).trigger("mouseenter");
			});
			
			//搜索
			require.async('placeholder',function(m){
				m.placeholder('#jyhSrchTxt','#333');
			});
			
			
			//现场图集
			$('.jsXctjLst li').hover(function(){
				var $this=$(this);
				var $maskBox=$this.find('.mask-box');
				$maskBox.find('.rnk').css('display','none');
				$maskBox.stop(true,false).animate({height:184,width:'100%'},200,function(){
					$maskBox.find('.dtl').css('display','block');
				});
			},function(){
				var $this=$(this);
				var $maskBox=$this.find('.mask-box');
				$maskBox.find('.dtl').css('display','none');
				$maskBox.stop(true,true).animate({height:29,width:30},200,function(){
					$maskBox.find('.rnk').css('display','block');
				});
			});
			
		},
		newsLst:function(){//资讯列表页相关js
		
		},
		newsDtl:function(){//资讯详情页相关js
		
		},
		actvLst:function(){//活动列表页相关js
		
		},
		actvDtl:function(){//活动详情页相关js
			//轮播相关js
			require.async('cscSwitch',function(){
				//已报名商家滚动
				var $ybmsjBd=$('.ybmsj-bd');
				var $ybmsjScrll=$ybmsjBd.find('.ybmsj-scroll');
				var $ybmsjPrev=$ybmsjBd.find('.prev');
				var $ybmsjNext=$ybmsjBd.find('.next');
				var ybmsjLstLen=$ybmsjScrll.find('.ybmsj-lst li').length;
				if(ybmsjLstLen>0){
					var ybmsjApi=$ybmsjBd.cscSwitch($ybmsjScrll.find('.ybmsj-lst li'),{
						effect:'scroll',
						steps:1,
						visible:7,
						nextBtn:$ybmsjNext,
						prevBtn:$ybmsjPrev
					}).carousel();
				}
				$ybmsjBd.hover(function(){
					if(ybmsjLstLen>7){
						$ybmsjPrev.show();
						$ybmsjNext.show();
					}
				},function(){
					if(ybmsjLstLen>7){
						$ybmsjPrev.hide();
						$ybmsjNext.hide();
					}
				});
				
			});
			
		}
	};
	
	module.exports=jyh;
});
