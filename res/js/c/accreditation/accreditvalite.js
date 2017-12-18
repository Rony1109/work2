(function(win){
	var csc = win.csc||{},Numfont = /^[0-9a-zA-Z]+$/,regNum=/^\d+$/,earmreg=/^0\d{2,3}$/,telephone=/^\d{4,8}$/,regtele=/^1\d{10}$/,regName = /^([A-Za-z]|[\u4e00-\u9fa5])+$/,desName = /^([A-Za-z,，。、():;,.《》]|[\u4e00-\u9fa5])+$/,mgName = /^([A-Za-z0-9]|[\u4e00-\u9fa5])+$/,chinese =/^[\u4e00-\u9fa5]+$/;
	var credit={};
	
	var _tips = function(adress,msg,id) {
		$("#"+adress).html(msg).show();
		$("#"+id).focus().select().keydown(function(){
			$("#"+adress).hide();
		}).change(function(){
			$("#"+adress).hide();
		});
		return false;
	};
	function _hide(id){
		$(id).focus();
	}
	function getStrByteLen(str){
		return str.replace(/[^\x00-\xff]/ig,'**');
	}

	function infovalite($applicant,$department,$account,$phone,$areacode,$telephone,img0,img1){
		if(!$applicant){
			return  _tips("applicanttips","请输入申请人的姓名","applicant");
		}else if($applicant&&!chinese.test($applicant)){
			return  _tips("applicanttips","请输入汉字","applicant");
		}else if($applicant&&$applicant.length>12){
			return  _tips("applicanttips","申请人不能超过12个字","applicant");
		}else if(!$department){
			return  _tips("departmenttips","请输入申请人部门的名称","department");
		}else if($department&&regNum.test($department)){
			return  _tips("departmenttips","申请人部门不能全部为数字","department");
		}else if($department&&!mgName.test($department)){
			return  _tips("departmenttips","申请人部门必须为中文、英文、数字","department");
		}else if($department&&$department.length>20){
			return  _tips("departmenttips","申请人部门不能超过20个字","department");
		}else if(!$account){
			return  _tips("accounttips","请输入申请人的职位","account");
		}else if($account&&!regName.test($account)){
			return  _tips("accounttips","申请人职位必须为汉字、英文","account");
		}else if($account&&$account.length>20){
			return  _tips("accounttips","申请人职位不能超过20个字","account");
		}else if(!$areacode && false){
			return  _tips("teletips","请输入区号！","telephoneAreaCode");
		}else if($areacode&&!earmreg.test($areacode)){
			return  _tips("teletips","区号格式不对","telephoneAreaCode");
		}else if(!$telephone && false){
			return  _tips("teletips","请输入电话号码","telephone");
		}else if($telephone&&!telephone.test($telephone)){
			return  _tips("teletips","电话号码格式不对","telephone");
		}else if($phone&&!regtele.test($phone)){
			return  _tips("phonetips","手机号码格式不正确","phone");
		} else if ( !$phone && !$telephone ) {
			return  _tips("phonetips","请输入固定电话或者手机号码","phone");
		} else if ( $telephone && !$areacode ) {
			return  _tips("teletips","请输入区号！","telephoneAreaCode");
		}

		if($.trim(img0.val()).length<12){
			return  _tips("phototips0","请上传您的身份证正面照片","");
		}else if($.trim(img1.val()).length<12){
			return  _tips("phototips1","请上传您的身份证反面照片","");
		}

	}

	credit.enterCheck = function(){
		$("#n-txt").bind('blur', function() {
		 	var $comName=$.trim($("#n-txt").val())
			if(!$comName){
				return  _tips("comNametips","企业名称不能为空","n-txt");
			}/*else if($comName&&!regName.test($comName)){
				return  _tips("comNametips","请输入中文或者字母哈1","n-txt");
			}*/else if($comName&&$comName.length>40){
				return _tips("comNametips","企业名称不能超过40个字","n-txt");
			}else{
				$.post(csc.url("api","/member/checkcompany.html"),{"companyName":$(this).val(),"id":$(this).parent().attr("id")},function(data){
						if(data.status){
							$("#status").val(data.status);
							$("#comNametips").html(data.data.msg||"").show().removeClass("g-f-success");
						}else{
							$("#status").val("");
							$("#comNametips").html(data.data.msg||"").addClass("g-f-success").show().parent().addClass("g-f-success");
						}
				   },"jsonp");
			}
		}).keydown(function(){
			 $("#comNametips").hide().removeClass("g-f-success");
		});
	}
	credit.enterfirst=function(){
		var $comName=$.trim($("#n-txt").val()),$licenseval = $.trim( $("#licenseNum").val()),$licenseadress = $("#province").find("option:selected").text(),$city = $("#city").find("option:selected").text(),$registerment = $.trim($("#register-ment").val()),$periodtime = $.trim($("#periodtime").val()),$statutory = $.trim($("#statutory").val()),img0=$("#imgurl00");
		if(!$comName){
			return  _tips("comNametips","企业名称不能为空","n-txt");
		}/*else if($comName&&!regName.test($comName)){
			return  _tips("comNametips","请输入中文或者字母哈哈2","n-txt");
		}*/else if($comName&&$comName.length>40){
			return _tips("comNametips","企业名称不能超过40个字","n-txt");
		}else if($("#status").val()){
			_hide("#n-txt");
			return _tips("userNametips","您的公司名称已被注册，请更换","userName");
		}else	if(!$licenseval){
			return  _tips("licenseNumtips","营业执照注册号不能为空","licenseNum");
		}else if($licenseval&&!Numfont.test($licenseval)){
			return  _tips("licenseNumtips","请输入数字或者字母","licenseNum");
		}else if($licenseval && !($licenseval.length == 18 || $licenseval.length == 15)){
			return  _tips("licenseNumtips","营业执照注册号为15或18个字","licenseNum");
		}else if($licenseadress==="请选择省"){
			return  _tips("licenseadretips","请选择省","");
		}else if($city==="请选择市"){
			return  _tips("licenseadretips","请选择市","");
		}else if(!$periodtime){
			return  _tips("periodtips","营业期限不能空","");
		}else if(!$registerment){
			return  _tips("registertips","登记机关不可为空","register-ment");
		}else if($registerment&&!regName.test($registerment)){
			return  _tips("registertips","请输入汉字或者字母","register-ment");
		}else if($registerment&&$registerment.length>20){
			return  _tips("registertips","登记机关不能超过20个字","register-ment");
		}else if(!$statutory){
			return  _tips("statutorytips","法定代表不能为空","statutory");
		}
		/*else if($statutory&&!chinese.test($statutory)){
			return  _tips("statutorytips","请输入汉字","statutory");
		}*/
		else if($statutory&&$statutory.length>60){
			return  _tips("statutorytips","法定代表不能超过60个字","statutory");
		}else if($.trim(img0.val()).length<12){
			return  _tips("phototips0","仅支持jpg,png,gif格式图片，大小3M以内,确保图片清晰","");
		}
	}

	credit.entersecond=function(){
		var $sphere =$.trim($("#sphere").val()),$periodtime = $.trim($("#periodtime").val()),$applicant = $.trim($("#applicant").val()),$department = $.trim($("#department").val()),$account = $.trim($("#account").val()),$phone = $.trim($("#phone").val()),img0=$("#imgurl00"),img1=$("#imgurl01");
		if(!$sphere){
			return  _tips("spheretips","经营范围不可为空","sphere");
		}else if($sphere&&!desName.test($sphere)){
			return  _tips("spheretips","请输入中文、字母和特殊字符只包括(,。、():;《》)","sphere");
		}else if($sphere&&$sphere.length>80){
			return  _tips("spheretips","经营范围不能超过80个字","sphere");
		}else if(!$periodtime){
			return  _tips("periodtips","成立日期不能空","");
		}else{
			var $telephone=$.trim($("#telephone").val()),$areacode=$.trim($("#telephoneAreaCode").val());
			return infovalite($applicant,$department,$account,$phone,$areacode,$telephone,img0,img1);
		}
	}
	credit.enterthird=function(){
		var $province1=$.trim($("#province1:visible").find(":selected").text()),$city1=$.trim($("#city1:visible").find(":selected").text()),$businessAddress = $.trim($("#businessAddress1:visible").val()),$province2=$.trim($("#province2:visible").find(":selected").text()),$city2=$.trim($("#city2:visible").find(":selected").text()),$businessAddress2 = $.trim($("#businessAddress2:visible").val()),$province3=$.trim($("#province3:visible").find(":selected").text()),$city3=$.trim($("#city3:visible").find(":selected").text()),$businessAddress3 = $.trim($("#businessAddress3:visible").val()),$applicant = $.trim($("#applicant").val()),$department = $.trim($("#department").val()),$account = $.trim($("#account").val()),$phone = $.trim($("#phone").val()),flag = false;
		for(var i = 0;i < 3;i++){
			if($("#imgurl0"+i).val()){
				flag = true;
			}
		}
		if($province1==="请选择省"){
			$("#province1").addClass("border-error");
			return  _tips("businesstips","请您选择省","");
		}else if($city1==="请选择市"){
			$("#city1").addClass("border-error");
			return  _tips("businesstips","请您选择市","");
		}else if(!$businessAddress){
			return  _tips("businesstips","请您输入详细地址","businessAddress1");
		}else if($businessAddress&&regNum.test($businessAddress)){
			return  _tips("businesstips","详细地址不能全部为数字","businessAddress1");
		}else if($businessAddress&&!mgName.test($businessAddress)){
			return  _tips("businesstips","请输入中文、英文、数字","businessAddress1");
		}else if($businessAddress&&$businessAddress.length>40){
			return  _tips("businesstips","详细地址不能超过40个字","businessAddress1");
		}else if($province2!="请选择省"&&$city2==="请选择市"){
			$("#city2").addClass("border-error");
			return  _tips("businesstips","请您选择市","");
		}else if($province2!="请选择省"&&$("#businessAddress2").is(":visible")&&!$businessAddress2){
			return  _tips("businesstips","请您输入详细地址","businessAddress2");
		}else if($city2!="请选择市"&&$province2==="请选择省"){
			$("#province2").addClass("border-error");
			return  _tips("businesstips","请您选择省","");
		}else if($city2!="请选择市"&&$("#businessAddress2").is(":visible")&&!$businessAddress2){
			return  _tips("businesstips","请您输入详细地址","businessAddress2");
		}else if($businessAddress2&&$province2==="请选择省"){
			$("#province2").addClass("border-error");
			return  _tips("businesstips","请您选择省","");
		}else if($businessAddress2&&$city2==="请选择市"){
			$("#city2").addClass("border-error");
			return  _tips("businesstips","请您选择市","");
		}
		else if($province3!="请选择省"&&$city3==="请选择市"){
			$("#city3").addClass("border-error");
			return  _tips("businesstips","请您选择市","");
		}else if($province3!="请选择省"&&$("#businessAddress3").is(":visible")&&!$businessAddress3){
			return  _tips("businesstips","请您输入详细地址","businessAddress3");
		}else if($city3!="请选择市"&&$province3==="请选择省"){
			$("#province3").addClass("border-error");
			return  _tips("businesstips","请您选择省","");
		}else if($city3!="请选择市"&&$("#businessAddress3").is(":visible")&&!$businessAddress3){
			return  _tips("businesstips","请您输入详细地址","businessAddress3");
		}else if($businessAddress3&&$province3==="请选择省"){
			$("#province3").addClass("border-error");
			return  _tips("businesstips","请您选择省","");
		}else if($businessAddress3&&$city3==="请选择市"){
			$("#city3").addClass("border-error");
			return  _tips("businesstips","请您选择市","");
		}
		else if($businessAddress2&&regNum.test($businessAddress2)){
			return  _tips("businesstips","经营地址不能全部为数字","businessAddress2");
		}else if($businessAddress2&&!mgName.test($businessAddress2)){
			return  _tips("businesstips","请输入中文、英文、数字","businessAddress2");
		}else if($businessAddress2&&$businessAddress2.length>40){
			return  _tips("businesstips","详细地址不能超过40个字","businessAddress2");
		}else if($businessAddress3&&regNum.test($businessAddress3)){
			return  _tips("businesstips","详细地址不能全部为数字","businessAddress3");
		}else if($businessAddress3&&!mgName.test($businessAddress3)){
			return  _tips("businesstips","请输入中文、英文、数字","businessAddress3");
		}else if($businessAddress3&&$businessAddress3.length>40){
			return  _tips("businesstips","详细地址不能超过40个字","businessAddress3");
		}else if(!flag){
			return  _tips("phototips0","请输入店面照片","");
		}else{
			var $telephone=$.trim($("#telephone").val()),$areacode=$.trim($("#telephoneAreaCode").val());
			return infovalite($applicant,$department,$account,$phone,$areacode,$telephone);
		}
	}
	csc["credit"]=credit;
})(window)

