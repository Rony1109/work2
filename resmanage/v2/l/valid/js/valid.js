define(function(require, exports, module){
	var valid={
		//截取表单值
		subStrVal:function(obj,len){
			var val=$.trim(obj.val()),
				num=val.length;
			if(num>len){
				val=val.substr(0,len);
				obj.val(val);
			}
		},
		//错误提示
		errorTip:function(obj,errorTip){
			errorTip=errorTip?errorTip:'';
			if(errorTip){
				if(!obj.find('.valid-error')[0]){
					if(obj.find('.valid-tips')[0]){
						obj.find('.valid-tips').addClass('valid-error').html(errorTip);
					}else{
						obj.append('<span class="valid-tips valid-error">'+errorTip+'</span>');
					}
				}else{
					obj.find('.valid-error').html(errorTip);
				}
			}
		},
		//表单验证(主要是利用正则,当为价钱或折扣时regx应设为null)
		init:function(options){
			var opts={
				isMust:false,//true代表必填项，false代表非必填项(默认)
				obj:null,//需要验证的对象
				tipObj:null,//提示信息显示的地方
				errorClass:'',//obj验证错误时需要添加的类
				errorTip:'',//错误时的提示消息
				nullTip:'',//为空时的提示消息
				type:0,//1为价钱,2为折扣,0为其他情况(默认)
				regx:null,//正则表达式
				isSmtValid:1 //1为仅提交表单的时候做验证
			};
			opts=$.extend({},opts,options);
			var isMust=opts.isMust,
				obj=opts.obj;
				tipObj=opts.tipObj?opts.tipObj:obj.parent(),
				errorClass=opts.errorClass,
				errorTip=opts.errorTip,
				nullTip=opts.nullTip,
				type=opts.type,
				regx=opts.regx,
				isSmtValid=opts.isSmtValid,
				objVal=$.trim(obj.val());
			if(regx==null){
				if(type===1){//价钱大于等0且至多保留两位小数的不超过6位（除小数外）的正数
					regx=/^[0-9]{1,6}(\.|\.\d{1,2})?$/;
				}
				if(type===2){//折扣
					regx=/^[1-9](\.|\.\d{1})?$/;
				}
			}
			if(isMust&&!objVal){
				obj.addClass(errorClass);
				valid.errorTip(tipObj,nullTip);
				if(isSmtValid===1){
					obj.focus();
				}
				return false;
			}
			if(regx&&objVal&&!regx.test(objVal)){
				obj.addClass(errorClass);
				valid.errorTip(tipObj,errorTip);
				if(isSmtValid===1){
					obj.focus();
				}
				return false;
			}else{
				obj.removeClass(errorClass);
				if(tipObj&&tipObj.find('.valid-error')[0]){
					tipObj.find('.valid-error').remove();
				}
			}
			//价钱和折扣补足或去除小数位
			if(type===1||type===2){
				var prcArry=[];
				prcArry=obj.val().split('.');
				var len=prcArry.length;
				if(type===1){//价钱用0补足两位小数位
					if(len==1||(len==2&&prcArry[1]=="")){
						prcArry[1]="00";
					}
					if(len==2&&prcArry[1].length==1){
						prcArry[1]=prcArry[1]+'0';
					}
					obj.val(prcArry.join("."));
				}
				if(type===2){//折扣去除小数点（当小数点后面无数字时）
					if(len==2&&prcArry[1]==""){
						obj.val(prcArry[0]);
					}
				}
			}
			return true;
		}
	};
	module.exports=valid;
});