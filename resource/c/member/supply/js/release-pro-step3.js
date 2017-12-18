/*发布产品：设置交易规则*/
define(function(require, exports, module) {
	require('//res.csc86.com/v2/c/member/common/js/alertDialog'); //按钮弹窗组件

	var common = require('./release-pro.js'); //公用js
	var valid = common.valid; //表单验证
	var $jsSetRlFrm = $('.jsSetRlFrm'); //表单form

	var $unitsSlt = $('.frm-slt[name=units]'); //计量单位下拉列表

	var $prcTab = $('.prc-tab'); //价格右侧容器
	var $prcRadio = $('input[name=speak]'); //自定义价格和面议单选框
	var $cstmPrc = $('#cstmPrc'); //自定义价格单选框
	var $jsCstmProDtl = $('.jsCstmProDtl'); //自定义价格具体内容的容器
	var $prcTbl = $jsCstmProDtl.find('.prc-table');
	var $prcTbody = $prcTbl.find('tbody');

	var $supplyquantity = $('input[name=supplyquantity]'); //供货数量
	var $unlimited = $('input[name=unlimited]'); //供货数量处复选框

	var $isOfferSample = $('input[name=isOfferSample]'); //是否提供样品单选框
	var $yesSample = $('#yesSample'); //是提供样品单选框
	var $sampleTab = $('.sample-tab'); //是否提供样品单选框父容器
	var $jsYesSmplDtl = $('.jsYesSmplDtl'); //设置样品容器
	var $samplePrc = $jsYesSmplDtl.find('input[name="sample[price]"]'); //样品单价文本框
	var $sampleNum = $jsYesSmplDtl.find('input[name="sample[count]"]'); //样品数量文本框
	var $sampleYf = $jsYesSmplDtl.find('input[name="sample[freight]"]'); //样品运费文本框
	
	var $shExplain=$('.sh-explain');
	var $isThRdo = $('input[name=returns][type=radio]'); //退货单选框
	var $isChngRdo = $('input[name=changes][type=radio]'); //换货单选框

	var $noZxjy = $('#noZxjy'); //不开通在线交易单选框

	var $jsReviewBtn = $('.jsReviewBtn'); //预览产品按钮

	var units = '单位'; //用来保存单位
	var isSubmit = false; //阻止重复提交用的

	//表单验证公共函数
	var validFrm = {
		frmRadio: function(obj, tipObj, nullTip) { //单选框验证
			var static;
			var isChecked = obj.is(':checked');
			if (!isChecked) {
				valid.errorTip(tipObj, nullTip);
				static = false;
			} else {
				tipObj.find('.valid-error').remove();
				static = true;
			}
			return static;
		},
		iptTxt: function(obj) { //文本框和下拉列表验证（自定义价格区间的文本框除外）
			var isMust = true,
				tipObj = obj.parent(),
				nullTip = '',
				errorTip = '',
				regx = null,
				type = 0,
				frmName = obj.attr('name');
			switch (frmName) {
				case 'units': //计量单位下拉列表
					errorTip = '请选择计量单位';
					regx = /^[0-9]+$/;
					break;
				case 'supplyquantity': //库存数量文本框
					nullTip = '请填写库存数量，只可输入大于0的整数，不超过6位数'
					errorTip = '请填写库存数量，只可输入大于0的整数，不超过6位数';
					regx = /^[1-9][0-9]{0,5}$/
					break;
				case 'sample[price]': //样品单价文本框
					nullTip = '请填写样品单价，大于或等于0，最多2位小数，6位数以内';
					errorTip = '请填写样品单价，大于或等于0，最多2位小数，6位数以内';
					type = 1;
					break;
				case 'sample[count]': //样品数量文本框
					nullTip = '请填写样品数量，只可输入大于0的整数，不超过6位数';
					errorTip = '请填写样品数量，只可输入大于0的整数，不超过6位数';
					regx = /^[1-9][0-9]{0,5}$/;
					break;
				case 'sample[freight]': //样品运费文本框
					nullTip = '请填写样品运费，大于或等于0，最多2位小数，6位数以内';
					errorTip = '请填写样品运费，大于或等于0，最多2位小数，6位数以内';
					type = 1;
					break;
			}
			return valid.init({
				isMust: isMust,
				obj: obj,
				tipObj: tipObj,
				nullTip: nullTip,
				errorTip: errorTip,
				regx: regx,
				type: type
			});
		},
		cstmPrc: function(obj) {//自定义价格区间处相关js验证
			var cgNumTip='请输入大于0的整数，不超过6位数';
			var prcTip='请输入大于0的数字，最多2位小数，不超过6位数';
			var cgNumRegx=/^[1-9][0-9]{0,5}$/;
			var prcRegx=/^([1-9][0-9]{0,5}(\.[0-9]{0,2})?|0\.[1-9][0-9]?|0\.0[1-9])$/;
			var $cgNum=null,$prc=null;
			var isCgNum=obj.hasClass('jsCgNum');
			var $slbTxt=obj.parent().siblings().find('.ipt-txt');
			if(isCgNum){//判断当前文本框是否为采购数量文本框
				$cgNum=obj;
				$prc=$slbTxt;
			}else{
				$cgNum=$slbTxt;
				$prc=obj;
			}
			
			var $allCgNum=$prcTbody.find('.jsCgNum');//所有的采购数量文本框
			var len=$allCgNum.length;//采购数量文本框的总数
			var $cgParent=$cgNum.parent();
			var $prcParent=$prc.parent();
			var cgVal=$.trim($cgNum.val());
			var prcVal=$.trim($prc.val());
			var cgStatic=false,prcStatic=false;
			
			//获取采购数量文本框验证状态
			var getCgSttc=function(arg){
				return valid.init({
					isMust:true,
					obj:arg,
					tipObj:arg.parent(),
					errorTip:cgNumTip,
					nullTip:cgNumTip,
					regx:cgNumRegx
				});
			};
			
			//获取产品单价文本框验证状态
			var getPrcSttc=function(arg){
				return valid.init({
					isMust:true,
					obj:arg,
					tipObj:arg.parent(),
					errorTip:prcTip,
					nullTip:prcTip,
					type:1,
					regx:prcRegx
				});
			};
			var mainTest = function() {
				if (isCgNum){
					cgStatic = getCgSttc($cgNum);
					if(prcVal){
						prcStatic = getPrcSttc($prc);
					}
				}else{
					prcStatic = getPrcSttc($prc);
					if(cgVal){
						cgStatic = getCgSttc($cgNum);
					}
				}
			};
			var $otherTr = obj.parents('tr').siblings('tr');
			var otherCgArry = [],valdArry = [];

			//循环除当前文本框外的其他文本框，并将得到的采购数量存在otherCgArry数组里面
			$otherTr.each(function() {
				var $this = $(this);
				var $curCg = $this.find('.jsCgNum');
				var $curPrc = $this.find('.jsPriceTxt');
				var curCgVal = $.trim($curCg.val());
				var curPrcVal = $.trim($curPrc.val());
				if (curCgVal||curPrcVal) {
					var curCgStatic = getCgSttc($curCg);
					var curPrcStatic=false;
					if (curCgStatic) {
						if ($.inArray(curCgVal, otherCgArry) < 0) {
							otherCgArry.push(curCgVal);
						} else {
							valdArry.push(false);
						}
					}
					if(curPrcVal){
						curPrcStatic = getPrcSttc($curPrc);
					}
					if(!curCgStatic || !curPrcStatic){
						valdArry.push(false);
					}
				}
			});
			switch(len){
				case 1:
				mainTest();
				break;
				default:
				if(otherCgArry.length>0){
					if(cgVal||prcVal){
						mainTest();
					}else{
						$cgNum.removeClass('frm-error');
						$prc.removeClass('frm-error');
						$cgParent.find('.valid-error').remove();
						$prcParent.find('.valid-error').remove();
						cgStatic=true;
						prcStatic=true;
					}
				}else{
					mainTest();
				}
			}
			if(!cgStatic||!prcStatic){
				valdArry.push(false);
			}
			
			if(otherCgArry.length>0){
				if($.inArray(cgVal,otherCgArry)>=0){//用于检测是否有重复采购数量
					$cgNum.addClass('frm-error');
					valid.errorTip($cgParent,'采购数量不可重复');
					$cgParent.find('.valid-error:contains("采购数量不可重复")').addClass('valid-repeat');
					valdArry.push(false);
				}else{
					var $errorTip=$cgParent.find('.valid-error:contains("采购数量不可重复")');
					otherCgArry.push(cgVal);
					$errorTip.siblings('.ipt-txt').removeClass('frm-error');
					$errorTip.remove();
					
					$prcTbody.find('.valid-repeat').siblings('.jsCgNum').each(function(){
						validFrm.cstmPrc($(this));
					});
				}
			}
			
			if($.inArray(false,valdArry)>=0){//只要有一个处于报错状态则返回false
				return false;
			}else{//当全部都正确的时候去的错误信息与红框
				$prcTbody.find('.ipt-txt').removeClass('frm-error');
				$prcTbody.find('.valid-error').remove();
				return true;
			}	
		},
		saledRdoChange: function(obj) { //退货、换货单选框切换并验证
			var $this = obj,
				$dd = $this.parents('dd'),
				$cmmnNumOpts=$dd.find('.cmmn-num-opts'),
				$iptTxt = $dd.find('.ipt-txt'),
				$p=$cmmnNumOpts.parents('p'),
				val = $this.val();
			if (val === 'Y') {
				$p.removeClass('nocheck');
				$iptTxt.removeAttr('disabled');
				$cmmnNumOpts.addClass('jsNumOpts');
			} else {
				$p.addClass('nocheck');
				$iptTxt.attr('disabled', true);
				$cmmnNumOpts.removeClass('jsNumOpts');
			}
		},
		smtForm: function() { //提交表单相关验证
			var arry = [];
			arry.push(validFrm.iptTxt($unitsSlt)); //计量单位验证

			arry.push(validFrm.frmRadio($prcRadio, $prcTab, '请选择')); //价格处单选按钮验证
			if ($jsCstmProDtl.is(':visible')) { //当选择自定义价格区间时验证对应的表单
				$prcTbody.find('.ipt-txt').each(function() {
					arry.push(validFrm.cstmPrc($(this)));
				});
			}

			if (!$supplyquantity.is(':disabled')) { //库存数量文本框框验证
				arry.push(validFrm.iptTxt($supplyquantity));
			}

			//否选择提供样品相关js验证
			arry.push(validFrm.frmRadio($isOfferSample, $sampleTab, '请选择是否提供样品'));
			if ($jsYesSmplDtl.is(':visible')) {
				arry.push(validFrm.iptTxt($samplePrc)); //样品单价验证
				arry.push(validFrm.iptTxt($sampleNum)); //样品数量验证
				arry.push(validFrm.iptTxt($sampleYf)); //样品运费验证

			}
			
			//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
			if ($.inArray(false, arry) >= 0) {
				return false;
			}
			return true;
		}
	};


	//选择计量单位各处的“单位”两个字同步对应的单位
	$unitsSlt.on('change', function() {
		var $this = $(this);
		var text = $this.find('option:selected').text();
		units = text;
		$('.jsUnit').html(units);
	});

	//计量单位验证
	$unitsSlt.on('click', function() {
		validFrm.iptTxt($(this));
	});

	//自定义价格区间处相关表单验证
	$prcTbody.on('blur', '.ipt-txt', function() {
		validFrm.cstmPrc($(this));
	});

	//价格处tab切换
	$prcRadio.on('change', function() {
		var $this = $(this);
		var val = $this.val();
		if (val === "N" && $jsCstmProDtl.is(':hidden')) {
			$jsCstmProDtl.show();
		} else {
			$jsCstmProDtl.hide();
			$prcTbody.find('.ipt-txt').removeClass('frm-error');
			$prcTbody.find('.valid-error').remove();
			if (!$yesSample.is(':checked')) {
				$noZxjy.prop('checked', true);
			}
		}
		validFrm.frmRadio($this, $prcTab, '请选择');
	});

	//添加价格区间
	$('.jsAddPrc').on('click', function() {
		var len = $prcTbody.find('tr').length + 1;
		var html = '<tr><td><input class="ipt-txt jsCgNum" type="text" name="productCustomprices[' + (len - 1) + '][minimum]" value="" maxlength="6"> <span><em class="jsUnit">' + units + '</em>(含)以上</span></td><td><input class="ipt-txt jsPriceTxt" type="text" name="productCustomprices[' + (len - 1) + '][price]" value=""> <span>元/<em class="jsUnit">' + units + '</em></span></td></tr>';
		var num = (3 - len) > 0 ? 3 - len : 0;
		var sTips = '( 最多还可添加' + num + '组 )';
		$(this).find('em').html(sTips)
		if (len < 4) {
			$prcTbody.append(html);
		} else {
			$.tip({
				content: '最多只能添加三个区间！',
				closeTime: 2
			});
		}
	}).on('click', 'em', function() {
		return false;
	});

	//供货方式中的预定只读
	$('#yd').on('click', function() {
		return false;
	});


	//供货数量处复选框切换
	$unlimited.on('change', function() {
		var $this = $(this);
		var $frmValue = $this.parents('.frm-value');
		var isChecked = $this.is(':checked');
		if (isChecked) {
			$supplyquantity.attr('disabled', true);
			$supplyquantity.removeClass('frm-error');
			$frmValue.find('.valid-error').remove();
		} else {
			$supplyquantity.removeAttr('disabled');
		}
	});

	//供货数量文本框验证
	$supplyquantity.on('blur', function() {
		validFrm.iptTxt($(this));
	});


	//样品设置处tab切换
	$isOfferSample.on('change', function() {
		var $this = $(this);
		var val = $this.val();
		if (val === "Y" && $jsYesSmplDtl.is(':hidden')) {
			$jsYesSmplDtl.show();
		} else {
			$jsYesSmplDtl.hide();
			$jsYesSmplDtl.find('.ipt-txt').removeClass('frm-error');
			$jsYesSmplDtl.find('.valid-error').remove();
			if (!$cstmPrc.is(':checked')) {
				$noZxjy.prop('checked', true);
			}
		}
		validFrm.frmRadio($this, $sampleTab, '请选择是否提供样品'); //验证是否选择提供样品
	});

	$samplePrc.on('blur', function() { //样品单价验证
		validFrm.iptTxt($(this));
	});

	$sampleNum.on('blur', function() { //样品数量验证
		validFrm.iptTxt($(this));
	});

	$sampleYf.on('blur', function() { //样品运费验证
		validFrm.iptTxt($(this));
	});

	$isThRdo.on('change', function() { //退货单选框切换
		validFrm.saledRdoChange($(this));
	});

	$isChngRdo.on('change', function() { //换货单选框切换
		validFrm.saledRdoChange($(this));
	});
	
	//防止点击时选中文本（主要是为了兼容ie，其他浏览器在样式里面设置了
	$('.cmmn-num-opts').find('i').each(function(){
		$(this)[0].onselectstart=function(){return false;}
	});
	
	//退换货处加减相关js
	$shExplain.on('click','.jsNumOpts .plut-opt',function(){
		var $this=$(this);
			$numipt = $this.next('.ipt-txt'),
			num = $numipt.val() * 1 - 1;
		num = num <= 1 ? 1 : num;
		if(num<2){
			$this.removeClass().addClass('no-plut-opt');
		}
		if(num<99){
			$this.siblings('.no-add-opt').removeClass().addClass('add-opt');
		}
		$numipt.val(num);
		return false;
	});
	
	$shExplain.on('click','.jsNumOpts .add-opt',function(){
		var $this=$(this);
			$numipt = $this.prev('.ipt-txt'),
			num = $numipt.val() * 1 + 1;
		if(num>1){
			$this.siblings('.no-plut-opt').removeClass().addClass('plut-opt');	
		}
		if(num>=99){
			num=99;
			$this.removeClass().addClass('no-add-opt');
		}
		$numipt.val(num);
		return false;
	});
	
	$shExplain.on('keyup','.jsNumOpts .ipt-txt',function(){
		var $this=$(this),
			$plutOpt=$this.prev(),
			$addOpt=$this.next();
		this.value=this.value.replace(/\D/g,'');
		var num=this.value;
		if(parseInt(num)===0){
			this.value=1;
		}
		if(this.value>=99){
			this.value=99;
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
	
	$shExplain.on('blur','.jsNumOpts .ipt-txt',function(){
		var $this=$(this),
			$addOpt=$this.next(),
			defaultVal=$this.data('default');
		this.value=this.value.replace(/\D/g,'');
		if(!this.value){
			this.value=defaultVal;
		}
		if(this.value>=99){
			this.value=99;
			$addOpt.removeClass().addClass('no-add-opt');
		}else{
			$addOpt.removeClass().addClass('add-opt');	
		}
	});


	//是否开通在线交易
	$('input[name=isTrade]').on('change', function() {
		var isCstmPrc = $cstmPrc.prop('checked');
		var isSample = $yesSample.prop('checked');
		if (!isCstmPrc && !isSample) {
			$.tip({
				content: '自定义价格区间”和“提供样品”至少需要选择一个才能正常开通在线交易！',
				closeTime: 5
			});
			$('#noZxjy').trigger('click');
		}
	});

	/***点击底部按钮相关js***/
	/*
	1、已经登录时：点击发布产品，当发布产品成功且在跳转进成功页面过程中让发布产品按钮不可点击，以防重复发布产品。其他情况保持当请求成功时恢复按钮可点击。
	2、未登录时：当点击任何一个按钮直接跳转到登录页面，跳转过程中所有按钮不可在点击。
	*/
	var submitForm={
		ajax:function(url,num){
			if (isSubmit === true) {
				return false;
			} //阻止表单重复提交
			isSubmit = true;
			$.ajax({
				url: url,
				data: $jsSetRlFrm.serializeArray(),
				async: num === 3 ? false : true,
				type: "POST",
				dataType: 'jsonp',
				success: function(data) {
					var status = data.status;
					var error = data.msg;
					if(status==='-1'){
						$.tip({
							content: error,
							closeTime: 3,
							closeCallback:function(){
								location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
							}
						});
					}
					else if (status === '0') {
						if (typeof(error) === 'object') {
							$.each(error, function(i, n) {
								$.tip({
									content: n,
									closeTime: 3
								});
							});
						} else {
							$.tip({
								content: error,
								closeTime: 3
							});
						}
						isSubmit = false;
					}else if(status==='-2'){
						var a=[],b=[],msg='';
						for(var i in error){//遍历json
							a.push(i);//key
							b.push((error)[i]);//value
						}
						for(var i = 0; i <a.length; i++){//构建错误信息
							if(a[i]=="enterpriseName"){
								msg += '<p><strong>企业名称</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="licenseNumber"){
								msg += '<p><strong>营业执照注册号</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="regAuhtority"){
								msg += '<p><strong>登记机关</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="legalPerson"){
								msg += '<p><strong>法定代表人</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="scope"){
								msg += '<p><strong>经营范围</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="proposer"){
								msg += '<p><strong>申请人</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="proposerDep"){
								msg += '<p><strong>申请人部门</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="proposerPost"){
								msg += '<p><strong>申请人职位</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="title"){
								msg += '<p><strong>产品标题</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}else if(a[i]=="content"){
								msg += '<p><strong>详细说明</strong>&nbsp;中的"'+b[i]+'",属于违禁词或敏感词,请修改!</p>';
							}
						}
						artDialog({
							id:'errorTip',
							title:false,
							content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2><p>'+msg+'</p>',
							fixed: true,
							lock:true,
							width:380,
							padding:'25px 50px 25px 25px',
							opacity:0,
							icon:'mem-n',
							ok:function(){},
							close:function(){
								$("input[name='"+a[0]+"']").focus();//默认第一个设置焦点
							}
						});
					} else {
						var $rvwParent = $jsReviewBtn.parent();
						if (num === 3) { //当点击预览时新页面打开预览页面
							window.open(data.url);
							isSubmit = false;
						} else {
							location.href = data.url;
						}
					}
					//isSubmit = false;
				}
			});
		},
		init:function(num){
			if (num === 1 || num === 3) {
				if (!validFrm.smtForm()) {
					return false;
				}
			}
			var href = location.href;
			var url = '';
			if (/\?/.test(location.href)) {
				url = location.search ? href + '&isSubmit=' + num : href + 'isSubmit=' + num;
			} else {
				url = location.search ? href + '&isSubmit=' + num : href + '?isSubmit=' + num;
			}
			if(num===1){
				if($jsSetRlFrm.data('url')){
					if (isSubmit === true) {
						return false;
					} //阻止表单重复提交
					isSubmit = true;
					$.get($jsSetRlFrm.data('url'), function(data) {
						isSubmit = false;
						var status=data.status;
						var error=data.error;
						if(status === '-1'){
							$.tip({
								content: error,
								closeTime: 3,
								closeCallback:function(){
									location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
								}
							});
						}
						else if(status === '1'){
							submitForm.ajax(url,num);
						}
						else{
							$.cscConfirm({
								content: '<p class="cfrm-icon" style="text-align:center;font-size:14px;">'+error+'</p>',
								title: false,
								callback: function() {
									$(this.DOM.buttons).css({
										'padding': '8px 15px'
									});
									$(this.DOM.title[0]).css('min-width', '380px')
								},
								okFun: function() {
									submitForm.ajax(url,num);
								},
								cancelFun: true
							});
						}
					}, 'jsonp');
				}else{
					submitForm.ajax(url,num);
				}
			}else{
				submitForm.ajax(url,num);
			}
			return false;
		}
	};

	//点击发布产品按钮
	$('.jsRlsBtn').on('click', function() {
		submitForm.init(1);
	});

	//点击返回上一步
	$('.jsBackBtn').on('click', function() {
		submitForm.init(2);
	});

	//点击预览产品
	$jsReviewBtn.on('click', function() {
		submitForm.init(3);
	});

	//点击保存草稿
	$('.jsScgBtn').on('click', function() {
		submitForm.init(4);
	});
});