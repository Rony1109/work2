
$(function(){
	$.get('http://data.csc86.com/api.php?op=dianzan&act=getcount&formid=16&id=1', function(data){//alert(data);
		$("span.right").html(data.data.points+"℃");		
		$("span.wrong").html(data.data.except+"℃");																														
	},"jsonp");
	//检查是否登录
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}
	},"jsonp");
	
	$(".info .zc:eq(0) a").live("click",function(){
		$.get('http://data.csc86.com/api.php?op=dianzan&act=count&formid=16&id=1', function(data){
				$(".info li:eq(0) span").html(data.data.points+"℃");
		},"jsonp");										 
	})
	
	$(".info .zc:eq(1) a").live("click",function(){
		$.get('http://data.csc86.com/api.php?op=dianzan&act=count&formid=16&id=1&ref=ref', function(data){
				$(".info li:eq(1) span").html(data.data.except+"℃");	
		},"jsonp");										 
	})
	
	
});

//登录
function loginname(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			$(".top-log").html("您好，&nbsp;<b>"+data.data.userName+"</b>&nbsp;&nbsp;欢迎光临华南城网！");
			zhname=data.data.userName;
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");
}

