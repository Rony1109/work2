/**
 * 前端模板js文件
 * 
 */
seajs.config({
	alias:  {
		'focus': 'c/home/index/js/focusPlay',
		'src': 'c/home/index/js/src_bdt'
	}			  
});
define(function(require, exports, module) {
	var csc = require('focus');	
	var src = require('src');	
	//设置首页及添加收藏
	require('m/top-bar/js/init');
	require('c/home/index/js/focusPlay');
	require('m/head-search/js/init');
	require('./index');
	
	//轮播
	$("div.src-img ul").find("script").remove();
	$("div.src-two-img ul").find("script").remove();
	csc.focusPlay("div.src-img");
	csc.focusPlay("div.src-two-img");
	
	//名企巡展左移动
	$(".hot-seller .sle-l").click(function(){
		src.left_right(".hot-seller","1");
	});
	//名企巡展右移动
	$(".hot-seller .sle-r").click(function(){
		src.left_right(".hot-seller","2");
	});
	//名企巡展轮播
	var timert;
	$('.hot-seller').hover(function(){
			 clearInterval(timert);
		 },function(){
			 var $th=$(this);
			 timert= setInterval(function(){
				 src.left_right($th,"1");
			 },5000);
	 }).trigger("mouseleave");

    //友情链接更多
    require('c/home/links/js/linkMore');
});

