var url =BASEURL+"bops-app/bops/";
//var url ="10.10.10.27:8080/bops-app/bops/";
var isSubmit=false;
/*企业实名认证拒绝理由*/
var ref_sm= '<div class="ly-d-art">' +
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请根据营业执照填写正确的企业类型、企业名称、统一信用号、注册地、营业期限、登记机关、法定代表人"> 1、请根据营业执照填写正确的企业类型、企业名称、统一信用号、注册地、营业期限、登记机关、法定代表人</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您的营业执照在《全国企业信用信息公示系统》中显示经营异常，暂时不能通过，请到当地工商局进行修正再进行申请"> 2、您的营业执照在《全国企业信用信息公示系统》中显示经营异常，暂时不能通过，请到当地工商局进行修正再进行申请</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确选择法人性别、法人身份证号码与复印件不相符"> 3、请正确选择法人性别、法人身份证号码与复印件不相符</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请按要求上传法人身份证正反面信息；请上传真实有效的法人身份证复印件"> 4、请按要求上传法人身份证正反面信息；请上传真实有效的法人身份证复印件</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请勿对证件信息进行遮挡"> 5、请勿对证件信息进行遮挡</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您上传的企业法人、代理人身份证即将到期，请上传最新身份证"> 6、您上传的企业法人、代理人身份证即将到期，请上传最新身份证</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您上传的身份证件、营业执照模糊不清晰，请重新上传"> 7、您上传的身份证件、营业执照模糊不清晰，请重新上传</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="代理人姓名与代理人身份证不一致、请正确填写代理人姓名全称"> 8、代理人姓名与代理人身份证不一致、请正确填写代理人姓名全称</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="代理人身份证需正反面复印件清晰照片，且手写签名"> 9、代理人身份证需正反面复印件清晰照片，且手写签名</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写申请人部门、职位"> 10、请正确填写申请人部门、职位</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请按要求上传代理人身份证正反面信息"> 11、请按要求上传代理人身份证正反面信息</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请下载本平台提供的授权书模板正确填写代理人授权书"> 12、请下载本平台提供的授权书模板正确填写代理人授权书</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="授权书上所填写的身份证号码与代理人身份证不一致"> 13、授权书上所填写的身份证号码与代理人身份证不一致</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="授权书需相关人员手写签名、需加盖公司印章"> 14、授权书需相关人员手写签名、需加盖公司印章</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="企业logo图片不能带有第三方水印、请上传清晰的企业logo图片"> 15、企业logo图片不能带有第三方水印、请上传清晰的企业logo图片</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="企业名称格式不正确，请按照营业执照上的公司名称完整填写；公司名称不能带有空格键、标点符号、特殊字母、任何数字；企业旺铺不能以部门名义开通、不能使用繁体字"> 16、企业名称格式不正确，请按照营业执照上的公司名称完整填写；公司名称不能带有空格键、标点符号、特殊字母、任何数字；企业旺铺不能以部门名义开通、不能使用繁体字</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您填写的企业名称已注册，同一个公司名称只能开通一个旺铺"> 17、您填写的企业名称已注册，同一个公司名称只能开通一个旺铺</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您所填写的企业名称与公司介绍不符"> 18、您所填写的企业名称与公司介绍不符</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="企业联系地址必须填写正确、完整的地址；您填写的地址与营业执照不相符"> 19、企业联系地址必须填写正确、完整的地址；您填写的地址与营业执照不相符</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="企业名称与企业联系地址不匹配、请正确填写企业详细地址"> 20、企业名称与企业联系地址不匹配、请正确填写企业详细地址</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请上传正确的店铺实景图"> 21、请上传正确的店铺实景图</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您所填写的企业网址不能正常打开；请填写与贵公司相关联的企业网址"> 22、您所填写的企业网址不能正常打开；请填写与贵公司相关联的企业网址</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请按照营业执照填写正确的主营行业、主营产品、注册资本"> 23、请按照营业执照填写正确的主营行业、主营产品、注册资本</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="本平台是中文平台，公司介绍必须填写中文"> 24、本平台是中文平台，公司介绍必须填写中文</p>'+
		'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="公司介绍不能包含国家违禁产品和服务；本平台暂不为该行业服务"> 25、公司介绍不能包含国家违禁产品和服务；本平台暂不为该行业服务</p>'+
	'</div>'+
	'<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';

var ref_st='<div class="ly-d-art">'+
	'<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="公司名称填写有误">1、公司名称填写有误</p>'+
    '<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您填写的公司名称已经通过企业实体认证，不能重复认证">2、您填写的公司名称已经通过企业实体认证，不能重复认证</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写正确的经营地址">3、请填写正确的经营地址</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您填写的地址不存在">4、您填写的地址不存在</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="门店照片与贵公司不相符">5、门店照片与贵公司不相符</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="门店照片模糊、不清晰">6、门店照片模糊、不清晰</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请上传与企业经营地址相对应的门店照">7、请上传与企业经营地址相对应的门店照</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写申请人姓名全称">8、请正确填写申请人姓名全称</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="申请人必须与旺铺注册人一致">9、申请人必须与旺铺注册人一致</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写正确的申请人联系电话">10、请填写正确的申请人联系电话</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="申请人联系电话必须与旺铺注册人联系方式保持一致">11、申请人联系电话必须与旺铺注册人联系方式保持一致</p>'+
