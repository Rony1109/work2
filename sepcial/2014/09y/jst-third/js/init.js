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
        'placeholder': 'm/sea-modules/placeholder.js'
    },

    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    //require('./textScroll');
	var dialog = require('m/dialog/js/init');
	
    require('jquery');
    require('top');
    require('header');
    require('placeholder');

    //弹出
    $(function(){
     $(".sup").click(function(){
        art.dialog({
        title:false,
        lock:true,
        content:$('.pup')[0]
        });
     });
    });

	
	//选项卡
		$(".n1").click(function(){
				$(".c1").show();
				$(".c2").hide();
				$(".c3").hide();
				$(".n1").addClass("cur");
				$(".n2").removeClass("cur");
				$(".n3").removeClass("cur");
			})
		$(".n2").click(function(){
				$(".c2").show();
				$(".c1").hide();
				$(".c3").hide();
				$(".n2").addClass("cur");
				$(".n1").removeClass("cur");
				$(".n3").removeClass("cur");
			})
		$(".n3").click(function(){
				$(".c3").show();
				$(".c2").hide();
				$(".c1").hide();
				$(".n3").addClass("cur");
				$(".n2").removeClass("cur");
				$(".n1").removeClass("cur");
			})


});
