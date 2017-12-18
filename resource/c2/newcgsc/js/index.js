define(function(require, exports, module) {
	var isLoginObj=require('c2/newcgsc/js/newtop.js');
	
	require('c2/newcgsc/js/newsearchinit.js');
	require('c2/newcgsc/js/newback-top.js');
	require('m/bot-rightcopy/js/init.js');
	require('l/jQueryCookie/1.4.1/jquery.cookie.js');//cookie插件
	require('//res.csc86.com/js/c/search/scroll.js');
	require('c2/newcgsc/js/jquery.masonry.min.js');
	var dialog=require('//res.csc86.com/v2/m/dialog/js/init.js');
	var isSubmit=false,isxljz=false;
	
	//require('c2/cgsc/js/init.js');
	
	var isLogin=isLoginObj.status;//是否登录 true为登录 false为未登
	var memberId=isLoginObj.data.id;//登录的会员id

	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];
	
	var scrollfun =function(num){
			$(window).scroll(function(){
			var _top=$(this).scrollTop();
			_top>=num?$('.g_searchwk').addClass('fix'):$('.g_searchwk').removeClass('fix');
			});
		};
	var index={
		
		//头部落幕广告
	headB:function headBan(){
		//$("#bannerAll").before('<div class="g-w tsgg"><p>由于网站系统升级，9月18日 19:30-9月19日 7:30，系统将无法访问，<br>给您带来不便，敬请谅解</p></div><div class="g-h10"></div>');
		//$('.top_bar').after('<div style="background-color:#fff; padding-top:10px; overflow:hidden;"><div class="g-w tsgg"><p>国庆放假期间（2017年10月1日到10月8日），由于部分银行业务暂停，平台提现业务可能受到一定影响，由此给您带来的不便，我们深表歉意！最后，祝大家节日快乐！</p></div><div class="g-h10"></div></div>');
		$("#bannerAll").css("display", "block");
		$(".min-banner").css("display", "none");
		var stime = setTimeout(function() {
			$(".max-banner").slideUp("slow", function() {
				$(".min-banner").show(function(){
                  // scrollfun(162);
				  scrollfun(90);
					});
			});
		}, 5000);
		$(".min-banner span,.max-banner span").click(function() {
			$(this).closest(".g-w").css("display", "none");
			 //scrollfun(122);
			 scrollfun(50);
		});
		if ($(".min-banner a").length < 1) {
			$(".min-banner").find("span").remove();
		}
		if ($(".max-banner a").length < 1) {
			$(".max-banner").find("span").remove();
		}
	},
		
		//图片懒加载
		lazyLoadImg:function(obj){
			require.async('l/lazyload/1.9.1/jquery.lazyload.js',function(){
				obj.lazyload({
					failure_limit:100,
					effect : "fadeIn",
					isProga:true
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
		/*
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
		*/
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
					marginTop : "-22px"
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
						//$('.log-wdkbs').hide();
						//$('.log-userkbs').show();
						
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
				$this.find('.bd').stop().animate({"paddingLeft":"25px"},300);
				$this.addClass('hover').siblings().removeClass('hover');
				$ctgryScnd.addClass('ctgry-scnd-show');
				$bd.show(/*function(){
					var $this=$(this);
					$this.find('.ctgry-scnd-itm').masonry({
					itemSelector : 'dl',
					columnWidth : 0
				  });

					}*/).siblings('.ctgry-scnd-bd').hide();
				$img.each(function(){
					var $this=$(this);
					if (!$this.attr('src')||$this.data('original')) {
						// 图片动态载入
						$this.attr("src", $this.data("original"));
					}
					$this.removeAttr("data-original");
				});
			$ctgryBox.on('mouseleave','.ctgry-frst-lst li',function(){
				var $this=$(this);
				$this.find('.bd').stop().animate({"paddingLeft":"10px"},300);
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
							trigger:'li',
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
				
				//标杆企业tab切换
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
								html+='<li><a href="'+_this.url+'" "target="_blank"><img src="'+_this.image+'" width="130" height="65" alt="'+_this.name+'"/></a><div class="blackbgab"><div class="blcakbg"><div class="jz"><p>'+_this.name+'</p><p><a href="'+_this.url+'"target="_blank">点击进入</a></p></div></div></div></li>';
								});
								$this.siblings().remove().end().before(html);	
							}
						flag=false;	
					},'json')	
					})
				})();
				
				//热销精品换一批
				(function(){
					var $change = $('.jsrxhyp'),$zxrx=$('.zxrx'),domai = location.host,n=1,flag = false;
					$change.on('click',function(){
						var $this = $(this);
						triggerEventArry=[];//商品曝光需要用到
						if(flag===true){return false;}//阻止表单重复提交
						flag=true;
						var url='//'+domai+'/default/GetHotSale?page='+(n+1);
						$.post(url,function(data){
							var html='';
							if(data.status==true){
								n++;
								triggerEventNum++;//商品曝光需要用到
								if(n>=data.msg){n=0}
								$.each(data.data,function(){
									var _this =this;
									html+='<li class="after">\
									<div class="ms after">\
									<p class="p1">\
									<span class="s1"><a href="'+_this.url+'"  target="_blank">'+_this.name+'</a></span><br>\
									<span class="s2">成交量：'+_this.record+'笔</span>\
									</p>\
									<p class="p2"><em>¥</em>'+_this.price+'</p>\
									</div>\
									<div class="img"><a href="'+_this.url+'" target="_blank"><img src="'+_this.image+'" width="218" height="218"></a></div>\
									</li>';
									//triggerEventArry.push({id:_this.url.replace(/(.*\/)*([^.]+).*/ig,"$2")});//商品曝光需要用到
								});
								$zxrx.find('ul').html(html);
								index.lazyLoadImg($zxrx.find('.img img'));
							}
							flag=false;
						},'json');
						return false;
					})
				})();
				
				//感兴趣换一批
				(function(){
					var $change = $('.jsgxqpyp'),$yclkscrll=$('.yclk-scrll'),domai = location.host,n=1,flag = false;
					$change.on('click',function(){
						var $this = $(this);
						triggerEventArry=[];//商品曝光需要用到
						if(flag===true){return false;}//阻止表单重复提交
						flag=true;
						var url='//'+domai+'/default/GetHistoryProduct?page='+(n+1);
						$.post(url,function(data){
							var html='';
							if(data.status==true){
								n++;
								triggerEventNum++;//商品曝光需要用到
								if(n>=data.msg){n=0}
								$.each(data.data,function(){
									var _this =this;
									var speak = _this.speak=="Y"?"":"¥";
									html+='<li>\
									<p class="pic">\
									<a class="i" href="'+_this.url+'" target="_blank" title="'+_this.title+'"><img src="'+_this.pic+'" alt="'+_this.title+'" width="232" height="232"></a>\
									</p>\
									<div class="ms">\
									<p class="title"><a href="'+_this.url+'" target="_blank" title="'+_this.title+'">'+_this.title+'</a></p>\
									<p class="price">'+_this.price+'</p>\
									</div>\
									</li>';
									triggerEventArry.push({id:_this.url.replace(/(.*\/)*([^.]+).*/ig,"$2")});//商品曝光需要用到
								});
								//$yclkscrll.find('ul').html(html);
								index.lazyLoadImg($yclkscrll.find('.pic img'));
							}

							flag=false;
						},'json');
						return false;
					});
				})();
				

				//搜索框
				(function(){
					var $gsearch=$('.g_search');
					$gsearch.find('.xznr').hover(function(){
						$(this).addClass('hover');
						},function(){
						$(this).removeClass('hover');	
							});	
					$gsearch.find('.searchtxtwk').on({
						'mouseenter':function(){
						var $this=$(this);
						$('.zjss').data("show3",1);
								$.post('//www.csc86.com/default/GetSearchRecords',function(data){
					if(data.status==true){
						var html='';
						$.each(data.data,function(){
							var me=this;
							html+='<span><a href='+me.url+' target="_blank">'+me.name+'</a></span>';
							});
							$this.find('.zjss').find('.ms').html(html);
							if($this.find('.zjss').data("show")&&$this.find('.zjss').data("show3")&&$this.find('.zjss').data("show2")!=2){
							$this.find('.zjss').show();
							}
						}else{
						$this.find('.zjss').hide();
						}
					},'jsonp');

							return false;
						},
						'mouseleave':function(){
						$('.zjss').data("show3",0);
						$(this).find('.zjss').hide();
						}
						});		
						
					
					$gsearch.find('.xznr').on('click','.cur',function(){
						var $this=$(this);
						var $thisparen=$(this).parents('.xznr');
						var $thisurl=$this.data('url');
						var $thistext=$this.text();
						var $thissibl=$(this).siblings('p');
						var $thissiblurl=$thissibl.data('url');
						var $thissibltext=$thissibl.text();
						$this.parents('form ').attr('action',$thisurl);
						$this.removeClass('cur').siblings('p:first').addClass('cur');
						$thisparen.removeClass('hover');	
						if($this.text()=="公司"){
							$('.zjss').data("show2",2);
							$('#search-txt').attr('placeholder','请输入公司名称');
							}else{
								$('.zjss').data("show2",1);
								$('#search-txt').attr('placeholder','请输入产品名称')
								};
						});	
						
						
				if(!$(".max-banner").find("span").length){
					scrollfun(50);
					//scrollfun(122);
					}
					
					
								
				})();
				
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
					
					$.post('//www.csc86.com/default/BuycarInfo',function(data){
					if(data.status==true){
						if(data.data.carNum){
							$('.pppz').find('.num').text(data.data.carNum);
							//$('.scrolljhc').find('em').text(data.data.carNum);
							$('.pppz').find('.num').show();
							//$('.scrolljhc').find('em').show();
						}else{
							//$('.scrolljhc').find('em').remove();
							$('.pppz').find('.num').remove();
							}
						}else{
							//$('.scrolljhc').find('em').remove();
							$('.pppz').find('.num').remove();
						}
						
					},'jsonp');
					
					/*
					$(document).ready(function(){
    var $container = $('#con1_1');    
    $container.imagesLoaded(function(){
        $container.masonry({
            itemSelector: '.product_list',
            columnWidth: 5 //每两列之间的间隙为5像素
        });
    });
    
});


				   $('.ctgry-scnd-itm').eq(1).masonry({
					itemSelector : 'dl',
					columnWidth : 0
				  });  
				  
				  
				  					$('.ctgry-scnd-bd').eq(1).imagesLoaded(function(){
						$('.ctgry-scnd-itm').masonry({
					itemSelector : 'dl',
					columnWidth : 0
				  });
						})
						
						
				  */
					
					


				  

					
					
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
				
				
				//华南城最新团购
				(function(){
					var $hotzg=$('.hotzg');
					var $tgtitle =$hotzg.find('.tgtitle');
					var $zxtg = $hotzg.find('.zxtg');
					
					var $hotzg=$('.hotright');

					var tgtitleHoverNum=0;//商品曝光埋点需要用到
					 $tgtitle.on('mouseenter','li',function(){
						 var $this=$(this);
						 var $thisindex =  $this.index();
						 triggerEventArry=[];//商品曝光埋点需要用到
						 triggerEventNum++;//商品曝光埋点需要用到
						 $this.addClass('cur').siblings().removeClass('cur');	
						 $zxtg.eq($thisindex).addClass('cur').siblings('.zxtg').removeClass('cur');
						 $.each($zxtg.eq($thisindex).find('img'),function(){
							 var $this=$(this);
							if (!$this.attr('src')||$this.data('original')) {
								// 图片动态载入
								$this.attr("src", $this.data("original"));
							}
							$this.removeAttr("data-original");
							 triggerEventArry.push({id:$this.parents("a:first").attr('href').replace(/(.*\/)*([^.]+).*/ig,"$2")});
						 });
						 //商品曝光(注意同一个页面不可以出现名字相同的跟踪器)
						 if(typeof cscgaMd == 'object') {
							 cscgaMd.commodityExposure.noScrollEvent('pc', triggerEventNum, triggerEventArry);
						 }
					 })	;
						 
					  $hotzg.on('mouseenter','li',function(){
						 var $this=$(this);
						 $this.addClass('hover').siblings().removeClass('hover');
						 })	;	
						 
						 
						 $('.bgqy-lst').on({ 
								mouseenter: function() { 
									 $(this).find('.blackbgab').stop().fadeIn(250);
								}, 
								mouseleave: function() { 
									 $(this).find('.blackbgab').stop().fadeOut(200);	 
								}
								},'li');
							
				 
						 
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
										$this.removeAttr("data-original");
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
							prevBtn:$prev,
							beforeSwitch:function(i,n){
									var $img=$cscwl.find('.cscwl-lst img');
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
					},function(){
						$('.cgsc-lbk').hide();
					});
					$('.cgsc-lbk').find('li').hover(function(){
						$(this).addClass('cur');
					},function(){
						$(this).removeClass('cur');
					});	
				})();
				//其他行业点击显示与隐藏切换 新增改版王雪莲
				(function(){
					var isShow=false;
					$(".show-btn").on("click",function(){
						if(isShow){
							$(".showHideContent").css("display","none");
							$(this).find(".showHideIndex").addClass("show").removeClass("hide").end().find("span").html("展开更多版块").end().insertBefore(".showHideContent");
							isShow=false;
						}else{
							$(".showHideContent").css("display","block");
							$(this).find(".showHideIndex").removeClass("show").addClass("hide").end().find("span").html("收起").end().insertAfter(".showHideContent");
							isShow=true;
						}
					})
				})();
				//购物车换颜色 新增改版王雪莲
				(function(){
					$('.pppz .gwc').hover(function(){
						$(this).addClass("orange").parents(".pppz").find(".num").addClass("orangeNum")
					},function(){
						$(this).removeClass("orange").parents(".pppz").find(".num").removeClass("orangeNum")
					});

				})();
				/*
				//您可能感兴趣的商品
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
			//$('#zx_sidebar').append('<div class="g-back g-dn">'+
			//'<a class="scrollzx" href="http://p.qiao.baidu.com/cps/chat?siteId=2211581&userId=5784152" target="_blank">'+
			//'<img src="image/sq-12.png" width="24" height="24"><br>在线咨询</a>'+
			//'<a class="scrolljhc"  href="https://i.csc86.com/carDetail"><img src="image/sq-11.png" width="24" height="20"> <br>进货车<em></em></a>'+
			//'<a class="scrollwx" href="javascript:;" ><img src="image/sq-13.png" width="31" height="24"><br>微信</a>'+
			//'<a class="scrolltop"  href="javascript:;"><img src="image/sq-14.png" width="22" height="24"><br>返回顶部</a>'+
			//'<div class="g-code g-dn"><img src="/themes/classic/css/qrcode_2caeaadc4175cadea6201c428ee65f4b.png" alt="" width="150" height="150" /></div>'+'</div>')
			//$('.g-back').addCss().goBack(true); //右边侧边栏返回调用的JS
			
			//index.shopcart(); //购物车 采购单
			
			index.category(); //全部类目
			
			index.indexSwitch();//首页轮播和tab切换相关js
			
			index.stscItm();//华南城实体市场选择地方站中具体区域时的tab切换
			
			index.jydt(); //交易动态信息
			
			index.lazyLoadImg($('img'));//图片懒加载

			
			//index.sssj(); //搜索实景
		}
	};
	index.headB();
	index.init();
});