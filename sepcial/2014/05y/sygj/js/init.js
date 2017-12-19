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
	 
	 $(window).scroll(function(){
		var topscr = $(this).scrollTop();
		//alert(topscr);
		if(topscr<305){
			$(".fiexd").addClass("fiexd_nav");	
		}else{
			$(".fiexd").removeClass("fiexd_nav");	
		}
	});	
	
	//左移动
	$(".maito .scr-l").click(function(){
		left_right(".maito .scr-all","1");
	});
	//右移动
	$(".maito .scr-r").click(function(){
		left_right(".maito .scr-all","2");
	});
	
	//获取评论
	var comment = require('./comments');
	comment.get('.comment-result ul');
	setInterval(function(){
		comment.get('.comment-result ul', 'e72a8a59-9c3d-4354-9da2-017ccbcba776');
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

//轮播
var left_right=function(tag,un){
	var $ul=$(tag).find("ul"),
		$w=$ul.find("li:first").width();
	if(!$ul.is(":animated")){
		if(un==1){
			$ul.animate({
				left:-$w
			},300,function(){
				$ul.css({left:"0px"}).find("li:first").appendTo($ul);});
		}else{
			$ul.css({left:-$w}).find("li:last").prependTo($ul);
			$ul.animate({
				left:0
			},300);
		}
	}
}

//表单提交
	function layer(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({padding:"0 20px 20px",content:'<div class="tablewidth"><div class="tab-title"><span class="til-lay">申请生意管家服务</span><span class="tmin-lay">领取五项特权</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table  border="0" cellspacing="0" cellpadding="0">'+
		  '<tr><td><span><em>*</em>企业名称:</span><input name="qymc" type="text" /></td><td><span><em>*</em>联系人:</span><input name="lxr" type="text" /></td></tr>'+
		  '<tr><td><span><em>*</em>所属行业:</span><input name="sshy" type="text" /></td><td><span><em>*</em>联系电话:</span><input name="lxdh" type="text" /></td></tr>'+
		  '<tr><td><span><em>*</em>旺铺网址:</span><input name="wpwz" type="text" /></td><td><span><em>*</em>QQ:</span><input name="qq" type="text" /></td></tr>'+
		  '<tr><td><span>电子邮箱:</span><input name="email" type="text" /></td><td>&nbsp;</td></tr></table><div class="tip-lay">注：请填写真实的联系资料，带*标为必填项目。</div></div>',
		ok: function() {
			var qymc=$("input[name='qymc']").val(),
				lxr=$("input[name=lxr]").val(),
				sshy=$("input[name=sshy]").val(),
				lxdh=$("input[name=lxdh]").val(),
				wpwz=$("input[name=wpwz]").val(),
				qq=$("input[name=qq]").val(),
				email=$("input[name=email]").val();
				if(qymc==""||lxr==""||sshy==""||lxdh==""||wpwz==""||qq==""){
					alert("尊敬的用户，你还有重要资料未填写完整，请您核对完毕再提交！");
					return false;
				}
				$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 55,"subtype": "ajax","dosubmit":"生意管家","info[qymc]":qymc,"info[lxr]":lxr,"info[sshy]":sshy,"info[lxdh]":lxdh,"info[wpwz]":wpwz,"info[qq]":qq,"info[email]":email},function(data){	
				if(data.status == true){
					alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
					$("input[name=qymc]").val("");
					$("input[name=lxr]").val("");
					$("input[name=sshy]").val("");
					$("input[name=lxdh]").val("");
					$("input[name=wpwz]").val("");
					$("input[name=qq]").val("");
					$("input[name=email]").val("");
				}else{
					alert("申请失败，请刷新后重试！");
				}
			},"jsonp");
		},cancel:false,
		fixed: true,
		id: 'Fm7',
		icon: 'question',
		okVal: '提交'});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");		
	return;
}

function closet(){
	art.dialog({id:'Fm7'}).close();	
}


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