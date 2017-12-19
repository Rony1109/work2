$(function(){
	var lng=$("div.ebs-pr .ad-all li").length;
	var divp=$("div.ebs-pr .ad-l05 .ad-all").attr("data");
	var nu;
	
	var time=setInterval(function(){
			$("div.ebs-pr .ad-l02").attr("title","下一个");
			$("div.ebs-pr .ad-l02").siblings(".ad-l01").attr("title","上一个");
			if(divp+6==lng){
				$("div.ebs-pr .ad-l05 .ad-all").attr("data","0").animate({ left: "0" }, 500);
				divp=0;
				nu=++divp;
			}else{
				$("div.ebs-pr .ad-l05 .ad-all").attr("data",nu).animate({ left: "+=-137" }, 1000);
				nu=++divp;
			}
			
	},2000);

	$("div.ebs-pr .ad-l01").live("click",function(){
		var th=$(this);
		if(divp==0){
			th.attr("title","第一个");
			th.siblings(".ad-l02").attr("title","下一个");
		}else{
			th.attr("title","上一个");
			th.siblings(".ad-l02").attr("title","下一个");
			nu=--divp;
			$("div.ebs-pr .ad-l05 .ad-all").attr("data",nu).animate({ left: "+=137" }, 500);
		}
	});
	$("div.ebs-pr .ad-l02").live("click",function(){
		var th=$(this);
		if(divp+6==lng){
			th.attr("title","最后一个");
			th.siblings(".ad-l01").attr("title","上一个");
		}else{
			th.attr("title","下一个");
			th.siblings(".ad-l01").attr("title","上一个");
			nu=++divp;
			$("div.ebs-pr .ad-l05 .ad-all").attr("data",nu).animate({ left: "+=-137" }, 500);
		}
	});
});
