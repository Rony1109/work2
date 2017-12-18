csc.LoadModule=function (box,url){   
	$.post(url,function (){
		$("#"+box).html(data);
	}) ;
};



























