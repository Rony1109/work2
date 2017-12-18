/**
 * 账户中心服务
 */


/**
 * 取消详查
 * @param  string id 订单id
 * @return 
 */
function orderCancel(id){
	var html = '<div class="pay_tips clearfix"><span class="f-l m-r-10"><b class="tips-icon"></b></span><div class="pay_tips_c" style="margin-top:10px"><h3>您确定要取消此订单？</h3><span class="m-t-20 block"><a href="javascript:void(cancelHander(\''+id+'\'))" class="y-btn m-r-10"><em>确定</em></a> &nbsp; <a href="javascript:" onClick="artDialog({id:\'payment_pop\'}).close()" class="g-btn"><em>取消</em></a></span></div></div>';
	csc.useDialog(function(){
		artDialog({
			id:'payment_pop',
			title:'温馨提醒',
			lock:true,
			width:405,
			height:200,
			background:'#000',
			opacity:'0.6',
			ok:false,
			content: html,
			closet : true
		});
	});
}

function cancelHander(id){
	$.post("serve.cancel.do",{oid:id},function(data){
		data.status && location.reload();
	},"jsonp");
}