define(function(require, exports, module) {
	require('c/member/common/js/alertDialog');//弹窗
	var addrCascade=require('l/addrselect/js/addrselect');//省市区级联
	var valid=require('l/valid/js/valid.js');//表单验证插件
	var isSubmit=false;
	
	var fxthh={
		/*
		*维修退换货管理列表页
		*/
		mng:function(){
			//服务单号/订单号/商品名称 ie处模拟html5中表单placeholder属性
			require.async('m/sea-modules/placeholder.js', function(m) {
				m.placeholder('#orderNum');
			});
			
			//提交时间
			require.async('l/My97DatePicker/4.8/buyoffer_WdatePicker', function(m) {
				$('#startTime').click(function(){
					WdatePicker({
						maxDate:'#F{$dp.$D(\'endTime\')}',
						readOnly:true
					});
				});
				$('#endTime').click(function(){
					WdatePicker({
						minDate:'#F{$dp.$D(\'startTime\')}',
						readOnly:true
					});
				});
			});
			
			//分页
			require.async('c/member/common/js/page.js');	
		},
		/*
		*服务单详情
		*/
		fxthhDtl:function(){
			//表单验证
			var validDtlFrm=function(obj){
				var isMust=true,
					nullTip='',
					errorTip='',
					type=0,
					regx=null,
					objId=obj.attr('id');
				switch(objId){
					case 'province':
					nullTip='请选择问题商品返回地址';
					break;
					case 'city':
					nullTip='请选择问题商品返回地址';
					break;
					case 'district':
					nullTip='请选择问题商品返回地址';
					break;
					case 'address':
					nullTip='请输入详细地址';
					break;
					case 'consignee':
					nullTip='请输入收货人姓名';
					break;
					case 'phone':
					nullTip='请输入手机号码';
					errorTip='请输入正确格式的手机号码';
					regx=/^1\d{10}$/;
					break;
					case 'tel':
					isMust=false;
					errorTip='请输入正确格式的座机号码';
					regx=/^([0-9]{3,4}(\-)?)?([0-9]{7,8})+((\-)?[0-9]{1,5})?$/;
					break;
					case 'tkMoney':
					nullTip='请输入退款金额';
					errorTip='退款金额需大于或等于0，最多2位小数，6位数以内';
					type=1;
					break;
					case 'shipment':
					nullTip='请输入运费';
					errorTip='运费需大于或等于0，最多2位小数，6位数以内';
					type=1;
					break;
					case 'service':
					nullTip='请输入维修费';
					errorTip='维修费需大于或等于0，最多2位小数，6位数以内';
					type=1;
					break;
					case 'tkjylsNum':
					nullTip='请输入退款交易流水号';
					errorTip='退款交易流水号只能填写字母或数字，40个字符以内';
					regx=/^[A-Za-z0-9]{1,40}$/;
					break;
				}
				return valid.init({
					isMust:isMust,
					obj:obj,
					errorClass:'frm-error',
					nullTip:nullTip,
					errorTip:errorTip,
					type:type,
					regx:regx
				});
			}
			
			//服务单号
			var orderId=$('input[name=orderId]').val();
			
			/*处理状态为申请提交成功时相关js*/

			//收货地址相关js
			var $jsAddrLst=$('.jsAddrLst'),
				$newAddrBox=$('.newAddr-box'),
				$province=$('#province'),//省份下拉列表
				$city=$('#city'),//市下拉列表
				$district=$('#district');//区下拉列表
				$address=$('#address'),//详细地址
				$consignee=$('#consignee'),//收货人
				$phone=$('#phone'),//手机号码
				$tel=$('#tel'),//座机
				$addressName=$('input[name=addressName]');
			$jsAddrLst.on('change','input[name=addrRadio]',function(){
				var $this=$(this),
					$parent=$this.parents('li');
				$parent.addClass('cur').siblings('li').removeClass('cur');
				if($parent.hasClass('newaddr')){
					//重置收货地址中的表单元素
					$province.find('option').eq(0).attr('selected','selected');
					$city.find('option').eq(0).attr('selected','selected');
					$district.find('option').eq(0).attr('selected','selected');
					$address.val('');
					$consignee.val('');
					$phone.val('');
					$tel.val('');
					$district.show();
					$newAddrBox.find('.valid-tips').remove();
					$newAddrBox.find('.frm-error').removeClass('frm-error');
					$newAddrBox.show();
				}else{
					$newAddrBox.hide();
				}
			});
			
			//省市地区级联
			addrCascade.addrCascade($province,$city,$district);
			
			//编辑收货地址
			$('.jsAddrLst').on('click','.jsEdit',function(){
				var $this=$(this),
					addressId=$this.siblings('label').find('input[name=addrRadio]').val();
				$.get('//i.csc86.com/memaddress/getAddtrssById?addressId='+addressId,function(data){
					if(data.status==="200"){
						var inf=data.data,
							provinceId=inf.provinceId,
							cityId=inf.cityId,
							districtId=inf.districtId,
							address=inf.address,
							consignee=inf.consignee,
							phone=inf.mobile,
							tel=inf.tel;
						$address.val(address);
						$consignee.val(consignee);
						$phone.val(phone);
						$tel.val(tel);
						$province.find('option[value='+provinceId+']').attr('selected','selected');
						$.get('//i.csc86.com/getZoneByParentId?parentId='+provinceId,function(data){
							var cityHtml='';
							if(data.status==="200"){
								var obj=data.data;
								for(var i=0;i<obj.length;i++){
									var selected="";
									if(obj[i].id==cityId){
										selected='selected="selected"';
									}
									cityHtml+='<option value="'+obj[i].id+'" '+selected+'>'+obj[i].name+'</option>';
								}
								$city.find('option:gt(0)').remove().end().append(cityHtml);
							}
						},'jsonp');
						if(districtId){
							$.get('//i.csc86.com/getZoneByParentId?parentId='+cityId,function(data){
								var dstrctHtml='';
								if(data.status==="200"){
									var obj=data.data;
									for(var i=0;i<obj.length;i++){
										var selected="";
										if(obj[i].id==districtId){
											selected=' selected';
										}
										dstrctHtml+='<option value="'+obj[i].id+'"'+selected+'>'+obj[i].name+'</option>';
									}
									$district.find('option:gt(0)').remove().end().append(dstrctHtml);
									$district.show();
								}else{
									$district.hide();
								}
							},'jsonp');
						}
						$newAddrBox.find('.valid-tips').remove();
						$newAddrBox.find('.frm-error').removeClass('frm-error');
						$newAddrBox.show();
					}
				},'jsonp');
				return false;
			});
			
			//确认受理
			$('.jsQrslFrm').on('submit',function(){
				var $this=$(this),
					provTxt=$province.find('option:selected').text(),
					cityTxt=$city.find('option:selected').text(),
					districtTxt=$district.is(':visible')?$district.find('option:selected').text():'';
					$tkMoney=$('#tkMoney'),//退款金额
					qrslArry=[],
					html='<p class="fxthh-pop-tip1">受理后将通知买家将问题商品发回，您需<br/>要按服务单约定处理，确定提交吗？</p>';
				
				//退款金额验证
				if($tkMoney[0]){
					qrslArry.push(validDtlFrm($tkMoney));
				}	
				  
				//只有当编辑或使用新地址时才对地址相关表单做验证
				if($newAddrBox.is(':visible')){
					qrslArry.push(validDtlFrm($tel));
					qrslArry.push(validDtlFrm($phone));
					qrslArry.push(validDtlFrm($consignee));
					qrslArry.push(validDtlFrm($address));
					qrslArry.push(validDtlFrm($province));
					qrslArry.push(validDtlFrm($city));
					if($district.is(':visible')){
						qrslArry.push(validDtlFrm($district));
					}
				}
				
				//当qrslArry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
				if ($.inArray(false, qrslArry) >= 0) {
					return false;
				}
				
				$addressName.val(provTxt+cityTxt+districtTxt);

				$.cscConfirm({
					content: html,
					title: '确认受理',
					callback: function() {
						$(this.DOM.buttons).css({
							'padding': '8px 15px',
							'background':'#ebebeb',
							'text-align':'right'
						});
						$(this.DOM.title[0]).css('min-width', '380px');
					},
					okFun: function() {
						//阻止表单重复提交
						if (isSubmit === true) {
							return false;
						} 
						isSubmit = true;
						
						//提交表单
						$.post('//'+ location.host +'/return/accept',$this.serializeArray(),function(data){
							if(data.status===1){
								window.location.href="//"+ location.host +"/return/success?orderId="+data.data;
							}else{
								$.tip({
									content:data.msg?data.msg:'操作失败！',
									closeTime: 2
								});
							}
							isSubmit=false;
						},'json');
					},
					cancelFun: true
				});	
				return false;
			});
			
			//拒绝受理
			$('.jsRfsBtn').on('click',function(){
				var html='<p class="fxthh-pop-tip1">拒绝受理后将结束此服务单，请您按约定为<br/>卖家处理售后问题，确定提交吗？</p>';
				$.cscConfirm({
					content: html,
					title: '拒绝受理',
					callback: function() {
						$(this.DOM.buttons).css({
							'padding': '8px 15px',
							'background':'#ebebeb',
							'text-align':'right'
						});
						$(this.DOM.title[0]).css('min-width', '380px');
					},
					okFun: function() {
						//阻止表单重复提交
						if (isSubmit === true) {
							return false;
						} 
						isSubmit = true;
						
						//提交表单
						$.post('//i.csc86.com/return/refuse',{orderId:orderId},function(data){
							if(data.status===1){
								window.location.href="//i.csc86.com/return/list";
							}else{
								$.tip({
									content:data.msg?data.msg:'操作失败！',
									closeTime: 2
								});
							}
							isSubmit=false;
						},'json');
					},
					cancelFun: true
				});		
			});
			
			/*处理状态为买家已发货时相关js*/
			$('.jsStrtClFrm').on('submit',function(){
				var $this=$(this),
				    html='<p class="fxthh-pop-tip1" style="padding-top:60px;padding-bottom:60px;">请确认收到买家返回的问题商品后再操作！</p>';
				$.cscConfirm({
					content: html,
					title: '确认收货并处理',
					callback: function() {
						$(this.DOM.buttons).css({
							'padding': '8px 15px',
							'background':'#ebebeb',
							'text-align':'right'
						});
						$(this.DOM.title[0]).css('min-width', '380px');
					},
					okFun: function() {
						//阻止表单重复提交
						if (isSubmit === true) {
							return false;
						} 
						isSubmit = true;
						
						//提交表单
						$.post('//i.csc86.com/return/pass',{orderId:orderId},function(data){
							if(data.status===1){
								window.location.href="//i.csc86.com/return/list";
							}else{
								$.tip({
									content:data.msg?data.msg:'操作失败！',
									closeTime: 2
								});
							}
							isSubmit=false;
						},'json');
					},
					cancelFun: true
				});	
				return false;
			});
			
			/*处理状态为处理中时相关js*/
			$('.jsclzFrm').on('submit',function(){
				
				var $this=$(this),
					$tkjylsNum=$this.find('#tkjylsNum'),//退款交易流水号文本框
					$shipment=$this.find('#shipment'),//运费文本框
					$service=$this.find('#service'),//维修费文本框
					url='',
					clzArry=[];
					
				//表单验证
				if($service[0]){
					clzArry.push(validDtlFrm($service));
				}
				if($shipment[0]){
					clzArry.push(validDtlFrm($shipment));
				}
				if($tkjylsNum[0]){
					clzArry.push(validDtlFrm($tkjylsNum));
				}
				
				//当qrslArry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
				if ($.inArray(false, clzArry) >= 0) {
					return false;
				}
				
				//根据有无退款交易流水号来判断提交url
				if($tkjylsNum[0]){
					url='//i.csc86.com/return/cancel';
				}else{
					url='//i.csc86.com/return/returnRepair';
				}
				
				//阻止表单重复提交
				if (isSubmit === true) {
					return false;
				}
				isSubmit = true;
				
				//提交表单
				$.post(url,$this.serializeArray(),function(data){
					if(data.status===1){
						$.tip({
							content:data.msg?data.msg:'操作成功！',
							closeTime: 2,
							closeCallback:function(){
								window.location.href="//i.csc86.com/return/list";
							}
						});
					}else{
						$.tip({
							content:data.msg?data.msg:'操作失败！',
							closeTime: 2
						});
					}
					isSubmit=false;
				},'json');	
				return false;
			});
		}
	};
	module.exports=fxthh;
});