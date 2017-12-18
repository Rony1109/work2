define(function(require, exports, module) {
	require('l/My97DatePicker/4.8/buyoffer_WdatePicker');//日期插件
	require('//res.csc86.com/f=v2/c/member/supply/css/xgjg.css');
	var valid=require('l/valid/js/valid.js');//表单验证插件
	var verify = require('./release-pro');//表单验证引入（此项后期改下，改成统一用上面的表单验证插件）
	var pricescale=$('#proportion').val();
	//订单号/商品名称 ie处模拟html5中表单placeholder属性
	require.async('m/sea-modules/placeholder.js', function(m) {
		m.placeholder('#orderNum');
	});
	
	//图片固定大小
	var isIe6 = !-[1, ] && !window.XMLHttpRequest;
	if (isIe6) {
		$('.items-1 .ibox').find('img').each(function() {
			DrawImage(this, 60, 60);
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
		}
	}


	/*按钮弹窗组件 start*/
	require('c/member/common/js/alertDialog');
	/*按钮弹窗组件 end*/
	var _tips = function(centent) {
		$.tip({
			content: centent,
			padding: "20px 35px 20px 10px",
			icons: 'mem-w',
			closeTime: 2,
			callback: function() {
				$(this.DOM.icon).removeClass('fix-icon').find('.aui_iconBg').attr('style', 'background:url(//res.csc86.com/v2/l/artDialog/4.1.7/skins/icons/mem-w.png) no-repeat');
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
			if ($status == '200') {
				_RloadTips(msg, flag);
			} else if ($status == '301') {
				$.tip({
					content: '登录超时，请重新登录！',
					closeTime: 2,
					closeCallback: function() {
						window.location = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
					}
				});
				/*_tips('登录超时，请重新登录！');
				window.location = "//login.csc86.com/?done=" + encodeURIComponent(location.href);*/

			} else if ($status == '500') {
				$.tip({
					content: '操作失败，请重试！',
					closeTime: 2,
					closeCallback: function() {
						if (flag == true) {
							window.location.reload();
						}
					}
				});
				/*_tips('操作失败，请重试！');
				if (flag == true) {
					window.location.reload();
				}*/
			} else {
				$.tip({
					content: msg,
					closeTime: 2
				});
				//_tips(msg);
			}
	};
	
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
					$('.aui_content').css('position','relative');
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

	//现货发送
	$('.j-alert-1').on('click', function() {
		var $this = $(this);
		$.cscConfirm({
			content: '<p style="text-align:center">请在用户支付尾款后48小时内完成发货！</p>',
			title: '确认现货',
			callback: function() {
				$(this.DOM.buttons).css({
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '380px')
			},
			okFun: function() {
				var $url = '//i.csc86.com/seller/confirmOrder';
				var $data = eval($this.attr('data-type'))[0];
				$.AjaxGet($url, $data, function(data) {
					var _data = data;
					var $status = _data.status;

					_TrueAndFalse($status, _data.msg, true);
				}, '操作失败，请重试！')
			},
			cancelFun: true
		})


	});

	//库存不足
	$('.j-alert-2').on('click', function() {
		var $this = $(this);
		var sDiv = '<div class="j-bh" style="width: 260px;margin: 10px auto 10px;">备货时间：<input type="text" name="days" class="low-stocks" /> 天</div><span class="tips fc-red g-dn" style="padding-left:100px ;">请填写备货时间,且只能为大于0的整数！</span>';
		$.cscConfirm({
			content: sDiv,
			title: '库存不足',
			callback: function() {
				$(this.DOM.buttons).css({
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '380px')
			},
			okFun: function() {
				var $me = this;
				var $url = '//i.csc86.com/seller/lackingStorage';
				var $data = eval($this.attr('data-type'))[0];
				var Reg = /^[1-9][0-9]*$/;
				$data['days'] = $($me.DOM.content).find('input[name=days]').val();
				if ($data['days'] == '' || $data['days'] == 'undefinde' || Reg.test($data['days']) == false) {
					$('.tips').show();
					$('.low-stocks').css('border-color', '#ff0000');
					return false
				}
				$.AjaxGet($url, $data, function(data) {
					var _data = data;
					var $status = _data.status;
					_TrueAndFalse($status, _data.msg, true);
				}, '操作失败，请重试！')
			},
			cancelFun: true
		})
	});

	//拒绝订单
	$('.j-alert-3').on('click', function() {
		var $this = $(this);
		var sDom = '<table class="reason">' +
			'<tr>' +
			'<th valign="center">拒单理由：</th>' +
			'<td><textarea name="rejectReason" cols="30" rows="10"></textarea></td>' +
			'</tr>' +
			'<tr>' +
			'<th></th><td><p class="set-c">拒绝订单即停止供货，交易将会取消。</p></td>' +
			'<tr class="tips"><td></td><td><div class="g-h5"></div><p class="fc-red g-dn">请填写拒绝理由,且不能超过150个字！</p></td></tr>' +
			'</tr>' +
		'</table>';
		$.cscConfirm({
			content: sDom,
			title: '拒绝订单',
			callback: function() {
				$(this.DOM.buttons).css({
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '380px');
			},
			okFun: function() {
				var $me = this;
				var $url = '//i.csc86.com/seller/rejectOrder';
				var $data = eval($this.attr('data-type'))[0];
				$data['rejectReason'] = $($me.DOM.content).find('textarea[name=rejectReason]').val();
				if ($data['rejectReason'] == '' || $data['rejectReason'] == 'undefinde') {
					$('.tips').find('p').show();
					$('textarea[name=rejectReason]').css('border-color', '#ff0000');
					return false
				}
				$.AjaxGet($url, $data, function(data) {
					var _data = data;
					var $status = _data.status;
					_TrueAndFalse($status, _data.msg, true);
				}, '操作失败，请重试！')
			},
			cancelFun: true
		});
	});

	//同意取消
	$('.j-alert-5').on('click', function() {
		var $this = $(this);
		$.cscConfirm({
			content: '<p class="set-c" style="text-align:center">已支付货款将退回给买家！</p>',
			title: '同意取消订单',
			callback: function() {
				$(this.DOM.buttons).css({
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '380px')
			},
			okFun: function() {
				var $me = this;
				var $url = '//i.csc86.com/seller/agreeCancelOrderMsg';
				var $data = eval($this.attr('data-type'))[0];
				$.AjaxGet($url, $data, function(data) {
					var _data = data;
					var $status = _data.status;
					_TrueAndFalse($status, _data.msg, true);
				}, '操作失败，请重试！')
			},
			cancelFun: true
		});
	});
	
	//拒绝取消
	$('.j-alert-6').on('click', function() {
		var $this = $(this);
		var sDom = '<table class="refuse-reason">' +
			'<tr>' +
			'<th>拒绝理由：</th>' +
			'<td><textarea name="rejectReason" cols="30" rows="10"></textarea></td>' +
			'</tr>' +
			'<tr><td></td><td><div class="g-h5"></div><p class="fc-888">150个字符</p></td></tr>' +
			'<tr class="tips g-dn"><td></td><td><div class="g-h5"></div><p class="fc-red">请填写拒绝理由,且不能超过150个字！</p></td></tr>' +
			'</table>';
		$.cscConfirm({
			content: sDom,
			title: '拒绝取消订单',
			callback: function() {
				$(this.DOM.buttons).css({
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '380px')
			},
			okFun: function() {
				var $me = this;
				var $url = '//i.csc86.com/seller/rejectCancelOrder';
				var $data = eval($this.attr('data-type'))[0];
				$data['rejectReason'] = $($me.DOM.content).find('textarea[name=rejectReason]').val();
				if ($data['rejectReason'] == '' || $data['rejectReason'] == 'undefinde' || $data['rejectReason'].length > 150) {
					$('.tips').show();
					$('textarea[name=rejectReason]').css('border-color', '#ff0000');
					return false
				}
				$.AjaxGet($url, $data, function(data) {
					var _data = data;
					var $status = _data.status;
					_TrueAndFalse($status, _data.msg, true);

				}, '操作失败，请重试！')
			},
			cancelFun: true
		});
	});

	//备货完成
	$('.j-alert-7').on('click', function() {
		var $this = $(this);
		var $url = '//i.csc86.com/seller/finishPrepareOrder';
		$data = eval($(this).attr('data-type'))[0];
		$.cscConfirm({
			content: '<p style="text-align:center">请备好货再操作！</p>',
			title: '备货完成',
			callback: function() {
				$(this.DOM.buttons).css({
					'padding': '8px 15px'
				});
				$(this.DOM.title[0]).css('min-width', '380px')
			},
			okFun: function() {
				var $me = this;
				var $url = '//i.csc86.com/seller/finishPrepareOrder';
				var $data = eval($this.attr('data-type'))[0];
				$.AjaxGet($url, $data, function(data) {
					var _data = data;
					var $status = _data.status;
					_TrueAndFalse($status, _data.msg, true);

				}, '操作失败，请重试！');
			},
			cancelFun: true
		});

	});

	//修改价格
	$('.jsModifyPrc').on('click', function() {
		//var $getData = eval($(this).attr('data-type'))[0];
		var $getData = $(this).data("type"); 
		
		/*
		var html = '<div class="modify-prc-pop">\
					<p class="hd">请填写与买家协商好的价格</p>\
					<form class="jsMdfyPrcFrm">\
					<ul class="modify-prc-frm">\
						<li class="g-cf prc-itm">\
							<span class="key">商品单价：</span>\
							<div class="value"><input class="prc-txt" type="text" name="price" value="' + $getData.price + '"/> 元</div>\
						</li>\
						<li class="g-cf">\
							<span class="key">采购数量：</span>\
							<div class="value"><span class="amount">' + $getData.totleNum + '</span>' + $getData.unitValue + '</div>\
						</li>\
						<li class="g-cf prc-itm">\
							<span class="key">订单金额：</span>\
							<div class="value"><input class="prc-txt zprc-txt" type="text" name="totalMoney" value="' + $getData.totleMoney + '"/> 元</div>\
						</li>\
					</ul>\
					<input type="hidden" name="orderNo" value="' + $getData.orderNo + '" />\
					</form>\
				</div>';
			*/
				
				
				$.ajax({
					url:'//'+ location.host +'/seller/getOrderProducts',
					data:$getData,
					type:'post',
					dataType:'json',
					beforeSend:function(){
						//$(".jsPrchsFrm").html('<p class="loading">加载中...</p>');
					},
					success:function(data){
						
						if(data.status===1){
					
		var outputs='<form class="jsMdfyPrcFrm">\
				<table class="paytable" border="0" cellspacing="0" cellpadding="0">\
				<colgroup>\
				<col width="140">\
				<col width="80">\
				<col width="130">\
				<col width="110">\
				</colgroup>\
				<thead>\
				<tr>\
				<th>商品</th>\
				<th>数量</th>\
				<th>原总价</th>\
				<th>修改后总价</th>\
				</tr>\
				</thead>\
				<tbody>';

$.each(data.data.list,function(){
	var _this= this;
	var modifyPrice = _this.modifyPrice=="0.00"?_this.linePrice:_this.modifyPrice;
	outputs+='<tr>\
				<td class="first">'+_this.productName+'<p class="tcsku">'+_this.other+'</p></td>\
				<td><span class="amount">'+_this.number+'</span></td>\
				<input type="hidden" name="productId" value="'+_this.productId+'" />\
				<input type="hidden" name="propertyId" value="'+_this.propertyId+'" />\
				<td>'+_this.linePrice+'</td>\
				<td class="xjprc-txt"><input class="editprice prc-txt" data-oldpreice="'+_this.linePrice+'" value="'+modifyPrice+'"><input type="hidden" class="priScale" name="priScale" value="0"></td>\
				</tr>';
	});

	outputs+='</tbody>\
				<tfoot>\
				<tr>\
				<td colspan="4">原订单金额：<em class="yprice">'+data.data.oldAmount+'</em><br>修改后订单金额：<em class="xprice zprc-txt">'+data.data.amount+'</em></td>\
				</tr>\
				</tfoot>\
				<input type="hidden" name="orderId" value="'+$getData.orderId+'" />\
				</table>\
				</form>';	

					
		$.cscConfirm({
			content: outputs,
			title: '修改价格',
			callback: function() {
				$(this.DOM.buttons).css({
					'background':'#ebebeb',
					'text-align':'right'
				});
				$(this.DOM.title[0]).css('min-width', '460px');
				var $aui_content = $('.aui_content');
				if($('.aui_state_lock').height()>$(window).height()){$aui_content.css({"height":($(window).height()-82)+"px","overflow-y":"scroll"})}else{
					$aui_content.css({"height":"auto","overflow-y":"auto"})
					};

					$(".prc-txt").on('blur',function(){
						var $this=$(this);
						var $oldpreice=$this.data("oldpreice");
						if($('.xprice').text()*1<$('.yprice').text()*pricescale){
							$.cscConfirm({
								id:'xgts',
								content: '<p style="text-align:center">当前修改价格低于原价'+pricescale*100+'%，确认修改吗？</p>',
								title: '修改价格提示',
								callback: function() {
									$(this.DOM.buttons).css({
										'padding': '8px 15px'
									});
									$(this.DOM.title[0]).css('min-width', '460px');
								},
								okFun: function() {
									$this.parent().find('.priScale').val(1);
									this.close();
								},
								cancelFun: function(){
									$this.val($oldpreice);
									$this.trigger('focusout');
								}
							})
						}
					});
			},
			okFun: function() {
				var Ary = [];
				$('.prc-txt').each(function(i) {
					var $this = $(this);
					var isTrue = verify.valid.init({
						isMust: true,
						obj: $this,
						tipObj: $this.parent(),
						nullTip: '不能为空！',
						errorTip: '请输入0.01-999999.99之间的数字，最多2位小数',
						regx: /^([1-9][0-9]{0,5}(\.[0-9]{0,2})?|0\.[1-9][0-9]?|0\.0[1-9])$/,
						type: 0
					});
					Ary[i] = isTrue;
				});
				for (var num in Ary) {
					if (Ary[num] === false) {
						return false;
					}
				}
				//var $data = $('.jsMdfyPrcFrm').serialize()
				var $data="";

				$(".jsMdfyPrcFrm").find("tbody").find("tr").each(function(){
					var $this=$(this);
					var productId=$this.find('input[type=hidden][name=productId]').val();
					var propertyId=$this.find('input[type=hidden][name=propertyId]').val();
					var editprice=$this.find(".editprice").val();
					var priScale=$this.find(".priScale").val();
					$data+="linedatas="+productId+","+editprice+","+propertyId+","+priScale+"&";
					});
					$data+="orderId="+$getData.orderId+"&amount="+$(".jsMdfyPrcFrm").find(".xprice").text();
				
				$.AjaxGet('/seller/priceChange', $data, function(data) {
					var _data = data;
					var $status = _data.status;
					_TrueAndFalse($status, _data.msg, true);
				}, '操作失败，请重试！')
			},
			cancelFun: true
		});
		return false;
		
					
							
	
						}
						//系统异常时
						else{
						//$(".jsPrchsFrm").html('<p class="loading">加载失败，请刷新页面后重试！</p>');
						}
						
					},
					//请求异常时
					error:function(){
						//$(".jsPrchsFrm").html('<p class="loading">加载失败，请刷新页面后重试！</p>');
					}
				});
				

	});
	//改价操作
	var priceTpr = null;
	var compute = function(selecterA, nselecterB, selecterC, $this) { //输入联动关系判断
		if (selecterA.get(0) === $this.get(0)) {
			var manPric = (selecterA.val() * selecterC.text()).toFixed(2);
			if (isNaN(manPric)) {
				return
			};
			nselecterB.text(manPric);
			var pricecont=0;
			$(".xjprc-txt").each(function() {
              var $this =$(this);
			    pricecont+=$this.text()*1;
            });
			pricecont=Number(pricecont).toFixed(2);
			$(".zprc-txt").text(pricecont);
		} else if (nselecterB.get(0) === $this.get(0)) {
			var UnitPrc = (nselecterB.val() / selecterC.text()).toFixed(2);
			if (isNaN(UnitPrc)) {
				return
			};
			selecterA.val(UnitPrc);
		}
	};
	

	var compute2 = function(selecterA, nselecterB, selecterC, $this) { //输入联动关系判断
		if (selecterA.get(0) === $this.get(0)) {
			//var manPric = (selecterA.val() * selecterC.text()).toFixed(2);
			if (isNaN($this.val())) {
				return
			};
			//nselecterB.text(manPric);
			var pricecont=0;
			$(".prc-txt").each(function() {
              var $this =$(this);
			    pricecont+=$this.val()*1;
            });
			pricecont=Number(pricecont).toFixed(2);
			$(".zprc-txt").text(pricecont);
		} else if (nselecterB.get(0) === $this.get(0)) {
			var UnitPrc = (nselecterB.val() / selecterC.text()).toFixed(2);
			if (isNaN(UnitPrc)) {
				return
			};
			selecterA.val(UnitPrc);
		}
	};
	
		
	$('body').on('focus keyup blur', '.prc-txt', function(e) { //输入联动
		var $type = e.type,
			$this = $(this),
			$prc = $('.prc-txt'),
			$zprc = $('.zprc-txt'),
			$thistr = $this.parents("tr");
			//$UnitPrc = $prc.eq(0),
			$mainPrc = $zprc,
			$amount = $thistr.find('.amount').eq(0),
			//$xjcont = $thistr.find('.xjprc-txt').eq(0),
			$xjcont = $this,
			$val = $(this).val();

			//console.log($this.parents("tr").find('.amount').eq(0).text());
		switch ($type) {
			case 'keyup':
				compute2($this, $xjcont, $amount, $this);
				$prc.each(function() {
					var $this = $(this);
					verify.valid.init({
						isMust: true,
						obj: $this,
						tipObj: $this.parent(),
						nullTip: '不能为空！',
						errorTip: '请输入0.01-999999.99之间的数字，最多2位小数',
						regx: /^([1-9][0-9]{0,8}(\.[0-9]{0,2})?|0\.[1-9][0-9]?|0\.0[1-9])$/,
						type: 0
					});
				});
				break;
			case 'focusin':
				priceTpr = $(this).val();
				break;
			case 'focusout':
				if (!isNaN($val)) {
					$this.val(Number($val).toFixed(2));
					compute2($this, $xjcont, $amount, $this);
				};
				var isTrue = verify.valid.init({
					isMust: true,
					obj: $this,
					tipObj: $this.parent(),
					nullTip: '不能为空！',
					errorTip: '请输入0.01-999999.99之间的数字，最多2位小数',
					regx: /^([1-9][0-9]{0,8}(\.[0-9]{0,2})?|0\.[1-9][0-9]?|0\.0[1-9])$/,
					type: 0
				});
				break;
		}

	});


	$('body').on('focus', 'textarea[name=rejectReason],.low-stocks,input[name=logisticsCompany],input[name=logisticsNO]', function() {
		$(this).removeAttr('style');
	})
});