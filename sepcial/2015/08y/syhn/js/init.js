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
		'comment': 'm/comment/js/init.js',
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
    require('http://res.csc86.com/f=js/m/config.js');
	var dlg=require('dialog');

var syhn={};
    syhn.dlgs=function(circleId){
	  dlg({
		   id: circleId,
		   title:'',
		   fixed: true,
		   lock:true,
		   background:"#000",
		   opacity:"0.3",
		   content:$("#"+circleId).html(),
		   init:function(){
		       var that=this;  
			   /*供应商信息提交*/ 
			   $('#syhn-gys-sub').on('click',function(){
				    var $this = $(this);
				   if($("#syhn-gys-name").val()=="")
				  {
				      alert("企业名称不能为空！");
				      return;
				  }else if($("#syhn-gys-firstname").val()==""){
					  alert("联系人不能为空！");
				      return;
				  }else if($("#syhn-gys-phone").val()==""){
					  alert("电话不能为空！");
				      return;
				  }else if($("#syhn-gys-QQ").val()==""){
					  alert("QQ不能为空！");
				      return;
				  }else if($("#syhn-gys-email").val()==""){
					  alert("邮箱不能为空！");
				      return;
				  }else if($("#syhn-gys-others").val()==""){
					  alert("备注不能为空！");
				      return;
				  }else
				  {
					  var datas=$this.parents("form.syhn-gys-class").serializeArray();
					  $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				          if(data.status==true){
						      that.close();
							  syhn.dlgs('syhn-ok-list');
					      }else{
							  alert('提交失败！');
						  }
					  }, 'jsonp');
				  }
				});
				
				 /*采购商信息提交*/
				 $('#syhn-cgs-sub').on('click',function(){
				    var $this = $(this);
				   if($("#syhn-cgs-name").val()=="")
				  {
				      alert("企业名称不能为空！");
				      return;
				  }else if($("#syhn-cgs-products").val()==""){
					  alert("采购产品不能为空！");
					  return;
				  }else if($("#syhn-cgs-firstname").val()==""){
					  alert("姓名不能为空！");
				      return;
				  }else if($("#syhn-cgs-phone").val()==""){
					  alert("电话不能为空！");
				      return;
				  }else if($("#syhn-cgs-QQ").val()==""){
					  alert("QQ不能为空！");
				      return;
				  }else if($("#syhn-cgs-email").val()==""){
					  alert("邮箱不能为空！");
				      return;
				  }else if($("#syhn-cgs-others").val()==""){
					  alert("其他不能为空！");
				      return;
				  }else
				  {
					  var datas=$this.parents("form.syhn-cgs-class").serializeArray();
					  $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				          if(data.status==true){
						      that.close();
							  syhn.dlgs('syhn-ok-list');
					      }else{
							  alert('提交失败！')
						  }
					  }, 'jsonp');
				  }
				});
		   }
	  })
    }
/*供应商信息JS */
$('#syhn-gys-btn').on('click',function(){
	$.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
	   //alert(JSON.stringify(data));
	   if(data.status != true) {
		   seajs.use(csc.url("res", "/js/m/sign"), function() {
				csc.checkSign("location.reload");
			});
	   }
	   if(data.status==true)
	   {
		   syhn.dlgs('syhn-gys-list');
	   }
   },"jsonp");
		
});

<!-- 采购商信息JS -->
$('#syhn-cgs-btn').on('click',function(){
	$.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
	   //alert(JSON.stringify(data));
	   if(data.status != true) {
		   seajs.use(csc.url("res", "/js/m/sign"), function() {
				csc.checkSign("location.reload");
			});
	   }
	   if(data.status==true)
	   {
		   syhn.dlgs('syhn-cgs-list');
	   }
   },"jsonp");
		
});

$("#cjfx-tab-down").on('click',function(){
	var len=$(".cjfx-ztc-tab ul").find('li').length;
	for(var i=0; i<len;i++)
	{
	     $(".cjfx-ztc-tab ul").find("li").eq(i).removeClass();  
	}  
	$(this).css({'border-left':'1px solid #ccc','border-bottom':'0px'});
	$("#cjfx-tab-up").css({'border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
	$(this).addClass("cjfx-ztc-sed");
	$("#cjfx-tab-upshow").hide();
    $("#cjfx-tab-downshow").show();
});

$("#cjfx-tab-up").on('click',function(){
	var len=$(".cjfx-ztc-tab ul").find('li').length;
	for(var i=0; i<len;i++)
	{
	    $(".cjfx-ztc-tab ul").find("li").eq(i).removeClass();  
	}  
	$(this).css({'border-right':'1px solid #ccc','border-bottom':'0px'});
    $("#cjfx-tab-down").css({'border-bottom':'1px solid #ccc','border-left':'1px solid #ccc'});
	$(this).addClass("cjfx-ztc-sed");
	
	$("#cjfx-tab-downshow").hide();
	$("#cjfx-tab-upshow").show();
    
});

$('#cjfx-cjxx-til_id').each(function() {
	$.post("http://www.csc86.com/api.php?op=get_tradeshares&act=listTradeShares&cid=103",function(data){
	   //alert(JSON.stringify(data));
	   if(data.status=="1")
	   {
		   for(var i=0;i<data.data.length;i++)
		   {
			   if(i==0)
			   {
				   if(data.data[i].description.length>49)
				   {
					   var ahtl='<a href="'+data.data[i].url+'" style="color:#fb255d;">[详细]</a>';
					   var deshtm=data.data[i].description.substring(0,45)+"···";
			          $("#cjfx-title-ajaxtxt").html(deshtm+ahtl);
				   }else
				   {
				      $("#cjfx-title-ajaxtxt").html(data.data[i].description);
				   }
			   }
			   
		       $("#cjfx-title-ajax"+i).html(data.data[i].title);
			   $("#cjfx-title-ajax"+i).attr("href",data.data[i].url);
			   $("#cjfx-title-ajax"+i).attr("title",data.data[i].title);
		   }
	   }else
	   {
	       alert("无法获取成交分享数据");
	   }
	},'jsonp');
	
});

	
exports.module=syhn;	
});
