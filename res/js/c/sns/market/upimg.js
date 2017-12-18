function fileQueueError(file, errorCode, message) {
	var msg;
	switch(errorCode){
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			msg = "图片大小错误";
			break;
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			msg = "图片不能大于3M";
			$("#img_msg").addClass("g-f-error").html('<p class="g-f-error">'+msg+'（仅支持jpg、gif、Png图片文件，且文件小于3MB。）</p>');
			return;
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			msg = "图片格式错误";
			break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			msg = "您一次选择的图片太多，请重新选择图片上传！";
			break;
		default:
			msg = "图片错误";
	}
	csc.useDialog(function (){
		csc.error(msg);			
	});
}

function clearimg(){
	$("#up_img_").attr("src",csc.url("img",''));
	$("input[name='marketLogoUrl']").val('');
	$("#upimg_box .upimg_box_img").hide();
	//$("#upbut_box").show();
	$("#upbut_box").css("left","0");
}

function uploadSuccess(file, serverData) {
		var response =  eval('(' + serverData + ')');
		if(response.result != "success"){
			var msg = response.msg || "上传失败!";
			csc.useDialog(function (){
				csc.error(msg);
			})
			return;
		}
		imgurl = (csc.url("img",response.key)).replace(/(^\s*|\s*$)/ig,"");
		$("#up_img_").attr("src",imgurl);
		$("input[name='marketLogoUrl']").val(imgurl);
		//$("#upbut_box").hide();
		$("#upbut_box").css({"left":"-1000px"});
		$("#upimg_box .upimg_box_img").show();
		$("#img_msg").removeClass("g-f-error").html('<p>仅支持jpg、gif、Png图片文件，且文件小于3MB。</p>');
}

function _submit(b,c){
	var province = $("select[name='province_name']").val(),city=$("select[name='city_name']").val();
	var updata = $('#stepOneForm').serialize();
	if(err_text()){return false;};
	$.ajax({url:'/home/confirm',
		type:"POST",
		data:updata,
		success:function(data){
			$('#marketBox').html(data);
			setTimeout(function(){F5(false,province,city)},500);
		}
	})
}
var $$marketDescription,upFile;
function F5(a,b,c){
	if($("#upImg").length){
		upFile = new SWFUpload(uploadSettings({
			type:"marketFace",
			file_size_limit:"3MB",
			button_placeholder_id :"upImg",
			button_text:"上传图片",
			file_upload_limit : 0
		}));
	}
	if(a){
	if(typeof(KindEditor)!="undefined"){
		KindEditor.each({'plug-align':{name:'对齐方式',method:{'justifyleft':'左对齐','justifycenter':'居中对齐','justifyright':'右对齐'}},'plug-order':{name:'编号',method:{'insertorderedlist':'数字编号','insertunorderedlist':'项目编号'}},'plug-indent':{name:'缩进',method:{'indent':'向右缩进','outdent':'向左缩进'}}},function(pluginName,pluginData){var lang={};lang[pluginName]=pluginData.name;KindEditor.lang(lang);KindEditor.plugin(pluginName,function(K){var self=this;self.clickToolbar(pluginName,function(){var menu=self.createMenu({name:pluginName,width:pluginData.width||100});KindEditor.each(pluginData.method,function(i,v){menu.addItem({title:v,checked:false,iconClass:pluginName+'-'+i,click:function(){self.exec(i).hideMenu();}});})});});});
		KindEditor.options.cssData='body {font-size: 14px;}';
		KindEditor.options.fontSizeTable = ['12px', '14px', '16px', '18px', '24px', '32px'];
		KindEditor.options.filterLink = true;KindEditor.options.untarget=true;
		$$marketDescription = KindEditor.create('#marketDescription', {
			themeType : 'qq',
			items : ['bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','link'],
			afterChange : function(){
				//var a = err_text();
				err_text();
				this.sync();
			}
		});
	}
		
		seajs.use(csc.url("res","/f=js/m/area"),function (){
			csc.getArea("select[name='province_name']","select[name='city_name']",b,c);
		});
	}else{
		csc.getArea("select[name='province_name']","select[name='city_name']",b,c);
	}
	
	$("select[name='province_name']").on("change",function(){
		var $o = $(this);
		var $v = $("input[name='province']");
		if($o.val()!='s'){$v.val($o.find("option:selected").text());}
		else{$v.val("");}
	})
	
	$("select[name='city_name']").on("change",function(){
		var $o = $(this);
		var $v = $("input[name='city']");
		if($o.val()!='s'){$v.val($o.find("option:selected").text());}
		else{$v.val("");}
	})
	
	err_form();
}
function err_form(){
	$("input[name='marketName']").bind("blur",function(){
		if($(this).val().length > 60){
			$(this).next(".g-f-msg-box").addClass("g-f-error").html('<p class="g-f-error">市场名称最多60个字符</p>');
		}else{
			$(this).next(".g-f-msg-box").removeClass("g-f-error").html('<p>请输入市场名称</p>');
		}
	});
	$("input[name='tagName']").bind("blur",function(){
		if($(this).val().length > 60){
			$(this).next(".g-f-msg-box").addClass("g-f-error").html('<p class="g-f-error">经营范围不能超过60个字符</p>');
		}else{
			$(this).next(".g-f-msg-box").removeClass("g-f-error").html('<p>请输入经营范围，如：棉麻、毛纺</p>');
		}
	});
}
function err_text(){
	if($$marketDescription && $$marketDescription.count('text') > 2000){
		$("#marketDescription").nextAll().find(".g-f-msg-box").addClass("g-f-error").find("p").addClass("g-f-error");
		return true;
	}else if($$marketDescription && $$marketDescription.count('text')>0){
		$("#marketDescription").nextAll().find(".g-f-msg-box").removeClass("g-f-error").find("p").removeClass("g-f-error");
	}
	return false;
}

$(function (){
	$$ct = $$ct || {};
	F5(true,$$ct.a,$$ct.b);
});