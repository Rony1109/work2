define(function(require, exports, module){
	$('.aside-left ul li').each(function(){
		$(this).hover(function(){
			$(this).find('a.detail').slideDown(200);
		}, function(){
			$(this).find('a.detail').slideUp(200);
		});
	});


	//表单验证及提交
	var submit = require('./submit');
	submit.valid('.form-fixed form');

	//slider
	/*var slider = require('./textSlide');
	slider({
		elem: '.aside-right .marquee ul',
		during: 2000,
		nums: 1
	});*/
	
	var slide = require('./slide');

	new slide(".marquee ul",".marquee ul>li",{
		slideWidth: 280,
		slideHeight:36, 
		slideDirection: 1,
		slides_xssm:7
	});
	
	new slide(".slider ul",".slider ul>li",{
		slideWidth: 223,
		slideHeight:155, 
		slideDirection: 0,
		slides_xssm:4,
		slideButs_bindsj: "click",
		slides_to_l:'.slider a.prev',//前一个事件绑定对象
		slides_to_r:'.slider a.next'//后一个事件绑定对象
	});

});