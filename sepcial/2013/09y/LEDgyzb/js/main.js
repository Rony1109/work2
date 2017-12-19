/*
	$("div.tabs").tabs();
*/
(function($){
	var i = 0;
	$.fn.extend({
		tabs : function(){
			var me = $(this);
			me.find("ul li").each(function(index){
				$(this).on('click' , function(){
					$(this).addClass("active").siblings().removeClass("active");
					me.find("div.ctn").eq(index).addClass("active").siblings("div.ctn").removeClass("active");
					i = index;
				});
			});
		},
		marquee : function(){
			var me = $(this);
			var Myfun;
			if(me.timeStamp) clearInterval(me.timeStamp);
			me.timeStamp = setInterval(Myfun = function(){
				var cur = i++;
				if(cur >= me.find('ul li').length){ i = 0 ;}
				me.find('ul li').eq(cur).addClass("active").siblings().removeClass("active");
				me.find("div.ctn").eq(cur).addClass("active").siblings("div.ctn").removeClass("active");
			} , 2000);

			me.on({
				mouseover : function(){
					clearInterval(me.timeStamp);
				},
				mouseout : function(){
					me.timeStamp=setInterval(Myfun , 2000);
				}
			});
		}
	});

})(jQuery);


$(function(){
	$("#tabs").tabs();
	$("#tabs").marquee();
});

//表单提交
// function formsub(){
// 	$.get("http://cncms.csc86.com/formguide/index.php" ,
// 		$("#info_submit form").serialize(), 
// 		function(data){
// 			alert(data);
// 		},
// 	"jsonp");
// 	return false;
// }

function formsub(){
	$.post("http://cncms.csc86.com/formguide/index.php",$('#info_submit form').serialize(),function(data){
		//console.info(data.status);
		if(data.status == true){
			alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
			$('#info_submit form table input:not(:submit)').val("");
		}
		else{
			alert("申请失败，请刷新后重试！");
		}
	},"jsonp");
	return false;
}