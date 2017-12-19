/*
 * jquery,搜索框，占位符placeholder配置
 * 
 */

seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
		'comment': 'm/comment/js/init.js'
    },
	
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
    require('jquery');
    require('top');
    require('./data');//远程加载数据
	var comment = require('comment');
	require('http://res.csc86.com/f=js/m/config.js,v2/l/artDialog/4.1.7/jquery.artDialog.js,v2/l/artDialog/4.1.7/plugins/iframeTools.source.js,js/m/dialog.js');
	(function(config) {
		config['path'] = 'http://res.csc86.com/v2/l/artDialog/4.1.7';
	}(art.dialog.defaults));

	$(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<550){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});

    //幻灯
    require('./scroll');
        var tm;
        $(".img-scroll").CscScroll({
            Left: 318,
            Right: 159,
            Time: 3000,
            linedUp: tm,
            Auto: true,
            Visual: 6
        });
		
		//加入圈子
	csc.addCircleCommC = function() {
		$.get("http://quan.csc86.com/doCircle?t=authC&circleId='25212b43-d843-4c73-a3e5-f4a91ec45437", function(data) {
			var $val = data.code;
			if ($val == "NO_POWER") { //无权加入
				csc.alert("你的身份不满足加入该圈子！")
			} else if ($val == "join_000") { //已加入
				csc.alert("已加入");
			} else if ($val == "join_001") { //己审请
				csc.alert("您已经申请加入该圈子，请等待审核");
			} else if ($val == "LOGIN_FAIL") { //未登陆
				seajs.use(csc.url("res", "/f=js/m/sign"), function() {
					csc.checkSign("location.reload");
				});
			} else if ("no_auth" == $val) {
				csc.alert("您当前没有加入该圈子的身份或当前圈子不存在！");
			} else { //已登陆,未加入,未审请,有权审请
				csc.useDialog(function() {
					art.dialog({
						title: '申请加入商圈',
						content: data.code,
						fixed: true,
						okVal: '确定',
						background: "#000",
						opacity: "0.3",
						ok: function() {
							//需要判断加入类型不能为空
							$.get("http://quan.csc86.com/doCircle?t=addC&circleId='25212b43-d843-4c73-a3e5-f4a91ec45437&" + $("#addCircleForm").serialize(), function(data) {
								var val = data.code;
								if ("join_001" == val) {
									csc.success("申请加入成功！");
								} else if ("join_000" == val) {
									csc.success("您已成功加入！");
								} else if ("sns_fail_id" == val) {
									csc.alert("ID无效！");
								} else {
									csc.alert("申请加入失败！,请重试");
								}
							}, "jsonp");

						},
						cancel: true,
						lock: true
					});
				})
			}
		}, 'jsonp')
	}

	//加入圈子按钮
	$('.jsJrQuanZi').click(function() {
		csc.addCircleCommC();
		return false;
	});

	//成员 话题数量
	if ($('.jsHtNum')[0]) {
		$.get("http://quan.csc86.com/circle/api/info?id='25212b43-d843-4c73-a3e5-f4a91ec45437", function(data) {
			$('.jsHtNum').html('<span>' + data.data.memberSum + '<br/>成员</span><span>' + data.data.topicCount + '<br/>话题</span>');
		}, "jsonp");
	}
		
	//评论
	comment.init('25212b43-d843-4c73-a3e5-f4a91ec45437', $('#JComment'), {
		pn: 2
	});
	

});
