var url = BASEURL+"bops-app/bops/";
//var url = "http://192.168.0.205:8080/bops-app/bops/";
//var url="http://10.10.10.44:8080/productaudit/productaudit/";
var ref =
	'<div class="ly-d-art">'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="严禁关键词恶意堆砌">1、严禁关键词恶意堆砌</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="此产品为国家违禁产品，严禁发布！">2、此产品为国家违禁产品，严禁发布！</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="信息标题没有包含该产品的关键词">3、信息标题没有包含该产品的关键词</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="信息标题里不能填写联系方式">4、信息标题里不能填写联系方式</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="供应产品信息栏不能发布采购信息">5、供应产品信息栏不能发布采购信息</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="此产品的产品分类选择错误，请选择与该产品相符合的产品分类">6、此产品的产品分类选择错误，请选择与该产品相符合的产品分类</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写与该产品相符合的规格">7、请填写与该产品相符合的规格</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写与该产品相符合的型号">8、请填写与该产品相符合的型号</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="请填写与该产品相符合的品牌">9、请填写与该产品相符合的品牌</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品图片与贵公司及产品不相符">10、产品图片与贵公司及产品不相符</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品图片框不能上传证书图片，请将证书图片上传至证书栏">11、产品图片框不能上传证书图片，请将证书图片上传至证书栏</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品图片不清晰">12、产品图片不清晰</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="严禁上传淫秽、低俗、反动等国家违禁图片">13、严禁上传淫秽、低俗、反动等国家违禁图片</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品详细说明过于简单">14、产品详细说明过于简单</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品详细说明内容要包含中文说明">15、产品详细说明内容要包含中文说明</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品详细说明不能包含国家违禁产品">16、产品详细说明不能包含国家违禁产品</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品详细说明的内容格式不正确致使内容不能正常显示">17、产品详细说明的内容格式不正确致使内容不能正常显示</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品详细说明严禁上传淫秽、低俗、反动等国家违禁图片">18、产品详细说明严禁上传淫秽、低俗、反动等国家违禁图片</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="报价单位选择错误，请选择与该产品相符合的报价单位">19、报价单位选择错误，请选择与该产品相符合的报价单位</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="产品价格填写有误，请填写与该产品相符合的市场价格">20、产品价格填写有误，请填写与该产品相符合的市场价格</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="信息标题里要包含正确的中文产品名称">21、信息标题里要包含正确的中文产品名称</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="华南城网暂时不能为该行业提供服务">22、华南城网暂时不能为该行业提供服务</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="贵公司旺铺的公司名称填写不正确">23、贵公司旺铺的公司名称填写不正确</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="图片有第三方水印">24、图片有第三方水印</label></p>'+
		'<p><label><input type="checkbox" onclick="selVal(this)" name="refuse_reason" value="图片无法正常显示">25、图片无法正常显示</label></p>'+
	'</div>'+
	'<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';

$(function(){
	$("li.li-last a:contains('"+$("#masterCur").attr("value")+"')").closest("li").addClass("ln-3th-cur");
	try{
		picUpload = new SWFUpload(uploadSettings("marketFace"));
	}catch(e){};

	editorContent();

	//批量入优质产品库
	//批量入库
	var $tbody = $('tbody');
	$('.import-qualityproducts').bind('click', function(event) {
		var $checked = $tbody.find('input:checked');
		if($checked.length > 0){
			var ids = [];
			$checked.each(function(){
				ids.push(this.value);
			});
			importQualityProducts(ids);
		}else{
			artDialog.alert('请先选择您要操作的项！');
		}
	});


});

function importQualityProducts(ids){//批量入优质产品库
	$.post('productAudit.insertQualityProduct',{productIds: ids}, function(data) {
		aReturn(data,"入库成功！","入库失败！");
	},'jsonp');
}

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

