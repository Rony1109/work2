define(function(require, exports, module) {
	var isLoginObj=require('m/newtopnav/js/init.js');
	require('m/newsearch/js/init.js');
	require('m/back-top/js/init.js');
	require('m/bot-rightcopy/js/init.js');
	require('l/jQueryCookie/1.4.1/jquery.cookie.js');//cookie插件
	var prcNum=require('l/priceNum/js/priceNum.js');
	var addPlut=prcNum.addPlut;
	var isLogin=isLoginObj.status;//是否登录 true为登录 false为未登录
	var memberId=isLoginObj.data.id;//登录的会员id
	//console.log(memberId);
	var isSubmit=false;
	
    var $jticon=$(".jt-icon");
	$jticon.hide();
	
	var cgmall={
		//购物车
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
				$urle=$('.shopcart-hd').attr('data-url');
				//alert($urle);
				$.get($urle,function(data){
					if(data.status==false)
					{
						return;
					}
					var	len=data.data.length;
						//totalMoney=0;
						
					/*proHtml+='<div class="shopcart-pro"><table class="shopcart-tbl"><colgroup><col width="50" /><col width="90" /><col width="80" /><col width="30" /></colgroup>';
					if(len>0){
						$.each(data,function(i,n){
							//console.log(data[0]);//return false;
							var priceRange=data[i]['price_interval'];
							//var priceRange=data[i]['detail_list']['price_interval'];
							
							var lstObj=data[i]['detail_list'];
							totalMoney+=data[i].totleMoney*100;
							proHtml+='<tbody data-proinf=\'{"priceRange":'+priceRange+'}\'>';
							$.each(lstObj,function(i,n){
								var imgUrl='//img.csc86.com'+lstObj[i]['image'],
									num=lstObj[i]['quantity'],
									price=lstObj[i]['line_money'],
									title=lstObj[i]['productName'],
									lineId=lstObj[i]['detail_id'],
									carId=lstObj[i]['car_id'],
									property=lstObj[i].property,
									propertyTxt=property?'( '+property+' )':'';
								proHtml+='<tr data-carid="'+carId+'" data-lineid="'+lineId+'">'+
									'<td>'+
										'<a class="i" title="'+title+' '+propertyTxt+'"><img src="'+imgUrl+'" alt=""/></a>'+
									'</td>'+
									'<td>'+
										'<em class="num">'+num+'</em>'+
										'<span class="num-opts"><i class="'+(num === 1 ? 'no-plut-opt':'plut-opt')+'">-</i><input class="g-w50 ipt-txt" type="text" name="returnDays" value="'+num+'" data-default="'+num+'"/><i class="add-opt">+</i></span>'+
									'</td>'+
									'<td><em class="price">'+price+'</em></td>'+
									'<td><a class="del" href="" title="删除">&times;</a></td>'+
								'</tr>';
							});
							
							proHtml+='</tbody>';
						});
						proHtml+='</table></div>';
						totalMoney=Math.round(totalMoney)/100;
						proHtml+='<div class="shopcart-cz">'+
									'<p>合计：</p>'+
									'<p class="price"><em>&yen;</em><span class="jsTtlPrc">'+totalMoney+'</span></p>'+
									'<p><a class="seecgd-abtn" href="//i.csc86.com/carDetail" target="_blank">查看采购单</a></p>'+
								'</div>';
					}else{
						proHtml='<p class="g-ffy no-pro">您还没挑选任何商品；<br/>赶快去选购吧！</p>';
					}*/
					//$shopcartBd.html(proHtml);
					$shopcartHdNum.html(len);	
				},'json');
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
		//采购商城首页
		index:function(){
			/*商品分类*/
			cgmall.category();
			
			/*在线交易开通判断*/
			var $zxjySttcAbtn=$('.zxjy-sttc-abtn span');
			if (isLogin) {//已登录时
				$.get('//www.csc86.com/api.php?op=trade_status&act=isOnlineTrade&memberId='+memberId,function(data){//判断是否开通在线交易
					var status=data.status;
					var html='';
					
					//-3未开通 -2审核不通过
					if(status===-3||status===-2){
						$zxjySttcAbtn.html('商家入驻请进');
					}
					
					//-1为审核中 1为已开通
					if(status===-1||status===1){
						$zxjySttcAbtn.html('查看商城介绍');
					}
				},'json');
				
			}else{//未登录时
				$zxjySttcAbtn.html('商家入驻请进');
			}
			
			/*返回头部*/
			$('.g-back').addCss().goBack();
			
			/*我是采购商、买卖入门*/
			$('.cgs-mmrm-hd').on('click','li',function(){
				var $this=$(this),
					$cgsMmrmBd=$('.cgs-mmrm-bd'),
					index=$this.index();
				$this.addClass('cur').siblings().removeClass('cur');
				$cgsMmrmBd.addClass('g-dn').eq(index).removeClass('g-dn');
			});
			
			//图片懒加载
			require.async('l/lazyload/1.9.1/jquery.lazyload.js',function(){
				$('img.lazy').lazyload({
					effect : "fadeIn"
				});
			});
			
			/*购物车*/
			cgmall.shopcart();
			
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
				
				//精选推荐滚动
				(function(){
					var $jsScrllBox=$('.jsScrllBox'),
						$prev=$jsScrllBox.find('.prev'),
						$next=$jsScrllBox.find('.next'),
						$li=$jsScrllBox.find('.kgpro-lst li'),
						len=$li.length;
					if(len>0){
						$jsScrllBox.cscSwitch('.jsScrllBox .kgpro-lst li',{
							effect:'scroll',
							steps:4,
							visible:4,
							nextBtn:$next,
							prevBtn:$prev,
							onSwitch:function(i,n){
								var $img=$jsScrllBox.find('.kgpro-lst img');
								$img.each(function(){
									var $this=$(this);
									if (!$this.attr('src')||$this.data('original')) {
										// 图片动态载入
										$this.attr("src", $this.data("original"));	
									}
									$this.removeAttr("data-original");
								});
							}
						}).carousel().autoplay();
					}
					if(len>4){
						$prev.show();
						$next.show();
					}else{
						$prev.hide();
						$next.hide();
					}
				})();
				
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
				})();
			})
		}
	};
	module.exports=cgmall	
});

