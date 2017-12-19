seajs.config({

    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
        'top': 'm/top-bar/js/init.js',
        'header': 'm/head-search/js/init.js',
        'placeholder': 'm/sea-modules/placeholder.js',
		
    },
    
    // Sea.js 的基础路径
    base: 'http://res.csc86.com/v2/'
});

define(function(require, exports, module) {
	require('http://res.csc86.com/js/l/jquery.js');
    require('top');
    require('header');
    require('placeholder');
	require('http://res.csc86.com/js/m/config.js');
	require('http://res.csc86.com/js/p/artDialog/4.1.5/jquery.artDialog.js');
	require('http://res.csc86.com/js/p/artDialog/4.1.5/plugins/iframeTools.source.js');
	require('http://res.csc86.com/js/m/dialog.js');
	
	
	//获取评论
	var comment = require('./comments');
	comment.get('.comment-result ul');
	setInterval(function(){
		comment.get('.comment-result ul', 'daad8a2d-ad5a-4f0f-819d-f67bdf281c6b');
	}, 180000);
	comment.send('#saytext', '.comment input.sub_btn');
	//QQ表情
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
});

function tolinetwo(){
	$.get("http://api.csc86.com/api/member/islogin",function(data){
		if(data.status==true){
			artDialog({title:"金牌供应商",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><a class="g-fr" href="javascript:;" title="" onclick="closett()"></a></div><form  id="myform" name="myform" action="http://pgmanage.csc86.com/index.php?m=formguide&c=index&a=show&formid=21&siteid=1&pc_hash=mGpwrR" method="post" ">'+'<ul class="lay-ul"><li class="lay0101"><span color="red"><i>*</i> 公司名称</span><input type="text" name="info[company]" id="contact" value="" class="input-text"></li><li><span color="red"><i>*</i>联系人</span><input type="text" name="info[contact]" id="tel" value="" class="input-text"></li><li><span color="red"><i>*</i>电话</span><input type="text" name="info[tel]" id="mainProduct" value="" class="input-text"></li><li><span color="red"><i>*</i>主营产品</span><input type="text" name="info[mainProduct]" id="company" value="" class="input-text"></li></ul>'+
'<input type="submit" value=" 提交 " id="dosubmit" name="dosubmit">'+
'</form></div>',
		ok: function() {},
		cancel:false,
		fixed: true,
		id: 'Fm8',
		lock: true,
    	background: '#000', // 背景色
		opacity: 0.67,
		init:function(){
			$("form").submit( function () {
				var company=$("input[name='info[company]']").val(),
				contact=$("input[name='info[contact]']").val(),
				tel=$("input[name='info[tel]']").val(),
				mainProduct=$("input[name='info[mainProduct]']").val();
				if(company==""||contact==""||tel==""||mainProduct==""){
					return false;
				}else{
					return true;
				}
			} );
		},
		icon: 'question',
		okVal: false});
		}else{
			seajs.use(csc.url("res","/f=js/m/sign"),function (){			
				csc.checkSign("location.reload");
			});
		}
	},"jsonp");			
}

function closett(){
	art.dialog({id:'Fm8'}).close();	
}
