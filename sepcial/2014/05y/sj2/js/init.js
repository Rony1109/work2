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
	
	/*视频处相关js*/
	$(".topic-sp-lst .itm").hover(function(){
		var _this=$(this);
		var _itmBd=_this.find(".itm-bd");
		_itmBd.stop(true,true).slideDown();
		_this.siblings().find(".itm-bd").stop(true,true).slideUp();
	});
	$(".topic-sp-lst .itm-hd").bind("click",function(){
		var _this=$(this);
		_this.parent().addClass("curr").siblings().removeClass("curr");
		var spHtml='<embed src="'+_this.attr("data-spUrl")+'" quality="high" width="620" height="450" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></embed>';
		$("#topicSpBox").html(spHtml);
	});

    /*产品切换*/
	$(".topic-tab a").bind("click",function(){
		var _this=$(this);
		var _index=$(".topic-tab a").index(this);
		var _tabc=_this.parent().siblings(".topic-tabc");
		_this.addClass("curr").siblings().removeClass("curr");
		_tabc.eq(_index).removeClass("g-dn").siblings(".topic-tabc").addClass("g-dn");
		return false;
	});
});
