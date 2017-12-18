/**
 * 前端模板js文件
 * 
 */
define(function(require, exports, module) {
	require('//res.csc86.com/v2/c/member/zhongxin/public/js/init'),
	require('//res.csc86.com/v2/m/dialog/js/init');
	
	//身份认证FORM第二步
	var $twoForm = $('form[data-type="idy-two"]');
	$twoForm.bind('submit', function(event){
		var tva=$(".idy-three input[type='text']");
		tva.each(function(i){
			if(tva.eq(i).val()==""){tva.eq(i).siblings("span.ity-tip").removeClass("right");}										 
		});
		if($('form[data-type="idy-two"] span.ity-tip:visible').length>0){
			return false;
		}
	});
	

	//信息提交
	$(".idy-three input[type='text']").focus(function(){
		$(this).siblings("span.ity-tip").addClass("right");
	}).blur(function(){
		var th=$(this);
		if(th.val()==""){
			th.siblings("span.ity-tip").removeClass("right");
		}else if(th.attr("name")=="confirmAccount"&&th.val()!=""&&th.val()!=$("input[name='account']").val()){
			th.siblings("span.ity-tip").removeClass("right").html("确认开户银行账号与开户银行账号不一致");
		}else{
			th.siblings("span.ity-tip").addClass("right")
		}
	});
	
	
	//身份认证审核打款金额
	$('#idyShenHe').bind('submit',function(){
		$(this).find('input[type=submit]').val('正在提交中...').attr('disabled',true);	
	});
	
});

function sfrzSccssPop(){
	var dg=art.dialog({
		id:'sfrzSuccess',
		title:false,
		content: '<div class="sfrz-success"><div class="bd">恭喜您认证成功。认证成功后，在您公司介绍页面公司名称后会有<strong>“企业身份已认证”</strong>标志，且公司名称无法修改。</div><div class="ft"><a class="okbtn" href="//approve.csc86.com/user/detail?approveType=prove">确定</a></div></div>',
		opacity:0.2,
		padding:"20px 25px 20px 20px",
		fixed:true,
		lock:true
	});	
}

