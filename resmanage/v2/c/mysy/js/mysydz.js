define(function(require, exports, module) {
	var page=require('http://resmanage.csc86.com/v2/m/page.js');
	var isSubmit=false;
	var dialog=require('//res.csc86.com/f=v2/m/dialog/js/init.js');
	var mysydz={
		init:function(){
			this.opers();
			page.init($('.mysy-cost-topfrom'), {name: 'pageNumber'});
		},
		opers:function(){
			/*开始对账 循环表格*/
			$('.ksdz').on('click',function(){
				var $this=$(this);
				var $cwmxtable=$('.cwmxtable');
				var $cwmxtabletr=$cwmxtable.find('tbody').find('tr');
				
				if(isSubmit===true){return false;}//阻止表单重复提交
				isSubmit=true;
				
				if($cwmxtabletr.data("sj")){
					
					$cwmxtabletr.each(function(i) {
						var $this=$(this);
						var $thisdata = JSON.parse($this.data('sj'));
						var $orderId=$thisdata.orderId;
						var $payWay =$thisdata.payWay;
						var $thistype = $this.data('type');
						//console.log($thistype);
						var $thiscwdzk = $(this).find('.cwdzk');
						var $thisdzk = $(this).find('.dzk');
						
						if($thistype){
							$.post('//bops.csc86.com/bops-app/bops/estate.accountChecking',{'orderId':$orderId,'payWay':$payWay},function(data){
								if(data.status===0){ //对账返回状态
										
									$this.data({'type':0});
									if(data.data.status){
										$thiscwdzk.addClass('cwdz1'); 
										$thisdzk.addClass("dz").text("对账").data({"sj":data});
									}else{
										$thiscwdzk.addClass('cwdz2');
										$thisdzk.removeClass("dz").text("");
									}
								}
								else{
									$thiscwdzk.addClass('cwdz3') 
								}
								
								if(i==$cwmxtabletr.length-1){
									isSubmit=false;
								}
							},'json');
					
						}
					});
				
				}
				return false;
			});
			
			$('.cwmxtable').on('click','.dz',function(){
				var $this=$(this);
				var $thisdata=$(this).data('sj').data;
				var $thisparentstr = $this.parents('tr');
				var $thisdatasourcedata=$thisdata.sourcedatas;
				var $thisdatatargetdata=$thisdata.targetdata;
		
				var tipHtml='<table class="cwmxdztable"  cellspacing="0" cellpadding="0">\
						<colgroup>\
						<col width="80">\
						<col width="180">\
						<col width="180">\
						<col width="100">\
						<col width="80">\
						<col width="100">\
						<col>\
						</colgroup>\
						<tbody>\
						<tr>\
						<td class="tl" colspan="7">订单数据</td>\
						</tr>\
						<tr class="tr1">\
						<td>华南城账号</td><td>订单号</td><td>交易流水</td><td><span class="jyls">发生时间</span></td><td>金额</td><td>支付方式</td><td>状态</td>\
						</tr>';
				tipHtml+='<tr>\
					   <td>'+$thisdatasourcedata.memberName+'</td><td>'+$thisdatasourcedata.orderId+'</td><td>'+$thisdatasourcedata.transactionNo+'</td><td>'+$thisdatasourcedata.tradeDate+'</td><td><span class="red">'+$thisdatasourcedata.pamount+'</span></td><td>'+$thisdatasourcedata.ppayWay+'</td><td>'+$thisdatasourcedata.tradeState+'</td>\
						</tr>';
						
						
						tipHtml+='<tr>\
								<td class="tl"colspan="7">支付数据</td>\
								</tr>\
								<tr  class="tr1">\
								<td>华南城账号</td><td>订单号</td><td>交易流水</td><td><span class="jyls">发生时间</span></td><td>金额</td><td>支付方式</td><td>状态</td>\
								</tr>\
								<tr>\
							   <td>'+$thisdatatargetdata.memberName+'</td><td>'+$thisdatatargetdata.orderId+'</td><td>'+$thisdatatargetdata.transactionNo+'</td><td>'+$thisdatatargetdata.tradeDate+'</td><td>'+$thisdatatargetdata.pamount+'</td><td>'+$thisdatatargetdata.ppayWay+'</td><td>'+$thisdatatargetdata.tradeState+'</td>\
								</tr>\
								</tbody>\
								<tfoot>\
								<tr>\
								<th colspan="7" class="tl tp30"><input class="qrdz" type="button" value="确定对账" data-sj={"tradeNo":"'+$thisdatatargetdata.shopOrderNo+'","state":1}> <input class="qxdz" type="button" value="取消"></th>\
								</tr>\
								</tfoot>\
							</table>';
						
						var dg2=dialog({
							id:'payFail',
							title:"对账",
							content:tipHtml,
							padding:"10px",
							fixed:true,
							lock:true,
							opacity:0.2,
							init:function(){
								$('.qrdz').on('click',function(){
									var $this = $(this);
									var $thisdata = $this.data("sj");
									var $orderId =$thisdatatargetdata.orderId;
									var $desc =$thisdatatargetdata;
									$.post('//bops.csc86.com/bops-app/bops/estate.setCheckedState',{'orderId':$orderId,'desc':$desc},function(data){
										if(data.status===0){
											dg2.close();
											$thisparentstr.find('.cwdzk').removeClass('cwdz').addClass('cwdz2').end().find('.dzk').removeClass('dz').text('');
											
										}else{
											var tipHtml = '确认失败，请重试';
											var dg=dialog({
												id:'payFail',
												title:"对账失败",
												content:tipHtml,
												padding:"10px",
												fixed:true,
												lock:true,
												opacity:0.2,
												init:function(){
												
												}
											});
										}
									});
								});
								
								$('.qxdz').on('click',function(){	
									dg2.close();
								});
							}
						});
				return false;
			});
		}
	}
	/*页面加载调用*/
	mysydz.init();
});