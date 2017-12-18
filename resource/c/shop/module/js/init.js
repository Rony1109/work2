define(function(require, exports, module){
	var $dialog=require('dialog');
	var SetMdl={
		/*获取url参数*/
		getUrlParam:function(_url,key){
			if(_url.lastIndexOf("?") != -1){  
				var queryStr = _url.substring(_url.lastIndexOf("?") + 1, _url.length);  
				if(!key)  
				return queryStr;//返回所有参数  
				else{  
					var params  = queryStr.split("&");  
					for(var j = 0 ;j < params.length;j++){  
						var tmp = params[j].split("=");  
						if(tmp[0]==key){  
							return tmp[1];  
							break;  
						}  
					}  
				}  
			}  
		},
		
		/*图片上传*/
		upload:function(id,doneFun){
			var loading;
			id.fileupload({
				dataType:'json',
				progressall:function(e,data){
					loading=$dialog.loading('图片正在上传中，请稍后……');
				},
				add:function(e,data){
					var fileInfo=data.files[0];
					var regx=/(\.|\/)(jpe?g|png|gif)$/i;
					if(!regx.test(fileInfo.name)){
						$dialog.tip("仅支持jpg，png，gif格式图片，请选择正确的图片格式！",3);
						return false;
					}else{
						if(fileInfo.size>1024*1024*2){
							$dialog.tip("图片大小不得超过2M！",2.5);
							return false;
						}else{
							data.submit();
						}
					}
				},
				done:function(e,data){
					loading.close();
					doneFun(e,data);
				},
				fail:function(e,data){
					loading.close();
					$dialog.tip('上传失败，请稍后重试！');
				}
			});
		},
		
		/*删除图片*/
		picDel:function(obj){
			var _obj=obj?obj:$('.jsSetPicTbl');
			_obj.delegate('.jsDelOpt','click',function(){
				var _this=$(this);
				var _parent=_this.parents('tr');
				var _iptTxt=_parent.find('.ipt-txt[type=text]');
				if($.trim(_iptTxt.eq(0).val())==""&&$.trim(_iptTxt.eq(1).val())==""){
					$dialog.tip('暂无数据可删除！');
				}else{
					$dialog.confirm('确认删除吗？',function(){
						_iptTxt.val('');
					},function(){
					
					});
				}
				return false;
			});
		},
		
		/*验证验链接地址是否为华南城内部地址*/
		validUrl:function(obj){
			var _val=$.trim(obj.val());
			var _regExp=/^http\:\/\/(.+)\.csc86\.com(\/(.*))?$/;
			if(_val){
				if(_regExp.test(_val)){
					return true;
				}else{
					$dialog.tip('输入地址为限制地址，请重新输入！',3);
					return false;
				}
			}
		},
		
		/*图片移动*/
		picMove:function(){
			function initPicMove(){
				var _tbody=$('.jsSetPicTbl tbody');
				var _first=_tbody.find('tr:first');
				var _last=_tbody.find('tr:last');
				_tbody.find('.jsMoveUp').removeClass('no-move-up');
				_tbody.find('.jsMoveDown').removeClass('no-move-down');
				_first.find('.jsMoveUp').addClass('no-move-up')
				_last.find('.jsMoveDown').addClass('no-move-down');
			}
			
			//移动初始样式
			initPicMove();
			
			//上移
			$('.jsSetPicTbl').delegate('.jsMoveUp','click',function(){
				var _old=$(this).parents('tr');
				var _prev=_old.prev();
				_prev.before(_old);
				initPicMove();
				return false;
			});
			
			//下移
			$('.jsSetPicTbl').delegate('.jsMoveDown','click',function(){
				var _old=$(this).parents('tr');
				var _prev=_old.next();
				_prev.after(_old);
				initPicMove();
				return false;
			});
		},
		
		/*数据展示方式*/
		setDataShowType:function(obj){
			$('input[name=dataShowType]').bind('change',function(){
				var _this=$(this);
				var _index=$('input[name=dataShowType]').index(this);
				obj.hide();
				obj.eq(_index).show();
			});
		}
	}
	
	module.exports=SetMdl;
});