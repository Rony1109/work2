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
		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('http://res.csc86.com/js/l/jquery.js');
    require('top');
    require('header');
    require('placeholder');
	require('http://res.csc86.com/js/m/config.js');
	require('http://res.csc86.com/js/p/artDialog/4.1.5/jquery.artDialog.js');
	require('http://res.csc86.com/js/p/artDialog/4.1.5/plugins/iframeTools.source.js');
	require('http://res.csc86.com/js/m/dialog.js');
	require('http://res.csc86.com/js/m/intOrder.js');
	require('http://res.csc86.com/js/c/shop/shop.js');

    /*
     * 以下为专题js代码
     * ......
     */
	 
	 $(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
	 
	 $(".pro-c li").hover(function(){$(this).find(".thid2").css("visibility","visible")},function(){$(this).find(".thid2").css("visibility","hidden")});
	 $(".arpall li").hover(function(){$(this).children("span").css("display","block")},function(){$(this).children("span").removeAttr("style")});
 
	 //左移动
	$(".info06 .scr-l").click(function(){
		left_right(".info06 .scr-all","1");
	});
	//右移动
	$(".info06 .scr-r").click(function(){
		left_right(".info06 .scr-all","2");
	});
	var timer3;
	$('.info06').mouseenter(function(){
			 clearInterval(timer3);
		 }).mouseleave(function(){
			 var $th=$(this);
			 timer3= setInterval(function(){
				 left_right($th,"1");
			 },3000);
	 }).trigger("mouseleave");
	
	
	//轮播
var left_right=function(tag,un){
	var $ul=$(tag).find("ul"),
		$w=$ul.find("li:first").width();
	if(!$ul.is(":animated")){
		if(un==1){
			$ul.animate({
				left:-$w
			},300,function(){
				$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
		}else{
			$ul.css({left:-$w}).find("li:last").prependTo($ul);
			$ul.animate({
				left:0
			},300);
		}
	}
}


});

function toline(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"卖家报名",padding:"0 20px 20px",content:'<div class="tablewidth"><div class="tab-title"><a class="g-fr" href="javascript:;" title="" onclick="closet()"></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=24&siteid=1&pc_hash=mGpwrR" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i> 主营产品</span><input type="text" name="info[mainProduct]" id="contact" value="" class="input-text"></li><li><span color="red"><i>*</i>公司名称</span><input type="text" name="info[company]" id="tel" value="" class="input-text"></li><li><span color="red"><i>*</i> 联系人</span><input type="text" name="info[contact]" id="mainProduct" value="" class="input-text"></li><li><span color="red"><i>*</i>电话	</span><input type="text" name="info[tel]" id="company" value="" class="input-text"></li></ul>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',
		ok: function() {},
		cancel:false,
		fixed: true,
		 lock: true,
    	background: '#000', // 背景色
		opacity: 0.67,
		id: 'Fm7',
		init:function(){
			$("form").submit( function () {
				var company=$("input[name='info[mainProduct]']").val(),
				contact=$("input[name='info[company]']").val(),
				tel=$("input[name='info[contact]']").val(),
				mainProduct=$("input[name='info[tel]']").val();
				if(company==""||contact==""||tel==""||mainProduct==""){
					return false;
				}else{
					return true;
				}
			} );
		},
		icon: 'question',
		okVal: false});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}

function closet(){
	art.dialog({id:'Fm7'}).close();	
}


function tolinetwo(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"金牌供应商",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><a class="g-fr" href="javascript:;" title="" onclick="closett()"></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=21&siteid=1&pc_hash=mGpwrR" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i> 公司名称</span><input type="text" name="info[company]" id="contact" value="" class="input-text"></li><li><span color="red"><i>*</i>联系人</span><input type="text" name="info[contact]" id="tel" value="" class="input-text"></li><li><span color="red"><i>*</i>电话</span><input type="text" name="info[tel]" id="mainProduct" value="" class="input-text"></li><li><span color="red"><i>*</i>主营产品</span><input type="text" name="info[mainProduct]" id="company" value="" class="input-text"></li></ul>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',
		ok: function() {},
		cancel:false,
		fixed: true,
		id: 'Fm8',
		lock: true,
    	background: '#000', // 背景色
		opacity: 0.67,
		init:function(){
			$("form").submit( function () {
				var company=$("input[name='info[company]']").val(),
				contact=$("input[name='info[contact]']").val(),
				tel=$("input[name='info[tel]']").val(),
				mainProduct=$("input[name='info[mainProduct]']").val();
				if(company==""||contact==""||tel==""||mainProduct==""){
					return false;
				}else{
					return true;
				}
			} );
		},
		icon: 'question',
		okVal: false});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}

function closett(){
	art.dialog({id:'Fm8'}).close();	
}