var appBaseUrl = location.protocol+"//"+location.host+"/bops-app/bops/";

function skinDialogMsg(msg,icon,reload){
	var
		icon = icon || "",
		obj = {
			id:'skin',
			content:msg,
			fixde:true,
			time:1.5
		};
	if(icon){
		obj['icon'] = icon;
	}
	art.dialog.list['skin'] && art.dialog.list['skin'].close();
	art.dialog(obj);
	if(reload){
		setTimeout(function(){
			location.href = location.href;
		},1500);
	}
}


function fileQueueError(file, errorCode, message) {
	var msg = "您选择的文件错误，请重新选择文件上传！";
	switch(errorCode){
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
		msg = "您选择的文件大小错误，请重新选择文件上传！";
		break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
		msg = "您选择的文件大小超过10M，请处理后上传！";
		break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		msg = "只允许上传zip格式文件！";
		break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		msg = "您一次选择的文件太多，请重新选择文件上传！";
		break;
		default:
		msg = "您选择的文件错误，请重新选择文件上传！";
	};
	skinDialogMsg(msg,"error");
}

function uploadSuccess(file,serverData){//模板上传
	var data = eval("("+serverData+")");
	if(data.status == "true"){
		$("#imgload0").val(file.name).next().val(data.fileName);
	}else{
		skinDialogMsg("上传失败，请重新上传！","error");
	}
}

function skinMaxLength(id,max){//最长字数
	var
		max = max || 12,
		val = $.trim($(id).val());
	if(val.length<(max+1)){
		return;
	}else{
		$(id).val(val.substr(0,max));
	}
}

function addShopSkinError(form,error){//
	var obj ={
		"skinName":"模板名称不能为空",
		"styleId":"请选择风格",
		"tradeId":"请选择行业",
		"fileName":"请上传附件",
		"exist":"模板名称已存在",
		"unAllow":"模板名称只能为汉字、字母和数字，12个字以内"
	},
	tmp = "";
	for(var i in error){
		tmp += '<div class="g-ico ico-error skin-error-item">'+obj[error[i]]+'</div>'
	}
	form.find("div.skin-error").remove();
	if(error.length>0){
		form.append('<div class="skin-error">'+tmp+'</div>');
	}
}

function addShopSkinVerify(form,edit){//添加模板表单验证
	var
		arr = form.serializeArray(),
		unRequired= edit ? ['newFileName'] : ['skinId'],
		error = [];
	for(var i in arr){
		if(arr[i]['value'].length == 0 && $.inArray(arr[i]['name'],unRequired) < 0){
			error.push(arr[i]['name']);
		}
	}
	if(error.length>0){
		addShopSkinError(form,error);
		return true;
	}else{
		addShopSkinError(form,[]);
	}
}


