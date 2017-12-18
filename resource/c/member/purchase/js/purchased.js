define(function(require, exports, module) {
	require('l/My97DatePicker/4.8/buyoffer_WdatePicker');//日期插件
	require('m/dialog/js/init');
	require('c/member/common/js/alertDialog.js');
	var valid=require('l/valid/js/valid.js');//表单验证插件
	var isSubmit=false;

	//以下两个变量页面事件触发导致的商品曝光埋点需要用到
	var triggerEventNum= 0,triggerEventArry=[];

	//alert(typeof($.nameSpace));
	
	//订单号/商品名称 ie处模拟html5中表单placeholder属性
	require.async('m/sea-modules/placeholder.js', function(m) {
//m.placeholder('#orderNum');
	});

	//图片固定大小
	var isIe6 = !-[1, ] && !window.XMLHttpRequest;
	if (isIe6) {
		$('.items-1 .ibox').find('img').each(function() {
			DrawImage(this, 60, 60);
			var TP = 60 / 2 - $(this).height() / 2
			this.style.cssText = "margin-top:" + TP + "px";
		});

		function DrawImage(ImgD, iwidth, iheight) {
			//参数(图片,允许的宽度,允许的高度)    
			var image = new Image();
			image.src = ImgD.src;
			if (image.width > 0 && image.height > 0) {
				if (image.width / image.height >= iwidth / iheight) {
					if (image.width > iwidth) {
						ImgD.width = iwidth;
						ImgD.height = (image.height * iwidth) / image.width;
					} else {
						ImgD.width = image.width;
						ImgD.height = image.height;
					}
				} else {
					if (image.height > iheight) {
						ImgD.height = iheight;
						ImgD.width = (image.width * iheight) / image.height;
					} else {
						ImgD.width = image.width;
						ImgD.height = image.height;
					}
				}
			}
		};
	}
	/*按钮弹窗组件 start*/
	
	/*按钮弹窗组件 end*/
	function _tips(centent) {
		$.tip({
			content: centent,
			padding: "20px 35px 20px 10px",
			closeTime: 2,
			icons: 'mem-w',
			callback: function() {
				$(this.DOM.icon).removeClass('fix-icon').find('.aui_iconBg').attr('style','background:url(//res.csc86.com/v2/l/artDialog/4.1.7/skins/icons/mem-w.png) no-repeat');
			}
		})
	};
	var _RloadTips = function(msg, flag) {
			$.tip({
				content: msg,
				closeTime: 1,
				icons: 'succeed',
				callback: function() {
					$(this.DOM.icon).addClass('fix-icon').find('.aui_iconBg').removeAttr('style');
				},
				closeCallback: function() {
					if (flag == true) {
						window.location.reload();
					}
				}
			})
	};
	//请求状态判断
	var _TrueAndFalse = function($status, msg, flag) {
			if ($status == '200'||$status=='302') {
				_RloadTips(msg, flag);
			} else if ($status == '301') {
				$.tip({
					content:'登录超时，请重新登录！',
					closeTime: 2,
					closeCallback:function(){
						window.location = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
					}
				});
			} else if ($status == '500') {
				$.tip({
					content:'操作失败，请重试！',
					closeTime: 2,
					closeCallback:function(){
						if (flag == true) {
							window.location.reload();
						}
					}
				});
			} else {
				$.tip({
					content:msg,
					closeTime: 2
				});
			}
	};
	//显示卖联系方式
	var SlideAjaxGet = function($this, _url, mainData) {
		$.AjaxGet(_url, mainData, function(data) {
			var _status = data.status;
			var _msg = data.msg;
			var sHtml = null;
			var $ul = $this.find('ul');
			var _width = $ul.width();
			var isSlide2 = $this.hasClass('slide-2');
			var $data = data.data;
			switch (_status) {
				case '200':
					if (isSlide2) {
						sHtml = '<li><span>电话：</span>' + $data['tel'] + '</li>' +
							'<li><span>手机：</span>' + $data['phone'] + '</li>' +
							'<li><span>Q Q：</span>' + $data['qq'] + '</li>';
					}/* else {
						sHtml = '<li><span>物流公司：</span>' + $data['company'] + '</li>' +
							'<li><span>物流单号：</span>' + $data['logisticsNo'] + '</li>' +
							'<li><span>发货时间：</span>' + $data['time'] + ' </li>';
					}*/
					break;
				default:
					sHtml = '<li style="text-indent: 15px;">' + _msg + '</li>';
					break;
			}
			$ul.html(sHtml);
			$this.find('.con-tx').show();
		}, '操作失败，请重试！')
	};
	
	

	$('.fix-style').on('click', '.logistics', function(e) {
		e.stopPropagation();
		var $this = $(this);
		var $data = null;
		var _url = null;
		var hasOrderNo = $this.find('span:first').attr('orderno');
		if (hasOrderNo) {
			$data = {
				orderNo: hasOrderNo
			}
			_url = '//i.csc86.com/b2border/viewLogistics';
		} else {
			var $dataType = $this.find('span:first').attr('data-type');
			$data = eval($dataType)[0];
			_url = '//i.csc86.com/b2border/viewShopInfo';
		}
		SlideAjaxGet($this, _url, $data);
	})

	//隐藏物流和联系卖家信息
	$(document).on('click', function() {
		var $dom = $(this).find('.con-tx');
		if ($('.con-tx').is(':visible')) {
			$(this).find('.con-tx').hide();
		}
	});
	
	//查看物流
	$('.jsShowWl').on('click',function(){
		var $this = $(this),
			type = $.parseJSON($this.attr("data-type")),
			com = type.com,
			nu = type.nu,
			deliveryType = type.deliveryType,
			remark = type.remark,
			linkTel = type.linkTel,
			psfs = '<tr><th>配送方式：</th><td>'+deliveryType+'</td></tr>',
			psf = deliveryType!=="上门自提"?'<tr><th>配送方：</th><td>'+remark+'</td></tr>':"",
			ydh = deliveryType!=="上门自提"?'<tr><th>运单号：</th><td>'+nu+'</td></tr>':"",
			lxdh = '<tr><th>联系电话：</th><td>'+linkTel+'</td></tr>',
			wlgz =  deliveryType!=="上门自提"?'<tr><th>物流跟踪：</th><td><span class="wlsm">以下跟踪信息由 <a href="http://www.kuaidi100.com" target="_blank">快递100</a> 提供，如有疑问请到物流公司官网查询</span></td></tr>':"",
			wlxx = deliveryType!=="上门自提"?'<tr><td colspan="2"><div class="g-pr wldtl-box"><p class="loading">物流信息正努力加载中，请耐心等待...</p></div></td></tr>':"",
			html = '<table class="g-pr uc-lrtbl wldtl-tbl">'+
						'<colgroup>'+
							'<col width="80">'+
							'<col />'+
						'</colgroup>'+
						'<tbody>'+
						psfs+psf+ydh+lxdh+wlgz+wlxx+
						'</tbody>'+
					'</table>';

		triggerEventNum++;
		triggerEventArry=[];
		triggerEventArry.push({
			orderId:$this.parents('tr').prev().find('a[href*="orderDetail?orderNo"]').text()
		});
		if(typeof cscgaMd == 'object'){
			cscgaMd.viewWl('pc',triggerEventNum,triggerEventArry[0]);
		}
		artDialog({
			id:'wlInfo',
			content: html,
			title: '物流信息',
			padding:'15px 20px',
			width:600,
			fixed:true,
			lock:true,
			opacity:0.2,
			init:function(){
				$.post("//i.csc86.com/logistic/logisticsInfo",{com:com,nu:nu,order:'asc'},function(data){
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
		
		return false;					
	});

	//催促卖家确认订单&&催发货
	$('.j-alert-1').on('click', function(e) {
		e.stopPropagation();
		var $this = $(this);
		var $url = '//i.csc86.com/buyer/urgingSellerShipped';
		var $dataType = eval($this.attr('data-type'))[0];
		triggerEventNum++;
		triggerEventArry=[];
		triggerEventArry.push({
			orderId:$dataType.orderNo
		});
		if(typeof cscgaMd == 'object'){
			cscgaMd.cfh('pc',triggerEventNum,triggerEventArry[0]);
		}
		$.AjaxGet($url, $dataType, function(data) {
			var $status = data.status;
			triggerEventNum++;
			triggerEventArry=[];
			if ($status == '200'||$status=='302') {
				triggerEventArry.push({
					orderId:$dataType.orderNo
				});
				if(typeof cscgaMd == 'object'){
					cscgaMd.cfhSuc('pc',triggerEventNum,triggerEventArry[0]);
				}
			}
			_TrueAndFalse($status, data.msg, false);
		}, '操作失败，请重试！');

	});

	//取消交易
	if(!$.nameSpace){$.nameSpace={};}
	$.nameSpace['refuse'] = '<table class="refuse-reason">' +
		'<tr>' +
		'<th>取消原因：</th>' +
		'<td><textarea name="cancelReason" id="" cols="30" rows="10"></textarea></td>' +
		'</tr>' +
		'<tr>' +
		'<td></td><td><div class="g-h5"></div><p class="fc_888">如果订单取消，已支付货款将原路退回。</p></td>' +
		'</tr>' +
		'<tr class="tips g-dn">' +
		'<td></td><td><div class="g-h5"></div><p class="fc-red">请填写取消原因，且不能超过150个字！</p></td>' +
		'</tr>' +
		'</table>';
		
		$('.mytable').on('click','.j-alert-2', function() {
			var $this = $(this);
			var $data = eval($this.attr('data-type'))[0];
			triggerEventNum++;
			triggerEventArry=[];
			triggerEventArry.push({
				orderId:$data.orderNo
			});
			if(typeof cscgaMd == 'object'){
				cscgaMd.cancelOrder('pc',triggerEventNum,triggerEventArry[0]);
			}
			$.cscConfirm({
				content: $.nameSpace['refuse'],
				title: '取消交易',
				callback: function() {
					$(this.DOM.title[0]).css('min-width', '380px');
					$(this.DOM.buttons).css({
						'text-align': 'right',
						'background': '#ebebeb',
						'padding': '8px 15px'
					});
					$(this.DOM.title[0]).css('min-width', '380px')
				},
				okFun: function() {
					$this.removeClass("j-alert-2");
					$data['cancelReason'] = $(this.DOM.content).find('textarea[name=cancelReason]').val();
					var $url = '//i.csc86.com/buyer/canceOrder';
					if ($data['cancelReason'] == '' || $data['cancelReason'] == 'undefined' || $data['cancelReason'].length > 150) {
						$('.tips').show();
						$('textarea[name=cancelReason]').css('border-color', '#ff0000')
						return false;
					}
					$.AjaxGet($url, $data, function(data) {
						var $status = data.status;
						triggerEventNum++;
						triggerEventArry=[];
						if ($status == '200'||$status=='302') {
							triggerEventArry.push({
								orderId:$data.orderNo
							});
							if(typeof cscgaMd == 'object'){
								cscgaMd.cancelOrderSuc('pc',triggerEventNum,triggerEventArry[0]);
							}
						}
						_TrueAndFalse($status, data.msg, true);
					}, '操作失败，请重试！')
				},
				cancelFun: true
			});
	});

	//确认收货
	$('.mytable').on('click','.j-alert-4', function() {
		var $this = $(this);
		var $data = eval($this.attr('data-type'))[0];
		triggerEventNum++;
		triggerEventArry=[];
		triggerEventArry.push({
			orderId:$data.orderNo
		});
		if(typeof cscgaMd == 'object'){
			cscgaMd.qrsh('pc',triggerEventNum,triggerEventArry[0]);
		}
		$.cscConfirm({
			content: '<p class="r-icon">请收到货后，再确认收货！否则您可能钱货两空！</p>',
			title: false,
			callback: function() {
				$(this.DOM.buttons).css({
					'background': 'none',
					'text-align': 'center',
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '380px')
			},
			okFun: function() {
				$this.removeClass("j-alert-4");
				var $url = '//i.csc86.com/buyer/confirmReceive';
				$.AjaxGet($url, $data, function(data) {
					var $status = data.status;
					triggerEventNum++;
					triggerEventArry=[];
					if ($status == '200'||$status=='302') {
						triggerEventArry.push({
							orderId:$data.orderNo
						});
						if(typeof cscgaMd == 'object'){
							cscgaMd.qrshSuc('pc',triggerEventNum,triggerEventArry[0]);
						}
					}
					_TrueAndFalse($status, data.msg, true);
				}, '操作失败，请重试！');
			},
			cancelFun: true
		});
	});
	
	
		//去支付提示
	$('.mytable').on('click','.fix-style a', function() {
		var $this=$(this);
		triggerEventNum++;
		triggerEventArry=[];
		triggerEventArry.push({
			orderId:$this.parents('tr').prev().find('a[href*="orderDetail?orderNo"]').text(),
			eventLabel:'singlePayment'
		});
		if(typeof cscgaMd == 'object'){
			cscgaMd.goPayment('pc',triggerEventNum,triggerEventArry[0]);
		}
		if(!$this.is(".tool-link")){
			var dg=artDialog({
				id:'jszfts',
				content: '<p class="zftswz">您正在支付订单，为了支付资金安全：<br>\
支付完成前，请不要关闭当前窗口。<br>\
支付完成后，请根据支付情况点击下面按钮。</p>',
				title: '支付提示',
				padding:'0',
				cancelVal:'支付失败',
				okVal:'支付成功',
				fixed:true,
				lock:true,
				cancel: function(){
					location.reload();
				},
				opacity:0.3,
				init:function(){
					$(this.DOM.title[0]).css('min-width', '500px');
				},
				ok:function(){
					location.reload();
				}
			});
		}

	});

	//线下支付失败提示
	$('.mytable').on('click','.xxzffail', function() {
		var $this=$(this);
		var $dataobj=$this.data('sj').data;
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		$.post('/buyer/getReasonMsg',$dataobj,function(data){
			if(data.status=="1"){
				var dg=artDialog({
					id:'jszfts',
					content: '<p class="zftswz">'+data.msg+'</p>',
					title: '提示',
					padding:'0',
					cancelVal:'关闭',
					fixed:true,
					lock:true,
					opacity:0.3,
					init:function(){
						$(this.DOM.title[0]).css('min-width', '500px');
					},
					cancel:function(){
						//dg.close();
					}
				});
			}else{
				$.tip({
					content:data.msg?data.msg:'操作失败！',
					closeTime: 3
				});
			}

			isSubmit=false;
		},'json');


	});


	//申请退换货
	$('.j-alert-5').on('click', function() {
		var $url = '//i.csc86.com/b2border/viewShopInfo';
		var $this = $(this)
		var $data = eval($this.attr('data-type'))[0];
		$.AjaxGet($url, $data, function(data) {
			var $status = data.status;
			var $data = data.data;
			if ($status == '200') {
				$.nameSpace['return-goods'] = '<h2 class="r-title">请直接与卖家联系协调解决</h2>' +
				'<p>电话：' + $data['tel'] + ' &nbsp;&nbsp;&nbsp;&nbsp; 手机：' + $data['phone'] + '</p>' +
				'<div class="g-h20"></div>' +
				'<p>或联系华南城网客服寻求帮助</p>' +
				'<p>电话：' + $data['cc'] + '</p>';
				$.tip({
					content: $.nameSpace['return-goods'],
					title: false,
					closeTime: 600,
					padding: '20px 25px 20px 10px',
					callback: function() {
						$(this.DOM.icon).addClass('fix-vertical')
					}
				});
			} else {
				_tips(data['msg']);
			}
		}, '操作失败，请重试！');

	});
	
	//接受备货
	$('.jsAccept').on('click',function(){
		var $this=$(this);
		var $data = eval($this.attr('data-type'))[0];
		triggerEventNum++;
		triggerEventArry=[];
		triggerEventArry.push({
			orderId:$data.orderNo
		});
		if(typeof cscgaMd == 'object'){
			cscgaMd.acceptBh('pc',triggerEventNum,triggerEventArry[0]);
		}
		$.cscConfirm({
			content: '<p class="cfrm-icon">备货时间'+$data.prepareDays+'天，请确认是否接受备货？</p>',
			title: false,
			callback: function() {
				$(this.DOM.buttons).css({
					'background': 'none',
					'text-align': 'center',
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '380px')
			},
			okFun: function() {
				var $url = '//i.csc86.com/buyer/xAcceptPrepare';
				$.AjaxGet($url, $data, function(data) {
					var $status = data.status;
					triggerEventNum++;
					triggerEventArry=[];
					if ($status == '200'||$status=='302') {
						triggerEventArry.push({
							orderId:$data.orderNo
						});
						if(typeof cscgaMd == 'object'){
							cscgaMd.acceptBhSuc('pc',triggerEventNum,triggerEventArry[0]);
						}
					}
					_TrueAndFalse($status, data.msg, true);
				}, '操作失败，请重试！');
			},
			cancelFun: true
		});
		return false;
	});
	
	//评论
	$('.jsGoCmmnt').on('click',function(){
		var dataType=$(this).data('type'),
			proImg=dataType[0]['proImg'],
			href=dataType[0]['link'],
			proName=dataType[0]['proName'];
		var html='<form class="jsCmmntFrm">'+
				  '<div class="pblsh-cmmnt">'+
				  	  '<div class="cmmnt-hd">'+
						  '<table class="g-pr uc-lrtbl pblsh-cmmnt-tbl">'+
							  '<colgroup>'+
								  '<col />'+
								  '<col />'+
							  '</colgroup>'+
							  '<tbody>'+
								  '<tr>'+
									  '<th>商品信息：</th>'+
									  '<td>'+
										  '<ul class="g-ivm order-pro-lst">'+
											  '<li class="g-cf frst">'+
												  '<p class="g-fl ibox pic"><a class="i" href="'+href+'" target="_blank"><img src="'+proImg+'" alt=""/></a></p>'+
												  '<p class="g-pr t"><a href="'+href+'" target="_blank">'+proName+'</a></p>'+
											  '</li>'+
										  '</ul>'+
										  
									  '</td>'+
								  '</tr>'+
								  '<tr class="scr-tr">'+
									  '<th><em class="g-cred">* </em>评分：</th>'+
									  '<td>'+
										  '<ul class="g-cf g-fl cmmnt-scr">'+
											  '<li class="scr1"><span>1</span></li>'+
											  '<li class="scr2"><span>2</span></li>'+
											  '<li class="scr3"><span>3</span></li>'+
											  '<li class="scr4"><span>4</span></li>'+
											  '<li class="scr5"><span>5</span></li>'+
										  '</ul>'+
										  '<input id="cmmntScr" type="hidden" name="score" value=""/>'+
									  '</td>'+
								  '</tr>'+
								  '<tr class="cmmnt-ctr">'+
									  '<th valign="top"><em class="g-cred">* </em>评价：</th>'+
									  '<td>'+
										  '<textarea id="cmmntTxt" class="g-pr txt-area" name="evaluationContent" cols="" rows=""></textarea>'+
										  '<div class="ctr-tip"><span class="g-c8">10-500字</span></div>'+
									  '</td>'+
								  '</tr>'+
							  '</tbody>'+
						  '</table>'+
					  '</div>'+
					  '<div class="g-tr frm-cz"><input class="org-btn" type="submit" name="" value="提交评价"/><label class="g-ml15 g-mr30 g-c4" for="nmTj"><input id="nmTj" name="isAnonymous" type="checkbox" value="1"> 匿名评价</label></div>'+
				  '</div>'+
				  '</form>';

		triggerEventNum++;
		triggerEventArry=[];
		triggerEventArry.push({
			orderId:dataType[0]['orderNo']
		});
		if(typeof cscgaMd == 'object'){
			cscgaMd.comment('pc',triggerEventNum,triggerEventArry[0]);
		}

		var dg=artDialog({
			id:'cmmnt',
			content: html,
			title: '发表评论',
			padding:'0',
			width:600,
			fixed:true,
			lock:true,
			opacity:0.2,
			init:function(){
				var $jsCmmntFrm=$('.jsCmmntFrm'),//评论form
					$cmmntScr=$('#cmmntScr'),//存放所评的分数隐藏域
					$scrLi=$('.scr-tr ul li'),//评分列表
					$cmmntTxt=$('#cmmntTxt'),//评价内容
					$nmTj=$('#nmTj');//匿名评价复选框
				
				//表单验证
				var validFrm=function(obj,isSmtValid){
					var isMust=true,
						nullTip='',
						errorTip='',
						regx=null,
						objId=obj.attr('id');
					switch(objId){
						case 'cmmntScr':
						nullTip='请评分';
						break;
						case 'cmmntTxt':
						nullTip='请输入评价内容，10-500字';
						errorTip='评价内容需10-500字';
						regx=/^[\w\W]{10,500}$/;
						break;
					}
					return valid.init({
						isMust:isMust,
						obj:obj,
						errorClass:'frm-error',
						nullTip:nullTip,
						errorTip:errorTip,
						regx:regx,
						isSmtValid:isSmtValid
					});
				};	
					
				//鼠标经过星星
				$scrLi.hover(function(){
					var $this=$(this),
						$parent=$this.parent(),
						clss=$this.attr('class');
					$parent.addClass('cmmnt-'+clss+'-hover');
				},function(){
					var $this=$(this),
						$parent=$this.parent(),
						clss=$this.attr('class');
					$parent.removeClass('cmmnt-'+clss+'-hover');
				});
				
				//鼠标点击星星
				$scrLi.on('click',function(){
					var $this=$(this),
						$parent=$this.parent(),
						clss=$this.attr('class'),
						score=$this.find('span').text();
					$parent.removeClass().addClass('g-cf cmmnt-scr cmmnt-'+clss);
					$cmmntScr.val(score);
					validFrm($cmmntScr,0);
				});
				
				//匿名评价复选框
				$nmTj.on('change',function(){
					var $this=$(this);
					if($this.is(':checked')){
						$this.val(0);
					}else{
						$this.val(1);
					}
				});
				
				//评价内容失去焦点验证
				$cmmntTxt.on('blur',function(){
					validFrm($(this),0);
				});
				
				//提交表单
				$jsCmmntFrm.on('submit',function(){
					var $this=$(this),
						arry=[];
					
					arry.push(validFrm($cmmntTxt,0));//评价内容验证
					arry.push(validFrm($cmmntScr,0));//评分验证
					
					//当qrslArry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
					if ($.inArray(false, arry) >= 0) {
						return false;
					}
					
					dataType[0]['score']=$cmmntScr.val();
					dataType[0]['evaluationContent']=$cmmntTxt.val();
					dataType[0]['isAnonymous']=$nmTj.val();
					
					//阻止表单重复提交
					if (isSubmit === true) {
						return false;
					} 
					isSubmit = true;
					
					//ajax提交
					$.post('//i.csc86.com/buyer/userEvaluation',dataType[0],function(data){
						if(data.status===1){

							triggerEventNum++;
							triggerEventArry=[];
							triggerEventArry.push({
								orderId:dataType[0]['orderNo']
							});
							if(typeof cscgaMd == 'object'){
								cscgaMd.commentSuc('pc',triggerEventNum,triggerEventArry[0]);
							}

							dg.close();
							$.tip({
								content:data.msg?data.msg:'操作成功！',
								closeTime: 3,
								closeCallback:function(){
									location.href=location.href;
								}
							});
						}else{
							$.tip({
								content:data.msg?data.msg:'操作失败！',
								closeTime: 3
							});
						}
						isSubmit=false;
					},'json');
					
					return false;
				});
			}
		});
		return false;
	});
	
	var $ycgpromng=$(".ycgpro-mng");
	var $mytable=$(".mytable");
	var $jsSltAll=$(".jsSltAll");
	
	if($ycgpromng.find('.jsSltOne').length==0){$jsSltAll.prop('checked',false).attr("disabled",true);};
	
	$ycgpromng.on('click','.hbzf',function(){
	var num=0;
	var order=[];
	var $this=$(this);
	var $parentTbl=$this.parents('.ycgpro-mng').find(".mytable");
	var $jsSltOne=$parentTbl.find(".jsSltOne:checked");
	
	$jsSltOne.each(function(){
		var $this=$(this);
		var $thisparentTr=$this.parents("tr");
		var $thisorder=$thisparentTr.find("span a").eq(0).text();
		var $thisparentTrnext=$thisparentTr.next();
		var $num=$thisparentTrnext.find('.fc-cc0000').text()*1;
		num+=$num;
		order.push($thisorder);
		});
		order=order.join(",");
		//alert(num);
		//alert(order)
		//$this.attr("href","https://i.csc86.com/pay/doPaymemt?orderNo="+order+"&payMoney="+num);
		$this.attr("href","https://i.csc86.com/pay/doPaymemt?orderNo="+order);

		triggerEventNum++;
		triggerEventArry=[];
		triggerEventArry.push({
			orderId:order,
			eventLabel:'mergePayment'
		});
		if(typeof cscgaMd == 'object'){
			cscgaMd.goPayment('pc',triggerEventNum,triggerEventArry[0]);
		}

		if(order==""||num==0){
			$.tip({
			content: "请选择支付订单",
			padding: "20px 35px 20px 10px",
			closeTime: 3,
			icons: 'mem-w',
			callback: function() {
				
			}
		})
			return false;}
	});
	
		$ycgpromng.on('click','.jsSltAll',function(){
			
		var checkArry=[];
		var $this=$(this);
		var $parentTbl=$this.parents('.mytable');
		//var $parentTbd=$this.parents('tbody');
		//var $parentTr=$parentTbl.find("tbody").find("tr");
		//var $numipt=$parentTr.find(".num-ipt");
		var $jsSltOne=$parentTbl.find('.jsSltOne');
		//var	$jsOneTprc=$parentTbl.find(".fc-cc0000");
		//var $jsAllTPrc=$parentTbl.find(".jsAllTPrc");
		//var $jsAllTnum=$parentTbl.find(".jsAllTnum");
		
		if($this.is(':checked')){
			$jsSltOne.prop('checked',true);
			//$parentTr.removeClass('noSlt');
			//$numipt.data("controll",true);
			//$numipt.removeAttr("disabled");
			

			/*//改变总数量
			var proNum=0;
			$numipt.each(function(){
				proNum+=$(this).val()*1;
			});
			$jsAllTnum.html(proNum);
			
			//改变总额
			var money=0;
			$jsOneTprc.each(function(){
				money+=cmmn.reFormatPrc($(this).html())*100;
			})
			money=Math.round(money)/100;
			$jsAllTPrc.html(cmmn.formatPrc(money));*/
		}else{
			$jsSltOne.prop('checked',false);
			//$parentTr.addClass('noSlt');
			//$numipt.data("controll",false);		
			//$numipt.attr("disabled",true);
			
			/*$jsAllTnum.html('0');
			$jsAllTPrc.html("0.00");*/
		}
		
		$mytable.find('.jsSltOne').each(function(){
			var $this=$(this);
			if($this.is(':checked')){
				checkArry.push(true);
			}else{
				checkArry.push(false);
			}
			return;
		});

		if(checkArry.length==0){$jsSltAll.prop('checked',false);return;}
		if($.inArray(false,checkArry)<0){
			$jsSltAll.prop('checked',true);
		}else{
			$jsSltAll.prop('checked',false);
		}
		
		

	});
	

$ycgpromng.on('click','.jsSltOne',function(){
		var checkArry=[];
		var $this=$(this);
		var $parentTbl=$this.parents('.mytable');
		var $parentTr=$this.parents('tr');
		//var $numipt=$parentTr.find(".num-ipt");
		var $jsSltAll=$parentTbl.find('.jsSltAll');
		
		
		//var $jsAllTPrc=$parentTbl.find(".jsAllTPrc");
		//var	$jsOneTprc=$parentTr.find(".jsOneTprc");
		//var $jsAllTnum=$parentTbl.find(".jsAllTnum");
		//var	money=0;
		if(!$this.is(':checked')){
			//$parentTr.addClass('noSlt');
			//$numipt.data("controll",false);
			//$numipt.attr("disabled",true);
			
			//$mytable.data("pay").priceRange=1;
			//alert($mytable.data("pay"));
			
			/*//改变总金额
			money=cmmn.reFormatPrc($jsAllTPrc.html())*100-cmmn.reFormatPrc($jsOneTprc.html())*100;
			money=Math.round(money)/100; 
			$jsAllTPrc.html(cmmn.formatPrc(money));
			
			//改变总数量
			$jsAllTnum.html($jsAllTnum.html()*1-$numipt.val()*1);*/
		}else{
			//$numipt.data("controll",true);
			//$parentTr.removeClass('noSlt');
			//$numipt.removeAttr("disabled");	
			//$_jsSltAll.removeAttr("disabled");
			
			/*//改变总金额
			money=cmmn.reFormatPrc($jsAllTPrc.html())*100+cmmn.reFormatPrc($jsOneTprc.html())*100;
			money=Math.round(money)/100; 
			$jsAllTPrc.html(cmmn.formatPrc(money));
			
			//改变总数量
			$jsAllTnum.html($jsAllTnum.html()*1+$numipt.val()*1);*/
		}
		
		$parentTbl.find('.jsSltOne').each(function(){
			var $this=$(this);
			
			if($this.is(':checked')){
				checkArry.push(true);
			}else{
				checkArry.push(false);
			}
			return;
		});

		if($.inArray(false,checkArry)<0){
			$jsSltAll.prop('checked',true);
		}else{
			$jsSltAll.prop('checked',false);
		}
		
	});
		
	
	
	
	

	$('body').on('focus', 'textarea[name=cancelReason]', function() {
		$(this).removeAttr('style');
	})
})