$(function(){
	$("#select a").on("click",function(){
		$("#spheretips").hide();
		$("#licenseadretips").hide();
	});
	$("#periodtime").on("blur",function(){
		$val=$.trim($(this).val());
		if(!$val){
			$("#periodtips").hide();
		}
	});
 	 csc.credit.enterCheck();
 	 var failTip = $.parseJSON($("input[name='errormsg']").val());
	if(failTip){
		var failStatus=failTip.status;
		var a=[],b=[],msg='';
		for(var i in failTip.msg){//遍历json
			a.push(i);//key
			b.push((failTip.msg)[i]);//value
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
			}
		}
		if(failStatus==='-2'){
			csc.useDialog(function(){
				artDialog({
					id:'errorTip',
					title:false,
					content:'<h2 style="font-size:16px;">对不起，您填写的信息不规范！</h2>'+msg,
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
			});
		}else{
			csc.useDialog(function(){
				artDialog({
					id:'errorTip',
					title:false,
					content:b[0],
					fixed: true,
					lock:true,
					padding:'25px 50px 25px 25px',
					opacity:0,
					icon:'mem-w',
					ok:function(){},
					close:function(){
						$("input[name='"+a[0]+"']").focus();//默认第一个设置焦点
					}
				});
			});
		}
	}
})

