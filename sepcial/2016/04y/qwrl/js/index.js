/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': './jquery.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'scrollLoading':'./jquery.scrollLoading.js',
		'scroll':'./scroll.js'
		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	

    /*
     * 以下为专题js代码
     * ......
     */
	var isSubmit=false;
	
		var fix = function(option){
			this.defaults = {
            html:'<div class="fix"></div>',
			callback:null
        	},
			this.options = $.extend({},this.defaults, option||{}),
			this.init();
			}
		fix.prototype = {
			init: function() {
				var _this = this;
				var _option = _this.options;
			$('body').prepend(_option.html);
	
				$(function(){
				var fun =_option.callback;
				fun();
			});
				}
			};	
			
			
			
			
			
	 
	$('.an').on('click',function(){
		
		var opt = {
			html:'<div class="fix"><img class="img" src="images/fix1bac.png"><div class="con1">\
				<p>1.优惠券礼包包含8张面值不等优惠券，<span class="s3">满5000减80（5张），满10000返200（3张）；</span></p>\
				<p>2.每张优惠券可以使用1次，<span class="s3">每个订单仅限使用一张优惠券</span>，请选择适当金额的优惠券进行使用；</p>\
				<p>3.请在支付时直接使用该优惠券进行减免，若订单已支付则不能使用；</p>\
				<p>4.不同店铺发放优惠券仅限在该店铺内使用，其他店铺不能使用；</p>\
				<p>5.优惠券不得转让，不可提现；</p>\
				<p>6.若使用优惠券购买的订单产生退款，则退该订单实际支付金额，单独店铺退货需买家支付往返运费的，则退款金额将直接扣除该部分；</p>\
				<p>7.不与其他优惠同时使用；</p>\
				<p>8.本次活动中，如发现用户存在恶意行为或作弊行为，华南城网有权冻结用户账户，卖家账户冻结不影响商户已经收取货款的提现，如用户不认同华南城网的决定，可以打开华南城网首页底部【意见反馈】进行申诉。</p>\
				<p>9.本活动在法律允许范围内最终解释权归华南城网所有。</p>\
				</div></div>',
callback:function(){
					var $fix = $('.fix');
					var $winhei = $(window).height();
					var num=0;
					var $fiximglen = $fix.find("img").length;
					$fix.find("img").each(function(index, element) {
					var $this=$(this);
					$this.on('load',function(){
					num++;
					if(num==$fiximglen){
					var $fixhei = 	$fix.height(); 
					 $fixtop=($winhei - $fixhei)/2>0?($winhei - $fixhei)/2:0;
					$fix.fadeIn().animate({"top":$fixtop+"px"});	
					}	
					});
					});
						
					$fix.find('.img').on('click',function(){
						$fix.fadeOut(function(){$fix.remove();});
						});
					}
			};
		var fi =new fix(opt);
		
		});
	

		$('.con3 li').on('click','.s2',function(){
				
		var $this=$(this);
		var $thisdata=$(this).data('sj');
		$thisdata.url=location.href;

			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			
			$.get('//wslm.csc86.com/api/coupons',$thisdata,function(data){
				
				if(data.status==false){
					
					var opt = {
			html:'<div class="fix"><img class="img" src="images/fix3.png"><div class="con1">\
					<p class="p1 p2"><img  src="images/fix3-1.png"></p>\
					<p class="p0">您还未登录，<br>\
					领取的现金券将无处存放哦~<br>\
					请先登录</p>\
					<p class="p1 p2"><a href="'+data.data.redirectUrl+'"><img src="images/fix3-2.png"></a></p>\
					</div></div>',
					callback:function(){
					var $fix = $('.fix');
					var $winhei = $(window).height();
					var num=0;
					var $fiximglen = $fix.find("img").length;
					$fix.find("img").each(function(index, element) {
					var $this=$(this);
					$this.on('load',function(){
					num++;
					if(num==$fiximglen){
					var $fixhei = 	$fix.height(); 
					 $fixtop=($winhei - $fixhei)/2>0?($winhei - $fixhei)/2:0;
					$fix.fadeIn().animate({"top":$fixtop+"px"});	
					}	
					});
					});

						
					$fix.find('.img').on('click',function(){
						$fix.fadeOut(function(){$fix.remove();});
						});
						}
			};
		var fi =new fix(opt);
					
				}else if(data.status==true){
					
					if(data.data.Code=='1'){
						console.log(1);
					var opt = {
				html:'<div class="fix"><img class="img" src="images/fix2.png"><div class="con1">\
				<p class="p1"><img  src="images/fix2-1.png"></p>\
				<p class="p0">已存放至您的【会员中心】-【我的账户】-<br>【我的优惠券】中<br>\
				赶紧到'+data.data.detail.title+'进货吧！</p>\
				<p class="p1 p2"><a href="'+data.data.detail.submain+'product.html"><img   src="images/fix2-2.png"></a></p>\
				</div></div>',
				callback:function(){
					var $fix = $('.fix');
					var $winhei = $(window).height();
					var num=0;
					var $fiximglen = $fix.find("img").length;
					$fix.find("img").each(function(index, element) {
					var $this=$(this);
					$this.on('load',function(){
					num++;
					if(num==$fiximglen){
					var $fixhei = 	$fix.height(); 
					
					 $fixtop=($winhei - $fixhei)/2>0?($winhei - $fixhei)/2:0;
					 console.log($winhei);
					$fix.fadeIn().animate({"top":$fixtop+"px"});	
					}	
					});
					});

						
					$fix.find('.img').on('click',function(){
						$fix.fadeOut(function(){$fix.remove();});
						});
					}
			};
			
			
		var fi =new fix(opt);
					}
					
					else if(data.data.Code=='2'){
						console.log(2);
					var opt = {
			html:'<div class="fix"><img class="img" src="images/fix5.png"><div class="con1">\
			<p class="p1 p2"><img  src="images/fix4-1.png"></p>\
			<p>'+data.data.Msg+'</p>\
</div></div>',
				callback:function(){
					var $fix = $('.fix');
					var $winhei = $(window).height();
					var num=0;
					var $fiximglen = $fix.find("img").length;
					$fix.find("img").each(function(index, element) {
					var $this=$(this);
					$this.on('load',function(){
					num++;
					if(num==$fiximglen){
					var $fixhei = 	$fix.height(); 
					 $fixtop=($winhei - $fixhei)/2>0?($winhei - $fixhei)/2:0;
					$fix.fadeIn().animate({"top":$fixtop+"px"});	
					}	
					});
					});

						
					$fix.find('.img').on('click',function(){
						$fix.fadeOut(function(){$fix.remove();});
						});
					}
			};
			
			
		var fi =new fix(opt);
					}
					
					
					else if(data.data.Code=='180110105006'){
					var opt = {
					html:'<div class="fix fix4"><img class="img" src="images/fix4.png"><div class="con1">\
<p class="p1"><img  src="images/fix4-1.png"></p>\
<p class="p0">请进入到您的【会员中心】-<br>【我的账户】-【我的优惠券】<br>中或者点击 查看优惠券</p>\
</div></div>',
				callback:function(){
					var $fix = $('.fix');
					var $winhei = $(window).height();
					var num=0;
					var $fiximglen = $fix.find("img").length;
					$fix.find("img").each(function(index, element) {
					var $this=$(this);
					$this.on('load',function(){
					num++;
					if(num==$fiximglen){
					var $fixhei = 	$fix.height(); 
					 $fixtop=($winhei - $fixhei)/2>0?($winhei - $fixhei)/2:0;
					$fix.fadeIn().animate({"top":$fixtop+"px"});	
					}	
					});
					});

						
					$fix.find('.img').on('click',function(){
						$fix.fadeOut(function(){$fix.remove();});
						});
					}
			};
			
			
		var fi =new fix(opt);
					}else{
						
						var opt = {
					html:'<div class="fix"><img class="img" src="images/fix5.png"><div class="con1">\
					<p class="p1 p2"><img  src="images/fix4-1.png"></p>\
			<p>'+data.data.Msg+'</p>\
</div></div>',
				callback:function(){
					var $fix = $('.fix');
					var $winhei = $(window).height();
					var num=0;
					var $fiximglen = $fix.find("img").length;
					$fix.find("img").each(function(index, element) {
					var $this=$(this);
					$this.on('load',function(){
					num++;
					if(num==$fiximglen){
					var $fixhei = 	$fix.height(); 
					 $fixtop=($winhei - $fixhei)/2>0?($winhei - $fixhei)/2:0;
					$fix.fadeIn().animate({"top":$fixtop+"px"});	
					}	
					});
					});

						
					$fix.find('.img').on('click',function(){
						$fix.fadeOut(function(){$fix.remove();});
						});
					}
			};
			
			
		var fi =new fix(opt);
						
						}
					
					
		
				}
				isSubmit=false;
			},'jsonp');
		return false; 
		
	});		

});
