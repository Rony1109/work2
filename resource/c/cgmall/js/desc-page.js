define(function(require, exports, module) {
	var isLoginObj=require('c2/newcgsc/js/newtop.js');
	require('m/newsearch/js/init.js');
	require('m/bot-rightcopy/js/init.js');
	var valid=require('l/valid/js/valid.js');//表单验证插件
	var isLogin=isLoginObj.status;//是否登录 true为登录 false为未登录
	var memberId=isLoginObj.data.id;//登录的会员id
	var isSubmit=false;
	
	/*选择器*/
	var $rzxy=$('#rzxy');//协议复选框
	var $rzxyParent=$rzxy.parent();
	var $applyAbtn=$('.apply-abtn');
	
	//点击按钮函数
	var clickBtn=function(){
		$applyAbtn.on('click',function(){
			var $this=$(this);
			if($rzxy.is(':checked')){
				$cscWltkTd.find('.valid-error').remove();
				window.location.href=$this.attr('href');
			}else{
				valid.errorTip($rzxyParent,'请先阅读并认可《华南城网在线交易开通与采购商城入驻说明》');
			}
			return false;
		});
	};
	
	//协议复选框验证
	$rzxy.on('click',function(){
		if(!$(this).is(':checked')){
			valid.errorTip($rzxyParent,'请先阅读并认可《华南城网在线交易开通与采购商城入驻说明》');
		}else{
			$rzxyParent.find('.valid-error').remove();
		}
	});
	
	/*在线交易开通判断*/
	/*if (isLogin) {//已登录时
		
		//判断是否开通在线交易
		$.get('//www.csc86.com/api.php?op=trade_status&act=isOnlineTrade&memberId='+memberId,function(data){
			var status=data.status;
			var html='';
			
			//-3未开通 -2审核不通过
			if(status===-3||status===-2){
				$applyAbtn.html('申请开通在线交易');
				$applyAbtn.attr('href',"//member.csc86.com/membercenter/Apply/StepOne");
			}
			
			//-1为审核中
			if(status===-1){
				$applyAbtn.html('在线交易审核中');
				$applyAbtn.removeAttr('href');
			}
			
			//1为已开通
			if(status===1){
				$applyAbtn.html('管理我的产品');
				$applyAbtn.attr('href',"//member.csc86.com/product/sell/list.html");
			}
			
			clickBtn();
			
		},'json');
		
	}else{//未登录时
	
		$applyAbtn.html('申请开通在线交易');
		$applyAbtn.attr('href',"//member.csc86.com/membercenter/Apply/StepOne");
		clickBtn();
	}*/
});