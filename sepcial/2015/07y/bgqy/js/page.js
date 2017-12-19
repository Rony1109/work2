define(function(require, exports, module) {
	/*var page={
		prototypes:function(e,num){
			alert(e);
       var array=new Array();
	   var g_html;
	   var fian=page.finals();
	   var ss=(num/11);
	   var as=(num%11);
	   if(as>0)
	   {
		   ss+1;
	   }
	   var pge=page.pghtml(ss);
	   var lihtm=page.pgli(num);
	   
	   $("#"+e).html(lihtm+fian+pge);
		}
	}*/
	/*page.prototype =function(e,num) {
		alert(e);
       var array=new Array();
	   var g_html;
	   var fian=page.finals();
	   var ss=(num/11);
	   var as=(num%11);
	   if(as>0)
	   {
		   ss+1;
	   }
	   var pge=page.pghtml(ss);
	   var lihtm=page.pgli(num);
	   
	   $("#"+e).html(lihtm+fian+pge);
	}*/
	
	/*page.pgli   =function(num){
	   var txt="";
	   txt+='<ul>';
	   for(var i=0;i<num;i++)
	   { 
	     if(i>10){
		     break;
		 } 
	   txt+='<li>';
	   txt+='<div class="bod-left">';
	   txt+='<a href="javascript:;" class="bod-img-list"><img src="css/img/bg-user-img1.jpg"></a>';
	   txt+='<div class="bod-list">';
	   txt+='<div class="bod-list-img"></div>';
	   txt+='<div class="bod-list-txt">';
	   txt+='<p>我们经营的不仅是产品，更是一份承诺</p>';
	   txt+='<p>广东省深圳市龙岗区平湖华南城5号广场</p>';
	   txt+='<p><a href="javascript:;" class="bod-url-list">http://szsxzj.b2b.com</a></p>';
	   txt+='</div>';
	   txt+='</div>';
	   txt+='</div>';
	   txt+='</li>';
	   }
	   return txt;
	}
	
	page.pghtml  =function(pgs){
	    var pghtml="";
		pghtml+='<div class="st-foot">';
		pghtml+='<ul>';
		pghtml+='<li style="width:76px;"><a href="javascript:;" class="pag-up ">上一页</a></li>';
		for(var i=0;i<pgs;i++)
		{
			if(i==0)
			{
			pghtml+='<li><a href="javascript:;" class="pag-nub st-pag-click">'+(i+1)+'</a></li>';	
			}else
			{
			pghtml+='<li><a href="javascript:;" class="pag-nub">'+(i+1)+'</a></li>';	
			}
		}
		pghtml+='';
		pghtml+='<li style="width:76px;"><a href="javascript:;" class="pag-down">下一页</a></li>';
		pghtml+='</ul>';
		pghtml+='</div>';
		return  pghtml;
	}
	
	page.finals=function()
	{
		var final=""
		final+='<li>';
		final+='<div class="final-dilist">';
		final+='<div class="final-btn-pd" >';
		final+='<a href="javascript:;"  id="click-bg-btn">报名成为标杆企业</a>';
		final+='</div>';
		final+='</div>';
		final+='</li>';
		final+='</ul>';
	    return  final;
	}*/
	
	
	/*$(".st-bod").each(function() {
	  
	  var id=$(this).attr("id");
	  if($("#"+id).css("display")=="block"){
	      page.prototype(id,18);
	  };
	  
    });*/
	
	//exports.module=page;
});