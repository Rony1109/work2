//翻页
function goPage(f){
    var
        $f = $(f),
        inputpage = $.trim($f.find("[name='pageNo']").val()) || $.trim($f.find("[name='inputpage']").val()) ,
        msg = '';
    if(inputpage.length == 0){
        msg = '请输入页码数！';
    }
    if(/^0+$/.test(inputpage)){
        msg = '页码数不能为0！';
    }
    if(parseInt(inputpage) > parseInt($(".page-r strong").eq(0).html())){
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
        var
            pageindex = $(".page-r input[type='text']").eq(0).attr("name"),
            $url=window.location.href.replace(/(pageNo|inputpage)=\d+/,pageindex+"="+inputpage);
        if($url.indexOf(pageindex)==-1 &&$url.indexOf('?') == -1)
        {
            $url=$url+"?"+ pageindex +"="+inputpage;
        }
        else if($url.indexOf(pageindex)==-1)
        {
            $url=$url+"&" + pageindex +"="+inputpage;
        }
        window.location.href=$url;
        return false;
    }
}

//添加商家
function addMerchant(marketId,doorNumber,isClaim,shopName,account,shopUrl,memberName,phone,cellPhone,sid,action,business,enterpriseId){
    var
        cityid = $("#cityId").val() || "",
        selectTmp = $("#marketId").html().replace(/<option value="">请选择<\/option>/g,''),
        marketId = marketId || "",
        doorNumber = doorNumber || "",
        isClaim = isClaim || "",
        shopName = shopName || "",
        account = account || "",
        shopUrl = shopUrl || "",
        memberName = memberName || "",
        phone = phone || "",
        cellPhone = cellPhone || "",
        sid = sid || "",
        action = action || "guang.saveShop",
        business = business || '',//经营范围
        msg = '';
        enterpriseId= enterpriseId || '';
    var tmp = '<div class="add-shop-form"><form id="add-shop-form" method="post" action="'+ action +'"><ul><li><span>所属商场：</span><select id="marketSelect" name="marketId"> '+ selectTmp +'</select></li><li><span>商铺号：</span><input name="doorNumber" class="txt t1" value="'+ doorNumber +'"/><input name="isClaim" id="isClaim" type="checkbox"/> 认领</li><li><span>企业名称：</span><input name="shopName" class="txt" value="'+ shopName +'"/></li><li><span>会员账号：</span><input name="account" class="txt" value="'+account+'"/></li><li><span>URL：</span><input name="shopUrl" class="txt" value="'+shopUrl+'"/></li><li><span>联系人：</span><input name="memberName" class="txt" value="'+memberName+'"/></li><li><span>公司座机：</span><input name="phone" class="txt" value="'+phone+'"/></li><li><span>联系电话：</span><input name="cellPhone" class="txt" value="'+cellPhone+'"/></li><li><span>经营范围：</span><input name="business" class="txt" value="'+business+'"/></li><li><span>商家ID：</span><input name="enterpriseId" class="txt" value="'+enterpriseId+'"/></li></ul><input type="hidden" name ="sid" value="'+sid+'"/><div id="f_err"></div><input type="hidden" name="cityId" value="'+cityid+'" /></form></div> ';
        art.dialog({
            title:"商铺管理",
            content: tmp,
            ok:function(){
                var
                    $form = $("#add-shop-form"),
                    doorNumber = $form.find("input[name='doorNumber']").val(),
                    shopName = $form.find("input[name='shopName']").val(),
                    account = $form.find("input[name='account']").val(),
                    shopUrl = $form.find("input[name='shopUrl']").val(),
                _showMsg = function(msg){
                    $("#f_err").html(msg).show();
                    return false;
                }
                if(doorNumber == ''){
                    return _showMsg("商铺号为必填项");
                }else if(shopName == ''){
                    return _showMsg("企业名称为必填项");
                }else if(account == '' && shopUrl == ''){
                    return _showMsg("会员账号和URL必填一项");
                }else{
                    $("#f_err").hide();
                    $.post(action,$form.serialize(),function(data){
                        if(data.status == 1){
                            art.dialog({content:'操作成功！',icon: 'succeed',fixed: true,time: 1.5});
                            setTimeout(function(){
                                location.href = location.href;
                            },1800);
                        }else{
                            var err = data.info;
                            art.dialog({content: err,icon: 'error',fixed: true,time:1.5});
                        }
                    },"jsonp");
                }
            },
            okVal:'保存',
            cancel:true,
            fixed: true,
            lock:true
    });
}

