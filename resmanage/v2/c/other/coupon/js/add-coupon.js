/*添加优惠券页面js*/
define(function(require, exports, module){
	var valid=require('v2/l/valid/js/valid.js');//表单验证插件
	var dialog=require('v2/m/dialog/js/init.js');//弹窗插件
	var isSubmit=false;

	//选择器
	var $use=$('#use');//优惠券用途文本框
	var $name=$('#name');//优惠券名称文本框
	var $bills=$('#bills');//优惠券面额文本框
	var $num=$('#num');//优惠券数量文本框
	var $cpntypeTd=$('.cpntype-tr').find('td');//优惠券类型td
	var $cpnType=$('input[name=cpnType]');//优惠券类型单选框
	var $sytjTr=$('.sytj-tr');//使用条件对应的tr
	var $condition=$('#condition');//使用条件文本框
	var $sender=$('input[name=sender]');//发券方单选框
	var $sellerUrl=$('#sellerUrl');//发送方处的商家旺铺地址
	var $senderTd=$('.sender-tr').find('td');//发券方td
	var $ffqdTd=$('.ffqd-tr').find('td');//发放渠道td
	var $cpnPwdTd=$('.cpnPwd-tr').find('td');//券密码td
	var $usepltTd=$('.useplt-tr').find('td');//使用平台处的td
	var $useRange=$('#useRange');//使用范围文本框
	var $ctgryBox=$('#ctgryBox');//使用范围处类目容器
	var $frstCtgry=$('#frstCtgry');//一级类目
	var $secCtgry=$('#secCtgry');//二级类目
	var $thrdCtgry=$('#thrdCtgry');//三级类目
	var $userangeTr=$('.userange-tr');//使用范围tr
	var $descBox=$('#descBox');//使用范围描述
	var $desc=$('#desc');//使用范围描述文本框
	var $startTime=$('#startTime');
	var $endTime=$('#endTime');
	
	//表单验证
	var validFrm=function(obj,isSmtValid){
		var isMust=true,
			nullTip='',
			errorTip='',
			regx=null,
			objId=obj.attr('id'),
			tipObj=obj.parent();
		switch(objId){
			case 'use':
			nullTip='请输入优惠券用途，30个字内';
			break;
			case 'name':
			nullTip='请输入优惠券名称，25个字内';
			break;
			case 'bills':
			nullTip='请输入优惠券面额，正整数且6位数内';
			break;
			case 'num':
			nullTip='请输入优惠券数量，正整数且5位数内';
			break;
			case 'condition':
			nullTip='请输入使用条件，正整数且6位数内';
			break;
			case 'sellerUrl':
			nullTip='请输入商家旺铺地址';
			break;
			case 'startTime':
			nullTip='请选择完整的有效期';
			break;
			case 'endTime':
			nullTip='请选择完整的有效期';
			break;
			case 'useRange':
			nullTip='请选择使用范围';
			break;
			case 'desc':
			nullTip='请用一句话描述使用范围，15字内';
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
	
	//弹窗公用函数
	var dialogFun={
		tip:function(msg, closeTime, callback){
			dialog({
				id: "cscTip",
				title: '提示信息',
				content: msg || '提示信息',
				icon: "csc-tip",
				time: closeTime || 1.5,
				fixed: true,
				lock:true,
				opacity:0,
				close: callback || null
			});
		}
	};
	
	//优惠券用途限制在30字内
	$use.on('keyup blur',function(){
		valid.subStrVal($(this),30);
	});
	
	//优惠券名称限制在30字内
	$name.on('keyup blur',function(){
		valid.subStrVal($(this),25);
	});
	
	//优惠券面额文本框限制为正整数且6位数内
	$bills.on('keyup blur',function(){
		var $this=$(this);
		var val=$this.val();
		$this.val(val.replace(/^0|\D/g,''));
		valid.subStrVal($this,6);
	});
	
	//优惠券数量文本框限制为正整数且5位数内
	$num.on('keyup blur',function(){
		var $this=$(this);
		var val=$this.val();
		$this.val(val.replace(/^0|\D/g,''));
		valid.subStrVal($this,5);
	});
	
	//使用条件文本框限制为正整数且6位数内
	$condition.on('keyup blur',function(){
		var $this=$(this);
		var val=$this.val();
		$this.val(val.replace(/^0|\D/g,''));
		valid.subStrVal($this,6);
	});
	
	//使用范围描述文本框限制在15字内
	$desc.on('keyup blur',function(){
		valid.subStrVal($(this),15);
	});
	
	//选择优惠券类型（当为代金券时需填写使用条件）
	$cpnType.on('change',function(){
		var id=$(this).attr('id');
		if(id==='voucher'){
			$sytjTr.show();
		}else{
			$sytjTr.hide();
		}
	});
	
	//选择发券方(当选择商家时需填写商家旺铺地址且使用范围处的类目不可选（直接隐藏掉）)
	$sender.on('change',function(){
		var id=$(this).attr('id');
		var $th1=$userangeTr.find('.th1');
		var $td1=$userangeTr.find('.td1');
		var $td2=$userangeTr.find('.td2');
		if(id==='seller'){
			$sellerUrl.show();
			$th1.hide();
			$td1.hide();
			$td2.attr('colspan',3);
		}else{
			$sellerUrl.hide();
			$th1.show();
			$td1.show();
			$td2.removeAttr('colspan');
		}
	});
	
	//有效日期
	require.async('js/My97DatePicker/4.8/buyoffer_WdatePicker', function(m) {
		$startTime.click(function(){
			WdatePicker({
				maxDate:'#F{$dp.$D(\'endTime\')}',
				readOnly:true,
				minDate:'%y-%M-%d'
			});
		});
		$endTime.click(function(){
			if($startTime.val()===""){
				dialogFun.tip('请先选择开始日期',3,function(){
					$endTime.blur();//结束日期失去焦点
				});
				return false;
			}
			WdatePicker({
				minDate:'#F{$dp.$D(\'startTime\')}',
				readOnly:true
			});
		});
	});
	
	//当使用平台选中的是所有平台时其他平台则不可以选，反之亦然
	$usepltTd.on('click','input[type=checkbox]',function(){
		var $this=$(this),
			$parent=$this.parent(),
			$chked=$usepltTd.find('input[type=checkbox]'),
			id=$this.attr('id');
		if($this.is(':checked')&&id==='allPlt'){
			$parent.siblings('label').find('input[type=checkbox]').prop('checked',false).attr('disabled',true);
		}else{
			$chked.attr('disabled',false);
		}
	});
	
	
	//点击使用范围文本框显示类目
	$useRange.on('click',function(){
		$ctgryBox.show();
		return false;
	});
	$('#ctgryBox').on('click',function(){
		event.stopPropagation();
	});
	$(document).on('click',function(){
		$ctgryBox.hide();
	});
	
	
	var catArry=[];//用于存放类目选中项的文本此文本将直接赋给使用范围文本框的值
	
	//选择一级类目
	$frstCtgry.on('click','input[type=checkbox]',function(){
		var $this=$(this),
			$li=$this.parents('li:first'),
			$checkbox=$frstCtgry.find('input[name^=frstCtgry]'),
			$checked=$frstCtgry.find('input[name^=frstCtgry]:checked'),
			id=$this.attr('id'),
			arry=[],
			frstArry=[],
			secHtml='';
		
		$frstCtgry.siblings('.ctgry-itm').html('').hide();//二三级类目制空及隐藏
		
		if($this.is(':checked')&&id==='allCtgry'){//当选中全品类时
			arry.push($this.siblings('label').html());
			$checkbox.prop('checked',false).attr('disabled',true);
		}else{
			$checkbox.attr('disabled',false);
			
			//循环一级分类选中项
			$checked.each(function(){
				var $this=$(this);
				arry.push($this.siblings('label').html());
				frstArry.push($this.val());
			});
			
			//只有当选择了一级级分类且非全品类后，才根据选中的一级分类请求获取二级分类
			if(arry.length>0){
				$.get('coupon.getLeafCategoryList',{frstArry:frstArry},function(data){
					var secLst=data.level2CategoryList;
					//只有当请求返回的结果有二级分类才会显示二级分类容器
					if(secLst){
						$.each(secLst,function(i,n){
							secHtml+='<li><input id="secCtgry'+i+'" name="secCtgry[]" type="checkbox" value="'+secLst[i].categoryId+'" data-parentxt="'+secLst[i].parentCategoryName+'"> <label for="secCtgry'+i+'">'+secLst[i].categoryName+'</label></li>';
						});
						$secCtgry.html(secHtml).show();
					}else{
						$secCtgry.html('').hide();
					}
				},'jsonp');
			}else{
				$secCtgry.html('').hide();
			}
		}
		catArry=arry;
		$useRange.val(catArry.join(" , "));
	});
	
	//选择二级类目
	$secCtgry.on('click','input[type=checkbox]',function(){
		var $this=$(this),
			$checked=$secCtgry.find('input[type=checkbox]:checked'),//二级分类选中项
			arry=[],//用于存放二级分类选中项的文本
			secArry=[],//用于存放二级分类选中项的id
			$frstChkd=$frstCtgry.find('input[name^=frstCtgry]:checked'),//一级类目选中项
			frstTxt=[],//用来存放一级类目选中项对应的文本
			parents=[],//用来存放一级分类中对应的二级分类未选中的一级分类
			thrdHtml='';//三级分类的html
		
		//循环一级类目选中项
		$frstChkd.each(function(){
			var $this=$(this),
				id=$this.val(),
				txt=$this.siblings('label').html();
			frstTxt.push(txt);
		});

		//循环二级分类选中项	
		$checked.each(function(){
			var $this=$(this),
				id=$this.val(),
				parentxt=$this.attr('data-parentxt'),
				txt=$this.siblings('label').html();
				
			secArry.push(id);
			
			arry.push(txt);
			
			//排除被选中的二级分类的对应一级分类
			parents=$.map( frstTxt, function(n){
			  return n ===parentxt ? null : n;
			});

		});
		
		//只有当选择了二级级分类后，才根据选中的二级分类请求获取三级分类
		if(arry.length>0){
			$.get('coupon.getLeafCategoryList',{secArry:secArry},function(data){
				var thrdLst=data.level3CategoryList;
				if(thrdLst.length>0){
					$.each(thrdLst,function(i,n){
						thrdHtml+='<li><input id="thrdCtgry'+i+'" name="thrdCtgry[]" type="checkbox" value="'+thrdLst[i].categoryId+'" data-parentxt="'+thrdLst[i].parentCategoryName+'"> <label for="thrdCtgry'+i+'">'+thrdLst[i].categoryName+'</label></li>';
					});
					$thrdCtgry.html(thrdHtml).show();
				}else{
					$thrdCtgry.html('').hide();
				}
				
				catArry=$.merge(parents,arry);
				$useRange.val(catArry.join(" , "));
				
			},'jsonp');
		}else{
			$thrdCtgry.html('').hide();
			catArry=frstTxt;
			$useRange.val(catArry.join(" , "));
		}
	});	
	
	//选择三级类目
	$thrdCtgry.on('click','input[type=checkbox]',function(){
		var $this=$(this),
			$checked=$thrdCtgry.find('input[type=checkbox]:checked'),
			arry=[],
			parents=[];
		$checked.each(function(){
			var $this=$(this),
				id=$this.val(),
				parentxt=$this.attr('data-parentxt'),
				txt=$this.siblings('label').html();
			
			arry.push(txt);
			
			//排除被选中的二级分类的对应一级分类
			parents=$.map( catArry, function(n){
			  return n ===parentxt ? null : n;
			});

		});
		
		if(arry.length>0){
			$useRange.val($.merge(parents,arry).join(" , "));
		}else{
			$useRange.val(catArry.join(" , "));	
		}
	});	
	
	
	//点击提交优惠券
	$('#addCpnFrm').on('submit',function(){
		var $form=$(this);
		var $usePltChckd=$('input[name^=usePlt]:checked');//使用平台单选框选中项
		var $cpnPwdChckd=$('input[name=cpnPwd]:checked');//券密码单选框选中项
		var $ffqdChckd=$('input[name=ffqd]:checked');//发放渠道单选框选中项
		var $sndrChckd=$('input[name=sender]:checked');//发券方单选框选中项
		var $typeChckd=$('input[name=cpnType]:checked');//优惠券类型单选框选中项
		var	arry=[];
		
		if($useRange.is(':visible')){
			arry.push(validFrm($useRange,1));//使用范围验证
		}
		arry.push(validFrm($desc),1);//使用范围处的描述验证
		
		//使用平台验证
		if($usePltChckd.length<1){
			valid.errorTip($usepltTd,'请选择使用平台');
			arry.push(false);
		}else{
			$usepltTd.find('.valid-error').remove();
			arry.push(true);
		}
		
		//有效期验证
		arry.push(validFrm($endTime,1));
		arry.push(validFrm($startTime,1));
		
		//券密码验证
		if($cpnPwdChckd.length<1){
			valid.errorTip($cpnPwdTd,'请选择券密码');
			arry.push(false);
		}else{
			$cpnPwdTd.find('.valid-error').remove();
		}
		
		//发放渠道验证
		if($ffqdChckd.length<1){
			valid.errorTip($ffqdTd,'请选择发放渠道');
			arry.push(false);
		}else{
			$ffqdTd.find('.valid-error').remove();
		}
		
		//发送方验证
		if($sndrChckd.length<1){
			valid.errorTip($senderTd,'请选择发券方');
			arry.push(false);
		}else{
			$senderTd.find('.valid-error').remove();
		}
		
		//旺铺地址验证
		if($('#seller').is(':checked')){
			arry.push(validFrm($sellerUrl),1);
		}
		
		//优惠券类型验证
		if($typeChckd.length<1){
			valid.errorTip($cpntypeTd,'请选择优惠券类型');
			arry.push(false);
		}else{
			$cpntypeTd.find('.valid-error').remove();
		}
		
		//使用条件文本框验证
		if($('#voucher').is(':checked')){
			arry.push(validFrm($condition),1);
		}
		
		arry.push(validFrm($num,1));//优惠券数量验证
		arry.push(validFrm($bills),1);//优惠券面额验证
		arry.push(validFrm($name,1));//优惠券名称验证
		arry.push(validFrm($use),1);//优惠券用途验证
		
		//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
		if ($.inArray(false, arry) >= 0) {
			return false;
		}
		
		//当所有表单都验证通过后执行下面的代码
		
		var cpnTypeVal=$typeChckd.val();
		var cpnTypeTxt=(cpnTypeVal=='d')?'代金券':'现金券';
		var sytjHtml=(cpnTypeVal=='d')?'<tr><th>使用条件：</th><td>单笔订单满'+$condition.val()+'元可用</td></tr>':'';
		var senderVal=$sndrChckd.val();
		var senderTxt=(senderVal=='csc')?'华南城网':'商家'+$sellerUrl.val();
		var fsqdVal=$ffqdChckd.val();
		var fsqdTxt=(fsqdVal=='online')?'在线领取':'线下派发';
		var cpnPwdVal=$cpnPwdChckd.val();
		var cpnPwdTxt=(cpnPwdVal=='N')?'无密码':'自动生成密码';
		var usePltArry=[];
		var syfwHtml=(senderVal=='csc')?'<tr><th>使用范围：</th><td>'+$useRange.val()+'</td></tr>':'';
		
		$usePltChckd.each(function(){
			usePltArry.push($(this).parent().find('span').html());
		});

		var html='<table class="m-lrtbl m-tbl-vtop">'+
					'<colgroup>'+
						'<col width="100" />'+
						'<col width="500" />'+
					'</colgroup>'+
					'<tbody>'+
						'<tr>'+
							'<th>券用途：</th>'+
							'<td>'+$use.val()+'</td>'+
						'</tr>'+
						'<tr>'+
							'<th>券名称：</th>'+
							'<td>'+$name.val()+'</td>'+
						'</tr>'+
						'<tr>'+
							'<th>券面额：</th>'+
							'<td>'+$bills.val()+'.00元</td>'+
						'</tr>'+
						'<tr>'+
							'<th>券数量：</th>'+
							'<td>'+$num.val()+'张</td>'+
						'</tr>'+
						'<tr>'+
							'<th>券类型：</th>'+
							'<td>'+cpnTypeTxt+'</td>'+
						'</tr>'+
						sytjHtml+
						'<tr>'+
							'<th>发券方：</th>'+
							'<td>'+senderTxt+'</td>'+
						'</tr>'+
						'<tr>'+
							'<th>发放渠道：</th>'+
							'<td>'+fsqdTxt+'</td>'+
						'</tr>'+
						'<tr>'+
							'<th>券密码：</th>'+
							'<td>'+cpnPwdTxt+'</td>'+
						'</tr>'+
						'<tr>'+
							'<th>有效期：</th>'+
							'<td>'+$startTime.val()+'至'+$endTime.val()+'</td>'+
						'</tr>'+
						'<tr>'+
							'<th>使用平台：</th>'+
							'<td>'+usePltArry.join(" ")+'</td>'+
						'</tr>'+
						syfwHtml+
						'<tr>'+
							'<th>描述：</th>'+
							'<td>'+$desc.val()+'</td>'+
						'</tr>'+
					'</tbody>'+
				'</table>'+
				'<div class="g-t-c g-mt5"><a id="qrbSmt" class="u-qgray-abtn g-mr30" href="">确认并提交</a><a id="backBtn" class="u-qgray-abtn" href="">返回修改</a></div>';
		var dg=dialog({
			title:'确认优惠券信息',
			content:html,
			fixed:true,
			lock:true,
			opacity:0.2,
			padding:'0 15px 15px',
			close:function(){
				isSubmit=false;
			},
			init:function(){
				var $qrbSmt=$('#qrbSmt');
				//确认并提交
				$qrbSmt.on('click',function(){
					//阻止表单重复请求
					if(isSubmit===true){return false;}
					$qrbSmt.html('提交中...').css('cursor','not-allowed');
					isSubmit=true;
					
					//ajax请求
					$.ajax({
						url:$form.attr('action'),
						data:$form.serializeArray(),
						type:"post",
						dataType:"jsonp",
						success:function(data){
							var msg=data.msg
							if(data.success){
								dialogFun.tip(msg,3,function(){
									window.location.href=data.url;
								});
							}else{
								dialogFun.tip(msg,3);
							}
							$qrbSmt.html('确认并提交').css('cursor','pointer');
							isSubmit=false;
						},
						error:function(){
							dialogFun.tip('提交失败，请重试！',3);
							$qrbSmt.html('确认并提交').css('cursor','pointer');
							isSubmit=false;
						}
					});
					
					return false;
				});
				
				//返回修改
				$('#backBtn').on('click',function(){
					dg.close();
					isSubmit=false;
					return false;
				});
			}
		});
		
		return false;
	});
	
});