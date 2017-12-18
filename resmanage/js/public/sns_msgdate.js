$quan_msg_data = {};
//创建圈子 审核不通过；
$quan_msg_data.addquan_bad = [
	"商圈名称要简洁明了，能突出该商圈的核心内容",
	"商圈简介必须是介绍与本商圈有关的内容",
	"请填写正当的创建商圈申请理由",
	"本平台禁止发布国家反动、政治及违禁产品等信息内容",
	"严禁上传淫秽、低俗、血腥、暴力、反动等违禁图片"
];
//话题后台被管理员隐藏
$quan_msg_data.topic_hidden = [
	"严禁发布国家反动、政治及违禁产品等信息内容",
	"严禁上传淫秽、低俗、血腥、暴力、反动等违禁图片",
	"严禁发布散播或制造任何与事实不符的言论",
	"严禁因观点不同或讨论立场有异在商圈发表针对他人的嘲笑、讽刺、漫骂等人身攻击言论，盼会员间能雅量和谐、理性讨论",
	"严禁发表包含种族、肤色、性别、性取向、宗教、民族、地域、残疾、社会经济状况歧视内容的言论",
	"严禁未经本人同意，公开他人联系方式、个人信息，包括他人来往书信、MSN、QQ记录等个人隐私信息",
	"严禁发布未经定案或者正在审核的民事或刑事案件或纠纷的材料；严禁发布歪曲企业形象品牌、涉及企业商业秘密的材料，包括伸冤、控告、举报、告示、大字报等形式。在华南城网无法确定其真实性情况下都以删除处理，请理解配合，自寻司法或其他合法途径解决"
];
//活动被网站管理员后台删除
$quan_msg_data.activity_del = [
	"严禁发布国家反动、政治及违禁产品等信息内容",
	"严禁上传淫秽、低俗、血腥、暴力、反动等违禁图片",
	"严禁发布散播或制造任何与事实不符的言论",
	"严禁因观点不同或讨论立场有异在商圈发表针对他人的嘲笑、讽刺、漫骂等人身攻击言论，盼会员间能雅量和谐、理性讨论",
	"严禁发表包含种族、肤色、性别、性取向、宗教、民族、地域、残疾、社会经济状况歧视内容的言论",
	"严禁未经本人同意，公开他人联系方式、个人信息，包括他人来往书信、MSN、QQ记录等个人隐私信息",
	"严禁发布未经定案或者正在审核的民事或刑事案件或纠纷的材料；严禁发布歪曲企业形象品牌、涉及企业商业秘密的材料，包括伸冤、控告、举报、告示、大字报等形式。在华南城网无法确定其真实性情况下都以删除处理，请理解配合，自寻司法或其他合法途径解决",
];
//被请出市场
$quan_msg_data.market_out = [
	"贵公司不是该批发市场内的企业",
	"严禁在批发市场版块发布散播或制造任何与事实不符的言论",
	"严禁发布歪曲批发市场形象品牌、涉及企业商业秘密的材料，包括伸冤、控告、举报、告示、大字报等形式。在华南城网无法确定其真实性情况下都以删除处理，请理解配合，自寻司法或其他合法途径解决",
	"严禁在批发市场发布涉及国家反动、暴力、色情等违法内容"
];

function getref_html(res,title){
	var bt = title || "请选择或输入理由";
	var html;
	html = '<div class="ly-d-art"><p>'+bt+':</p>';
	for(i=0;i<res.length;i++){
		html += '<p><input onclick="selVal(this)" type="checkbox" name="refuse_reason" value="'+res[i]+'">'+(i+1)+'、'+res[i]+'</p>'
	}
	html += '</div>';
	html += '<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>';
	return html;
};

//mvRefs_pr("/bops-app/bops/verifymanage.updatePersonalState",{id:123},ref,callback)
function mvRefs_pr(href,data,ref,callback){
	callback = arguments[arguments.length-1];
	art.dialog({
		title:"拒绝理由",
		content: getref_html(ref),
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var textVal=document.getElementById("testVal").value;
			if(verifyReason(textVal,"#testVal")){
				//textVal = textVal.replace(/[；。！，!,\.;!]\s*$/ig,"。");
				$.post(href,$.extend(data,{"msg":textVal}),function(data){
					if(typeof callback === "function"){
						callback(data);
					}else{
						alert_aReturn(data,"操作成功！","操作失败！",function(){location.href = location.href;});
					}
				},"jsonp");
			}else{
				return false;
			}
		},
		init:function(){
			$(this.DOM.wrap[0]).find(".test-focus").click(function(){
				//$(".ly-d-art input").removeAttr("checked");
				$(this).children(".test-lay").remove();
			});
		},
		cancel: true,
		lock:true
	});
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
	} else {//删除己选的拒绝理由(tmp为checkbox时有效);
		var reg = new RegExp($.trim(addstr)+"(\s*；\s*)*");
		ly = ly.replace(reg, "");

	}
	$("#testVal").val(ly);
}

function maxLength(text,num){
	var num = num || 2000;
	return text.length<=num ? true : false;
}

//检查理由；
function verifyReason(text,id){
	if(text.length == 0){
		aReturn(0,"","请选择或输入理由");
		return false;
	}else if(text.length <= 5){
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

//成功,失败提示框
function alert_aReturn(data,success,lose,fun_s,fun_l){
	if($.trim(data) == "1"){
		art.dialog({
			content:success,
			ok:false,
			icon:'succeed',
			time:1.5,
			title:"成功",
			close: fun_s || function(){}
		});
	}else{
		art.dialog({
			content:lose,
			icon:'error',
			fixed:true,
			title:"出错",
			time: 1.5,
			close: fun_l || function(){}
		});
	}
}