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
     $(".ao").click(function(){
        art.dialog({
		id:'outlet',
        title:false,
        lock:true,
		padding:0,
        content:$('.popup-outlet')[0],
        });
     });
	})
	 $(function(){
     $(".sp").click(function(){
        art.dialog({
		id:'outlet',
        title:false,
        lock:true,
		padding:0,
        content:$('.popup-leather')[0],
        });
     });
	})
	 $(function(){
     $(".te").click(function(){
        art.dialog({
		id:'outlet',
        title:false,
        lock:true,
		padding:0,
        content:$('.popup-tea')[0],
        });
     });
	})
	$(function(){
     $(".fo").click(function(){
        art.dialog({
		id:'outlet',
        title:false,
        lock:true,
		padding:0,
        content:$('.popup-food')[0],
        });
     });
	})
	$(function(){
     $(".as").click(function(){
        art.dialog({
		id:'outlet',
        title:false,
        lock:true,
		padding:0,
        content:$('.popup-asean')[0],
        });
     });
	})
	
	
   });
