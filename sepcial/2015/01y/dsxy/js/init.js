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
        'placeholder': 'm/sea-modules/placeholder.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('header');
    require('placeholder');


//表单
	$('.ipt-smt').click(function() {
					var 	_json = $("#subform").serializeArray(),_form=$("#subform");
					var name = $.trim($('#name').val()),
						   gsmc = $.trim($('#gsmc').val()),
						   wpwz = $.trim($('#wpwz').val()),
						   sj = $.trim($('#sj').val()),
						   yx = $.trim($('#yx').val()),
						   jingyan = $.trim($('#jingyan').val()),
						   qq = $.trim($('#qq').val());
					if (name== "" || gsmc == ""|| wpwz == ""|| sj == ""|| jingyan == "" ) {
						alert("尊敬的用户，你还有重要资料未填写完整，请您核对完毕再提交！");
						return false;
					}
					$.get(_form.attr('action'), _json, function(data) {

						if (data.status) {
							alert("恭喜您！申请加入成功，感谢您的申请！");
							window.location.reload();
						} else {
							alert("提交失败，请重新填写提交！");
						}
					}, "jsonp");
					return false;
				});

	$(window).scroll(function(){
			 var topscr = $(this).scrollTop();

				if(topscr<465){
					$(".fiexd").addClass("fiexd_nav");	
				}else{
					$(".fiexd").removeClass("fiexd_nav");	
				}
		  });

});
