define(function(require, exports, module) {
	require('c/member/common/js/alertDialog');//弹窗
	var addrCascade=require('l/addrselect/js/addrselect');//省市区级联
	var valid=require('l/valid/js/valid.js');//表单验证插件
	var isSubmit=false;
	
	var fh={
		/*
		*发货管理列表页
		*/
		mng:function(){
			
			//订单号/商品名称 ie处模拟html5中表单placeholder属性
			require.async('m/sea-modules/placeholder.js', function(m) {
				m.placeholder('#orderNum');
			});
			
			//下单时间
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
			
			//取消订单和确认已发货弹窗中的表单验证
			var validFrm=function(obj,isSmtValid){
				var isMust=true,
					nullTip='',
					objId=obj.attr('id');
				switch(objId){
					case 'cnclRsn':
					nullTip='请输入取消原因';
					break;
					case 'ydNum':
					nullTip='请输入运单号/合同号';
					break;
				}
				return valid.init({
					isMust:isMust,
					obj:obj,
					errorClass:'frm-error',
					nullTip:nullTip,
					isSmtValid:isSmtValid
				});
			};
			
			//发货记录页面取消发货单
			$('.jsCancelFh').on('click',function(){
				var $this=$(this);
				var $tr=$this.parents('tr:first');
				var html='<form class="jsQrQxFrm">'+
							 '<input type="hidden" name="orderId" value="'+$tr.data('orderid')+'"/>'+
							 '<table class="g-pr uc-lrtbl cnclrsn-tbl">'+
								'<colgroup>'+
									'<col />'+
									'<col width="350" />'+
								'</colgroup>'+
								'<tbody>'+
									'<tr>'+
										'<th>取消原因：</th>'+
										'<td><textarea id="cnclRsn" class="txt-area" name="reson" cols="" rows=""></textarea></td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+
						  '</form>';
				$.cscConfirm({
					content: html,
					title: '取消发货单',
					callback: function() {
						//弹窗样式重置
						$(this.DOM.buttons).css({
							'padding': '8px 15px',
							'background':'#ebebeb',
							'text-align':'right'
						});
						$(this.DOM.title[0]).css('min-width', '380px');
						
						//选择器
						var $cnclRsn=$('#cnclRsn');
						
						//取消原因失去焦点验证
						$cnclRsn.on('blur',function(){
							validFrm($(this),0);
						});
						
						//取消原因超过150字符不让输入
						$cnclRsn.on('keyup blur',function(){
							valid.subStrVal($(this),150);
						});
					},
					okFun: function() {//点击确定
						var arry=[];
						arry.push(validFrm($('#cnclRsn'),1));
						
						//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
						if ($.inArray(false, arry) >= 0) {
							return false;
						}
						
						//阻止表单重复请求
						if(isSubmit===true){return false;}
						isSubmit=true;
						
						//ajax提交
						$.post('//i.csc86.com/send/removeOrder',$('.jsQrQxFrm').serializeArray(),function(data){
							if(data.status===1){
								$.tip({
									content:data.msg?data.msg:'取消发货成功！',
									closeTime: 3,
									closeCallback:function(){
										window.location.href=location.href;
									}
								});
							}else{
								$.tip({
									content:data.msg?data.msg:'取消发货失败！',
									closeTime: 3
								});
							}
							//请求完成后恢复isSubmit为false，让点击提交时请求可再次请求
							isSubmit=false;
						},'json');
						return false;
					},
					cancelFun:true
				});	
				return false;
			});
			
			//发货记录页面中确认已发货
			$('.jsQryFh').on('click',function(){
				var $this=$(this);
				var $tr=$this.parents('tr:first');
				var html='<form class="jsQryFh">'+
							 '<input type="hidden" name="orderId" value="'+$tr.data('orderid')+'"/>'+
							 '<table class="g-pr uc-lrtbl qryfh-tbl">'+
								'<colgroup>'+
									'<col width="152" />'+
									'<col width="320" />'+
								'</colgroup>'+
								'<caption>请确认货物已交付承运方再操作！</caption>'+
								'<tbody>'+
									'<tr>'+
										'<th class="g-fwb">运单号/合同号：</th>'+
										'<td><input class="ipt-txt" id="ydNum" name="logisticsNO" value=""/></td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+
						  '</form>';
				$.cscConfirm({
					content: html,
					title: '已发货确认',
					callback: function() {
						//弹窗样式重置
						$(this.DOM.buttons).css({
							'padding': '8px 15px',
							'background':'#ebebeb',
							'text-align':'right'
						});
						$(this.DOM.title[0]).css('min-width', '380px');
						
						//取消原因失去焦点验证
						$('#ydNum').on('blur',function(){
							validFrm($(this),0);
						});
					},
					okFun: function() {//点击确定
						var arry=[];
						arry.push(validFrm($('#ydNum'),1));
						
						//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
						if ($.inArray(false, arry) >= 0) {
							return false;
						}
						
						//阻止表单重复请求
						if(isSubmit===true){return false;}
						isSubmit=true;

						//ajax提交
						$.post('//i.csc86.com/send/xConfirmSend',$('.jsQryFh').serializeArray(),function(data){
							if(data.status===1){
								$.tip({
									content:data.msg?data.msg:'操作成功！',
									closeTime: 3,
									closeCallback:function(){
										window.location.href=location.href;
									}
								});
							}else{
								$.tip({
									content:data.msg?data.msg:'操作失败！',
									closeTime: 3
								});
							}
							
							//请求完成后恢复isSubmit为false，让点击提交时请求可再次请求
							isSubmit=false;
						},'json');
						return false;
					},
					cancelFun:true
				});	
				return false;
			});
			
			//分页
			require.async('c/member/common/js/page.js');	
		},
		/*
		*线上和线下发货页面
		*/
		gofh:function(){
			//表单form选择器
			var $jsFhInfFrm=$('.jsFhInfFrm');
			
			//在线发货选择器
			var	orderNum=$('input[name=orderNum][type=hidden]').val(),//采购数量隐藏域
				$fhType=$('input[name=fhType]'),//发货方式隐藏域
				$fhOnline=$('.fh-online'),//在线发货tab内容容器
				$proWght=$('#proWght'),//每单位商品重量
				$proTWght=$('#proTWght'),//订单商品总重量
				$proVlm=$('#proVlm'),//每单位商品体积
				$proTVlm=$('#proTVlm'),//单商品总体积
				$yythTime=$('#yythTime');//预约提货时间
			
			//线下发货选择器	
			var	$fhOffline=$('.fh-offline'),//线下发货tab内容容器
				$psTypeSlt=$('#psTypeSlt'),//配送方式下拉列表
				$qrshTbl=$('.qrsh-tbl'),//线下配送表格
				$psPhone=$('#psPhone'),//配送电话文本框
				$psPhoneTr=$psPhone.parent().parent(),//配送电话直接父tr
				$psPhoneTh=$psPhoneTr.find('th'),//配送电话那行中的th
				ydNmbrTr='<tr><th><em class="g-cred">* </em>运单号：</th><td><input id="ydNmbr" class="ipt-txt" type="text" name="logisticsNO" value=""/></td></tr>',//运单号文本框
				psTypeOption='';//配送方式下拉列表选项
			
			//华南城网物流服务条款复选框选择器	
			var	$cscWlTk=$('#cscWlTk'),
				$cscWltkTd=$cscWlTk.parent();
				
				
			//刷新页面先重置表单
			$jsFhInfFrm[0].reset();
			
			
			//收货地址相关js
			var $jsAddrLst=$('.jsAddrLst'),//收货地址列表
				$newAddrBox=$('.newAddr-box'),//新地址容器
				$province=$('#province'),//省份下拉列表
				$city=$('#city'),//市下拉列表
				$district=$('#district');//区下拉列表
				$address=$('#address'),//详细地址
				$consignee=$('#consignee'),//收货人姓名
				$phone=$('#phone'),//手机号码
				$tel=$('#tel');//电话号码
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
			
			
			//发货信息tab切换(只有当线上发货和线下发货都存在是才执行)
			if($('.jsUcTab li').length>1){
				$('.jsUcTab').on('click','li',function(){
					var $this=$(this),
						$fhinfBd=$('.fhinf-bd'),
						$zxfhTip=$('.zxfh-tip');
						index=$(this).index();
					index===0?$zxfhTip.show():$zxfhTip.hide();
					$this.addClass('cur').siblings().removeClass('cur');
					$fhinfBd.eq(index).removeClass('g-dn').siblings('.fhinf-bd').addClass('g-dn');
					index===0?$fhType.val(1):$fhType.val(0);
				});
			}
			
			
			//表单验证
			var validFrm=function(obj,isSmtValid,val){
				//var zlTjRegx=/^([1]{1}[0-9]*(\.[0-9]{1,2})?|[0]{1}\.[0-9]{1,2})$/;
				var zlTjRegx=/^(?!0+(?:\.0+)?$)\d+(?:\.\d{1,2})?$/;
				var isMust=true,
					nullTip='',
					errorTip='',
					regx=null,
					objId=obj.attr('id'),
					tipObj=obj.parent();
				val=val?val:'';
				switch(objId){
					case 'province':
					nullTip='请选择发货地址';
					break;
					case 'city':
					nullTip='请选择发货地址';
					break;
					case 'district':
					nullTip='请选择发货地址';
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
					errorTip='请输入正确格式的电话号码';
					regx=/^([0-9]{3,4}(\-)?)?([0-9]{7,8})+((\-)?[0-9]{1,5})?$/;
					break;
					case 'proWght':
					nullTip='请输入每单位商品重量或订单商品总重量';
					errorTip='每单位商品重量需填写大于0的数字，最多2位小数';
					regx=zlTjRegx;
					tipObj=obj.parents('tr:first').next('.prosize-tr:first').find('td');
					break;
					case 'proTWght':
					nullTip='请输入每单位商品重量或订单商品总重量';
					errorTip='订单商品总重量需填写大于0的数字，最多2位小数';
					regx=zlTjRegx;
					tipObj=obj.parents('tr:first').next('.prosize-tr:first').find('td');
					break;
					case 'proVlm':
					nullTip='请输入每单位商品体积或订单商品总体积';
					errorTip='每单位商品体积需填写大于0的数字，最多2位小数';
					regx=zlTjRegx;
					tipObj=obj.parents('tr:first').next('.prosize-tr:first').find('td');
					break;
					case 'proTVlm':
					nullTip='请输入每单位商品体积或订单商品总体积';
					errorTip='订单商品总体积需填写大于0的数字，最多2位小数';
					regx=zlTjRegx;
					tipObj=obj.parents('tr:first').next('.prosize-tr:first').find('td');
					break;
					case 'yythTime':
					nullTip='请选择预约提货时间';
					break;
					case 'psTypeSlt':
					nullTip='请选择配送方式';
					break;
					case 'psfSlt':
					nullTip='请选择配送方式';
					break;
					case 'othrPs':
					nullTip='请输入物流公司名称';
					errorTip='物流公司名称最多输入15个字符';
					regx=/^[\w\W]{1,15}$/;
					break;
					case 'ydNmbr':
					nullTip='请输入运单号';
					errorTip='运单号只能填字母和数字，20个字符以内';
					regx=/^[A-Za-z0-9]{1,20}$/;
					break;
					case 'psPhone':
					if(val!='3'&&val!='4'){
						isMust=false;
					}
					
					nullTip='请输入电话号码';
					errorTip='请输入正确格式的电话号码';
					regx=/^([0-9]{3,4}(\-)?)?([0-9]{7,8})+((\-)?[0-9]{1,5})?$/;
					break;
				}
				return valid.init({
					isMust:isMust,
					obj:obj,
					tipObj:tipObj,
					errorClass:'frm-error',
					nullTip:nullTip,
					errorTip:errorTip,
					regx:regx,
					isSmtValid:isSmtValid
				});
			};
			
			
			/*在线发货相关js*/
			
			//问题商品返回地址失去焦点验证
			$province.on('blur',function(){
				validFrm($province,0);
				validFrm($city,0);
				if($district.is(':visible')){
					validFrm($district,0);
				}
			});
			$city.on('blur',function(){
				validFrm($province,0);
				validFrm($city,0);
				if($district.is(':visible')){
					validFrm($district,0);
				}
			});
			$district.on('blur',function(){
				validFrm($province,0);
				validFrm($city,0);
				if($district.is(':visible')){
					validFrm($district,0);
				}
			});
			
			//详细地址失去焦点验证
			$address.on('blur',function(){
				validFrm($(this),0);
			});
			
			//收货人姓名失去焦点验证
			$consignee.on('blur',function(){
				validFrm($(this),0);
			});
			
			//手机号码失去焦点验证
			$phone.on('blur',function(){
				validFrm($(this),0);
			});
			
			//电话号码失去焦点验证
			$tel.on('blur',function(){
				validFrm($(this),0);
			});
			
			//重量和提交计算公用函数
			var vlmWght={
				dToT:function(d,t){//由单算总
					var $this=d;
					var validPass=validFrm($this,0);
					var defaultVal=$this.attr('data-default');
					if(validPass){//验证通过后计算
						var val=$this.val();
						if(defaultVal!=val){
							var tVal=Math.round(val*orderNum*100)/100;
							t.val(tVal);
							t.attr('data-default',tVal);
						}
					}
				},
				tToD:function(t,d){//由总算单
					var $this=t;
					var validPass=validFrm($this,0);
					var defaultVal=$this.attr('data-default');
					if(validPass){//验证通过后计算
						var val=$this.val();
						if(defaultVal!=val){
							var dVal=Math.round(val*100/orderNum)/100;
							d.val(dVal);
							d.attr('data-default',dVal);
						}
					}
				}
			};
			
			//每单位商品重量失去焦点验证及计算总重量
			$proWght.on('blur',function(){
				vlmWght.dToT($(this),$proTWght);
			});
			
			//订单商品总重量失去焦点验证及计算单重量
			$proTWght.on('blur',function(){
				vlmWght.tToD($(this),$proWght);
			});
			
			//每单位商品体积失去焦点验证及计算总体积
			$proVlm.on('blur',function(){
				vlmWght.dToT($(this),$proTVlm);
			});
			
			//订单商品总体积失去焦点验证及计算单体积
			$proTVlm.on('blur',function(){
				vlmWght.tToD($(this),$proVlm);
			});
			
			//预约提货时间失去焦点验证
			$yythTime.on('blur',function(){
				validFrm($(this),0);
			});
			
			
			/*线下发货相关js*/
			
			//初始加载出配送方式
			$.get('//i.csc86.com/logistic/getDeliveryWays?level=1',function(data){
				$.each(data,function(i,n){
					psTypeOption+='<option value="'+i+'">'+n+'</option>';
				});
				$psTypeSlt.append(psTypeOption);
			},'json');
			
			//选择配送方式显示配送方
			$psTypeSlt.on('change',function(){
				var $psfSlt=$('#psfSlt'),//配送方下拉列表
					$othrPs=$('#othrPs'),//其他配送方文本框
					$othrPsTr=$othrPs.parents('.othr-tr'),
					$ydNmbr=$('#ydNmbr'),//运单号文本框
					val=$(this).val(),
					psfOption='';
					
					
				//当配送方式不是送货上门时显示配送方下拉列表
				if(val==='3'){
					$psfSlt.remove();//移除配送方下拉列表
					$othrPsTr.remove();//移除其他配送方文本框
					$ydNmbr.parent().parent().remove();//移除运单号那一行
					
					$psPhoneTh.text("配送电话：");
					//给配送电话添加必填星号标志
					if(!$psPhoneTh.find('.g-cred')[0]){
						$psPhoneTh.prepend('<em class="g-cred">* </em>');
					}
				}
				if(val==='4'){
					$psfSlt.remove();//移除配送方下拉列表
					$othrPsTr.remove();//移除其他配送方文本框
					$ydNmbr.parent().parent().remove();//移除运单号那一行
					
					$psPhoneTh.text("联系电话：");
					//给配送电话添加必填星号标志
					if(!$psPhoneTh.find('.g-cred')[0]){
						$psPhoneTh.prepend('<em class="g-cred">* </em>');
					}
				}else if(val!='3'&&val!='4'){
					//移除配送电话添加必填星号标志
					$psPhoneTh.find('.g-cred').remove();
					
					$othrPsTr.remove();//移除其他配送方文本框
					
					if(val!=''){
						//获取配送方
						$.get('//i.csc86.com/logistic/getDeliveryWays?level=2',function(secObj){
							$.each(secObj[val],function(i,n){
								psfOption+='<option value="'+i+'">'+n+'</option>';
							});
							if($psfSlt[0]){
								$psfSlt.find('option:gt(0)').remove();
								$psfSlt.append(psfOption);
							}else{
								$psTypeSlt.after('<select id="psfSlt" name="logisticsCompany" class="g-ml5 frm-slt"><option value="">请选择配送方</option>'+psfOption+'</select>');
							}
						},'json');	
					}else{
						$psfSlt.remove();//移除配送方下拉列表
						$othrPsTr.remove();//移除其他配送方文本框
					}
					
					//添加运单号那一行
					if(!$ydNmbr[0]){
						$psPhoneTr.before(ydNmbrTr);
					}
				}	
				
				//当配送方下拉列表值不为other时移除其他配送方文本框
				if($psfSlt.val()!='other'){
					$othrPsTr.remove();
				}
			});
			
			//显示其他配送方文本框
			$qrshTbl.on('change','#psfSlt',function(){
				var $this=$(this),
					$tr=$this.parent().parent(),
					$othrPs=$('#othrPs');
					val=$(this).val(),
					otherHtml='<tr class="othr-tr"><th>&nbsp;</th><td><input id="othrPs" class="ipt-txt" type="text" name="other" value=""/></td></tr>';
				if(val==='other'){
					if(!$othrPs[0]){
						$tr.after(otherHtml);
					}
				}else{
					$othrPs.parents('.othr-tr').remove();
				}
			});
			
			//配送方式失去焦点验证
			$psTypeSlt.on('blur',function(){
				validFrm($(this),0);
				validFrm($('#psfSlt'),0);
			});
			
			//配送方失去焦点验证
			$fhOffline.on('blur','#psfSlt',function(){
				validFrm($psTypeSlt,0);
				validFrm($(this),0);
			});
			
			//其他配送方失去焦点验证
			$fhOffline.on('blur','#othrPs',function(){
				validFrm($(this),0);
			});
			
			//运单号失去焦点验证
			$fhOffline.on('blur','#ydNmbr',function(){
				validFrm($(this),0);
			});
			
			//配送电话失去焦点验证
			$fhOffline.on('blur','#psPhone',function(){
				validFrm($(this),0);
			});
			
			
			/*华南城网物流服务条款复选框实时验证*/
			$cscWlTk.on('click',function(){
				if(!$(this).is(':checked')){
					valid.errorTip($cscWltkTd,'请先阅读并同意《华南城网物流服务条款》');
				}else{
					$cscWltkTd.find('.valid-error').remove();
				}
			});
			
			
			//点击提交发货信息
			$('.jsFhInfFrm').on('submit',function(){
				var $this=$(this),
					arry=[],
					url='//'+ location.host +'/send/sumbit',//在线发货提交地址
					fhTypeVal=$fhType.val();//发货类型，1为在线发货 0为线下发货
				
				//线下发货提交地址
				if(fhTypeVal==='0'){
					url='//'+ location.host +'/send/sumbitInfo';	
				}
				
				//华南城网在线交易服务协议复选验证
				if($cscWlTk[0]){
					if(!$cscWlTk.is(':checked')){
						valid.errorTip($cscWltkTd,'请先阅读并同意《华南城网物流服务条款》');
						arry.push(false);
						$cscWlTk.focus();
					}else{
						$cscWltkTd.find('.valid-error').remove();
					}
				}
				
				//在线发货表单验证
				if($fhOnline.is(':visible')){
					arry.push(validFrm($yythTime,1));//预约时间验证
					arry.push(validFrm($proTVlm,1))//订单商品总体积验证
					arry.push(validFrm($proVlm,1))//每单位商品体积验证
					arry.push(validFrm($proTWght,1))//订单商品总重量验证
					arry.push(validFrm($proWght,1))//每单位商品重量验证
				
					//只有当编辑或使用新地址时才对地址相关表单做验证
					if($newAddrBox.is(':visible')){
						arry.push(validFrm($tel),1);
						arry.push(validFrm($phone),1);
						arry.push(validFrm($consignee),1);
						arry.push(validFrm($address),1);
						arry.push(validFrm($province),1);
						arry.push(validFrm($city),1);
						if($district.is(':visible')){
							arry.push(validFrm($district),1);
						}
					}
				}
				
				//线下发货表单验证
				if($fhOffline.is(':visible')){
					var $psfSlt=$('#psfSlt'),//配送方下拉列表
						$othrPs=$('#othrPs'),//其他配送方文本框
						$ydNmbr=$('#ydNmbr'),//运单号文本框
						$psPhone=$('#psPhone'),//配送电话文本框
						psTypeVal=$psTypeSlt.val();//配送方式下拉列表值
						
					//验证配送电话文本框
					arry.push(validFrm($psPhone,1,psTypeVal));
					
					//验证运单号文本框	
					if($ydNmbr[0]){
						arry.push(validFrm($ydNmbr,1));	
					}
					
					//验证其他配送方文本框
					if($othrPs[0]){
						arry.push(validFrm($othrPs,1));
					}
					
					//验证配送方式下拉列表
					arry.push(validFrm($psTypeSlt,1));
					
					//验证配送方下拉列表	
					if($psfSlt[0]){
						arry.push(validFrm($psfSlt,1));
					}
					
				}

				//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
				if ($.inArray(false, arry) >= 0) {
					return false;
				}
				
				//获取选中的发货地址
				if($fhOnline.is(':visible')&&$newAddrBox.is(':visible')){
					var addrText1=$province.find('option:checked').text(),
						addrText2=$city.find('option:checked').text(),
						addrText3=$district.is(':visible')?$district.find('option:checked').text():'';
					$('#addressName').val(addrText1+addrText2+addrText3);
				}
				
				//阻止表单重复请求
				if(isSubmit===true){return false;}
				isSubmit=true;
				
				//ajax提交
				$.post(url,$this.serializeArray(),function(data){
					if(data.status===1){
						$.tip({
							content:data.msg?data.msg:'发货信息提交成功！',
							closeTime: 3,
							closeCallback:function(){
								window.location.href="//"+ location.host +"/send/waitList";
							}
						});
					}else{
						$.tip({
							content:data.msg?data.msg:'发货信息提交失败！',
							closeTime: 3
						});
					}
					
					//请求完成后恢复isSubmit为false，让点击提交时请求可再次请求
					isSubmit=false;
					
				},'json');
				
				return false;
			});
		}
	};
	module.exports=fh;
});