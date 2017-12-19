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
	
	//右侧颜色导航
    (function(){
		var arry=[];
		var arry1=[];
		var fix=$('.fixed');
		var fixA=fix.find('a');
		$('.flr').each(function(){
            arry.push($(this).offset().top-100);
			arry1.push($(this).offset().top);
        });
		$(window).scroll(function(){
			var _top=$(this).scrollTop();
			for(var i=0;i<=arry.length;i++){
				if(_top>=arry[i]&&_top<=arry[i+1]){
					fixA.eq(i).addClass('cur').siblings().removeClass('cur');
				}
				if(_top>=arry[arry.length-1]){
					fixA.eq(arry.length-1).addClass('cur').siblings().removeClass('cur');
				} 
			}
		});
		fixA.bind('click',function(){
			var _index=fixA.index(this);
			$('html,body').animate({scrollTop:arry1[_index]},500);
			return false;
		});
	})();

});