/*var json='{"status":true,"msg":"\u6210\u529f\u83b7\u53d6\u6570\u636e","data":[{"id":"60142b81-9c1c-4460-82eb-43e1164ec6c5","pic":"http:\/\/img.csc86.com\/product\/2014\/08\/21\/201408215750018.jpeg","price":"\uffe50.10","speak":"N","systemSubmain":"shop13134778","title":"\u5f02\u578b\u78c1\u94c1 \u5f3a\u529b\u78c1\u94c1 \u9495\u94c1\u787c\u5f3a\u78c1","url":"http:\/\/shop13134778.csc86.com\/product\/60142b81-9c1c-4460-82eb-43e1164ec6c5.html","browseTime":"2016-03-02 17:03:23"}]}';
						var dar=jQuery.parseJSON(json); 
						
	$.each(dar.data,function(i,n){
						
						var result=dar.data[i],	
						url=result.url;
						console.log(url);*/
							/*var result=dar[i],
								url=result['url'],
								pic=result['pic'],
								title=result['title'],
								price=result['price'];
							html+='<li>'+
									'<p class="pic">'+
										'<a class="i" href="'+url+'" target="_blank" title=""><img data-original="'+pic+'" alt="'+title+'"/></a>'+
									'</p>'+
									'<p class="title"><a href="'+url+'" target="_blank" title="'+title+'">'+title+'</a></p>'+
									'<p class="price">'+price.replace(/￥/g,"<em>&yen;</em>")+'</p>'+
								'</li>';*/
						//});