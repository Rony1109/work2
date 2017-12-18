define(function(require, exports, module) {
	require('c/member/common/js/alertDialog');
	var addrCascade=require('l/addrselect/js/addrselect');//省市区级联
	var valid=require('l/valid/js/valid.js');//表单验证插件
	var isSubmit=false;
	
	var fxthh={
		/*维修退换货管理列表页*/
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
		/*申请 - 返修退换货详情*/
		applyDtl:function(){
			var $jsApplyFrm=$('.jsApplyFrm'),//表单
			    $personInftbl=$('.person-inftbl'),//选择退货时显示的容器
				$spfhType=$('.spfh-type'),//选择换货货维修时显示的容器
				$jsNumOpts=$('.jsNumOpts'),//提交数量中加减容器
				jsBNum=Number($('.jsBNum').html()),//最大可提交数量
				$sertype=$('input[name=sertype]'),//服务类型单选框
				$prbDscr=$('#prbDscr'),//问题描述文本域
				$phone2=$('#phone2'),//选择退货时的手机号码
				$consignee2=$('#consignee2'),//选择退货时的联系电话
				$jsAddrLst=$('.jsAddrLst'),//已有地址列表容器
				$newAddrBox=$('.newAddr-box'),//新地址或者编辑地址列表容器
				$province=$('#province'),//省份下拉列表
				$city=$('#city'),//市下拉列表
				$district=$('#district');//区下拉列表
				$address=$('#address'),//详细地址
				$consignee=$('#consignee'),//收货人
				$phone=$('#phone'),//手机号码
				$addressName=$('input[name=addressName]');
				
			//一进入页面需首先判断最大提交数量，如果最大提交数量为0，则提示并强制返回申请返修退换货列表
			if(jsBNum===0){
				$.tip({
					content:'<p class="g-fs14">该订单已无商品可申请返修退换货，请到其他订单操作！</p>',
					closeTime: 2,
					closeCallback:function(){
						window.location.href='//'+ location.host +'/returnRepairService/getList';
					}
				});
				return false;
			}
				
			//表单验证
			var validDtlFrm=function(obj){
				var isMust=true,
					nullTip='',
					errorTip='',
					type=0,
					regx=null,
					objId=obj.attr('id');
				switch(objId){
					case 'sertype':
					nullTip='请选择服务类型';
					break;
					case 'prbDscr':
					nullTip='请输入问题描述';
					break;
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
					case 'consignee2':
					nullTip='请输入收货人姓名';
					break;
					case 'phone2':
					nullTip='请输入手机号码';
					errorTip='请输入正确格式的手机号码';
					regx=/^1\d{10}$/;
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
			
			$jsApplyFrm[0].reset();//刷新页面先重置表单
				
			//选择服务类型
			$('input[name=sertype]').on('change',function(){
				var $this=$(this),
					id=$this.attr('id');
				if(id==='backRdo'){
					$personInftbl.show();
					$spfhType.hide();
				}else{
					$personInftbl.hide();
					$spfhType.show();
				}
			});
			
			//问题描述字数限制在100字以内
			$prbDscr.on('keyup blur',function(){
				valid.subStrVal($(this),100);
			});
			
			//防止点击时选中文本（主要是为了兼容ie，其他浏览器在样式里面设置了
			$jsNumOpts.find('i').each(function(){
				$(this)[0].onselectstart=function(){return false;}
			});
			
			//加减相关js
			$jsNumOpts.on('click','.plut-opt',function(){//减法
				var $this=$(this);
					$numipt = $this.next('.ipt-txt'),
					num = $numipt.val() * 1 - 1;
				num = num <= 1 ? 1 : num;
				if(num<2){
					$this.removeClass().addClass('no-plut-opt');
				}
				if(num<jsBNum){
					$this.siblings('.no-add-opt').removeClass().addClass('add-opt');
				}
				$numipt.val(num);
				return false;
			});
			$jsNumOpts.on('click','.add-opt',function(){//加法
				var $this=$(this);
					$numipt = $this.prev('.ipt-txt'),
					num = $numipt.val() * 1 + 1;
				if(num>1){
					$this.siblings('.no-plut-opt').removeClass().addClass('plut-opt');	
				}
				if(num>=jsBNum){
					num=jsBNum;
					$this.removeClass().addClass('no-add-opt');
				}
				$numipt.val(num);
				return false;
			});
			$jsNumOpts.on('keyup','.ipt-txt',function(){//加减法中的文本框按下键盘时
				var $this=$(this),
					$plutOpt=$this.prev(),
					$addOpt=$this.next();
				//this.value=this.value.replace(/\D/g,'');
				this.value=this.value.replace(/[^0-9\.]+/g,'');
				this.value=this.value.replace(/[.]+/g,'.');
				this.value=this.value.replace(/(^[1-9]{1,6}\.[0-9]{2})(.*)/g,"$1");				
				var num=this.value;
				if(parseInt(num)===0){
					this.value=1;
				}
				if(this.value>=jsBNum){
					this.value=jsBNum;
					$addOpt.removeClass().addClass('no-add-opt');
				}else{
					$addOpt.removeClass().addClass('add-opt');	
				}
				if(this.value>1){
					$plutOpt.removeClass().addClass('plut-opt');	
				}else{
					$plutOpt.removeClass().addClass('no-plut-opt');	
				}
			});
			$jsNumOpts.on('blur','.ipt-txt',function(){//加减法中的文本框失去焦点时
				var $this=$(this),
					$addOpt=$this.next(),
					defaultVal=$this.data('default');
				//this.value=this.value.replace(/\D/g,'');
				this.value=this.value.replace(/[^0-9\.]+/g,'');
				this.value=this.value.replace(/[.]+/g,'.');
				this.value=this.value.replace(/(^[1-9]{1,6}\.[0-9]{2})(.*)/g,"$1");				
				if(!this.value){
					this.value=defaultVal;
				}
				if(this.value>=jsBNum){
					this.value=jsBNum;
					$addOpt.removeClass().addClass('no-add-opt');
				}else{
					$addOpt.removeClass().addClass('add-opt');	
				}
			});

			//收货地址相关js(换货和维修时)
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
							phone=inf.mobile;
						$address.val(address);
						$consignee.val(consignee);
						$phone.val(phone);
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
			
			//提交表单
			$jsApplyFrm.on('submit',function(){
				var $this=$(this),
					applyArry=[];
				
				//当退货时验证对应联系人和手机
				if($personInftbl.is(':visible')){
					applyArry.push(validDtlFrm($phone2));
					applyArry.push(validDtlFrm($consignee2));	
				}
				
				//当地址栏显示时验证地址处相关表单
				if($spfhType.is(':visible')&&$newAddrBox.is(':visible')){
					applyArry.push(validDtlFrm($phone));
					applyArry.push(validDtlFrm($consignee));
					applyArry.push(validDtlFrm($address));
					applyArry.push(validDtlFrm($province));
					applyArry.push(validDtlFrm($city));
				}
				
				//验证问题描述
				applyArry.push(validDtlFrm($prbDscr));
				
				//验证服务类型单选框
				if(!$sertype.is(':checked')){
					valid.errorTip($sertype.parent().parent(),'请选择服务类型');
					$sertype.focus();
					applyArry.push(false);
				}
				
				//当qrslArry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
				if ($.inArray(false, applyArry) >= 0) {
					return false;
				}
				
				//阻止表单重复提交
				if (isSubmit === true) {
					return false;
				} 
				isSubmit = true;
				
				//ajax提交
				$.post($this.attr('action'),$this.serializeArray(),function(data){
					if(data.status===1){
						window.location.href=data.data.url;
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
		},
		/*已受理 - 返修退换货详情*/
		yslDtl:function(){
			//表单验证
			var validDtlFrm=function(obj){
				var isMust=true,
					nullTip='',
					errorTip='',
					regx=null,
					objId=obj.attr('id');
				switch(objId){
					case 'wlCmpny':
					nullTip='请输入物流公司';
					errorTip='请输入正确物流公司，15个字符以内';
					regx=/^[\w\W]{1,15}$/;
					break;
					case 'wlNum':
					nullTip='请输入物流单号';
					errorTip='请输入正确的物流单号';
					regx=/^[A-Za-z0-9]{1,20}$/;
					break;
					case 'skAccnt':
					nullTip='请输入收款账户';
					errorTip='请输入正确的收款账户';
					regx=/^\d{1,20}$/;
					break;
					case 'skPerson':
					nullTip='请输入收款人';
					errorTip='收款人只能输入中文和英文，10字符以内';
					regx=/^[\u4e00-\u9fa5a-zA-Z]{1,10}$/;
					break;
					case 'khBank':
					nullTip='请输入开户行';
					errorTip='请输入正确的开户行，20个字符以内';
					regx=/^[\w\W]{1,20}$/;
					break;
				}
				return valid.init({
					isMust:isMust,
					obj:obj,
					errorClass:'frm-error',
					nullTip:nullTip,
					errorTip:errorTip,
					regx:regx
				});
			}
			
			$('.jsYslFrm').on('submit',function(){
				var $this=$(this),
					$wlCmpny=$this.find('#wlCmpny'),
					$wlNum=$this.find('#wlNum'),
					$skAccnt=$this.find('#skAccnt'),
					$skPerson=$this.find('#skPerson'),
					$khBank=$this.find('#khBank'),
					yslArry=[];
				if($skAccnt[0]){
					yslArry.push(validDtlFrm($khBank));
					yslArry.push(validDtlFrm($skPerson));	
					yslArry.push(validDtlFrm($skAccnt));	
				}
				yslArry.push(validDtlFrm($wlNum));	
				yslArry.push(validDtlFrm($wlCmpny));	
				
				//当qrslArry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
				if ($.inArray(false, yslArry) >= 0) {
					return false;
				}
				
				//阻止表单重复提交
				if (isSubmit === true) {
					return false;
				} 
				isSubmit = true;
				
				//ajax提交
				$.post($this.attr('action'),$this.serializeArray(),function(data){
					if(data.status===1){
						$.tip({
							content:data.msg?data.msg:'操作成功！',
							closeTime: 2,
							closeCallback:function(){
								window.location.href=data.data.url;
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