function addShopSkin(edit){//添加旺铺模板
	art.dialog({
		title:edit ? "修改模板信息" : "添加模板",
		content:'<form action="shopskin.fileUpComfirm" method="post" enctype="multipart/form-data"><input type="hidden" name="skinId" /><table class="add-shop-skin"><tr><th>模板名称：</th><td><input type="text" name="skinName" value="" class="text" /></td></tr><tr><th>风　　格：</th><td><select name="styleId">'+getShopSkinData("style")+'<option value="" selected>选择模板风格</option></select></td></tr><tr><th>行　　业：</th><td><select name="tradeId">'+getShopSkinData("industry")+'<option value="" selected>选择模板行业</option></select></td></tr><tr><th>附　　件：</th><td><input type="text" disabled class="text" style="width:108px" /> <input type="text" id="shopSkinFile" /><input type="hidden" value="" name="fileName" /></td></tr><tr><th>分　　组：</th><td><label><input name="groupId" value="1" type="radio" checked />免费</label></td></tr></table></form>',
		fixed:true,
		okVal:edit ? "保存" : "创建",
		opacity:"0.3",
		width:420,
		padding:"25px 30px 15px",
		cancel:true,
		ok:function (){
			$(this.DOM.wrap[0]).find("form").trigger("submit");
			return false;
		},
		lock:true,
		init:function (){
			var that = this,
				$form = $(that.DOM.wrap[0]).find("form");

			if(edit){//编辑模板默认值
				$form.append('<input type="hidden" name="newFileName" />').attr("action","shopskin.fileUpdate");
				for(var i in edit){
					$form.find("[name='"+i+"']").val(edit[i]);
				}
				$form.find(":text:disabled").val(edit['fileName']);
			}

			$form.bind("submit",function (){
				if(addShopSkinVerify($(this),edit)){
					return false;
				}
				if(!/^[a-zA-Z\d\u4e00-\u9fa5]+$/.test($.trim($(this).find("[name='skinName']").val()))){
					addShopSkinError($(this),["unAllow"]);
					return false;
				}

				$.ajax({
					url:$form.attr("action"),
					type:"post",
					async:false,
					data:$form.serialize(),
					success:function (data){
						var tmp = edit ? '修改' : '添加';
						switch(data){
							case "true":
							that.close();
							skinDialogMsg("模板"+tmp+"成功！","succeed",true);
							break;
							case "false":
							skinDialogMsg("模板"+tmp+"失败，请稍后重试！","error");
							break;
							case "exist":
							addShopSkinError($form,['exist']);
							break;
							default:;
						}
					}
				});
				return false;
			});

			$form.find("input[name='skinName']").bind("keyup",function (){
				skinMaxLength($(this));
			});
		}
	});

}

function manageShopSkinCate(){//添加旺铺模板分类
	art.dialog({
		title:"分类管理",
		content:'<div class="g-c-f skin-cate"><div class="skin-cate-item skin-style"><h2 class="hd">模板风格</h2><div class="bd"><div class="add-skin-cate"><form action="shopskin.addStyle" method="post"><input type="text" name="styleName" value="+添加风格" class="text c-888" /><input type="submit" value="确定" class="btn" /></form></div><ul class="items">'+getShopSkinData('style',1)+'</ul></div></div><div class="skin-cate-item skin-industry"><h2 class="hd">模板行业</h2><div class="bd"><div class="add-skin-cate"><form action="shopskin.addTrade" method="post"><input type="text" name="tradeName" value="+添加行业" class="text c-888" /><input type="submit" value="确定" class="btn" /></form></div><ul class="items">'+getShopSkinData('industry',1)+'</ul></div></div>',
		fixed:true,
		opacity:"0.3",
		cancel:true,
		cancelVal:"关闭",
		lock:true,
		init:function(){
			var $t = $(this.DOM.wrap[0]);
			$t.find("ul").delegate("li:not(.edit)","mouseenter",function (){
				$(this).append('<span class="g-ico ico-edit-2"></span>');
			}).delegate("li","mouseleave",function (){
				$(this).find("span.ico-edit-2").remove();
			}).delegate("li:not(.edit)","click",function (){
				var
					$t = $(this).addClass("edit"),
					style = $.contains($("div.skin-style")[0],$t[0]),
					action = style ? 'shopskin.styleUpdate' : 'shopskin.tradeUpdate',
					id = style ? 'styleId' : 'tradeId',
					name = style ? 'styleName' : 'tradeName';
				$t.html('<form action="'+action+'" method="post"><input name="'+id+'" value="'+$t.data("id")+'" type="hidden" /><input value="'+$t.find("span.name").text()+'" name="'+name+'" class="e-text" /><input type="submit" value="确定" class="e-btn" /></form>');
			});
			$t.delegate("input.text","focus",function (){//placeholder
				var $t = $(this);
				if($t.is(".c-888")){
					$t.val("").removeClass("c-888");
				}
			}).delegate("input.text","blur",function (){
				var $t = $(this);
				if($.trim($t.val())===""){
					$t.val($t[0].defaultValue).addClass("c-888");
				}
			}).delegate("input:text","keyup",function (){//最长字符
				skinMaxLength($(this));
			});
			addShopSkinCate($t);
		},
		close:function (){
			if(shopSkinData['reload']){
				location.href = location.href;
			}
		}
	});
}

