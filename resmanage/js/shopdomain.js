//Enter键
function EnterKeyDown(obj,Obj) {
	var
	o = obj,
	O = Obj || {};
	$(o).keydown(function(e){
		var e=e||event;
　 		var currKey=e.keyCode||e.which||e.charCode;
		if(currKey == 13){
 			$(O).trigger("click");
			return;
		}
	});
}


$(function(){
	EnterKeyDown("#goPage1","#jump");EnterKeyDown("#goPage2","#jump2");
	//分页跳转
	$("#jump,#jump2").bind("click",function(){
		var
		$t = $(this),
		pageVal = $t.parents("span.page-r").find(".goPage").val(),
		url = $t.prev("input:hidden").val(),
		totalPage = parseFloat($(".page-r strong").html());
		if(totalPage < parseFloat(pageVal)) {
			pageVal = totalPage;
		}
		if(pageVal == ""){
			pageVal = 1;
		}
		location = url + "&page=" + pageVal;
	});
});

//添充拒绝理由
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

//禁用提示框
function nopassfun(callback){
		var tmpV = '<div class="ly-d-art sel-i-val domain-val"><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="您的旺铺包含敏感信息，旺铺管理员已将其禁用。禁用后买家无法访问您的旺铺，无法找到您的产品。请尽快修改并联系客服重新开通。">1.	您的旺铺包含敏感信息，旺铺管理员已将其禁用。禁用后买家无法访问您的旺铺，无法找到您的产品。请尽快修改并联系客服重新开通。</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="按照您提出的关闭旺铺要求，旺铺管理员已将其禁用。禁用后买家无法访问您的旺铺，无法找到您的产品。如有任何疑问，请联系客服。">2. 按照您提出的关闭旺铺要求，旺铺管理员已将其禁用。禁用后买家无法访问您的旺铺，无法找到您的产品。如有任何疑问，请联系客服。</p></div>';
		art.dialog({
			title : '禁用理由',
			content : tmpV + '<div class="test-focus"><textarea class="test-val" onfocus="textarea_maxlen.dRMouse()"  onblur="textarea_maxlen.eRMouse()" id="testVal" ></textarea><div id="test_msg" style="color:#F00;"></div><div class="test-lay" style="width:95%;">执行此操作将导致旺铺不可访问，操作需谨慎！您输入的禁用理由将直接发送给卖家，请注意礼貌用语。</div></div>',
			fixed : true,
			okVal : '保存',
			background : "#000",
			opacity : "0.3",
			ok : function () {
				var textVal = document.getElementById("testVal").value;
				if(!re_jc(textVal)){//检查理由格式.
					return false;
				}
				callback(textVal);
			},
			init : function () {
				$(".test-focus").click(function () {
					$(this).children(".test-lay").remove();
				});
			},
			cancel : true,
			lock : true
		});
}
//拒绝理由检测
function re_jc(str){
	var msg="";
	if ($.trim(str) == "") {
		msg = "请选择或输入理由!";
	}else if(str.length < 5){
		msg = "理由不能少于5个字！";
	}else if(str.length > 2000){
		msg = "理由不能超过2000个字！";
	}
	if(msg != ""){
		$("#test_msg").show().text(msg);
		return false;
	}else{
		$("#test_msg").hide();
		return true;
	}
}

function aReturn(tmp, po, pt) {
	if (tmp =="true") {
		art.dialog({
			content : po,
			icon : 'succeed',
			fixed : true,
			time : 1.5
		});
		setTimeout(function () {
			location.href = location.href;
		}, 1500);
	} else {
		art.dialog({
			content : pt,
			icon : 'error',
			fixed : true,
			time : 1.5
		});
	}
}

//域名重置
function ResetShop(obj){
	var memberId = obj.name;
	art.dialog({
		title : '域名重置',
		content : '你确认要重置域名吗？',
		fixed : true,
		ok : function(){
			$.post("auditShop.resetShop", {
				"memberId" : memberId
			}, function (data) {
				aReturn(data, "操作成功！", "操作失败");
			});
		},
		background : "#000",
		opacity : "0.3",
		cancel:true,
		lock:true
	});
}

//域名启用
function Adopt(obj){
	var memberId = $(obj).data("memberid");
	art.dialog({
		title : '启用域名',
		content : '你确认需要启用此旺铺吗？',
		fixed : true,
		ok : function(){
			$.post("auditShop.adoptShop", {
				"memberId" : memberId
			}, function (data) {
				aReturn(data, "操作成功！", "操作失败");
			});
		},
		background : "#000",
		opacity : "0.3",
		cancel:true,
		lock:true
	});
}

function goback(){
	var tag = getURL_argument("tag");
	url = setURL_argument({"inquiryId":null,"tag":null,"line":null});
	tag_str = {"Y":"auditShop.adoptShopList","N":"auditShop.notAdoptShopList"};
	document.location.href = tag_str[tag] + "?" + url.replace(/^[^\?]*\?/ig,"");
}

