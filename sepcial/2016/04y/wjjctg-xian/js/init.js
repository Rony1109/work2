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
	var dialog=require('dialog');
    var bg={};
	
    /*
     * 以下为专题js代码
     * ......
     */
		 
		//活动介绍 
		$("#ct-btn").on('click',function(){
		var $this = $(this);
		if($("#industry_id").val()=="")
		{
			alert("所属行业不能为空！");
			return;
		}else if($("#address_id").val()==""){
			alert("旺铺地址不能为空！");
			return;
		}else if($("#Tel_id").val()==""){
			alert("联系方式不能为空！");
			return;
		}else if($("#Reason_id").val()==""){
			alert("申请理由不能为空！");
			return;
		}else
		{
			var datas=$("form.cy-tg").serializeArray();
			$.get('http://cncms.csc86.com/formguide/index.php', datas, function(data) {
				if(data.status==true){
					dialog({
						id: 'bg-subxinxi-list',
						title:'',
						fixed: true,
						lock:true,
						background:"#000",
						opacity:"0.3",
						content:$("#bg-subxinxi-list").html(),
						init:function(){
							$("#industry_id").val("");
							$("#address_id").val("");
							$("#Phone_id").val("");
							$("#Reasons_id").val("");
						}
					});
					 
				}else{
							//alert('提交失败！')
				}
			}, 'jsonp');
		}
	}) 
	
	//侧面导航栏 fixed
     $(function(){
		 var arr = [];
		 var fix = $(".fixed");
		 var fixA = fix.find("li a");
		 $(".fix-box").each(function(){
			 arr.push($(this).offset().top);
		  });
		  $(window).scroll(function(){
			  var topscr = $(this).scrollTop();
			  topscr>=768?fix.fadeIn():fix.fadeOut();
			  });
		  fixA.on("click",function(){
			  var _index = fixA.index(this);
			  //alert(_index);
			  $("html,body").animate({scrollTop:arr[_index]},500);
			   return false;
			 }); 	
		 });
		exports.module=bg; 
});
