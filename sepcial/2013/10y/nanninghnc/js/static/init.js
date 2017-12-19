define(function(require, exports, module){
	$('.ctn2 .img .mouseLeft, .ctn2 .img .mouseRight').hover(function(){
		$(this).find('a').css('display','block');
	}, function(){
		$(this).find('a').css('display','none');
	});

	//slider
	var li_len = $('.ctn3 .slider li').length;
	//初始化信息
	$('.ctn3 .img a').html($('.ctn3 .slider li:eq(0)').find('img').attr('alt'));
	$('.ctn3 .slider li').each(function(index){
		$(this).click(function(){
			//信息填充
			$('.ctn3 .img a').html($(this).find('img').attr('alt'));

			//console.log();
			//更换地址
			var path = $(this).find('img').attr('src');
			$('.ctn3 .img').find('img').attr('src',path);

			
		});
	});

	$('.ctn4 ul li').each(function(){
		$(this).find('a').html($(this).find('img').attr('alt'));
		$(this).hover(function(){
			$(this).find('p').slideDown(200);
			$(this).find('a').slideDown(200);
		}, function(){
			$(this).find('p').slideUp(200);
			$(this).find('a').slideUp(200);
		});
		
	});

	//弹框和提交
	var submit = require('./submit')
	submit.fn();
	submit.valid('.dialog form');
	//$('.ctn4 ul li a').html($('.ctn4 ul li').eq(0).find('img').attr('alt'));

	var slide = require('./slide');
	
	new slide(".footer .slider ul",".footer .slider ul>li",{
		slideWidth: 210,
		slideHeight: 155,
		slideDirection: 0,
		slides_xssm: 4,
		slideButs_bindsj: "click",
		slides_to_l:'.footer .slider a.prev',//前一个事件绑定对象
		slides_to_r:'.footer .slider a.next'//后一个事件绑定对象
	});

	new slide(".ctn2 .slider-img ul",".ctn2 .slider-img ul>li",{
		slideWidth: 514,
		slideHeight: 264,
		slideDirection: 0,
		slides_xssm: 1,
		slideButs_bindsj: "click",
		slides_to_l:'.ctn2 a.prev',//前一个事件绑定对象
		slides_to_r:'.ctn2 a.next'//后一个事件绑定对象
	});

	new slide(".top .slider ul",".top .slider ul>li",{
		slideWidth: 160,
		slideHeight: 30,
		slideDirection: 0,
		slides_xssm: 6
	});

	new slide(".ctn3 .slider ul",".ctn3 .slider ul>li",{
		slideWidth: 163,
		slideHeight: 86,
		slideDirection: 1,
		slides_xssm: 4,
		slideButs_bindsj: "click",
		slides_fun: function(i){
			$('.ctn3 .img').find('img').attr('src', $('.ctn3 .slider ul li').eq(i).find('img').attr('src'));
			$('.ctn3 .img a').html($('.ctn3 .slider ul li').eq(i).find('img').attr('alt'));
			/*$('.ctn3 .border').position().left = $('.ctn3 .slider ul li').eq(i).position().left;
			$('.ctn3 .border').position().top = $('.ctn3 .slider ul li').eq(i).position().top;*/
			/*$('.ctn3 .border').animate({
				top: ($('.ctn3 .slider ul li').eq(i).position().top + 2*(i+1))
			});*/
			$('.ctn3 .slider ul li').click(function(){
				$('.ctn3 .border').animate({
					top: ($(this).position().top-3)
				});
			});
		}
	});
});