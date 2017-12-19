seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
   // require('jquery');
	require.async('./cscSwitch',function(){
		//图片左右轮播不可循环
		
		
		//图片左右自动轮播不间断循环(带触点)
		var api=$("#scrollTrg3").cscSwitch("#scroll4 > .scroll-c > ul > li",{
			trigger:'li',
			effect:'scroll',//移动方式，此处为scroll滚动移动
			steps:1,//每次移动4个
			visible:4,//默认可见4个	
			nextBtn:'#next4',//向后按钮
			prevBtn:'#prev4',//向前按钮
			beforeSwitch:function(){
				$('#scroll4 li').removeClass('hover');
			},
			onSwitch:function(){
				api.getVisiblePanel(api.getIndex()).eq(0).addClass('hover')
			}
		}).carousel().autoplay({interval:3,api:true});
		$('#next4,#prev4').hover(function(){
			api.stop();
		},function(){
			api.play();
		});
		
	});
	
});