/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		'dialog':'m/dialog/js/init.js'
    },
    
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
	require('dialog');
    require('placeholder');

    /*我要咨询*/
	$('.jsIConsult').click(function(){
		$.post('//api.csc86.com/notify/count/all/',function(data){
			if (data.status != true) {
				location.href = "//member.csc86.com/login/phone/?done=" + encodeURIComponent(location.href);
			}else{
				art.dialog.open('//finance.csc86.com/bg/pop-consult',{
					title:'我要咨询',
					width:610,
					height:380,
					fixed:true,
					lock:true
				});
			}
		},"jsonp");
		return false;
	});

});
