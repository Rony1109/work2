var appBaseUrl = location.protocol+"//"+location.host+"/bops-app/bops/";

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

function alast(mn,pr,obj){
	var $this=$(obj);
	if($this.next().is(":hidden")){
		$this.parent("."+pr).addClass(mn);
	}else{
		$this.parent("."+pr).removeClass(mn);
	}
}

function adDialogMsg(msg,icon,reload){
	var
		icon = icon || "",
		obj = {
			content:msg,
			fixde:true,
			time:1.5
		};
	if(icon){
		obj['icon'] = icon;
	}
	art.dialog(obj);
	if(reload){
		setTimeout(function (){
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
		try{msg="您选择的图片超过最大("+this.settings.file_size_limit+")限制，请处理后上传！"}
		catch(e){msg = "您选择的图片大小超过最大限制，请处理后上传！";}
		break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
		msg = "您的文件格式有误！";
		break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
		msg = "您一次选择的文件太多，请重新选择文件上传！";
		break;
		default:
		msg = "您选择的文件错误，请重新选择文件上传！";
	};
	adDialogMsg(msg);
};

function uploadSuccess(file,serverData){
	var data = eval("("+serverData+")");
	console.info(data);
	if(data.result == "success"){
		var filename=file.name,arr=file.id.split("_"),id=arr[1];
			$("#imgload"+id).val(data.key);
			$("#imgurl"+id).val(data.key);
	}else{
		adDialogMsg("上传失败，请重新上传！","error");
	}
}

function adInteger(obj){
	if(typeof(obj)){
		obj.value = obj.value.replace(/\D|^0*/g,'');
	}
}

function nonNegative(obj){
	if(typeof(obj)){
		obj.value = obj.value.replace(/[^0-9.]/g,'');
	}
}

function swfPreview(obj){
	var $t = $(obj),swfSrc = $t.data("href"),swf_w = $t.data("w"),swf_h = $t.data("h");
	art.dialog({
			width:swf_w,
			height:swf_h,
			padding:0,
			title:"Flash广告预览",
			content:"<div id='swfobject'></div>",
			fixde:true,
			lock:true
		});
	swfobject.embedSWF(swfSrc, "swfobject", swf_w, swf_h, "9.0.0", "http://resmanage.csc86.com/js/swfobject_2_2/swfobject/expressInstall.swf");
}

function adFormMsg(msg,form){
	if(msg.length){
		$(form).find("input[type='submit']").prev().remove().end().before($('<div class="ad-form-tips">' + msg + '</div>').fadeIn());
		return false;
	}else{
		$(form).find("input[type='submit']").prev().remove();
		return true;
	}
}

$(function(){
	$(".sss1,.sss2,.sss3").closest('li').css("position","relative");

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



	$("#ads-form form").submit(function() {
		var form = $(this), $adPage = $("#ad-page"), $adPage2th = $("#ad-page-2th"), $startTime = $("#startTime"), $endTime = $("#endTime"), $img1 = $("#imgurl0"), $img2 = $("#imgurl1"), $adLabel = $("#ad-label"), $adLink = $("#ad-link"),$adSelect=$("#ad-p-select"),msg = '';
		if ($adPage.find("option[value='null']").is(":selected") || $adPage2th.find("option[value='null']").is(":selected")) {
			msg = "请选择页面";
		}else if ($adSelect.find("option[value='null']").is(":selected")){
			msg = "请选择广告位";
		} else if (!$.trim($startTime.val()) || !$.trim($endTime.val())) {
			msg = "请选择投放时间";
		} else if ($("#dateC").length) {
			msg = "请修改投放时间";
		} else if (!$.trim($adLabel.val())) {
			msg = "请填写广告标题";
		} else if ($img1.length && !$.trim($img1.val())) {
			msg = "请上传图片";
		} else if ($img2.length && !$.trim($img2.val())) {
			msg = "请上传图片";
		} else if (!$.trim($adLink.val())) {
			msg = "请填写链接地址";
		} else {
			msg = '';
		}
		return adFormMsg(msg,form);
	});

	$("#advertising-form form").submit(function() {
		var form = $(this), $adPage = $("#ad-page"), $adPage2th = $("#ad-page-2th"),$adTitle = $("#ads-title"),$adType = $("#ad-type"),$adAmount=$("#ad-amount"),$w1 = $("#ad-w1"),$w2 = $("#ad-w2"),$h1 = $("#ad-h1"),$h2 = $("#ad-h2"),$adFee=$("#ad-fee"),msg='';
		if ($adPage.find("option[value='null']").is(":selected") || $adPage2th.find("option[value='null']").is(":selected")) {
			msg = "请选择页面";
		} else if (!$.trim($adTitle.val())) {
			msg = "请填写广告位名称";
		} else if ($adType.find("option[value='null']").is(":selected")){
			msg = "请选择广告类型";
		}else if($adAmount.length && !$.trim($adAmount.val())){
			msg = "请填写广告数量";
		}else if($w1.length && (!$.trim($w1.val()) || !$.trim($h1.val()))){
			msg = "请填写图片尺寸";
		}else if($w2.length && (!$.trim($w2.val()) || !$.trim($h2.val()))){
			msg = "请填写图片尺寸";
		} else if (!$.trim($adFee.val())) {
			msg = "请填写最低广告费用";
		}else {
			msg = '';
		}
		return adFormMsg(msg,form);
	});


	$("#ad-page-form form").submit(function() {
		var form = $(this),$adPageTitle = $("#ad-page-title"),$adPageLink = $("#ad-page-link"),$img = $("#imgurl0"),msg='';
		if(!$.trim($adPageTitle.val())){
			msg = "请填写页面名称";
		}else if(!$.trim($adPageLink.val())){
			msg = "请填写页面链接";
		}else if(!$.trim($img.val())){
			msg = "请上传效果图";
		}else{
			msg='';
		}
		return adFormMsg(msg,form);
	});
	var $errTip = $("#error_tip"),	turnUrl = $errTip.data("url");

	if($errTip.val() == "false"){
		adDialogMsg("提交失败","error");
	}else if($errTip.val() == "true"){
		console.info(typeof(turnUrl));
		location.href = turnUrl;
	}

	$("#ad-type").change(function() {
		var adverType = $(this).find(":selected").data("type"),parentPage = $("#ad-page :selected").val(),childPage = $("#ad-page-2th :selected").val(),adTitle = $.trim($("#ads-title").val()),adIntro = $.trim($("#ad-intro").val());
		if($("#ad-page-2th").length){
			location.href = '?adverType='+adverType+'&parentPage='+parentPage+'&childPage='+ childPage+ '&adsName=' +adTitle+'&adsPageDetail=' +adIntro;
		}else{
			location.href = '?adverType='+adverType+'&parentPage='+parentPage+ '&adsName=' +adTitle+'&adsPageDetail=' +adIntro;
		}

	});

	$("#ad-page").change(function(){
		var $t = $(this), pageId = $t.find(":selected").val();
		if(pageId=="null"){
			$t.next().remove();
			if(location.href.indexOf("advertising.advertisingAdd")>-1){
				location.href = 'advertising.advertisingAdd';
			}
		}else{
			$.get("advertising.childPage",{pageId:pageId},function(data){
				var
				d = eval('(' + data + ')'),
				pageTmp = '<select id="ad-page-2th" name="childPage">'
				if(d.childPage.length){
					$.each(d.childPage, function(i,v){
						pageTmp = pageTmp + '<option value="'+d.childPage[i].id+'">'+ d.childPage[i].name +'</option>';
					});
					pageTmp = pageTmp + '</select>';
					$t.next().remove().end().after(pageTmp);
				}else{
					$t.next().remove();
				}
			});
			if(location.href.indexOf("advertising.advertisingAdd")>-1){
				location.href = 'advertising.advertisingAdd?parentPage='+pageId;
			}
		};
	});

	$("#ad-page-2th").live("change",function(){
		var pageId = $("#ad-page :selected").val(),childPageId = $(this).find(":selected").val();
		if(location.href.indexOf("advertising.advertisingAdd")>-1){
			if(childPageId =="null"){
				location.href = 'advertising.advertisingAdd?parentPage='+pageId;
			}else{
				location.href = 'advertising.advertisingAdd?parentPage='+pageId+'&childPage='+childPageId;
			}
		}
	});

	$("#ad-p-select").change(function() {
		var pageId = $("#ad-page :selected").val(),childPageId = $("#ad-page-2th :selected").val(),adsId = $(this).find(":selected").val();
		if(adsId =="null"){
			if($("#ad-page-2th").length){
				location.href = 'advertising.advertisingAdd?parentPage='+pageId+'&childPage='+childPageId;
			}else{
				location.href = 'advertising.advertisingAdd?parentPage='+pageId;
			}
		}else{
			if($("#ad-page-2th").length){
				location.href = 'advertising.advertisingAdd?parentPage='+pageId+'&childPage='+childPageId+'&adsId='+adsId;
			}else{
				location.href = 'advertising.advertisingAdd?parentPage='+pageId+'&adsId='+adsId;
			}

		}
	});

	$("a.ad-view").click(function(){
		var $parentPage = $("#ad-page"),$childPage = $("#ad-page-2th");
		if($childPage.length){
			checkSelect($childPage);
		}else{
			checkSelect($parentPage);
		};
	});
});

function checkSelect(o){
	if(o.find("option[value='null']").is(":selected")){
		adDialogMsg("请选择页面","error");
	}else{
		var url = o.find(":selected").data("url");
		window.open("http://img.csc86.com"+url,"_blank");
	}
}

function ad_delete(obj, type) {
	var
	T = {
		"advert" : {title : "广告",url : "advertising.advertDelete",id:"advertId",msg:"该广告正在展示或已进入展示队列，无法删除！"},
		"ads" : {	title : "广告位",url : "advertising.adsDelete",id:"adsId",msg:"该广告位存在投放广告，删除失败！"},
		"page" : {title : "页面",url : "advertising.adverPageDelete",id:"pageId",msg:"该页面存在广告位，删除失败！"}
	},
	id = $(obj).data("id");
	switch (type){
		case "advert" : title = T.advert.title,url = T.advert.url,paraId = T.advert.id,msg =T.advert.msg;
		break;
		case "ads" : title = T.ads.title,url = T.ads.url,paraId = T.ads.id,msg=T.ads.msg;
		break;
		case "page" : title = T.page.title,url = T.page.url,paraId = T.page.id,msg = T.page.msg;
		break;
		default:;
		break;
	}
	tmp = '执行当前操作将不可恢复，你确定需要删除此'+title+'吗？';

	art.dialog({
		content : tmp,
		fixde : true,
		ok : function(){
			$.get(url+'?'+paraId+'='+id,{},function(data){
				if(data == "true"){
					location.href = location.href;
				}else if(data=="exists"){
					adDialogMsg(msg,"error");
				}
			});
		},
		lock:true,
		cancel:true
	});
}


function codeCall(obj){
	var adsId =$(obj).data("id");
        $.post("advertising.getImgSize",{adsId:adsId},function(data){
            var d = eval('('+ data + ')'),
            type = d.type,
            path = 'http://api.csc86.com/g/check.html?id=',
            path1,
            path2,
            tmp;
            switch(d.advertType){
                case '文字广告':
                    path1 = path + adsId + '&adtype=' + type;
                    tmp  = '<div id="codeCall"><textarea><script type="text/javascript" src="'+ path1 +'"></script></textarea></div>';
                    break;
                case '图片广告':
                case 'Flash图片广告':
                    path1 = path + adsId + '&adtype=' + type;
                    tmp  = '<div id="codeCall"><textarea><script type="text/javascript" src="'+ path1 +'"></script></textarea></div>';
                    break;
                case '对联广告':
                    path1 = path + adsId + '&adtype=' + type + '&type=L';
                    path2 = path + adsId + '&adtype=' + type + '&type=R';
                    tmp  = '左图：<div id="codeCall"><textarea><script type="text/javascript" src="'+ path1 +'"></script></textarea></div>右图：<div id="codeCall"><textarea><script type="text/javascript" src="'+ path2 +'"></script></textarea></div>';
                    break;
                case '随屏移动广告':
                    path1 = path + adsId + '&adtype=' + type + '&type=R';
                    path2 = path + adsId + '&adtype=' + type + '&type=L';
                    tmp  = '大图：<div id="codeCall"><textarea><script type="text/javascript" src="'+ path1 +'"></script></textarea></div>小图：<div id="codeCall"><textarea><script type="text/javascript" src="'+ path2 +'"></script></textarea></div>';
                    break;
            }
            art.dialog({
                title:"广告代码",
                content : tmp,
                fixde : true,
                ok : function(){},
                okVal:"确定",
                lock:true
            });
        });
}

function checkTime(obj,time){
	var adsId = $("#ad-p-select :selected").val(),et = $("#endTime"),st = $("#startTime"),startTime = st.val(),endTime = et.val(),advertisingId = $("#advertisingId").val();
	if($(obj).is(st)){
		startTime = time;
	}else{
		endTime = time;
	}
	if(startTime !=='' && endTime !==''){
		$.get("advertising.isTimeExist",{adsId:adsId,startTime:startTime,endTime:endTime,advertisingId:advertisingId},function(data){
			if(data == "true"){
				et.next().remove().end().after('<div class="chek-time-tips">投放时间重复，请确认广告投放时间没有投放其它广告。<span id="dateC"></span></div>');
			}else{
				et.next().remove();
			}
		});
	}
}

function ad_refuse(obj){
	var advertId = $(obj).data("id");
	$.get("advertising.advertForbid",{advertId:advertId},function(data){
		if(data == "true"){
			adDialogMsg("操作成功","succeed",true);
		}else{
			adDialogMsg("操作失败","error");
		}
	});
};

function ad_adopt(obj){
	var advertId = $(obj).data("id");
	$.get("advertising.advertAdopt",{advertId:advertId},function(data){
		if(data == "true"){
			adDialogMsg("操作成功","succeed",true);
		}else{
			adDialogMsg("操作失败","error");
		}
	});
};


function advert_adopt(obj){
    var id = $(obj).data("id");
    $.get("advertAudit.adoptAdvert", {advertId:id}, function(data) {
        aReturn(data, "操作成功！", "操作失败！");
    });
}

//拒绝审核
function advert_refuse(obj) {
    var id = $(obj).data("id");
    art.dialog({
        title : "拒绝理由",
        content : '<div class="test-focus"><textarea class="test-val" id="testVal"></textarea><div class="test-lay">请输入理由，最多2000个文字。</div></div>',
        fixed : true,
        okVal : '保存',
        background : "#000",
        opacity : "0.3",
        ok : function() {
            var textVal = document.getElementById("testVal").value;
            if (verifyReason(textVal, "#testVal")) {
                var refuseReason = textVal;
                $.get("advertAudit.notadoptAdvert",{advertId:id,reason:refuseReason},function(data) {
                    console.info(data);
                    aReturn(data, "操作成功！", "操作失败！");
                });
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
}

function aReturn(tmp,po,pt){
    if(tmp == "true"){
        art.dialog({content:po,icon: 'succeed',fixed: true,time: 1.5});
        setTimeout(function(){location.href = location.href;},1500);
    }else{
        art.dialog({content: pt,icon: 'error',fixed: true,time: 1.5});
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

function maxLength(text,num){
    var num = num || 2000;
    return text.length<=num ? true : false;
}