function getShopSkinData(industry,edit){//获取行业和风格分类
	var tmp = "",
		data = shopSkinData[industry],
		name = industry=="style"?"style":"trade";
	for(var i in data){
		if(edit){
			tmp += '<li data-id="'+data[i]['id']+'" data-number="'+data[i]['number']+'" data-name="'+data[i][name]+'"><span class="name">'+data[i][name]+'</span><span class="c-888">('+data[i]['number']+')</span></li>'
		}else{
			tmp += '<option value="'+data[i]['id']+'">'+data[i][name]+'</option>';
		}
	}
	return tmp;
}

function addShopSkinCate(wrap){
	wrap.delegate("form","submit",function (){
		var $t = $(this),
			update= $t.is("[action$='Update']"),
			$val = $t.find("input:text"),
			val = $.trim($val.val());
		if(val.length >0){
			if(val == $val[0].defaultValue){
				if(update){
					var $li = $t.closest("li").removeClass("edit");
					$li.html('<span class="name">'+$li.data("name")+'</span><span class="c-888">('+$li.data("number")+')</span>');
				}
				return false;
			}

			if(!/^[a-zA-Z\d\u4e00-\u9fa5]{3,12}$/.test(val)){
					skinDialogMsg("分类名称只能为汉字、字母和数字，3-12个字！","error");
					return false;
			}

			$.post($t.attr("action"),$t.serialize(),function (data){
				switch(data){
					case "false":
					skinDialogMsg("添加失败，请稍后重试！","error");
					break;
					case "exist":
					skinDialogMsg("添加失败，分类已存在！","error");
					break;
					default:
					//shopSkinData['reload'] = true;
					skinDialogMsg("添加成功！","succeed");
					if(update){
						var $li = $t.closest("li").data("name",val).removeClass("edit");
						$li.html('<span class="name">'+val+'</span><span class="c-888">('+$li.data("number")+')</span>');
					}else{
						var $ul = $t.closest("div.bd").find("ul");
						$ul.append('<li data-id="'+data+'" data-number="0" data-name="'+val+'"><span class="name">'+val+'</span><span class="c-888">(0)</span></li>');
						$val.val("").trigger("focus");
					}
				}
			});
		}
		return false;
	});
}

function editShopSkin(skinId,skinName,styleId,tradeId,fileName,groupId,userNum){//编辑模板
	addShopSkin({
		"skinId":skinId,
		"skinName":skinName,
		"styleId":styleId,
		"tradeId":tradeId,
		"fileName":fileName,
		"groupId":groupId,
		"userNum":userNum
	});
}

function previewShopSkin(patternId){
	$("#previewPatternId").val(patternId).closest("form").trigger("submit");
}


function shelf(id,status){
	$.post('shopskin.isGrounding',{id:id,state:status},function(data){
		if(data == 'true'){
			skinDialogMsg('操作成功','succeed',true);
		}else{
			skinDialogMsg('操作失败，请稍后重试','error');
		}
	});
}

function cstVip(str){
	var p1 = $("input[name=mothPrice]").val(),
		p2 = $("input[name=seasonPrice]").val(),
		p3 = $("input[name=yearPrice]").val(),
		p4 = $("input[name=permanentPrice]").val()
		p5 = p1 + p2 + p3 + p4,
		$this = $(str);

	if(!/\d+/.test(p1) || !/\d+/.test(p1) || !/\d+/.test(p1) || !/\d+/.test(p1)){
		skinDialogMsg('模板价格只能为正整数','error');
		return false;
	}else if(p5==0){
		skinDialogMsg('该模板本身已免费','error');
		$this.attr("checked",false);
	}
}


