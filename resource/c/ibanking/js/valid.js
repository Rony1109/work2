define(function(require, exports, module) {
	/*失去焦点时的验证插件*/
	(function($){
		$.fn.validForm=function(options){
			var defaults={
				minNum:0,
				maxNum:100000, //默认是无限大
				nullTxt:'',
				errorTxt:'',
				validObj:null
			}
			var opts=$.extend({},defaults,options); 
			return this.each(function(){
				var _this=$(this),
					_nullTxt=opts.nullTxt,
					_errorTxt=opts.errorTxt,
					_validObj=opts.validObj;
				if(!opts.validObj){
					_validObj=_this.closest('td').find('.valid-tip');
				}
				_this.blur(function(){
					var _val=$.trim( _this.val()); 
					if(_this.find('option').length>0){
						_val=$.trim( _this.find('option:selected').val());
					}
					if((_val.length>0&&_val.length<opts.minNum)||_val.length>opts.maxNum){
						_validObj.addClass('valid-error').html(_errorTxt);
						return false;	
					}else if(!_val){
						_validObj.addClass('valid-error').html(_nullTxt);
						return false;
					}else{
						_validObj.removeClass('valid-error').html("");
						return true;
					}
				});
			});
		}
	})(jQuery); 
	
	var Valid={
		
		/*表单失去焦点时验证表单*/
		validInput:function(obj,validObj){
			var _this=obj,
			    _valid=eval('(' + _this.attr('data-valid') + ')'),
			    _minNum=_valid.minNum,
				_maxNum=_valid.maxNum,
				_errorTxt=_valid.errorTxt;
			if(!_minNum){
				_minNum=0;
			}
			if(!_maxNum){//不存在时说明是无限大
				_maxNum=100000;
			}
			if(!_errorTxt){
				_errorTxt="";
			}
			if(!validObj){
				validObj=null;
			}
			_this.validForm({
				minNum:_minNum,
				maxNum:_maxNum,
				nullTxt:_valid.nullTxt,
				errorTxt:_errorTxt,
				validObj:validObj
			});
		},
		
		/*点击提交按钮是验证表单*/
		validNull:function(obj,validObj){
			var _this=obj,
				_validObj=validObj,
			    _valid=eval('(' + _this.attr('data-valid') + ')'),
				_minNum=_valid.minNum,
				_maxNum=_valid.maxNum,
				_errorTxt=_valid.errorTxt,
			    _val=$.trim(_this.val());
			
			if(!_minNum){
				_minNum=0;
			}
			if(!_maxNum){//不存在时说明是无限大
				_maxNum=100000;
			}
			if(!_errorTxt){
				_errorTxt="";
			}
			if(!_validObj){
				_validObj=_this.closest('td').find('.valid-tip');
			}
			if(_this.find('option').length>0){
				_val=$.trim( _this.find('option:selected').val());
			}
			if((_val.length>0&&_val.length<_minNum)||_val.length>_maxNum){
				_validObj.addClass('valid-error').html(_errorTxt);
				return false;
			}else if(!_val){
				_validObj.addClass('valid-error').html(_valid.nullTxt);
				return false;
			}else{
				_validObj.removeClass('valid-error').html("");
				return true;
			}
		}
	}
	
	module.exports=Valid;
});