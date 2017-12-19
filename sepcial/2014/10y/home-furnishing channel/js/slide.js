/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
	require.async('./cscSwitch',function(){
		
		//图片show()/hide()
		$("#slide4 .slide-trg").cscSwitch("#slide4 > .pic-list2 > li",{
			trigger:'li',
			effect: 'default',
			circular:true, //为true时表示可循环切换
		}).autoplay(3); //autoplay()为自定播放，3为当前图片停留的时间
		
		
	});
});
