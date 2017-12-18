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
	//EnterKeyDown("#goPage1","#jump");EnterKeyDown("#goPage2","#go");
	//分页跳转
	$("#jump,#go").bind("click",function(){
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

//列表页批量通过审核
function batchAdopt() {
	var n = $("table tbody .list-id input:checked").length;
	if (n < 1) {
		art.dialog({
		title : '提示',
		content : '请先选择操作项',
		fixed : true
		});
		return false;
	}
	art.dialog({
		title : '提示',
		content : '确定要执行操作么？',
		fixed : true,
		okVal : '确定',
		opacity : "0.3",
		ok : function () {
			var
			id = $("table tbody .list-id input:checked").map(function(){
				return this.value;
			}).get().join(",");
			$.get("auditArticl.batchAdopt", {"id" : id}, function (data) {
				aReturn(data, "操作成功！", "操作失败！");
			});
		},
		cancel : true,
		lock : true
	});
}

//列表页批量拒绝通过
function batchNotAdopt() {
	var n = $("table tbody .list-id input:checked").length;
	if (n < 1) {
		art.dialog({
		title : '提示',
		content : '请先选择操作项',
		fixed : true
		});
		return false;
	}
	var id=$("table tbody .list-id input:checked").map(function(){
		return this.value;
	}).get().join(",");
	var memberId = $("table tbody .list-id input:checked").map(function(){
		return $(this).data("memberid");
	}).get().join(",");
	nopassfun(function(nostr){
		$.get("auditArticl.batchNotAdopt", {
			id : id,
			member_Id:memberId,
			refuseReason : nostr
		}, function (data) {
			aReturn(data, "操作成功！", "操作失败！");
		});
	})
}

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

//拒绝提示框
function nopassfun(callback){
		var tmpV = '<div class="ly-d-art sel-i-val"><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="动态标题必须与动态内容相关">1、动态标题必须与动态内容相关</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="动态内容不能包含国家违禁产品或政治信息">2、动态内容不能包含国家违禁产品或政治信息</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="不能发布国家违禁产品、淫秽及政治图片">3、不能发布国家违禁产品、淫秽及政治图片</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="请发布正确的动态信息">4、请发布正确的动态信息</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="动态标题不得含有联系方式">5、动态标题不得含有联系方式。</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="动态内容必须与企业经营业务有关">6、动态内容必须与企业经营业务有关。</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="动态内容不得包含国家违禁产品及政治信息">7、动态内容不得包含国家违禁产品及政治信息。</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="动态图片与动态内容相符，严谨暴力、色情、政治敏感、侵权等图片">8、动态图片与动态内容相符，严谨暴力、色情、政治敏感、侵权等图片。</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="动态关键词与动态内容相符，不含与内容无关关键词">9、动态关键词与动态内容相符，不含与内容无关关键词。</p><p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="图片有第三方水印">10、图片有第三方水印。</p></div>';
		art.dialog({
			title : '拒绝理由',
			content : tmpV + '<div class="test-focus"><textarea class="test-val" onfocus="textarea_maxlen.dRMouse()"  onblur="textarea_maxlen.eRMouse()" id="testVal" ></textarea><div id="test_msg" style="color:#F00;"></div><div class="test-lay">请输入理由，最多2000个字。</div></div>',
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

//详情页,通过审核
function adopt_xq(id, tag) {
	//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
	isHaveMgc('auditArticl.check',{ids:[id]},function(){
		$.post("auditArticl.batchAdopt", {
			"id" : id
		}, function (data) {
			aReturn(data, "审核成功！", "审核不通过", tag);
		});
	});
}

//列表页单条审核通过
function adopt(obj) {
	var id = $(obj).attr("name");
	
	//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
	isHaveMgc('auditArticl.check',{ids:[id]},function(){
		$.post("auditArticl.batchAdopt", {
			id : id
		}, function (data) {
			aReturn(data, "审核成功！", "审核不通过");
		});
	});
}

function goback(){
	var tag = getURL_argument("tag");
	url = setURL_argument({"inquiryId":null,"tag":null,"line":null});
	tag_str = {"C":"auditArticl.waitArticlList","Y":"auditArticl.adoptArticlList","N":"auditArticl.notAdoptArticlList","ALL":"auditArticl.allArticlList"};
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

//详情页,拒绝通过
function Refuse_xq(id, memberId) {
	nopassfun(function(nostr){
		var parId = id,
		member_Id = memberId;
		$.post("auditArticl.batchNotAdopt", {
			id : parId,
			member_Id : member_Id,
			refuseReason : nostr
		}, function (data) {
			aReturn(data, "操作成功！", "操作失败！");
		});
	})
}

//详请页,下一条
function nextDetail(){
	if(articl_count==(articl_currentPage-1)*20+articl_line){
		art.dialog({
			content : "已经是最后一条了",
			icon : 'error',
			fixed : true,
			time : 1.5
		});
	}else{
		articl_line = articl_line + 1;
		window.location.href="auditArticl.getDetail?tag="+articl_tag+"&startTime="+articl_startTime+"&endTime="+articl_endTime+"&page="+articl_page+"&keyWord="+articl_keyWord+"&condition="+articl_condition+"&line="+articl_line +"&currentPage="+articl_currentPage+"&count="+articl_count;
	}
}

//列表页拒绝通过
function Refuse(obj) {
	var
	id = $(obj).attr("name"),
	memberId = $(obj).data("memberid");
	nopassfun(function(nostr){
		var parId = id;
		$.post("auditArticl.batchNotAdopt", {
			id : parId,
			member_Id : memberId,
			refuseReason : nostr
		}, function (data) {
			aReturn(data, "审核成功！", "审核不通过");
		});
	})
	return false;
}

$(function(){
	if($("#isdelete").val()==='true'){
		art.dialog({
			content : "此篇文章已被发布者删除！",
			icon : 'error',
			fixed : true,
			ok:function(){
				goback();
			},
			okVal:'返回',
			time:false
		});
	}

	editorContent();
});