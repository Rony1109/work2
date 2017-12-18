var url =BASEURL+"bops-app/bops/";
//会员审核
var refM_arr = [
	"请上传代表您个人形象的图片",
	"严禁上传淫秽、低俗、反动等违禁图片",
	"填写您的真实姓名",
	"严禁填写国家违禁产品名称",
	"请填写正确的手机号码",
	"请填写正确的电子邮箱",
	"请填写正确的固定电话号码",
	"请填写正确的传真号码",
	"联系地址必须填写正确、完整的地址",
	"请填写正确的公司名称",
	"请填写正确的部门",
	"请填写正确的职位",
	"工作经历栏不能填写与您工作经历无关的内容"
];
var refC_arr = [
	"企业标志图片有误，请上传代表贵公司形象的企业图片",
	"企业名称格式不正确",
	"您填写的公司已经注册",
	"此公司不存在，找不到相关公司营业执照注册信息",
	"企业联系地址必须填写正确、完整的地址",
	"请填写与贵公司相关联的网站网址",
	"您填写的网址不能正常打开",
	"主营行业选择错误，请选择与贵公司相符合的行业",
	"本平台禁止发布国家违禁产品",
	"请正确填写贵公司的主营产品",
	"主营产品栏不能填写产品规格型号",
	"请填写正确的法人姓名",
	"企业类型选择有误，请选择与贵公司相符合的企业类型",
	"经营模式选择有误，请选择与贵公司相符合的企业经营模式",
	"本平台是中文平台，公司介绍必须填写中文",
	"公司介绍内容格式不正确，导致页面不能正常显示",
	"公司介绍不能包含国家违禁产品和服务",
	"本平台暂时不为该行业提供服务",
	"图片有第三方水印",
	"请上传清晰的企业LOGO图片",
	"请填写正确的公司介绍内容"
];

var refM = getref_html(refM_arr)
var refC = getref_html(refC_arr);

function getref_html(res){
	var html;
	html = '<div class="ly-d-art"><p>请选择或输入拒绝理由:</p>';
	for(i=0;i<res.length;i++){
		html += '<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="'+res[i]+'">'+(i+1)+'、'+res[i]+'</p>'
	}
	html += '</div>';
	html += '<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';
	return html;
};

$(function(){
	$(".up-statr").click(function(){
		if($(this).html()=="启用"){
			$(this).html("禁用");
		}else{
			$(this).html("启用");
		}
	});
	$("li.li-last a:contains('"+$("#masterCur").attr("value")+"')").closest("li").addClass("ln-3th-cur");
	data_text_Enter();
	hs = typeof(hs)=="undefined" ? null : hs;
	if (hs) {
		hs.graphicsDir = 'http://resmanage.csc86.com/js/highslide-4.1.13/highslide/graphics/';
		hs.showCredits = false;
		hs.wrapperClassName = 'wide-border';
		hs.outlineType = 'rounded-white';
		hs.wrapperClassName = 'draggable-header';
		hs.lang["restoreTitle"] = "点击还原,支持鼠标拖动.";
		$("a.highslide").on("click", function () {
			return hs.expand(this);
		})
	}

	//个人会员入优质待审核库
	//批量入库
	var $tbody = $('tbody');
	$('.import-members').bind('click', function(event) {
		var $checked = $tbody.find('input:checked');
		if($checked.length > 0){
			var ids = [];
			$checked.each(function(){
				ids.push(this.value);
			});
			importMember(ids);
		}else{
			artDialog.alert('请先选择您要操作的项！');
		}
	});
	//单个入库
	$tbody.delegate('a[data-memberid]', 'click', function(event) {
		importMember([$(this).data('memberid')]);
		event.preventDefault();
	});

	//企业会员入库
	//批量入库
	var $tbody = $('tbody');
	$('.import-cpmembers').bind('click', function(event) {
		var $checked = $tbody.find('input:checked');
		if($checked.length > 0){
			var ids = [];
			$checked.each(function(){
				ids.push($(this).siblings('input[name="memberIds"]').val());
			});
			importCompanyMember(ids);
		}else{
			artDialog.alert('请先选择您要操作的项！');
		}
	});
	//单个入库
	$tbody.delegate('a[data-cpmemberid]', 'click', function(event) {
		console.log([$(this).data('cpmemberid')]);
		importCompanyMember([$(this).data('cpmemberid')]);
		event.preventDefault();
	});

});

