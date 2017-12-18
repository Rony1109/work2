csc.ads = {};
//广告总价计算
csc.ads.calculate = function (obj, time) {
    var fee = $.trim($("#ad-fee").val()), $st = $("#startTime"), $et = $("#endTime"), startTime = $st.val(), endTime = $et.val(), obj = obj || {}, time = time || '',adsId = $("select[name='adType'] :selected").val() || $("#adTypeId").data("id");
    if ($(obj).is($st)) {
        startTime = time;
    } else if ($(obj).is($et)) {
        endTime = time;
    }
    if (fee !== '' && startTime !== '' && startTime !== '开始于' && endTime !== '' && endTime !== '结束于') {
        var totalFee = (parseInt(new Date(endTime.replace(/-/g, "\/")) - new Date(startTime.replace(/-/g, "\/"))) / (1000 * 3600 * 24) + 1) * fee;
        $("#total-fee").html(totalFee.toFixed(2));
    }
    if(startTime !== '' && startTime !== '开始于' && endTime !== '' && endTime !== '结束于'){
        csc.ads.showMsg($et.parents(".aff-value"), '');
        $("#dateError").remove();
        $.post(csc.url("member","/advertise/addAdvertise.html"),{startTime:startTime,endTime:endTime,adsId:adsId,status:"Y"},function(data){
            if(!data.status){
                csc.ads.showMsg($et.parents(".aff-value"), '广告投放时间重复，请重新选择！','error');
                $et.after($('<input type = "hidden" id ="dateError"/> '))
            }
        },"jsonp");
    }
};

function fileQueueError(file, errorCode, message) {
    var msg = "您选择的图片错误，请重新选择图片上传！";
    switch (errorCode) {
        case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
            msg = "您选择的图片大小错误，请重新选择图片上传！";
            break;
        case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
            try{msg="您选择的图片超过最大("+this.settings.file_size_limit+")限制，请处理后上传！"}
            catch(e){msg = "您选择的图片大小超过最大限制，请处理后上传！";}
            break;
        case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
            msg = "仅允许上传指定格式和大小的文件，详见上方支持说明！";
            break;
        case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
            msg = "您一次选择的图片太多，请重新选择图片上传！";
            break;
        default:
            msg = "您选择的图片错误，请重新选择图片上传！";
    };
    csc.useDialog(function () {
        artDialog({
            id: "cscError",
            content: msg,
            fixed: true,
            title: false,
            icon: _ARTDIALOG_SKINS_ICOS_[2] || 'mem-e',
            time: 3
        });
    });
};
//广告图片上传成功
function uploadSuccess(file, serverData) {
    var data = eval("(" + serverData + ")");
    if (data.result === "success") {
        var filename = file.name, arr = file.id.split("_"), id = arr[1];
        $("#SWFUpload_"+id).prev().val(data.key).blur().end().next().val(data.key);
        csc.ads.showMsg($("#SWFUpload_"+id).parents(".aff-value"), '');
    } else {
        csc.error("上传失败，请重新上传！");
    }
}
//错误提示信息
csc.ads.showMsg = function (obj, msg, type) {
    var type = type || '';
    $(obj).find(".g-f-msg-box").remove();
    switch(type) {
        case "error":
            $(obj).find(".aff-text,select").addClass("aff-text-error");
            $(obj).addClass("g-f-error").append('<div class="g-f-msg-box"><p class="g-f-error">' + msg + '</p></div>');
            break;
        case "success":
            $(obj).find(".aff-text").removeClass("aff-text-error");
            $(obj).addClass("g-f-success").append('<div class="g-f-msg-box"><p class="g-f-success">' + msg + '</p></div>');
            break;
        case '' :
            $(obj).find(".aff-text,select").removeClass("aff-text-error");
            $(obj).removeClass("g-f-error");
            $(obj).find(".g-f-msg-box").remove();
            break;
    }
}
csc.ads.emptyShowMsg = function(obj, msg) {
	var parentObj = obj.parents(".aff-value");
	if (obj.length) {
		if (obj.val() == '') {
			csc.ads.showMsg(parentObj, msg, "error");
		} else {
			csc.ads.showMsg(parentObj, '');
		}
	}
}
//广告删除
csc.ads.del = function(o){
	var $t = $(o),adsId = $t.closest("td").data("id");
	csc.useDialog(function(){
		csc.confirm("执行当前操作将不可恢复，你确定需要删除此广告吗？",function(){
			$.post(location,{adsId:adsId},function(data){
				if(data.status){
					window.location.reload();
				}else{
					csc.tip("该广告正在进行中，无法删除！如有任何疑问，请致电华南城网客服电话：400 184 8666。",3);
                    setTimeout(function(){
                        window.location.reload();
                    },3500);
				}
			},"jsonp");
		});
	});
} 
//广告修改
csc.ads.modify = function(o){
	var $t = $(o),madsId = $t.closest("td").data("id");
	$.post(location,{madsId:madsId},function(data){
		if(data.status){
			window.location.href = csc.url("member") + '/advertise/addAdvertise.html?mid=' + madsId;
		}else{
			csc.useDialog(function(){
				csc.tip("该广告正在进行中，无法修改！如有任何疑问，请致电华南城网客服电话：400 184 8666。",3);
                setTimeout(function(){
                    window.location.reload();
                },3500);
			});
		}
	},"jsonp");
}

