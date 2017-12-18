/*财务管理-b2b订单管理 下的订单列表页js*/
define(function(require, exports, module){
	var isSubmit=false;
	var dialog={
		success:function(msg,closeTime,callback){
			art.dialog({
				content: msg,
				icon:'csc-success',
				fixed:true,
				lock:true,
				opacity:0.2,
				time:closeTime || 2,
				padding:'20px 25px 20px 10px',
				close:callback || null
			});
		},
		error:function(msg,closeTime,callback){
			art.dialog({
				content: msg,
				icon: 'csc-error',
				fixed: true,
				lock:true,
				opacity:0.2,
				time:closeTime || 2,
				padding:'20px 25px 20px 10px',
				close:callback || null
			});
		},
		tip:function(msg,closeTime,callback){
			art.dialog({
				content: msg,
				icon: 'csc-tip',
				fixed: true,
				lock:true,
				opacity:0.2,
				time:closeTime || 2,
				padding:'20px 25px 20px 10px',
				close:callback || null
			});
		}
	}
	
	var djJdFun=function(obj,flag){
		var t,c,okVal,sucMsg,errorMsg;
		var inf=obj.parents('td').data('inf')
		var orderid=inf.orderid;
		var finishtime=inf.finishtime;
		var btime=inf.btime;
		if(flag){//当flag为1代表解冻，0代表冻结
			t='解冻货款';
			c='请确认此单交易纠纷已解决后再操作！';
			okVal='确认解冻';
			sucMsg='解冻货款成功';
			errorMsg='解冻货款失败';
		}else{
			t='冻结货款';
			c='仅用于产生交易纠纷时暂时冻结此单货款，<br/>请确认后再操作！';
			okVal='确认冻结';
			sucMsg='冻结货款成功';
			errorMsg='冻结货款失败';
		}
		var dg=art.dialog({
			id:'cnfrm',
			title: t,
			lock: true,
			content: c,
			fixed: true,
			drag:false,
			background: "#000",
			opacity: "0.2",
			okVal:okVal,
			ok: function() {
				var dataObj={flag:flag,orderid:orderid,finishtime:finishtime,btime:btime};
				if(isSubmit===true){return false;}//阻止表单重复提交
				isSubmit=true;
				$.get('http://bops.csc86.com/bops-app/bops/sz.lockOrUnlockPayment',dataObj,function(data){
					dg.close();
					if(data.statuscode){
						dialog.success(sucMsg,2,function(){
							location.href=location.href;
						});
					}else{
						dialog.error(errorMsg);
					}
					isSubmit=false;
				},'jsonp');
				return false;
			},
			cancel:true
		});
	}
	
	//冻结货款
	$('.jsDjHk').on('click',function(){
		djJdFun($(this),0);
		return false;
	});
	
	//解冻货款
	$('.jsJdHk').on('click',function(){
		djJdFun($(this),1);
		return false;
	});
	
	$('.jsdjform').on('click','.tg',function(){
		$this=$(this);
		
		var tg=art.dialog({
			id:'cnfrm',
			title: '冻结管理',
			lock: true,
			content: '通过审核吗？',
			fixed: true,
			drag:false,
			background: "#000",
			opacity: "0.2",
			okVal:'确认',
			ok: function() {
				if(isSubmit===true){return false;}//阻止表单重复提交
				isSubmit=true;
				tg.close();
					$.post($this.attr('href'),function(data){
				if(data.statuscode=="true"){
					dialog.success('审核成功',2,function(){
						$this.remove();
							location.href=location.href;
						});
				}else{
					dialog.error('审核失败');
				}
				isSubmit=false;
			},'jsonp');
				return false;
			},
			cancel:true,
			dblclick_hide:false
		});
		return false;

	});
	
	$('.jsdjform').on('click','.jj',function(){
		$this=$(this);
		
		var tg=art.dialog({
			id:'cnfrm',
			title: '冻结管理',
			lock: true,
			content: '拒绝审核吗？',
			fixed: true,
			drag:false,
			background: "#000",
			opacity: "0.2",
			okVal:'确认',
			ok: function() {
				if(isSubmit===true){return false;}//阻止表单重复提交
				isSubmit=true;
				tg.close();
					$.post($this.attr('href'),function(data){
				if(data.statuscode=="true"){
					dialog.success('拒绝成功',2,function(){
							location.href=location.href;
						});
				}else{
					dialog.error('拒绝失败');
				}
				isSubmit=false;
			},'jsonp');
				return false;
			},
			cancel:true
		});
		return false;

	});
	
$('.jsdjform').on('click','.sq',function(){
		$this=$(this);
		
		var tg=art.dialog({
			id:'cnfrm',
			title: '冻结申请',
			lock: true,
			content: '同意申请吗？',
			fixed: true,
			drag:false,
			background: "#000",
			opacity: "0.2",
			okVal:'确认',
			ok: function() {
				if(isSubmit===true){return false;}//阻止表单重复提交
				isSubmit=true;
				tg.close();
					$.post($this.attr('href'),function(data){
				if(data.statuscode=="true"){
					dialog.success('申请成功',2,function(){
							location.href=location.href;
						});
				}else{
					dialog.error('申请失败');
				}
				isSubmit=false;
			},'jsonp');
				return false;
			},
			cancel:true
		});
		return false;

	});	
	
	$('.jsdjform').on('click','.cx',function(){
		$this=$(this);
		
		var tg=art.dialog({
			id:'cnfrm',
			title: '冻结申请',
			lock: true,
			content: '撤销申请吗？',
			fixed: true,
			drag:false,
			background: "#000",
			opacity: "0.2",
			okVal:'确认',
			ok: function() {
				if(isSubmit===true){return false;}//阻止表单重复提交
				isSubmit=true;
				tg.close();
					$.post($this.attr('href'),function(data){
				if(data.statuscode=="true"){
					dialog.success('撤销成功',2,function(){
							location.href=location.href;
						});
				}else{
					dialog.error('撤销失败');
				}
				isSubmit=false;
			},'jsonp');
				return false;
			},
			cancel:true
		});
		return false;

	});	
	
	
});