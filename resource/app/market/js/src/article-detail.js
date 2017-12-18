define(function(require, exports, module) {
	require('swiper');
	var common=require('./common');//公用js

	var hostmap=seajs.hostmap;//域名配置
	var channelData={
		"channelInfo":[{
			"id":"79",
			"name":"编辑精选"		
		},{
			"id":"71",
			"name":"大视野"	
		},{
			"id":"69",
			"name":"生意管家"
		},{
			"id":"67",
			"name":"今日行情"
		},{
			"id":"68",
			"name":"资本变数"
		},{
			"id":"74",
			"name":"行业风向"
		},{
			"id":"70",
			"name":"电商导师"
		},{
			"id":"77",
			"name":"订单见面会"
		},{
			"id":"72",
			"name":"品牌之星"
		},{
			"id":"75",
			"name":"精品导购"
		},{
			"id":"76",
			"name":"中国好企业"
		}
		]
	},articledetail={
		articleId:common.GetQueryString("arcid"),
		init:function(){
			if (window.WebViewJavascriptBridge) {
				window.WebViewJavascriptBridge.callHandler('showBackBtn');
			}
			$.ajax({
				type:"get",
				url:"http://info.csc86.com/api.php",
				data:{
					op:"market_news_detail",
					id:articledetail.articleId
				},
				dataType:"jsonp",
				success:function(data){
					if(data.status==1){
						// console.log(data)
						var regRplace=new RegExp("\\[page\\]","g");//替换[page]
						var title=data.data.title,time=data.data.updatetime,content=data.data.content.replace(regRplace,""),description=data.data.description,catid=data.data.catid,copyfrom=data.data.copyfrom;

						html='<h1 id="title">'+title+'</h1>\
								<p class="futit"><span class="channel">'+copyfrom+'</span><span class="time">'+time+'</span></p>\
								<div class="article" id="article">'+content+'</div>';
						document.title=title;
						$(html).appendTo($("#artdetail"));
						$("img").each(function(){
							$(this).css("height","auto");
						});
						$("#detloading").hide();
					}
					else{
						
					}
					
				},
				error:function(){//请求失败

				}
			})
		}
	}
	articledetail.init();
});