'</div>'+
'<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';

var ref_ss ='<div class="ly-d-art">'+
	'<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="同一营业执照只能认证一次，请不要重复认证">1、同一营业执照只能认证一次，请不要重复认证</p>'+
    '<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请确保营业执照及相关证件的有效性">2、请确保营业执照及相关证件的有效性</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请确保网铺信息完整、一致">3、请确保网铺信息完整、一致</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写企业名称">4、请正确填写企业名称</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写企业邮箱">5、请正确填写企业邮箱</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写企业电话">6、请正确填写企业电话</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写正确的办公地址">7、请填写正确的办公地址</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写正确的公司类型">8、请填写正确的公司类型</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请上传正确、清晰的营业执照">9、请上传正确、清晰的营业执照</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确输入联系人姓名">10、请正确输入联系人姓名</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确输入联系电话">11、请正确输入联系电话</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确输入联系人邮箱">12、请正确输入联系人邮箱</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确输入合适的简介">13、请正确输入合适的简介</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请选择正确的主营行业">14、请选择正确的主营行业</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请上传正确、清晰的旺铺LOGO图片">15、请上传正确、清晰的旺铺LOGO图片</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请输入合适的介绍说明">16、请输入合适的介绍说明</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写与营业执照对应的信息">17、请正确填写与营业执照对应的信息</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您的申请信息有误，请与客服人员联系">18、您的申请信息有误，请与客服人员联系</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="图片有第三方水印">19、图片有第三方水印</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请根据营业执照填写正确的营业期限">20、请根据营业执照填写正确的营业期限</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="营业执照扫描件模糊、不清晰">21、营业执照扫描件模糊、不清晰</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写详细的经营地址">22、请填写详细的经营地址</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请根据营业执照填写正确的登记机关">23、请根据营业执照填写正确的登记机关</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请上传正确有效的证件扫描件">24、请上传正确有效的证件扫描件</p>'+
'</div>'+
'<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';

var ref_gr ='<div class="ly-d-art">'+
	'<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="同一营业执照只能认证一次，请不要重复认证">1、同一营业执照只能认证一次，请不要重复认证</p>'+
    '<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请确保营业执照及相关证件的有效性">2、请确保营业执照及相关证件的有效性</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请确保网铺信息完整、一致">3、请确保网铺信息完整、一致</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写企业名称">4、请正确填写企业名称</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写企业邮箱">5、请正确填写企业邮箱</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写企业电话">6、请正确填写企业电话</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写正确的办公地址">7、请填写正确的办公地址</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写正确的公司类型">8、请填写正确的公司类型</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请上传正确、清晰的营业执照">9、请上传正确、清晰的营业执照</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确输入联系人姓名">10、请正确输入联系人姓名</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确输入联系电话">11、请正确输入联系电话</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确输入联系人邮箱">12、请正确输入联系人邮箱</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确输入合适的简介">13、请正确输入合适的简介</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请选择正确的主营行业">14、请选择正确的主营行业</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请上传正确、清晰的旺铺LOGO图片">15、请上传正确、清晰的旺铺LOGO图片</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请输入合适的介绍说明">16、请输入合适的介绍说明</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写与营业执照对应的信息">17、请正确填写与营业执照对应的信息</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您的申请信息有误，请与客服人员联系">18、您的申请信息有误，请与客服人员联系</p>'+
'</div>'+
'<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';

/*个人实名认证拒绝理由*/
var ref_pr ='<div class="ly-d-art">'+
	'<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="身份信息太模糊，请上传清晰的身份证复印件">1、身份信息太模糊，请上传清晰的身份证复印件</p>'+
    '<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="身份证号码与复印件不相符，请上传真实有效的身份证复印件">2、身份证号码与复印件不相符，请上传真实有效的身份证复印件</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请按要求上传身份证正反面信息；请按要求在对应位置上传身份证正面信息；请按要求上传身份证反面信息">3、请按要求上传身份证正反面信息；请按要求在对应位置上传身份证正面信息；请按要求上传身份证反面信息</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写申请人姓名、请正确完整填写身份证号码">4、请正确填写申请人姓名、请正确完整填写身份证号码</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请勿对证件信息进行遮挡">5、请勿对证件信息进行遮挡</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="企业logo图片不能带有第三方水印、请上传清晰的企业logo图片">6、企业logo图片不能带有第三方水印、请上传清晰的企业logo图片</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="企业名称格式不正确，请按照营业执照上的公司名称完整填写；公司名称不能带有空格键、标点符号、特殊字母、任何数字；企业旺铺不能以部门名义开通、不能使用繁体字">7、企业名称格式不正确，请按照营业执照上的公司名称完整填写；公司名称不能带有空格键、标点符号、特殊字母、任何数字；企业旺铺不能以部门名义开通、不能使用繁体字</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您填写的企业名称已注册，同一个公司名称只能开通一个旺铺">8、您填写的企业名称已注册，同一个公司名称只能开通一个旺铺</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您所填写的企业名称与公司介绍不符">9、您所填写的企业名称与公司介绍不符</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="企业联系地址必须填写正确、完整的地址；您填写的地址与营业执照不相符">10、企业联系地址必须填写正确、完整的地址；您填写的地址与营业执照不相符</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="企业名称与企业联系地址不匹配、请正确填写企业详细地址">11、企业名称与企业联系地址不匹配、请正确填写企业详细地址</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请上传正确的店铺实景图">12、请上传正确的店铺实景图</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="您所填写的企业网址不能正常打开；请填写与贵公司相关联的企业网址">13、您所填写的企业网址不能正常打开；请填写与贵公司相关联的企业网址</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请正确填写企业资料；请正确填写公司介绍内容">14、请正确填写企业资料；请正确填写公司介绍内容</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="本平台是中文平台，公司介绍必须填写中文；请正确填写公司介绍内容">15、本平台是中文平台，公司介绍必须填写中文；请正确填写公司介绍内容</p>'+
	'<p><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="公司介绍不能包含国家违禁产品和服务；本平台暂不为该行业服务">16、公司介绍不能包含国家违禁产品和服务；本平台暂不为该行业服务</p>'+
