seajs.config({
    // 别名配置
    alias: {
        'jquery': 'l/jquery/1.10.2/jquery.min.js',
		'dialog':'m/dialog/js/init.js'
    },
    // Sea.js 的基础路径
    base: '//res.csc86.com/v2/'
});

define(function(require, exports, module) {
	var $dialog=require('dialog');
	var isSubmit=false;
	var addKeyPm={
		/*绑定产品相关js*/
		bindProFun:function(){
			var _sltBndPro=$('.jsSltbndPro'),
				_boxBd=_sltBndPro.find('.box-bd'),
				_iptTxt=_sltBndPro.find('.sltbnd-pro-ipt'),
			    _proLst=_sltBndPro.find('.pro-lst');
			
			//鼠标移入文本框显示产品列表
			_boxBd.hover(function(){
				$(this).addClass('hover');
			},function(){
				$(this).removeClass('hover');
			});
			
			//鼠标移入产品列表显示对于产品图片
			_proLst.delegate('li','mouseenter',function(){
				var _this=$(this);
				_this.addClass('hover').siblings('li').removeClass('hover');
			});
			
			//点击鼠标将对应列表的产品信息显示在文本框内
			_proLst.delegate('li','click',function(){
				var _this=$(this),
					_proInf=_this.find('.sltbnd-pro-inf').clone();
				_iptTxt.html(_proInf);
				_sltBndPro.find('input[name=productId][type=hidden]').val(_proInf.data('id'));
				_boxBd.removeClass('hover');
			});
			
			//提交绑定（默认为添加赠送关键词排名页面）
			$('.jsBndProFrm').bind('submit',function(){
				var _this=$(this),
					_bndSuc=_this.data('bndsuc'),
					_proId=$.trim(_this.find('input[name=productId][type=hidden]').val()),
					_keyWord=$.trim($('input[name=keyword]').val());
				
				var _data={'productId':_proId,'keyword':_keyWord};
				
				if(_proId.length<1){
					$dialog.tip("先选个产品吧!");
					return false;
				}
				
				if($('#addFfKey')[0]){//判断是否为关键字页面
					var _payWordId=$("input[name=payWordId]:checked"),
					    _payWordIdVal=$.trim(_payWordId.val());
					if(!_payWordId[0]){
						$dialog.tip("选择绑定的关键词!");
						return false;
					}
					_data={'productId':_proId,'payWordId':_payWordIdVal};
				}
				
				if($('#addFfMe')[0]){//判断是否为关键名额的页面
					var _paywordCountId=$.trim($("select[name=paywordCountId] option:selected").val());
					_data={'productId':_proId,'keyword':_keyWord,'paywordCountId':_paywordCountId};
				}
				
				if($('#modifyFfMe')[0]){//判断是否为修改页面
					var _payWordId=$.trim($('input[name=payWordId][type=hidden]').val());	
					_data={'productId':_proId,'keyword':_keyWord,'payWordId':_payWordId};
				}
				
				if(isSubmit===true){
					return false;
				}
				isSubmit=true;
				$.post(_this.attr('action'),_data,function(data){
					if(data.success){
						var _html='<div class="bndPro-pop">\
								<div class="hd"><img src="//res.csc86.com/v2/c/member/xrpm/images/right.png" width="24" height="24" alt=""/>'+data.msg+'</div>\
								<div class="bd"><a class="org-abtn" href="'+_bndSuc.addUrl+'">继续添加</a><a class="org-abtn" href="'+_bndSuc.showUrl+'">查看</a></div>\
							</div>';
						if($('#modifyFfMe')[0]){//判断是否为修改页面
							_html='<div class="bndPro-pop">\
								<div class="hd"><img src="//res.csc86.com/v2/c/member/xrpm/images/right.png" width="24" height="24" alt=""/>'+data.msg+'</div>\
								<div class="bd"><a class="org-abtn" href="'+_bndSuc.showUrl+'">查看</a></div>\
							</div>';
						}
						$dialog({
							id:'bndSuc',
							title:false,
							content:_html,
							width:270,
							height:135,
							fixed:true,
							close:true,
							time:3
						});
					}else{
						$dialog.error(data.msg?data.msg:'绑定失败！',true,3);
					}
					isSubmit=false;
				},"jsonp");
				return false;
			});
		},
		
		/*选好了*/
		sltKeyFun:function(){
			$('.jsSltKeyFrm').bind('submit',function(){
				var _this=$(this),
					_keyword=$.trim(_this.find('input[name=keyword]').val()),
					_keyword1=_keyword.match(/[^\d\w\u4e00-\u9fa5]+$/g);
				if(_keyword.length<1){
					return false;
				}
				if(_keyword1==_keyword){
					$dialog.tip("不能全部为特殊字符!");
					return false;
				}
			});
		},
		
		/*添加关键词排名下的所有页面相关js*/
		init:function(){
			//单选框tab切换
			$('.addkey-tab li').click(function(){
				var _this=$(this),
					_url=_this.data('url');
				location.href=_url;
			});
			addKeyPm.sltKeyFun();//选好了
			addKeyPm.bindProFun();//绑定产品
		}
	};
	
	addKeyPm.init();
});
