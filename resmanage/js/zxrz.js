seajs.config({
    alias: {
        'placeholder': 'm/sea-modules/placeholder.js',
		'top':'m/newtopnav/js/init.js',
		'valid':'l/valid/js/valid.js'
    }
});
define(function(require, exports, module) {
	require('//res.csc86.com/f=v2/l/jqueryfileupload/js/vendor/jquery.ui.widget.js,v2/l/jqueryfileupload/js/jquery.iframe-transport.js,v2/l/jqueryfileupload/js/jquery.fileupload.js');//上传图片插件
	var valid=require('valid');
	require('top');
	require('c/member/common/js/alertDialog');//弹窗
	var isSubmit=false;
	var telRegx=/^((\d{3}|0\d{2,3})\-?)?[1-9]\d{5,7}$/;//电话号码正则
	var	phoneRegx=/^1\d{10}$/;//手机号码正则
	
	
		$('.jsUploadBtn').each(function(){
		var id=$(this).attr('id');
		new SWFUpload(uploadSettings({
			type:"androidPhoto",
			button_placeholder_id:id,
			button_action:SWFUpload.BUTTON_ACTION.SELECT_FILES,
			file_types: "*.jpg;*.jpeg;",
			file_size_limit : "2MB",
			file_upload_limit : 0,
			button_text_left_padding:16,
			button_text:"点击上传",
			upload_success_handler:function(file, serverData){
				var response =  eval('(' + serverData + ')');
				if(response.result != "success"){
					var msg = response.msg || "上传失败!";
					csc.useDialog(function (){
						csc.alert(msg);
					})
					return;
				} else {
					var url=csc.url("img",response.key),arr=file.id.split("_"),id=Number(arr[1]);
					var $th=$('#SWFUpload_'+id);
					$th.after("<div class='after'></div>");
					//$th.siblings(".imgshow").children("img").attr("src",url);
					var $imgshow=$th.siblings(".imgshow");
					$imgshow.find(".noimg").remove();
					$imgshow.append("<a class=yimg><img  src="+url+file.type+"><p><b class=b1></b><b class=b2></b></p></a>");
					var key=response.key.replace(/\//,"")+file.type;
					var $links = $th.siblings(".imglink");
				    $links.attr("value").length>0?$links.attr("value",$links.attr("value")+";;;"+key):$links.attr("value",key);
					$th.parent().find(".ts1,.ts2").hide();
				}
			}
		}));
	});
	
	$(".imgshow").on("mouseover",".yimg",function(){
		var $this=$(this);
		$this.find("p").css("display","block");
		});
		
		$(".imgshow").on("mouseout",".yimg",function(){
		var $this=$(this);
		$this.find("p").css("display","none");
		});	
		
	
	$(".imgshow").on("click",".b2",function(){
		var $this=$(this);
		var $yimg=$this.parents(".yimg");
		var $links = $yimg.parent().siblings(".imglink");
		var $imgsrc=$yimg.find("img").attr("src");
		$imgsrc=$imgsrc.replace(/http:\/\/img.csc86.com\//g,"").replace(/\?.*/g,"");
		var regExp=new RegExp($imgsrc,"g");
		var regExp2=new RegExp($imgsrc+";;;","g");
		var result= regExp2.test($links.attr("value"));
		var linkval = result?$links.attr("value").replace(regExp2,""):$links.attr("value").replace(regExp,"");
		linkval=linkval.replace(/;;;$/g,"");
		$links.attr("value",linkval);
		$yimg.remove();
		});
		
	$(".imgshow").on("click",".b1",function(){
		var $this=$(this);
		var $yimg=$this.parents(".yimg");
		var $img=$yimg.find("img");
		var $imgsrc=$yimg.find("img").attr("src");
		$imgsrc=$imgsrc.replace(/(\?.*)/,"");
		var now=new Date().getTime();
		$img.attr("src",$imgsrc+"?"+now);
		});		
		
	var applyZxjy={
		/*图片上传*/
		upload:function(){
			var loading;
			$('.jsLogoUpld').each(function(){
				var $this=$(this),
					$prvwBox=$this.parents('.upld-box:first').find('.prvw-box');
					//console.log($("<p>").append($prvwBox.clone()).html());
				$this.fileupload({
					dataType:'json',
					formData:function(){//指定上传的参数
						var dataObj={"Filedata":$this.val()};
						//console.log(dataObj);
						return dataObj;
					},
					progressall:function(e,data){
						loading=artDialog.loading('图片正在上传中，请稍后...');
					},
					add:function(e,data){
						var fileInfo=data.files[0],
							regx=/(\.|\/)(jpe?g|png)$/i,
							fileName=fileInfo.name,
							fileSize=fileInfo.size;
							console.log(fileInfo);
						if(!regx.test(fileName)){
							$.tip({
								content:'仅支持jpg、png格式图片，请选择正确的图片格式！',
								closeTime:3
							});
							return false;
						}else{
							if(fileSize>1024*1024*2){
								$.tip({
									content:'图片大小不得超过2M！',
									closeTime:3
								});
								return false;
							}else{
								data.submit();
							}
						}
					},
					done:function(e,data){
						art.dialog({id:"cscLoading"}).close();
						var result = data.result,
							msg=result.msg;
						if(result.status==='1'){
							$prvwBox.find('img').attr('src','//img.csc86.com'+result.key);
							$prvwBox.find('input[type=hidden]').val(result.key);
						}else{
							$.tip({
								content:msg?msg:'上传失败，请稍后重试！',
								closeTime:3
							});
						}
					},
					fail:function(e,data){
						art.dialog({id:"cscLoading"}).close();
						$.tip({
							content:'上传失败，请稍后重试！',
							closeTime:3
						});
					}
				});
			});
		},
		//ajax提交公用函数
		ajaxFun:function(obj,num){//num 下一步 1  上一步 2 保存 3
			if(isSubmit===true){return false;}//阻止表单重复提交
			isSubmit=true;
			
			var href=location.href;
			var url='';
			if(/\?/.test(location.href)){
				url=location.search?href+'&isSubmit='+num:href+'isSubmit='+num;
			}else{
				url=location.search?href+'&isSubmit='+num:href+'?isSubmit='+num;
			}
			$.post(url,obj.serializeArray(),function(data){
				var status=data.status,
					msg=data.msg;
				if(status==='-1'){
					$.tip({
						content:error,
						closeTime: 2,
						closeCallback:function(){
							location.href = "//login.csc86.com/?done=" + encodeURIComponent(location.href);
						}
					});
				}
				else if(status==='0'){
					if(typeof(error)==='object'){
						$.each(error, function(i, n){
							$.tip({
								content:n,
								closeTime:2
							});
						});
					}else{
						$.tip({
							content:error,
							closeTime:2
						});
					}
				}
				else{
					location.href=data.url;
				}
				isSubmit=false;
			},'jsonp');
		},
		/*企业基本资料*/
		step1:function(){
			//选择器
			var $jd=$('#jd'),//经度
			    $wd=$('#wd'),//纬度
				$ad=$('#ad'),//地址
				$mj=$('#mj'),//面积
				$qztime=$('#qztime'),//取证时间
				$zltime=$('#zltime'),//取证时间
				$cdtime=$('#cdtime'),//取证时间
				$cmpnyFr=$('#cmpnyFr'),//企业法人
				$tel=$('#tel'),//联系电话
				$phone=$('#phone'),//手机号
				$phoneTd=$phone.parents('td:first'),
				$cardImg=$('#cardImg'),//法人身份证正面
				$zzimg=$('#zzimg'),//资质证照图片
				$cardImgBack=$('#cardImgBack'),//法人身份证反面
				$licenseImgUrl=$('#licenseImgUrl');//营业执照扫描件
				
			//表单验证
			var validFrm=function(obj,isSmtValid){
				var isMust=true,
					nullTip='',
					errorTip='',
					regx=null,
					objId=obj.attr('id'),
					tipObj=obj.parent();
				switch(objId){
					case 'jd':
					nullTip='请输入GPS经度';
					break;
					case 'wd':
					nullTip='请输入GPS纬度';
					break;
					case 'ad':
					nullTip='请输入地址';
					break;
					case 'mj':
					nullTip='请输入面积';
					break;
					case 'qztime':
					nullTip='请输入取证时间';
					break;
					case 'zltime':
					nullTip='请输入租凭开始时间';
					break;
					case 'cdtime':
					nullTip='请输入租凭有效期';
					break;
					case 'cardImg':
					nullTip='请上传资质证照图片';
					tipObj=obj.parents('upld-box:first');
					break;
					case 'cardImgBack':
					nullTip='请上传法人身份证反面图片';
					tipObj=obj.parents('li:first');
					break;
					case 'licenseImgUrl':
					nullTip='请上传营业执照扫描件';
					tipObj=obj.parents('td:first');
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
			
			//手机号码和电话号码失去焦点公用验证函数
			var validTelPhone=function(isSmtValid){
				var telVal=$.trim($tel.val()),
					phoneVal=$.trim($phone.val()),
					telPass=false,
					phonePass=false;
				if(!telVal&&!phoneVal){
					$tel.addClass('frm-error');
					$phone.addClass('frm-error');
					valid.errorTip($phoneTd,'联系电话和手机号至少填写一个');
					if(isSmtValid===1){
						$tel.focus();
					}
					return false;
				}
				if(telVal&&!phoneVal){
					if(!telRegx.test(telVal)){
						$tel.addClass('frm-error');
						$phone.addClass('frm-error');
						valid.errorTip($phoneTd,'请输入正确格式的联系电话或手机号码');
						if(isSmtValid===1){
							$tel.focus();
						}
						return false;
					}else{
						telPass=true;
					}
				}
				if(!telVal&&phoneVal){
					if(!phoneRegx.test(phoneVal)){
						$tel.addClass('frm-error');
						$phone.addClass('frm-error');
						valid.errorTip($phoneTd,'请输入正确格式的联系电话或手机号码');
						if(isSmtValid===1){
							$phone.focus();
						}
						return false;
					}else{
						phonePass=true;
					}
				}
				if(telVal&&phoneVal){
					if(!phoneRegx.test(phoneVal)||!telRegx.test(telVal)){
						$tel.addClass('frm-error');
						$phone.addClass('frm-error');
						valid.errorTip($phoneTd,'请输入正确格式的联系电话或手机号码');
						if(telRegx.test(telVal)&&!phoneRegx.test(phoneVal)){
							if(isSmtValid===1){
								$phone.focus();
							}
						}
						if(!telRegx.test(telVal)&&phoneRegx.test(phoneVal)){
							if(isSmtValid===1){
								$tel.focus();
							}
						}
						if(!telRegx.test(telVal)&&!phoneRegx.test(phoneVal)){
							if(isSmtValid===1){
								$tel.focus();
							}
						}
						return false;
					}else{
						telPass=true;
						phonePass=true;
					}
				}
				if(telPass||phonePass){
					$tel.removeClass('frm-error');
					$phone.removeClass('frm-error');
					$phoneTd.find('.valid-error').remove();
					return true;
				}else{
					return false;
				}
			};
			
			$jd.on('blur',function(){
				validFrm($(this),0);
			});
			$wd.on('blur',function(){
				validFrm($(this),0);
			});
			$ad.on('blur',function(){
				validFrm($(this),0);
			});
			$mj.on('blur',function(){
				validFrm($(this),0);
			});
			$qztime.on('blur',function(){
				validFrm($(this),0);
			});
			$zltime.on('blur',function(){
				validFrm($(this),0);
			});
			$cdtime.on('blur',function(){
				validFrm($(this),0);
			});
			
			//上传图片
			//applyZxjy.upload();
			
			
			//保存并下一步
			$('.jsApplyFrm1').on('submit',function(){
				
				var $this=$(this),
					arry=[];
				$this.find(".tj").attr("disabled",true);	
				arry.push(validFrm($jd,1));		
				arry.push(validFrm($wd,1));	
				arry.push(validFrm($ad,1));	
				arry.push(validFrm($mj,1));	
				arry.push(validFrm($qztime,1));	
				arry.push(validFrm($zltime,1));	
				arry.push(validFrm($cdtime,1));	
				
				$(".imgup").each(function() {
                    var $this=$(this);
					arry.push(validFrm($this,1));
                });	
				//arry.push(validFrm($zzimg,1));//营业执照扫描件验证
				//console.log(arry);
				//arry.push(validFrm($cardImgBack,1));//传法人身份证反面验证
				//arry.push(validFrm($cardImg,1));//传法人身份证正面验证
				//arry.push(validTelPhone(1));//手机号码和电话号码验证
				//arry.push(validFrm($cmpnyFr,1));//企业法人验证
				//arry.push(validFrm($cmpnyName,1));//企业名称验证
				
				//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
				if ($.inArray(false, arry) >= 0) {
					$this.find(".tj").attr("disabled",false);
					return false;
				}
				
				//ajax提交
				//applyZxjy.ajaxFun($this,1);
				
				//return false;
			});		
		},
		/*申请人认证*/
		step2:function(){
			//选择器
			var	$jsApplyFrm2=$('.jsApplyFrm2'),//表单form
			    $sqrName=$('#sqrName'),//申请人姓名
				$sqrBm=$('#sqrBm'),//申请人部门
				$sqrZw=$('#sqrZw'),//申请人职位
				$tel=$('#tel'),//固定电话
				$phone=$('#phone'),//手机号码
				$sfz=$('#applyCardImg'),//申请人身份证
				$sqzs=$('#authorizationImg'),//授权书扫描件
				$cscWlTk=$('#cscWlTk'),//华南城网在线交易服务协议复选框
				$cscWltkTd=$cscWlTk.parent(),
				$phone2=$('#phone2'),//联系手机
				$email=$('#email');//联系邮箱
				
			//表单验证
			var validFrm=function(obj,isSmtValid){
				var isMust=true,
					nullTip='',
					errorTip='',
					regx=null,
					objId=obj.attr('id'),
					tipObj=obj.parent();
				switch(objId){
					case 'sqrName':
					nullTip='请输入申请人姓名';
					break;
					case 'sqrBm':
					nullTip='请输入申请人部门';
					break;
					case 'sqrZw':
					nullTip='请输入申请人职位';
					break;
					case 'tel':
					isMust=false;
					errorTip='请输入正确格式的固定电话';
					regx=telRegx;
					break;
					case 'phone':
					nullTip='请输入手机号';
					errorTip='请输入正确格式的手机号';
					regx=phoneRegx;
					break;
					case 'applyCardImg':
					nullTip='请上传申请人身份证';
					tipObj=obj.parents('td:first');
					break;
					case 'authorizationImg':
					nullTip='请上传授权书扫描件';
					tipObj=obj.parents('td:first');
					break;
					case 'phone2':
					nullTip='请输入手机号';
					errorTip='请输入正确格式的手机号';
					regx=phoneRegx;
					break;
					case 'email':
					isMust=false;
					errorTip='请输入正确格式的联系邮箱';
					regx=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
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
			
			//tab切换
			$('.jsUcTab').on('click','li',function(){
				var $this=$(this),
					$applyTabc=$('.apply-tabc');
					index=$(this).index();
				$this.addClass('cur').siblings().removeClass('cur');
				$applyTabc.eq(index).removeClass('g-dn').siblings('.apply-tabc').addClass('g-dn');
				$('#applyType').val(index+1);
			});
			
			//申请人姓名失去焦点验证
			$sqrName.on('blur',function(){
				validFrm($(this),0);
			});
			
			//申请人部门失去焦点验证
			$sqrBm.on('blur',function(){
				validFrm($(this),0);
			});
			
			//申请人职位失去焦点验证
			$sqrZw.on('blur',function(){
				validFrm($(this),0);
			});
			
			//固定电话失去焦点验证
			$tel.on('blur',function(){
				validFrm($(this),0);
			});
			
			//手机号码失去焦点验证
			$phone.on('blur',function(){
				validFrm($(this),0);
			});
			
			//联系手机失去焦点验证
			$phone2.on('blur',function(){
				validFrm($(this),0);
			});
			
			//联系邮箱失去焦点验证
			$email.on('blur',function(){
				validFrm($(this),0);
			});
			
			//华南城网在线交易服务协议复选失去实时验证
			$cscWlTk.on('click',function(){
				if(!$(this).is(':checked')){
					valid.errorTip($cscWltkTd,'请先阅读并同意《华南城网在线交易服务协议》');
				}else{
					$cscWltkTd.find('.valid-error').remove();
				}
			});
			
			//上传图片
			applyZxjy.upload();
			
			//提交
			$jsApplyFrm2.on('submit',function(){
				var $this=$(this),
					$dlrApply=$('.dlr-apply'),
					$frApply=$('.fr-apply'),
					arry=[];
				
				//华南城网在线交易服务协议复选验证
				if(!$cscWlTk.is(':checked')){
					valid.errorTip($cscWltkTd,'请先阅读并同意《华南城网在线交易服务协议》');
					arry.push(false);
					$cscWlTk.focus();
				}else{
					$cscWltkTd.find('.valid-error').remove();
				}
					
				//代理人申请处的表单验证
				if($dlrApply.is(':visible')){
					arry.push(validFrm($sqzs,1));//授权书扫描件验证
					arry.push(validFrm($sfz,1));//申请人身份证验证
					arry.push(validFrm($phone,1));//手机号码验证
					arry.push(validFrm($tel,1));//固定电话验证
					arry.push(validFrm($sqrZw,1));//申请人职位验证
					arry.push(validFrm($sqrBm,1));//申请人部门验证
					arry.push(validFrm($sqrName,1));//申请人姓名验证
				}
				
				//法人申请处的表单验证
				if($frApply.is(':visible')){
					arry.push(validFrm($phone2,1));//联系手机验证
					arry.push(validFrm($email,1));//联系邮箱验证
				}
				
				//当arry中包含false时，说明有表单项未填写或者填写的不规范，此时不让表单提交
				if ($.inArray(false, arry) >= 0) {
					return false;
				}
				
				//ajax提交
				applyZxjy.ajaxFun($this,3);
				return false;
			});
			
			//返回上一步
			$('.jsBackBtn').on('click',function(){
				applyZxjy.ajaxFun($jsApplyFrm2,2);
			});
		}
	}
	module.exports=applyZxjy;
});