'</div>'+
'<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';

$(function (){
	$("span:contains('已审核')").addClass("w-su");
	$("ul.ln-3th li.li-last a:contains('"+$("#masterCur").attr("value")+"')").closest("li").addClass("ln-3th-cur");
	data_text_Enter();
});

function maxLength(text,num){
	var num = num || 2000;
	return text.length<=num ? true : false;
}

function verifyReason(text,id){
	if(text.length == 0){
		aReturn(0,"","请选择或输入理由！");
		return false;
	}else if(text.length <=5 ){
		aReturn(0,"","拒绝理由要大于5个字符");
		return false;
	}
	var id = id || "#testVal",
		$id = $(id);
	if(maxLength(text)){
		$id.next("p.error-msg").remove();
		return true;
	}else{
		$id.next().is("p.error-msg") ? '' : $id.after('<p class="error-msg" style="position:absolute;margin-top:-2px;color:#f00">输入了超过2000个字符数限制</p>');
		return false;
	};
}

//审核管理 绑定日期查询文本框回车事件
function data_text_Enter(){
	$(".tb-time input.g-d-text").on("keydown",function(event){
		var keynum;
		keynum = event.keyCode || event.which;
		if (keynum == 13) {
			var a= $(".tb-time>*").last();
			a.trigger("click");
		}
	})
}
//搜索
function searchByPm(obj,tmp){
	var st=$("#searchType option:selected").attr("value"),
			sv=document.getElementById("searchValue").value;
		window.location.href="approveStore.controllerParamSearch?approveType="+tmp+"&searchType="+st+"&searchValue="+sv;
}
function secKeyDown(e,obj,tmp){
　 var e=e||event;
　 var currKey=e.keyCode||e.which||e.charCode;
　 if((currKey==13)) {
		var st=$("#searchType option:selected").attr("value"),
				sv=document.getElementById("searchValue").value;
			window.location.href="approveStore.controllerParamSearch?approveType="+tmp+"&searchType="+st+"&searchValue="+sv;
	}
}

function GO(rzid,tmp){
	var rz=$("#approveType option:selected").attr("value"),
		st=$("#startTime").val(),
		et=$("#endTime").val();

	var url_arg="?approveType="+rz;
	if(st) {url_arg+="&startTime="+st;}
	if(et) {url_arg+="&endTime="+et;}
	if(rzid) {url_arg+="&rz_id="+rzid;}
	var url = window.location.href.split('?')[0];
	window.location.href= url + url_arg;
}
//分页
function turnPage1(obj,tmp){
	var $id=$(obj).prev().attr("id");
	var pg= document.getElementById($id).value;
	var pgAt=parseInt($(".page-r strong").html());
	if(pg==null||pg==""){
			art.dialog({
				content: '请输入页码数！',
				fixed: true,
				time: 1.5
			});
		}else{
			if(parseInt(pg)>pgAt){
				art.dialog({
					content: '输入页码数大于总页数！',
					fixed: true,
					time: 1.5
				});
			}else{
				var url = window.location.href.split('?')[0];
				window.location.href = url + "?rz_id=fenye&page="+pg;
			}
	}
}

function CloseExamine(){
	history.back();
}

function pageKeyDown(e,obj,tmp){
　 var e=e||event;
　 var currKey=e.keyCode||e.which||e.charCode;
　 if((currKey==13)) {
		var $id=$(obj).attr("id");
		var pg= document.getElementById($id).value;
		var pgAt=parseInt($(".page-r strong").html());
		if(pg==null||pg==""){
				art.dialog({
					content: '请输入搜索内容！',
					fixed: true,
					time: 1.5
				});
			}else{
				if(parseInt(pg)>pgAt){
					art.dialog({
						content: '输入页码数大于总页数！',
						fixed: true,
						time: 1.5
					});
				}else{
					var url = window.location.href.split('?')[0];
					window.location.href=url + "?rz_id=fenye&page="+pg;
				}
		}
	}
}

