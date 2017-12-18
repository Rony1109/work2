/*东盟馆首页 2014.1.21 by lg*/

var Scroll = Scroll || {} ;
Scroll.Left = function(str,fcs,num,t){//左按钮事件
	var slideUl = $(str);slideUl.stop(true,true);
	var fcs = $(fcs), num = num, t = t,
		liWidth = slideUl.children().outerWidth(true),
		ulMLeft = parseInt(slideUl.css("margin-left")),
		slideWidth = ulMLeft + liWidth,
		ulWidth = liWidth * num;
	if(slideWidth >= 0){
		slideUl.animate({marginLeft:slideWidth},t,function(){
			var m = ulWidth/liWidth-1;
			fcs.children().eq(m).addClass("hover").siblings('.hover').removeClass("hover");
			$(this).css("margin-left",-liWidth*num);
//			console.log(ulWidth,ulMLeft,liWidth,slideWidth,num,m);
		});
	}else{
		slideUl.animate({marginLeft:slideWidth},t,function(){
			var m = -slideWidth/liWidth-1;
			fcs.children().eq(m).addClass("hover").siblings('.hover').removeClass("hover");
//			console.log(ulWidth,ulMLeft,liWidth,slideWidth,num,m);
		});
	}
};
Scroll.Right = function(str,fcs,num,t){//右按钮事件
	var slideUl = $(str);slideUl.stop(true,true);
	var fcs = $(fcs), num = num, t = t,
		liWidth = slideUl.children().outerWidth(true),
		ulMLeft = parseInt(slideUl.css("margin-left")),
		slideWidth = ulMLeft - liWidth,
		ulWidth = liWidth * num;
	if(-slideWidth <= ulWidth){
		slideUl.animate({marginLeft:slideWidth},t,function(){
			var m = -(slideWidth+liWidth)/liWidth;
			fcs.children().eq(m).addClass("hover").siblings('.hover').removeClass("hover");
//			console.log(ulWidth,ulMLeft,liWidth,slideWidth,num,m);
		});
	}else{
		slideUl.animate({marginLeft:slideWidth},t,function(){
			fcs.children().eq(0).addClass("hover").siblings('.hover').removeClass("hover");
			$(this).css("margin-left",-liWidth);
		});
//		console.log(ulWidth,ulMLeft,liWidth,slideWidth,num,0);
	}
};

Scroll.focusFun = function(str,fcs,w,i,t){//焦点事件
	var slideUl = $(str), fcs = $(fcs), w = w, i = i, t = t, slideWidth = w * (i+1);
	slideUl.stop(true,true);
	slideUl.animate({marginLeft:-slideWidth},t,function(){
		fcs.children().eq(i).addClass("hover").siblings('.hover').removeClass("hover");
	});
};

Scroll.init = function(str){//初始化滚动事件
	var $s = $(str), $sp = $s.parent(), l = $s.children().length, w = $s.children().outerWidth(true), t = 200,
		$first = $s.children(":first").clone(),
		$last = $s.children(":last").clone(),
		$lbtn = $('<a class="ico-s-lt" href="javascript:Scroll.Left(\'#scroll-ly\',\'#scrollFocus\','+l+','+t+')"></a>'),
		$rbtn = $('<a class="ico-s-gt" href="javascript:Scroll.Right(\'#scroll-ly\',\'#scrollFocus\','+l+','+t+')"></a>'),
		$focusDiv = $('<div id="scrollFocus" class="scroll-focus"></div>'),
		winWidth = window.screen.width;
	if(winWidth <= 1100){//按照分辨率，控制按钮显示
		$sp.parent(".g-pr").removeClass("w-1060").addClass("g-o");
	}
	if(l > 1){//最少显示2个
		$sp.after($lbtn,$rbtn);//插入控制按钮
		$sp.parent().hover(function(){$lbtn.show();$rbtn.show();},function(){$lbtn.fadeOut();$rbtn.fadeOut();});//显示控制按钮
		$sp.after($focusDiv);//插入焦点视窗
		for(i=0; i<l; i++){//插入焦点到焦点视窗中
			if(i==0){
				$focusDiv.append('<a class="ico-focus hover" href="javascript:Scroll.focusFun(\'#scroll-ly\',\'#scrollFocus\','+w+','+i+','+t+')"></a>');
			}else{
				$focusDiv.append('<a class="ico-focus" href="javascript:Scroll.focusFun(\'#scroll-ly\',\'#scrollFocus\','+w+','+i+','+t+')"></a>');
			}
		}
		$first.appendTo($s);$last.prependTo($s);$s.css("margin-left",-w);
	}
}