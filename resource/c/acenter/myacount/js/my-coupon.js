/*
*我的优惠券页面相关js
*/
define(function(require,exports,module){
	require('c2/newcgsc/js/newtop.js');//头部
	require('l/artDialog/4.1.7/jquery.artDialog.js');//弹窗插件(弹窗的样式直接在css文件中引入)
	var valid=require('l/valid/js/valid.js');//表单验证插件
	var placeholder=require('m/sea-modules/placeholder.js');//仿h5中的placeholder属性插件(针对低版本浏览器)
	var isSubmit=false;

	var dialog={
		tip:function(msg, closeTime, callback){
			artDialog({
				id: 'cscTip',
				content: msg || '提示信息',
				padding:'0 45px 0 10px',
				fixed: true,
				lock:true,
				opacity:0,
				title: false,
				icon: 'mem-w',
				dbClickHide:false,  //false代表双击不关闭窗口
				time: closeTime || 1.5,
				close: callback || null
			});
		}
	};
	
	//搜索框处的相关js
	placeholder.placeholder('#cpnNum1');
	$('#cpnNn').on('change',function(){
		var $this=$(this),
			val=$(this).val(),
			$parent=$this.parent(),
			$selectName=$parent.find('#cpnNum1');
		var html='<input id="cpnNum1" class="ac-ftxt" name="selectName" type="text" value="" placeholder="请输入券号">';
		if(val==="title"){
			html='<input id="cpnNum1" class="ac-ftxt" name="selectName" type="text" value="" placeholder="请输入名称">';
		}
		$selectName.remove();
		$parent.append(html);
		placeholder.placeholder('#cpnNum1');
	});
	
	//优惠券激活
	$('#goJhCpn').on('click',function(){
		var dg=artDialog({
			id:'jhCpn',
			title:'优惠券激活',
			content:$('.jhcpn-pop')[0],
			fixed:true,
			lock:true,
			opacity:0.2,
			width:650,
			dbClickHide:false,  //false代表双击不关闭窗口
			init:function(){
				
				placeholder.placeholder('#cpnPwd');//低版本浏览器仿h5的placeholder属性
				
				$('#jhcpnBtn').on('click',function(){
					var $jhCpnFrm=$('#jhCpnFrm');//激活处表单form选择器
					var $cpnNum2=$('#cpnNum2');//券号文本框
					var $cpnPwd=$('#cpnPwd');//密码文本框
					var cpnNumVal=$.trim($cpnNum2.val());//券号值
					var cpnPwdVal=$.trim($cpnPwd.val());//密码值
					var regx1=/^[A-Z0-9]{12}$/;//券号12个字符，只能填大写字母和数字
					var regx2=/^[0-9]{6}$/;//密码6位数字
					if(!regx1.test(cpnNumVal)){
						dialog.tip('请输入正确的券号',3);
						return false;
					}
					if(cpnPwdVal&&cpnPwdVal!='无密码可不填写'&&!regx2.test(cpnPwdVal)){
						dialog.tip('请输入正确的密码',3);
						return false;
					}
					
					//阻止表单重复请求
					if(isSubmit===true){return false;}
					isSubmit=true;
					
					//ajax请求
					$.post($jhCpnFrm.attr('action'),$jhCpnFrm.serializeArray(),function(data){
						var msg=data.msg;
						if(data.success){
							dialog.tip(msg,3,function(){
								window.location.href=data.url;//跳转至优惠券列表页
							});
						}else{
							dialog.tip(msg,3);
						}
						
						//请求完成后恢复isSubmit为false，让点击提交时请求可再次请求
						isSubmit=false;
					},'jsonp');
					
					return false;
				});
			}
		});
		return false;
	});
	
	//获取当前页面url中参数的值
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	
	//此处判断当前页面isOpn参数是否为1，若为1则打开激活优惠券弹窗
	var isOpn = getUrlParam('isOpn');
	if(isOpn==1){
		$('#goJhCpn').trigger('click');
	}
	
	
	//删除优惠券
	$('.jsDel').on('click',function(){
		var href=$(this).attr('href');
		
		//阻止表单重复请求
		if(isSubmit===true){return false;}
		isSubmit=true;
		
		$.post(href,function(data){
			var msg=data.msg;
			if(data.success){
				dialog.tip(msg,3,function(){
					window.location.href=data.url;//跳转至优惠券列表页
				});
			}else{
				dialog.tip(msg,3);
			}
			//请求完成后恢复isSubmit为false，让点击提交时请求可再次请求
			isSubmit=false;
		},'jsonp');
		
		return false;
	});
	
	
});