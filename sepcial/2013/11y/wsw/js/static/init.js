define(function(require, exports, module){
	//判断是否登录
	require('./islogin');

	//登录之后回调
	$('.huo-top .login').on('click', function(){
		location.href = 'http://member.csc86.com/login/phone/?done=' + encodeURIComponent(location.href);
	});

	//li浮动重设margin-right值
	$('.rank-list ul li').each(function(index){
		if((index+1) % 4 == 0) {
			$(this).css('margin-right', '0');
		}
	});
	
	require('./focusImg');
	csc.banner.start(".focus-banner",".b-bd",".b-txt",".b-cur","cur");

	require('./city');
	setupcity();
	
	var tabs = require('./tab');
	tabs(".a-p-tab",".a-p-tabcont","hover","mouseover");
	tabs(".bbs-tabli",".bbs-tabcont","hover","mouseover");
	
	require('./selectImg');
	selectImg(".show-img",".e-img",".show-txt");
	
	//表单验证
	var validForm = require('./submit');
	validForm.valid('.signform form');
});