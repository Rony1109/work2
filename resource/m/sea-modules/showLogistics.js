define(function(require, exports, module){
	var	HOST = seajs.hostmap;

	function showLogistics(param) {
		var dialog = require('dialog');
		param = param || {};

		var com = param.com || '',
			nu = param.nu || '',
			deliveryType = param.deliveryType || '',
			remark = param.remark || '',
			linkTel = param.linkTel || '';
			html = '<table class="g-pr uc-lrtbl wldtl-tbl">'+
						'<colgroup>'+
							'<col />'+
							'<col />'+
						'</colgroup>'+
						'<tbody>'+
							'<tr>'+
								'<th>配送方式：</th>'+
								'<td>'+deliveryType+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>配送方：</th>'+
								'<td>'+remark+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>运单号：</th>'+
								'<td>'+nu+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>物流跟踪：</th>'+
								'<td><span class="wlsm">以下跟踪信息由 <a href="http://www.kuaidi100.com" target="_blank">快递100</a> 提供，如有疑问请到物流公司官网查询</span></td>'+
							'</tr>'+
							'<tr>'+
								'<td colspan="2">'+
									'<div class="g-pr wldtl-box"><p class="loading">物流信息正努力加载中，请耐心等待...</p></div>'+
								'</td>'+
							'</tr>'+
						'</tbody>'+
					'</table>';
		var html2 = '<table class="g-pr uc-lrtbl wldtl-tbl">'+
						'<colgroup>'+
							'<col />'+
							'<col />'+
						'</colgroup>'+
						'<tbody>'+
							'<tr>'+
								'<th>配送方式：</th>'+
								'<td>'+deliveryType+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>电话号码：</th>'+
								'<td>'+linkTel+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th>物流跟踪：</th>'+
								'<td><span class="wlsm">以下跟踪信息由 <a href="http://www.kuaidi100.com" target="_blank">快递100</a> 提供，如有疑问请到物流公司官网查询</span></td>'+
							'</tr>'+
							'<tr>'+
								'<td colspan="2">'+
									'<div class="g-pr wldtl-box"><p class="loading">物流信息正努力加载中，请耐心等待...</p></div>'+
								'</td>'+
							'</tr>'+
						'</tbody>'+
					'</table>';
		var dg = new dialog({
			id:'wlInfo',
			content: deliveryType === '送货上门' ? html2 : html,
			title: '物流信息',
			padding:'15px 20px',
			width:600,
			fixed:true,
			lock:true,
			opacity:0.2,
			init:function(){
				$.post("//"+ HOST.i +"/logistic/logisticsInfo",{com:com,nu:nu,order:'asc'},function(data){
					var wlHtml='';
					if(data.status==="1"||data.status==="200"){
						var wlInf=data.data,
							length=wlInf.length,
							tr='';
						if(!wlInf||length===0){
							wlHtml='<p class="wl-status-empty">暂无物流信息</p>';
						}else{
							$.each(wlInf,function(i,n){
								tr+='<tr><td class="g-c9 wl-status-f">'+n.time+'</td><td class="wl-status-2" width="30"></td><td class="wl-status-r">'+n.context+'</td></tr>';
							});
							wlHtml='<table class="g-pr wl-status"><tbody>'+tr+'</tbody></table>';
						}
					}else{
						wlHtml='<p class="wl-status-empty">暂无物流信息</p>';
					}
					$('.aui_content').css('position','relative')
					$('.wldtl-box').html(wlHtml);
					$('.wldtl-box').find('.wl-status tr:first').find('td').eq(1).removeClass().addClass('wl-status-1');
					if(data.state==='3'){//已签收时
						$('.wldtl-box').find('.wl-status tr:last').find('td').eq(1).removeClass().addClass('wl-status-3');
					}
				},"jsonp");
			}
		});
	}
	module.exports = showLogistics;
});