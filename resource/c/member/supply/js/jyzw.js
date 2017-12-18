//交易账务页面js
define(function(require, exports, module) {
	require('./init.js');//公用js
	var dialog = require("m/dialog/js/init");//弹窗公用js
	
	//查看冻结货款金额详情
	$('.jsDjPrc').on('click','b:not(".nohref")',function(){
		var $this=$(this),
			dtl=$this.data('dtl'),
			url=dtl.url,
			title=dtl.title;
			w=dtl.w,
			h=dtl.h;
		var dg=dialog.open(url,{
			id:'prcDtl',
			title:title,
			width:w,
			height:h,
			fixed:true,
			lock:true,
			padding:0,
			opacity:.2,
			drag:false,
			init:function(){
				
			}
		});
	});
	
	//确认收款
	$('.jsQrskBtn').on('click',function(){
		var $this=$(this);
		var id=$this.attr('name');
		dialog({
			id:'cscConfirm',
			content: '<p class="r-icon" style="color:#333;font-weight:bold;font-family:simsun;">请收到货款后再确认收款！</p>',
			fixed: true,
			lock: true,
			opacity: 0.20,
			title: '确认收款',
			padding:'60px 113px 80px 90px',
			ok: function(){
				var url='//i.csc86.com/draw/updateConfirm';
				var dataObj={"state":4,"id":id};
				var tipFun=function(msg){
					dialog({
						title: false,
						content:msg,
						icon: 'mem-w',
						fixed: true,
						lock: true,
						opacity: 0.20,
						padding:'20px 45px 20px 10px',
						time: 1.5,
						close:function(){
							location.href='//i.csc86.com/draw/list';
						}
					});
				};
				$.post(url,dataObj,function(data){
					if(data.status==="true"){
						tipFun(data.msg?data.msg:"确认收款成功");
					}else{
						tipFun(data.msg?data.msg:"确认收款失败");
					}
				},'json');
			},
			cancel: true,
			init: function() {
				$(this.DOM.buttons).css({
					'padding': '8px 15px',
					'background':'#ebebeb',
					'text-align':'right'
				});
				/*$(this.DOM.buttons).find('button:not(".aui_state_highlight")').css({
					'background':'#fff',
					'height':'26px',
					'border':'1px solid #c9c9c9',
					'color':'#333'
				});*/
				$(this.DOM.title[0]).css('min-width', '380px');
			}

		});
		return false;
	});
});