//实名审核
function ExamineSM(status,id,ly,go,approveId){
	var userId= window.tmpList ? tmpList['data'][tmpList['listtest']] : id,
		approveType= ly || document.getElementById("approveType").value;
	var arg = {
		"userId":userId,
		"approveType":approveType,
		"status":status
		//"approveId":approveId
	};
	if(isSubmit===true){return false;}//阻止表单重复提交
	isSubmit=true;
	switch(status){
		case "102":
			//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
			isHaveMgc('approve.check',{userIds:[userId]},function(){
				$.get(url+"approve.subExamine",arg,function(data){
					if(go){
						aReturn2(data,"操作成功！","操作失败！","众信认证失败");
					}else{
						aReturn3(data,"操作成功！","操作失败！","众信认证失败");
					}
					isSubmit=false;
				},"jsonp");
			});
			break;
		case "103":
			art.dialog({
				title:"拒绝理由",
				content:ref_sm,
				fixed: true,
				okVal: '保存',
				background:"#000",
				opacity:"0.3",
				ok: function () {
					var textVal=document.getElementById("testVal").value;
					if(verifyReason(textVal,"#testVal")){
						arg.reason = textVal;
						if(go){
							$.post(url+"approve.subExamine",arg,function(data){aReturn2(data,"操作成功！","操作失败！");isSubmit=false;},"jsonp");
						}else{
							$.post(url+"approve.subExamine",arg,function(data){aReturn(data,"操作成功！","操作失败！",location.herf);isSubmit=false;},"jsonp");
						}
					}else{
						return false;
					}
				},
				init:function(){
					$(".test-focus").click(function(){
						$(".ly-d-art input").removeAttr("checked");
						$(this).children(".test-lay").remove();
					});
				},
				cancel: true,
				lock:true
			});
		default:
			break;
	}
}

//实体审核
function address(order){
	var userId= document.getElementById("userId").value;
	$.get(url+"approveStore.addressExamine",{"userId":userId,"order":order,"address_examine_status":"1"},function(data){
		if(parseInt(data)>0){
			art.dialog({content:'核实成功！',icon: 'succeed',fixed: true,time: 1.5});
			$("input[onclick*='"+order+"']").parent().empty().prev().html('<span class="w-at w-su">已核实</span>');
			$("input[onclick*='ExamineST']").first().attr("onclick","ExamineST('102','0','','STRZ')")
		}else{
			art.dialog({content:'核实失败',icon: 'error',fixed: true,time: 1.5});
		}
	},"jsonp");
}

function aReturnAd(tmp,po,pt){
	if(tmp>=1){
		art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
		setTimeout(function(){location.href = location.href ;},1500);
	}else{
		art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
	}
}

//身份认证
function ExamineST(status,zz,id,ly,go,approveId){
	//if(zz-0){
	//	art.dialog({content:"必须有至少一个实体店经营地址审核通过后才可以进行实体店审核！",icon: 'error',fixed: true});
	//	return false;
	//}

	var lstUrl=url+"prove.list?";
	var userId= $("#userId").val() || id,
		type=zz==1?"PREPASSS":"REFUSAL";
	var arg = {
		"memberIds":userId,
		"state":type,
		"status":status
		//"approveId":approveId
	};
	switch(status){
		case "102":
			$('.wait-btn input[type=button]').eq(0).val('正在提交中...').attr('disabled',true);

			//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
			isHaveMgc('prove.check',{memberIds:[userId]},function(){
				$.get(url+"prove.preAudit",arg,function(data){
					$('.wait-btn input[type=button]').eq(0).val('通过').attr('disabled',false);
					var _status=parseInt(data.status);
					if(_status>0){
						_status=1;
					}
					if(go){
						aReturn2(_status,data.info,data.info);
					}else{
						aReturn(_status,data.info,data.info,lstUrl);
					}
				},"jsonp");
			},function(){
				$('.wait-btn input[type=button]').eq(0).val('通过').attr('disabled',false);
			});
			break;
		case "103":
			art.dialog({
				title:"拒绝理由",
				content:ref_st,
				fixed: true,
				okVal: '保存',
				background:"#000",
				opacity:"0.3",
				ok: function () {
					var textVal=document.getElementById("testVal").value;
					if(verifyReason(textVal,"#testVal")){
						arg.status = textVal;
						$.post(url+"prove.preAudit",arg,function(data){
							var _status=parseInt(data.status);
							if(_status>0){
								_status=1;
							}
							if(go){
								aReturn2(_status,data.info,data.info);
							}else{
								aReturn(_status,data.info,data.info,lstUrl);
							}
						},"jsonp");
					}else{
						return false;
					}
				},
				init:function(){
					$(".test-focus").click(function(){
						$(".ly-d-art input").removeAttr("checked");
						$(this).children(".test-lay").remove();
					});
				},
				cancel: true,
				lock:true
			});
		default:
			break;
	}
}

