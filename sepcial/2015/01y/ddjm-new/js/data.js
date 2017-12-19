/*
 * 构建数据
 * 
 */

define(function(require, exports, module) {
	$.get('http://inquiry.csc86.com/ddjm-list',function(response){ if(response){ hotPro(response) }else{ alert("网络出错，请刷新后再试！") } },'jsonp');//请求数据

	function hotPro(response){
		var hotItem = '' , listHtml = '' , date = (new Date()).getTime();
		for(var i=0;i<response.length;i++){//读取数据记录
			var time = (new Date(response[i].expireDate)).getTime();
			console.log(date,time,(date>time));
			if(i<12){//创建热门求购数据
				hotItem += '<div class="info">'+
							'<div class="tab">'+
								'<div class="title">'+
									'<h2>'+ response[i].inquiryName +'</h2>'+
									'<p>采购量：<span>'+ response[i].purchaseNumber +'</span> '+ response[i].purchaseUnits +'</p>'+
								'</div><!--title end-->'+
								'<div class="g-cf dtl">'+
									'<div class="text">'+
										'<p>发布时间：'+ response[i].addTime +'</p>'+
										'<p>截止时间：<span>'+ response[i].expireDate +'</span></p>'+
										'<p>详细描述：'+ response[i].content +'</p>'+
									'</div><!--text end-->'+
									(response[i].img == '' ?  '<div class="pic"></div>' : '<div class="pic"><img src="http://img.csc86.com'+ response[i].img +'" width="66" height="66" alt="'+ response[i].imgUrl +'"></div><!--pic end-->')+
								'</div><!--dtl end-->'+
								(response[i].img == '' ? '<div class="propic"></div>' : '<div class="propic"><img src="http://img.csc86.com'+ response[i].img +'" width="225" height="198" alt="'+ response[i].imgUrl +'"></div>')+
							'</div><!--tab end-->'+
							'<div class="dbtn">'+
								(date > time ? ('<a href="javascript://"><img src="css/img/btn3.png" alt=""></a>') : ('<a href="http://member.csc86.com/quote/detail.html?id='+ response[i].Id +'" target="_blank"><img src="css/img/btn.png" width="112" height="36" alt=""></a>') )+
							'</div>'+
						'</div>';
			}else{//创建专场求购数据
				listHtml += '<div class="info' + (response[i].img == '' ? '' : '') + '">'+
								'<div class="tab">'+
									'<div class="title">'+
										'<h2>'+ response[i].inquiryName +'</h2>'+
										'<p>采购量：<span>'+ response[i].purchaseNumber +'</span> '+ response[i].purchaseUnits +'</p>'+
									'</div><!--title end-->'+
									'<div class="g-cf dtl">'+
										'<div class="text' + (response[i].img == '' ? ' text-noimg' : '') + '">'+
											'<p>发布时间：'+ response[i].addTime +'</p>'+
											'<p>截止时间：<span>'+ response[i].expireDate +'</span></p>'+
											'<p>详细描述：'+ response[i].content +'</p>'+
										'</div><!--text end-->'+
										(response[i].img == '' ?  '<div class="pic"></div>' : '<div class="pic"><img src="http://img.csc86.com'+ response[i].img +'" width="66" height="66" alt="'+ response[i].imgUrl +'"></div><!--pic end-->')+
									'</div><!--dtl end-->'+
									(response[i].img == '' ? '<div class="propic"></div>' : '<div class="propic"><img src="http://img.csc86.com'+ response[i].img +'" width="225" height="198" alt="'+ response[i].imgUrl +'"></div>')+
								'</div><!--tab end-->'+
								'<div class="dbtn">'+
									(date > time ? ('<a href="javascript://"><img src="css/img/btn3.png" alt=""></a>') : ('<a href="http://member.csc86.com/quote/detail.html?id='+ response[i].Id +'" target="_blank"><img src="css/img/btn.png" width="112" height="36" alt=""></a>') )+
								'</div>'+
							'</div>';
			}
		};
		$("#hotHmtl").html(hotItem);//插入DOM
		$("#listHtml").html(listHtml);//插入DOM
	};
});
