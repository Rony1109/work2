$(function(){
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}
	},"jsonp");
	
	//选项
	$(".nav li").click(function(){
			$(".nav li,.nv-sig li").removeClass("cur");
			$(this).addClass("cur");
			$(".nv-sig").children("li:eq("+$(this).index()+")").addClass("cur");
	});
	
	//
	var textTimer,iu,AutoScroll = function (obj){
		    var self=obj.find("ul"),lih =self.find("li:first").height();
			self.animate({
					top:-lih
			},500,function(){
				self.css({top:"0px"}).find("li:first").appendTo(self);
			});
	}

	$('.ct-heigt02').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 iu=$(this);
			textTimer = setInterval(function(){
				 AutoScroll(iu);
			} ,2000);
	 }).trigger("mouseleave");

});

//登录
function loginname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}