function importMember(ids){//个人会员入库
	$.post('qualityManager.importBuyer',{memberIds: ids}, function(data) {
		aReturn(data,"入库成功！","入库失败！");
	},'jsonp');
}

function importCompanyMember(ids){//企业会员入库
	$.post('qualityManager.importSeller',{memberIds: ids}, function(data) {
		aReturn(data,"入库成功！","入库失败！");
	},'jsonp');
}

function maxLength(text,num){
	var num = num || 2000;
	return text.length<=num ? true : false;
}

function verifyReason(text,id){
	if(text.length == 0){
		aReturn(0,"","请选择或输入理由");
		return false;
	}else if(text.length <=5 ){
		aReturn(0,"","理由少于5个字符");
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

function mvWait_s(obj,tmp,pr){
	var selT=$(obj).parent("td.e-cent").siblings(".list-id").children("input").attr("value");
	if(pr=="pr"){
		$.get(url+"verifymanage.updatePersonalState",{laststate:"wait",uuid:selT},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
	}else{
		$.get(url+"verifymanage.updateEnterpriseState",{laststate:"wait",uuid:selT},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
	}
}

function showDetail(listtest,id, enterpriseId){
	var verifystate = $( document.body ).find("input[name='verifystate']").val(),
		comefrom = $( document.body ).find("input[name='comefrom']").val(),
		$form = $("form[action^='verifymanage']");

	if ( verifystate == 'verifystate' && comefrom == 'import' && enterpriseId ) {
		$form.attr("action",$form.attr("action")+"?uuid="+id+"&listtest="+listtest + "&enterpriseId=" + enterpriseId).trigger("submit");
	} else {
		$form.attr("action",$form.attr("action")+"?uuid="+id+"&listtest="+listtest).trigger("submit");
	}
}

//详情页模板
function dateTemplate(data){
	$.each(data,function (i,item){
		if(i == 'imgUrl' || i == 'userImgUrl'){
			if($.trim(item) == "")
				item = '&nbsp;';
			else
				item = '<a href="http://img.csc86.com/'+item+'" class="highslide"><img src="http://img.csc86.com/'+item+'" width="45" height="45" /></a>'
		}
		if(i == "submain"){
			if(item == ""){
				item = '&nbsp;';
			}else{
				item = '<a href="http://'+item+'.csc86.com/" target="_blank">http://'+item+'.csc86.com/</a>';
			}
		}
		if(i == "workList"){
			var tmp = '';
			for(var j in item){
				if($.trim(item[j]["company"]).length>0 && $.trim(item[j]["section"]).length>0 && $.trim(item[j]["post"]).length>0 && $.trim(item[j]["startTime"]).length>0 && $.trim(item[j]["endTime"]).length>0){
					tmp += '<tr><th>公司名称：</th><td>'+item[j]["company"]+'</td></tr>';
					tmp += '<tr><th>部门：</th><td>'+item[j]["section"]+'</td></tr>';
					tmp += '<tr><th>职位：</th><td>'+item[j]["post"]+'</td></tr>';
					tmp += '<tr><th>工作时间：</th><td>'+item[j]["startTime"]+' 到 '+item[j]["endTime"]+'</td></tr>';
				}
			}
			if(tmp.length>0){
				item = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="at-look">'+tmp+'</table>';
			}else{
				item = '';
			}
		}
		$("#"+i).html(item);
	});
	ImgZoomFun("a.highslide");
}

//下一条
function verifyNextId(){
	if(tmpList.listtest == (tmpList.total-1)){
		art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
		return;
	}
	var
		url = {"E":"verifymanage.nextEnterpriseDetail","P":"verifymanage.nextPersonalDetail"},
		id = location.pathname.indexOf("enterpriseDetail")>0 ? "E" : "P";
	if(tmpList.listtest == tmpList.lastsize){
		var data = {};
		$("div.index-look").find("input").each(function (i,item){
			var $item = $(item);
			data[$item.attr("name")] = $.trim($item.val());
		});
		data['pageindex']=tmpList['pageindex'];
		$.ajax({
			url: id == "E" ? "verifymanage.findEnterpriseTo10" : "verifymanage.findPersonalTo10",
			data:data,
			async:false,
			success:function (data){
				var tmp = {};
				for(var i in data){
					tmp[data[i]['listtest']] = [data[i][id == "E" ? 'tempId' : 'uuid'],id == "E" ? data[i]['memberId'] : ''];
				}
				tmpList['data']=tmp;
				tmpList.lastsize = tmpList.lastsize + data.length;
				tmpList.pageindex+=1;
				tmpList.listtest+=1;
				$.post(url[id],{uuid:tmpList['data'][tmpList.listtest][0]},function (data){
					dateTemplate(data[ id == "E" ? 'enterpriseDetail' : 'personalDetail']);
				},"jsonp");
			},
			dataType:"jsonp"
		});
	}else{
		tmpList.listtest+=1;
		$.post(url[id],{uuid:tmpList['data'][tmpList.listtest][0]},function (data){
			dateTemplate(data[ id == "E" ? 'enterpriseDetail' : 'personalDetail']);
		},"jsonp");
	}
}
function verifyImportNextId () {
	if( tmpList.listtest == (tmpList.total-1) ){
		art.dialog({content: "当前已是最后一条！",icon: 'error',fixed: true,time: 1.5});
		return;
	}
	var url = "verifymanage.nextImportEnterpriseDetail",
		render = function () {
			$.post( url ,{ uuid : tmpList['data'][tmpList.listtest][1] },function ( data ){
				data = data.enterpriseDetail;
				var html = template('enterPriseDetail', data);
				$( ".wait-m" ).empty().append(html);
			},"jsonp");
		};
	if( tmpList.listtest == tmpList.lastsize ){
		var data = {};
		$("div.index-look").find("input").each(function (i,item){
			var $item = $(item);
			data[$item.attr("name")] = $.trim($item.val());
		});
		data['pageindex'] = tmpList['pageindex'];
		$.ajax({
			url: "verifymanage.findEnterpriseTo10",
			data: data,
			async:false,
			success:function ( data ){
				var tmp = {};
				for( var i in data ){
					tmp[data[i]['listtest']] = [ data[i]['memberId'], data[i]['memberId'] ];
				}
				tmpList['data'] = tmp;
				tmpList.lastsize = tmpList.lastsize + data.length;
				tmpList.pageindex = parseInt(tmpList.pageindex, 10) + 1;
				tmpList.listtest = parseInt(tmpList.listtest, 10) + 1;

				render();
			},
			dataType:"jsonp"
		});
	} else {
		tmpList.listtest = parseInt(tmpList.listtest, 10) + 1;
		render();
	}
}

function undis_text(o){
	//$(".ly-d-art input[name='refuse_reason'][type='radio']").removeAttr("checked");
	$(o).css({"background":"#FFF","color":"#333"});
}


//搜索
function searchByPm(obj,tmp,pr){
	var sv=document.getElementById("search-name").value || "";
	var comefrom =  $( "#search-name" ).parent().parent().find("select").val() || $( document.body ).find("input[name='comefrom']").val();
	if(false){
		art.dialog({
			content: '请输入搜索关健词！',
			fixed: true,
			time: 1.5
		});
	}else{
		if(pr=="pr"){
			window.location.href="verifymanage.findPersonal?verifystate="+tmp+"&searchname="+sv + "&comefrom=" + comefrom;
		}else{
			window.location.href="verifymanage.findEnterprise?verifystate="+tmp+"&searchname="+sv + "&comefrom=" + comefrom;
		}
	}
}
function secKeyDown(e,obj,tmp,pr){
　 var e=e||event;
　 var currKey=e.keyCode||e.which||e.charCode;
　 if(currKey==13) {
		var sv=document.getElementById("search-name").value;
		if(sv==null||sv==""){
			art.dialog({
				content: '请输入搜索关健词！',
				fixed: true,
				time: 1.5
			});
		}else{
			if(pr=="pr"){
				window.location.href="verifymanage.findPersonal?verifystate="+tmp+"&searchname="+sv;
			}else{
				window.location.href="verifymanage.findEnterprise?verifystate="+tmp+"&searchname="+sv;
			}
		}
	}
}

//日期搜索
function searchByTime(obj,tmp,pr){
	var st=$("#startTime").val(),sel_val=$("#limet_val").val();
		et=$("#endTime").val();
	var impFrom = $('select[name="impFrom"]').val();
	//alert(sel_val);
	var url_arg="?verifystate="+tmp;
	if(st!="") {url_arg+="&startdate="+st;}
	if(et!="") {url_arg+="&enddate="+et;}
	if(sel_val!=""){url_arg+="&sel_val="+sel_val;}
	if(pr=="pr"){
		window.location.href="verifymanage.findPersonal" + url_arg + "&impFrom=" + impFrom;
	}else{
		window.location.href="verifymanage.findEnterprise" + url_arg;
	}

}

//分页搜索
function jumper(obj,tmp,pr){
	var $id=$(obj).prev().attr("id");
	var pg=document.getElementById($id).value;
	var pgMt=$(".page-r strong").html();
	if(pg==null||pg==""){
		art.dialog({
			content: '请输入页码数！',
			fixed: true,
			time: 1.5
		});
	}else if(parseInt(pg) == 0){
		art.dialog({
			content: pg+' 输入页码数不能小于1 ',
			fixed: true,
			time: 1.5
		});
	}else if(parseInt(pg) > parseInt(pgMt)){
		art.dialog({
			content: pg+' 大于实际页码数 '+pgMt,
			fixed: true,
			time: 1.5
		});
	}else{
		$url=window.location.href.replace(/pageindex=\d+/,"pageindex="+pg);
		if($url.indexOf('pageindex')==-1 &&$url.indexOf('?') == -1)
		{
			$url=$url+"?pageindex="+pg;
		}
		else if($url.indexOf('pageindex')==-1)
		{
			$url=$url+"&pageindex="+pg;
		}
		window.location.href=$url;
	}
  }


function pageKeyDown(e,obj,tmp,pr){
   var e=e||event;
　 var currKey=e.keyCode||e.which||e.charCode;
　 if(currKey==13) {
		var $id=$(obj).attr("id");
		var pg=document.getElementById($id).value;
		var pgMax=$(".page-r strong").html();
			if(pg==null||pg==""){
				art.dialog({
					content: '请输入页码数！',
					fixed: true,
					time: 1.5
				});
			}else if(pg>pgMax){
			art.dialog({
				content: '输入页码数大于实际页码数！',
				fixed: true,
				time: 1.5
			});
			}else{
				/*if(pr=="pr"){
					window.location.href="verifymanage.findPersonal?verifystate="+tmp+"&pageindex="+pg;
				}else{
					window.location.href="verifymanage.findEnterprise?verifystate="+tmp+"&pageindex="+pg;
				}*/
				var $url=window.location.href.replace(/pageindex=\d+/,"pageindex="+pg);
				if($url.indexOf('pageindex')==-1 &&$url.indexOf('?') == -1)
				{
					$url=$url+"?pageindex="+pg;
				}
				else if($url.indexOf('pageindex')==-1)
				{
					$url=$url+"&pageindex="+pg;
				}
				window.location.href=$url;
			}
	}
}


//列表页批量审核通过 包括个人会员和企业会员
function mvPass(val,pr){
	var $checked = $('tbody').find('.list-id input:checked');
	if($checked.length>0){
		var uuids=[],memberIds = [];
		$checked.each(function(){
			uuids.push(this.value);
			memberIds.push($(this).siblings('[name="memberIds"]').val());
		});

		if(pr=="pr"){//个人会员
			$.post(url+"verifymanage.updatePersonalState",{laststate:"pass",uuid:uuids},function(data){aReturn(data,"审核成功！","审核不通过");},"jsonp");
		}else{//企业会员
			$.post(url+"verifymanage.updateEnterpriseState",{laststate:"pass",uuid:uuids,memberIds:memberIds},function(data){aReturn(data,"审核成功！","审核不通过","企业名称已经存在");},"jsonp");
		}
	}else{
		art.dialog({
			content: '请先选择您要操作的项！',
			fixed: true,
			time: 1.5
		});
	}
}

//列表页单个通过 包括个人会员和企业会员
function mvPass_s(obj,tmp,pr){//wait
	var $tr=$(obj).parents("tr").find(".list-id"),
		uuid = [$tr.find('input:checkbox').val()],
		memberId = [$tr.find('[name="memberIds"]').val()],
		mgcUrl="";//判断是否含有敏感词的接口
	if(pr=="pr"){//个人会员
		mgcUrl="verifymanage.personalCheck";
	}else{//企业会员
		mgcUrl="verifymanage.enterpriseCheck";
	}
	
	//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
	isHaveMgc(mgcUrl,{uuid:uuid},function(){
		if(pr=="pr"){//个人会员
			$.get(url+"verifymanage.updatePersonalState",{laststate:"pass",uuid:uuid},function(data){aReturn(data,"审核成功！","审核不通过");},"jsonp");
		}else{//企业会员
			$.get(url+"verifymanage.updateEnterpriseState",{laststate:"pass",uuid:uuid,memberIds:memberId},function(data){aReturn(data,"审核成功！","审核不通过","企业名称已经存在");},"jsonp");
		}
	});
}
//详情页通过 包括个人会员和企业会员
function mvPass_d(obj,tmp,pr){
	var selT = [tmpList['data'][tmpList['listtest']][0]],
		memberIds = [[tmpList['data'][tmpList['listtest']]][1]],
		mgcUrl="";//判断是否含有敏感词的接口
	if(pr=="pr"){//个人会员
		mgcUrl="verifymanage.personalCheck";
	}else{//企业会员
		mgcUrl="verifymanage.enterpriseCheck";
	}
	
	//isHaveMg函数放在http://resmanage.csc86.com/js/master.js全站公用js里面用于判断是否含有敏感词
	isHaveMgc(mgcUrl,{uuid:selT},function(){
		if(pr=="pr"){
			$.get(url+"verifymanage.updatePersonalState",{laststate:"pass",uuid:selT},function(data){aBack(data,"审核成功！","审核不通过");},"jsonp");
		}else{
			$.get(url+"verifymanage.updateEnterpriseState",{laststate:"pass",uuid:selT,memberIds:memberIds},function(data){aBack(data,"审核成功！","审核不通过","企业名称已经存在");},"jsonp");
		}
	});
}

//列表页批量拒绝 包括个人会员和企业会员 第一步
function mvRefs(val,pr){
	var $checked = $('tbody').find('.list-id input:checked');
	if($checked.length>0){
		var uuids=[],memberIds = [];
		$checked.each(function(){
			uuids.push(this.value);
			memberIds.push($(this).siblings('[name="memberIds"]').val());
		});
		if(pr=="pr"){
			mvRefs_pr("verifymanage.updatePersonalState",{uuid:uuids},refM);
		}else{
			mvRefs_pr("verifymanage.updateEnterpriseState",{uuid:uuids,memberIds:memberIds},refC);
		}
	}else{
		art.dialog({
			content: '请先选择您要操作的项！',
			fixed: true,
			time: 1.5
		});
	}
}

//列表页批量拒绝 包括个人会员和企业会员 第二步
function mvRefs_pr(href,prVal,ref){
	art.dialog({
		 title:"拒绝理由",
		content: ref,
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var textVal=document.getElementById("testVal").value;
			if(verifyReason(textVal,"#testVal")){

				$.post(url+href,{laststate:"refs",reason:textVal,uuid:prVal['uuid'],memberIds:(prVal['memberIds'] || '')},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
			}else{
				return false;
			}
		},
		init:function(){
			$(".test-focus").click(function(){
				//$(".ly-d-art input").removeAttr("checked");
				$(this).children(".test-lay").remove();
			});
		},
		cancel: true,
		lock:true
	});
}


//列表页单个拒绝 包括个人会员和企业会员 第一步
function mvRefs_s(obj,tmp,pr){
	var $tr=$(obj).parents("tr").find(".list-id"),
		uuid = [$tr.find('input:checkbox').val()],
		memberId = [$tr.find('[name="memberIds"]').val()];
	if(pr=="pr"){
		mvRefs_sPr("verifymanage.updatePersonalState",{uuid:uuid},refM);
	}else{
		mvRefs_sPr("verifymanage.updateEnterpriseState",{uuid:uuid,memberIds:memberId},refC);
	}
}

//列表页单个拒绝 包括个人会员和企业会员 第二步
function mvRefs_sPr(href,valTd,ref){
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
				$.post(url+href,{laststate:"refs",reason:textVal,uuid:valTd['uuid'],memberIds:(valTd['memberIds'] || '')},function(data){aReturn(data,"操作成功！","操作失败！");},"jsonp");
			}else{
				return false;
			}
		},
		init:function(){
			$(".test-focus").click(function(){
				//$(".ly-d-art input").removeAttr("checked");
				$(this).children(".test-lay").remove();
			});
		},
		cancel: true,
		lock:true
	});
}
//详情页拒绝 第一步
function mvRefs_d(obj,tmp,pr,selT){
	var selT = [tmpList['data'][tmpList['listtest']][0]],
		memberIds = [[tmpList['data'][tmpList['listtest']]][1]];
	if(pr=="pr"){
		mvRefs_d_pr("verifymanage.updatePersonalState",{uuid:selT},refM);
	}else{
		mvRefs_d_pr("verifymanage.updateEnterpriseState",{uuid:selT,memberIds:memberIds},refC);
	}
}
//详情页拒绝 第二步
function mvRefs_d_pr(href,valT,ref){
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
					$.post(url+href,{laststate:"refs",reason:textVal,uuid:valT['uuid'],memberIds:(valT['memberIds'] || '')},function(data){aBack(data,"操作成功！","操作失败！");},"jsonp");
				}else{
					return false;
				}
			},
			init:function(){
				$(".test-focus").click(function(){
					//$(".ly-d-art input").removeAttr("checked");
					$(this).children(".test-lay").remove();
				});
			},
			cancel: true,
			lock:true
		});
}
//列表批量禁用
function mvDel(tmp1,pr){
	var $checked = $('tbody').find('.list-id input:checked');
	if($checked.length>0){
		var uuids=[];
		$checked.each(function(){
			uuids.push(this.value);
		});
		if(pr=="pr"){
			mvDel_pr("verifymanage.updatePersonalState",uuids,refM);
		}else{
			mvDel_pr("verifymanage.updateEnterpriseState",uuids,refC);
		}
	}else{
		art.dialog({
			content: '请先选择您要操作的项！',
			fixed: true,
			time: 1.5
		});
	}
}
function mvDel_pr(href,valT,ref){
	art.dialog({
		 title:"禁用理由",
		content:ref,
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var textVal=document.getElementById("testVal").value;
			if(verifyReason(textVal,"#testVal")){
				$.post(url+href,{laststate:"del",reason:textVal,uuid:valT},function(data){aReturn(data,"操作成功！","操作失败");},"jsonp");
			}else{
				return false;
			}
		},
		init:function(){
			$(".test-focus").click(function(){
				//$(".ly-d-art input").removeAttr("checked");
				$(this).children(".test-lay").remove();
			});
		},
		cancel: true,
		lock:true
	});
}

