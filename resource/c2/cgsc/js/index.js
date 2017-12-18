define(function(require, exports, module) {
	//var isLoginObj=require('m/newtopnav/js/init.js');
	var isLoginObj=require('c2/newcgsc/js/newtop.js');/*统一用www.csc86.com页面的顶部导航*/
	
	require('m/newsearch/js/init.js');
	require('m/back-top/js/init.js');
	require('m/bot-rightcopy/js/init.js');
	require('l/jQueryCookie/1.4.1/jquery.cookie.js');//cookie插件
	require('//res.csc86.com/js/c/search/scroll.js');
	var dialog=require('//res.csc86.com/v2/m/dialog/js/init.js');
	var isSubmit=false,isxljz=false;
	
	//require('c2/cgsc/js/init.js');
	
	var isLogin=isLoginObj.status;//是否登录 true为登录 false为未登
	var memberId=isLoginObj.data.id;//登录的会员id
	var index={
		
		//头部落幕广告
	headB:function headBan(){
		$("#bannerAll").css("display", "block");
		$(".min-banner").css("display", "none");
		var stime = setTimeout(function() {
			$(".max-banner").slideUp("slow", function() {
				$(".min-banner").show();
			});
		}, 5000);
		$(".min-banner span").click(function() {
			$(this).closest(".g-w").css("display", "none");
		});
		if ($(".min-banner a").length < 1) {
			$(".min-banner").find("span").remove();
		}
		if ($(".max-banner a").length < 1) {
			$(".max-banner").find("span").remove();
		}
	},
		
		//图片懒加载
		lazyLoadImg:function(){
			require.async('l/lazyload/1.9.1/jquery.lazyload.js',function(){
				$('img').lazyload({
					failure_limit: 100,
					effect: "fadeIn",
					isProga: true
				});
			});
		},
		shopcart:function(){
			/*选择器*/
			var $shopcart=$('.shopcart'),
				$shopcartHdNum=$shopcart.find('.shopcart-hd .num em'),//采购单商品的件数
				$shopcartBd=$shopcart.find('.shopcart-bd'),//显示采购单具体内容的容器
				proHtml='';//采购单里面的html
			
			//计算数量、价钱函数
			var countPrc=function(obj,countType){
				var $this=obj,
					$table=$this.parents('.shopcart-tbl'),
					$tbody=$this.parents('tbody:first'),
					$tr=$this.parents('tr:first'),
					$num=$tr.find('.num'),
					$price=$tr.find('.price'),
					lineId=$tr.data('lineid'),
					proinf=$tbody.data('proinf'),
					priceRange=proinf.priceRange,
					oneTnum=0;//相同id的商品的采购总数
					allTprc=0;//购物车中的合计价格
					dNum=0;//单款商品的采购数

				//获取相同id的商品的采购总数
				$tbody.find('.num').each(function(){
					oneTnum+=$(this).html()*1;
				});
				
				//获取相同id的商品单价
				var onePrc=prcNum.rangePrc(priceRange,oneTnum);	
				
				//单款商品的采购数
				switch(countType){
					case 0://0代表点减的时候
					dNum=addPlut.plut({obj:$this});
					break;
					case 1://1代表点加的时候
					dNum=addPlut.add({obj:$this});
					break;
					case 2://2代表文本框按下键盘时
					dNum=addPlut.iptKeyUp({obj:$this});
					break;
					case 3://3代表文本框失去焦点时
					dNum=addPlut.iptBlur({obj:$this});
					break;
				}
				
				//单款商品的采购总价
				var dPrc=Math.round(onePrc*100*dNum)/100;
				$price.html(prcNum.fixTwo(dPrc));
				
				//获取购物车中合计价格
				$table.find('.price').each(function(){
					allTprc+=$(this).html()*100;
				});
				allTprc=Math.round(allTprc)/100;
				$shopcart.find('.jsTtlPrc').html(prcNum.fixTwo(allTprc));
				
				//保存
				if(isSubmit===true){return false;}//阻止表单重复提交
				isSubmit=true;
				$.post('//i.csc86.com/updateCarQuantity',{"lineId":lineId,"quantity":dNum},function(data){
					isSubmit=false;
				},'jsonp');
				
			};
		
			//获取采购单列表
			//console.log(isLogin);
			if (isLogin) {//已登录时
			
				var $urle=$('.shopcart-hd').attr('data-url');
				$.get($urle,function(data){
					if(data.status==false)
					{
						return;
					}
					var	len=data.data.length;
					$shopcartHdNum.html(len);	
				},'jsonp');
			}else{//未登录时
				proHtml='<div class="no-lgn">'+
							'<p class="g-ffy">您还未登陆，无法查看采购单</p>'+
							'<p class="g-mt20"><a class="ljdl-abtn" href="">立即登录</a></p>'+
						'</div>';
				$shopcartBd.html(proHtml);
				$shopcartHdNum.html(0);
			}
			
			//点击立即登录
			$shopcartBd.on('click','.ljdl-abtn',function(){
				location.href = "//member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href);
				return false;
			});
			
			/*鼠标移至购物车显示详细购物车*/
		/*
			$shopcart.hover(function(){
				$shopcartBd.show();
			},function(){
				//$shopcartBd.hide();
			});
			*/
			
			/*鼠标移至商品的每行显示数量操作和删除按钮*/
			$shopcartBd.on('mouseenter','.shopcart-tbl tr',function(){
				$(this).addClass('tr-hover');
			}).on('mouseleave','tr',function(){
				var $this=$(this),
					$num=$this.find('.num'),
					$ipt=$this.find('.num-opts .ipt-txt'),
					iptVal=$ipt.val();
				$num.html(iptVal);
				$ipt.trigger('blur');
				$this.removeClass('tr-hover');
			});
			
			/*加减相关js*/
			$shopcartBd.find('.num-opts i').each(function(){//防止点击时选中文本（主要是为了兼容ie，其他浏览器在样式里面设置了
				$(this)[0].onselectstart=function(){return false;}
			});
			$shopcartBd.on('click','.num-opts .plut-opt',function(){//减法
				countPrc($(this),0);
			});
			$shopcartBd.on('click','.num-opts .add-opt',function(){//加法
				countPrc($(this),1);	
			});
			$shopcartBd.on('keyup','.num-opts .ipt-txt',function(){//加减法中的文本框按下键盘时
				countPrc($(this),2);
			});
			$shopcartBd.on('blur','.num-opts .ipt-txt',function(){//加减法中的文本框失去焦点时
				countPrc($(this),3);
			});
			
			/*删除操作*/
			$shopcartBd.on('click','.shopcart-tbl .del',function(){
				var $this=$(this),
					$table=$this.parents('.shopcart-tbl'),
					$tr=$this.parents('tr:first'),
					$jsTtlPrc=$shopcart.find('.jsTtlPrc'),
					lineId=$tr.data('lineid'),
					carId=$tr.data('carid'),
					dtprc=$tr.find('.price').html()*100,//单件商品总价
					ttlPrc=$jsTtlPrc.html()*100;//合计
				
				//阻止表单重复请求
				if(isSubmit===true){return false;}
				isSubmit=true;
				$.post('//i.csc86.com/deleteCarLine',{"lineId":lineId,"carId":carId},function(data){
					if(data.status=="200"){
						$tr.remove();
					}else{
						$table.parent().before('<div class="cztips-box"><div class="bg"></div><span class="bd">删除失败，请重试！</span></div>');
						setTimeout(function(){
							$shopcartBd.find('.cztips-box').remove();
						},2000);
					}
					ttlPrc=Math.round(ttlPrc-dtprc)/100;
					$jsTtlPrc.html(ttlPrc);//显示总价
					
					var len=$table.find('tbody tr').length;
					
					$shopcartHdNum.html(len);
					
					if(len<1){//当删除到没有产品时
						$shopcartBd.html('<p class="g-ffy no-pro">您还没挑选任何商品；<br/>赶快去选购吧！</p');	
					}
					isSubmit=false;
				},'jsonp');
				
				return false;
			});
			
		},
		//商品分类
		category:function(){
			var $ctgryBox=$('.ctgry-box');//商品分类容器
			var urls=$('.box-hd').attr('data-url');
			$.post(urls,function(data){
				if(data.status){
					$ctgryBox.find('.box-bd').append(data.data.html);
				}
			},'json');
			
			$ctgryBox.on('mouseenter','.ctgry-frst-lst li',function(){
				var $this=$(this),
					index=$this.index();
				$this.addClass('hover').siblings().removeClass('hover');
				$ctgryBox.find('.ctgry-scnd').addClass('ctgry-scnd-show');
				$ctgryBox.find('.ctgry-scnd-bd').eq(index).show().siblings('.ctgry-scnd-bd').hide();
			});
			
			$ctgryBox.on('mouseleave',function(){
				$ctgryBox.find('.ctgry-frst-lst li').removeClass('hover');
				$ctgryBox.find('.ctgry-scnd').removeClass('ctgry-scnd-show');
				$ctgryBox.find('.ctgry-scnd-bd').hide();
			});
		},
		sssj:function(){
			if($("#play")[0]){
				
				$("#play").cscjqscroll();
			 var dataobj2={};
			 var $winh=$(window).height(); 
			 var xldjtop=$('.xldj').offset().top;
			 var pageStart = 9;
			 var pageSize = 20;
			 
				$("#play").on('click','li',function(){
				var $this= $(this);
					pageStart = 9;
				var $thisdata = $this.data('keyword');
				var searchwd = location.search.substring(1).toLowerCase();
				var searchayy=searchwd.split('&');
				 $this.find('.p1').find('span').addClass('s1');
				 $this.siblings('li').find('.p1').find('span').removeClass('s1');
				isSubmit=false;
				for(var i=0;i<searchayy.length;i++) 
				{ 
				dataobj2[searchayy[i].split("=")[0]]=decodeURIComponent(searchayy[i].split("=")[1]); 
				} 
				dataobj2.q = $thisdata;
				
				dataobj2.pageStart = 0;
				dataobj2.pageSize = 30;
				if(isxljz===true){return false;}//阻止表单重复提交
			isxljz=true;
				$.post('http://search.csc86.com/switchMaterial',dataobj2,function(data){
			var html='';
			var _msg=data.data.errorMsg;
			if(data.status===0){
				$.each(data.data,function(){
					var me= this;
					var meprice = me.price;
					var meprice=me.speak=="Y"?"价格面议":meprice;
					var qz =me.speak=="Y"?"":'<em>￥</em>';
					var hz = me.speak=="Y"?"":"<span>起</span>";
					
			if($('.spro-lst')[0]){
				html+='<li class="item">\
					<ul class="g-c-f">\
						<li class="ibox img">\
						<a href="http://www.csc86.com/product/'+me.memberId+'.html" class="i" title="'+me.altTile+'" target="_blank">\
							<img src="'+me.picUrl+'" data-max="100" alt="'+me.altTile+'">\
							</a>\
							<div class="bpro-img">\
							<i class="jt"></i>\
							<span class="bd">\
							<img src="'+me.picUrl2+'" data-max="100" alt="'+me.altTile+'">\
							</span>\
							</div>\
						</li>\
						<li class="list">\
							<div class="pro-name">\
								<a href="http://www.csc86.com/product/'+me.memberId+'.html" target="_blank">'+me.title+'</a>\
							</div>\
							<div>\
							<p>'+me.content+'</p>\
							</div>\
						</li>\
						<li class="adress"><a href="http://'+me.submain+'.csc86.com" target="_blank" class="cname" title="'+me.enterprise+'">'+me.enterprise+'</a>\
							<p> '+me.province+'   '+me.city+' </p>\
		<div class="g-c-f icol auth-info-box">\
							</div></li>\
							<li class="prc-inf">\
								<a class="prc" href="http://www.csc86.com/product/'+me.memberId+'.html" target="_blank">'+qz+meprice+'</a> '+hz+'\
							</li>\
					</ul>\
				</li>';
				}else{
					var zxjy = me.isTrade=="Y"?'<span title="在线交易产品" class="bz-zxjy">$ 在线交易</span>':"";
					html+='<li class="item">\
		<div class="ibox img">\
			<a href="http://www.csc86.com/product/'+me.memberId+'.html" class="i" title="'+me.altTile+'" target="_blank">\
				<img src="'+me.picUrl+'" data-max="100" alt="'+me.altTile+'"></a>\
		</div>\
		 <a href="http://www.csc86.com/product/'+me.memberId+'.html" class="title" target="_blank" title="'+me.altTile+'">\
		 '+me.title+'</a>\
		<div class="price">\
						'+qz+meprice+' '+hz+'\
		</div>\
		<p>\
			<a href="http://'+me.submain+'.csc86.com" target="_blank" title="'+me.enterprise+'">'+me.enterprise+'</a>\
		</p><div class="g-c-f icol auth-info-box">\
                               '+zxjy+'\
		</div>\
	</li>';
					}
					
					});
					
					$('.jsxljz').find('.g-i-v-m').find('.item').remove();
					$('.jsxljz').find('.g-i-v-m').append(html);
					xldjtop=($('.xldj').offset().top);
					$('.xldj').text('点击加载更多内容');
					isxljz=false;
				}else{
		dialog.tip(_msg?_msg:'全部加载完毕！',2);
		$('.xldj').text('全部加载完毕！');
				}
			},'jsonp');
			return false;
				});
			
			
			$(window).scroll(function(){
				if(xldjtop<$(document).scrollTop()+$winh+200){
					if(!isSubmit){$('.xldj').trigger('click');return false}
					}
				});


		$('.jsxljz').on('click','.xldj',function(){
		pageStart=pageStart+20;
	  
		var searchwd = location.search.toLowerCase();
		var num=0;
		if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			$('.xldj').text('正在加载···');
			$.each(dataobj2,function(){
			num++;	
				});
       //var dataobj = num>0?dataobj2:dataobj3;
	   if(num>0){
		 
		 var url = 'http://search.csc86.com/switchMaterial'; 
			 dataobj2.pageStart=pageStart;
			 dataobj2.pageSize=pageSize;
		 var dataobj = dataobj2;  
		   }else{
		var dataobj = {"pageStart":pageStart,"pageSize":pageSize};  
		var url = 'http://search.csc86.com/switchMaterial'+searchwd;
			   }
			   console.log(url);
			   console.log(dataobj);
		$.post(url,dataobj,function(data){
			var html='';
			var _msg=data.data.errorMsg;
			if(data.status===0){
				$.each(data.data,function(){
					var me= this;
					var meprice = me.price;
					var meprice=me.speak=="Y"?"价格面议":meprice;
					var qz =me.speak=="Y"?"":'<em>￥</em>';
					var hz = me.speak=="Y"?"":"<span>起</span>";
					
					
					
			if($('.spro-lst')[0]){
				html+='<li class="item">\
					<ul class="g-c-f">\
						<li class="ibox img">\
						<a href="http://www.csc86.com/product/'+me.memberId+'.html" class="i" title="'+me.altTile+'" target="_blank">\
							<img src="'+me.picUrl+'" data-max="100" alt="'+me.altTile+'">\
							</a>\
							<div class="bpro-img">\
							<i class="jt"></i>\
							<span class="bd">\
							<img src="'+me.picUrl2+'" data-max="100" alt="'+me.altTile+'">\
							</span>\
							</div>\
						</li>\
						<li class="list">\
							<div class="pro-name">\
								<a href="http://www.csc86.com/product/'+me.memberId+'.html" target="_blank">'+me.title+'</a>\
							</div>\
							<div>\
							<p>'+me.content+'</p>\
							</div>\
						</li>\
						<li class="adress"><a href="http://'+me.submain+'.csc86.com" target="_blank" class="cname" title="'+me.enterprise+'">'+me.enterprise+'</a>\
							<p> '+me.province+'   '+me.city+' </p>\
		<div class="g-c-f icol auth-info-box">\
							</div></li>\
							<li class="prc-inf">\
								<a class="prc" href="http://www.csc86.com/product/'+me.memberId+'.html" target="_blank">'+qz+meprice+'</a> '+hz+'\
							</li>\
					</ul>\
				</li>';
				}else{
					var zxjy = me.isTrade=="Y"?'<span title="在线交易产品" class="bz-zxjy">$ 在线交易</span>':"";
					html+='<li class="item">\
		<div class="ibox img">\
			<a href="http://www.csc86.com/product/'+me.memberId+'.html" class="i" title="'+me.altTile+'" target="_blank">\
				<img src="'+me.picUrl+'" data-max="100" alt="'+me.altTile+'"></a>\
		</div>\
		 <a href="http://www.csc86.com/product/'+me.memberId+'.html" class="title" target="_blank" title="'+me.altTile+'">\
		 '+me.title+'</a>\
		<div class="price">\
						'+qz+meprice+' '+hz+'\
		</div>\
		<p>\
			<a href="http://'+me.submain+'.csc86.com" target="_blank" title="'+me.enterprise+'">'+me.enterprise+'</a>\
		</p><div class="g-c-f icol auth-info-box">\
                               '+zxjy+'\
		</div>\
	</li>';
					}
					
					});
				
					$('.jsxljz').find('.g-i-v-m').append(html);
					xldjtop=($('.xldj').offset().top);
					$('.xldj').text('点击加载更多内容');
					isSubmit=false;
				}else{
		dialog.tip(_msg?_msg:'全部加载完毕！',2);
		$('.xldj').text('全部加载完毕！');
				}
			},'jsonp');
			return false;
		
		});
				
				
				}
			
			},
		//交易动态
		jydt:function(){
			var This = $('.cgsc-jydt');
			var $img=$('.cgsc-loginfo').find('img');
				$img.each(function(){
					var $this=$(this);
					if (!$this.attr('src')||$this.data('original')) {
						// 图片动态载入
						$this.attr("src", $this.data("original"));	
					}
					$this.removeAttr("data-original");
				});
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
					marginTop : "-26px"
				},500,function(){
					$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
				});
			};	
			
			//判断是否登录
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
						$('.log-wdkbs').hide();
						$('.log-userkbs').show();
						
					},'json');
				}			
			}else
			{
				$('.log-userkbs').hide();
				$('.log-wdkbs').show();
			}
		},
		//全部类目
		category:function(){
			var $ctgryBox=$('.ctgry-box'),//商品分类容器
				$ctgryFrstLi=$ctgryBox.find('.ctgry-frst-lst li'),
				$ctgryScnd=$ctgryBox.find('.ctgry-scnd'),
				$ctgryScndBd=$ctgryBox.find('.ctgry-scnd-bd'),
				$ctgryScrll=$ctgryScndBd.find('.ctgry-scrll');
			$ctgryBox.on('mouseenter','.ctgry-frst-lst li',function(){
				var $this=$(this),
					index=$this.index(),
					$bd=$ctgryScndBd.eq(index),
					$img=$bd.find('img');
					$scrll=$bd.find('.ctgry-scrll');
				$this.addClass('hover').siblings().removeClass('hover');
				$ctgryScnd.addClass('ctgry-scnd-show');
				$bd.show().siblings('.ctgry-scnd-bd').hide();
				$img.each(function(){
					var $this=$(this);
					if (!$this.attr('src')||$this.data('original')) {
						// 图片动态载入
						$this.attr("src", $this.data("original"));	
					}
					$this.removeAttr("data-original");
				});
				/*
				$scrll.find('.ctgry-scrll-lst').css('left',0);
				$scrll.find('.ctgry-scrll-trg a').removeClass('cur').eq(0).addClass('cur');
				
				if(api){
					api.click(0);
				}*/
			});
			
			$ctgryBox.on('mouseleave',function(){
				
				$ctgryFrstLi.removeClass('hover');
				$ctgryScnd.removeClass('ctgry-scnd-show');
				$ctgryScndBd.hide();
				$ctgryScrll.find('.ctgry-scrll-lst').css('left',0);
				$ctgryScrll.find('.ctgry-scrll-trg a').removeClass('cur').eq(0).addClass('cur');
			});
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
							effect:'fade',
							lazyload:true,
							nextBtn:$slideNext,
							prevBtn:$slidePrev,
							circular:true,
							beforeSwitch:function(i,n){
								var $img=$li.eq(n).find('img');
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
					var $jxrxBd=$('#jxrxBd'),
						$prev=$jxrxBd.find('.prev'),
						$next=$jxrxBd.find('.next'),
						$li=$jxrxBd.find('.kgpro-lst li'),
						len=$li.length,
						visible=3;
					if(len>0){
						$jxrxBd.cscSwitch($li,{
							effect:'scroll',
							steps:3,
							visible:visible,
							nextBtn:$next,
							prevBtn:$prev,
							beforeSwitch:function(i,n){
								var $img=$jxrxBd.find('.kgpro-lst img:lt('+(n*visible+visible)+')');
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
					if(len>3){
						$prev.show();
						$next.show();
					}else{
						$prev.hide();
						$next.hide();
					}
					
					/*$('.jxrx-c li').find('img').hover(function(){*/
					$('.jxrx-c li').hover(function(){	
						$(this).find('img').animate({'margin-top':'-10px'},100);
					},function(){
						$(this).find('img').animate({'margin-top':'0px'},100);
					});
						
				})();
				
				//华南城实体市场产品销量排行
				(function(){
					var $xsphBox=$('#xsphBox'),
						$xsphTrg=$xsphBox.find('.xsph-trg'),
						$xsphLst=$xsphBox.find('.xsph-lst'),
						len=$xsphLst.length;
					if(len>0){
						$xsphTrg.cscSwitch($xsphLst,{
							trigger:'a',
							currCls:'cur',
							effect:'scroll',
							beforeSwitch:function(i,n){
								var $img=$xsphLst.eq(n).find('img');
								$img.each(function(){
									var $this=$(this);
									if (!$this.attr('src')||$this.data('original')) {
										// 图片动态载入
										$this.attr("src", $this.data("original"));	
									}
									$this.removeAttr("data-original");
								});
							}
						}).carousel().autoplay(5);
					}
					/*$('.xsph-lst li').find('img').hover(function(){*/
					$('.xsph-lst li').hover(function(){	
						$(this).find('img').animate({'margin-top':'-10px'},100);
					},function(){
						$(this).find('img').animate({'margin-top':'0px'},100);
					});
					
				})();
				
			/*	//标杆企业tab切换
				(function(){
				var $change = $('.bgqy-change'),$bgqy=$('#bgqy'),$bgqyBd=$bgqy.find('.bgqy-bd'),domai = location.host,n=1,flag = false;
				$change.on('click',function(){
					var $this = $(this);
				if(flag===true){return false;}//阻止表单重复提交
					flag=true;
					var url='//'+domai+'/default/getBenchmarkCompany.html?page='+(n+1);
					$.post(url,function(data){
						var html='';
						if(data.status==true){
							n++;
							if(n>=data.msg){n=0}
							$.each(data.data,function(){
								var _this =this;
								html+='<li><a href="'+_this.url+'"target="_blank"><img src="'+_this.image+'" width="130" height="65" alt="'+_this.name+'"/></a></li>';
								});
								$this.siblings().remove().end().before(html);	
							}
						flag=false;	
					},'json')	
					})
				})();*/


				//快报 活动 公告tab切换
				(function(){
					var $bgqy=$('.pro-actbk'),
						$bgqyBd=$bgqy.find('.pro-bd'),
						len=$bgqyBd.length;
					if(len>0){
						$('.proclmat').cscSwitch($bgqyBd,{
							trigger:'li',
							currCls:'cur'
						});
					}
				})();
				
				//最新低价团购外层容器tab切换
				(function(){
					var $djtg=$('#djtg'),
						$djtgBd=$djtg.find('.djtg-bd'),
						len=$djtgBd.length;
					if(len>0){
						$djtg.find('.orgtab-lst').cscSwitch($djtgBd,{
							trigger:'li',
							currCls:'cur',
							beforeSwitch:function(i,n){
								if(n>0){
									var $img=$djtgBd.eq(n).find('img');
									$img.each(function(){
										var $this=$(this);
										if (!$this.attr('src')||$this.data('original')) {
											// 图片动态载入
											$this.attr("src", $this.data("original"));	
										}
									});
								}
							}
						});
					}
					
					/*$('.djtg-lst li').find('img').hover(function(){*/
					$('.djtg-lst li').hover(function(){	
						$(this).find('img').animate({'margin-top':'-10px'},100);
					},function(){
						$(this).find('img').animate({'margin-top':'0px'},100);
					});
					
				})();
				
				//华南城实体市场选择地方站时的tab切换
				(function(){
					var $stscTab=$('#stscTab'),
						$stscBd=$('.stsc-bd'),
						stscBdLen=$stscBd.length;
					if(stscBdLen>0){
						$stscTab.cscSwitch($stscBd,{
							trigger:'li',
							currCls:'cur',
							beforeSwitch:function(i,n){
								if(n>0){
									var $img=$stscBd.eq(n).find('img');
									$img.each(function(){
										var $this=$(this);
										if (!$this.attr('src')||$this.data('original')) {
											// 图片动态载入
											$this.attr("src", $this.data("original"));	
										}
									});
								}
							}
						});
					}
				})();
				
				//华南城介绍tab切换
				(function(){
					var $cscabtTab=$('#cscabtTab'),
						$cscabtTabc=$('.cscabt-tabc'),
						cscabtTabcLen=$cscabtTabc.length;
					if(cscabtTabcLen>0){
						$cscabtTab.cscSwitch($cscabtTabc,{
							trigger:'li',
							currCls:'cur',
							beforeSwitch:function(i,n){
								if(n>0){
									var $img=$cscabtTabc.eq(n).find('img');
									$img.each(function(){
										var $this=$(this);
										if (!$this.attr('src')||$this.data('original')) {
											// 图片动态载入
											$this.attr("src", $this.data("original"));	
										}
									});
								}
							}
						});
					}
				})();
				
				//华南城介绍处物流轮播
				(function(){
					var $cscwl=$('#cscwl'),
						$prev=$cscwl.find('.prev'),
						$next=$cscwl.find('.next'),
						$lst=$cscwl.find('.cscwl-lst'),
						len=$lst.length;
					if(len>0){
						$cscwl.cscSwitch($lst,{
							effect:'scroll',
							steps:1,
							visible:1,
							nextBtn:$next,
							prevBtn:$prev
						}).carousel();
					}
					if(len>1){
						$prev.show();
						$next.show();
					}else{
						$prev.hide();
						$next.hide();
					}
				})();
				  
				//子站地方站tab切换
				(function(){
					$('.cgsc-ziz').hover(function(){
						$('.cgsc-lbk').show();
						$(this).find('em').css('background-image','url(http://res.csc86.com/v2/c2/cgsc/css/img/dfzselect2.png)');
					},function(){
						$('.cgsc-lbk').hide();
						$(this).find('em').css('background-image','url(http://res.csc86.com/v2/c2/cgsc/css/img/dfzselect.png)');
					});
					$('.cgsc-lbk').find('li').hover(function(){
						$(this).addClass('cur');
					},function(){
						$(this).removeClass('cur');
					});
				})();
				
			/*	//您可能感兴趣的商品
				(function(){
					var $jsYclkScrll=$('.jsYclkScrll'),
						$prev=$jsYclkScrll.find('.prev'),
						$next=$jsYclkScrll.find('.next'),
						$ul=$jsYclkScrll.find('.kgpro-lst'),
						$url=$('#history_product').attr(('data-url'));
						hstryPro=$.cookie('csc86_cg_view_history');
						
					$.post($url,{"cookies":hstryPro,"memberId":memberId},function(data){
						var	html='';
						$.each(data.data,function(i,n){
							var result=data.data[i],
								url=result.url,//['url'],
								pic=result.pic,//['pic'],
								title=result.title,//['title'],
								price=result.price;//['price'];
							html+='<li>'+
									'<p class="pic">'+
										'<a class="i" href="'+url+'" target="_blank" title=""><img data-original="'+pic+'" alt="'+title+'"/></a>'+
									'</p>'+
									'<p class="title"><a href="'+url+'" target="_blank" title="'+title+'">'+title+'</a></p>'+
									'<p class="price">'+price.replace(/￥/g,"<em>&yen;</em>")+'</p>'+
								'</li>';
						});
						$ul.prepend(html);
						var	liLen=$ul.find('li').length;

						//当浏览记录里面最多20条，当大于20条时将后面的删除，使其等于20条
						if(liLen>20){
							$ul.find('li:gt(19)').remove();
						}
							
						if(liLen>0){
							$jsYclkScrll.cscSwitch('.jsYclkScrll .kgpro-lst li',{
								effect:'scroll',
								steps:1,
								visible:5,
								nextBtn:$next,
								prevBtn:$prev,
								beforeSwitch:function(i,n){
									var $img=$jsYclkScrll.find('.kgpro-lst img');
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
						if(liLen>5){
							$prev.show();
							$next.show();
						}else{
							$prev.hide();
							$next.hide();
						}
						
					},'json');
				})();*/
				
			});
		},
		
		//华南城实体市场选择地方站中具体区域时的tab切换
		stscItm:function(){
			$('.stsc-itm').hover(function(){
				var $this=$(this),
					$siblings=$this.siblings('.stsc-itm');
				$this.stop(true,true).animate({width:534},200);
				$siblings.stop(true,true).animate({width:210},200);
			});
		},
		wzts:function(){
			if($('#bannerAll')[0]){
				$('#bannerAll').before('<div class="wzts">由于网站系统升级，部分功能将无法访问，影响时间为7月2日18:00至7月3日06:00，<br>给您带来不便，我们深表歉意。</div>');
				}
		},
		
		
		//tab切换
		tabFun:function(obj1,obj2,curClass){
			obj1.hover(function(){
				var $this=$(this),
					index=obj1.index(this);
				obj1.removeClass(curClass).eq(index).addClass(curClass);
				obj2.hide().eq(index).show();
				return false;
			});
		},
		
		//首页入口函数
		init:function(){
			//$('.g-back').addCss().goBack(); //右边侧边栏返回调用的JS

			index.shopcart(); //购物车 采购单
			
			index.category(); //全部类目
			
			index.lazyLoadImg();//图片懒加载
			
			index.indexSwitch();//首页轮播和tab切换相关js
			
			index.stscItm();//华南城实体市场选择地方站中具体区域时的tab切换
			
			index.jydt(); //交易动态信息
			
		//	index.sssj(); ////搜索实景
		}
	};
	index.headB();
	index.init();
});