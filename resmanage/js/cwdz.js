define(function(require, exports, module) {
	var isSubmit=false;
	var dialog=require('//res.csc86.com/f=v2/m/dialog/js/init.js,/js/m/config.js');
	require('//resmanage.csc86.com/js/SWFUpload/v2.2.0.1/swfupload.js');
	require('//resmanage.csc86.com/js/handlers2.js');
	require('//resmanage.csc86.com/v2/m/page.js').init(null,{name:'page'});//分页
	require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');//上传图片插件



	artDialog.tip = function(msg, closeTime, callback) {
		this({
			id: 'sid',
			content: msg || '提示信息',
			title: '消息提示',
			opacity:0.7,
			fixed:true,
			lock:true,
			icon: 'mem-w',
            dbClickHide:false,
			time: closeTime || 3,
			padding:"0px 0px 0px 5px",
			close: callback || null
		});
	};



	/*var upload = function(callback){

		$('.jsUploadBtn').each(function(){
			var id=$(this).attr('id');
			new SWFUpload(uploadSettings({
				upload_url: "http://bops.csc86.com/bops-app/bops/import.purchasePrice",
				//type:"androidPhoto",
				button_placeholder_id:id,
				//button_action:SWFUpload.BUTTON_ACTION.SELECT_FILES,
				file_types: "*.xlsx;*.xls",
				file_size_limit : "200MB",
				// button_image_url : "//res.csc86.com/v2/c/member/supply/css/img/upload-btn.png",
				//button_width: 80,
				//button_height : 80,
				file_upload_limit : 0,
				button_text_left_padding:18,
				debug: false,
				//button_text_top_padding: 2,
				button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
				button_text: '<span class="btncor">导入文件</span>',
				button_text_style:".btncor{color:#555;font-size:12px}",
				upload_success_handler:function(file, serverData){

					var response =  eval('(' + serverData + ')');
					if(response.result != "success"){
						var msg = response.msg || "上传失败，请稍后重试！";
						artDialog.tip(msg,2);
						return;
					} else {

						/!*var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
						var $th=$('#SWFUpload_'+id);
						var $thparent=$th.parents('.tjtp li');
						//$thparent.find('.p1').html("<img  src="+url+file.type+">");
						$thparent.find('.p0 img').attr("src",url);
						var key=response.key.replace(/\//,"")+file.type;
						var $imglink = $thparent.find('input');
						$imglink.val(response.key);*!/

						//this.setButtonText('<span class="btncor">上传图片</span>');
						if(callback){callback()};

					}
				}
			}));
		});
	};*/

	var upload = function(obj){
		var loading;
		obj.each(function(){
			//document.domain = "csc86.com";
			var $this=$(this);
			//$prvwBox=$this.parents('.upld-box:first').siblings('.prvw-box');
			$this.fileupload({
				dataType:'json',
				url:'http://bops.csc86.com/bops-app/bops/import.purchasePrice',
				formData:function(){//指定上传的参数
					var dataObj={};
					return dataObj;
				},
				progressall:function(e,data){
					dialog.loading('文件正在上传中，请稍后...');
				},
				add:function(e,data){
					var fileInfo=data.files[0],
						regx=/(\.|\/)(xls)$/i,
						fileName=fileInfo.name,
						fileSize=fileInfo.size;
					if(!regx.test(fileName)){
						artDialog.tip('仅持xls格式文件，请选择正确的文件格式！',2);
						return false;
					}else{
						if(fileSize>1024*1024*300){

							artDialog.tip('文件大小不得超过300M！',2);
							return false;
						}else{

							data.submit();
						}
					}
				},
				done:function(e,data){
					art.dialog({id:"cscLoading"}).close();

					if(data.result.status=='true'){

						artDialog.tip(data.result.msg?data.result.msg:'上传成功！',3,function(){location.href=location.href;});

					}else{

						artDialog.tip(data.result.msg?data.result.msg:'上传失败，请稍后重试！',3);
					}
				},
				fail:function(e,data){
					art.dialog({id:"cscLoading"}).close();
					artDialog.tip(data.result.msg?data.result.msg:'上传失败，请稍后重试！',3);
				}
			});
		});
	};

	upload($('.fileUploadBtn'));

	//确认支付
	$('.ksdz').on('click',function(){
		var $this=$(this);
		var $cwmxtable=$('.cwmxtable');
		var $cwmxtabletr=$cwmxtable.find('tbody').find('tr');
		
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		
		if($cwmxtabletr.data("sj")){
		$cwmxtabletr.each(function(i) {
            var $this=$(this);
			var $thisdata = $this.data('sj');
			var $thistype = $this.data('type');
			var $thiscwdzk = $(this).find('.cwdzk');
			var $thisdzk = $(this).find('.dzk');
			if($thistype){
			$.post('//bops.csc86.com/bops-app/bops/ac.accountChecking',$thisdata,function(data){
			if(data.status===0){
					
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
				
				/*
				var arr=[];
	$cwmxtabletr.each(function() {
        var $this=$(this);
		var $thisdatatype =$this.data('type') ;
		var $thisval=$thisdatatype?false:true;
		arr.push($thisval);
    });

	if($.inArray(false,arr)>-1){
		
		
		
			var tipHtml='<div class="dzcw">部分数据对账失败，请重新对账</div>';
				var dg=dialog({
					id:'payFail',
					title:"提交支付",
					content:tipHtml,
					padding:"0px",
					fixed:true,
					lock:true,
					opacity:0.2,
					init:function(){

					},
				});
		
				}
				*/
				
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
                <td>商家名称</td><td>商家订单号</td><td>交易流水</td><td><span class="jyls">发生时间</span></td><td>金额</td><td>支付方式</td><td>状态</td>\
                </tr>';
			$.each($thisdatasourcedata,function(){
				var _this=this;
			tipHtml+='<tr>\
               <td>'+_this.shopName+'</td><td>'+_this.shopOrderNo+'</td><td>'+_this.tradeNo+'</td><td>'+_this.tradeDate+'</td><td><span class="red">'+_this.tradeAmount+'</span></td><td>'+_this.payType+'</td><td>'+_this.orderState+'</td>\
                </tr>';
				});	
				
				tipHtml+='<tr>\
						<td class="tl"colspan="7">支付数据</td>\
						</tr>\
						<tr  class="tr1">\
						<td>商家名称</td><td>商家订单号</td><td>交易流水</td><td><span class="jyls">发生时间</span></td><td>金额</td><td>支付方式</td><td>状态</td>\
						</tr>\
						<tr>\
					   <td>'+$thisdatatargetdata.shopName+'</td><td>'+$thisdatatargetdata.shopOrderNo+'</td><td>'+$thisdatatargetdata.tradeNo+'</td><td>'+$thisdatatargetdata.tradeDate+'</td><td>'+$thisdatatargetdata.tradeAmount+'</td><td>'+$thisdatatargetdata.payType+'</td><td>'+$thisdatatargetdata.orderState+'</td>\
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
							$.post('//bops.csc86.com/bops-app/bops/ac.setCheckedState',$thisdata,function(data){
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



	$('.cwmxtable').on('click','.operation',function(){
		var $this=$(this);
		var $thisdata=$(this).data('sj');
		var $thisparentstr = $this.parents('tr');

		var tipHtml='<form><table class="spwhtable"  cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="100">\
                <col>\
				</colgroup>\
				<tbody>\
                <tr>\
                <td class="tr">商品ID：</td><td class="tl"><input type="hidden" name="purId" value="'+$thisdata.purId+'">'+$thisdata.productId+'<input type="hidden" name="productId" value="'+$thisdata.productId+'"></td>\
                </tr>\
                <tr>\
                <td class="tr">SKU-ID：</td><td class="tl">'+$thisdata.skuId+'<input type="hidden" name="skuId" value="'+$thisdata.skuId+'"></td>\
                </tr>\
                <tr>\
                <td class="tr">商品名称：</td><td class="tl">'+$thisdata.productName+'<input type="hidden" name="productName" value="'+$thisdata.productName+'"></td>\
                </tr>\
                <tr>\
                <td class="tr">颜色/款式：</td><td class="tl">'+$thisdata.colourStyle+'<input type="hidden" name="colourStyle" value="'+$thisdata.colourStyle+'"></td>\
                </tr>\
                <tr>\
                <td class="tr">尺码/规格：</td><td class="tl">'+$thisdata.sizeName+'<input type="hidden" name="sizeName" value="'+$thisdata.sizeName+'"></td>\
                </tr>\
                <tr>\
                <td class="tr">采购价：</td><td class="tl"><input value="'+$thisdata.purchasePrice+'" name="purchasePrice"></td>\
                </tr>\
                <tr>\
                <td class="tr">生效日期：</td><td class="tl"><input value="'+$thisdata.startDate+'" name="startDate" id="startDate"  onclick=WdatePicker({el:"startDate"})>~<input value="'+$thisdata.endDate+'" id="endDate" name="endDate" onclick=WdatePicker({minDate:"#F{$dp.$D(\'startDate\')}",el:"endDate"})></td>\
                </tr>\
                <tr>\
                <td  colspan="2" class="tc"><input value="确定" type="button" class="qrxg"><input class="inp1" value="取消" type="button"></td>\
                </tr>\
				</tbody>\
				</table></form>';

		var dg2=dialog({
			id:'zgsp',
			title:"修改",
			content:tipHtml,
			padding:"20px",
			fixed:true,
			lock:true,
			opacity:0.2,
			init:function(){
				$('.qrxg').on('click',function(){
					var $this = $(this);
					var $thisform = $(this).parents('form');
					var $dataobj=$thisform.serialize();
					if(isSubmit===true){return false;}//阻止表单重复提交
					isSubmit=true;
					$.post('//bops.csc86.com/bops-app/bops/update.purchasePrice',$dataobj,function(data){
						if(data.status=='true'){
							dg2.close();
							location.href=location.href;

						}else{
							/*var tipHtml = '确认失败，请重试';
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
							});*/
							artDialog.tip(data.msg,2);



						}
						isSubmit=false;
					},'json');
				});
				$('.inp1').on('click',function(){
					dg2.close();
				});
			}
		});
		return false;
	});





	$('.cwmxtable').on('click','.delete',function(){
		var $this=$(this);
		var $thisdata=$this.data('sj');
		var tipHtml='<form><table class="spwhtable"  cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="100">\
                <col>\
				</colgroup>\
				<tbody>\
                <tr>\
                <td colspan="2"><span class="content2">确认删除？</span></td>\
                </tr>\
                <tr>\
                <td  colspan="2" class="tc"><input value="确定" type="button" class="qrxg"><input class="inp1" value="取消" type="button"></td>\
                </tr>\
				</tbody>\
				</table></form>';
		var dg2=dialog({
			id:'xxzfsftg',
			title:"提示",
			content:tipHtml,
			padding:"20px",
			dbClickHide:false,
			fixed:true,
			lock:true,
			opacity:0.2,
			init:function(){
				$('.qrxg').on('click',function(){

					if(isSubmit===true){return false;}//阻止表单重复提交
					isSubmit=true;
					$.post('delete.purchasePrice', $thisdata,function(data){
						if(data.status=='true'){
							dg2.close();
							location.href=location.href;
						}else{
							artDialog.tip(data.msg,3);
						}
					},'json');
					isSubmit=false;
				});
				$('.inp1').on('click',function(){
					dg2.close();
				});
			}
		});

		return false;
	});


    $('.cwmxtable').on('click','.WithdrawSet',function(){
        var $this=$(this);
        var $thisdata=$(this).data('sj');
        var $thisparentstr = $this.parents('tr');
        var $thisval=$thisparentstr.find('input[name*="txsz["]:checked').val();
        var $newthisdata=$.extend({}, $thisdata, {"state":$thisval} || {});

                    if(isSubmit===true){return false;}//阻止表单重复提交
                    isSubmit=true;

                    $.post('//bops.csc86.com/bops-app/bops/sz.updateWithdraw',$newthisdata,function(data){
                        if(data.success=='true'){
                            artDialog.tip(data.msg,2,function(){ location.href=location.href;});
                        }else{
                            artDialog.tip(data.msg,2);
                        }
                        isSubmit=false;
                    },'json');
        return false;

    });



    $('.cwmxtable').on('click','.wjshtg,.wjshjj',function(){
        var $this=$(this);
        var $thisdata=$this.data('sj');

        $.post('//bops.csc86.com/bops-app/bops/save.verifyState',$thisdata,function(data){

            if(data.status=='true'){
                artDialog.tip(data.msg,2,function(){location.href=location.href;});
            }else{
                artDialog.tip(data.msg,2);
            }

        },'json');
        return false;
    });


	$('.cwdztable').on('click','.jsglinp2',function(){
		var $this=$(this);
		var $thisdata=$this.data('url');
		var $thisform=$this.parents('form');
		var  dataobj=$thisform.serialize();
		$.post($thisdata,dataobj,function(data){
			if(data.status=='true'){
				artDialog.tip(data.msg,3,function(){location.href=location.href;});
			}else{
				artDialog.tip(data.msg,3);
			}
		},'json');
		return false;
	});

	$('.cwmxtable').on('click','.xxzftg',function(){
		var $this=$(this);
		var $thisdata=$this.data('sj').data;
        var tipHtml='<form><table class="spwhtable"  cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="100">\
                <col>\
				</colgroup>\
				<tbody>\
                <tr>\
                <td colspan="2"><span class="content2">是否通过！</span></td>\
                </tr>\
                <tr>\
                <td  colspan="2" class="tc"><input value="确定" type="button" class="qrxg"><input class="inp1" value="取消" type="button"></td>\
                </tr>\
				</tbody>\
				</table></form>';
        var dg2=dialog({
            id:'xxzfsftg',
            title:"是否通过",
            content:tipHtml,
            padding:"20px",
            fixed:true,
            lock:true,
            opacity:0.2,
            init:function(){
                $('.qrxg').on('click',function(){

                    if(isSubmit===true){return false;}//阻止表单重复提交
                    isSubmit=true;
                    $.post('offline.updateOffLinePayState', $thisdata,function(data){
                        if(data.status=='true'){
                            dg2.close();
                            location.href=location.href;
                        }else{
                            artDialog.tip(data.msg,3);
                        }
                    },'json');
					isSubmit=false;
                });
                $('.inp1').on('click',function(){
                    dg2.close();
                });
            }
        });

		return false;
	});

	$('.cwmxtable').on('click','.xxzfbtg',function(){
		var $this=$(this);
		var $thisdata=$(this).data('sj').data;

		var tipHtml='<form><table class="spwhtable"  cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="100">\
                <col>\
				</colgroup>\
				<tbody>\
                <tr>\
                <td class="tr">请填写拒绝理由：</td><td class="tl"><textarea  class="reasonMsg" name="reasonMsg"></textarea></td>\
                </tr>\
                <tr>\
                <td  colspan="2" class="tc"><input value="确定" type="button" class="qrxg"><input class="inp1" value="取消" type="button"></td>\
                </tr>\
				</tbody>\
				</table></form>';

		var dg2=dialog({
			id:'xxzffail',
			title:"填写不通过内容",
			content:tipHtml,
			padding:"20px",
			fixed:true,
			lock:true,
			opacity:0.2,
			init:function(){
				$('.qrxg').on('click',function(){
						var newdata=$.extend({},$thisdata,{"reasonMsg":$('textarea[name="reasonMsg"]').val()});
					if(isSubmit===true){return false;}//阻止表单重复提交
					isSubmit=true;
					$.post('offline.updateOffLinePayAuditReject',newdata,function(data){
						if(data.status=='true'){
							dg2.close();
							location.href=location.href;

						}else{
							artDialog.tip(data.msg,2);
						}
						isSubmit=false;
					},'json');
				});
				$('.inp1').on('click',function(){
					dg2.close();
				});
			}
		});
		return false;
	});



	$('.cwmxtable').on('click','.jis',function(){
		var $this=$(this);
		var $thisdata=$this.data('sj').data;
		var $thisparentstr = $this.parents('tr');
		var trhtml='';
		$.each($thisdata,function(i){
			var me = this;
			if(i==0){
				trhtml+='<tr><td>'+me.productName+'</td><td>'+me.enterprise+'</td><td>'+me.colourStyle+'</td><td>'+me.sizeName+'</td><td>'+me.price+'</td><td>'+me.number+'</td><td rowspan="'+$thisdata.length+'">'+me.realMoney+'</td><td rowspan="'+$thisdata.length+'">'+me.couponMoney+'</td><td>'+me.managerProfit+'</td><td>'+me.totalPrice+'</td><td class="tp3"><input name="settementTotalPrice['+i+']" class="spjszj" value="'+me.settementTotalPrice+'"><input name="orderId['+i+']" type="hidden" value="'+me.orderId+'"><input name="skuId['+i+']" type="hidden" value="'+me.skuId+'"><input name="productId['+i+']" type="hidden" value="'+me.productId+'"><input name="totalPrice['+i+']" type="hidden" value="'+me.totalPrice+'"></td></tr>';
			}else{
				trhtml+='<tr><td>'+me.productName+'</td><td>'+me.enterprise+'</td><td>'+me.colourStyle+'</td><td>'+me.sizeName+'</td><td>'+me.price+'</td><td>'+me.number+'</td><td>'+me.managerProfit+'</td><td>'+me.totalPrice+'</td><td class="tp3"><input name="settementTotalPrice['+i+']"  class="spjszj" value="'+me.settementTotalPrice+'"><input name="orderId['+i+']" type="hidden" value="'+me.orderId+'"><input name="skuId['+i+']" type="hidden" value="'+me.skuId+'"><input name="productId['+i+']" type="hidden" value="'+me.productId+'"><input name="totalPrice['+i+']" type="hidden" value="'+me.totalPrice+'"></td></tr>';
			}


			});

		var tipHtml='<form class="wjjsform"><table class="cwmxdztable"  cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="100">\
                <col width="100">\
                <col width="100">\
                <col width="100">\
                <col width="100">\
                <col width="100">\
                <col width="100">\
                <col width="100">\
                <col width="100">\
                <col width="100">\
                <col>\
                <col>\
				</colgroup>\
				<tbody>\
                <tr class="tr1">\
                <td>商品名称</td><td>供应商名称</td><td>颜色/款式</td><td>尺码规格</td><td>单价</td><td>采购数量</td><td>实付金额</td><td>优惠劵金额</td><td>管理毛利</td><td>商品总价</td><td>商品结算总价</td>\
                </tr>'+trhtml+'\
				</tbody>\
				<tfoot>\
				<tr>\
				<th colspan="11" class="tl tp30"><input class="wjjsqr" type="button" value="确定" data-sj={"tradeNo":"","state":1}> <input class="wjjsqx" type="button" value="取消"></th>\
				</tr>\
				</tfoot>\
				</table></form>';




		var dg2=dialog({
			id:'payFail',
			title:"结算",
			content:tipHtml,
			padding:"10px",
			fixed:true,
			lock:true,
			opacity:0.2,
			drag:false,
			init:function(){
				$('.spjszj').on('blur keyup',function(){

					this.value=this.value.replace(/[^0-9\.]+/g,'');
					this.value=this.value.replace(/[.]+/g,'.');
					this.value=this.value.replace(/^[.]/g,'');
					this.value=this.value.replace(/([.].*)([.])/g,'$1');
					this.value=this.value.replace(/(^[0-9]{1,6}\.[0-9]{4})(.*)/g,"$1");

					if(this.value>=999999) {//限制文本框最大值为999999，即最多6位数
						this.value = 999999;
					}
					//var $newval=(this.value*$thisdata.number).toFixed(4);
				});
				$('.wjjsqr').on('click',function(){
					var dataobj=$('.wjjsform').serialize();
					if(isSubmit===true){return false;}//阻止表单重复提交
					isSubmit=true;
					$.post('//bops.csc86.com/bops-app/bops/prod.confirmSettlement',dataobj,function(data){
						if(data.status=='true'){
							dg2.close();
							artDialog.tip(data.msg,3,function(){ location.href=location.href});

						}else{
							var tipHtml = '结算失败，请重试';
							var dg=dialog({
								id:'payFail',
								title:"结算失败",
								content:tipHtml,
								padding:"10px",
								fixed:true,
								lock:true,
								opacity:0.2,
								init:function(){

								}
							});



						}
						isSubmit=false;
					},'json');
				});
				$('.wjjsqx').on('click',function(){
					dg2.close();
				});
			}
		});
		return false;
	});

/*$('.zzform').on('click','.wjzzyzm',function(){
	var $this=$(this);
	var $thisdata=$this.data('url');
	var  dataobj=$('.zzform').serialize();
	$.post($thisdata,dataobj,function(data){
		console.log(data);
	});
});*/





		$('.zzform2').find('.wjzzyzm').on('click',function(){
			var $this=$(this);
			var $thisdata=$this.data('url');

			$this.val('2分钟重新获取');
			$this.prop('disabled',true);
			setTimeout(function(){$this.prop('disabled',false);$this.val('获取验证码');},120000);
			var  dataobj=$this.parents('.zzform2').serialize();
			$.post($thisdata,dataobj,function(data){
				if(data.status=='0'){
					artDialog.tip('短信已发出',3);
				}else{
					artDialog.tip(data.data.errorMsg,3,function(){$this.prop('disabled',false);$this.val('获取验证码');});
				}
			},'json');
		});

		$('.zzform2').find('.wjqezz').on('click',function(){
			var $this=$(this);
			var $thisdata=$this.data('url');
			$this.prop('disabled',true);
			var  dataobj=$this.parents('.zzform2').serialize();
			$.post($thisdata,dataobj,function(data){
				if(data.status=='0'){
					artDialog.tip('转账成功',3);
					location.href=location.href;
				}else{
					artDialog.tip(data.data.errorMsg,3,function(){$this.prop('disabled',false);});
				}
			},'json');
		});


	$('.zjgltable').on('click','.zz',function(){
		var $this=$(this);
		var $thisdata=$this.data('sj').data;

		var iframeart=art.dialog.open($thisdata.url, {
			id: 'wjzz',
			title: false,
			fixed: true,
			lock:true,
			dbClickHide:false,
			opacity:0.2,
			// 在open()方法中，init会等待iframe加载完毕后执行
			init: function () {
				var iframe = this.iframe.contentWindow;
				var top = art.dialog.top;// 引用顶层页面window对象

				$(iframe.document).find('.wjqxzz').on('click',function(){
					iframeart.close();
				});
				$(iframe.document).find('.wjzzyzm').on('click',function(){
					var $this=$(this);
					var $thisdata=$this.data('url');

					$this.val('2分钟重新获取');
					$this.prop('disabled',true);
					setTimeout(function(){$this.prop('disabled',false);$this.val('获取验证码');},120000);
					var  dataobj=$this.parents('.zzform').serialize();
					$.post($thisdata,dataobj,function(data){
						if(data.status=='0'){
							artDialog.tip('短信已发出',3);
						}else{
							artDialog.tip(data.data.errorMsg,3,function(){$this.prop('disabled',false);$this.val('获取验证码');});
						}
					},'json');
				});

				$(iframe.document).find('.wjqezz').on('click',function(){
					var $this=$(this);
					var $thisdata=$this.data('url');
					$this.prop('disabled',true);
					var  dataobj=$this.parents('.zzform').serialize();
					$.post($thisdata,dataobj,function(data){
						if(data.status=='0'){
							artDialog.tip('转账成功',3);
							iframeart.close();
							top.location.href=top.location.href;
						}else{
							artDialog.tip(data.data.errorMsg,3,function(){$this.prop('disabled',false);});
						}
					},'json');
				});
			},
			/*ok: function () {
				var iframe = this.iframe.contentWindow;
				if (!iframe.document.body) {
					alert('iframe还没加载完毕呢')
					return false;
				};
			},*/
			cancel: false
		});

		return false;
	});


	$('.zjgltable').on('click','.jl',function(){
		var $this=$(this);
		var $thisdata=$this.data('sj').data;

		var iframeart=art.dialog.open($thisdata.url, {
			id: 'wjjl',
			title: '转账记录',
			fixed: true,
			lock:true,
			dbClickHide:false,
			opacity:0.2,
			// 在open()方法中，init会等待iframe加载完毕后执行
			init: function () {
				var iframe = this.iframe.contentWindow;
				var top = art.dialog.top;// 引用顶层页面window对象

				$(iframe.document).find('.wjqxzz').on('click',function(){
					iframeart.close();
				});

				$(iframe.document).find('.wjqezz').on('click',function(){
					var $this=$(this);
					var $thisdata=$this.data('url');
					$this.prop('disabled',true);
					var  dataobj=$this.parents('.zzform').serialize();
					$.post($thisdata,dataobj,function(data){
						if(data.status=='0'){
							artDialog.tip('转账成功',3);
							iframeart.close();
							top.location.href=top.location.href;
						}else{
							artDialog.tip(data.data.errorMsg,3,function(){$this.prop('disabled',false);});
						}
					},'json');
				});
			},
			cancel: true,
			cancelVal:'关闭'
		});

		return false;
	});





	$('.cwmxtable').on('click','.yxsz',function(){
		var $this=$(this);
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		$.post('//bops.csc86.com/bops-app/bops/order.maillist',function(data){
			if(data.status=="1"){
				var datalen=data.data.length;
				if(datalen>0){
					var lihtml='';
					$.each(data.data,function(i){
						var me=this;
						if(i==datalen-1){
							lihtml+='<li>邮箱地址：<input class="yxinpt" placeholder="请填写邮箱地址" name="email[]" value="'+me.mail+'"><span class="s1 jsdel">删除</span><span class="s1 jsadd">增加</span></li>';
							return false;
						}
						lihtml+='<li>邮箱地址：<input class="yxinpt" placeholder="请填写邮箱地址" name="email[]" value="'+me.mail+'"><span class="s1 jsdel">删除</span></li>';

					});

				}else{
					var lihtml= '<li>邮箱地址：<input class="yxinpt" placeholder="请填写邮箱地址" name="email[]"><span class="s1 jsdel">删除</span><span class="s1 jsadd">增加</span></li>';
				};
				var tipHtml='<form class="mailform" method="post"><div class="skddmx"><ul>' +
					lihtml+
					'</ul>' +
					'<p><input type="button" value="确认" class="an qran"><input type="button" value="取消" class="an qxan"> </p>' +
					'</div></form>';

				var dg2=dialog({
					id:'yxsz',
					title:"设置邮箱地址",
					content:tipHtml,
					padding:"10px",
					fixed:true,
					lock:true,
					opacity:0.2,
					init:function(){
						$('.qran').on('click',function(){
							var $thisdata = $('.mailform').serializeArray();
							var arr=[];
							$.each($('input[name="email[]"'),function(){
								var $this=$(this);
								var meval=$this.val();
								var regp=/^(.*)@(.*)/;
								var regexp1 = new RegExp(regp);
								var meval = regexp1.test(meval);
								arr.push(meval);
								if(!meval){
									artDialog.tip('邮箱为空或格式错误，请修改后重新提交',2,function(){$this.focus();});
									return false;
								}

							});

							if ($.inArray(false, arr) >= 0) {
								//artDialog.tip('邮箱填写有错误，请修改后重提提交',2);
								return false;
							}

							$.post('//bops.csc86.com/bops-app/bops/order.savemail',$thisdata,function(data){
								if(data.status=="1"){
									dg2.close();
									artDialog.tip(data.msg||'保存成功',2);
								}else{
									artDialog.tip(data.msg||'确认失败，请重试',2);
								}
							},'jsonp');
						});
						$('.qxan').on('click',function(){
							dg2.close();
						});
						$('body').on('click','.jsadd',function(){
							var $this=$(this);
							var $thisparentli=$this.parent();
							var $thisparentul=$this.parents('ul');

							if($thisparentul.find('li').length>9){return false};
							$thisparentul.append('<li>邮箱地址：<input class="yxinpt" placeholder="请填写邮箱地址" name="email[]"><span class="s1 jsdel">删除</span><span class="s1 jsadd">增加</span></li>');
							$this.remove();
						});
						$('body').on('click','.jsdel',function(){
							var $this=$(this);
							var $thisparentli=$this.parent();
							var $thisparentul=$this.parents('ul');
							if($thisparentul.find('li').length<2){return false};

							if($this.next().is('.jsadd')){
								$thisparentli.prev().append('<span class="s1 jsadd">增加</span>');
							}
							$thisparentli.remove();
						});
					}
				});

			}else{
				artDialog.tip(data.msg||"操作失败，请重试",2);
			};

			isSubmit=false;

		},'jsonp');




		return false;
	});

	$('.cwmxtable').on('click','.dcdz',function(){
		var $this=$(this);
		var $thisdata=$('.cwdzform').serialize()+'&export=down';
		var url='//bops.csc86.com/bops-app/bops/order.accountindex?'+$thisdata;
		$this.attr('href',url)
	});

	
});

