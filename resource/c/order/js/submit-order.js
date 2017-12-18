define(function(require, exports, module) {
	require('//res.csc86.com/js/m/config.js');
	var isSubmit=false;
    var dialog=require('dialog');
	var cmmn=require('./init.js');
	var plchldr=require('placeholder');



	/*正则表达式*/
	var nRegx=/^\d+$/;//数字
	var phoneRegx=/^1\d{10}$/;//手机号码
	var emailRegx=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//邮箱
	var telRegx=/^[0-9]\d{2,3}\-[0-9]\d{6,7}\-(\d{1,4})?$/;//区号+电话号码+分号
	var consigneeRegx=/^([A-Za-z]|[\u4E00-\u9FA5])+$/;//只能为汉字或拉丁字母
	
	/*收货地址*/
	var $jsAddrLst=$('.jsAddrLst');
	var $newAddrBox=$('.newAddr-box');
	var $jsNewAddrFrm=$('.jsNewAddrFrm');
	var $province=$('#smtOrderMain').find('.province');//省
	//var $province=$jsNewAddrFrm.find('.province');//省
	var $city=$('<select id="city" class="frm-slt city" name="cityId"><option value="">请选择</option></select>');
	var $district=$('<select id="district" class="frm-slt district" name="districtId"><option value="">请选择</option></select>');
	
	//$jsNewAddrFrm[0].reset();//刷新页面重置新增收货地址表单

	/*物流快递*/
$('.receiving_btn').on('click',function(){
	var $this =$(this);
	var $thisdata = $this.data("receiving");
	$('#receiving').val($thisdata);
	$this.addClass("active");
	$this.siblings('span').removeClass("active");
});
	
	//收货地址(省份,当已经查出来省份时就不在进行查询)
	function getProv(obj2){
		$.get('//i.csc86.com/getAllProvince',function(data){
			console.log(data);
			var result=data;
			var html='';
			if(result.status==="200"){

				var obj=result.data;
				var len=obj.length;
				for(var i=0;i<len;i++){
					html+='<option value="'+obj[i].id+'">'+obj[i].name+'</option>';
				}
				obj2.find('option:gt(0)').remove().end().append(html);
			}
		},'jsonp');
	}

	
	//新增收货地址(注意填写新增收货地址的前提是“使用新地址”选项被选中)
	//if($jsAddrLst.find('.new input[name=addrRadio]').is(':checked')){
	//	getProv($('.jsNewAddrFrm').find('.province'));
	//}else{
	//	$newAddrBox.hide();
	//}
	
	//选择收货人信息
	$jsAddrLst.on('change','input[name=addrRadio]',function(){
		var $this=$(this);
		var $parent=$this.parents('li');
		var _val=$this.val();
		$parent.addClass('cur').siblings('li').removeClass('cur');
		$('input[type=hidden][name=mem_address_id]').val(_val);
		if($parent.hasClass('new')){
			$newAddrBox.show();
			$('.jsNewAddrFrm').find('.province').siblings('.frm-slt').remove();
			$jsNewAddrFrm.find('.jsSsq').html('');
			$jsNewAddrFrm.find('.error').removeClass('error');
			$jsNewAddrFrm.find('.td-error').removeClass('td-error');
			$('.jsNewAddrFrm')[0].reset();
			plchldr.placeholder('#areaCode','#888');
			plchldr.placeholder('#tel','#888');
			plchldr.placeholder('#extnsn','#888');
			getProv($('.jsNewAddrFrm').find('.province'));
		}else{
			$newAddrBox.hide();
		}
	});

	//选择省份查找对应省份的市
	$('#smtOrderMain').on('change','.province',function(){
		var $this=$(this);
		var id=$this.val();
		var $thisparent=$this.parent();

		if(id){
			$.get('//i.csc86.com/getZoneByParentId?parentId='+id,function(data){
				var result=data;
				var html='';
				if(result.status==="200"){
					var obj=result.data;
					var len=obj.length;
					for(var i=0;i<len;i++){
						html+='<option value="'+obj[i].id+'">'+obj[i].name+'</option>';
					}
					if(!$thisparent.find('.city')[0]){
						$this.after('<select id="city" class="frm-slt city jsinp" name="cityId"><option value="">请选择</option></select>');
					}
					$thisparent.find('.city').find('option:gt(0)').remove().end().append(html);
				}else{
					$thisparent.find('.city').remove();
				}

			},'jsonp');
		}
	});



	//选择市查找对应市的区
	$('#smtOrderMain').on('change','.city',function(){
		var $this=$(this);
		var id=$this.val();
		var $thisparent=$this.parent();

		if(id){
			$.get('//i.csc86.com/getZoneByParentId?parentId='+id,function(data){
				var result=data;
				var html='';
				if(result.status==="200"){
					var obj=result.data;
					var len=obj.length;
					for(var i=0;i<len;i++){
						html+='<option value="'+obj[i].id+'">'+obj[i].name+'</option>';
					}
					if(!$thisparent.find('.district')[0]){
						$this.after('<select id="district" class="frm-slt district jsinp" name="districtId"><option value="">请选择</option></select>');
					}
					$thisparent.find('.district').find('option:gt(0)').remove().end().append(html);
				}else{
					$thisparent.find('.district').remove();
				}
			},'jsonp');
		}
	});


	$('.invoicetable').on('blur','input,select',function(){
			var $this=$(this);
			var $thisval=$(this).val();
		if($thisval){
			$this.removeClass('error')
		}else{
			$this.addClass('error');
		}
	});


$('.invoice').on('click','.tit2',function(){
	var $this=$(this);
	var $thisparent=$this.parents('.invoice');
	var $thisids=$this.data("ids");
	if($thisids){
		$.post('https://i.csc86.com/getAllProvince',function(data){
			var html="";
			if(data.status==="200") {
				$.each(data.data, function () {
					var me = this;
					var selected = "";
					if (me.id == $thisids.provinceId) {
						selected = 'selected="selected"';
					}
					html += '<option value="' + me.id + '" ' + selected + '>' + me.name + '</option>';
				});
				$thisparent.find('.province').append(html);
			}
		},'jsonp');

		$.post('//i.csc86.com/getZoneByParentId?parentId='+$thisids.provinceId,function(data){
			var html='<option value="">请选择</option>';
			if(data.status==="200") {
				$.each(data.data, function () {
					var me = this;
					var selected = "";
					if (me.id == $thisids.cityId) {
						selected = 'selected="selected"';
					}
					html += '<option value="' + me.id + '" ' + selected + '>' + me.name + '</option>';
				});
				if(!$thisparent.find('.city')[0]){
					$thisparent.find('.province').after('<select id="city" class="frm-slt city jsinp" name="cityId">'+html+'</select>');
				}
				$thisparent.find('.city').html(html);
			}
		},'jsonp');

		if($thisids.districtId){
			$.post('//i.csc86.com/getZoneByParentId?parentId='+$thisids.cityId,function(data){
				var html='<option value="">请选择</option>';
				if(data.status==="200") {
					$.each(data.data, function () {
						var me = this;
						var selected = "";
						if (me.id == $thisids.districtId) {
							selected = 'selected="selected"';
						}
						html += '<option value="' + me.id + '" ' + selected + '>' + me.name + '</option>';
					});
					if(!$thisparent.find('.district')[0]) {
						$thisparent.find('.province').parent().append('<select id="district" class="frm-slt district jsinp" name="districtId">' + html + '</select>');
					}
					$thisparent.find('.district').html(html);
				}
			},'jsonp');
		}


	}else{
		if($thisparent.find('.province').find('option').length==1){
			getProv($thisparent.find('.province'));
		}
	}

	$thisparent.find('input[name=tfl]').val('2');
	$('input[name="needInvoice"]').val("Y");
	$thisparent.find('.invoicetable').show();


});
	$('.invoice').on('click','.an2',function(){
		var $this=$(this);
		var $thisparent=$this.parents('.invoice');
		$thisparent.find('.invoicetable').hide();
		$thisparent.find('input[name=tfl]').val('0');
		$thisparent.find('.jsinp').removeClass('error');
		$('input[name="needInvoice"]').val('N');
		$('.fpno').removeClass('dis');
		$('.fpxx').addClass('dis');
		$thisparent.find('.tit2').data("ids","").removeAttr('data-ids');
	});

	//$('input[name="invoiceType"]').on('change',function(){
	//	var $this=$(this);
	//	if($this.attr("class")=="lab1"){
	//		$this.parents('.invoice').find('input[name="taxpayerId"],input[name="companyAddress"],input[name="identification_no"],input[name="company_address"],input[name="telephone"],input[name="deposit"],input[name="bankNo"]').parents('tr').removeClass('disnone').end().addClass('jsinp');
	//	}else{
	//		$this.parents('.invoice').find('input[name="taxpayerId"],input[name="companyAddress"],input[name="identification_no"],input[name="company_address"],input[name="telephone"],input[name="deposit"],input[name="bankNo"]').parents('tr').addClass('disnone').end().removeClass('jsinp');
	//	}
    //
	//});

	/*唐勇 strar*/
	$('.invtab1').on('click',function(){
		var $this=$(this);
		$('.invtab').removeClass('cur');
		$this.addClass('cur');
		$('#invoiceType').val(2);
		$this.parents('.invoice').find('input[name="taxpayerId"],input[name="companyAddress"],input[name="identification_no"],input[name="company_address"],input[name="telephone"],input[name="deposit"],input[name="bankNo"]').parents('tr').removeClass('disnone').end().addClass('jsinp');
	})

	$('.invtab').on('click',function(){
		var $this=$(this);
		$('.invtab1').removeClass('cur');
		$this.addClass('cur');
		$('#invoiceType').val(1);
		$this.parents('.invoice').find('input[name="taxpayerId"],input[name="companyAddress"],input[name="identification_no"],input[name="company_address"],input[name="telephone"],input[name="deposit"],input[name="bankNo"]').parents('tr').addClass('disnone').end().removeClass('jsinp');

	})
	/*唐勇 end*/

	$('.invoice').on('click','.an',function(){
		var $this=$(this);
		var $thisparent=$this.parents('.invoice');
		var inp=$thisparent.find('.jsinp');

		var	sjRegx=/^1\d{10}$/;//手机号码正则
		var telRegx=/^(0\d{2,3}(\-)?)?([1-9]\d{6,7})+(\-\d{1,4})?$/;//区号+电话号码+分号

		var invoiceType=$thisparent.find('.cur').html();
		if(invoiceType=="普通发票")
		{
			invoiceType=1
		}else{
			invoiceType=2
		}
		var companyName=$.trim($thisparent.find('input[name=companyName]').val());
		var taxpayerId=$.trim($thisparent.find('input[name=taxpayerId]').val());
		var companyAddress=$.trim($thisparent.find('input[name=companyAddress]').val());
		var telephone=$.trim($thisparent.find('input[name=telephone]').val());
		var deposit=$.trim($thisparent.find('input[name=deposit]').val());
		var bankNo=$.trim($thisparent.find('input[name=bankNo]').val());
		var receiver=$.trim($thisparent.find('input[name=receiver]').val());
		var provinceId=$thisparent.find('select[name="provinceId"]').val();
		var cityId=$thisparent.find('select[name=cityId]').val();
		var districtId=$thisparent.find('select[name=districtId]').val();
		var receiveAddress=$.trim($thisparent.find('input[name=receiveAddress]').val());
		var phone=$.trim($thisparent.find('input[name=phone]').val());
		var preReceiveAddress=$('input[name="preReceiveAddress"]').val();
		var needInvoice=$('input[name="needInvoice"]').val();

		if(!sjRegx.test(phone)){
			var phoneobj=$thisparent.find('input[name=phone]');
			phoneobj.val('');
			phoneobj.attr('placeholder','请输入11位手机号码');
		}


		if(!telRegx.test(telephone)){
			var telobj=$thisparent.find('input[name=telephone]');
			telobj.val('');
			telobj.attr('placeholder','请输入正确的电话号码');
		}

		var arr=[];
		$.each(inp,function(){
			var me=$(this);
			if(!me.val()){
				arr.push(false);
				me.addClass('error')
			}
		});

		if($.inArray(false,arr)>=0){
			return false;
		}

		var dataobj={invoiceType:invoiceType,companyName:companyName,taxpayerId:taxpayerId,companyAddress:companyAddress,telephone:telephone,deposit:deposit,bankNo:bankNo,receiver:receiver,provinceId:provinceId,cityId:cityId,districtId:districtId,receiveAddress:receiveAddress,phone:phone,preReceiveAddress:preReceiveAddress,needInvoice:needInvoice};

		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;

		$.post('//i.csc86.com/invoice/saveInvoice',dataobj,function(data){
			if(data.status==0){
				$thisparent.find('input[name=tfl]').val('1');
				$thisparent.find('.invoicetable').hide();

				$('.fpxxs1').text($thisparent.find('input[name="companyName"]').val());
				$('.fpxxs2').html($thisparent.find('input[name="receiver"]').val());
				$('.fpxxs3').html($thisparent.find('select[name="provinceId"] option:selected').text());
				$('.fpxxs4').html($thisparent.find('select[name="cityId"] option:selected').text());
				$('.fpxxs5').html($thisparent.find('select[name="districtId"] option:selected').text());
				$('.fpxxs6').html($thisparent.find('input[name="receiveAddress"]').val());
				$('.fpxxs7').html($thisparent.find('input[name="phone"]').val().replace(/(\d{3})\d{4}(\d{4})/g, "$1****$2"));
				$thisparent.find('.tit2').data("ids","").removeAttr('data-ids');
				$('.fpxx').removeClass('dis');
				$('.fpno').addClass('dis');
				dialog.tip(data.errorMsg?data.errorMsg:'保存发票成功！',2);
			}else{
				dialog.tip(data.data.errorMsg?data.data.errorMsg:'保存发票失败！',2);
			}
			isSubmit=false;
		},'jsonp');

	});
	//收货人失去焦点时
	$jsNewAddrFrm.on('blur','#consignee',function(){
		var $this=$(this);
		var _val=$.trim($this.val());
		if(_val&&consigneeRegx.test(_val)){
			$this.removeClass('error');
		}else{
			if(!$this.hasClass('error')){
				$this.addClass('error');
			}
		}
	});
	
	//所在地区验证
	$('#province').parents('td').on('focusout',function(){
		var $td=$(this);
		if(!$td.find('select:last').val()){
			$td.addClass('td-error');
		}else{
			$td.removeClass('td-error');
		}
	});
	$('.province').parents('td').on('change','select:last',function(){
		var $this=$(this);
		var $td=$this.parents('td');
		var $table=$this.parents('table');
		var _val=$this.val();
		var html='';
		if(_val){
			$td.find('select').each(function(){
				html+=$(this).find('option:checked').html();
			});
			$table.find('.jsSsq').html(html);
			$('input[name="preReceiveAddress"]').val(html);
		}
	});
	
	//详细地址失去焦点时
	$jsNewAddrFrm.on('blur','#address',function(){
		var $this=$(this);
		var _val=$.trim($this.val());
		if(_val){
			$this.removeClass('error');
		}else{
			if(!$this.hasClass('error')){
				$this.addClass('error');
			}
		}
	});
	
	plchldr.placeholder('#areaCode','#888');
	plchldr.placeholder('#tel','#888');
	plchldr.placeholder('#extnsn','#888');
	//电话号码验证
	$('#tel').parent().on('focusout',function(){
		var $td = $(this);
		var $areaCode=$('#areaCode');
		var $extnsn=$('#extnsn');
		var _areaCodeVal=$.trim($areaCode.val());
		var _extnsn=$.trim($extnsn.val());
		var $tel=$('#tel');
		var _val=$.trim($tel.val());
		if(_areaCodeVal=="区号"){
			_areaCodeVal="";
		}
		if(_val=="电话号码"){
			_val="";
		}
		if(_extnsn=="分机号"){
			_extnsn="";
		}
		
		var _telPhoneVal=_areaCodeVal+'-'+_val+'-'+_extnsn;//电话号码
		if(_telPhoneVal!= '--' && !telRegx.test(_telPhoneVal)){
			$td.addClass('td-error');
		}else{
			$td.removeClass('td-error');
		}

	});
	//手机号码验证
	$('#phone').on('blur',function(){
		var $this = $(this);
		var _phone=$.trim($this.val());
		if(!phoneRegx.test(_phone)){
			$this.addClass('error');
		}else{
			$this.removeClass('error');
		}
	});
	/*$('#phone').parent().on('focusout',function(){
		var $td = $(this);
		var _phone=$.trim($('#phone').val());
		if(_phone != '' && !phoneRegx.test(_phone)){
			$td.addClass('td-error');
		}else{
			$td.removeClass('td-error');
		}
	});*/
	
	//点击编辑收货人信息功能
	//$jsAddrLst.on('click','.jsEdit',function(){
	//	var $this=$(this);
	//	var $thisparent=$this.parents('.wrtaddr-bd');
	//	var addressId=$this.parent().find('input[name=addrRadio]').val();
	//	if(isSubmit===true){return false;}//阻止表单重复提交
	//	isSubmit=true;
	//	$.get('//i.csc86.com/memaddress/getAddtrssById?addressId='+addressId,function(data){
	//		if(data.status==="200"){
	//			var _inf=data.data;
	//			$newAddrBox.show();
	//			$jsNewAddrFrm.find('.error').removeClass('error');//初始先将错误信息删掉
	//			$jsNewAddrFrm.find('.td-error').removeClass('td-error');//初始先将错误信息删掉
	//			$jsNewAddrFrm.find('.province').siblings('.frm-slt').remove();//初始先将市区删掉
	//			$('input[type=hidden][name=mem_address_id]').val("");
	//			$('input[type=hidden][name=addressId]').val(addressId);
	//			$jsNewAddrFrm.find('#consignee').val(_inf.consignee);//收货人
    //
	//			//地区
	//			var provinceId=_inf.provinceId;
	//			var cityId=_inf.cityId;
	//			var districtId=_inf.districtId;
	//			var areaHtml="";
	//			if(_inf.districtName){
	//				areaHtml=_inf.provinceName+_inf.cityName+_inf.districtName;
	//			}else{
	//				areaHtml=_inf.provinceName+_inf.cityName;
	//			}
    //
	//			if(provinceId){
	//				$.get('//i.csc86.com/getAllProvince',function(data){
	//					var result=data;
	//					var html='';
	//					if(result.status==="200"){
	//						var obj=result.data;
	//						var len=obj.length;
	//						for(var i=0;i<len;i++){
	//							var selected="";
	//							if(obj[i].id==provinceId){
	//								selected='selected="selected"';
	//							}
	//							html+='<option value="'+obj[i].id+'" '+selected+'>'+obj[i].name+'</option>';
	//						}
	//						$jsNewAddrFrm.find('.province').append(html);
	//					}
	//				},'jsonp');
	//			}
    //
	//			if(cityId){
	//				$.get('//i.csc86.com/getZoneByParentId?parentId='+provinceId,function(data){
	//					  var result=data;
	//					  var html='<option value="">请选择</option>';
	//					  if(result.status==="200"){
	//						  var obj=result.data;
	//						  var len=obj.length;
	//						  for(var i=0;i<len;i++){
	//							  var selected="";
	//							  if(obj[i].id==cityId){
	//								  selected='selected="selected"';
	//							  }
	//							  html+='<option value="'+obj[i].id+'" '+selected+'>'+obj[i].name+'</option>';
	//						  }
	//						  if(!$jsNewAddrFrm.find('.city')[0]){
	//							  $thisparent.find('.province').after('<select id="city" class="frm-slt city jsinp" name="cityId">'+html+'</select>');
	//						  }
	//						  $jsNewAddrFrm.find('.city').html(html);
	//					  }else{
	//						  $jsNewAddrFrm.find('.city').remove();
	//					  }
	//				  },'jsonp');
	//			}
    //
	//			if(districtId){
	//				$.get('//i.csc86.com/getZoneByParentId?parentId='+cityId,function(data){
	//					var result=data;
	//					var html='<option value="">请选择</option>';
	//					if(result.status==="200"){
	//						var obj=result.data;
	//						var len=obj.length;
	//						for(var i=0;i<len;i++){
	//							var selected="";
	//							if(obj[i].id==districtId){
	//								selected=' selected';
	//							}
	//							html+='<option value="'+obj[i].id+'"'+selected+'>'+obj[i].name+'</option>';
	//						}
	//						if(!$jsNewAddrFrm.find('.district')[0]){
	//							$jsNewAddrFrm.find('.province').parent().append('<select id="district" class="frm-slt district jsinp" name="districtId">'+html+'</select>');
	//						}
	//						$jsNewAddrFrm.find('.district').html(html);
	//					}else{
	//						$jsNewAddrFrm.find('.district').remove();
	//					}
	//				},'jsonp');
	//			}
    //
	//			$jsNewAddrFrm.find('#address').val(_inf.address);//详细地址
	//			$jsNewAddrFrm.find('.jsSsq').html(areaHtml);
	//			$jsNewAddrFrm.find('#phone').val(_inf.mobile);//手机号
	//			$jsNewAddrFrm.find('input[name=email]').val(_inf.email);//邮箱
    //
	//			if(!_inf.areaCode){
	//				plchldr.placeholder('#areaCode','#888');
	//			}else{
	//				$jsNewAddrFrm.find('#areaCode').val(_inf.areaCode).css('color','');//区号
	//			}
	//			if(!_inf.tel){
	//				plchldr.placeholder('#tel','#888');
	//			}else{
	//				$jsNewAddrFrm.find('#tel').val(_inf.tel).css('color','');//电话号码
	//			}
	//			if(!_inf.ext){
	//				plchldr.placeholder('#extnsn','#888');
	//			}else{
	//				$jsNewAddrFrm.find('#extnsn').val(_inf.ext).css('color','');//分机号
	//			}
	//		}
	//		isSubmit=false;
	//	},"jsonp");
    //
	//	return false;
	//});
	
	$('#areaCode,#tel,#extnsn').on('focus blur', function(e) {
		var $type = e.type;
		var $this = $(this);
		var _id=$this.attr('id');
		var _val = $this.val();
		var _text="";
		if ($type == 'focusin' || $type == 'focus') {
			$this.css('color', '#000');
		} else if ($type == 'focusout' || $type == 'blur') {
			if(_id=="areaCode"){
				_text="区号";
			}
			if(_id=="#tel"){
				_text="电话号码";
			}
			if(_id=="#extnsn"){
				_text="分机号";
			}
			if (_val == _text || _val == "") {
				$this.css('color', '#888');
			}
		}
	});

	$('.li_list').on('click',function(){
		var ids=$(this).attr('data-memaddressid');
		var len=$('.wrtaddr-as').find('.li_list').length;
		for(var i=0;i<len;i++){
			$('.wrtaddr-as').find('.li_list').eq(i).removeClass('cur');
		}
		$(this).addClass('cur');

		$('#mem_address_id').val(ids);
	})
	//保存收货人信息
	//$jsNewAddrFrm.on('click','.newaddr-abtn',function(){
	//	var $this=$(this);
	//	var $form=$this.parents('.jsNewAddrFrm');
	//	var $consignee=$form.find('#consignee');
	//	var $province=$form.find('#province');
	//	var $provTd=$province.parents('td');
	//	var $address=$form.find('#address');
	//	var $phone=$form.find('#phone');
	//	var $areaCode=$form.find('#areaCode');
	//	var $tel=$form.find('#tel');
	//	var $extnsn=$form.find('#extnsn');
	//	var $post=$form.find('#post');
	//	var _consigneeVal=$.trim($consignee.val());
	//	var _phoneVal=$.trim($phone.val());
	//	var _areaCodeVal=$.trim($areaCode.val());
	//	var _telVal=$.trim($tel.val());
	//	var _extnsn=$.trim($extnsn.val());
	//	var _postVal=$.trim($post.val());
    //
	//	var _isEdit=$form.find('input[type=hidden][name=addressId]').val();
	//
	//	if(_areaCodeVal=="区号"){
	//		_areaCodeVal="";
	//		$areaCode.val(_areaCodeVal);
	//	}
	//	if(_telVal=="电话号码"){
	//		_telVal="";
	//		$tel.val(_telVal);
	//	}
	//	if(_extnsn=="分机号"){
	//		_extnsn="";
	//		$extnsn.val(_extnsn);
	//	}
	//	var _telPhoneVal=_areaCodeVal+'-'+_telVal+'-'+_extnsn;//电话号码
    //
	//	if(!_consigneeVal){//收货人不可为空
	//		$consignee.addClass('error');
	//		return false;
	//	}
	//	if(_consigneeVal&&!consigneeRegx.test(_consigneeVal)){//若收货人不为空验证其格式
	//		$consignee.addClass('error');
	//		return false;
	//	}
	//	if(!$provTd.find('select:last').val()){//判断是否选择了地区
	//		$provTd.addClass('td-error');
	//		return false;
	//	}
	//	if(!$.trim($address.val())){//详细地址不可为空
	//		$address.addClass('error');
	//		return false;
	//	}
	//	if(!phoneRegx.test(_phoneVal)){//手机号码验证
	//		$phone.addClass('error');
	//		return false;
	//	}
	//	if(_telPhoneVal!='--'&&!telRegx.test(_telPhoneVal)){//验证电话号码，电话号码选填
	//		$tel.parent().addClass('td-error');
	//		return false;
	//	}
	//
	//	/*if(!_phoneVal&&_telPhoneVal == '--'){//手机和电话号码必须填写一个
	//		$phone.parent().addClass('td-error');
	//		$tel.parent().addClass('td-error');
	//		return false;
	//	}
	//	if(_phoneVal&&!phoneRegx.test(_phoneVal)){//若填写了手机号码则验证手机号码格式
	//		$phone.parent().addClass('td-error');
	//		return false;
	//	}
	//	if(_telPhoneVal!='--'&&!telRegx.test(_telPhoneVal)){//若填写了电话号码手机号码可以不用填
	//		$tel.parent().addClass('td-error');
	//		return false;
	//	}*/
	//	if(_postVal&&!emailRegx.test(_postVal)){//如果email不为空时 判断email格式
	//		$post.addClass('error');
	//		return false;
	//	}
	//	if(isSubmit===true){return false;}//阻止表单重复提交
	//	isSubmit=true;
	//	if(!_isEdit){//添加地址
	//		$.post($form.attr('action'),$form.serializeArray(),function(data){
	//			if(data.status==="200"){
	//				$jsAddrLst.find('li').removeClass('cur');
	//				$jsAddrLst.find('input[name=addrRadio]').removeAttr('checked');
	//				$jsAddrLst.find('.new').before('<li class="cur"><label><input name="addrRadio" type="radio" value="'+data.data.addressId+'" checked> '+data.data.value+'</label><a class="jsEdit" href="">编辑</a></li>');
	//				$('input[type=hidden][name=mem_address_id]').val(data.data.addressId);
	//				$form[0].reset();
	//				$newAddrBox.hide();
	//			}
	//			else if(data.status==="301"){
	//				require.async('//res.csc86.com/js/m/sign.js',function(){
	//					csc.checkSign();
	//				});
	//			}
	//			else{
	//				dialog.tip(data.msg?data.msg:'保存收货人信息失败！',2);
	//			}
	//			isSubmit=false;
	//		},"jsonp");
	//	}else{//编辑地址
	//		$.post('//i.csc86.com/memaddress/updateMemberAddress',$form.serializeArray(),function(data){
	//			if(data.status==="200"){
	//				$jsAddrLst.find('.cur').html('<label><input name="addrRadio" type="radio" value="'+data.data.addressId+'" checked> '+data.data.value+'</label><a class="jsEdit" href="">编辑</a>');
	//				$('input[type=hidden][name=mem_address_id]').val(data.data.addressId);
	//				$newAddrBox.hide();
	//			}
	//			else if(data.status==="301"){
	//				require.async('//res.csc86.com/js/m/sign.js',function(){
	//					csc.checkSign();
	//				});
	//			}
	//			else{
	//				dialog.tip(data.msg?data.msg:'保存收货人信息失败！',2);
	//			}
	//			isSubmit=false;
	//		},"jsonp");
	//	}
	//	return false;
	//});
	
	/*给卖家留言*/
	var $lvmssgIpt=$('#lvmssgIpt');
	
	var _lvmssgIpt=$('.lvmssgIpt');
	
	plchldr.placeholder('#lvmssgIpt','#888');
	
	//留言限制在50个字内
	_lvmssgIpt.on('keyup',function(){
		var $this=$(this);
		checkLength($this);
	});
	_lvmssgIpt.on('blur',function(){
		var $this=$(this);
		checkLength($this);
	});
	function checkLength(txtObj){
		var _val=$.trim(txtObj.val());
		var _len=_val.length;
		if(_len>50){
			_val=_val.substr(0,50);
			_len=50;
			txtObj.val(_val);
		}
		txtObj.siblings('.numtip').find('em').html(50-_len);
	}

	/*头部购物车*/
	$('.gwc').hover(function(){
		$(this).addClass('orange');
		$('.num').addClass('orangeNum')
	},function(){
		$(this).removeClass('orange');
		$('.num').removeClass('orangeNum')
	})

	//优惠券
	//返回采购单修改
	$('.red-abtnleft').on('click',function(){
		//history.go(-1);
		});

	/*地址删除*/
	function delete_dialogs(options,ids){
		var dele=artDialog({
			id: options,
			title: '',
			fixed: true,
			lock: true,
			background: "#000",
			opacity: "0.3",
			content: $("#" + options).html(),
			init: function () {
				$('.aui_state_lock').addClass('paymentszf');

				$('.close_btn').on('click',function(){
					dele.close();
				})
				$('.ope_btn').on('click',function(){
					var addressId=ids;
					$.get('//i.csc86.com/memaddress/delMemberAddressById?addressId='+addressId,function(data){
						//console.log(data)
						if(data.status=200){
							dele.close();
							dialog.tip('删除成功！',2);
							setTimeout(function () {
								location.reload();
							}, 2000);


						}
					});
				});

			}
		})
	}

	//地址修改
	function dialogs_update(options,ids,isdefault){
		var addressId=ids;
		var provinceId="";
		var cityId="";
		var districtId=""
		$.get('//i.csc86.com/memaddress/getAddtrssById?addressId='+addressId,function(data){
			if(data.status==="200"){
				var _inf=data.data;
				//$newAddrBox.show();
				var $jsNewAddrFrm=$('.jsNewAddrFrm');
				$jsNewAddrFrm.find('.error').removeClass('error');//初始先将错误信息删掉
				$jsNewAddrFrm.find('.td-error').removeClass('td-error');//初始先将错误信息删掉
				//$jsNewAddrFrm.find('.province').siblings('.frm-slt').remove();//初始先将市区删掉
				$('input[type=hidden][name=mem_address_id]').val("");
				$('input[type=hidden][name=addressId]').val(addressId);
				$jsNewAddrFrm.find('#consignee').val(_inf.consignee);//收货人

				//地区
				provinceId=_inf.provinceId;
				cityId=_inf.cityId;
				districtId=_inf.districtId;
				var areaHtml="";
				if(_inf.districtName){
					areaHtml=_inf.provinceName+_inf.cityName+_inf.districtName;
				}else{
					areaHtml=_inf.provinceName+_inf.cityName;
				}

				if(provinceId){
					$.get('//i.csc86.com/getAllProvince',function(data){
						var result=data;
						var html='';
						if(result.status==="200"){
							var obj=result.data;
							var len=obj.length;
							for(var i=0;i<len;i++){
								var selected="";
								if(obj[i].id==provinceId){
									selected='selected';
								}
								html+='<option value="'+obj[i].id+'" '+selected+'>'+obj[i].name+'</option>';
							}

							$jsNewAddrFrm.find('.province').append(html);
						}
					},'jsonp');
				};

				if(cityId){
					$.get('//i.csc86.com/getZoneByParentId?parentId='+provinceId,function(data){
						var result=data;
						var html='';
						if(result.status==="200"){
							var obj=result.data;
							var len=obj.length;
							for(var i=0;i<len;i++){
								var selected="";
								if(obj[i].id==cityId){
									selected='selected';
								}
								html+='<option value="'+obj[i].id+'" '+selected+'>'+obj[i].name+'</option>';
							}
							//if(!$jsNewAddrFrm.find('.city')[0]){
							//	console.log(123);
							//	$jsNewAddrFrm.find('.jsAreaSlt').append('<select id="city" class="frm-slt city jsinp" name="cityId">'+html+'</select>');
							//}
							$jsNewAddrFrm.find('.city').append(html);
						}else{
							$jsNewAddrFrm.find('.city').remove();
						}
					},'jsonp');
				};

				if(districtId){
					$.get('//i.csc86.com/getZoneByParentId?parentId='+cityId,function(data){
						var result=data;
						var html='';
						if(result.status==="200"){
							var obj=result.data;
							var len=obj.length;
							for(var i=0;i<len;i++){
								var selected="";
								if(obj[i].id==districtId){
									selected='selected';
								}
								html+='<option value="'+obj[i].id+'"'+selected+'>'+obj[i].name+'</option>';
							}
							//if(!$jsNewAddrFrm.find('.district')[0]){
							//	$jsNewAddrFrm.find('.jsAreaSlt').append('<select id="district" class="frm-slt district jsinp" name="districtId">'+html+'</select>');
							//}
							$jsNewAddrFrm.find('.district').append(html);
						}else{
							$jsNewAddrFrm.find('.district').remove();
						}
					},'jsonp');
				}

				$jsNewAddrFrm.find('#address').val(_inf.address);//详细地址
				//$jsNewAddrFrm.find('.jsSsq').html(areaHtml);
				$jsNewAddrFrm.find('#phone').val(_inf.mobile);//手机号
				$jsNewAddrFrm.find('input[name=email]').val(_inf.email);//邮箱

				if(!_inf.areaCode){
					plchldr.placeholder('#areaCode','#888');
				}else{
					$jsNewAddrFrm.find('#areaCode').val(_inf.areaCode).css('color','');//区号
				}
				if(!_inf.tel){
					plchldr.placeholder('#tel','#888');
				}else{
					$jsNewAddrFrm.find('#tel').val(_inf.tel).css('color','');//电话号码
				}
				if(!_inf.ext){
					plchldr.placeholder('#extnsn','#888');
				}else{
					$jsNewAddrFrm.find('#extnsn').val(_inf.ext).css('color','');//分机号
				}

			}
			isSubmit=false;
		},"jsonp");

		var updatediar=artDialog({
			id: options,
			title: '修改收货地址',
			fixed: true,
			lock: true,
			background: "#000",
			opacity: "0.3",
			content: $("#" + options).html(),
			init: function () {
				$('.aui_state_lock').addClass('paymentszf');
				$('#province').on('change',function(){
					var $this=$(this);
					var id=$this.val();
					var $thisparent=$this.parent();
					if(id){
						$.get('//i.csc86.com/getZoneByParentId?parentId='+id,function(data){
							var result=data;
							var html='<option value="">请选择</option>';
							if(result.status==="200"){
								var obj=result.data;
								var len=obj.length;
								for(var i=0;i<len;i++){
									html+='<option value="'+obj[i].id+'">'+obj[i].name+'</option>';
								}
								$thisparent.find('.city').html("");
								$thisparent.find('.district').remove();
								$thisparent.find('.city').find('option:gt(0)').remove().end().append(html);
							}else{
								$thisparent.find('.city').remove();
								$thisparent.find('.district').remove();
							}
						},'jsonp');
					}
				});

				$('.jsAreaSlt').on('change','#city',function() {
					var $this = $(this);
					var id = $this.val();
					var $thisparent = $this.parent();
					if (id) {
						$.get('//i.csc86.com/getZoneByParentId?parentId=' + id, function (data) {
							var result = data;
							var html = '';
							if (result.status === "200") {
								var obj = result.data;
								var len = obj.length;
								for (var i = 0; i < len; i++) {
									html += '<option value="' + obj[i].id + '">' + obj[i].name + '</option>';
								}
								if (!$thisparent.find('.district')[0]) {
									$this.after('<select id="district" class="frm-slt district jsinp" name="districtId"><option value="">请选择</option></select>');
								}
								$thisparent.find('.district').html("");
								$thisparent.find('.district').find('option:gt(0)').remove().end().append(html);
							} else {
								$thisparent.find('.district').remove();
							}
						}, 'jsonp');
					}
				});


				$('.newaddr-abtn').on('click',function(){
					var $this=$(this);
					var $form=$this.parents('.jsNewAddrFrm');
					var $consignee=$form.find('#consignee');
					var $province=$form.find('#province');
					var $provTd=$province.parents('td');
					var $address=$form.find('#address');
					var $phone=$form.find('#phone');
					var $areaCode=$form.find('#areaCode');
					var $tel=$form.find('#tel');
					var $extnsn=$form.find('#extnsn');
					var $post=$form.find('#post');
					var _consigneeVal=$.trim($consignee.val());
					var _phoneVal=$.trim($phone.val());
					var _areaCodeVal=$.trim($areaCode.val());
					var _telVal=$.trim($tel.val());
					var _extnsn=$.trim($extnsn.val());
					var _postVal=$.trim($post.val());
					$form.find('#isDefault').val(isdefault);
					//var _isEdit=$form.find('input[type=hidden][name=addressId]').val();
					if(_areaCodeVal=="区号"){
						_areaCodeVal="";
						$areaCode.val(_areaCodeVal);
					}
					if(_telVal=="电话号码"){
						_telVal="";
						$tel.val(_telVal);
					}
					if(_extnsn=="分机号"){
						_extnsn="";
						$extnsn.val(_extnsn);
					}
					var _telPhoneVal=_areaCodeVal+'-'+_telVal+'-'+_extnsn;//电话号码

					if(!_consigneeVal){//收货人不可为空
						$consignee.parent().parent().next().show();
						$consignee.parent().parent().next().find('em').html('收货人不能为空');
						$consignee.addClass('error');
						return false;
					}
					if(_consigneeVal&&!consigneeRegx.test(_consigneeVal)){//若收货人不为空验证其格式
						$consignee.parent().parent().next().show();
						$consignee.parent().parent().next().find('em').html('收货人格式不正确');
						$consignee.addClass('error');
						return false;
					}
					if(!$provTd.find('select:last').val()){//判断是否选择了地区
						$('#province').parents('tr').next().show();
						$('#province').parents('tr').next().find('em').html('地区没有选择');
						$provTd.addClass('td-error');
						return false;
					}
					if(!$.trim($address.val())){//详细地址不可为空
						$address.parent().parent().next().show();
						$address.parent().parent().next().find('em').html('详细地址不能为空');
						$address.addClass('error');
						return false;
					}
					if(!phoneRegx.test(_phoneVal)){//手机号码验证
						$phone.parent().parent().next().show();
						$phone.parent().parent().next().find('em').html('格式不正确, 手机号码为11位数字');
						$phone.addClass('error');
						return false;
					}
					if(_telPhoneVal!='--'&&!telRegx.test(_telPhoneVal)){//验证电话号码，电话号码选填
						$tel.parent().parent().next().show();
						$tel.parent().parent().next().find('em').html('电话号码格式不对');
						$tel.parent().addClass('td-error');
						return false;
					}
					if(_postVal&&!emailRegx.test(_postVal)){//如果email不为空时 判断email格式
						$post.parent().parent().next().show();
						$post.parent().parent().next().find('em').html('邮箱格式不对');
						$post.addClass('error');
						return false;
					}

					//if(isSubmit===true){return false;}//阻止表单重复提交
					//isSubmit=true;
					$.post('//i.csc86.com/memaddress/updateMemberAddress',$form.serializeArray(),function(data){
						if(data.status==="200"){
							updatediar.close();
							dialog.tip('保存成功！',2);
							setTimeout(function () {
								location.reload();
							}, 2000);
							//$jsAddrLst.find('li').removeClass('cur');
							//$jsAddrLst.find('input[name=addrRadio]').removeAttr('checked');
							//$jsAddrLst.find('.new').before('<li class="cur"><label><input name="addrRadio" type="radio" value="'+data.data.addressId+'" checked> '+data.data.value+'</label><a class="jsEdit" href="">编辑</a></li>');
							//$('input[type=hidden][name=mem_address_id]').val(data.data.addressId);
							//$form[0].reset();
							//$newAddrBox.hide();
						}
						else if(data.status==="301"){
							require.async('//res.csc86.com/js/m/sign.js',function(){
								csc.checkSign();
							});
						}
						else{
							dialog.tip(data.msg?data.msg:'保存收货人信息失败！',2);
						}
						isSubmit=false;
					},"jsonp");

					return false;
				});


			}
		})
	}

	//地址添加
	function add_dialogs(options){
		var Thiss = $(this);
		var adddiarts=artDialog({
			id: options,
			title: '添加收货地址',
			fixed: true,
			lock: true,
			background: "#000",
			opacity: "0.3",
			content: $("#" + options).html(),
			init: function () {
				$('.aui_state_lock').addClass('paymentszf');

				$.get('//i.csc86.com/getAllProvince',function(data){

					var result=data;
					var html='';
					var cityId="";
					if(result.status==="200"){
						var obj=result.data;
						var len=obj.length;
						for(var i=0;i<len;i++){
							html+='<option value="'+obj[i].id+'">'+obj[i].name+'</option>';
						}
						$('.jsNewAddrFrm').find('#add_province').find('option:gt(0)').remove().end().append(html);
					}
				},'jsonp');

				$('#add_province').on('change',function(){
					var $this=$(this);
					var id=$this.val();
					var $thisparent=$this.parent();
					if(id){
						$.get('//i.csc86.com/getZoneByParentId?parentId='+id,function(data){
							var result=data;
							cityId=result.cityId;
							var html='';
							if(result.status==="200"){
								var obj=result.data;
								var len=obj.length;
								for(var i=0;i<len;i++){
									html+='<option value="'+obj[i].id+'">'+obj[i].name+'</option>';
								}
								if(!$thisparent.find('.city')[0]){
									$this.after('<select id="city" class="frm-slt city jsinp" name="cityId"><option value="">请选择</option></select>');
								}
								$thisparent.find('.city').find('option:gt(0)').remove().end().append(html);
							}else{
								$thisparent.find('.city').remove();
							}

						},'jsonp');
					}
				})

				$('.jsAreaSlt').on('change','#city',function() {
					var $this = $(this);
					var id = $this.val();
					var $thisparent = $this.parent();
					if (id) {
						$.get('//i.csc86.com/getZoneByParentId?parentId=' + id, function (data) {
							var result = data;
							var html = '';
							if (result.status === "200") {
								var obj = result.data;
								var len = obj.length;
								for (var i = 0; i < len; i++) {
									html += '<option value="' + obj[i].id + '">' + obj[i].name + '</option>';
								}
								if (!$thisparent.find('.district')[0]) {
									$this.after('<select id="district" class="frm-slt district jsinp" name="districtId"><option value="">请选择</option></select>');
								}
								$thisparent.find('.district').find('option:gt(0)').remove().end().append(html);
							} else {
								$thisparent.find('.district').remove();
							}
						}, 'jsonp');
					}
				});

				$('.newaddr-abtn').on('click',function(){
					var $this=$(this);
					var $form=$this.parents('.jsNewAddrFrm');
					var $consignee=$form.find('#add_consignee');
					var $province=$form.find('#add_province');
					var $provTd=$province.parents('td');
					var $address=$form.find('#add_address');
					var $phone=$form.find('#add_phone');
					var $areaCode=$form.find('#add_areaCode');
					var $tel=$form.find('#add_tel');
					var $extnsn=$form.find('#add_extnsn');
					var $post=$form.find('#add_post');
					var _consigneeVal=$.trim($consignee.val());
					var _phoneVal=$.trim($phone.val());
					var _areaCodeVal=$.trim($areaCode.val());
					var _telVal=$.trim($tel.val());
					var _extnsn=$.trim($extnsn.val());
					var _postVal=$.trim($post.val());

					//var _isEdit=$form.find('input[type=hidden][name=addressId]').val();

					if(_areaCodeVal=="区号"){
						_areaCodeVal="";
						$areaCode.val(_areaCodeVal);
					}
					if(_telVal=="电话号码"){
						_telVal="";
						$tel.val(_telVal);
					}
					if(_extnsn=="分机号"){
						_extnsn="";
						$extnsn.val(_extnsn);
					}
					var _telPhoneVal=_areaCodeVal+'-'+_telVal+'-'+_extnsn;//电话号码

					if(!_consigneeVal){//收货人不可为空
						$consignee.parent().parent().next().show();
						$consignee.parent().parent().next().find('em').html('收货人不能为空');
						$consignee.addClass('error');
						return false;
					}else{
						$consignee.parent().parent().next().hide();
						$consignee.next().show();
						$consignee.removeClass('error');
					}
					if(_consigneeVal&&!consigneeRegx.test(_consigneeVal)){//若收货人不为空验证其格式
						$consignee.parent().parent().next().show();
						$consignee.parent().parent().next().find('em').html('收货人格式不正确');
						$consignee.addClass('error');
						return false;
					}else{
						$consignee.parent().parent().next().hide();
						$consignee.next().show();
						$consignee.removeClass('error');
					}
					if(!$provTd.find('select:last').val()){//判断是否选择了地区
						//$('#add_province').parents('tr').next().show();
						//$('#add_province').parents('tr').next().find('em').html('请选择地区');
						$provTd.addClass('td-error');
						return false;
					}else{
						//$('#add_province').parents('tr').next().hide();
						//$('#add_province').next().show();
						$provTd.removeClass('td-error');
					}

					if(!$.trim($address.val())){//详细地址不可为空
						$address.parent().parent().next().show();
						$address.parent().parent().next().find('em').html('详细地址不能为空');
						$address.addClass('error');
						return false;
					}else{
						$address.parent().parent().next().hide();
						$address.next().show();
						$address.removeClass('error');
					}
					if(!phoneRegx.test(_phoneVal)){//手机号码验证
						$phone.parent().parent().next().show();
						$phone.parent().parent().next().find('em').html('格式不正确, 手机号为11位数字');
						$phone.addClass('error');
						return false;
					}else{
						$phone.parent().parent().next().hide();
						$phone.next().show();
						$phone.removeClass('error');
					}

					if(_telPhoneVal!='--'&&!telRegx.test(_telPhoneVal)){//验证电话号码，电话号码选填
						$tel.parent().parent().next().show();
						$tel.parent().parent().next().find('em').html('电话格式不正确');
						$tel.parent().addClass('td-error');
						return false;
					}else{
						$tel.parent().parent().next().hide();
						$tel.next().show();
						$tel.removeClass('td-error');
					}

					if(_postVal&&!emailRegx.test(_postVal)){//如果email不为空时 判断email格式
						$post.parent().parent().next().show();
						$post.parent().parent().next().find('em').html('email格式不正确');
						$post.addClass('error');
						return false;
					}

					//if(isSubmit===true){return false;}//阻止表单重复提交
					//isSubmit=true;
					$.post($form.attr('action'),$form.serializeArray(),function(data){
						if(data.status==="200"){
							adddiarts.close();
							dialog.tip('地址添加成功！',20000);
							setTimeout(function () {
								location.reload();
							}, 2000);
							//$jsAddrLst.find('li').removeClass('cur');
							//$jsAddrLst.find('input[name=addrRadio]').removeAttr('checked');
							//$jsAddrLst.find('.new').before('<li class="cur"><label><input name="addrRadio" type="radio" value="'+data.data.addressId+'" checked> '+data.data.value+'</label><a class="jsEdit" href="">编辑</a></li>');
							//$('input[type=hidden][name=mem_address_id]').val(data.data.addressId);
							//$form[0].reset();
							//$newAddrBox.hide();
						}
						else if(data.status==="301"){
							require.async('//res.csc86.com/js/m/sign.js',function(){
								csc.checkSign();
							});
						}
						else{
							dialog.tip(data.msg?data.msg:'保存收货人信息失败！',2);
						}
						isSubmit=false;
					},"jsonp");

					return false;
				});

			}
		})
	}

	$('.list_all>.sp1').on('click',function(){
		var ids=$(this).attr('data-ids');
		$.post('//i.csc86.com/memaddress/setDefault?addressId='+ids,function(data){
			var data=eval('('+data + ')');
			if(data.status==="200")
			{
				dialog.tip('已设为默认！',2);
				setTimeout(function () {
					location.reload();
				}, 2000);
			}else{
				dialog.tip('设为默认失败！',2);
			}
		});
	});

	$('.list_all>.sp2').on('click',function(){
		var ids=$(this).attr('data-ids');
		var isdefault=$(this).attr('data-isdefault');
		dialogs_update("update-dz",ids,isdefault);
	});

	$('.list_all>.sp3').on('click',function(){
		var ids=$(this).attr('data-ids');
		delete_dialogs("delete_dz",ids);
	});

	$('.add-mdz,.add-imgmdz').on('click',function(){
		add_dialogs("add-dz");
	});

	/*提交订单*/
	$('.jsOrderSmt').on('click',function(){
		var $this=$(this);
		var $form=$this.parents('.jsSmtOrderFrm');
		var $lvmssgIpt=$form.find('#lvmssgIpt');
		var _memAddressId=$('input[type=hidden][name=mem_address_id]').val();
		var _jsAllTnum=parseInt($('.jsAllTnum').html());
		var _type=$form.find('input[type=hidden][name=type]').val();
		var productId=$form.find('input[type=hidden][name=productId]').eq(0).val();
		var shopId=$form.find('input[type=hidden][name=shopId]').val();
		var dataObj={"productId":productId,"shopId":shopId};
		if(!_memAddressId){
			dialog.tip('请设置收货人信息！',2);
			return false;
		};
		var arr=[];
		$.each($('input[name=tfl]'),function(){
			var me=$(this);
			arr.push(me.val());
			if(me.val()==2){
				return false;
			}
		});
		if($.inArray("2",arr)>=0){
			dialog.tip('请先保存发票信息！',2);
			return false;
		};

		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;

		var gaprocucobj=[];
		var cpn=$('input[name*="cpn["]:checked').val();

		$.each($('input[name="productId"]'),function (i) {
			var prlid=$('input[name="productId"]').eq(i).val();
			var skuIds=$('input[name=skuIds]').eq(i).val();
			var proSku=skuIds?skuIds:$('input[name=lineIds]').eq(i).val();
			gaprocucobj.push({'id':prlid+':'+proSku,'price':cmmn.reFormatPrc($('.jsOnePrc').eq(i).text())*1,'quantity':$('.jsNumOpts').eq(i).text()*1});
		});
		cscga('create', 'SU-10001-1', 'auto','sumitordertracker');
		cscga('sumitordertracker.require', 'ec');
		cscga('sumitordertracker.require', 'cscplugin',{
			data: gaprocucobj,
			eventAction:'submitOrder',
			'cpnid':cpn,
			//'allSpecies':$('input[name="productId"]').lengt
			'CpnPrc':$('.jsCpnPrc').text()*1
		});
		cscga('sumitordertracker.cscplugin:SubmitorderInit');

		$form.trigger('submit');

		/*
		$.post('//i.csc86.com/carOrder/checkProduct',dataObj,function(data){
			var _msg=data.msg;
			if(data.status==="200"){
				var result=data.data;
				var shopIsOpenPay=result.shopIsOpenPay;
				var isTrade=result.isTrade;
				var minCount=parseInt(result.minProductCount);
				if(shopIsOpenPay==="Y"){//判断旺铺是否开通在线交易
					if(isTrade==="Y"){//可以在线交易
						switch(_type){
							case "sample":
							if(data.data.sampleCount<1){
								dialog.tip('样品库存不足！',2);
								isSubmit=false;
								return false;
							}
							break;
							default:
							if(_jsAllTnum<minCount){
								dialog.tip('采购数量必须为大于等于'+minCount+'的整数！',2.5);
								isSubmit=false;
								return false;
							}
							break;
						}
						$form.trigger('submit');
					}else{//不支持在线交易
						dialog.tip('<div class="notrade-tip"><h2>订单商品已不支持在线交易！</h2><p class="g-h5"></p><p>请您选择其他商品下单</p></div>',3);
					}
				}else{
					dialog.tip('<div class="notrade-tip"><h2>订单商品已不支持在线交易！</h2><p class="g-h5"></p><p>请您选择其他商品下单</p></div>',3);
				}
			}else{
				dialog.tip(_msg?_msg:'确认下单失败！',2);
			}
			isSubmit=false;
		},'jsonp');
		*/
		return false;
		
	});
});