//个人认证
function ExamineGR(status, id, go) {
	var userId = window.tmpList ? tmpList['data'][tmpList['listtest']] : id;
	if(isSubmit===true){return false;}//阻止表单重复提交
	isSubmit=true;
	switch (status) {
		case "102":
			//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
			isHaveMgc('person.check',{memberIds:[userId]},function(){
				$.get(url + "person.preAudit", {
					"state": "PASS",
					"memberIds": userId
				}, function(data) {
					if (go) {
						aReturn2(data.status, "操作成功！", "操作失败！");
					} else {
						aReturn(data.status, "操作成功！", "操作失败！", location.href);
					}
					isSubmit=false;
				}, "jsonp");
			});
			break;
		case "103":
			art.dialog({
				title: "拒绝理由",
				content: ref_pr,
				fixed: true,
				okVal: '保存',
				background: "#000",
				opacity: "0.3",
				ok: function() {
					var textVal = document.getElementById("testVal").value;
					if (verifyReason(textVal, "#testVal")) {
						if (go) {
							$.post(url + "person.preAudit", {
								"state": "REFUSAL",
								"memberIds": userId,
								"season": textVal
							}, function(data) {
								aReturn2(data.status, "操作成功！", "操作失败！");
								isSubmit=false;
							}, "jsonp");
						} else {
							$.post(url + "person.preAudit", {
								"state": "REFUSAL",
								"memberIds": userId,
								"season": textVal
							}, function(data) {
								aReturn(data.status, "操作成功！", "操作失败！", location.href);
								isSubmit=false;
							}, "jsonp");
						}
					} else {
						return false;
					}
				},
				init: function() {
					$(".test-focus").click(function() {
						$(".ly-d-art input").removeAttr("checked");
						$(this).children(".test-lay").remove();
					});
				},
				cancel: true,
				lock: true
			});
		default:
			break;
	}
}

function crossSM(){
	var userId=document.getElementById("userId").value,
		apType=document.getElementById("approveType").value;
	$.get(url+"approve.subExamine",{"userId":userId,"apType":apType,"userName":"102"},function(data){var tmp=data.status;aReturn(tmp);},"jsonp");
}


function aReturn2(tmp,po,pt,pt3){
	if(tmp==1){
		art.dialog({content:po,icon: 'succeed',fixed: true,time: 3.0, opacity: 0.3,lock: true,cancelVal:'关闭',cancel:function(){location.href = location.href }});
	}else if(tmp==2){
		art.dialog({content: pt3,icon: 'error',fixed: true,time: 3.0,opacity: 0.3,lock: true});
	}else if(tmp==0){
		art.dialog({content: pt,icon: 'error',fixed: true,time: 3.0,opacity: 0.3,lock: true});
	}
}

function aReturn(tmp,tmp1,tmp2,url) {
	if (tmp == "1") {
		art.dialog({content: tmp1, icon: 'succeed', fixed: true, time: 3.0, opacity: 0.3,lock: true,cancelVal:'关闭',cancel:function(){if(url){
			window.location.href=url;
		}else{
			history.back();
		}}});

	} else {
		art.dialog({content: tmp2, icon: 'error', fixed: true, time: 3.0, opacity: 0.3,lock: true});
	}
}

	function aReturn3(tmp,tmp1,tmp2,tmp3,url){
		if(tmp=="1"){
			art.dialog({content: tmp1,icon: 'succeed',fixed: true,time: 3.0, opacity: 0.3,lock: true,cancelVal:'关闭',cancel:function(){if(url){
				window.location.href=url;
			}else{
				history.back();
			}}});

		}else if(tmp==0){
			art.dialog({content:tmp2,icon: 'error',fixed: true,time: 3.0,opacity: 0.3,lock: true});
		}else if(tmp==2){
			art.dialog({content:tmp3,icon: 'error',fixed: true,time: 3.0,opacity: 0.3,lock: true});
		}
}


//拒绝
function ExamineTRefuse(star,id,ly){
	var userId= id || document.getElementById("userId").value,
		apType= ly || document.getElementById("approveType").value;
	switch(star){
		case "103":
			art.dialog({
				 title:"拒绝理由",
				content:ref,
				fixed: true,
				okVal: '保存',
				background:"#000",
				opacity:"0.3",
				ok: function () {
					var textVal=document.getElementById("testVal").value;
						if(verifyReason(textVal,"#testVal")){
							$.post(url+"approve.subExamine",{"userId":userId,"approveType":apType,"status":star,"reason":textVal},function(data){aReturnT(data,"操作成功！","操作失败！");},"jsonp");
						}else{
							return false;
						}
					},
				init:function(){
					$(".test-focus").click(function(){
						$(".ly-d-art input").removeAttr("checked");
						$(this).children(".test-lay").remove();
					});
				},
				cancel: true,
				lock:true
			});
		break;
		default:
		break;
	}
}

