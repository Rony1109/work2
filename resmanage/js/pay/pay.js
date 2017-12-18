function toPrevious(t)//前一页
{
	var $page = $("#inputpage").closest("form"),
		$cur = $page.find("input[name='pageindex']"),
		index = parseInt($.trim($cur.val()));
	if(index == 1){
		art.dialog({
			content: '已经是第一页!',
			fixed: true,
			time: 1.5
		});
	}else{
		$page.find("input[name='inputpage']").css("color","#fff").val(index-1);
		$page.trigger("submit");
	}
}
function showOrderDetail(orderId,memberId,url){//查看详情
var $form = $("form[action='']");
$form.attr("action",url+"?orderId="+orderId+"&memberId="+memberId).trigger("submit");

}
function toNext(t)//下一页
{
	var $page = $("#inputpage").closest("form"),
		$cur = $page.find("input[name='pageindex']"),
		index = parseInt($.trim($cur.val())),
		total = parseInt($.trim($page.find("input[name='pagetotal']").val()));
	if(index == total){
		art.dialog({
			content: '已经是最后一页!',
			fixed: true,
			time: 1.5
		});
	}else{
		$page.find("input[name='inputpage']").css("color","#fff").val(index+1);
		$page.trigger("submit");
	}
}

function goPage(f){
	var
		$f = $(f),
		inputpage = $.trim($f.find("[name='inputpage']").val()),
		msg = '';
	if(inputpage.length == 0){
		msg = '请输入页码数！';
	}
	if(/^0+$/.test(inputpage)){
		msg = '页码数不能为0！';
	}
	if(parseInt(inputpage) > parseInt($f.find("input[name='pagetotal']").val())){
		msg = '输入页码数大于实际页码数！';
	}
	if(msg.length>0){
		art.dialog({
			content: msg,
			fixed: true,
			time: 1.5
		});
		return false;
	}else{
		$f.find("[name='pageindex']").val(inputpage);
		$f.find("[name='inputpage'],[name='total']").removeAttr("name");
	}
}

/*服务管理*/
function delService(id){//列表页面，删除服务方法
	var url="payServeManage.deleteServe";
	art.dialog({
		id:"delService",
		title:"删除服务",
		content:"确定要删除此项服务吗？",
		ok:function(){
				$.post(url,{"serveId":id},
				function(data){
					if(data.result<1){
						art.dialog({content:'删除失败，请刷新后重试！',icon: 'error',fixed: true,time: 1.5});
					}else{
						art.dialog({content:'已成功删除此项服务！',icon: 'succeed',fixed: true,time: 1.5,close: function(){location.href = location.href}});
					}
				},"jsonp")
			},
		okVal:"确定",
		cancel:true,
		cancelVal:"取消"
	});
}
function verifyNull(id,cls){//验证输入框是否为空
	var id = $("#"+id);
	if ($.trim(id.val()) == null || $.trim(id.val())  =="" ){
		id.addClass(cls);return false;
	}else{
		id.removeClass(cls);return true;
	}
}
function verifyCash(id,cls){//限制价格范围
	var id = $("#"+id);
	if (($.trim(id.val()) != null || $.trim(id.val())  !="") && $.trim(id.val()) <= 20000000 && $.trim(id.val()) >= 0){
		id.removeClass(cls);return true;
	}else{
		id.addClass(cls);return false;
	}
}
function verifyImgNull(id,cls){//验证服务logo图片是否为空
	var id = $("#"+id);
	if ( id.attr("src") == "http://resmanage.csc86.com/img/no-img.png" ){
		$(id).addClass(cls);return false;
	}else{
		id.removeClass(cls);return true;
	}
}
function addService(addBtn,name,price,month){//添加服务项
	var _addBtn = addBtn,
		cls = "b-1-f00",
		_name = verifyNull(name,cls),
		_price = verifyCash(price,cls);
//		_month = verifyNull(month,cls);

	if( _name && _price ){
		var name = $("#"+name), price = $("#"+price), month = $("#"+month), _month;
		$(".ichecked").children(".hidval").attr("slt",0);
		if(month.val() !="" && month.val() != null){_month = month.val()+"个月";}else{_month="";}
		$("#s-ad").append('<div class="ichecked c-list clearfix"><label class="c-l-name"><input onclick="selectInput(this)" type="radio" value="'+name.val()+'" name="x">'+name.val()+'</label><span class="c-l-price">'+price.val()+'元</span><span class="c-l-mon">'+_month+'</span><a onclick="delAddService(this,\'.ichecked\')" href="javascript://" class="c-add-btn ico-del">删除</a><input class="hidval" type="hidden" mark="'+name.val()+'" price="'+price.val()+'" month="'+month.val()+'" slt="0" value=""></div>');
		$(".ichecked").first().children("label").children("input:radio").trigger("click");
		name.val("");price.val("");month.val("");
	}
}
function selectInput(id){
	var _id = $(id).parents("div");
	_id.children(".hidval").attr("slt",1);
	_id.siblings().children(".hidval").attr("slt",0);
}
function delAddService(id,ichecked){//删除 添加的服务
	if($(id).parent("div").children(".hidval").attr("slt")==1){
		$(id).parent("div").remove();
		$(ichecked).first().children("label").children("input:radio").trigger("click");
	}else{
		$(id).parent("div").remove();
	}
}

