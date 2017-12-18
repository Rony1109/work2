/*
* 华南城地图列表页
* author: why （2013年4月19日）
*/

//修改商铺帐号
var showUserID = function(spid,xgid,obj){
	var o = $(spid),$userId,$nume;
	$userId = o.parents("tr").find("td:eq(1)").text();
	$nume = o.parents("tr").find("td:eq(3)").text();
	if($nume == "空"){$nume = "";}
	art.dialog({
		 title:'修改会员帐号',
		content:
			'<div class="art-u">'
				+'<span>商铺号：</span>'
				+'<input name="userId" type="text" value="'+$userId+'" disabled />'
			+'</div>'
			+'<div class="art-u">'
				+'<span>会员帐号：</span>'
				+'<input type="text" value="'+$nume+'" name="nume" />'
			+'</div>',
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var nume = $(this.DOM.wrap[0]).find("input[name='nume']").val();
			var userId = $(this.DOM.wrap[0]).find("input[name='userId']").val()
			$.post("shopdomains.updateShopDamains",{"shopId":userId,"account":nume},function(data){
				if(data.status == 2){
					alert_aReturn(0,"","商品ID或会员帐号参数出错!");
				}else{
					alert_aReturn(data.status,"修改成功!","修改出错!",function(){location.href = location.href;})
				}

			},"jsonp")
		},
		cancel: true,
		lock:true
	});
}

var pageto_ = function(o){
	var obj = $(o);
	page = $.trim(obj.find("input[name='pageNo']").val());
	if(/^\d+$/.test(page)){
		if((page-0) <= 0){page = 1};
		document.location.href = setURL_argument("pageNo",page);
	}
	return false;
}

//成功,失败提示框
function alert_aReturn(data,success,lose,fun_s,fun_l){
	if($.trim(data) == "1"){
		art.dialog({
			content:success,
			ok:false,
			icon:'succeed',
			time:1.5,
			title:"成功",
			close: fun_s || function(){}
		});
	}else{
		art.dialog({
			content:lose,
			icon:'error',
			fixed:true,
			title:"出错",
			time: 1.5,
			close: fun_l || function(){}
		});
	}
}


