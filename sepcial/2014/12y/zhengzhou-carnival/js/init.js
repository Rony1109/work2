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
    require('./focusPlay');


    /*

     * 以下为专题js代码

     * ......

     */
	 
   $("#left-left li").hover(function() {
        $(this).find("div.shade").show();
    }, function() {
        $(this).find("div.shade").hide();
    });
  
   csc.foucsPlay("#src-img",null,2008);
	var $li = $("#src-img ol>li");
	$("#adv-upload").find("li").on("mouseover",function (){
		$li.eq($(this).index()).trigger("mouseover");
	}).on("mouseout",function (){
		$li.eq($(this).index()).trigger("mouseout");
	});
	
	require('./scroll');
	    var tm;
	    $(".img-scroll").CscScroll({
	        Left: 470,
	        Right: 235,
	        Time: 2000,
	        linedUp: tm,
	        Auto: true,
	        Visual: 4
	    });
		
	//表单序列化插件
	(function($) {
		$.fn.serializeJson = function() {
			var serializeObj = {};
			var array = this.serializeArray();
			var str = this.serialize();
			$(array).each(function() {
				if (serializeObj[this.name]) {
					if ($.isArray(serializeObj[this.name])) {
						serializeObj[this.name].push(this.value);
					} else {
						serializeObj[this.name] = [serializeObj[this.name], this.value];
					}
				} else {
					serializeObj[this.name] = this.value;
				}
			});
			return serializeObj;
		};
	})(jQuery);
	
	//报名
	
	
		$('.ipt-smt').click(function() {
					var 	_json = $("#myform").serializeArray(),_form=$("#myform");
					var name = $.trim($('#name').val()),contact = $.trim($('#contact').val());
					if (name == "" || contact == "" ) {
						alert("姓名和手机号码都不能为空！");
						return false;
					}
					$.get(_form.attr('action'), _json, function(data) {
						//console.log(data.stutas);
						//if(data.stutas) $('.pup').show();;
						if (data.stutas) {
							$('.pup').show();
						
						} else {
							alert("提交失败，请重新填写提交！");
						}
					}, "jsonp");
	
				});
				
			$('.closed').click(function(){
					$('.pup').hide();
				});

	});
	

	
	
