/*
*订单抽奖相关js
*/
define(function(require, exports, module) {
	
	var orderPrize={
		/**
		*获取中奖名单和订单抽奖函数公用默认参数
		**/
		opts:{
			huodId:10//huodid为抽奖活动id(直接由运营提供)
		},
		
		/**
		*获取中奖名单
		**/
		getWinners:function(options){
			//获取中奖名默认参数，实际调用时以下参数均为必填项，因目前未做处理，以下若有一项未填js会报错
			var opts={
				wnnrsLst:$("#wnnrsLst"),//代表存放中奖列表的容器
				num:9//当中奖名单数量大于此数量时向上滚动
			}
			
			opts=$.extend({},orderPrize.opts,opts,options);
			
			var huodId=opts.huodId,
				$wnnrsLst=opts.wnnrsLst,
				num=opts.num,
				loadingHtml='<li class="tips">加载中...</li>',
				errorHtml='<li class="error-tips">加载失败，请刷新页面后重试！</li>'
			
			$.ajax({
				url:"http://api.csc86.com/newestlottery/getHit",
				data:{huodid:huodId},
				dataType:"jsonp",
				beforeSend:function(){
					$wnnrsLst.html(loadingHtml);
				},
				success:function(data){
					if(data.status===true){
						var result=data.data,
							li="";
						$.each(result,function(i,n){
							var awards=n.awards,
								drawtime=n.drawtime,
								account=n.account,
								len=account.length;
							if (account.length > 2) {
								account = account.substring(0,1) + "***" + account.substring(len-1, len);
							} else {
								account = account.substring(0,1) + "***";
							}
							li+='<li><span class="n">'+account+'</span><span class="p">'+awards+'</span><span class="d">'+drawtime+'</span></li>';
						});
						$wnnrsLst.html(li);
						
						//当中奖名单数量大于num时向上滚动
						var $li=$wnnrsLst.find("li"),
							h=$li.eq(0).height(),
							scrollTimer;
						if($li.length>num){
							$wnnrsLst.hover(function() {
								clearInterval(scrollTimer);
							}, function() {
								scrollTimer = setInterval(function() {
									$wnnrsLst.animate({
										"marginTop": -h + "px"
									}, 600, function() {
										$wnnrsLst.css({
											marginTop: 0
										}).find("li:first").appendTo($wnnrsLst);
									})
								}, 3000);
							}).trigger("mouseleave");
						}
					}
					//系统异常时
					else {
						$wnnrsLst.html(errorHtml);
					}
				},
				error:function(){
					$wnnrsLst.html(errorHtml);
				}
			});
			
		},
		
		/**
		*弹窗公用框架(type为0代表警告提示框，1代表中奖提示框，2代表基本提示框)
		**/
		dialogFrame:function(type,c,callback){
			var className,html;
			if(type===0){
				className="prize-warn-pop";
			}
			if(type===1){
				className="prize-wnnrs-pop";
			}
			if(type===2){
				className="prize-tips-pop";
			}
			
			html='<div class="prize-pop '+className+'">'+
						'<div class="mask"></div>'+
						'<div class="bd">'+
							'<p class="bg"></p>'+
							'<div class="c">'+
								
							'</div>'+
						'</div>'+
					'</div>',
			$prizePop=$("."+className),
			callback=callback||function(){};
			
			if(!$prizePop[0]){
				$("body").append(html);
				$prizePop=$("."+className);
			}

			$prizePop.find(".c").html(c);
			
			$prizePop.on("click",".close",function(){
				$prizePop.remove();
			});
			
			//执行回调函数
			callback();	
		},
		
		/**
		*警告提示框
		**/
		dialogWarn:function(msg){
			var html='<span class="close">&times;</span><p class="tips">'+msg+'</p>';
			orderPrize.dialogFrame(0,html);
		},
		
		/**
		*基本信息提示框
		**/
		dialogTips:function(msg){
			var html='<span class="close">&times;</span><p class="tips">'+msg+'</p>';
			orderPrize.dialogFrame(2,html);
		},
		
		/**
		*中奖提示框
		**/
		dialogWnnrs:function(pro,callback){
			var html='<form id="wnnrsInfFrm"><div class="wnnrs-pop-bd">'+
					'<p class="czpro">抽中'+pro+'！</p>'+
					'<p class="inf-hd">请填写有效联系方式<br/>奖品将于活动结束后7个工作日内发放。</p>'+
					'<ul class="inf-lst">'+
						'<li><span>姓名：</span><input id="linkman" class="ipt-txt" type="text" name="linkman" value=""/></li>'+
						'<li><span>电话：</span><input id="phone" class="ipt-txt" type="text" name="phone" value=""/></li>'+
						'<li><span>地址：</span><input id="address" class="ipt-txt" type="text" name="address" value=""/></li>'+
					'</ul>'+
					'<p class="cz"><input class="wnnrs-inf-smt" type="submit" value=""/></p>'+
				'</div></form>';
			orderPrize.dialogFrame(1,html,callback);
		},
		
		/**
		*抽奖转动
		*obj奖品列表中的每一项（包括未中奖的那些项）
		*minCycle为跑的圈数
		*prizeLen代表奖项数量（包括未中奖的情况）
		*result代表转动后停留的位置
		*callback为回调函数
		**/
		scrolling:function(obj,minCycle,prizeLen,result,callback){
			var count=1,
				i=0,
				speed=150,
				num=-1,
				timer,
				callback=callback||function(){};
			clearInterval(timer);
			//$prizeLi.removeClass("opacity");
			obj.addClass("opacity");
			obj.eq(0).removeClass("opacity");
			
			(function move(){
				timer=setTimeout(function(){
					if(count<=minCycle){
						obj.eq(i).addClass("opacity");
						(i==prizeLen-2) && (count++);
						i<prizeLen-1 ? i++ : i=0;
						obj.eq(i).removeClass("opacity");
						
						//调节速度，保证开始慢，结束慢
						if(count == minCycle && result<6 && i>=prizeLen-1-(6-result)){
							speed<200 ? speed+=40 : speed=200;
						}else{
							speed<50 ? speed=50 : speed-=10;
						}
						move();
					}else{
						//调节速度，保证开始慢，结束慢
						(result<=6) && (speed<200 ? speed+=40 : speed=200);
						(result>6 && num>=5) && (speed<200 ? speed+=40 : speed=200);
						
						//num值为确定结果的值，来判断什么时候停止
						if(num<result-1){
							obj.eq(i).addClass("opacity");
							i<prizeLen-1 ? i++ : i=0;
							num=i;
							obj.eq(i).removeClass("opacity");
							move();
						}else{
							callback();	
						}
					}
				},speed)
			})();
		},
		
		/**
		*订单抽奖函数
		**/
		prize:function(options){
			
			//抽奖默认参数，实际调用时以下参数均为必填项，因目前未做处理，以下若有一项未填js会报错
			var opts={
				prizeBtn:null,//代表抽奖按钮
				prizeLst:null,//奖品列表容器
				minCycle:6,//代表跑的圈数
				isAllPrize:false,//代表是否包含谢谢参与，即无需在后台设置的奖项，若将此设置为true,则notWin可不设置，设置了也用不上（但也不会出问题），为true代表不存在谢谢参与的项,若设置为false则 notWin必须设置且需指明不在后台设置的项的位置
				notWin:[1,4,7,10]//代表未中奖项的位置
			}
			
			opts=$.extend({},orderPrize.opts,opts,options);
			
			var $prizeBtn=opts.prizeBtn,
				$prizeLst=opts.prizeLst,
				$prizeItm=$prizeLst.children(),//奖品列表中的每一项（包括未中奖的那些项）
				$orderId=opts.orderId,//代表输入订单号的文本框
				prizeLen=$prizeItm.length,//代表奖项数量（包括未中奖的情况）
				minCycle=opts.minCycle,
				huodId=opts.huodId,
				isAllPrize=opts.isAllPrize,
				notWin,
				sNotWin;
			if(!isAllPrize){	
				notWin=opts.notWin;
				sNotWin=notWin[Math.floor(Math.random() * notWin.length)];//随机抽取一个未中奖项的位置
			}
			isPrizing=false;
			
			$prizeBtn.on("click",function(){
				var $this=$(this),
					orderId=$.trim($orderId.val());
				if(isPrizing===true){return false;}//阻止连续点击按钮重复抽奖
				
				
				$.ajax({
					url:"http://api.csc86.com/newestlottery/orderDraw",
					data:{orderId:orderId,huodid:huodId,isAllPrize:isAllPrize},
					type:"post",
					dataType:"jsonp",
					success:function(data){
						var No=data.No;
						
						//未登录
						if(No===-1){
							location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
						}
						//已登录
						else{
							
							//未输入订单号时
							if(!orderId){
								orderPrize.dialogWarn("请输入订单号！");
								return false;
							}
							
							isPrizing=true;
							
							switch(No){
								case -3:
								orderPrize.dialogWarn("亲，活动已经结束，不能抽奖了哦！");
								break;
								case -4:
								orderPrize.dialogWarn("抽奖活动还未开始哦！");
								break;
								case -7:
								orderPrize.dialogWarn("该订单号已经中过奖啦！");
								break;
								case -8:
								orderPrize.dialogWarn("该订单号已经抽过奖啦！");
								break;
								case -9:
								orderPrize.dialogWarn("系统查询不到您的订单，请继续购物哦！");
								break;
								case -14:
								orderPrize.dialogWarn("亲，你迟到了，奖品已全部抽完！");
								break;
								case -15:
								orderPrize.dialogWarn("该订单尚未交易完成，不能参与抽奖！");
								break;
								case -16://订单不是活动时间内的订单
								orderPrize.dialogWarn("该订单不能参与抽奖！");
								break;
								case -17:
								orderPrize.dialogWarn("亲，低于"+data.data.minMoney+"元的订单不能参与抽奖哦！");
								break;
								case -18://未付款
								orderPrize.dialogWarn("该订单不能参与抽奖！");
								break;
								case -19://订单完成时间不在活动范围内
								orderPrize.dialogWarn("该订单不能参与抽奖！");
								break;
								case -20://订单付款时间不在活动范围内
								orderPrize.dialogWarn("该订单不能参与抽奖！");
								break;
								case -21://订单已取消
								orderPrize.dialogWarn("该订单已取消，不能参与抽奖！");
								break;
								case 0://未抽中奖品的情况(只有当isAllPrize设置为false时后台才会返回0的情况)
								orderPrize.scrolling($prizeItm,minCycle,prizeLen,sNotWin,function(){
									orderPrize.dialogWarn("很遗憾，未中奖！感谢您的参与！");
								});
								break;
								default://中奖的情况
								var resultData=data.data,
									result=resultData.id;
									
								orderPrize.scrolling($prizeItm,minCycle,prizeLen,result,function(){
									orderPrize.dialogWnnrs(resultData.awards,function(){
										var isSubmit=false,
											$wnnrsInfFrm=$("#wnnrsInfFrm");
										$wnnrsInfFrm.on("submit",function(){
											var linkman=$.trim($("#linkman").val()),
												phone=$.trim($("#phone").val()),
												address=$.trim($("#address").val());
											
											if(!linkman){
												orderPrize.dialogWarn("请输入姓名！");
												return false;
											}
											if(!phone){
												orderPrize.dialogWarn("请输入正确的电话号码！");
												return false;
											}
											if(!address){
												orderPrize.dialogWarn("请输入详细的收货地址！");
												return false;
											}
											
											var	dadaObj={
												orderId:orderId,
												linkman:linkman,
												phone:phone,
												address:address,
												huodid:huodId
											};
											
											if(isSubmit===true){return false;}//阻止连续点击按钮重复抽奖	
											
											$.ajax({
												url:"http://api.csc86.com/newestlottery/writeContact",
												data:dadaObj,
												type:"post",
												dataType:"jsonp",
												success:function(data){
													if(data.status){
														$(".prize-wnnrs-pop").remove();
														orderPrize.dialogTips('<span style="color:#069f2a;">信息提交成功</span>');
													}else{
														orderPrize.dialogWarn("提交失败，请刷新页面后重试！");
													}
												},
												error:function(){
													orderPrize.dialogWarn("系统错误，请刷新页面后重试！");
												},
												complete:function(){
													isSubmit=false;
												}
											});
											return false;
										});
									});
									//isPrizing=false;
								});
								break;
							}
						}
					},
					error:function(){
						orderPrize.dialogWarn("系统错误，请刷新页面后重试！");
					},
					complete: function(){
						isPrizing=false;
					}
				});
			});
		},
		
		/**
		*订单抽奖整体的入口函数
		**/
		init:function(huodId){
			
			//获取中奖名单
			orderPrize.getWinners({
				huodId:huodId //huodid为抽奖活动id(直接由运营提供)
			});
			
			//执行抽奖（有谢谢参与的情况）
			orderPrize.prize({
				prizeBtn:$("#prizeBtn"),//代表抽奖按钮
				prizeLst:$("#prizeLst"),//奖品列表容器
				orderId:$("#orderId"),//代表订单号
				huodId:huodId,//huodid为抽奖活动id(直接由运营提供)
				isAllPrize:false,//代表是否包含谢谢参与，即无需在后台设置的奖项，若将此设置为true,则notWin可不设置，设置了也用不上（但也不会出问题），为true代表不存在谢谢参与的项,若设置为false则 notWin必须设置且需指明不在后台设置的项的位置
				notWin:[1,4,7,10]//代表未中奖项的位置
			});
			
			//执行抽奖（无谢谢参与的情况）
			/*orderPrize.prize({
				prizeBtn:$("#prizeBtn"),//代表抽奖按钮
				prizeLst:$("#prizeLst"),//奖品列表容器
				orderId:$("#orderId"),//代表订单号
				huodId:huodId,//huodid为抽奖活动id(直接由运营提供)
				isAllPrize:true//代表是否包含谢谢参与，即无需在后台设置的奖项，若将此设置为true,则notWin可不设置，设置了也用不上（但也不会出问题），为true代表不存在谢谢参与的项,若设置为false则 notWin必须设置且需指明不在后台设置的项的位置
			});*/
			
		}
	}
	
	orderPrize.init(10);
});