//广告付款
csc.ads.pay = function(o){
    var $t = $(o),padsId = $t.closest("td").data("id");
    $.ajax({
        type:"post",
        async:false,
        url:location,
        dataType:"jsonp",
        data:{padsId:padsId},
        success: function(data){
            if(data.status){
                window.open(csc.url("member") + "/advertise/succesful.html?adId="+padsId,"_blank");
            }else{
                csc.useDialog(function(){
                    csc.tip(data.msg,3);
                    setTimeout(function(){
                        window.location.reload();
                    },3500);
                });
            }
        }
    });
}

csc.ads.uploadSetting = function(btnID,btntxt,format,size,type){
    new SWFUpload(uploadSettings({
        type:type || '',
        button_placeholder_id:btnID,
        file_types: format,
        file_size_limit : size,
        file_upload_limit : 0,
        button_text_left_padding:15,
        button_text:btntxt
    }));
}

//广告、广告位selcet下级
csc.ads.selectChild = function(parent,child,data){
    $("input[name='adlink']").remove(),$(".effects").attr("href","javascript:").next().remove();
	var $parent = parent,$child = $("#" + child);
    if(data.status){
        if($parent.is("select[name='childPage']")){
            var adverTmp = '<select name="adType"><option value="">请选择</option>',url = $parent.find(":selected").data("url");
            $(".effects").attr("href",csc.url("img") + url).after('<input name="secondLink" type="hidden" value="'+ url +'" />');
            $.each(data.adverData, function(i){
                adverTmp = adverTmp + '<option value="'+data.adverData[i].advertTypeId+'">'+ data.adverData[i].siteName +'</option>';
            });
            adverTmp = adverTmp + '</select>';
            $child.html(adverTmp);
        }else{
            $("select[name='adType']").html('<option value="">请选择</option>');
            var pageTmp = '<select class="s1" name="'+child+'"><option value="">请选择</option>';
            $.each(data.data, function(i){
                pageTmp = pageTmp + '<option value="'+data.data[i].resourcesId+'" data-url = "'+ data.data[i].secondLink +'">'+ data.data[i].name +'</option>';
            });
            pageTmp = pageTmp + '</select>';
            $child.html(pageTmp);
        }
    }else{
        $child.empty();
        if($parent.is($("#parentPage"))){
            $(".effects").attr("href",csc.url("img") + data.firstLink).after('<input name="firstLink" type="hidden" value="'+ data.firstLink +'" />');
            var adverTmp = '<select name="adType"><option value="">请选择</option>';
            if(data.adverData){
                $.each(data.adverData, function(i){
                    adverTmp = adverTmp + '<option value="'+data.adverData[i].advertTypeId+'">'+ data.adverData[i].siteName +'</option>';
                });
            }
            adverTmp = adverTmp + '</select>';
            $("#adType").html(adverTmp);
        }
    }
}