function editMerchant(id){
    //预留的方法，暂保留
}

//图片上传配置
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

//图片上传
var picNum = 0;

function uploadSuccess(file,serverData){
    var data = eval("("+serverData+")");
    if(data.result == "success"){
        var filename=file.name,arr=file.id.split("_"),id=arr[1];
        if($("#topSaleImg").length){
            var $img = $("#imgload"+id);
            $img.attr("src",csc.url("img")+data.key);
            if($img.next('a.del-top-img').show().length == 0){
                $img.after('<a href="javascript:void(delTopImg('+id+'))" class="del-top-img">删除</a>');
            }
            $("#imgurl"+id).val(data.key);
        }else if($(".pt-pic").length){
            $(".pt-pic img").attr("src",csc.url("img")+data.key);
            $("#imgurl"+id).val(data.key);
        }else{
            upMsg(file,data);
        }
    }else{
        adDialogMsg("上传失败，请重新上传！","error");
    }
}

//上传操作
function upMsg(file,data){
    if(picNum>2){
        adDialogMsg("最多上传三张！","error");
        return;
    };
    var
        $imgDel = $(".img-del"),
        $imgShow = $("#imgShow");
    $imgShow.attr("src",csc.url("img")+data.key);
    $imgDel.find("span").removeClass("cur").end().append('<span id="file-'+ (file.index +1) +'" onclick="imgTab(this);" class="cur" data-url="'+ data.key +'"><em onclick="delImg(this,event);" title="删除">x</em><input type="hidden" name="pic[]" value="'+ data.key +'" /></span>');
    picNum++;
}

//图片切换
function imgTab(o){
    var
        $imgShow = $("#imgShow"),
        url = $(o).data("url");
    $(o).addClass("cur").siblings().removeClass("cur");
    $imgShow.attr("src",csc.url("img") + url);
}