$(function (){
	var $getShopskinList = $("form[action='shopskin.getShopskinList']");
	$getShopskinList.delegate("select","change",function (){//模板风格行业筛选
		$(this).closest("form").trigger("submit");
	});
	$("[name='currentPage']").bind("keyup",function (){
		var
			$t = $(this),
			val = $.trim($t.val()).replace(/[^\d]/ig,"");
		$t.val(val);
	});


	if($('#shopSkinFile').length){
		new SWFUpload(uploadSettings({
			upload_url: appBaseUrl+"login.fileUp",
			//post_params:shopSkinData['secctioin'],
			button_placeholder_id:"shopSkinFile",
			file_types: "*.zip",
			file_size_limit : "10MB",
			file_upload_limit : 0,
			button_text:"上传模板"
		}));
	}



	/*行业全选*/
	var $trade = $("#trade");
	$trade.delegate('input:not([readonly])', 'change', function(event) {
		$list = $trade.find('input[value!="all"]');
		if(this.value == 'all'){
			$list.prop('checked',this.checked);
		}else{
			$trade.find('input[value="all"]').prop('checked',$list.filter(':not(:checked)').length ? false : true)
		};
	}).find('input').triggerHandler('change');

	$('form[action="shopskin.fileUpComfirm"]').bind('submit',function(){

		var
			$skinName = $(this).find("[name='skinName']"),
			skinName = $skinName.val();

		if(!/^[a-zA-Z\d\u4e00-\u9fa5]+$/.test(skinName) || skinName.length > 12){
			skinDialogMsg('模板名称只能为汉字、字母和数字，12个字以内','error');
			$skinName.trigger('focus');
			return false;
		}

		var $price = $(this).find('input.ad-price');
		for(var i = 0;i< $price.length;i++){
			var $a = $price.eq(i);
			console.info(i);
			if(!/\d+/.test($a.val())){
				skinDialogMsg('模板价格只能为正整数','error');
				$a.trigger('focus');
				return false;
				break;
			}
		}


		if($trade.find('[name="tradeId"]:checked').length == 0){
			skinDialogMsg('请选择模板行业','error');
			$('[name="trade"]').trigger('focus');
			return false;
		}

		if($('[name="hot"]:checked').length == 0){
			skinDialogMsg('请选择模板热度','error');
			$('[name="hot"]').trigger('focus');
			return false;
		}

		if($('#imgload0').val() == ''){
			skinDialogMsg('请上传模板','error');
			return false;
		}

		var exist;


		$.ajax({
			url:'shopskin.patterNameExist',
			type:"post",
			async:false,
			data:{id:$(this).find('[name="patternId"]').val(),patterName:skinName},
			success:function (data){
				exist = data;
			}
		});

		if(exist == 'true'){
			skinDialogMsg('模板名称已存在','error');
			return false;
		}


	});


	$('.skin-cate').delegate("li:not(.edit)","mouseenter",function (){
				$(this).append('<span class="g-ico ico-edit-2"></span>');
	}).delegate("li","mouseleave",function (){
		$(this).find("span.ico-edit-2").remove();
	}).delegate("li:not(.edit)","click",function (){
		var
			$t = $(this).addClass("edit"),
			action = 'shopskin.tradeUpdate',
			id = 'tradeId',
			name = 'tradeName';
		$t.html('<form action="'+action+'" method="post"><input name="'+id+'" value="'+$t.data("id")+'" type="hidden" /><input value="'+$t.find("span.name").text()+'" name="'+name+'" class="e-text" /><input type="submit" value="确定" class="e-btn" /></form>');
	}).delegate("input.text","focus",function (){//placeholder
		var $t = $(this);
		if($t.is(".c-888")){
			$t.val("").removeClass("c-888");
		}
	}).delegate("input.text","blur",function (){
		var $t = $(this);
		if($.trim($t.val())===""){
			$t.val($t[0].defaultValue).addClass("c-888");
		}
	}).delegate("input:text","keyup",function (){//最长字符
		skinMaxLength($(this));
	});
	addShopSkinCate($('.skin-cate'));

	$('[name="colorId"][readonly],[name^="trade"][readonly]').bind('click',false);

});