/*
 csc.banner.start(
	 div,	轮换图片的外层框架：用于获取鼠标滑过时清除自动切换
	 ul,	轮换图片的次父级层：用于设置图片切换
	 txt,	轮换图片的标题外层：用于设置标题切换
	 ol,	轮换图片的焦点外层：用于设置焦点切换
	 cur,	轮换图片的焦点当前样式：用于设置焦点的当前样式
	 t		轮换图片的滑动时间：默认为300毫秒，滑动时间间隔为其10倍
  )
 */
csc.banner = {//焦点图
	move : function(ul,txt,m,h,i,t){//移动图片
		ul.stop(false,true).animate({marginLeft:-(m*i)},t);
		txt.children().first().stop(false,true).animate({marginTop:-(h*i)},t);
	},
	tab : function(ol,cur,i){//切换焦点
		ol.children().siblings().removeClass(cur);
		ol.children().eq(i).addClass(cur);
	},
	auto : function(ul,txt,ol,cur,s,m,h,i,t){//自动执行
		var i = i || 0,v;
		return v = setInterval(function(){if(i >= s){i = 0;}else{csc.banner.move(ul,txt,m,h,i,t);csc.banner.tab(ol,cur,i);i++;}},t*10);
	},
	start : function(div,ul,txt,ol,cur,t){//开始动画
		var div = $(div),ul = $(ul),txt = $(txt),ol = $(ol),cur = cur,t = t || 300,q=0,
			liSize = ul.children().size(),
			liWidth = ul.children().outerWidth(true),
			olHight = txt.children().outerHeight(true),
			auto = csc.banner.auto(ul,txt,ol,cur,liSize,liWidth,olHight,q,t);
		div.hover(function(){clearInterval(auto);},function(){auto = csc.banner.auto(ul,txt,ol,cur,liSize,liWidth,olHight,q,t);});
		ol.children().each(function(i){
			$(this).hover(function(){
				csc.banner.tab(ol,cur,i);
				csc.banner.move(ul,txt,liWidth,olHight,i,t);
			},function(){q=i});
		});
	}
};