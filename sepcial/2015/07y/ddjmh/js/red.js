define(function(require, exports, module) {
    require('../js/init');
	
	var redmodule={
	    init:function(){
			var memberIds="6b17b492-da3e-4015-85e6-b4ffb48112e3;8d3ea0a7-c79c-4c6b-b866-eea81c646ec8;82ca511a-4076-451e-ae46-836f0b918a88;18c7e978-f852-4d98-a3cd-a8f8ecba612f";
		    var OtheMmemberIds="968e6e56-a0ff-4e67-a70f-61be6609e32b;09fbaeb1-603b-42d5-9c5a-5a591e808e79;b6a1961e-e18e-4796-9f09-fc663d40df57;6f8cd6b1-5850-45d1-8b9f-ffb3603ef968;e787d377-7666-4976-ae18-131eae66a809;8b9eb5e5-620c-432d-b818-d53d804013bb";
			
			$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"01",
				"startDate":"2015-06-01 00:00:00",
				"endDate":"2015-08-17 17:00:00",
				"title":"布;纤维"
			},function(data){
				var htm=""
				if(data.length<8)
				{   
				    $("#ddjmh_wfbgd").hide();
				}else
				{
					$("#ddjmh_wfbgd .ckgd").on('click',function(){
					    $("#ddjmh_wfblist ul").find('li').show();
					    $("#ddjmh_wfbgd .ckgd").css("display","none");
						$("#ddjmh_wfbgd .sqgd").show();
					});
					
					$("#ddjmh_wfbgd .sqgd").on('click',function(){
						var len=$("#ddjmh_wfblist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_wfblist ul").find('li').eq(i).hide();
							}
						}
						
						$("#ddjmh_wfbgd .ckgd").css("display","block");
						$("#ddjmh_wfbgd .sqgd").hide();
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
				$("#ddjmh_wfblist ul").html(htm);
				//alert(data.length);
				//alert(JSON.stringify(data));
			},"jsonp");
		
		$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"01",
				"startDate":"2015-07-01 00:00:00",
				"endDate":"2015-08-17 17:00:00",
				"title":"拉链;纽扣;商标;织带;棉"
			},function(data){
				
			    var htm=""
				if(data.length<8)
				{
				    $("#ddjmh_nkougd").hide();
				}else
				{
					$("#ddjmh_nkougd .ckgd").on('click',function(){
					    $("#ddjmh_nkoulist ul").find('li').show();
					    $("#ddjmh_nkougd .ckgd").css("display","none");
						$("#ddjmh_nkougd .sqgd").show();
					});
					
					$("#ddjmh_nkougd .sqgd").on('click',function(){
						var len=$("#ddjmh_nkoulist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_nkoulist ul").find('li').eq(i).hide();
							}
						}
						$("#ddjmh_nkougd .ckgd").css("display","block");
						$("#ddjmh_nkougd .sqgd").hide();
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
				$("#ddjmh_nkoulist ul").html(htm);
			},"jsonp");
			
			$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"01;02",
				"startDate":"2015-07-01 00:00:00",
				"endDate":"2015-08-17 17:00:00",
				"title":"皮革;面料;绒"
			},function(data){
  				
			    var htm=""
				if(data.length<8)
				{
				    $("#ddjmh_pggd").hide();
				}else
				{
					$("#ddjmh_pggd .ckgd").on('click',function(){
					    $("#ddjmh_pglist ul").find('li').show();
					    $("#ddjmh_pggd .ckgd").css("display","none");
						$("#ddjmh_pggd .sqgd").show();
					});
					
					$("#ddjmh_pggd .sqgd").on('click',function(){
						var len=$("#ddjmh_pglist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_pglist ul").find('li').eq(i).hide();
							}
						}
						$("#ddjmh_pggd .ckgd").css("display","block");
						$("#ddjmh_pggd .sqgd").hide();
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
				
				$("#ddjmh_pglist ul").html(htm);
			},"jsonp");
		}
	}
redmodule.init();
});
