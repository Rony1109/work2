/*
	无限循环滑动JS效果  By lg - 2013.05.10
	marquee.loop(
			outerDiv,	--循环的框架，监测鼠标hover事件
			leftBtn,	--左按钮，绑定向左滑动事件
			rightBtn,	--右按钮，绑定向右滑动事件
			slideUl,	--当前滑动层，其子级为滑动对象
			t			--滑动的时间，间隔时间为其10倍
		);
	实现方法：
		HTML结构固定，设置容器(ul)的子级(li) margin-left 值
		并将其插入到容器内的最前（或最后）
*/

var marquee = {
	val : function(slideUl,t){//计算UL,LI的值和时间
		var slideLiWidth = slideUl.children().outerWidth(true),
			liSize = slideUl.children().size(),
			slideUlWidth = liSize * slideLiWidth +10,
			t = t || 300;
		return [slideUlWidth,slideLiWidth,t,liSize];
	},
	slideLeft : function(slideUl,slideLiWidth,t){//向左滑动
		slideUl.children().stop(true,true);
		slideUl.children().last().css("margin-left","-"+slideLiWidth+"px").prependTo(slideUl).animate({marginLeft:0},t);
	},
	slideRight : function(slideUl,slideLiWidth,t){//向右滑动
		slideUl.children().stop(true,true);
		slideUl.children().first().animate({marginLeft:"-"+slideLiWidth+"px"},t,function(){$(this).appendTo(slideUl).css("margin-left",0)});
	},
	autoSlide : function(slideUl,slideLiWidth,t){//自动滑动
		var v = setInterval(function(){marquee.slideRight(slideUl,slideLiWidth,t);},t*10);
		return v;
	},
	loop : function(outerDiv,leftBtn,rightBtn,slideUl,t){//执行无限循环
		var outerDiv = $(outerDiv),
			leftBtn = $(leftBtn),
			rightBtn = $(rightBtn),
			slideUl = $(slideUl),
			v = marquee.val(slideUl,t),
			auto = marquee.autoSlide(slideUl,v[1],v[2]);
		outerDiv.hover(function(){
			clearInterval(auto);
		},function(){
			auto = marquee.autoSlide(slideUl,v[1],v[2]);
		});
		leftBtn.bind("click",function(){ marquee.slideLeft(slideUl,v[1],v[2]); });
		rightBtn.bind("click",function(){ marquee.slideRight(slideUl,v[1],v[2]); });
	}
};