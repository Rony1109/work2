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
    //require('jquery');
    require('top');
    require('header');
    require('placeholder');
	require('http://res.csc86.com/js/c/sns/public/pmodel.js');
	require('http://res.csc86.com/js/c/sns/tradering.js');
    /*
     * 以下为专题js代码
     * ......
     */
	 
	 var tabs = new require('m/jsM/tab.js');
		tabs($(".tab-nav li"), $(".J-tab"), "mouseover", "action");
		tabs($(".tab-nav2 li"), $(".J-tab2"), "mouseover", "action");
		tabs($(".tab-nav3 li"), $(".J-tab3"), "mouseover", "action");
		tabs($(".tab-nav4 li"), $(".J-tab4"), "mouseover", "action");
		 
	 $(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
	 
	 //赞
	$("a[data-topic]").each(function(index, element){
		var o = $(this),id=o.attr("data-topic") || "000";
		$.get("http://quan.csc86.com/interface/hldlikeCount",{"topicId":id},function(data){
			var un=o.attr("data-ty")==0?data.code.toString():(5000+parseInt(data.code)).toString(),str="";
			for(var i=0;i<un.length;i++){
				str+="<i>"+un.substr(i,1)+"</i>";
			}
			o.siblings("h3").find("span").html(str);
		},"jsonp");
		o.on("click",function(){
			$.get(csc.url("quan","/likeB.html?topicId="+id),function(data){
				if("sns_likeTopic_000"==data.code){
					var un=o.attr("data-ty")==0?data.desc.toString():(5000+parseInt(data.desc)).toString(),str="";
					for(var i=0;i<un.length;i++){
						str+="<i>"+un.substr(i,1)+"</i>";
					}
					o.siblings("h3").find("span").html(str);
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
	
	$(".zto li").hover(function(){
		var th=$(this);
		th.children("a,div").css("display","block");
	},function(){
		var th=$(this);
		th.children("a,div").css("display","none");
	});
	
	//获取评论
	var comment = require('./comments');
	comment.get('.comment-result ul');
	setInterval(function(){
		comment.get('.comment-result ul', '2768616c-a280-4de2-a091-8ca67d82ed81');
	}, 180000);
	comment.send('#saytext', '.comment input.sub_btn');
	//QQ表情
	
	require('http://res.csc86.com/js/m/config.js');
	require('./jquery.qqFace');
	require('http://res.csc86.com/js/m/emoticons.js');
	$('.emotion').qqFace({
		id : 'facebox', //表情盒子的ID
		assign:'saytext', //给那个控件赋值
		path:'http://res.csc86.com/js/p/kindeditor/4.1.2/plugins/emoticons/images/' //表情存放的路径
	});
	
	
	require('./jquery.limitTextarea');
	$('#saytext').one('focus',function(){
		$.get(csc.url("api","/member/isLogin.html"),function (data){
			if(!data.status){
				alert("请登陆或注册会员后发表评论");
				location.href = 'http://member.csc86.com/login/phone/?done=' + encodeURIComponent(location.origin + location.pathname) + '#ji';
			}
		},"jsonp");
	}).limitTextarea({
		onOk: function(){
			$('.comment').find('input.sub_btn').removeClass('sub_btn_hover').attr('disabled',false);
		},
		onOver: function(){
			$('.comment').find('input.sub_btn').addClass('sub_btn_hover').attr('disabled',true);
		}
	});
	
	
	if($(".repl-hf ul .hl-l span").length>0){
		$.get("http://quan.csc86.com/circle/api/info?id=b262ce3a-3b77-4f6c-b786-0ec5f05aa515",function(data){;
			$(".repl-hf ul .hl-l span:eq(0) i:eq(0)").html(data.data.memberSum);
			$(".repl-hf ul .hl-l span:eq(1) i:eq(0)").html(data.data.topicCount);
		},"jsonp");
	}
	

	
	
});




var csc=csc||{};
//加入圈子
csc.addCircleCircleId = "";csc.addCircleObj = null;
csc.addCircleCommC = function(){
	$.get("http://quan.csc86.com/doCircle?t=authC&circleId="+csc.addCircleCircleId,function(data){
		var $val=data.code;
		if($val=="NO_POWER"){//无权加入
			csc.alert("你的身份不满足加入该圈子！")	
		}else if($val=="join_000"){//已加入
			csc.alert("已加入");
		}else if($val=="join_001"){//己审请
			csc.alert("您已经申请加入该圈子，请等待审核");
		}else if($val=="LOGIN_FAIL"){//未登陆
			login();
		}else if("no_auth"==$val){
			csc.alert("您当前没有加入该圈子的身份或当前圈子不存在！");
		}else{//已登陆,未加入,未审请,有权审请
			csc.useDialog(function(){
				art.dialog({
				title:'申请加入商圈',
				content: data.code,
				fixed: true,
				okVal: '确定',
				background:"#000",
				opacity:"0.3",
				ok: function () {				
					//需要判断加入类型不能为空
					$.get("http://quan.csc86.com/doCircle?t=addC&circleId="+csc.addCircleCircleId+"&"+$("#addCircleForm").serialize(),function(data){
								var val=data.code;
								if("join_001"==val){
									csc.success("申请加入成功！");
								}else if("join_000"==val){
									csc.success("您已成功加入！");
								}else if("sns_fail_id"==val){
									csc.alert("ID无效！");
								}else{csc.alert("申请加入失败！,请重试");}		
							},"jsonp");																 
						
					},
					cancel: true,
					lock:true
				});	
			})
		}	
	},'jsonp')
}
//加入圈子按钮
csc.addCircleCncms=function(circleId,o){
	csc.addCircleCircleId = circleId;
	csc.addCircleObj = $(o);
	csc.useDialog(function(){
		csc.addCircleCommC();
	})
};