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
  //  require('jquery');
    require('top');
    require('header');
    require('placeholder');


    //图片横向滚动
    require('./scroll');
    $(".img-scroll").CscScroll({
        Left: 470,
        Right: 223,
        Time: 2000,
        linedUp: 233,
        Auto: true,
        Visual: 4
    });

    $(".srotwoleft").CscScroll({
        Left: 424,
        Right: 212,
        Time: 2000,
        linedUp: 212,
        Auto: true,
        Visual: 4
    });
	
	 $(".srotworight").CscScroll({
        Left: 424,
        Right: 212,
        Time: 2000,
        linedUp: 212,
        Auto: true,
        Visual: 4
    });
	 require('http://res.csc86.com/js/c/sns/public/pmodel.js');
	require('http://res.csc86.com/js/c/sns/tradering.js');
	  //赞
	$("a[data-topic]").each(function(index, element){
		var o = $(this),id=o.attr("data-topic") || "000";
		$.get("http://quan.csc86.com/interface/hldlikeCount",{"topicId":id},function(data){ 
			o.siblings("span.un").html(data.code+"人");
		},"jsonp");
		o.on("click",function(){
			$.get("http://quan.csc86.com/likeB.html?topicId="+id,function(data){
				if("sns_likeTopic_000"==data.code){
					o.siblings("span.un").html(data.desc+"人");
				}else if("login_fail"==data.code){
					seajs.use(csc.url("res","/f=js/m/sign"),function(){
						csc.checkSign("location.reload()");
					});
				}else if("sns_likeTopic_001"==data.code){
					csc.useDialog(function(){csc.alert("亲爱的会员，你已经赞过了！");});
				}else{
					csc.useDialog(function(){csc.alert(data.desc);});
				}
			},"jsonp");
			return false;
		})
	})
	 
});