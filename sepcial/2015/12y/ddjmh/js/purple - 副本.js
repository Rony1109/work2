define(function(require, exports, module) {
	  require('../js/init');
	  var bluemodule={
	    init:function(){
			var memberIds="463cd8e5-9c03-40dd-b590-18ebd88841b1;6b17b492-da3e-4015-85e6-b4ffb48112e3;8d3ea0a7-c79c-4c6b-b866-eea81c646ec8;6b6f26e2-964e-4468-a58e-cc6a4a825585;28373868-0cf9-4932-bda8-e7cb5f520182;82ca511a-4076-451e-ae46-836f0b918a88;18c7e978-f852-4d98-a3cd-a8f8ecba612f;968e6e56-a0ff-4e67-a70f-61be6609e32b;09fbaeb1-603b-42d5-9c5a-5a591e808e79;1e2807dc-23ad-4ed1-81ce-97c0f3020caf;b6a1961e-e18e-4796-9f09-fc663d40df57;6f8cd6b1-5850-45d1-8b9f-ffb3603ef968;e787d377-7666-4976-ae18-131eae66a809;040fc7ac-a2cc-491c-aca9-52cf42f54483;8b9eb5e5-620c-432d-b818-d53d804013bb;923ec1f0-53f4-45be-9776-b48042ea4487";
		    var OtheMmemberIds="32cf21a8-6dde-4980-a723-4b92911222ae;abbee10c-4ac7-4263-95c3-860f8cd99992;910a57eb-8ab0-4eb0-9bb6-351133cac669;2283db9e-c79f-4b36-a016-7787d8584a14;48a2cfa9-c96d-40f8-bd21-c5b82567376e;dc689a54-fd13-4e2c-adfb-77753933ca45;60357953-863a-42e9-9cdf-ff93b205fcd3;dd656207-6f96-4b08-8608-1c411d97af15;e274457c-8f15-431f-9405-b5edf54ebf91;ca1d9d74-d08b-4d5f-9397-edf0d8428fcf;eee00eaa-6d2e-44a2-be70-10474db080f0;518a618a-c79c-4d3f-8c03-b04a5b29a6b0;90ce7e49-196c-42da-9477-f07f68007fcd;4761ce67-25dc-40b3-9be3-ae6422051f76;6b9d989f-070d-485f-b392-53b92b98f45e";
			var startDate="2015-09-20 00:00:00";
			var endDate  ="2015-11-08 00:00:00";
			$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"27",
				"startDate":startDate,
				"endDate":endDate,
				"title":"五金"
			},function(data){
				
				var htm=""
				if(data.length<8)
				{
				    $("#ddjmh_wujgd").hide();
				}else
				{
					$("#ddjmh_wujgd .ckgd").on('click',function(){
						
					    $("#ddjmh_wujlist ul").find('li').show();
					    $("#ddjmh_wujgd .ckgd").css("display","none");
						$("#ddjmh_wujgd .sqgd").show();
					});
					
					$("#ddjmh_wujgd .sqgd").on('click',function(){
						var len=$("#ddjmh_wujlist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_wujlist ul").find('li').eq(i).hide();
							}
						}
						$("#ddjmh_wujgd .ckgd").css("display","block");
						$("#ddjmh_wujgd .sqgd").hide();
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
				   var suppotFile = new Array();
                   suppotFile[0] = "jpg";
                   suppotFile[1] = "bmp";
                   suppotFile[2] = "jpeg";
				   suppotFile[3] = "png";
				   suppotFile[4] = "gif";
				   var fileType = (data[i].imgUrl.substring(data[i].imgUrl.lastIndexOf(".")+1,data[i].imgUrl.length)).toLowerCase();
				   var boot;
				   for (var j =0;j<suppotFile.length;j++) {
					   if (suppotFile[j]==fileType) {
						   boot="true";
						   break;
					   }else
					   {
						   boot="false";
					   }
				   }
				   htm+='<div class="bod-br-all">';
				   htm+='<div class="bod-br-tabs">';
				   htm+='<div class="bod-br-top">';
				   htm+='<span>'+data[i].inquiryName+'</span>';
				   htm+='<p>采购量：<strong style="color:#ff9f2d;">'+data[i].purchaseNumber+'</strong> '+data[i].purchaseUnits+'</p>';
				   htm+='</div>';
				   htm+='<div class="bod-br-center">';
				   htm+='<div class="bod-br-center-left">';
				   htm+='<p>发布时间：'+data[i].addTime+'</p>';
				   htm+='<p>截止时间：'+data[i].expireDate +'</p>';
				   htm+='</div>';
				   if(!data[i].img==""&&boot=="true")
				   {
				   htm+='<div class="bod-br-center-right">';
				   htm+='<a href="javascript:;"><img src=http://img.csc86.com/'+data[i].img+' width="100%" height="100%" alt="'+ data[i].imgUrl +'"/></a>';
				   htm+='</div>';
				   htm+='<div class="bor-right-imgbig">';
				   htm+='<img src=http://img.csc86.com/'+data[i].img+' width="100%" height="100%" alt="'+ data[i].imgUrl +'"/>';
				   htm+='</div>';
				   }
				   htm+='<div style="clear: both;"></div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-foot">'+data[i].content+'</div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-btn-ccc"><a href=http://member.csc86.com/quote/detail.html?id='+data[i].Id+'>已经截止</a></div>';
				   htm+='</div>';
				   htm+='</li>';
				}
				$("#ddjmh_wujlist ul").html(htm);
				//alert(data.length);
				//alert(JSON.stringify(data));
			},"jsonp");
		
		$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"27",
				"startDate":startDate,
				"endDate":endDate,
				"title":"螺丝"
			},function(data){
				
			    var htm=""
				if(data.length<8)
				{
				    $("#ddjmh_luosgd").hide();
				}else
				{
					$("#ddjmh_luosgd .ckgd").on('click',function(){
					    $("#ddjmh_luoslist ul").find('li').show();
					    $("#ddjmh_luosgd .ckgd").css("display","none");
						$("#ddjmh_luosgd .sqgd").show();
					});
					
					$("#ddjmh_luosgd .sqgd").on('click',function(){
						var len=$("#ddjmh_luoslist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_luoslist ul").find('li').eq(i).hide();
							}
						}
						$("#ddjmh_luosgd .ckgd").css("display","block");
						$("#ddjmh_luosgd .sqgd").hide();
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
				   var suppotFile = new Array();
                   suppotFile[0] = "jpg";
                   suppotFile[1] = "bmp";
                   suppotFile[2] = "jpeg";
				   suppotFile[3] = "png";
				   suppotFile[4] = "gif";
				   var fileType = (data[i].imgUrl.substring(data[i].imgUrl.lastIndexOf(".")+1,data[i].imgUrl.length)).toLowerCase();
				   var boot;
				   for (var j =0;j<suppotFile.length;j++) {
					   if (suppotFile[j]==fileType) {
						   boot="true";
						    break;
					   }else
					   {
						   boot="false";
					   }
				   }
				   
				   htm+='<div class="bod-br-all">';
				   htm+='<div class="bod-br-tabs">';
				   htm+='<div class="bod-br-top">';
				   htm+='<span>'+data[i].inquiryName+'</span>';
				   htm+='<p>采购量：<strong style="color:#ff9f2d;">'+data[i].purchaseNumber+'</strong> '+data[i].purchaseUnits+'</p>';
				   htm+='</div>';
				   htm+='<div class="bod-br-center">';
				   htm+='<div class="bod-br-center-left">';
				   htm+='<p>发布时间：'+data[i].addTime+'</p>';
				   htm+='<p>截止时间：'+data[i].expireDate +'</p>';
				   htm+='</div>';
				   if(!data[i].img=="" &&boot=="true")
				   {
				   htm+='<div class="bod-br-center-right">';
				   htm+='<a href="javascript:;"><img src=http://img.csc86.com/'+data[i].img+' width="100%" height="100%"/></a>';
				   htm+='</div>';
				   htm+='<div class="bor-right-imgbig">';
				   htm+='<img src=http://img.csc86.com/'+data[i].img+' width="100%" height="100%"/>';
				   htm+='</div>';
				   }
				   htm+='<div style="clear: both;"></div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-foot">'+data[i].content+'</div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-btn-ccc"><a href=http://member.csc86.com/quote/detail.html?id='+data[i].Id+'>已经截止</a></div>';
				   htm+='</div>';
				   htm+='</li>';
				}
				$("#ddjmh_luoslist ul").html(htm);
			},"jsonp");
			
			$.post("http://inquiry.csc86.com/ddjm-list",
			{
				"memberIds":memberIds,
				"OtheMmemberIds":OtheMmemberIds,
				"categoryIds":"27",
				"startDate":startDate,
				"endDate":endDate,
				"title":"五金配件;刀;弹簧"
			},function(data){
				
			    var htm=""
				if(data.length<8)
				{
				    $("#ddjmh_thgd").hide();
				}else
				{
					$("#ddjmh_thgd .ckgd").on('click',function(){
					    $("#ddjmh_thlist ul").find('li').show();
					    $("#ddjmh_thgd .ckgd").css("display","none");
						$("#ddjmh_thgd .sqgd").show();
					});
					
					$("#ddjmh_thgd .sqgd").on('click',function(){
						var len=$("#ddjmh_thlist ul").find('li').length;
						for(var i=0;i<len;i++)
						{
							if(i>=8)
							{
					            $("#ddjmh_thlist ul").find('li').eq(i).hide();
							}
						}
						$("#ddjmh_thgd .ckgd").css("display","block");
						$("#ddjmh_thgd .sqgd").hide();
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
				   var suppotFile = new Array();
                   suppotFile[0] = "jpg";
                   suppotFile[1] = "bmp";
                   suppotFile[2] = "jpeg";
				   suppotFile[3] = "png";
				   suppotFile[4] = "gif";
				   var fileType = (data[i].imgUrl.substring(data[i].imgUrl.lastIndexOf(".")+1,data[i].imgUrl.length)).toLowerCase();
				   var boot;
				   for (var j =0;j<suppotFile.length;j++) {
					   if (suppotFile[j]==fileType) {
						   boot="true";
						    break;
					   }else
					   {
						   boot="false";
					   }
				   }
				   htm+='<div class="bod-br-all">';
				   htm+='<div class="bod-br-tabs">';
				   htm+='<div class="bod-br-top">';
				   htm+='<span>'+data[i].inquiryName+'</span>';
				   htm+='<p>采购量：<strong style="color:#ff9f2d;">'+data[i].purchaseNumber+'</strong> '+data[i].purchaseUnits+'</p>';
				   htm+='</div>';
				   htm+='<div class="bod-br-center">';
				   htm+='<div class="bod-br-center-left">';
				   htm+='<p>发布时间：'+data[i].addTime+'</p>';
				   htm+='<p>截止时间：'+data[i].expireDate +'</p>';
				   htm+='</div>';
				   if(!data[i].img=="" &&boot=="true")
				   {
				   htm+='<div class="bod-br-center-right">';
				   htm+='<a href="javascript:;"><img src=http://img.csc86.com/'+data[i].img+' width="100%" height="100%"/></a>';
				   htm+='</div>';
				   htm+='<div class="bor-right-imgbig">';
				   htm+='<img src=http://img.csc86.com/'+data[i].img+' width="100%" height="100%"/>';
				   htm+='</div>';
				   }
				   htm+='<div style="clear: both;"></div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-foot">'+data[i].content+'</div>';
				   htm+='</div>';
				   htm+='<div class="bod-br-btn-ccc"><a href=http://member.csc86.com/quote/detail.html?id='+data[i].Id+'>已经截止 </a></div>';
				   htm+='</div>';
				   htm+='</li>';
				}
				
				$("#ddjmh_thlist ul").html(htm);
			},"jsonp");
			
		}
	
	}
	
	
	        bluemodule.init();
		
		 
	
});