function mvDel_s(obj,tmp,pr){
	var $tr=$(obj).parents("tr").find(".list-id"),
		uuid = [$tr.find('input:checkbox').val()];
	if(pr=="pr"){
		mvDel_s_pr("verifymanage.updatePersonalState",uuid,refM);
	}else{
		mvDel_s_pr("verifymanage.updateEnterpriseState",uuid,refC);
	}
}
function mvDel_s_pr(href,valT,ref){
	art.dialog({
			 title:"禁用理由",
			content: ref,
			fixed: true,
			okVal: '保存',
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var textVal=document.getElementById("testVal").value;
				if(verifyReason(textVal,"#testVal")){
					$.post(url+href,{laststate:"del",reason:textVal,uuid:valT},function(data){aReturn(data,"操作成功！","操作败");},"jsonp");
				}else{
					return false;
				}
			},
			init:function(){
				$(".test-focus").click(function(){
					//$(".ly-d-art input").removeAttr("checked");
					$(this).children(".test-lay").remove();
				});
			},
			cancel: true,
			lock:true
		});
}

function aReturn(tmp,po,pt,ap){
	if(tmp==0){
		art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
	}else if(tmp==-1){
		art.dialog({content:ap,icon: 'error',fixed: true,time: 1.5});
	}else{
		art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
		setTimeout(function(){location.href = location.href;},1500);
	}
}

