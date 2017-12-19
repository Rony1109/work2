/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');
	//var page=require('./page');
    var dialog=require('dialog');
	var pg = require('./page');
	var bg={}
	<!-- 弹窗功能判断 -->
	bg.dialogs=function(circleId){
	  dialog({
		   id: circleId,
		   title:'',
		   fixed: true,
		   lock:true,
		   background:"#000",
		   opacity:"0.3",
		   content:$("#"+circleId).html(),
		   init:function(){
			  var that=this;
		      $('#bg-sh-subbtn').on('click',function(){
		          var $this = $(this);
				  if($("#industry_id").val()=="")
				  {
				      alert("所属行业不能为空！");
				      return;
				  }else if($("#address_id").val()==""){
				      alert("旺铺地址不能为空！");
					  return;
			      }else if($("#Phone_id").val()==""){
				      alert("联系方式不能为空！");
				      return;
			      }else if($("#Reasons_id").val()==""){
				      alert("申请理由不能为空！");
				      return;
			      }else
				  {
				      var datas=$this.parents("form.bg-fromid").serializeArray();
				      $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				          if(data.status==true){
						      that.close();
							  bg.dialogs('bg-subxinxi-list');
					      }else{
									//alert('提交失败！')
						  }
					  }, 'jsonp');
			       }
			   });
		   }
      });
    }
	
	<!--判断用户是否注册 -->	
	    
		$("body").delegate(".final-btn-pd em","click",function(){
		 $.ajax({
			url: 'http://api.csc86.com/notify/count/all/',
			dataType: 'jsonp',
			type: 'get',
			success: function(dataMsg) {
			  // alert(JSON.stringify(dataMsg)); 
			   if (dataMsg.status) {
					bg.dialogs('bg-sh-xinxi');			   
			   }
			   else{
			       alert("请用户先登录！在申请成为标杆企业");
				    var isLogin = require('http://api.csc86.com/notify/count/all/?callback=define');
					if (isLogin.status != true) {
						location.href = "http://member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href);
						return false;
					}
				}
			 }
		  })	
	});

	<!--标题 切换功能实现 -->
	$("#st-sort-switch").each(function() {
	    var leng=$("#st-sort-switch ul li").length;
		$("#st-sort-switch ul li").mouseover(function(){
			for(var i=0;i<leng;i++) {
				//$("#st-sort-switch ul li").removeClass("st-sort-selected");
				if(i==$(this).index()) {
				   for(var j=1;j<=leng;j++){ 
					   $("#st-bod"+j).css("display","none"); 
					  $("#st-sort-switch ul li").eq(j-1).removeClass("st-sort-selected"); 
	  			   }
				   $(this).addClass("st-sort-selected");
				  
				   page.prototype("st-bod"+(i+1));
				   
				   $("#st-bod"+(i+1)).css("display","block");
				}
			}
	    });
	});
	
	
	<!-- 图片移动遮罩 -->
	$("body").delegate(".bod-left .bod-div-list","mouseover",function(){
	   
	     $(this).find('.mask-xinxi').css("display","block");
	});
	$("body").delegate(".bod-left .bod-div-list","mouseout",function(){
	   
	     $(this).find('.mask-xinxi').css("display","none");
	});
	

    
	<!-- 分页 -->
	var page={}
	<!-- 页面加载模块的统一调用页面-->
	page.prototype =function(e) {
	   var g_html;
	   $(".st-foot ul li a em").removeClass("st-pag-click");
	   var fian=page.finals();
	   
	   var array=page.arrays("",e,"");
	    var sssd=JSON.stringify(array);
	   var num=array.length;
	   
	   var ss=parseInt(num/11);
	   var as=(num%11);
	   if(as>0)
	   {
		   ss=ss+1;
	   }
	   var pge=page.pghtml(ss,1);
	   var lihtm=page.pgli(num,array);
	   $("#"+e).html(lihtm+fian+pge);
	    
	   page.footclick(e,ss);
	}
	
	<!-- 截取数组数据来进行操作-->
    page.arrays =function(obj,e,ss)
	{   
	
	    if(e=="st-bod1")
		{
	        var array=[{"bgxy":1,"gsdz":1,"wpdz":1,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":2,"gsdz":2,"wpdz":2,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":3,"gsdz":3,"wpdz":3,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":4,"gsdz":4,"wpdz":4,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":5,"gsdz":5,"wpdz":5,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":6,"gsdz":6,"wpdz":6,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":7,"gsdz":7,"wpdz":7,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":8,"gsdz":8,"wpdz":8,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":9,"gsdz":9,"wpdz":9,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":10,"gsdz":10,"wpdz":10,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":11,"gsdz":11,"wpdz":11,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":12,"gsdz":12,"wpdz":12,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":13,"gsdz":13,"wpdz":13,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":14,"gsdz":14,"wpdz":14,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":15,"gsdz":15,"wpdz":15,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"},{"bgxy":16,"gsdz":16,"wpdz":16,"mask":"sdfasdfasdfsdaf","wpurl":"http://baidu.com","bgimgurl":"http://qidian.com","bgimg":"css/img/bg-user-img1.jpg"}];
		}else if(e=="st-bod2"){
		    var array=[{"bgxy":1,"gsdz":1,"wpdz":1,"mask":"sdfasdfasdfsdaf"},{"bgxy":2,"gsdz":2,"wpdz":2,"mask":"sdfasdfasdfsdaf"},{"bgxy":3,"gsdz":3,"wpdz":3,"mask":"sdfasdfasdfsdaf"},{"bgxy":4,"gsdz":4,"wpdz":4,"mask":"sdfasdfasdfsdaf"},{"bgxy":5,"gsdz":5,"wpdz":5,"mask":"sdfasdfasdfsdaf"},{"bgxy":6,"gsdz":6,"wpdz":6,"mask":"sdfasdfasdfsdaf"},{"bgxy":7,"gsdz":7,"wpdz":7,"mask":"sdfasdfasdfsdaf"},{"bgxy":8,"gsdz":8,"wpdz":8,"mask":"sdfasdfasdfsdaf"},{"bgxy":9,"gsdz":9,"wpdz":9,"mask":"sdfasdfasdfsdaf"},{"bgxy":10,"gsdz":10,"wpdz":10,"mask":"sdfasdfasdfsdaf"},{"bgxy":11,"gsdz":11,"wpdz":11,"mask":"sdfasdfasdfsdaf"},{"bgxy":12,"gsdz":12,"wpdz":12,"mask":"sdfasdfasdfsdaf"},{"bgxy":13,"gsdz":13,"wpdz":13,"mask":"sdfasdfasdfsdaf"},{"bgxy":14,"gsdz":14,"wpdz":14,"mask":"sdfasdfasdfsdaf"},{"bgxy":15,"gsdz":15,"wpdz":15,"mask":"sdfasdfasdfsdaf"},{"bgxy":16,"gsdz":16,"wpdz":16,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"}];
		}else if(e=="st-bod3"){
		    var array=[{"bgxy":1,"gsdz":1,"wpdz":1,"mask":"sdfasdfasdfsdaf"},{"bgxy":2,"gsdz":2,"wpdz":2,"mask":"sdfasdfasdfsdaf"},{"bgxy":3,"gsdz":3,"wpdz":3,"mask":"sdfasdfasdfsdaf"},{"bgxy":4,"gsdz":4,"wpdz":4,"mask":"sdfasdfasdfsdaf"},{"bgxy":5,"gsdz":5,"wpdz":5,"mask":"sdfasdfasdfsdaf"},{"bgxy":6,"gsdz":6,"wpdz":6,"mask":"sdfasdfasdfsdaf"},{"bgxy":7,"gsdz":7,"wpdz":7,"mask":"sdfasdfasdfsdaf"},{"bgxy":8,"gsdz":8,"wpdz":8,"mask":"sdfasdfasdfsdaf"},{"bgxy":9,"gsdz":9,"wpdz":9,"mask":"sdfasdfasdfsdaf"},{"bgxy":10,"gsdz":10,"wpdz":10,"mask":"sdfasdfasdfsdaf"},{"bgxy":11,"gsdz":11,"wpdz":11,"mask":"sdfasdfasdfsdaf"},{"bgxy":12,"gsdz":12,"wpdz":12,"mask":"sdfasdfasdfsdaf"},{"bgxy":13,"gsdz":13,"wpdz":13,"mask":"sdfasdfasdfsdaf"},{"bgxy":14,"gsdz":14,"wpdz":14,"mask":"sdfasdfasdfsdaf"},{"bgxy":15,"gsdz":15,"wpdz":15,"mask":"sdfasdfasdfsdaf"},{"bgxy":16,"gsdz":16,"wpdz":16,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"},{"bgxy":17,"gsdz":17,"wpdz":17,"mask":"sdfasdfasdfsdaf"}];
		}
		var list={};
		//list
		var ssdf=obj*11;
		var kaishi=ssdf-11;
		var jieshu=ssdf;
		if(obj)
		{
			var str=array.slice(kaishi,jieshu);
			var arrleng= new Array();
			for(var i=0;i<=str.length;i++)
			{
			  // alert(str.length);	
			   arrleng[i]=str[i];
			}
			var li=page.pgli(str.length,arrleng);
			
			var final=page.finals();

			var pag=page.pghtml(ss,obj);
	         
			$("#"+e).html(li+final+pag);
			
			var pageclick=page.footclick(e,ss);
		}else
		{
		    return array;
		}
	}
	
	/*委派事件*/
	page.footclick = function(e,ss)
	{
		
		$(".pag-nub").delegate("em","click",function(){
			 //$(this).addClass("st-pag-click");
			 page.arrays($(this).html(),e,ss);
		});
		
		$(".pag-up").delegate("em","click",function(){
			
		    if($(".st-pag-click").html()==1)
			{
			    return;
			}else
			{   
		        page.arrays(parseInt($(".st-pag-click").html())-1,e,ss);
			}
		});
		
		$(".pag-down").delegate("em","click",function(){
			
		    if($(".st-pag-click").html()==ss)
			{
			  return;
			}else
			{
		        page.arrays(parseInt($(".st-pag-click").html())+1,e,ss);
			}
		});  
   }
	
	<!--li标杆商户-->
	page.pgli   =function(num,obj){
	
	   var txt="";
	   txt+='<ul>';
	   for(var i=0;i<num;i++)
	   { 
	     if(i>10){
		     break;
		 }else
		 { 
		   txt+='<li>';
		   txt+='<div class="bod-left">';
		   txt+='<div class="bod-div-list"><a href="javascript:;" class="bod-img-list"><img src="'+obj[i].bgimg+'"></a><a href="'+obj[i].bgimgurl+'" class="mask-xinxi" target="_blank"><p>'+obj[i].mask+'</p></a> </div> ';
		   txt+='<div class="bod-list">';
		   txt+='<div class="bod-list-img"></div>';
		   txt+='<div class="bod-list-txt">';
		   txt+='<p>'+obj[i].bgxy+'</p>';
		   txt+='<p>'+obj[i].gsdz+'</p>';
		   txt+='<p><a href="'+obj[i].wpurl+'" class="bod-url-list" target="_blank">'+obj[i].wpdz+'</a></p>';
		   txt+='</div>';
		   txt+='</div>';
		   txt+='</div>';
		   txt+='</li>';
		 }
	   }
	   return txt;
	}
	<!--page分页-->
	page.pghtml  =function(pgs,obj){
	    
		
	    var pghtml="";
		pghtml+='<div class="st-foot">';
		pghtml+='<ul>';
		pghtml+='<li style="width:76px;"><a href="javascript:;" class="pag-up"><em>上一页</em></a></li>';
		for(var i=0;i<pgs;i++)
		{
			if(i==(obj-1))
			{
			  pghtml+='<li><a href="javascript:;" class="pag-nub"><em class="st-pag-click">'+(i+1)+'</em></a></li>';
			}else
			{
			  pghtml+='<li><a href="javascript:;" class="pag-nub"><em >'+(i+1)+'</em></a></li>';	
			}
		}
		pghtml+='';
		pghtml+='<li style="width:76px;"><a href="javascript:;" class="pag-down"><em>下一页</em></a></li>';
		pghtml+='</ul>';
		pghtml+='</div>';
		return  pghtml;
	}
	<!-- 报名成为标杆li -->
	page.finals=function()
	{
		var final=""
		final+='<li>';
		final+='<div class="final-dilist">';
		final+='<div class="final-btn-pd" >';
		final+='<a href="javascript:;" id="click-bg-btn"><em>报名成为标杆企业</em></a>';
		final+='</div>';
		final+='</div>';
		final+='</li>';
		final+='</ul>';
	    return  final;
	}
	
	<!-- 页面加载判断事件 传递当前ID-->
	$(".st-bod").each(function() {
	  
	  var id=$(this).attr("id");
	  if($("#"+id).css("display")=="block"){
	      page.prototype(id);
	  };
    });
	
	
	
	exports.module=page;
	exports.module=bg;
});
