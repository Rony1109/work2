//活动选项卡
$(function(){
	$("span.al-title a").each(function(i){
	 	var $tcsVal=$("span.al-title a").eq(i).html().toString().length;
		if($tcsVal>16){
			var toval=$("span.al-title a").eq(i).html().toString().substring(0,14);
			$("span.al-title a").eq(i).html(toval+"...");
		}
	 });
	$(".ai-s-con div.asc-s1").each(function(i){
		var str=$(".ai-s-con div.asc-s1").eq(i).html();
		str= str.replace(/<\/?[^>]*>/g,''); 
		str=str.replace(/[ | ]*n/g,'');
		str=str.replace(/\s/ig,'');
		str=str.replace(/\&bsp;/ig,'');
		var stleng=str.toString().length;
		if(stleng>80){
			var toval=str.substring(0,80);
			$(".ai-s-con div.asc-s1").eq(i).html(toval+"...");
		}else{
			$(".ai-s-con div.asc-s1").eq(i).html(str);
		}
	});
});
