define(function(require, exports, module) {
	var $dialog=require('dialog');
	var hasLoginInfo=require('hasLoginInfo');//获取弹窗登录后不刷新页面改变页面登录后的信息
	var $jsOrderFrm=$(".jsOrderFrm");
	var isMyshop=$jsOrderFrm.find('input[type=hidden][name=buyerId]').val()==$jsOrderFrm.find('input[type=hidden][name=sellerId]').val()?true:false;//获取是否自己店铺
	var proxyurl=$("#proxyurl").val();//店铺地址
	//require('//res.csc86.com/js/c/search/scroll.js');
	var ajaxpage=require('l/ajaxPage/1.0.2/ajaxPage.js');//ajaxPage插件

	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];

	var Wpcmmn = {
		/*获取url参数*/
		getUrlParam:function(_url,key){
			if(_url.lastIndexOf("?") != -1){
				var queryStr = _url.substring(_url.lastIndexOf("?") + 1, _url.length);
				if(!key)
					return queryStr;//返回所有参数
				else{
					var params  = queryStr.split("&");
					for(var j = 0 ;j < params.length;j++){
						var tmp = params[j].split("=");
						if(tmp[0]==key){
							return tmp[1];
							break;
						}
					}
				}
			}
		},

		/*判断是否为ie6*/
		isIe6: function() {
			var ie6 = !-[1, ] && !window.XMLHttpRequest;
			if (ie6) {
				return true;
			} else {
				return false;
			}
		},

		//商品曝光埋点（首页和列表页）
		proShowCscga:function(obj,options){
			var opts={
				container:window
			};
			opts=$.extend({},opts,options);
			require.async('l/lazyload/1.9.1/jquery.lazyload.js', function () {
				obj.lazyload({
					container:opts.container,
					failure_limit: 100,
					effect: "fadeIn",
					isProga: true
				});
			});
		},

		//底部工商网警图片处理
		footLogo:function(){   
	         var dimg = $('.dimg>a>img');
	         dimg.css({"width":"120px","height":"50px"});
		},

		/*头部*/
		topBar: function() {
			require.async('placeholder', function(m) {
				m.placeholder('#search-txt1');
				m.placeholder('#search-txt2');
			});
			$('.jsTopMycnt').hover(function() {
				$(this).addClass('top-mycnt-hover');
			}, function() {
				$(this).removeClass('top-mycnt-hover');
			});

			//搜索相关js
			$('.jsTopSrchHd').hover(function() {
				$(this).addClass('hd-hover');
			}, function() {
				$(this).removeClass('hd-hover');
			});
			$('.jsTopSrchHd li').bind('click', function() {
				var _this = $(this);
				var _val = _this.data('value');
				var _ul = _this.parent();
				var _frmUrl = _this.data('url');
				var _bd = $('.jsTopSrchBd');
				$('.jsTopSearch').attr('action', _frmUrl);
				_this.addClass('cur').siblings('li').removeClass('cur');
				_ul.prepend(_this);

				_bd.hide();
				_bd.find('input[name=q]').attr('disabled', 'disabled');
				if (parseInt(_val)) {
					_bd.eq(1).show();
					_bd.eq(1).find('input[name=q]').removeAttr('disabled');
				} else {
					_bd.eq(0).show();
					_bd.eq(0).find('input[name=q]').removeAttr('disabled');
				}
				$('.jsTopSrchHd').removeClass('hd-hover');
			});

			//顶部导航搜索
			$('.jsTopSearch').on("submit",function(){
				var val= $.trim($(this).find('#search-txt1').val());
				var zmVal=encodeURIComponent(val).split("%").join("");
				cscga('create', 'SU-10001-1', 'auto','searchTracker'+zmVal);
				cscga('searchTracker'+zmVal+'.require', 'cscplugin',{
					searchKeyWord:val,
					eventAction:'searchSuccess'
				});
				cscga('searchTracker'+zmVal+'.cscplugin:searchInit');
			});

			//旺铺内容页和列表页的搜索
			$('.wp-search-box').parent('form').on('submit',function(){
				var $this=$(this),
					keyword=$this.find('input[name=keyword]').val(),
					priceFloor=$this.find('input[name=priceFloor]').val(),
					priceCeiling=$this.find('input[name=priceCeiling]').val();
				cscga('create', 'SU-10001-1', 'auto','wpSearchTracker2');
				cscga('wpSearchTracker2.require', 'cscplugin',{
					searchKeyWord:keyword,
					searchKeyPrc1:priceFloor,
					searchKeyPrc2:priceCeiling,
					eventAction:'searchSuccess'
				});
				cscga('wpSearchTracker2.cscplugin:searchInit');
			});

			require('//res.csc86.com/v2/m/head-search/js/searchComplete');
			$('.jsTopSrchBd .ipt-txt').attr('autocomplete', 'off')
			$('.jsTopSrchBd').SearchComplete({
				width: '214px',
				tirggerDom: '.jsTopSearch .srch-smt',
				top: '23px'
			});
			
			
			$('i.sjfh').css("top",$('i.sjfh').parent().height()/2-3);
			
			//显示手机号码
			$('.wp-contact').find('.skin-box-hd').on('click',function(){
				var  $this=$(this);
				if($this.find('.sjfh').length){
					if($('.wp-contact .skin-box-bd').is('.hide')){
						$('.wp-contact .skin-box-bd').removeClass('hide');
						$this.find('.sjfh').remove();
						  //点击统计
				   var title = document.title;
 					 window._hmt && window._hmt.push(['_trackEvent','查看联系方式','点击',title]);
						}
					}
				});
			
			//显示手机号码		
			$('.contact-lst .viewcontact a').on('click',function(){
				
				var  $this=$(this);
				
				var $thisparent =$this.parents('.contact-lst');
				var $thissiblings =  $thisparent.siblings('.contact-lst').eq(0);
						$thisparent.remove();
						$thissiblings.show();
						$('.contact-trg').show();
						  //点击统计
				   var title = document.title;
 					 window._hmt && window._hmt.push(['_trackEvent','查看联系方式','点击',title]);
				});
			
			//显示手机号码	
			$('.kfzx-lst .viewcontact a').on('click',function(){
				var  $this=$(this);
				var $thisparent =$this.parents('.viewcontact');
				var $thissiblings =  $thisparent.siblings('li');
					//	$thisparent.remove();
						$thissiblings.show();
						  //点击统计
				   var title = document.title;
 					 window._hmt && window._hmt.push(['_trackEvent','查看联系方式','点击',title]);
				});	
				
							//显示手机号码	
			$('.service-itm .viewcontact span').on('click',function(){
				var  $this=$(this);
				var $thisparent =$this.parents('.viewcontact');
				var $thissiblings =  $thisparent.siblings('li');
						$thisparent.remove();
						$thissiblings.show();
						  //点击统计
				   var title = document.title;
 					 window._hmt && window._hmt.push(['_trackEvent','查看联系方式','点击',title]);
				});	
				
				
				
		},

		/*宣传位默认显示*/
		xcwDefault: function(obj) {
			obj.each(function() {
				var _this = $(this);
				if (!_this.find('img')[0]) {
					_this.css({
						'background': '#888 url(//res.csc86.com/v2/c/shop/css/img/edit-blank.jpg) no-repeat center center'
					});
				}
			});
		},

		/*动态详情页图片max-width不得超过710*/
		gsdtDtlImg: function() {
			if (Wpcmmn.isIe6()) {
				$('.sub-gsdt-dtl .bd img').each(function() {
					var _this = $(this),
						_width = _this.width();
					if (_width > 710) {
						_width = 710;
					}
					_this.width(_width);
				});
			}
		},

		/*商品详情页内容处图片max-width不得超过*/
		proDtlImg: function() {
			if (Wpcmmn.isIe6()) {
				$('.prodtl-info img').each(function() {
					var _this = $(this),
						_width = _this.width();
					if (_width > 798) {
						_width = 798;
					}
					_this.width(_width);
				});
			}
		},

		/*商品详情页公用js*/
		proDtlOrder: function() {
			
			var jsProDtlPicnum=0;
			
			//产品图片切换
			$('.jsProDtlPic .pic-trg li').bind('click', function() {
				var _this = $(this);
				var _lImgUrl = _this.find('a').attr('href');
				var _sImgUrl = _this.find('img').attr('src');
				var _sImgUrlt3 = _sImgUrl.replace(/(.*)_t1(.*)/,"$1_t3$2");
				var _sImgUrlt4 = _sImgUrl.replace(/(.*)_t1(.*)/,"$1_t4$2");				
				var _lg = $('.jsProDtlPic .pic-c a');
				jsProDtlPicnum=_this.index();
				_this.addClass('cur').siblings().removeClass('cur');
				_lg.attr('href', _sImgUrlt4);
				_lg.find('img').attr('src', _sImgUrlt3);				
				return false;
			});
			
			$('.jsProDtlPic').on('mouseenter', function() {
				var $this=$(this);
				var len=$this.find('.pic-trg li').length;
				if(len>4){$this.find('.piclist .an').show();}
				}).on('mouseleave',function(){
				var $this=$(this);
				$this.find('.piclist .an').hide();
					});
				
				
				//切换小图
				
				$('.jsProDtlPic').on('click','.an',function(){
				var $this=$(this);
				var $thisparents=$this.parents('.jsProDtlPic');
				var $thisparentsul=$thisparents.find('.pic-trg');
				var $thislis=$thisparents.find('.pic-trg li');
	
				if($this.is('.left')){
					jsProDtlPicnum-=1;
					$thisparentsul.prepend($thisparentsul.find("li:last"));
					$thislis.eq(jsProDtlPicnum).trigger('click');
					}
				else if($this.is('.right')){
					jsProDtlPicnum+=1;
					$thisparentsul.append($thisparentsul.find("li:first"));
					$thislis.eq(jsProDtlPicnum).trigger('click');

					}	
				});
	
			
			//点击立即采样
			$('.jsLjcyBtn').on('click', function() {
				var $this = $(this);
				var $jsLjcyFrm = $this.parents('.jsLjcyFrm');
				var $buyerIpt=$('input[type=hidden][name=buyerId]');
				var buyerId=$buyerIpt.val();
				triggerEventNum++;
				triggerEventArry=[];

				$.get("//api.csc86.com/notify/count/all/",function (data){

					//未登录时弹出弹窗登录
					if(data.status!=true){
						hasLoginInfo.loginInfo();
						return false;
					}

					if (isMyshop == true) {
						if($this.data("Boole")==1){
							$this.append("<span>不能对自己店铺的商品下单</span>");
							$this.data({Boole:0});
						}
						return false;
					}

					triggerEventArry.push({
						prid:$('input[name=productId]:first').val(),
						proType:$jsLjcyFrm.find('input[name=type]').val()
					});

					if(typeof cscgaMd == 'object'){
						cscgaMd.takeSample('pc',triggerEventNum,triggerEventArry[0])
					}

					$jsLjcyFrm.trigger('submit');

				},'jsonp');
				return false;
			});

			if (proInf.isOpen) { //交易相关js
				seajs.use("//res.csc86.com/v2/c/shop/js/order.js");
			}

			//点击发表评价得积分
			$('.go-cmmnt').on('click',function(){
				var href=$(this).attr('href');
				$.get("//api.csc86.com/notify/count/all/",function (data){
					//未登录时弹出弹窗登录
					if(data.status!=true){
						hasLoginInfo.loginInfo();
					}else{
						location.href=href;
					}
				},"jsonp");
				return false;
			});
			
			//详细信息、售后说明tab
			$('.prodtl-tab li').on('click',function(){
				var $this=$(this);
				var index=$('.prodtl-tab li').index(this);
				triggerEventNum++;
				triggerEventArry=[];
				$this.addClass('cur').siblings().removeClass('cur');
				$('.prodtl-tab-c').hide().eq(index).show();
				triggerEventArry.push({
					prid:$('input[name=productId]:first').val(),
					tabTxt:encodeURIComponent($this.text().split('（')[0])
				})
				if(typeof cscgaMd == 'object'){
					cscgaMd.proDtlTab('pc',triggerEventNum, triggerEventArry[0])
				}
			});
			
			$('.jsOrderFrm').find('.jscj').on('click',function(){
			var $cjpjtop=$('.prodtl-tab').offset().top;
				$('html,body').animate({scrollTop:$cjpjtop},500);
			$('#recordItm').trigger('click');
			});	
			
			$('.jsOrderFrm').find('.jspj').on('click',function(){
			var $cjpjtop=$('.prodtl-tab').offset().top;
				$('html,body').animate({scrollTop:$cjpjtop},500);
			$('#cmmntItm').trigger('click');
			});	
	var productId = $('#productId').val();	
	var $wplytsm= $('.wp-lyt-sm');
	var proxyurl = $('#proxyurl').val();		
	var $pagetable=$('.pagetable').find('tbody');
	var	ajaxpageurl = proxyurl+'/record/'+productId+'.html';
	ajaxpage.init({
		obj:$pagetable,//必填，需要分页的内容容器（obj暂时只在无数据时用到了）
		pageObj:$('.ajax-page2'),//必填，分页容器
		isMoveTop:true,//点击分页滚动条是否移动到对应位置
		moveObj:$wplytsm,//移动到对应位置的容器
		curPage:1,//默认当前页
		nodata:'<tr><td colspan="4">暂无成交记录</td></tr>',//暂无数据时的html
		type:'post',//ajax请求方式
		url:ajaxpageurl,//请求的url
		pagetz:false,//是否开启输入数字跳转
		dataObj:{},//ajax请求传的参数，必须为object类型,默认为null即只传递当前页page（已在下面b对象中的ajax函数中写死）
		dataType:'jsonp',//ajax请求返回的数据类型
		beforeSend:function(){//ajax请求前执行 
			//$lst.html('<li>加载中...</li>');
		},
		content:function(data){//处理内容循环函数，只有当返回的status时为1时才会执行到此处，所以在此处无需判断status是否为1了
			var html='';
			$.each(data.data,function(i,n){
				var me=this;
				html+='<tr>\
                <td>'+me.memberName+'</td>\
                <td>'+me.other+'</td>\
                <td>'+me.num+'</td>\
                <td>'+me.paytime+'</td>\
                </tr>\
                <tr>';
			});
			$pagetable.html(html);
		}
});		
			
			//评分
			(function(){
				var	$cmmntStar=$('.cmmnt-score').find('.star'),
					cmmntScore=parseFloat($cmmntStar.data('score'));
				$cmmntStar.find('span').animate({width:Math.round((133*cmmntScore)*10/50)},'slow');
			})();
			
			//商品评价好评率
			$('.jsRatioLst li').each(function(){
				var $this=$(this),
					$bar=$this.find('.bar'),
					scoreTxt=$this.find('.t em').html(),
					score=Number(scoreTxt.substr(0,scoreTxt.length-1));
				$bar.find('em').animate({width:score},'slow');
			});
			
			
					
			
			//商品评价分页
			require.async('//res.csc86.com/v2/l/ajaxPage/js/ajaxPage.js',function(m){
				var $cmmntBd=$('.cmmnt-tbl tbody'),
					//url=location.href;
					url=location.pathname;
				url = proxyurl+url.replace(/product/g,"comment");
				m.init({
					obj:$cmmntBd,
					pageObj:$('.ajax-page'),
					isMoveTop:true,
					moveObj:$('#cmmntItm'),
					nodata:'<tr><td class="g-tc g-c8" colspan="4">暂无评论，等你首评</td></tr>',
					url:url,
					/*beforeSend:function(){
						$cmmntBd.html('<tr><td class="g-tc g-c8" colspan="4">加载中...</td></tr>');
					},*/
					content:function(data){
						var	html='';
						$.each(data,function(i,n){
							html+='<tr>'+
									  '<td class="td1">'+
										  '<p>'+n.evaluationContent+'</p>'+
										  '<p class="g-mt5 g-c8">发表于：'+n.publicTime+'</p>'+
									  '</td>'+
									  '<td><span class="star star'+n.score+'"></span></td>'+
									  '<td>'+n.buyNum+'</td>'+
									  '<td class="td4">'+
										  '<p>'+n.account+'</p>'+
										  '<p><span class="g-mr5 g-cred">'+n.memberLevel+'</span> '+n.consumerAddress+'</p>'+
										  '<p>'+n.orderTime+' 采购</p>'+
									  '</td>'+
								  '</tr>';
						});
						$cmmntBd.html(html);
					}
				});
			});
			
			// 右侧联系商家
			// 分辨率小于1024 隐藏联系商家浮动框
			var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) && $(window).width() < 1350) {
				return;
			}

			//$.get('http://'+location.host+'/GetContact',function(data){
				/*
			$.get(proxyurl+'/GetContact',function(data){
				var status=data.status;
				if(status){
					var data=data.data;
					var qq=data.qq;
					var qqHtml='';
					var cnctHtml='<div class="aside-cntct">'+
						'<div class="g-pr cntct-bd">'+
							'<div class="hd">联系商家</div>'+
							'<ul class="bd">'+
								'<li class="g-cf itm1">'+
									'<span class="t">联系人：</span>'+
									'<span class="c">'+data.name+'</span>'+
								'</li>'+
								'<li class="g-cf">'+
									'<span class="t">手&nbsp;&nbsp;&nbsp;&nbsp;机：</span>'+
									'<span class="c">'+data.mobile+'</span>'+
								'</li>'+
							'</ul>'+
							'<ul class="ft"></ul>'+
						'</div>'+
						'<i class="jt"></i>'+
					'</div>';
					$.each(qq,function(i,n){
						qqHtml+='<li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+n+'&site=qq&menu=yes" title="点击这里给我发消息"><img border="0" src="//res.csc86.com/v2/c/shop/image/aside-qq.jpg" alt=""/><span class="t">QQ客服0'+(i+1)+'</span></a></li>';
					});
					$('body').append(cnctHtml);
					$('.aside-cntct .ft').html(qqHtml);
				}
			},'jsonp');
			*/
		},

		//插入浮动层二维码
		FlyQR : function(){
			var $qrUrl=$("#QRUrl");
			if($qrUrl[0]){
				var host=location.host;
				var url ='//'+host+'/getonline' ;
				var imgUrl=$qrUrl.val();
									
				$.post(url,function(data){
					if(data.status==true){
						var tshtml='';
						if(data.data.online!="Y"){
							tshtml= '<div class="g-o gsall">\
							<span class="sp1"><img src="//res.csc86.com/v2/c/shop/image/gs1.png" width="39" height="21"> </span>\
							<span class="sp2"><img src="//res.csc86.com/v2/c/shop/image/gs.png"  width="17" height="17"> </span>\
							<span class="sp3">为了您的交易安全，请选择<b>“</b><em>已认证</em><b>”“</b><em>资质齐全</em><b>”“</b><em>开通在线交易</em><b>”</b>的商家进行线上交易。若因您选择线下交易而产生的纠纷，与华南城网无关。</span>\
							</div>';
						 //tshtml='<div class="ts">\
							//	<div class="tsimg">\
							//	<img src="//res.csc86.com/v2/c/shop/css/img/ts.png">\
							//	</div>\
							//	为了您的交易安全，请选择<b>“</b><em> 已认证 </em><b>” “</b><em> 资质齐全 </em><b>” “</b><em> 开通在线交易 </em><b>”</b>的商家进行线上交易。若因您选择线下交易而产生的纠纷，与华南城网无关。\
							//	</div>';
						}
						$("#content").prepend(tshtml);
					}

					//var flyqr = $('<div class="flyqr">\
					//		 '+tshtml+'\
					//		<div class="ewm">\
					//		<img src="http://thomas.b2b.csc86.com/temp/27ccb3db16c5953658b6a2982fec7a3f.png" alt="手机下单，方便快捷">\
					//		<span class="g-db">手机下单，方便快捷</span>\
					//		</div>\
					//		</div>');
						
					//if(document.body.clientWidth > 1024){
					//$("body").append(flyqr);
					//	$(window).resize(function(){
					//		if(document.body.clientWidth < 1024 && $("body").find(flyqr).length >= 1){
					//			flyqr.remove();
					//		}else if(document.body.clientWidth > 1024 && $("body").find(flyqr).length <= 0){
					//			$("body").append(flyqr);
					//		}
					//	});
					//}
					},'jsonp');	
			
				
			}
		}
		

	};
	//$.get("http://" + location.host + "/iszhengzhou", function ( res ) {
	$.get(proxyurl + "/iszhengzhou", function ( res ) {
		if ( ! res.status ) {
			return;
		};
		var html = '';
		if ( res.status === "act" ) {
			html = '<p class="g-tc">由于目前您尚未填写企业相关信息及上传资质材料，因此旺铺尚未激活</p><div class="g-h25"></div><p class="g-tc"><a href="//www.csc86.com" style="color:#2267a0">返回首页</a><a href="//i.csc86.com?wpjh=add" style="display:inline-block; padding:5px 20px; background:#f00;color:#fff;margin-left:10px;">请点击激活</a></p>';
		} else if ( res.status === "wait" ) {
			html = '<p class="g-tc">您的资料正在审核中，请耐心等待</p><div class="g-h25"></div><p class="g-tc"><a href="//www.csc86.com" style="color:#2267a0">返回首页</a><a href="//i.csc86.com" style="display:inline-block; padding:5px 20px; background:#f00;color:#fff;margin-left:10px;">返回会员中心</a></p>';
		} else if ( res.status === "refs" ) {
			html = '<p class="g-tc">您的资料未通过审核，请查看您的站内信通知，核对后重新修改并进行旺铺激活</p><div class="g-h25"></div><p class="g-tc"><a href="//www.csc86.com" style="color:#2267a0">返回首页</a><a href="//i.csc86.com?wpjh=add" style="display:inline-block; padding:5px 20px; background:#f00;color:#fff;margin-left:10px;">请点击修改</a></p>';
		};
		artDialog({
			title:false,
			content: html,
			width:600,
			height:130,
			cancel:false,
			fixed:true,
			lock:true,
			opacity:0.2,
			dbClickHide:false,
			init:function(){
				
			}
		});
	}, 'jsonp');


	//点击询盘按钮
	$('.jsLjAsk').on('click',function(){
		var href=$(this).attr('href');
		$.get("//api.csc86.com/notify/count/all/",function (data){
			//未登录时弹出弹窗登录
			if(data.status!=true){
				hasLoginInfo.loginInfo();
			}else{
				triggerEventNum++;
				triggerEventArry=[];
				if(typeof cscgaMd == 'object'){
					triggerEventArry.push({
						prid:Wpcmmn.getUrlParam(href,'proid'),
						userName:data.data.username
					})
					cscgaMd.ask('pc',triggerEventNum,triggerEventArry[0]);
				}
				location.href=href;
			}
		},"jsonp");
		return false;
	});

	//qq联系方式添加埋点
	$('a[href*="wpa.qq.com"]').on('click',function(){
		triggerEventNum++;
		triggerEventArry=[];
		if(typeof cscgaMd == 'object'){
			triggerEventArry.push({
				qq:Wpcmmn.getUrlParam($(this).attr('href'),'uin')
			})
			cscgaMd.qq('pc',triggerEventNum,triggerEventArry[0]);
		}
	});

	Wpcmmn.topBar();
	Wpcmmn.footLogo();
	module.exports = Wpcmmn;	
});