function selVal(tmp) {
	$(".test-focus").find(".test-lay").remove();
	var ly = $("#testVal").val(),addstr = tmp.value.replace(/[\.,;!。，；！、]\s*$/,"");;
	if ($(tmp).attr("checked")) {
		if ($.trim(ly) != "" && !(/[；。！，!,\.;!]\s*$/ig.test(ly))){
			ly += "；";
		}
		ly += addstr;
		if(!/[；。！，!,\.;!]\s*$/ig.test(addstr)){
			ly += "；";
		}
	} else { //删除己选的拒绝理由(tmp为checkbox时有效);
		var reg = new RegExp($.trim(addstr)+"(\s*；\s*)*");
		ly = ly.replace(reg, "");
	}
	$("#testVal").val(ly);
}

//批量操作
function batchExamine(tmp,sta){
	var selT=$("table tbody .list-id input:checked").length;
	if(selT>0){
		var curTmp=[];
		for(var i=0;i<selT;i++){
			curTmp.push($("table tbody .list-id input:checked").eq(i).attr("value"));
		}
		var curAll=curTmp.join(",");
		if(isSubmit===true){return false;}//阻止表单重复提交
		isSubmit=true;
		switch(tmp){
			case  "SMRZ":
				switch(sta){
					case  "102":
					$.post(url+"approve.batchExamine",{"approveType":tmp,"status":sta,"userIds":curAll,"reason":""},function(data){aReturn2(data,"操作成功！","操作失败","部分众信认证失败");isSubmit=false;},"jsonp");
					break;
					case  "103":
					apbatch(curAll,ref_sm,tmp,sta);
					break;
				}
			break;
			case "STRZ":
				switch(sta){
					case  "102":
					$.post(url+"approveStore.batchExamine",{"approveType":tmp,"status":sta,"userIds":curAll,"reason":""},function(data){aReturn2(data,"操作成功！","操作失败","部分众信认证失败");isSubmit=false;},"jsonp");
					break;
					case  "103":
					apbatch(curAll,ref_st,tmp,sta);
					break;
				}
			break;
			case "GRRZ":
				switch(sta){
					case  "102":
					$.post(url+"person.preAudit",{"state":"PASS","memberIds":curAll},function(data){aReturn2(data.status,"操作成功！","操作失败");isSubmit=false;},"jsonp");
					break;
					case  "103":
					apbatch(curAll,ref_pr,tmp,sta);
					break;
				}
			break;
		}

	}else{
		art.dialog({
			content: '请先选择您要转移的产品！',
			fixed: true,
			time: 1.5
		});
	}
}
function apbatch(cur,ref,tmp,sta){
	art.dialog({
		title:"拒绝理由",
		content:ref,
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var textVal=document.getElementById("testVal").value;
			if(verifyReason(textVal,"#testVal")){
				if(tmp=="SMRZ"){
					$.post(url+"approve.batchExamine",{"approveType":tmp,"status":sta,"userIds":cur,"reason":textVal},function(data){aReturn2(data,"拒绝成功！","拒绝失败");isSubmit=false;},"jsonp");
				}else if(tmp=="GRRZ"){
					$.post(url+"person.preAudit",{"memberIds":cur,"state":"REFUSAL","season":textVal},function(data){aReturn2(data.status,"拒绝成功！","拒绝失败");isSubmit=false;},"jsonp");
				}else{
					$.post(url+"prove.preAudit",{"memberIds":cur,"state":"REFUSAL","season":textVal},function(data){aReturn2(data,"拒绝成功！","拒绝失败");isSubmit=false;},"jsonp");
				}
			}else{
				return false;
			}
		},
		init:function(){
			$(".test-focus").click(function(){
				$(".ly-d-art input").removeAttr("checked");
				$(this).children(".test-lay").remove();
			});
		},
		cancel: true,
		lock:true
	});
}

function showApproce(listtest,id){//查看认证详细页
	var $form=$("#approveRZ");
	$form.attr("action",$form.attr("action")+"?userId="+id+"&listtest="+listtest).trigger("submit");
}

//详情页模板
function dateTemplate(data){
	var
		img = ['uploadApplicantCard','uploadApplicantCard2','licenseImg','uploadProposerWarrant','uploadLegalPersonCard2','uploadLegalPersonCard','storeImg','imgUrl','shopImage'],
		storeImg = ['storeImg2','storeImg3'];
		tradeListArry=[];
	$.each(data,function (i,item){
		if($.inArray(i,img)>-1){
			if($.trim(item).length>0){
				if($.trim(item) == ""){
					item = '&nbsp;';
				}
				else{
					if(i=='imgUrl'){
						item = '<a href="http://img.csc86.com'+item+'" class="highslide"><img src="http://img.csc86.com'+item+'" width="45" height="45" /></a>';
					}else{
						item = '<a href="http://img.csc86.com'+item+'" class="highslide"><img src="http://img.csc86.com'+item+'" width="150" height="100" /></a>';
					}

				}

			}
		}

		if(i=="tradeList"&&item.length>0){
			$.each(item,function(i,n){
				tradeListArry.push(n.name);
			});
			item=tradeListArry.join('、');
		}

		if(i=="sellList"){
			item=item.join('、');
		}
		if(i == "submain"){
			if(item == ""){
				item = '&nbsp;';
			}else{
				item = '<a href="http://'+item+'.csc86.com/" target="_blank">http://'+item+'.csc86.com/</a>';
			}
		}
		$("#"+i).html(item);
		if($.inArray(i,storeImg)>-1 && $.trim(item).length>0){
			$("#storeImg").append('\n<a href="http://img.csc86.com/'+item+'" class="highslide"><img src="http://img.csc86.com/'+item+'" width="150" height="100" /></a>');
		}
	});
	ImgZoomFun("a.highslide");
}

