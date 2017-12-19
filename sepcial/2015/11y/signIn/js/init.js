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
        'comment': 'm/comment/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
        'dialog': 'm/dialog/js/init.js',
        'scroll':'c/fur/js/scroll.js'
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});
define(function(require, exports, module) {
    require('jquery');
    require('./carlendar.js');
    require('top');
	
    require('header');
    require('placeholder');
    require('http://res.csc86.com/f=js/m/config.js,v2/l/artDialog/4.1.7/jquery.artDialog.js,v2/l/artDialog/4.1.7/plugins/iframeTools.source.js,js/m/dialog.js');
     var dialog = require('dialog');
    var comment = require('comment');
    seajs.use(csc.url("res", "/f=js/m/sign"),function(){});
    /*
     * 以下为专题js代码
     * ......
     */
	//	签到排行
	function getRankList(num) {
		$.get("http://www.csc86.com/api.php?op=sign&type=rank", function(data) {
			var len = data.data.length;
			var html = "";
			if(data.status==1){
				for (var i = 0; i < len; i++) {
					var _data = data.data[i],sign_score = _data.sign_score,userName=_data.userName;
					html += '<tr>\
								<td width="20%">' + (i+1) + '</td>\
		    					  <td width="60%">' + userName + '</td>\
		    					  <td width="20%">' + sign_score + '</td>\
		    				  </tr>';
				}
			}			
			$('#getranklist').html(html);
		}, "jsonp");
	}
	getRankList();
	//公用弹窗
	var tpcPop = function(id, content, w, h, fun) {
		var fun = fun || function() {};
		art.dialog({
			id: id,
			content: content,
			width: w,
			height: h,
			fixed: true,
			lock: true,
			padding: 0,
			init: fun
		});
	};
	var closePop = function(obj, id) {
		obj.click(function() {
			art.dialog({
				id: id
			}).close();
			return false;
		});
	};
	var warnTipFun = function(text) {
		var warnTip = '<div class="g-pr cyds-box cyds-tip">\
						<a class="close jsClosePop" href=""></a>\
						<div class="start-tip">\
							<h2>' + text + '</h2>\
							<p class="g-h30"></p>\
							<div class="g-tc okbtn-box"><input class="ipt-smt jsOkBtn" type="button" name="" value="确 定" /></div>\
						</div>\
					</div>';
		return warnTip;
	}
	var isLogin=(function(){//判断是否登陆
    			$.ajax({
    				url:"http://www.csc86.com/api.php?op=sign&type=checkLogin",
    				type:"get",
    				dataType:"jsonp",
    				success:function(data){
    					if(data.status==1){
    						sign.getusr(function(){
    							$("#nologin").addClass("logined");    			
    							sign.getsigndate();
    						});
    						$("#nosignbtn").on("click",function(){
    							$.ajax({
    								url:"http://www.csc86.com/api.php?op=sign&type=add",
    								type:"get",
    								dataType:"jsonp",
    								success:function(data){
    									if(data.status==1){
    										$("#sgstat").addClass("signed");
    										$("#dialogbox").fadeIn();
    										var cur=new Date(),tody=cur.getDate(),tmonth=cur.getMonth() + 1;    										
    										$(".c"+tmonth+"-"+tody).addClass("on").append('<img src="image/signedico.png" />');
    									}
    									else{
    										tpcPop('startCj', warnTipFun("签到失败"), 613, 317, function() {
    											closePop($('.jsClosePop'), 'startCj');
    											closePop($('.jsOkBtn'), 'startCj');
    										});
    									}
    									
    								}
    							});
    						})
    					}else{    						
    						$("#nosignbtn").on("click",function(){
    							// window.location.href="https://login.csc86.com/?done=http://special.csc86.com/2015/11y/signIn/index.html";
    							csc.checkSign("location.reload");
    						})
    					}    
    				}
    			});
    		})();
    	var sign={
    		getusr:function(callback){//获取登陆用户信息
    			var usrinfo="";
    			$.get("http://www.csc86.com/api.php?op=sign&type=info",function(data){
    				if(data.status==1){
    					var usrname=data.data.userName;
    					var signScore=data.data.signScore;
    					var discontinuousNum=data.data.discontinuousNum;
    					usrinfo='<p>Hi!<span title="'+usrname+'">'+usrname+'</span></p><p>累计签到金币:<span>'+signScore+'</span></p><p>中断签到天数:<span>'+discontinuousNum+'</span>天</p><p class="wdbk">奔跑吧<span>'+usrname+'!</span></p><p>继续加油，惊喜大奖等着你哦！</p>';
    					$("#lgif").append(usrinfo);
    					callback();
    				}
    			},"jsonp");
    		},
    		getsigndate:function(){//已签到日期列表
    			$.get("http://www.csc86.com/api.php?op=sign&type=list",function(data){
    				if(data.status==1){
    					var lenth=data.data.length,cur=new Date(),tody=cur.getDate(),tmonth=cur.getMonth() + 1;
    					for(i=0;i<lenth;i++){
    						var day=parseInt(data.data[i].split("-")[2]),month=parseInt(data.data[i].split("-")[1]);
    						$(".c"+month+"-"+day).addClass("on").append('<img src="image/signedico.png" />');
    						if(tody==day && tmonth==month ) $("#sgstat").addClass("signed");
    					}
    					
    				}
    			},"jsonp");
    		}
    	};
    	$("#close").on("click",function(){
    		$("#dialogbox").fadeOut();
    		// location.reload();
    	});
    	$(".jloadbtn").on("click",function(e){
    		e.preventDefault();
    		csc.checkSign("location.reload");
    	});
	var current = new Date();
	// current.setMonth(1,5);
	var str = calUtil.drawCal(current.getFullYear(),current.getMonth() + 1);
	$(str).appendTo($("#calendar"));
	// 图片滚动
	require('scroll');
	var tm;
	$("#imgscroll").CscScroll({
	    Left: 540,
	    Right: 278,
	    Time: 2000,
	    linedUp: tm,
	    Auto: false,
	    Visual: 2
	});
	//成员 话题数量
	if ($('.jsHtNum')[0]) {
		$.get("http://quan.csc86.com/circle/api/info?id=5eb49f62-3660-4863-a38d-1a7fa579e4c9", function(data) {;
			$('.jsHtNum').html('<span>' + data.data.memberSum + '<br/>成员</span><span>' + data.data.topicCount + '<br/>话题</span>');
		}, "jsonp");
	}
	// 评论
	comment.init('8da1346d-44c4-479b-8ccb-98577248aedb',$('#JComment'),{pn:2});
});