function movePassed(){
	var selT=$("table tbody .list-id input:checked").length;
	if(selT>0){
		var tmp=[];
		for(var i=0;i<selT;i++){
			tmp.push($("table tbody .list-id input:checked").eq(i).attr("value"));
		}
		$.get(url+"productAudit.setPassStatus",{boxes:tmp.join(","),checked:getURL_argument('checked')},function(data){aReturn(data,"审核成功！","审核不通过");},"jsonp");
	}else{
		art.dialog({
			content: '请先选择您要转移的产品！',
			fixed: true,
			time: 1.5
		});
	}
}
function moveP(){
	var selT=$("#no").val();
	
	//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
	isHaveMgc('productAudit.productCheck',{ids:[selT]},function(){
		$.get(url+"productAudit.setPassStatus",{boxes:selT,checked:getURL_argument('checked')},function(data){
		aReturnT(data,"审核成功！","审核不通过");
		data == 0 || setTimeout(function (){
			$("input[value='关闭']").trigger("click");
		},1500);
	},"jsonp");
	});
}
function movePOne(id){
	var selT=$(id).parent("td.e-cent").siblings(".list-id").children("input").attr("value");
	
	//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
	isHaveMgc('productAudit.productCheck',{ids:[selT]},function(){
		$.get(url+"productAudit.setPassStatus",{boxes:selT,checked:getURL_argument('checked')},function(data){aReturn(data,"审核成功！","审核不通过");},"jsonp");
	});
}
function moveNotPassed() {
	var $tbody = $('table tbody');
	var $selT = $tbody.find(".list-id input:checked");
	var selT = $selT.length;
	var tmp = [];
	var reason = function() {
		art.dialog({
			title: "拒绝理由",
			content: ref,
			fixed: true,
			okVal: '保存',
			background: "#000",
			opacity: "0.3",
			ok: function() {
				var textVal = $.trim($("#testVal").val());
				if (verifyReason(textVal, "#testVal")) {
					$.post(url + "productAudit.setNoPassStatus", {
						boxes: tmp.join(','),
						reson: textVal,
						checked: getURL_argument('checked')
					}, function(data) {
						aReturn(data, "操作成功！", "操作失败!");
					}, "jsonp");
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
	}

	if (selT > 0) {
		for (var i = 0; i < selT; i++) {
			tmp.push($("table tbody .list-id input:checked").eq(i).attr("value"));
		}
		$.get('productAudit.CheckProsRepublishAndRecommend', {
			productIds: tmp.join(',')
		}, function(data) {
			if (data.state) {
				$tbody.find('tr[data-republish] td:eq(3)').css('color', 'red');
				art.dialog({
					title: "提示",
					content: data.msg || '其中有产品在特殊列表中，如果移动则在该列表消失',
					fixed: true,
					okVal: '确定',
					ok: reason,
					cancel: true
				});
				$.each((data.recommendIds || []).concat((data.republishIds || [])), function(i, v) {
					$tbody.find('input[value="' + v + '"]').parents('tr').find('td:eq(3)').css('color', 'red');
				});
			} else {
				reason();
			}
		}, 'json')
	} else {
		art.dialog({
			content: '请先选择您要转移的产品！',
			fixed: true,
			time: 1.5
		});
	}
}
function moveNPOne(id){
	var selT=$(id).parent("td.e-cent").siblings(".list-id").children("input").attr("value");
	art.dialog({
		title:"拒绝理由",
		content: ref,
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var textVal=$.trim($("#testVal").val());
			if(verifyReason(textVal,"#testVal")){
				$.post(url+"productAudit.setNoPassStatus",{boxes:selT,reson:textVal,checked:getURL_argument('checked')},function(data){aReturn(data,"操作成功！","操作失败!");},"jsonp");
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
function removeP() {
	var selT = $('#no').val();
	var reason = function() {
		art.dialog({
			title: "拒绝理由",
			content: ref,
			fixed: true,
			okVal: '保存',
			background: "#000",
			opacity: "0.3",
			ok: function() {
				var textVal = $.trim($("#testVal").val());
				if (verifyReason(textVal, "#testVal")) {
					$.post(url + "productAudit.setNoPassStatus", {
						boxes: selT,
						reson: textVal,
						checked: getURL_argument('checked')
					}, function(data) {
						aReturn(data, "操作成功！", "操作失败!");
						data == 0 || setTimeout(function() {
							$("input[value='关闭']").trigger("click");
						}, 1500);
					}, "jsonp");
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
	}
	$.get('productAudit.CheckProRepublishAndRecommend', {
		productId: selT
	}, function(data) {
		if (data.state) {
			art.dialog({
				title: "提示",
				content: data.msg || '该产品在特殊列表中，如果移动则在该列表消失。',
				fixed: true,
				okVal: '确定',
				ok: reason,
				cancel: true
			});
		} else {
			reason();
		}
	}, 'json');
}
function aReturnT(tmp,po,pt){
	if(tmp>=1){
			art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
			setTimeout(function(){location.href = location.href;},1500);
		}else{
			art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
		}
}
function aReturn(tmp,po,pt){
	if(tmp>=1){
			art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
			setTimeout(function(){location.href = location.href;},1500);
		}else{
			art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
		}
}

function secKeyDown(e,tmp,id){
　 var e=e||event;
　 var currKey=e.keyCode||e.which||e.charCode;
　 if((currKey==13)) {
	var seaV=document.getElementById("search").value,selV=$("#select option:selected").attr("value");
		switch(id){
			case "1":
				$("#searchBy").attr('href','productAudit.findProductByConditionOnAllProduct?select='+selV+'&search='+seaV);
				window.location.href=$("#searchBy").attr('href');
				break;
			case "2":
				$("#searchBy").attr('href','productAudit.findProductByConditionOnChecked?select='+selV+'&search='+seaV+'&checked='+document.getElementById("checked").value);
				window.location.href=$("#searchBy").attr('href');
				break;
			default:
				break;
		}
	}
}

function pageKeyDown(e,tmp){
　 var e=e||event;
　 var currKey=e.keyCode||e.which||e.charCode;
　 if((currKey==13)) {
		var seaV=$(tmp).attr("value"),pageId=$(tmp).next().attr("id");
		switch(pageId){
			case "jumperTo_1":
				$("#jumperTo_1").attr('href','productAudit.findAllProductByJump?current='+document.getElementById("current").value+'&jump='+seaV+'&page='+document.getElementById("page").value+'&total='+document.getElementById("total").value);
				window.location.href=$("#jumperTo_1").attr('href');
				break;
			case "jumperTo2_1":
				$("#jumperTo2_1").attr('href','productAudit.findAllProductByJump2?current2='+document.getElementById("current2").value+'&jump2='+seaV+'&page2='+document.getElementById("page2").value+'&total2='+document.getElementById("total2").value);
				window.location.href=$("#jumperTo2_1").attr('href');
				break;
			case "jumperTo3_1":
				$("#jumperTo3_1").attr('href','productAudit.findProductByTimeOnAllProductJump1?current='+document.getElementById("current").value+'&jump='+seaV+'&page='+document.getElementById("page").value+'&total='+document.getElementById("total").value+"&startT="+document.getElementById("startT").value+"&endT="+document.getElementById("endT").value);
				window.location.href=$("#jumperTo3_1").attr('href');
				break;
			case "jumperTo4_1":
				$("#jumperTo4_1").attr('href','productAudit.findProductByTimeOnAllProductJump2?current2='+document.getElementById("current2").value+'&jump2='+seaV+'&page2='+document.getElementById("page2").value+'&total2='+document.getElementById("total2").value+"&startT2="+document.getElementById("startT2").value+"&endT2="+document.getElementById("endT2").value);
				window.location.href=$("#jumperTo4_1").attr('href');
				break;
			case "jumperTo5_1":
				$("#jumperTo5_1").attr('href','productAudit.findProductByConditionOnAllProductJump1?current='+document.getElementById("current").value+'&jump='+seaV+'&page='+document.getElementById("page").value+'&total='+document.getElementById("total").value+"&selected="+document.getElementById("selected").value+"&searched="+document.getElementById("searched").value);
				window.location.href=$("#jumperTo5_1").attr('href');
				break;
			case "jumperTo6_1":
				$("#jumperTo6_1").attr('href','productAudit.findProductByConditionOnAllProductJump2?current2='+document.getElementById("current2").value+'&jump2='+seaV+'&page2='+document.getElementById("page2").value+'&total2='+document.getElementById("total2").value+"&selected2="+document.getElementById("selected2").value+"&searched2="+document.getElementById("searched2").value);
				window.location.href=$("#jumperTo6_1").attr('href');
				break;
			case "jumperTo":
				$("#jumperTo").attr('href','productAudit.findProductOnCheckedByJump?current='+document.getElementById("current").value+'&jump='+seaV+'&page='+document.getElementById("page").value+'&total='+document.getElementById("total").value+"&checked="+document.getElementById("checked").value);
				window.location.href=$("#jumperTo").attr('href');
				break;
			case "jumperTo2":
				$("#jumperTo2").attr('href','productAudit.findProductOnCheckedByJump2?current2='+document.getElementById("current2").value+'&jump2='+seaV+'&page2='+document.getElementById("page2").value+'&total2='+document.getElementById("total2").value+"&checked2="+document.getElementById("checked").value);
				window.location.href=$("#jumperTo2").attr('href');
				break;
			case "jumperTo3":
				$("#jumperTo3").attr('href','productAudit.findProductByTimeOnCheckedJump1?current='+document.getElementById("current").value+'&jump='+seaV+'&page='+document.getElementById("page").value+'&total='+document.getElementById("total").value+"&startT="+document.getElementById("startT").value+"&endT="+document.getElementById("endT").value+"&checked="+document.getElementById("checked").value);
				window.location.href=$("#jumperTo3").attr('href');
				break;
			case "jumperTo4":
				$("#jumperTo4").attr('href','productAudit.findProductByTimeOnCheckedJump2?current2='+document.getElementById("current2").value+'&jump2='+seaV+'&page2='+document.getElementById("page2").value+'&total2='+document.getElementById("total2").value+"&startT2="+document.getElementById("startT2").value+"&endT2="+document.getElementById("endT2").value+"&checked2="+document.getElementById("checked2").value);
				window.location.href=$("#jumperTo4").attr('href');
				break;
			case "jumperTo5":
				$("#jumperTo5").attr('href','productAudit.findProductByConditionOnCheckedJump1?current='+document.getElementById("current").value+'&jump='+seaV+'&page='+document.getElementById("page").value+'&total='+document.getElementById("total").value+"&selected="+document.getElementById("selected").value+"&searched="+document.getElementById("searched").value+"&checked="+document.getElementById("checked").value);
				window.location.href=$("#jumperTo5").attr('href');
				break;
			case "jumperTo6":
				$("#jumperTo6").attr('href','productAudit.findProductByConditionOnCheckedJump2?current2='+document.getElementById("current2").value+'&jump2='+seaV+'&page2='+document.getElementById("page2").value+'&total2='+document.getElementById("total2").value+"&selected2="+document.getElementById("selected2").value+"&searched2="+document.getElementById("searched2").value+"&checked2="+document.getElementById("checked2").value);
				window.location.href=$("#jumperTo6").attr('href');
				break;
			default:
				break;
		}
	}
}

function timeKeyDown(e,tmp,po){
	var e=e||event;
　 var currKey=e.keyCode||e.which||e.charCode;
　 if((currKey==13)) {
		switch(po){
			case "1":
				window.location.href="productAudit.findProductByTimeOnAllProduct?startTime="+document.getElementById("startTime").value+"&endTime="+document.getElementById("endTime").value;
			break;
			case "2":
				window.location.href="productAudit.findProductByTimeOnChecked?startTime="+document.getElementById("startTime").value+"&endTime="+document.getElementById("endTime").value+"&checked="+document.getElementById("checked").value;
			break;
			default:
			break;
		}

	}
}
function selVal(tmp) {
	$(".test-focus").find(".test-lay").remove();
	var ly = $("#testVal").val(),addstr = tmp.value.replace(/[\.,;!。，；！、]\s*$/,"");
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

//在弹出框中显示原图
function thisimg(obj){
	var imgurl = obj.src;
	csc.useDialog(function(){
		artDialog({
			content:"<img src=\"" + imgurl + "\" />" ,
			fixed: true,
			padding:"5px"
		});
	})
}
