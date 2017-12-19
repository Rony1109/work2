/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('top');
    require('header');
    require('placeholder');

    /*
     * 以下为专题js代码
     * ......
     */
	 //右侧浮动菜单
	(function(){
		var arry=[];
		var fix=$('.cycen-menu');
		var fixUl=fix.find('ul');
		var fixLi=fix.find('li');
		$('.flr').each(function(){
            arry.push($(this).offset().top);
        });
		$(window).scroll(function(){
			var _top=$(this).scrollTop();
			_top>=790?fix.fadeIn():fix.fadeOut();
			for(var i=0;i<=arry.length;i++){
				if(_top>=arry[i]&&_top<=arry[i+1]){
					fixLi.eq(i).addClass('cur').siblings().removeClass('cur');
				}
				if(_top>=arry[arry.length-1]){
					fixLi.eq(arry.length-1).addClass('cur').siblings().removeClass('cur');
				} 
			}
		});
		fixLi.find('a').on('click',function(){
			var _index=fixLi.find('a').index(this);
			$('html,body').animate({scrollTop:arry[_index]},500);
			return false;
		});
		
		
	})();

});