//经营地址模板
function addressTemplate(data){
	var
		arr = ['one','two','three'],
		tmp = '<table class="en-i" width="100%" border="0" cellspacing="0" cellpadding="0">';
	function _vStatus(status,i){
		var tmp='';
		if(status == 0){
			 tmp+='<td class="wa-t3"><span class="w-at">待核实</span></td><td class="wa-t4"><input type="button" onclick="address(\''+arr[i]+'Address\')" value="已核实"></td>';
		}else{
			tmp+='<td class="wa-t3"><span class="w-at w-su">已核实</span></td><td class="wa-t4"></td>';
		}
		return tmp;
	}
	for(var i =0 ;i<data.length;i++){
		tmp+='<tr><td class="wa-t1">经营地址1：</td><td class="wa-t2">'+data[i].address+'</td><td class="wa-t2">'+data[i].market+'</td>'+_vStatus(data[i].status,i)+'</tr>';
	}
	tmp+='</table>';
	$("#addressId").html(tmp);
}

//下一条
function verifyNextId(){
	if(tmpList.listtest == (tmpList.total-1)){
		art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
		return;
	}
	var
		url = "approveStore.nextExamine",
		id = $("#masterCur").val().indexOf('实名认证')>0 ? "N" : "S",
		RZ = {"N":"SMRZ","S":"STRZ"},
		$userId = $("#userId");
	if(tmpList.listtest == tmpList.lastsize){
		var data = {};
		$("div.index-look").find("input").each(function (i,item){
			var $item = $(item);
			data[$item.attr("name")] = $.trim($item.val());
		});
		data['page']=tmpList['page'];
		$.ajax({
			url: id == "N" ? "approveStore.controllerRealNameFenyeTo10" : "approveStore.controllerStoreTo10",
			data:data,
			async:false,
			success:function (data){
				var tmp = {};
				for(var i in data){
					tmp[data[i]['listtest']] = data[i]['userId'];
				}
				tmpList['data']=tmp;
				tmpList.lastsize = tmpList.lastsize + data.length;
				tmpList.page+=1;
				tmpList.listtest+=1;
				$.post(url,{"userId":tmpList['data'][tmpList.listtest],approveType:RZ[id]},function (data){
					$userId.val(tmpList['data'][tmpList.listtest]);
					dateTemplate(data['detailRealDTO']);
					//data['enterpriseDetail']&&dateTemplate(data['enterpriseDetail']);
					data['detailStoreDTO'] && dateTemplate(data['detailStoreDTO']);
					data['address'] && addressTemplate(data['address']);
				},"jsonp");
			},
			dataType:"jsonp"
		});
	}else{
		tmpList.listtest+=1;
		$.post(url,{"userId":tmpList['data'][tmpList.listtest],approveType:RZ[id]},function (data){
			$userId.val(tmpList['data'][tmpList.listtest]);
			dateTemplate(data['detailRealDTO']);
			//data['enterpriseDetail']&&dateTemplate(data['enterpriseDetail']);
			data['detailStoreDTO'] && dateTemplate(data['detailStoreDTO']);
			data['address'] && addressTemplate(data['address']);
		},"jsonp");
	}
}
function verifyNextId2(){
	if(tmpList.listtest == (tmpList.total-1)){
		art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
		return;
	}
	var
		url = "approve.nextExamine",
		id = $("#masterCur").val().indexOf('实名认证')>0 ? "N" : "S",
		RZ = {"N":"SMRZ","S":"STRZ"},
		$userId = $("#userId");
	if(tmpList.listtest == tmpList.lastsize){
		var data = {};
		$("div.index-look").find("input").each(function (i,item){
			var $item = $(item);
			data[$item.attr("name")] = $.trim($item.val());
		});
		data['page']=tmpList['page'];
		$.ajax({
			url: id == "N" ? "approve.controllerRealNameFenyeTo10" : "approve.controllerStoreTo10",
			data:data,
			async:false,
			success:function (data){
				var tmp = {};
				for(var i in data){
					tmp[data[i]['listtest']] = data[i]['userId'];
				}
				tmpList['data']=tmp;
				tmpList.lastsize = tmpList.lastsize + data.length;
				tmpList.page+=1;
				tmpList.listtest+=1;
				$.post(url,{"userId":tmpList['data'][tmpList.listtest],approveType:RZ[id]},function (data){
					$userId.val(tmpList['data'][tmpList.listtest]);
					dateTemplate(data['detailRealDTO']);
					data['enterpriseDetail']&&dateTemplate(data['enterpriseDetail']);
					data['detailStoreDTO'] && dateTemplate(data['detailStoreDTO']);
					data['address'] && addressTemplate(data['address']);
				},"jsonp");
			},
			dataType:"jsonp"
		});
	}else{
		tmpList.listtest+=1;
		$.post(url,{"userId":tmpList['data'][tmpList.listtest],approveType:RZ[id]},function (data){
			$userId.val(tmpList['data'][tmpList.listtest]);
			dateTemplate(data['detailRealDTO']);
			data['enterpriseDetail']&&dateTemplate(data['enterpriseDetail']);
			data['detailStoreDTO'] && dateTemplate(data['detailStoreDTO']);
			data['address'] && addressTemplate(data['address']);
		},"jsonp");
	}
}