function aBack(tmp,po,pt,ap){
	if(tmp==0){
			art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
		}else if(tmp==-1){
			art.dialog({content:ap,icon: 'error',fixed: true,time: 1.5});
		}else{
			art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
			setTimeout(function(){history.back();},1500);
		}
}


//下拉选中改变操作
function mvState(val,pr){
	var selT=$("table tbody .list-id input:checked").length;
	if(selT>0){
		var tmp=[];
		for(var i=0;i<selT;i++){
			tmp.push($("table tbody .list-id input:checked").eq(i).attr("value"));
		}
		switch(val){
			case "refs":
				if(pr=="pr"){
					mvState_pr("verifymanage.updatePersonalState",tmp.join(";"),refM,val);
				}else{
					mvState_pr("verifymanage.updateEnterpriseState",tmp.join(";"),refC,val);
				}
				break;
			case "del":
				if(pr=="pr"){
					mvState_pr("verifymanage.updatePersonalState",tmp.join(";"),refM,val);
				}else{
					mvState_pr("verifymanage.updateEnterpriseState",tmp.join(";"),refC,val);
				}
				break;
			default:
				break;
		}
	}else{
		art.dialog({
			content: '请先选择您要操作的项！',
			fixed: true,
			time: 1.5
		});
	}

}
function mvState_pr(href,valT,ref,cher){
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
				$.post(url+href,{laststate:cher,reason:textVal,uuid:valT},function(data){ aReturn(data,"操作成功！","操作失败！");},"jsonp");
			}else{
				return false;
			}
		},
		init:function(){
			$(".test-focus").click(function(){
				//$(".ly-d-art input").removeAttr("checked");
				$(this).children(".test-lay").remove();
			});
		},
		cancel: true,
		lock:true
	});
}

