/*by pengle*/
define(function(require, exports, module){
	var isSubmit=false;
	var setXrpm={
		dialogTip:function(msg, closeTime, callback){
			artDialog({
				id: 'xrpmTip',
				content: msg || '提示信息',
				fixed: true,
				lock:true,
				opacity: .1,
				icon: 'csc-tip',
				time: closeTime || 1.5,
				close: callback || null
			});
		},
		dialogSuc:function(msg, closeTime, callback){
			artDialog({
				id: 'xrpmSuc',
				content: msg || '成功提示',
				fixed: true,
				lock:true,
				opacity: .1,
				icon: 'succeed',
				time: closeTime || 1.5,
				close: callback || null
			});
		},

		/*公用业务js*/
		init:function(){
			//绑定关键词单选tab
			$('.bndkey-tab a').bind('click',function(event){
				event.preventDefault();
				var href=$(this).attr('href');
				location.href=href;
			});
		},

		/*绑定赠送关键词*/
		bindZskey:function(){
			/*说明：此页面的js延用老板的advertising.js。
			  若有啥新功能就请在这里写吧*/
		},

		/*绑定付费关键词*/
		bindFfkey:function(){
			$('.jsBndFfKeyFrm').bind('submit',function(){
				var _this=$(this);
				var _keyword=_this.find('input[name=keyWord][type=radio]:checked');
				var _productId = $.trim(_this.find("input[name='productId']").val());
				if(!_keyword[0]){
					setXrpm.dialogTip("请选择关键词！");
					return false;
				}
				if(_productId.length<1){
					setXrpm.dialogTip("请输入产品ID！");
					return false;
				}
				if(isSubmit===true){
					return false;
				};
				isSubmit=true;
				$.post(_this.attr('action'),_this.serializeArray(),function(data){
					console.log(data);
					if(data.success){
						setXrpm.dialogSuc('绑定付费关键词成功！',1.5,function(){
							location.href=data.url;
						});
					}else{
						setXrpm.dialogTip(data.msg?data.msg:"绑定付费关键词失败！",2.5);
					}
					isSubmit=false;
				},"json");
				return false;
			});

			//删除关键词
			$('.cikulist').delegate('.jsDelFfKey','click',function(){
				var _this=$(this),
				    _href=_this.attr('href');
				artDialog.confirm('确定要删除吗？',function(){
					location.href=_href;
				},function(){

				});
				return false;
			});
		},

		/*绑定关键词名额*/
		bindKeyMe:function(){
			$('.jsBndMeKeyFrm').bind('submit',function(){
				var _this=$(this),
					_keyWord = $.trim(_this.find("input[name='keyWord']").val()),
					_keyWord1=_keyWord.match(/[^\d\w\u4e00-\u9fa5]+$/g),
					_countId=$.trim(_this.find('select[name=countId] option:selected').val()),
					_productId = $.trim(_this.find("input[name='productId']").val());
				if(_keyWord.length<1){
					setXrpm.dialogTip("请输入关键词！");
					return false;
				}
				if(_keyWord1==_keyWord){
					setXrpm.dialogTip("关键词不能全部为特殊字符！");
					return false;
				}
				if(_countId.length<1){
					setXrpm.dialogTip("请选择有效期！");
					return false;
				}
				if(_productId.length<1){
					setXrpm.dialogTip("请输入产品ID！");
					return false;
				}

				if(isSubmit===true){
					return false;
				};
				isSubmit=true;
				$.post(_this.attr('action'),_this.serializeArray(),function(data){
					if(data.success){
						setXrpm.dialogSuc('绑定关键词名额成功！',1.5,function(){
							location.href=data.url;
						});
					}else{
						setXrpm.dialogTip(data.msg?data.msg:"绑定关键词名额失败！",2.5);
					}
					isSubmit=false;
				},"json");
				return false;
			});
		},

		/*购买付费关键词*/
		buyFfKey:function(){
			$('.jsSrchKey').bind('click',function(){
				var _this=$(this),
					_keyWord=$.trim(_this.siblings('input[name=keyWord]').val()),
					_keyWord1=_keyWord.match(/[^\d\w\u4e00-\u9fa5]+$/g),
					_memberId=$.trim($('input[name=memberId][type=hidden]').val()),
					_form=_this.parents('.jsBuyFfKeyFrm'),
					_price=_form.find('input[name=price]'),
					_isReserved=_form.find('input[name=isReserved]');
				if(_keyWord.length<1){
					setXrpm.dialogTip('请输入关键词！');
					return false;
				}
				if(_keyWord1==_keyWord){
					setXrpm.dialogTip("关键词不能全部为特殊字符！");
					return false;
				}
				if(isSubmit===true){
					return false;
				};
				isSubmit=true;
				_price.val('');
				$.get('http://bops.csc86.com/bops-app/bops/paykeywordManager.getPriceBykeyWord?keyWord='+_keyWord+'&memberId='+_memberId,function(data){
					if(data.status){
						_price.val(data.data.charge);
						_isReserved.val(data.data.isReserved);
					}else{
						setXrpm.dialogTip(data.msg?data.msg:"查询失败！",2.5);
					}
					isSubmit=false;
				},'json');
			});
			$('.jsBuyFfKeyFrm').bind('submit',function(){
				var _this=$(this),
					_keyWord=$.trim(_this.find('input[name=keyWord]').val()),
					_keyWord1=_keyWord.match(/[^\d\w\u4e00-\u9fa5]+$/g),
					_price=$.trim(_this.find('input[name=price]').val()),
					_sxDate=_this.find('input[name=sxDate][type=radio]:checked');
				if(_keyWord.length<1){
					setXrpm.dialogTip("请输入关键词！");
					return false;
				}
				if(_keyWord1==_keyWord){
					setXrpm.dialogTip("关键词不能全部为特殊字符！");
					return false;
				}
				if(_price.length<1){
					setXrpm.dialogTip("请检查价格信息！")
					return false;
				}
				if(!_sxDate[0]){
					setXrpm.dialogTip("请选择生效日期！");
					return false;
				}
				if(isSubmit===true){
					return false;
				};
				isSubmit=true;
				$.post(_this.attr('action'),_this.serializeArray(),function(data){
					if(data.success){
						setXrpm.dialogSuc('购买成功！',1.5,function(){
							location.href=data.url;
						});
					}else{
						setXrpm.dialogTip(data.msg?data.msg:"提交失败！",2.5);
					}
					isSubmit=false;
				},"json");
				return false;
			});
		}
	}

	setXrpm.init();
	module.exports=setXrpm;
});