//诚信深商 start↓

//跳页
function setPage(n) {
	var $pageForm = $("#searchintetrity"), curPage = $("#pageNumber").val(), totalPage = $("#total").val(), setPage = $("#setPage1").val() || $("#setPage2").val(), page;
	switch(n) {
		case -1:
			curPage--;
			if (curPage < 0) {
				curPage = 0;
			}
			page = curPage;
			break;
		case 1:
			curPage++;
			if (curPage > totalPage) {
				curPage = totalPage;
			}
			page = curPage;
			break;
		case 0:
			if(setPage){
				if (setPage > totalPage) {
					setPage = totalPage;
				} else if (setPage < 0) {
					setPage = 0;
				}
				page = setPage;
			}
			break;
		default:
			break;
	}
	$("#pageNumber").val(page);
	$pageForm.submit();
}

//详情页
function goDetail(url, id, index) {
	var _url = url, _id = id, _index = index, $integrityid = $("#integrityid"), $startNum = $("#startNum"), $detailForm = $("#searchintetrity");
	$integrityid.val(_id);
	$startNum.val(_index);
	$detailForm.attr("action", _url).submit();
}

//审核状态
function auditStatus(status){
	switch(status){
		case "1":
			successTip("操作成功");
			break;
		case "0":
			failedTip("信息提交失败！");
			break;
		case "-1":
			failedTip("众信信息提交错误！");
			break;
		case "-2":
			failedTip("众信联系人邮箱重复！");
			break;
		case "-3":
			failedTip("众信系统错误！");
			break;
		case "-4":
			failedTip("众信信息提交权限不够！");
			break;
		case "-5":
			failedTip("众信流程错误！");
			break;
		case "-16":
			failedTip("众信网络连接失败！");
			break;
		default:
			break;
	}
}

//审核成功、失败提示
function successTip(msg){
	art.dialog({content:msg,icon: 'succeed',fixed: true,time: 1.5});
}
function failedTip(msg){
	art.dialog({content:msg,icon: 'error',fixed: true,time: 1.5});
}

//实地认证
function ExamineSS(status, id,go) {
	var lstUrl=url+"local.list?";
	var integrityid = window.tmpList ? tmpList['data'][tmpList['listtest']] : id,
	sta=status==2?"PREPASSS":"REFUSAL",
	arg = {
		"memberIds":id,
		"state":sta,
		"season":status
	};
	if(isSubmit===true){return false;}//阻止表单重复提交
	isSubmit=true;
	switch(status) {
		case "2":
			$('.wait-btn input[type=button]').eq(0).val('正在提交中...').attr('disabled',true);

			//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
			isHaveMgc('local.check',{memberIds:[id]},function(){
				$.get(url + "local.preAudit", arg, function(data) {
					$('.wait-btn input[type=button]').eq(0).val('通过').attr('disabled',false);
					var _status=parseInt(data.status);
					if(_status>0){
						_status=1;
					}
					if(go){
						aReturn2(_status,data.info,data.info);
					}else{
						aReturn(_status,data.info,data.info,lstUrl);
					}
					isSubmit=false;
				}, "jsonp");
			},function(){
				$('.wait-btn input[type=button]').eq(0).val('通过').attr('disabled',false);
			});
			break;
		case "3":
			art.dialog({
				title : "拒绝理由",
				content : ref_ss,
				fixed : true,
				okVal : '保存',
				background : "#000",
				opacity : "0.3",
				ok : function() {
					var textVal = document.getElementById("testVal").value;
					if (verifyReason(textVal, "#testVal")) {
						arg.season = textVal;
						$.post(url + "local.preAudit", arg, function(data) {
							var _status=parseInt(data.status);
							if(_status>0){
								_status=1;
							}
							if(go){
								aReturn2(_status,data.info,data.info);
							}else{
								aReturn(_status,data.info,data.info,lstUrl);
							}
							isSubmit=false;
						}, "jsonp");
					} else {
						return false;
					}
				},
				init : function() {
					$(".test-focus").click(function() {
						$(".ly-d-art input").removeAttr("checked");
						$(this).children(".test-lay").remove();
					});
				},
				cancel : true,
				lock : true
			});
			break;
		default:
			break;
	}
}

//跳转
function goE(url,type){
	var form = $("#intetrityDetail"),curPage =$("#startNum").val(),totalPage = $("#total").val();
	if(type=='1'){
		if(parseInt(curPage)+1 >= parseInt(totalPage)){
			art.dialog({content:"当前页已经是最后一页",icon: 'error',fixed: true,time: 1.5});
			return;
		}
	}
	form.attr("action",url).submit();
}

//诚信深商 end↑

