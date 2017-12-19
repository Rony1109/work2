define(function(require, exports, module) {

	    require('../js/init');
        
	        
	  var bluemodule={
	    init:function(){
			var memberIds="6b17b492-da3e-4015-85e6-b4ffb48112e3;8d3ea0a7-c79c-4c6b-b866-eea81c646ec8;82ca511a-4076-451e-ae46-836f0b918a88;18c7e978-f852-4d98-a3cd-a8f8ecba612f";
		    var OtheMmemberIds="968e6e56-a0ff-4e67-a70f-61be6609e32b;09fbaeb1-603b-42d5-9c5a-5a591e808e79;b6a1961e-e18e-4796-9f09-fc663d40df57;6f8cd6b1-5850-45d1-8b9f-ffb3603ef968;e787d377-7666-4976-ae18-131eae66a809;8b9eb5e5-620c-432d-b818-d53d804013bb";
			
			$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"05",
				"startDate":"2015-06-01 00:00:00",
				"endDate":"2015-08-17 17:00:00",
				"title":"LED"
			},function(data){
				var htm=""
				if(data.length<8)
				{
				    $("#ddjmh_ledgd").hide();
				}else
				{
					$("#ddjmh_ledgd .ckgd").on('click',function(){
						
					    $("#ddjmh_ledlist ul").find('li').show();
					    $("#ddjmh_ledgd .ckgd").css("display","none");
						$("#ddjmh_ledgd .sqgd").show();
					});
					
					$("#ddjmh_ledgd .sqgd").on('click',function(){
						var len=$("#ddjmh_ledlist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_ledlist ul").find('li').eq(i).hide();
							}
						}
						$("#ddjmh_ledgd .ckgd").css("display","block");
						$("#ddjmh_ledgd .sqgd").hide();
					});
				}
				for(var i=0;i<data.length;i++)
				{
				   if(i>=8)
				   {
						htm+='<li style="display:none">';
				   }else
				   {
						htm+='<li>';
				   } 
				   
				   htm+='<div class="bod-br-all">';
				   htm+='<div class="bod-br-top">';
				   htm+='<span>'+data[i].inquiryName+'</span>';
				   htm+='<p>采购量：<strong style="color:#ff9f2d;">'+data[i].purchaseNumber+'</strong> '+data[i].purchaseUnits+'</p>';
				   htm+='</div>';
				   htm+='<div class="bod-br-center">';
				   htm+='<div class="bod-br-center-left">';
				   htm+='<p>发布时间：'+data[i].addTime+'</p>';
				   htm+='<p>截止时间：'+data[i].expireDate +'</p>';
				   htm+='</div>';
				   //htm+='<div class="bod-br-center-right">';
				  // htm+='<a href="javascript:;"><img src=http://img.csc86.com/imgUrl"'+data[i].imgUrl+'" width="100%" height="100%"/></a>';
				   //htm+='</div>';
				   htm+='<div style="clear: both;"></div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-foot">'+data[i].content+'</div>';
				   htm+='<div class="bod-br-btn"><a href=http://member.csc86.com/quote/detail.html?id='+data[i].Id+'>立即报价</a></div>';
				   htm+='</div>';
				   htm+='</li>';
				}
				$("#ddjmh_ledlist ul").append(htm);
				//alert(data.length);
				//alert(JSON.stringify(data));
			},"jsonp");
		
		$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"05;38",
				"startDate":"2015-07-01 00:00:00",
				"endDate":"2015-08-17 17:00:00",
				"title":"连接器;电源;U盘"
			},function(data){
				
			    var htm=""
				if(data.length<8)
				{
				    $("#ddjmh_ljqgd").hide();
				}else
				{
					$("#ddjmh_ljqgd .ckgd").on('click',function(){
					    $("#ddjmh_ljqlist ul").find('li').show();
					    $("#ddjmh_ljqgd .ckgd").css("display","none");
						$("#ddjmh_ljqgd .sqgd").show();
					});
					
					$("#ddjmh_ljqgd .sqgd").on('click',function(){
						var len=$("#ddjmh_ljqlist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_ljqlist ul").find('li').eq(i).hide();
							}
						}
						$("#ddjmh_ljqgd .ckgd").css("display","block");
						$("#ddjmh_ljqgd .sqgd").hide();
					});
				}
				
				for(var i=0;i<data.length;i++)
				{
				   if(i>=8)
				   {
						htm+='<li style="display:none">';
					 // $("#ddjmh_ledlist ul").find('li').eq(i).css("display":"none"); 
					 //$("#ddjmh_ledlist ul").find('li').eq(i).css("display":"none");
				   }else
				   {
					   
						htm+='<li>';
				   } 
				   
				   htm+='<div class="bod-br-all">';
				   htm+='<div class="bod-br-top">';
				   htm+='<span>'+data[i].inquiryName+'</span>';
				   htm+='<p>采购量：<strong style="color:#ff9f2d;">'+data[i].purchaseNumber+'</strong> '+data[i].purchaseUnits+'</p>';
				   htm+='</div>';
				   htm+='<div class="bod-br-center">';
				   htm+='<div class="bod-br-center-left">';
				   htm+='<p>发布时间：'+data[i].addTime+'</p>';
				   htm+='<p>截止时间：'+data[i].expireDate +'</p>';
				   htm+='</div>';
				  // htm+='<div class="bod-br-center-right">';
				   //htm+='<a href="javascript:;"><img src=http://img.csc86.com/imgUrl"'+data[i].imgUrl+'" width="100%" height="100%"/></a>';
				  // htm+='</div>';
				   htm+='<div style="clear: both;"></div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-foot">'+data[i].content+'</div>';
				   htm+='<div class="bod-br-btn"><a href=http://member.csc86.com/quote/detail.html?id='+data[i].Id+'>立即报价</a></div>';
				   htm+='</div>';
				   htm+='</li>';   
				}
				$("#ddjmh_ljqlist ul").html(htm);
			},"jsonp");
			
			$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"05",
				"startDate":"2015-07-01 00:00:00",
				"endDate":"2015-08-17 17:00:00",
				"title":"蓝牙;耳机;充电器;手机;电脑"
			},function(data){
				
			    var htm=""
				if(data.length<8)
				{
				    $("#ddjmh_lygd").hide();
				}else
				{
					$("#ddjmh_lygd .ckgd").on('click',function(){
					    $("#ddjmh_lylist ul").find('li').show();
					    $("#ddjmh_lygd .ckgd").css("display","none");
						$("#ddjmh_lygd .sqgd").show();
					});
					
					$("#ddjmh_lygd .sqgd").on('click',function(){
						var len=$("#ddjmh_lylist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_lylist ul").find('li').eq(i).hide();
							}
						}
						$("#ddjmh_lygd .ckgd").css("display","block");
						$("#ddjmh_lygd .sqgd").hide();
					});
				}
				
				for(var i=0;i<data.length;i++)
				{
				   if(i>=8)
				   {
						htm+='<li style="display:none">';
					 // $("#ddjmh_ledlist ul").find('li').eq(i).css("display":"none"); 
					 //$("#ddjmh_ledlist ul").find('li').eq(i).css("display":"none");
				   }else
				   {
						htm+='<li>';
				   } 
				   
				   htm+='<div class="bod-br-all">';
				   htm+='<div class="bod-br-top">';
				   htm+='<span>'+data[i].inquiryName+'</span>';
				   htm+='<p>采购量：<strong style="color:#ff9f2d;">'+data[i].purchaseNumber+'</strong> '+data[i].purchaseUnits+'</p>';
				   htm+='</div>';
				   htm+='<div class="bod-br-center">';
				   htm+='<div class="bod-br-center-left">';
				   htm+='<p>发布时间：'+data[i].addTime+'</p>';
				   htm+='<p>截止时间：'+data[i].expireDate +'</p>';
				   htm+='</div>';
				  // htm+='<div class="bod-br-center-right">';
				   //htm+='<a href="javascript:;"><img src=http://img.csc86.com/imgUrl"'+data[i].imgUrl+'" width="100%" height="100%"/></a>';
				  // htm+='</div>';
				   htm+='<div style="clear: both;"></div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-foot">'+data[i].content+'</div>';
				   htm+='<div class="bod-br-btn"><a href=http://member.csc86.com/quote/detail.html?id='+data[i].Id+'>立即报价</a></div>';
				   htm+='</div>';
				   htm+='</li>';   
				}
				$("#ddjmh_lylist ul").html(htm);
			},"jsonp");
			
		}
	
	}
	bluemodule.init();
	
});