/*
 * 抽奖
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
		'comment': 'm/comment/js/init.js',
		'dialog':'m/dialog/js/init.js',
		'scroll':'./scroll.js'
		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
	require('http://res.csc86.com/f=js/m/config.js');		
    require('top');
    require('header');
	require('scrollLoading');
	require('scroll');
	require('http://res.csc86.com/f=js/m/config.js,v2/l/artDialog/4.1.7/jquery.artDialog.js,v2/l/artDialog/4.1.7/plugins/iframeTools.source.js,js/m/dialog.js');
 	seajs.use(csc.url("res", "/f=js/m/sign"));
	require.async('placeholder', function(m) {
				m.placeholder('.dh');
			});
	
    var comment = require('comment');
	 
	 (function(){
		var arry=[];
		var fix=$('.fix');
		var fix2cj=$('.fix2cj');
		var fixcj=$('.fixcj');
		var fix2cjtop = fix2cj.offset().top;
		var fixscroll=fix.find('.fixscroll');
		$('.fix2scroll').each(function(){
            arry.push($(this).offset().top);
        });
		
		$(window).scroll(function(){
			var _top=$(this).scrollTop();
			_top>=500?fix.fadeIn():fix.fadeOut();
			
			for(var i=0;i<=arry.length;i++){
				if(_top>=arry[i]-200&&_top<=arry[i+1]){
					fixscroll.eq(i).addClass('active').siblings().removeClass('active');
					
				}
			}
							if(_top>=arry[arry.length-1]-400){
					
					fixscroll.eq(arry.length-1).addClass('active').siblings().removeClass('active');
				} 
		});
		fix.find('.fixscroll').on('click',function(){
			var _index=fix.find('.fixscroll').index(this);
			$('html,body').animate({scrollTop:arry[_index]},500);
			return false;
		});
		fixcj.on('click',function(){
			$('html,body').animate({scrollTop:fix2cjtop},500);
			return false;
			});
		
	})();
	
		$('.fixtop').on('click',function(){
		$('html,body').animate({scrollTop:0},500);
		return false;
		
	});
		$('.globalcont.gcont2 li,.globalcont.gcont3 li').hover(function(){$(this).css("border-color","#f32f05");},function(){$(this).css("border-color","#fbc932");});
 
	
	$(".imgloading").scrollLoading();
	
	if ($('.jsHtNum')[0]) {
		$.get("http://quan.csc86.com/circle/api/info?id=5eb49f62-3660-4863-a38d-1a7fa579e4c9", function(data) {;
			$('.jsHtNum').html('<span>' + data.data.memberSum + '<br/>成员</span><span>' + data.data.topicCount + '<br/>话题</span>');
		}, "jsonp");
	}
	

$.ajax({
					//url:'//special.csc86.com/2015/11y/cgsy/js/data2.txt',
					url:'//api.csc86.com/newlottery/getHit',
					data:{},
					type:'post',
					//dataType:'json',
					dataType:'jsonp',
					beforeSend:function(){
						$(".cjcontent .rcon").html('<p class="loading">加载中...</p>');
					},
					success:function(data){
						if(data.status===true){
							var cons="";
$.each(data.data,function(){
	var _this= this;
	cons+='<li class="after"><span class="s1">'+this.account+'</span><span class="s2">'+this.awards+'</span><span class="s3">'+this.drawtime+'</span></li>';
	});

$(".cjcontent .rcon").html(cons);
						}
						//系统异常时
						else{
						$(".cjcontent .rcon").html('<p class="loading">加载失败，请刷新页面后重试！</p>');
						}
						
					},
					//请求异常时
					error:function(){
						$(".cjcontent .rcon").html('<p class="loading">加载失败，请刷新页面后重试！</p>');
					}
				});	
	// 评论
	comment.init('9dc970cc-689d-481e-9d11-605d4e533ad8',$('#JComment'),{pn:2});
	
	
	(function($, window, document,undefined){
		    var EventUtil={
                addHandler:function(element,type,handler){
                        if(element.addEventListener){
                                element.addEventListener(type,handler,false);
                        }else if(element.attachEvent){
                                element.attachEvent("on"+type,handler);
                        }else{
                                element["on"+type]=handler;
                        }
                },
                removeHandler:function(element,type,handler){
                        if(element.removeEventListener){
                                element.removeEventListener(type,handler,false);
                        }else if(element.detachEvent){
                                element.detachEvent('on'+type,handler);
                        }else{
                                element["on"+type]=null;
                        }
                }
            }	

			function extend(obj,obj1){
				for(var attr in obj1){
					obj[attr]=obj1[attr];
				}
				return obj;
			}

			function addClass(element,value){
				if(!element.className) {
					element.className = value;
					} else {
					var newClassName = element.className;
					newClassName += " ";
					newClassName += value;
					element.className = newClassName;
				}					
			}
		
			function removeClass(obj,cn){
				return obj.className = obj.className.replace(new RegExp("\\b"+cn+"\\b"),"");
			}
			
			var dialogs=function dialogs(content,cancel,fun1,fun2,id){
				$("#cjbtn").data({stop:1});	
				$.dialog({
											id: id||'chouj',
											cancel:cancel&&null,
											title: false,
											background: '#000', 
											content: content||"",
											fixed: true,
											lock: true,
											opacity: .85,
											init: fun1||null,
											close: fun2|| null
		});
	};
	
			
			function isType(type){
				return function(o){
					return Object.prototype.toString.call(o) === '[object ' + type + ']';
				}
			}			
			var isString = isType("String");
			var isObject = isType("Object");
			var isArray = isType("Array");

			
			function Game(opt){
				this.btn=opt.btn,
				this.gameList=opt.gameList,
				this.list=$(this.gameList).find(".cj p"),
				this.max=this.list.length,
				this.minCycle=opt.minCycle, 
				this.winResult, 
				this.timer,
				this.init();
			}
			
			Game.prototype={
				addOpacity:function(obj,classname){
					if(typeof obj.length != "undefined"){
						for(var i=0,len=obj.length;i<len;i++){
							addClass(obj[i],classname);
						}					
					}else{
						addClass(obj,classname);
					}
				},
				removeOpacity:function(obj,classname){
					if(typeof obj.length != "undefined"){
						for(var i=0,len=obj.length;i<len;i++){
							removeClass(obj[i],classname);
						}					
					}else{
						removeClass(obj,classname);
					}				
				},
				init:function(){
				var self=this;
				$("#cjbtn").data({stop:1});
					EventUtil.addHandler(self.btn,"click",function(){
					if($("#cjbtn").data("stop")==1){
					$("#cjbtn").data({stop:0});
					var $chouj=$(".chouj");
					var $choujdh=$chouj.find(".dh").val();	
					var $cjbtn=$("#cjbtn");
					
						$.ajax({
					url:'//api.csc86.com/newlottery/orderDraw',
					data:{orderId:$choujdh},
					type:'post',
					dataType:'jsonp',
					beforeSend:function(){
						
					},
					success:function(data){
						//登陆
						if(data.No==-1){
				csc.checkSign("location.reload");
						}else{
				if(!$choujdh){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">请输入订单号！</p></div>');
						return false;
					};				
				var No=data.No;
							
				if(No==-9){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">系统查询不到您的订单，请继续购物哦！</p></div>');
						return false;
					};
				if(No==-14){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">亲，你迟到了，奖品已全部抽完！</p></div>');
					return false;
					};	
				if(No==-3){
					dialogs('<div class="dhno"><img src="image/hdjs.png"><p class="p2">亲，活动已经结束，不能抽奖了哦！</p></div>');
						return false;
					};	
				if(No==-8){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">该订单号已经抽过奖啦！</p></div>');
						return false;
					};		
				if(No==-9){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">该订单号不存在！</p></div>');
						return false;
					};
				if(No==-7){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">该订单号已经中过奖啦！</p></div>');
						return false;
					};	
				if(No==-15){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">该订单尚未交易完成，不能参与抽奖!</p></div>');
						return false;
					};	
				if(No==-16){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">非活动期间的订单号不能抽奖!</p></div>');
						return false;
					};		
				if(No==-17){
					dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">亲，低于'+data.data.minMoney+'元的订单不能参与抽奖哦！</p></div>');
						return false;
					};			
		self.winResult =data.data.id;								
		var count=1,i=0,speed=150,result=self.winResult,num=-1;

						clearInterval(self.timer);
						self.removeOpacity(self.list,"active");
						self.addOpacity(self.list[0],"active");		
						(function move(){
							
							self.timer=setTimeout(function(){
								if(count<=self.minCycle){
									self.removeOpacity(self.list[i],"active");
									(i==8) && (count++);
									i<9 ? i++ : i=0;
									
									self.addOpacity(self.list[i],"active");
									
									if(count == self.minCycle && result<6 && i>=9-(6-result)){
										
										speed<200 ? speed+=40 : speed=200;
									}else{
										speed<50 ? speed=50 : speed-=10;
										
									}
									move();
									
								}else{
									
									(result<=6) && (speed<200 ? speed+=40 : speed=200);
									(result>6 && num>=5) && (speed<200 ? speed+=40 : speed=200);

 									if(num<result-1){
										
										self.removeOpacity(self.list[i],"active");
										i<9 ? i++ : i=0;
										num=i;
										
										self.addOpacity(self.list[i],"active");
										move();
									}else{
															
									dialogs('<div class="zj"><div class="con"><div class="jp after">'+data.data.awards+'</div><div class="title">请填写有效联系方式<br>奖品将于活动结束后7个工作日内发放。</div><div class="context after"><li class="after"><p class="info">姓名：</p><p class="p2"><input name="linkman" id="yname"  value="" placeholder="请输入您的姓名"></p></li><li class="after"><p class="info">电话：</p><p class="p2"><input name="phone" id="yphone" value="" placeholder="请输入您的电话"></p></li><li class="after"><p class="info">地址：</p><p class="p2"><input name="address" id="yaddress"  value="" placeholder="请输入您的地址"></p></li><li class="after"><input id="an2" class="an2" value="确认提交" type="submit"></li></div></div></div>',false,function(){
	var phoneRegx=/^1\d{10}$/;
	var $zj=$(".zj");
	var $tel=$("#yphone");
	var $yaddress=$("#yaddress");
	var $yname=$("#yname");
	var $an2=$(".an2");
	var $info=$zj.find(".info");
	var isSubmit=false;
		$tel.on('blur',function(){
		var $this = $(this);
		var _phone=$.trim($this.val());
		if(!phoneRegx.test(_phone)){
			$info.eq(1).addClass("red");
			$this.focus();
		}else{
			$info.eq(1).removeClass("red");
			}
		});
		$yaddress.on('blur',function(){
		var $this = $(this);
		var _yaddress=$.trim($this.val());
		if(!_yaddress){
			$info.eq(2).addClass("red");
			$this.focus();
		}else{
			$info.eq(2).removeClass("red");
			}
		});
		$yname.on('blur',function(){
		var $this = $(this);
		var _yname=$.trim($this.val());
		if(!_yname){
			$info.eq(0).addClass("red");
			$this.focus();
		}else{
			$info.eq(0).removeClass("red");
			}
	});
	
		$zj.on('click','.an2',function(){	
		if(!$.trim($yname.val())){
			$info.eq(0).addClass("red");
			$yname.focus();
			return false;
		}else{
			$info.eq(0).removeClass("red");
			}	
		if(!phoneRegx.test($.trim($tel.val()))){
			$info.eq(1).addClass("red");
			$tel.focus();
			return false;
		}else{
			$info.eq(1).removeClass("red");
			}
		if(!$.trim($yaddress.val())){
			$info.eq(2).addClass("red");
			$yaddress.focus();
			return false;
		}else{
			$info.eq(2).removeClass("red");
			}
			var datajsons={orderId:$choujdh,linkman:$yname.val(),phone:$tel.val(),address:$yaddress.val()};
		
$.ajax({
					url:'//api.csc86.com/newlottery/writeContact',
					data:datajsons,
					type:'post',
					dataType:'jsonp',
					beforeSend:function(){
						
					},
					success:function(data){
						if(data.status===true){
	var $zj=$(".zj");
	var $tel=$("#yphone");
	var $yaddress=$("#yaddress");
	var $yname=$("#yname");		
$.dialog.list['chouj'].close();
dialogs('<div class="dhno"><p class="p2">信息提交成功！</p></div>');

return false;
						}
						//系统异常时
						else{
							$.dialog.list['chouj'].close();
dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">提交失败，请刷新页面后重试！</p></div>');

return false;						
						}
						
					},
					//请求异常时
					error:function(){
						$.dialog.list['chouj'].close();
dialogs('<div class="dhno"><img src="image/bq.png"><p class="p2">系统错误，请刷新页面后重试！</p></div>');
return false;	
					}
				});	
			
		if(isSubmit===true){return false;}
		isSubmit=true;	
		
		
			
			});
							
										});
	
									}
								}
							},speed)
						})();

						}
						
					},
					//请求异常时
					error:function(){
	
					dialogs('<div class="dhno yc">系统异常，请刷新后重试！</p></div>');	

					}
				});
}
					});
				}
			}
			
			window.Game=Game;
			var lottery = new Game({
			btn:document.getElementById("cjbtn"),
			gameList:document.getElementById("cjlist"),
			minCycle:4
		});
		})(jQuery, window, document);
		
		var fx ='<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网">人人网</a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a><a href="#" class="bds_more" data-cmd="more"></a></div>';
		$(".fx").html(fx);
	
	window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
});