function subCreateService(str,id,name,subject,detail,tdid,addbtn,uurl,detailUrl,display,upDImg){//提交创建服务表单
	var str = str || "0", id = id,
		name = name || "name", subject = subject || "subject", detail = detail || "detail", upDImg = upDImg || "upDImg",
		tdid = tdid || "#s-ad", addbtn = addbtn || "#c-add-btn", uurl = uurl || "#url", detailUrl = detailUrl || "#detailUrl", display = display || "#display",
		cls = "b-1-f00", _name = verifyNull(name,cls), _subject = verifyNull(subject,cls), _detail = verifyNull(detail,cls), logo = verifyImgNull("imgload0",cls),
		url = "payServeManage.insertServe", href_url = "payServeManage.getServeList" , v =[];

	if(!_name || !_subject || !_detail || !logo ){
		return false;
	}if($(tdid).children(".ichecked").length < 1 ){
		$(addbtn).trigger("click");
		return false;
	}if($(uurl).val()=="http://"){
		$(uurl).val("");
	}if($(detailUrl).val()=="http://"){
		$(detailUrl).val("");
	}
	$(".ichecked").each(function(index){
		v.push({
			"mark" : $(this).find(".hidval").attr("mark"),
			"price" : $(this).find(".hidval").attr("price"),
			"month" : $(this).find(".hidval").attr("month"),
			"selected" : $(this).find(".hidval").attr("slt")
		});
	});
	if(str==0){
		art.dialog({
			id:"subCreateService",
			title:"创建服务",
			content:"确定创建此服务？",
			ok:function(){
				$.post(url,{
					"id":id,
					"name":$("#"+name).val(),
					"subject":$("#"+subject).val(),
					"detail":$("#"+detail).val(),
					"items":JSON.stringify(v),
					"logo":$("#"+upDImg).val(),
					"url":$(uurl).val(),
					"detailUrl":$(detailUrl).val(),
					"duplicate":$("input:radio[name=duplicate]:checked").val(),
					"state":$("input:radio[name=state]:checked").val(),
					"display":$("input:text[name=display]").val()
				},function(data){
					if(data.result<1){
						art.dialog({content:'创建失败，请刷新后重试！',icon: 'error',fixed: true,time: 1.5,close: function(){location.href = location.href;}});
					}else{
						location.href = href_url;
					}
				},"jsonp");
			},
			okVal:"确定",
			cancel:true,
			cancelVal:"取消"
		});
	}else{
		art.dialog({
			id:"subEditService",
			title:"编辑服务",
			content:"确定保存对此服务的修改？",
			ok:function(){
				$.post(url,{
					"id":id,
					"name":$("#"+name).val(),
					"subject":$("#"+subject).val(),
					"detail":$("#"+detail).val(),
					"items":JSON.stringify(v),
					"logo":$("#"+upDImg).val(),
					"url":$(uurl).val(),
					"detailUrl":$(detailUrl).val(),
					"duplicate":$("input:radio[name=duplicate]:checked").val(),
					"state":$("input:radio[name=state]:checked").val(),
					"display":$("input:text[name=display]").val()
				},function(data){
					if(data.result<1){
						art.dialog({content:'保存失败，请刷新后重试！',icon: 'error',fixed: true,time: 1.5,close: function(){location.href = location.href;}});
					}else{
						location.href = href_url;
					}
				},"jsonp");
			},
			okVal:"确定",
			cancel:true,
			cancelVal:"取消"
		});
	}
}

$(function(){
	try{var picUpload = new SWFUpload(uploadSettings("serviceFace"));}catch(e){};//初始化图片上传事件
})