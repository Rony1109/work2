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
	require('http://res.csc86.com/f=js/m/config.js,v2/l/artDialog/4.1.7/jquery.artDialog.js,v2/l/artDialog/4.1.7/plugins/iframeTools.source.js,js/m/dialog.js');
	var dialog=require('dialog');


var cscs={};
cscs.dialogs=function(circleId){
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
		       $('#dmj-rz-subbtn').on('click',function(){
				    var $this = $(this);
				   if($("#dmj-qymc").val()=="")
				  {
				      alert("企业名称不能为空！");
				      return;
				  }else if($("#dmj-cgcp").val()==""){
					  alert("采购产品不能为空！");
				      return;
				  }else if($("#dmj-name").val()==""){
					  alert("姓名不能为空！");
				      return;
				  }else if($("#dmj-tel").val()==""){
					  alert("电话不能为空！");
				      return;
				  }else if($("#dmj-Email").val()==""){
					  alert("邮箱不能为空！");
				      return;
				  }else if($("#dmj-other").val()==""){
					  alert("其他不能为空！");
				      return;
				  }else
				  {
					  var datas=$this.parents("form.dmj-rzlist").serializeArray();
					  $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				          if(data.status==true){
						      that.close();
							  cscs.dialogs('dmj-subxinxi-list');
					      }else{
							  alert('提交失败！')
						  }
					  }, 'jsonp');
				  }
				});
				
				$('#gys-rz-subbtn').on('click',function(){
					var $this = $(this);
					if($("#gys-qymc").val()=="")
					{
						alert("企业名称不能为空！");
						return;
					}else if($("#gys-zycp").val()==""){
						alert("主营产品不能为空！");
						return;
					}else if($("#gys-name").val()==""){
					    alert("姓名不能为空！");
						return;
					}else if($("#gys-tel").val()==""){
						alert("电话不能为空！");
						return;
					}else if($("#gys-Email").val()==""){
					    alert("邮箱不能为空！");
						return;
					}else if($("#gys-other").val()==""){
						alert("其他不能为空！");
						return;
					}else
					{
					  var datas=$this.parents("form.gys-rzlist").serializeArray();
					  $.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				          if(data.status==true){
						      that.close();
							  cscs.dialogs('dmj-subxinxi-list');
					      }else{
							  alert('提交失败！')
						  }
					  }, 'jsonp'); 
					
					}
				});
				
				$('#gys-xinxi-subbtn').on('click',function(){
					 that.close();
					cscs.dialogs('dmj-subxinxi-list')	
				});
		   }
      });
}


$('.baojia-btn-red').on('click',function(){
	cscs.dialogs('dmj-gys-list');
});

<!-- 大买家入驻的JS -->
$('#dmj-rz-btn').on('click',function(){
	   $.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
		   //alert(JSON.stringify(data));
		   if(data.status != true) {
			   seajs.use(csc.url("res", "/js/m/sign"), function() {
					csc.checkSign("location.reload");
				});
		   }
		   if(data.status==true)
		   {
			   cscs.dialogs('dmj-rzlstd-list');
		   }
	   },"jsonp");
});

<!-- 供应商入驻的JS -->
$('#gys-rz-btn').on('click',function(){
	$.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
	   //alert(JSON.stringify(data));
	   if(data.status != true) {
		   seajs.use(csc.url("res", "/js/m/sign"), function() {
				csc.checkSign("location.reload");
			});
	   }
	   if(data.status==true)
	   {
		   cscs.dialogs('dmj-gysrz-list');
	   }
   },"jsonp");
		
});

$('#new-dmj-rz-btn').on('click',function(){
	$.get("http://api.csc86.com/notify/count/all/?callback=define", function(data) {
		  
	   if(data.status != true) {
		   seajs.use(csc.url("res", "/js/m/sign"), function() {
				csc.checkSign("location.reload");
			});
	   }
	   if(data.status==true)
	   {
		   cscs.dialogs('dmj-rzlstd-list');
	   }
   },"jsonp");
    
});

$(".dmj-suspension").each(function() {
    $(".suspension-dh").hide();
	
	$(".suspension-kf").mousemove(function(){
        $(".suspension-dh").show();
    });
	
	$(".suspension-kf").mouseout(function(){
		$(".suspension-dh").hide();
	});
});

exports.module=cscs;
 });