//上一页，下一页

/*
函数用途：更据当前URL返回指定页的URL （保留当前URL中的其他参数）
用法 getnewpageurl("页码参数的参数名"，第几页[数字])
返回 URL 地址；
*/
function getnewpageurl(pagename,num){//
	var url;
	var paraString = location.search;
	var reg = new RegExp('\\b' + pagename + '=\\d+',"")
	if(paraString.indexOf("?")<=-1){ paraString += "?"; }
	if(reg.test(paraString)){
		paraString = paraString.replace(reg,pagename + "=" + num);
	}else{
		paraString += /\?$/.test(paraString) ? "" : "&";
		paraString += pagename + "=" + num;
	}
	return location.href.split("?")[0] + paraString;
}

function toPrevious(state,memtype)
{
	var pg=$("#pageindex").html();
	pg= parseInt(pg) - 1;
	var pTotal=$("#pagetotal").html();
	if(pg>=1 && pg<=pTotal)
	{
		$(".page-r a").addClass("pg-cur");
		$url=window.location.href.replace(/pageindex=\d+/,"pageindex="+pg);
		if($url.indexOf('pageindex')==-1 &&$url.indexOf('?') == -1)
		{
			$url=$url+"?pageindex="+pg;
		}
		else if($url.indexOf('pageindex')==-1)
		{
			$url=$url+"&pageindex="+pg;
		}
		window.location.href=$url;
	}
}
function toNext(state,memtype)
{
	var pg=$("#pageindex").html();
	pg = parseInt(pg)+1;
	var pTotal=$("#pagetotal").html();
	if(pg>=1 && pg<=pTotal)
	{
		$url=window.location.href.replace(/pageindex=\d+/,"pageindex="+pg);
		if($url.indexOf('pageindex')==-1 &&$url.indexOf('?') == -1)
		{
			$url=$url+"?pageindex="+pg;
		}
		else if($url.indexOf('pageindex')==-1)
		{
			$url=$url+"&pageindex="+pg;
		}
		window.location.href=$url;
	}
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
