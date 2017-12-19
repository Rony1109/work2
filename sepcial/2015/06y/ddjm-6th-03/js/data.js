/*
 * 构建数据
 * 
 */

define(function(require, exports, module) {
	$.get('http://inquiry.csc86.com/ddjm-list',{"memberIds":"6b17b492-da3e-4015-85e6-b4ffb48112e3;8d3ea0a7-c79c-4c6b-b866-eea81c646ec8;82ca511a-4076-451e-ae46-836f0b918a88;18c7e978-f852-4d98-a3cd-a8f8ecba612f;968e6e56-a0ff-4e67-a70f-61be6609e32b;09fbaeb1-603b-42d5-9c5a-5a591e808e79;b6a1961e-e18e-4796-9f09-fc663d40df57;6f8cd6b1-5850-45d1-8b9f-ffb3603ef968;e787d377-7666-4976-ae18-131eae66a809;8b9eb5e5-620c-432d-b818-d53d804013bb","categoryIds":"01;02","startDate":"2015-06-08 00:00:00"},function(response){ if(response){ hotPro(response) }else{ alert("网络出错，请刷新后再试！") } },'jsonp');//请求数据

	function hotPro(response){
		var hotItem = '' , listHtml = '';
		for(var i=0;i<response.length;i++){//读取数据记录
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
										'<p>剩余时间：<span>'+ response[i].days +'</span>天</p>'+
										'<p>详细描述：'+ response[i].content +'</p>'+
									'</div><!--text end-->'+
									(response[i].img == '' ?  '<div class="pic"></div>' : '<div class="pic"><img src="http://img.csc86.com'+ response[i].img +'" width="66" height="66" alt="'+ response[i].imgUrl +'"></div><!--pic end-->')+
								'</div><!--dtl end-->'+
								(response[i].img == '' ? '<div class="propic"></div>' : '<div class="propic"><img src="http://img.csc86.com'+ response[i].img +'" width="225" height="198" alt="'+ response[i].imgUrl +'"></div>')+
							'</div><!--tab end-->'+
							'<div class="dbtn">'+
								'<a href="http://member.csc86.com/quote/detail.html?id='+ response[i].Id +'" target="_blank"><img src="css/img/btn.png" width="112" height="36" alt=""></a>'+
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
											'<p>剩余时间：<span>'+ response[i].days +'</span></p>'+
											'<p>详细描述：'+ response[i].content +'</p>'+
										'</div><!--text end-->'+
										(response[i].img == '' ?  '<div class="pic"></div>' : '<div class="pic"><img src="http://img.csc86.com'+ response[i].img +'" width="66" height="66" alt="'+ response[i].imgUrl +'"></div><!--pic end-->')+
									'</div><!--dtl end-->'+
									(response[i].img == '' ? '<div class="propic"></div>' : '<div class="propic"><img src="http://img.csc86.com'+ response[i].img +'" width="225" height="198" alt="'+ response[i].imgUrl +'"></div>')+
								'</div><!--tab end-->'+
								'<div class="dbtn">'+
									'<a href="http://member.csc86.com/quote/detail.html?id='+ response[i].Id +'" target="_blank"><img src="css/img/btn.png" width="112" height="36" alt=""></a>'+
								'</div>'+
							'</div>';
			};console.log(i)
		};
		$("#hotHmtl").html(hotItem);//插入DOM
		$("#listHtml").html(listHtml);//插入DOM
	};
});