//广告类型
csc.ads.adsPost = function(id){
    var adsId = id;
    $.post(csc.url("member","/advertise/addAdvertise.html"),{adTypeId:adsId},function(data){
        csc.ads.TypeData = data;
        csc.ads.dFee = data.typeData.leastFee;
        if(data.status){
            var data = csc.ads.TypeData,$adInfo = $(".ad-info"),$picService = $(".picService");
            var
                $adfee = $("#ad-fee"),
                advertType = data.typeData.advertType,
                format = data.typeData.mapFormat,
                size = data.typeData.mapSize,
                picW1 = data.typeData.imageWidth,
                picH1 = data.typeData.imageHeight,
                picW2 = data.typeData.smallImageWidth,
                picH2 = data.typeData.smallImageHeight,
                feeTmp = '<div class="g-f-msg-box"><p c<p class="gray">竞价费用最少不能低于<span class="default-fee">'+ csc.ads.dFee +'</span>元/天，出价越高，展示机会越大</p></div>',
                adInfoTmp1 = '<li><div class="aff-key">广告类型：</div><div class="aff-value">'+ advertType +'</div></li><li class="g-c-f aff-item"><div class="aff-key">尺寸：</div><div class="aff-value">'+ picW1 +'px*' + picH1+'px</div></li><li class="g-c-f aff-item"><div class="aff-key">支持说明：</div><div class="aff-value">格式（'+ format +'），大小&lt;'+ size +'</div></li>',
                adInfoTmp2 = '<li><div class="aff-key">广告类型：</div><div class="aff-value">'+ advertType +'</div></li><li class="g-c-f aff-item"><div class="aff-key">大图尺寸：</div><div class="aff-value">'+ picW1 +'px*' + picH1+'px</div></li><li class="g-c-f aff-item"><div class="aff-key">小图尺寸：</div><div class="aff-value">'+ picW2 +'px*' + picH2+'px</div></li><li class="g-c-f aff-item"><div class="aff-key">支持说明：</div><div class="aff-value">格式（'+ format +'），大小&lt;'+ size +'</div></li>',
                adInfoTmp3 = '<li><div class="aff-key">广告类型：</div><div class="aff-value">'+ advertType +'</div></li>',
                picServiceTmp1 = '<li class="g-c-f aff-item"><div class="aff-key"><span class="star">*</span>广告图片：</div><div class="aff-value"><input type="text" class="aff-text picUpload" readonly id="imgload0"/>&nbsp;&nbsp;<input type="text" id="adsPic" /><input type="hidden" name="advertRightMap" id="imgurl0" class="picUpload" /></div></li>',
                picServiceTmp2 = '<li class="g-c-f aff-item"><div class="aff-key"><span class="star">*</span>广告左图：</div><div class="aff-value"><input type="text" class="aff-text picUpload" readonly id="imgload0"/>&nbsp;&nbsp;<input type="text" id="adsPic" /><input type="hidden" name="advertLeftMap" id="imgurl0" class="picUpload" /></div></li><li class="g-c-f aff-item"><div class="aff-key"><span class="star">*</span>广告右图：</div><div class="aff-value"><input type="text" class="aff-text picUpload" readonly id="imgload1"/>&nbsp;&nbsp;<input type="text" id="adsPic2" /><input  type="hidden" id="imgurl1" name="advertRightMap" class="picUpload" /></li>',
                picServiceTmp3 = '<li class="g-c-f aff-item"><div class="aff-key"><span class="star">*</span>广告大图：</div><div class="aff-value"><input type="text" class="aff-text picUpload" readonly id="imgload0"/>&nbsp;&nbsp;<input type="text" id="adsPic" /><input type="hidden" id="imgurl0" name="advertRightMap" class="picUpload" /></div></li><li class="g-c-f aff-item"><div class="aff-key"><span class="star">*</span>广告小图：</div><div class="aff-value"><input type="text" class="aff-text picUpload" readonly id="imgload1"/>&nbsp;&nbsp;<input type="text" id="adsPic2" /><input type="hidden" id="imgurl1" name="advertLeftMap" class="picUpload" /></li>';

            switch(data.typeData.mark){
                case 1:
                    $adInfo.html(adInfoTmp1);
                    $picService.html(picServiceTmp1);
                    csc.ads.uploadSetting("adsPic","上 传","*.jpg;*.jpeg;*.png;","1MB","adverFalshImg");
                    break;
                case 2:
                    $adInfo.html(adInfoTmp1);
                    $picService.html(picServiceTmp1);
                    csc.ads.uploadSetting("adsPic","上 传","*.jpg;*.jpeg;*.gif;*.png;*.swf;","2MB","adverImg");
                    break;
                case 3:
                    $adInfo.html(adInfoTmp3);
                    $picService.html('');
                    break;
                case 4:
                    $adInfo.html(adInfoTmp1);
                    $picService.html(picServiceTmp2);
                    csc.ads.uploadSetting("adsPic","上 传","*.jpg;*.jpeg;*.gif;*.png;*.swf;","2MB","adverImg");
                    csc.ads.uploadSetting("adsPic2","上 传","*.jpg;*.jpeg;*.gif;*.png;*.swf;","2MB","adverImg");
                    break;
                case 5:
                    $adInfo.html(adInfoTmp2);
                    $picService.html(picServiceTmp3);
                    csc.ads.uploadSetting("adsPic","上 传","*.jpg;*.jpeg;*.png;","1MB","adverFalshImg");
                    csc.ads.uploadSetting("adsPic2","上 传","*.jpg;*.jpeg;*.png;","1MB","adverFalshImg");
                    break;
            }
            $(".default-fee").html(csc.ads.dFee);
            if(location.href.indexOf("?mid=") == -1){
                $adfee.next(".g-f-msg-box").remove();
                $adfee.removeClass("aff-text-error");
                $adfee.parents(".aff-value").removeClass("g-f-error").removeClass("g-f-success").append(feeTmp);
            }
        }else{
            csc.useDialog(function(){
                if(location.href.indexOf("?mid=") == -1){
                    csc.tip(data.msg,2.5);
                    setTimeout(function(){
                        window.location.reload();
                    },3000);
                }
            });
        }
    },"jsonp");
}