function setURL_argument(){//修改、添加,删除URL参数
	var set = function(key,val,url_){
		var url = url_ || location.href;
		if(url.indexOf("?")<=-1){ url += "?";};
		var paraString = url.substring(url.indexOf("?")+1,url.length) , key = key || "", val = val || "";
		if(key=="") {return url.replace(/\?*\s*$/,"")};
		var reg = new RegExp('\\b' + key + '=[^&]*',"");
		if(reg.test(paraString) && val !=="" ){//值不为空，则替换
			paraString = paraString.replace(reg,key + "=" + val);
		}else if(reg.test(paraString) && val ==""){//值为空，则删除
			paraString = paraString.replace(reg,"");
		}else if(val!==""){//没有则添加
			paraString += "&" + key + "=" + val;
		}
		paraString = paraString.replace(/(^&*|&*$|&*(?=&))/g,"")
		return url.split("?")[0] + (paraString == "" ? "" : "?" + paraString);
	}
	if(typeof(arguments[0]) == "string"){
               return set.apply(this,arguments);
	}else if(typeof(arguments[0])=="object"){
		var arg = arguments[0],url = arguments[1] || location.href;
		for(aaa in arg){
			url = set(aaa,arg[aaa],url);
		};
		return url;
	}else{return location.href;}
}

function getURL_argument(kdy){//JS获取URL参数
	var url = location.href;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {}
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf ("=")+1,j.length);
	}
	var returnValue = paraObj[kdy.toLowerCase()];
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}
};

//详请页,下一条
function nextDetail(){
	if(shop_count==(shop_currentPage-1)*20+shop_line){
		art.dialog({
			content : "已经是最后一条了",
			icon : 'error',
			fixed : true,
			time : 1.5
		});
	}else{
		shop_line = shop_line + 1;
		window.location.href="auditShop.getDetail?tag="+shop_tag+"&startTime="+shop_startTime+"&endTime="+shop_endTime+"&page="+shop_page+"&keyWord="+shop_keyWord+"&condition="+shop_condition+"&line="+shop_line +"&currentPage="+shop_currentPage+"&count="+shop_count;
	}
}

//域名禁用
function Refuse(obj) {
	var
	memberId = $(obj).data("memberid");
	nopassfun(function(nostr){
		$.post("auditShop.notAdoptShop", {
			"memberId" : memberId,
			refuseReason : nostr
		}, function (data) {
			aReturn(data, "操作成功！", "操作失败");
		});
	})
	return false;
}

//旺铺删除
function removeShop(obj) {
	var
	memberId = $(obj).data("memberid");
		
art.dialog({
		title : '删除旺铺',
		content : '此信息一经删除，将无法恢复，是否删除？',
		fixed : true,
		ok : function(){
			$.post("auditShop.removeShop", {
				"memberId" : memberId
			}, function (data) {
				aReturn(data, "操作成功！", "操作失败");
			});
		},
		background : "#000",
		opacity : "0.3",
		cancel:true,
		lock:true
	});
		
	return false;
}

function tranDomain(f,t){
	$.get('submainVerify.submainInfo',{memberIdL:f,memberIdR:t},function(data){
		var html = '<div class="tran-domain">';
		html += '<div class="tran-domain-hd"><strong>旺铺域名：</strong>'+data[0]['submain']+'.csc86.com &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>申请时间：</strong>'+data[0]['createTime']+'</div>';
		html +='<div class="g-c-f tran-domain-bd"><dl class="g-f-l"><dt>会员帐号：</dt><dd>'+data[0]['account']+'</dd><dt>企业名称：</dt><dd>'+data[0]['companyL']+'</dd><dt>主营产品：</dt><dd>'+data[0]['product']+'</dd><dt>联系电话：</dt><dd>'+data[0]['moblie']+'</dd><dt>企业地址：</dt><dd>'+data[0]['address']+'</dd></dl>';
		html +='<dl class="g-f-r"><dt>会员帐号：</dt><dd>'+data[1]['account']+'</dd><dt>企业名称：</dt><dd>'+data[1]['company']+'</dd><dt>主营产品：</dt><dd>'+data[1]['product']+'</dd><dt>联系电话：</dt><dd>'+data[1]['moblie']+'</dd><dt>企业地址：</dt><dd>'+data[1]['address']+'</dd></dl></div>';
		html += '</div>';
		art.dialog({
			title:'域名转让详情',
			content :html,
			lock:true,
			fixed : true,
			ok:true
		});
	},'jsonp');
}

$(function(){
	$(document).delegate('a[data-from][data-to]', 'click', function(event) {
		tranDomain($(this).data('from'),$(this).data('to'));
	});
})
