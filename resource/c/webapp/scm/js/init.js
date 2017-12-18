/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'zepto': 'l/zepto/1.1.6/zepto.min.js?v=11277',
        'swiper':'../js/swiper.3.1.7.jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('zepto');	
	require('swiper');

	var screenHeight=document.documentElement.clientHeight,navHeight=$(".jnav").height();
	var pageNumber=20;//每页条数
	//加载数据  参数1:频道id，  参数2 （可选）:要加载第几页的数据 默认为1   
		
	var  initdata=function(channelId,pageNum){
		var page=pageNum || 1;//第几页
		// if(arguments[1]=="undefined") page=1;
		var listhtml='',ulobj=$('.slidecn[data-cn="'+channelId+'"]');
		if(ulobj.children("li.nodata").length ==0) ulobj.append('<li class="nodata"><p>暂无数据！</p></li>');
		$.ajax({
			type:"get",
			url:"http://info.csc86.com/api.php",
			dataType:"jsonp",
			data:{
				op:"market",
				catid:channelId,
				page:page,
				l:pageNumber
			},
			success:function(data){	
				if(data.status==1){					
					var catelist=data.data.cate_list,forcedata=data.data.force_data;			
					if(catelist.length>0){//有数据
						// console.log(data)
						if(ulobj.hasClass("emptydata")) ulobj.removeClass("emptydata")
						for(i=0;i<catelist.length;i++){//循环每条异步加载的数据  并填充dom							
							var id=catelist[i].id,title=catelist[i].title,thumb=catelist[i].thumb==""?"image/temple.jpg":catelist[i].thumb,url=catelist[i].url,catid=catelist[i].catid,descript=$.trim(catelist[i].descript)
;							if(channelId=="79"){
								listhtml+='<li class="datali fadeIn clearfix" style="animation-delay:0.'+i+'s"><a href="detail.html?arcid='+ id+'&'+catid+'" class="pro-link">\
												<img src="'+thumb+'" class="pro-sumb" alt="'+title+'">\
												<div class="pro-info">\
													<h3>'+title+'</h3>\
													<p>'+descript+'</p>\
												</div>\
											</a>\
										</li>';	
							}
							else{
								listhtml+='<li class="datali fadeIn clearfix" style="animation-delay:0.'+i+'s"><a href="detail.html?arcid='+ id+'&'+catid+'" class="pro-link">\
											<div class="pro-info noimg">\
												<h3>'+title+'</h3>\
												<p>'+descript+'</p>\
											</div>\
										</a>\
									</li>';	
							}
							
						}							
					}
					else{
						if(page==1) ulobj.addClass("emptydata");
					}	
					$.each($(".slidecn"),function(){//遍历所有内容（ul）节点，隐藏加载提示
						var _this=$(this);						
						if(_this.data("cn")==channelId){										
							_this.append(listhtml);
							_this.find($(".jload")).hide();	
							_this.children("li").each(function(){
								var tit=$(this).find("h3").text(),sumb=$(this).find("img").prop("src"),link=$(this).children("a").prop("href");
								$(this).children("a").on("click",function(e){
									e.preventDefault();
									if (window.WebViewJavascriptBridge) {
										window.WebViewJavascriptBridge.callHandler('showBackBtn',{"title":tit,"src":sumb,"link":link});
									}
									window.location.href=$(this).prop("href");
								});
							});
							var perlih=_this.children("li.datali").eq(0).height(),allheight=_this.children("li.datali").size()*perlih;
							var h=screenHeight >= allheight ? screenHeight-navHeight : _this.data("cn")==79 ? allheight+screenHeight*0.5:allheight;
							_this.data("ht",h);
						}
					});					
				}
			},
			error:function(){
				$.each($(".slidecn"),function(){//遍历所有内容节点，隐藏加载提示
					if($(this).data("cn")==channelId){
						$(this).find($(".load")).text("请求失败").append('<p><a href="javascript:;" class="reload" onClick=" initdata('+channelId+')">点击重新加载</a></p>');
					}
				});	
			}
		});
	};
	// 推荐图文
	var initThumb=function(){
		$.ajax({
			type:"get",
			url:"http://info.csc86.com/api.php",
			dataType:"jsonp",
			data:{
				op:"market",
				catid:"79"
			},
			success:function(data){
				//推荐
				// console.log(data)
				var forcedata=data.data.force_data,thumbhtml;
				if(forcedata.length > 0){
                                  if(forcedata.length ==1){
                                  	thumbhtml='<div class="swiper-wrapper">';
                                  	var tit=forcedata[0].title,url=forcedata[0].url,thumb=forcedata[0].thumb==""?"image/img1.jpg":forcedata[0].thumb,id=forcedata[0].id;
                                  	thumbhtml+='<div class="swiper-slide"><a href=detail.html?arcid='+id+' ><img src="'+thumb+'" alt="" style="max-height:'+screenHeight*0.5+'px"></a><p class="chtitle">'+tit+'</p></div>';
                                  	thumbhtml+='</div>';
                                  	$(".channel-focus1").prepend(thumbhtml);
                                  }
                                  else{
                                  	thumbhtml='<div class="swiper-wrapper">';
                                  	for(i=0;i<forcedata.length;i++){
                                  		var tit=forcedata[i].title,url=forcedata[i].url,thumb=forcedata[i].thumb==""?"image/img1.jpg":forcedata[i].thumb,id=forcedata[i].id;
                                  		thumbhtml+='<div class="swiper-slide"><a href=detail.html?arcid='+id+' ><img src="'+thumb+'" alt="" style="max-height:'+screenHeight*0.5+'px"></a><p class="chtitle">'+tit+'</p></div>';
                                  	}
                                  	thumbhtml+='</div>';
                                  	$(".channel-focus1").prepend(thumbhtml);
                                  	creatSwiper(Swiper,".channel-focus1",".channel-pagin1");
                                  	$(".channel-focus1").css("max-height",screenHeight*0.5+"px");
                                  }					
				}
				$(".swiper-slide").each(function(){
					var tit=$(this).find("p").text(),sumb=$(this).find("img").prop("src"),link=$(this).children("a").prop("href");
					$(this).children("a").on("click",function(e){
						e.preventDefault();
						if (window.WebViewJavascriptBridge) {
							window.WebViewJavascriptBridge.callHandler('showBackBtn',{"title":tit,"src":sumb,"link":link});
						}
						window.location.href=$(this).prop("href");
					});
				});
				
			}
		})
	};
	// 移除原数据
	var removedata=function(channelobj){
		channelobj.children("li").remove();
		channelobj.children(".jload").show();
		if(channelobj.children(".channel-focus1").children(".swiper-wrapper").length > 0){
			channelobj.children(".channel-focus1").children(".swiper-wrapper").remove();			
		}
	};
	// function goto(url) {
	// 	window.location.href = url;
	// }
	function setClass(i) {
		$("#thnav li").each(function(index, el) {
			if (index != i) {
				if ($(el).hasClass("active")) {
					$(el).removeClass("active");
				}
			} else {
				$(el).addClass("active");
			}
		});
	}
      var swiperNav,mySwiper;
      var swipimage;
      var creatSwiper=function(Swiper,spclassName,pgclassName){
      	swipimage=new Swiper(spclassName,{
      		pagination: pgclassName,
      		paginationClickable: true,
      		loop:true,
      	});
      };
      var linkArgu=GetQueryString("id") || $("#thnav li").eq(0).data("id");
      var curid;
      curid=linkArgu=="null"? 0:$('#thnav li[data-id="'+linkArgu+'"]').index();
      swiperNav = new Swiper('.jnav', {//初始化频道列表
		// pagination : '.pagination',
		initialSlide :curid,
		effects:"slide",
		speed:500,
		paginationClickable : true,
		slidesPerView : 4,
		onInit: function(sw){
			$(".bar").css("width",$("#thnav li").eq(0).width()).offset({
				left : 0
			});
			$("#jmenuall li").eq(curid).addClass("act");			
		}
      });
     mySwiper = new Swiper('.swiper-container', {//初始化内容
		// pagination : '.pagination',
		effects:"slide",
		speed:500,
		touchMoveStopPropagation : true,
		initialSlide :curid,
		direction : 'horizontal',
		onSlideChangeStart:function(sw){
			$(sw.slides[sw.activeIndex]).css("min-height",screenHeight-navHeight);
			var swidx = sw.activeIndex,scroto=$(sw.slides[sw.activeIndex]).data("scroll") || 0;
			swiperNav.slideTo(swidx, 300, function() {});
			smnav(swidx);
			setClass(swidx);
			if($(sw.slides[swidx]).data("ht")){
				$("#hqcnt").css("height",$(sw.slides[sw.activeIndex]).data("ht"));
			}
			 if (window.WebViewJavascriptBridge) {
			 	window.WebViewJavascriptBridge.callHandler('dealChannelId',$(sw.slides[sw.activeIndex]).data("cn"));
			 }			
			 $("#jmenuall li").siblings("li").removeClass("act");
			 $("#jmenuall li").eq(sw.activeIndex).addClass("act");
			 
			$("body").scrollTop(scroto);
		},
		onTouchMoveOpposite:function(sl,e){
			var diff=sl.touches.startY - sl.touches.currentY;
			// var bodyHeight=$("body").height();
			var bodyHeight=$(sl.slides[sl.activeIndex]).data("ht");
			if(Math.abs(diff)<=100){
				$(sl.wrapper).css("-webkit-transform",'translate3D('+sl.translate+'px,'+-diff+'px,0px)');
				if($("body").scrollTop()==0 && sl.swipeDirection!= "next"&&sl.swipeDirection!="prev"){
					$("#loadcir").css({
						"-webkit-transform":"scale("+Math.abs(diff)*0.01+")"
					});
					// console.log(Math.abs(diff)*0.01);
				}
				if($("body").scrollTop() ==bodyHeight-screenHeight){//滚动到底部{
					if($(sl.slides[sl.activeIndex]).children("li").length >5) {
						$("#deatlate").show();
					}
				}
			}
		},
		onTouchEnd:function(sl){
			var diff=sl.touches.startY - sl.touches.currentY;
			$(sl.wrapper).css({
				"-webkit-transform":'translate3D('+sl.translate+'px,0px,0px)',
				"-webkit-transition-duration":"300ms"
				// "transition-timing-function":"ease-out"
			});
			setTimeout(function(){
				$(sl.wrapper).css({
					'-webkit-transition-duration':'initial',
					"-webkit-transition-timing-function":"initial"
				});
			},300);
			// var bodyHeight=$("body").height();
			if($(sl.slides[sl.activeIndex]).data("ht")){
				$("#hqcnt").css("height",$(sl.slides[sl.activeIndex]).data("ht"));
			}
			var bodyHeight=$(sl.slides[sl.activeIndex]).data("ht");			
			var isscroing=true;
			var curobj=$(sl.slides[sl.activeIndex]);
			var curPageNum=Math.ceil(curobj.children("li").length / pageNumber) ;//当前页数
			if($("body").scrollTop()!=0 && bodyHeight - ($("body").scrollTop()+screenHeight)< screenHeight /2  && isscroing && diff>0){//加载更多			
				initdata(curobj.data("cn"),curPageNum+1);
				isscroing=false;
				// console.log("加载更多");						
			}
			else if($("body").scrollTop()==0 && sl.swipeDirection!= "next"&&sl.swipeDirection!="prev"){//判断是否是刷新					
				$("#loadcir").css({
					"-webkit-transform":"scale(0)",
					"-webkit-transition-duration":"300ms"
				});
				setTimeout(function(){
					$("#loadcir").css({
						'-webkit-transition-duration':'initial'
					});
				},300);
				if(Math.abs(diff)>50 && diff < 0){//刷新操作
					// $("#temview").text("刷新");	
					removedata(curobj);//移除原数据
					initdata(curobj.data("cn"));
					if(curobj.data("cn")=="79"){
						// console.log(swipimage);
						if(typeof(swipimage) != "undefined") swipimage.destroy(false); //销毁图片轮播对象
						initThumb();//初始化轮播对象
					}
				}
			}
			else if($("body").scrollTop() ==bodyHeight-screenHeight){//滚动到底部
					// console.log("已经到底部了");					
			}
			else{
				//存储滚动位置信息
				$(sl.slides[sl.activeIndex]).data("scroll",$("body").scrollTop());
				$("#deatlate").hide();
			}
		},
		onInit:function(sl){
			$(".jload").css("height",screenHeight-navHeight);
			$("#jmenuall li").siblings("li").removeClass("act");
			 $("#jmenuall li").eq(sl.activeIndex).addClass("act");
			$(sl.slides[sl.activeIndex]).css("min-height",screenHeight-navHeight);
		}
	});
     	// mySwiper.params.control=swiperNav;
         var getdata={};
         var navlength=$("#thnav li").length;
         var curtIndex=0,time;
         var getda=function(){	
         	if(curid!=curtIndex){
         		initdata($("#thnav li").eq(curtIndex).data("id")); 
         	}
         	if(curtIndex==navlength-1  ){
         		clearInterval(time);
         	}
         	else{
         		curtIndex++;
         	}
         };
         $("#thnav li").each(function(idx, el) {
         	$(el).on("click",function(){
         		goLocation(idx);
         		smnav(idx);
         	});
         });
         $("#jmenuall li").each(function(idx, el){
         	$(el).on("click",function(){
         		goLocation(idx);
         		$(".jnav,.jmenu").removeClass("act");
         		$(this).addClass("act").siblings("li").removeClass("act");
         		smnav(idx);
         	});
         })
         getdata.init=function(){	
         	time=setInterval(getda,1000);		
         	// $("#refresh").css("display","block");
         	initThumb();
         	initdata(linkArgu); 
         };
         getdata.init();
     	
	
	function smnav(i,sw){
		var slidleft =$("#thnav li").eq(i).offset().left ;
		$(".bar").css("width",$("#thnav li").eq(i).width()).offset({
			left : slidleft
		});
		//$("#jmenuall li").siblings("li").removeClass("act").eq(i).addClass("act");
	}
	function goLocation(i){
		mySwiper.slideTo(i, 300, function(){});
		setClass(i);
	}
	$(".jmenu").on("touchstart",function(){//下拉菜单
		var jmheight=$("#jmenuall").height() + $(".jmcont p").height();
		if($(".jnav").hasClass("act")){//已展开状态
			$(".jnav,.jmenu").removeClass("act");
			// $(".jmcont").height(0);
		}
		else{//未展开状态
			$(".jmcont").height(jmheight);
			$(".jnav,.jmenu").addClass("act");

		}
	});	
	// 地址栏参数解析	
	function GetQueryString(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); 
	     return null;
	}
	var channelfocus = new Swiper('.channel-focus', {
	    pagination: '.channel-pagin',
	    paginationClickable: true
	});
	
	// var loadHtml='<div class="loadbox jload">\
	// 					<div class="spinner">\
	// 						<div class="double-bounce1"></div>\
	// 						<div class="double-bounce2"></div>\
	// 					</div>\
	// 					<div class="load">加载中...</div>\
	// 				</div>';
	// $(".slidecn").each(function(index){
	// 	var num=index+1;
	// 	//creatSwiper(Swiper,".channel-focus"+num,".channel-pagin"+num);
	// 	$(this).append(loadHtml);
	// });
	
});