//图片删除
function delImg(o,event){
    if (event && event.stopPropagation) {
        event.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
    $(o).parents("span").remove();
    picNum--;
    var $spans = $(".img-del span"),
        $imgShow = $("#imgShow");
    $spans.removeClass("cur");
    if(picNum == 0){
        $imgShow.attr("src","http://resmanage.csc86.com/img/img.png");
    }else{
        var firstSpan = $spans.eq(0),
            url = firstSpan.data("url");
        $imgShow.attr("src",csc.url("img") + url);
        firstSpan.addClass("cur");
    };
}

//错误信息提示框
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


function mFormErr(msg,form){
    if(msg.length){
        $(form).find("input[type='submit']").prev().remove().end().before($('<div class="m-f-err">' + msg + '</div>').fadeIn());
        return false;
    }else{
        $(form).find("input[type='submit']").prev().remove();
        return true;
    }
}


function delHelpEvent(id){//办事求助页面 批量删除功能 || 办事求助详情页面删除功能
	var l = $("#helpEventList input[type=checkbox]:checked") , edArray = '';
	if(!id){
		if(l.length<=0){
			art.dialog({content:'未选中任何信息！',icon: 'error',fixed: true,time: 1.5});
		}else{
			for(i=0; i<l.length; i++){
				edArray += $(l[i]).attr("id")+',';
			}
			$.post("guang.deleteQuestion",{"questionIds":edArray},function(data){
				if(data.status<=0){
					location.href = location.href;
				}else{
					art.dialog({content:'删除失败，请刷新后再试！',icon: 'error',fixed: true,time: 1.5});
				}
			},"jsonp")
		};
	}else{
		$.post("guang.deleteQuestion",{"questionIds":id},function(data){
			if(data.status<=0){
				art.dialog({content:'删除成功！',icon: 'succeed',fixed: true,time: 1});
                setTimeout(function(){
                    location.href='guang.listQuestion';
                },1800);
			}else{
				art.dialog({content:'删除失败，请刷新后再试！',icon: 'error',fixed: true,time: 1.5});
			}
		},"jsonp")
	}
};

function saveReturnEvent(answerId,questionId){//办事求助 保存回复
	var returnCont = $.trim($("textarea[name=answerContext]").val());
	if(returnCont==""){
		art.dialog({content:'未填写回复内容！',icon: 'error',fixed: true,time: 1.5});
	}else{
		$.post("guang.saveAnswer",{"returnContent":returnCont,"answerId":answerId,"questionId":questionId},function(data){
			if(data.status<=0){
				art.dialog({content:'保存成功！',icon: 'succeed',fixed: true,time: 1});
                setTimeout(function(){
                    location.href='guang.listQuestion';
                },1800);
			}else{
				art.dialog({content:'保存失败，请刷新后再试！',icon: 'error',fixed: true,time: 1.5});
			}
		},"jsonp")
	}
}

function verifyBlank(id){//验证空值
	var v = $.trim($(id).val());
	if(v==""){return false}else{return true};
}
function isBlank(evt,img){
	var ipt = $(evt).find("input[type=text]");
	$(img).nextAll().empty();
	for(i=0; i<ipt.length; i++){
		ipt.eq(i).nextAll().empty();
		if(!verifyBlank(ipt.eq(i))){ipt.eq(i).after('<lable style="color:red;padding-left:5px">*不能为空</lable>'); return false;}
	}if(!verifyBlank($(img).val())){
		$(img).after('<lable style="color:red;padding-left:5px">*请上传形象图片</lable>'); return false;
	}
}

function delTopImg(id){
    $("#imgload"+id).attr('src','http://resmanage.csc86.com/img/img.png').next('a.del-top-img').hide();
    $("#imgurl"+id).val('');
}

$(function(){
    //图片张数
    if($(".img-del span").length){
        picNum = $(".img-del span").length;
    }

    //修改商家
    $('div.g-list').delegate('a.ico-edit[href*="editMerchant"]', 'click', function(event) {
        event.preventDefault();
        var sid = $(this).parents("tr").find("input[name='sid']").val();
        $.post("guang.findShopById",{"sid":sid},function(data){
            var item = data.status.pageBean.list[0],
                marketId = item.marketId || "",
                doorNumber = item.doorNumber || "",
                isClaim = item.isClaim || "",
                shopName = item.shopName || "",
                account = item.memberAccount || "",
                shopUrl = item.shopUrl || "",
                memberName = item.memberName || "",
                phone = item.phone || "",
                cellPhone = item.cellPhone || "",
                sid = item.id || "",
                business = item.business || '',
                enterpriseId = item.enterpriseId || '',
                action = "guang.updateShop";
                addMerchant(marketId,doorNumber,isClaim,shopName,account,shopUrl,memberName,phone,cellPhone,sid,action,business,enterpriseId);
            $("#marketSelect option[value='"+marketId+"']").attr("selected",true);
            isClaim == 0 ? $("#isClaim").attr("checked", false) :$("#isClaim").attr("checked", true);
        },"jsonp");
    });

    //个体市场表单
    $("form[action='guang.doMarketInfo']").submit(function(){
        var $t = $(this),
            name = $.trim($t.find("input[name='name']").val()),
            date_B = $.trim($t.find("input[name='businessBegin']").val()),
            date_E = $.trim($t.find("input[name='businessEnd']").val()),
            location = $.trim($t.find("input[name='location']").val()),
            telephone = $.trim($t.find("input[name='telephone']").val()),
            //regexp = /^([0-9]|[\u4e00-\u9fa5])+$/,
            regexpTime = /^([0-1]\d|2[0-3]):[0-5]\d$/,
            regexpTel = /^\d+(-\d+)*$/,
            msg= '';
        if(name.length < 3 || name.length>10){
            msg = "市场名称为3-10字";
        }else if(!(regexpTime.test(date_B) && regexpTime.test(date_E))){
            msg = "营业时间格式不正确，格式示例08:30";
        }else if(!regexp.test(location)){
            msg = "位置信息为汉字、数字";
        }else if(!regexpTel.test(telephone)){
            msg = "电话格式不正确，可包含数字、-";
        }
        return mFormErr(msg,$t);
    });

    $('form[action="guang.doMarketTopsale"]').on('submit',function(){
        var $f = $(this),
            $ol = $f.find('ol'),
            error = false,
            msgs = {
                title:'标题',
                price:'价格',
                reason:'推荐理由',
                url:'URL',
                image:'图片'
            };
        $ol.each(function(i){
            var $t = $(this),
                n = $t.find('input[value!=""]').length;
            if(0 < n && n < 5){
                error = '第' + (i+1) + '个顶级特卖的'+ msgs[$t.find('input[value=""]:first').attr('name').split('_')[0]] + '不能为空';
                return false;
            }
        });
        if(error){
            mFormErr(error,$f);
            return false;
        }
    });

    if($.browser.version <= 7){
        $("#pt-form li,.m_basic .nth1").addClass("g-c-f");
    }
});