$(function() {
    seajs.use(csc.url("res","/f=js/m/placeholder"),function (){
        csc.placeholder("input[placeholder]");
    });
    $(".ad-d-b tbody tr:odd").addClass("b-gray");
    if(location.href.indexOf("mid=") == -1){
    csc.ads.calculate();
    }
    var $adTypeId = $("#adTypeId"), adTypeId = $adTypeId.data("id"),adTypeImg1 = $adTypeId.data("img1"),adTypeImg2 = $adTypeId.data("img2");
    if(adTypeId !==''){
        if(location.href.indexOf("?mid=") !== -1){
            csc.ads.adsPost(adTypeId);
        }
        setTimeout(function(){
            if($("#imgload0").length){
                $("#imgload0").val(adTypeImg1);
                $("#imgurl0").val(adTypeImg1)
            }
            if($("#imgload1").length){
                $("#imgload1").val(adTypeImg2);
                $("#imgurl1").val(adTypeImg2);
            }
        },1000);
    }

    var
        $adFee = $("#ad-fee"),
        errMsg = ["竞价费用不能低于最低广告费用", "请输入数字，可输入小数，精确至小数点后两位", "请上传广告图片","请选择页面","请选择广告位","请选择广告投放时间","广告投放时间重复，请重新选择！"],
        $picService = $(".picService"),
        $picInput = $(".picUpload");

    csc.ads.checkFee = function() {
        var $t = $adFee, val = $.trim($t.val());
        if(val && /^(0+[1-9]+)/.test(val.toString())){
            val = val.toString().replace(/^(0+)/,'');
            $t.val(val);
        }
        if (val == '') {
            csc.ads.emptyShowMsg($adFee, errMsg[1]);
            return false;
        } else if (parseFloat(val) < csc.ads.dFee) {
            csc.ads.showMsg($t.parents(".aff-value"), errMsg[0], "error");
            return false;
        }else if (val && /^(0+)$/.test(val)) {
            $t.val('0.00');
        }else if (val && /^[1-9]\d*$/.test(val)) {
            $t.val(val + '.00');
        } else if (val && /^(\d+\.\d)$/.test(val)) {
            $t.val(val + '0');
        } else if (val && /^\d+(\.?)$/.test(val)) {
            $t.val(val + '00');
        } else if (!(val && /^\d+\.\d{1,2}$/.test(val))) {
            csc.ads.showMsg($t.parents(".aff-value"), errMsg[1], "error");
            return false;
        }
        csc.ads.showMsg($t.parents(".aff-value"), "", "success");
    }

    $adFee.live('keyup', function() {
        var $t = $(this);
        $t.val($.trim($t.val()).replace(/[^0-9.]/g, ''));
    }).live('blur', function() {
            csc.ads.checkFee();
            csc.ads.calculate(this);
        });

    $(".add-ads form").submit(function() {
        var
        $parentPage = $("[name = parentPage]"),
        $childPage = $("[name = childPage]"),
        $adType = $("[name = adType]"),
        $img1 = $("#imgload0"),
        $img2 = $("#imgload1"),
        $st = $("#startTime"),
        $et = $("#endTime");
        csc.ads.emptyShowMsg($parentPage, errMsg[3]);
        csc.ads.emptyShowMsg($childPage, errMsg[3]);
        csc.ads.emptyShowMsg($adType, errMsg[4]);
        csc.ads.emptyShowMsg($st, errMsg[5]);
        csc.ads.emptyShowMsg($et, errMsg[5]);
        if($("#dateError").length){
            csc.ads.showMsg($et.parents(".aff-value"),errMsg[6],'error');
        };
        csc.ads.checkFee();
        if (!$(".picUpload:disabled").length) {
            csc.ads.emptyShowMsg($img1, errMsg[2]);
            csc.ads.emptyShowMsg($img2, errMsg[2]);
        } else {
            csc.ads.showMsg($picInput.parents(".aff-value"), '');
        }
    });

    $(".ads-list a.del,.ads-list a.modify,.ads-list a.pay").each(function(){
        var $t = $(this);
        $t.bind("click",function(){
            if($t.hasClass("del")){
                csc.ads.del($t);
            }else if($t.hasClass("modify")){
                csc.ads.modify($t);
            }else{
                csc.ads.pay($t);
            }
        });
    });

    $("#parentPage,#childPage .s1,#adType").live("change",function(){
        var $t = $(this),commonId = $t.find(":selected").val();
        if($t.is("#parentPage")){
            if(commonId == ""){
                $("select[name='childPage'],select[name='childPage']").html('<option value="">请选择</option>');
            }else{
                $.post(csc.url("member","/advertise/addAdvertise.html"),{parentId:commonId},function(data){
                    csc.ads.selectChild($t,"childPage",data);
                },"jsonp");
            }
        }else if($t.is("#childPage .s1")){
            if(commonId == ""){
                $("select[name='adType']").html('<option value="">请选择</option>');
            }else{
                $.post(csc.url("member","/advertise/addAdvertise.html"),{childId:commonId},function(data){
                    csc.ads.selectChild($t,"adType",data);
                },"jsonp");
            }
        }else{
            $("input[name='adInfo']").remove();
            if(commonId !==''){
                csc.ads.adsPost(commonId);
                setTimeout(function(){
                    var adInfo = $(".ad-info li").map(function(){
                        return $(this).text();
                    }).get().join("||"),
                    parentPage = $("#parentPage :selected").text(),
                    childPage = $("#childPage :selected").text(),
                    adType = $("#adType :selected").text(),
                    adsTmp = parentPage + ' ' + childPage + '||' + adType  +'||'+adInfo;
                    $("input[name='adTypeInfo']").remove();
                    $t.after('<input name="adTypeInfo" type="hidden" value="'+ adsTmp +'" />');
                },3000);
            }
            if(location.href.indexOf("addAdvertise.html") !== -1){
                csc.ads.showMsg($t.parents(".aff-value"), '');
            };
        }
    });
    if($("#tag").length){
        $(".ads-list .filter span").show();
    }
});

