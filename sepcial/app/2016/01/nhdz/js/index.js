define(function(require, exports, module) {
	var $body=$('body'),
		$nav=$('nav'),
		$navLi=$('.nav-lst li'),
		$flr=$('.flr'),
		nav=$nav.offset().top,
		navH=$nav.height(),
		arry=[];

	$flr.each(function(){
		arry.push($(this).offset().top);
	});
	
	$(window).scroll(function(){
		var top=$(this).scrollTop();
		top>=nav?$body.addClass('fixed'):$body.removeClass('fixed');
		for(var i=0;i<=arry.length;i++){
			if(top>=arry[i]-navH&&top<=arry[i+1]-navH){
				$navLi.eq(i).addClass('cur').siblings().removeClass('cur');
			}
			if(top>=arry[arry.length-1]-navH){
				$navLi.eq(arry.length-1).addClass('cur').siblings().removeClass('cur');
			} 
		}
	});
	
	$nav.on('click','a',function(e){
		e.preventDefault();
		var	index=$nav.find('a').index(this),
			moveTop=0;	
		$navLi.eq(index).addClass('cur').siblings().removeClass('cur');
		moveTop=index==0?arry[index]-navH-10:arry[index]-navH;
		$(window).scrollTop(moveTop);
	});
});