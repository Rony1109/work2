/*发布产品相关页面公用js*/
define(function(require, exports, module) {
	var common={
		//表单验证
		valid:{
			errorTip:function(obj,errorTip){
				if(!obj.find('.valid-error')[0]){
					obj.append('<span class="valid-tips valid-error">'+errorTip+'</span>');
				}else{
					obj.find('.valid-error').html(errorTip);
				}
			},
			init:function(options){
				var opts={
					isMust:false,//false代表必填项(默认)，true代表非必填项
					obj:null,//需要验证的对象
					tipObj:null,//提示信息显示的地方
					errorTip:'',//错误时的提示消息
					nullTip:'',//为空时的提示消息
					type:0,//1为价钱,2为折扣,0为其他情况(默认)
					regx:null//正则表达式
				};
				opts=$.extend({},opts,options);
				var isMust=opts.isMust;
				var obj=opts.obj;
				var tipObj=opts.tipObj;
				var errorTip=opts.errorTip;
				var nullTip=opts.nullTip;
				var type=opts.type;
				var maxlen=opts.maxlen;
				var regx=opts.regx;
				var objVal=$.trim(obj.val());
				if(regx==null){
					if(type===1){//大于等0且至多保留两位小数的不超过6位（除小数外）的正数
						//regx=/^[0-9]{1,6}(\.|\.\d{1,2})?$/;
						regx=/^([1-9][0-9]{0,5}|[0]{1})(\.|\.\d{1,2})?$/;
					}
					if(type===2){
						regx=/^[1-9](\.|\.\d{1})?$/;
					}
				}
				if(isMust&&!objVal){
					obj.addClass('frm-error');
					if(tipObj&&nullTip){
						common.valid.errorTip(tipObj,nullTip);
					}
					return false;
				}
				
				if(regx&&objVal&&!regx.test(objVal)){
					obj.addClass('frm-error');
					if(tipObj&&errorTip){
						common.valid.errorTip(tipObj,errorTip);
					}
					return false;
				}else{
					var $validError=tipObj.find('.valid-error');
					if(!$validError.hasClass('valid-repeat')){
						obj.removeClass('frm-error');
						if(tipObj&&$validError[0]){
							$validError.remove();
						}
					}
					/*obj.removeClass('frm-error');
					if(tipObj&&tipObj.find('.valid-error')[0]){
						tipObj.find('.valid-error').remove();
					}*/
				}
				if(type===1||type===2){
					var arry=[];
					arry=obj.val().split('.');
					var len=arry.length;
					if(type===1){
						if(len==1||(len==2&&arry[1]=="")){
							arry[1]="00";
						}
						if(len==2&&arry[1].length==1){
							arry[1]=arry[1]+'0';
						}
						obj.val(arry.join("."));
					}
					if(type===2){
						if(len==2&&arry[1]==""){
							obj.val(arry[0]);
						}
					}
				}
				return true;
			}
		}
	};
	module.exports=common;
});