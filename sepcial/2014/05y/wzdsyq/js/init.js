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
    
    require('top');
    require('header');
    require('placeholder');
	
    /*
     * 以下为专题js代码
     * ......
     */
	 
	$.get("http://quan.csc86.com/circle/api/info?id=b262ce3a-3b77-4f6c-b786-0ec5f05aa515",function(data){;
			$("#cir").html(data.data.memberSum);
			$("#hot").html(data.data.topicCount);
	},"jsonp");
					
	$("#d_close").click(function(){
		$("#b-m").hide();	
	});
	
	
	var barandtime,$obj= $("#vdcd_src"),ln=$obj.find("ul").children("li").length;	
    $("#view_dc").delegate("span.l","click",function(){
       scrollRight($obj);
    }).delegate("span.r","click",function() {
       scrollLeft($obj);
     });
	 
	 //点击向左
	function scrollLeft(obj){
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.animate({ "left" : -lineWidth +"px" }, 400 , function(){
				$self.css({left:0})
				.find("li:first").appendTo($self);
			})
		}
	}
	
	function scrollRight(obj) {
		var $self = obj.find("ul");
		if (!$self.is(":animated")&&$self.children().length>1) {
			var lineWidth = $self.find("li:first").width(); //获取宽度
			$self.find("li:last").prependTo($self);
			$self.css({ left: -lineWidth }).animate({ "left": 0 + "px" }, 400);
		}   
	}
	$('#view_dc').hover(function(){
			 clearInterval(textTimer);
		 },function(){
			 $t=$("#vdcd_src");
			textTimer = setInterval(function(){
				 scrollLeft($t);
			} ,2000);
	 }).trigger("mouseleave");
	
	
	 //实体纵横
	 var len  = $("#img_src li").length;
	 var index = 0;
	 var sildTimer;
	 //滑入 停止动画，滑出开始动画.
	 $('#outer_src').hover(function(){
			 clearInterval(sildTimer);
		 },function(){
			 sildTimer = setInterval(function(){
			   slide(index);
				index++;
				if(index==len){index=0;}
			  } , 3000);
	 }).trigger("mouseleave");

	// 
	function slide(index){
		 $("#rect li").eq(index).addClass("cur").siblings().removeClass();  
			$("#img_src li").stop(true,false)
			.animate({opacity :0,"z-index":0},{ queue: false, duration: 1000 }).eq(index).animate({opacity :1,"z-index":1},1000);
	};	
	$("#rect li").hover(function(){
			var index=$(this).index();	
			slide(index);
	});
	
	//获取评论
	var comment = require('./comments');
	comment.get('.comment-result ul');
	setInterval(function(){
		comment.get('.comment-result ul', '037e8caf-3702-4826-8511-cadf2a33d285');
	}, 180000);
	comment.send('#saytext', '.comment input.sub_btn');
	
	
	
	var comment = require('./comments');
	comment.send('#saytext', 'input.sub_btn');
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
			$('.form_aj').find('input.sub_btn').removeClass('sub_btn_hover').attr('disabled',false);
		},
		onOver: function(){
			$('.form_aj').find('input.sub_btn').addClass('sub_btn_hover').attr('disabled',true);
		}
	});
		
});

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
		lock:true,
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
