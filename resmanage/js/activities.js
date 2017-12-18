/*
* SNS圈子活动_页面处理
* author: why
* date  : 2013.1.29
*/
$(function(){
	activity_show_bind();
})

function $ime_disabled(obj){//文本框只能输入数字
	obj.onkeydown = function(e){
	    var keynum;
        var keychar;
        var numcheck;
        if(window.event){
            keynum = event.keyCode;
        }else if(e.which){
            keynum = e.which;
        };
        if (keynum == 13) { return true }; //回车事件
		if((keynum >= 96 && keynum <= 105) || keynum==9 || keynum==37 || keynum==38 || keynum==39 || keynum==40 || keynum==46) return true;//小键盘数字,tabe键,方向键;
		keychar = String.fromCharCode(keynum);
		numcheck = /[\d\ch]/; //匹配数字,退格;
		return numcheck.test(keychar);
	}
};

function getURL_argument(kdy,url_){//JS获取URL参数
	var url = url_ || location.href;
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

/* 改变活动状态(删除,中止,审核通过,审核不通过,置顶等)
* mun 批量/单个 操作标示
* id 单个操作的记录标示
* zt 要修改的状态
* zt_o 记录原装态,用于获得提示信息;
* xq 祥情页操作标识,用于判断成功后的操作;
* exp: 'DISABLE':停止 'ENABLE':正常 'USERDELETE':用户删除 'MANAGEDELETE':管理员删除 'WAITING':待审核 'FAIL':审核不通过
*/
function changestate(num,id,zt,zt_o,xq){
	var texts = {
		"ENABLE":["该活动已被中止，您确定要恢复中止的活动么？","恢复成功!","恢复失败!"],
		"ENABLE2":["该活动已被用户删除，您确定要恢复删除的活动吗？","恢复成功!","恢复失败!"],
		"ENABLE3":["该活动已被管理员删除，您确定要恢复删除的活动吗？","恢复成功!","恢复失败!"],
		"MANAGEDELETE":["您确定要删除该活动？","删除成功!","删除失败!"],
		"DELETE":["确认永久删除当前选中的活动？永久删除后的活动将不可恢复。","删除成功!","删除失败!"],
		"DISABLE":["确定要中止吗？","活动己中止!","中止失败!"],
		"FAIL":["您确定要将该活动修改为审核不通过吗？","操作成功!","操作失败!"],
		"PASS":["确定要审核通过这些记录吗?","审核成功!","审核出错!"]
	},ids;
	if(num=='one'){
		ids = id + ",";
	}else{
		var idlist = $("input[name='trendSelect']:checked"),id_arr=[];
		if(idlist.length<=0) {artDialog.alert("请选择您要操作的记录！"); return;}
		for(i=0;i<idlist.length;i++){
			id_arr[id_arr.length] = $(idlist[i]).val();
		}
		ids = id_arr.join(",") + ",";
	}
	var url = "circleActivity.activityBeachAudit?activityId="+ids + "&activityState="+zt,zti,zt_b;
	if(zt_o == "WAITING"){//待审核
		zt_b = {"ENABLE":"PASS","FAIL":"FAIL","MANAGEDELETE":"MANAGEDELETE"};
	}else if(zt_o == "ENABLE"){//审核通过
		zt_b = {"FAIL":"FAIL","DISABLE":"DISABLE","MANAGEDELETE":"MANAGEDELETE"};
	}else if(zt_o == "FAIL"){//审核未通过
		zt_b = {"ENABLE":"PASS","MANAGEDELETE":"MANAGEDELETE"};
	}else if(zt_o == "DISABLE"){//中止
		zt_b = {"ENABLE":"ENABLE","MANAGEDELETE":"MANAGEDELETE"};
	}else if(zt_o == "USERDELETE"){//用户删除
		zt_b = {"MANAGEDELETE":"MANAGEDELETE","ENABLE":"ENABLE2"};
	}else if (zt_o == "MANAGEDELETE"){
		zt_b = {"ENABLE":"ENABLE3"}
	}else{
		zt_b = {"ENABLE":"PASS"};
	}
	ati = zt_b[zt] || zt;

	if(zt == "MANAGEDELETE"){
		mvRefs_pr(url,{},$quan_msg_data.activity_del,function(data){
			if(xq == "other"){
				alert_aReturn(data,texts[ati][1],texts[ati][2],function(){circleActivityNextPage()})
			}else{
				alert_aReturn(data,texts[ati][1],texts[ati][2],function(){location.href = location.href;})
			}
		});
	}else if(ati == "PASS" && num=='one'){//为PASS时,无询问直接通过;
		$.get(url,function(data){
			if(xq == "other"){
				alert_aReturn(data,texts[ati][1],texts[ati][2],function(){circleActivityNextPage()})
			}else{
				alert_aReturn(data,texts[ati][1],texts[ati][2],function(){location.href = location.href;})
			}
		})
	}else{
		if(texts[ati]){
			artDialog.confirm(texts[ati][0],function(){
				$.get(url,function(data){
					if(xq == "other"){
						alert_aReturn(data,texts[ati][1],texts[ati][2],function(){circleActivityNextPage()});
					}else{
						alert_aReturn(data,texts[ati][1],texts[ati][2],function(){location.href = location.href;});
					}
				})
			})
		}
	}
}

//评论删除
function deleteActivityTopic(num,id,state,xq){
	var ids="",del_text="您确定要删除吗？";
	if(num=='one'){
		ids = id + ",";
	}else{
		var idlist = $("input[name='trendSelect']:checked"),id_arr=[];
		if(idlist.length<=0) {artDialog.alert("请选择您要操作的记录！"); return;}
		for(i=0;i<idlist.length;i++){
			id_arr[id_arr.length] = $(idlist[i]).val();
		}
		ids = id_arr.join(",") + ",";
		del_text="您确定要删除所选择的评论吗？"
	}
	var url = "circleActivityTopic.updateActivityTopic?commentId=" + ids + "&commentSate=" + state;
	if(state=='DELETE'){
		artDialog.confirm(del_text,function(){
			$.get(url,function(data){
				if(xq == "other"){
					alert_aReturn(data,"删除成功!","删除失败!",function(){
						activityTopicNextpage()	;
					});
				}else{
					alert_aReturn(data,"删除成功!","删除失败!",function(){location.href = location.href;});
				}
			})
		});
	}
}

//回复删除
function deleteActivityComment(num,id,state,xq){
	var ids="",del_text="您确定要删除吗？";
	if(num=='one'){
		ids = id + ",";
	}else{
		var idlist = $("input[name='trendSelect']:checked"),id_arr=[];
		if(idlist.length<=0) {artDialog.alert("请选择您要操作的记录！"); return;}
		for(i=0;i<idlist.length;i++){
			id_arr[id_arr.length] = $(idlist[i]).val();
		}
		ids = id_arr.join(",") + ",";
		del_text="您确定要删除所选择的回复吗？"
	}
	var url = "circleActivityTopic.updateActivityComment?commentId=" + ids + "&commentSate=" + state;
	if(state=='DELETE'){
		artDialog.confirm(del_text,function(){
			$.get(url,function(data){
				if(xq == "other"){
					alert_aReturn(data,"删除成功!","删除失败!",function(){
						activityCommentNextpage();
					});
				}else{
					alert_aReturn(data,"删除成功!","删除失败!",function(){location.href = location.href;});
				}
			})
		});
	}
}

//评论 下一条
function activityTopicNextpage(){
	var url;
	var textval = $("#indexpage").val() - 0;
	var lastsize = $(".index-look table.at-look tr").length < 2 ? textval : ($(".index-look table.at-look tr:last td:last").text() - 0);
	if(textval >= $("#sumNamber").val()){
		alert_aReturn(0,"","当前已是最后一条!",function(){});
		var eq = $(".index-look table.at-look tr").length - lastsize + textval - 1;
		next_tr = $(".index-look table.at-look tr:eq("+eq+")");
		netxt_data = [next_tr.find("td:eq(0)").text(),next_tr.find("td:eq(1)").text(),next_tr.find("td:eq(2)").text()];
		$.post("circleActivityTopic.findActivityTopic",{"activityId":netxt_data[1],"topicId":netxt_data[0],"listtest":netxt_data[2]},function(data){
			var html = data.match(/<body>([\d\D]*)?<\/body>/ig)[0];
			$("#hdexp_box").html($(html).find("#hdexp_box").html());
		})
	}else if(textval+1>lastsize){
		location.href="circleActivityTopic.listActivityTopic?commentState=" + $("#commentState").val()
		+ "&start=" + (($("#start").val() || 0) - 0 + 1)
		+ "&selectOne=" + ($("#selectOne").val() || "")
		+ "&companyName=" + ($("#companyName").val() || "")
		+ "&startTime=" + ($("#startTime").val() || "")
		+ "&endTime=" + ($("#endTime").val() || "")
		+ "&add=2";
	}else{
		var eq = $(".index-look table.at-look tr").length - lastsize + textval;
		next_tr = $(".index-look table.at-look tr:eq("+eq+")");
		netxt_data = [next_tr.find("td:eq(0)").text(),next_tr.find("td:eq(1)").text(),next_tr.find("td:eq(2)").text()];
		$.post("circleActivityTopic.findActivityTopic",{"activityId":netxt_data[1],"topicId":netxt_data[0],"listtest":netxt_data[2]},function(data){
			var html = data.match(/<body>([\d\D]*)?<\/body>/ig)[0];
			$("#hdexp_box").html($(html).find("#hdexp_box").html());
		})
	}
}

//回复 下一条
function activityCommentNextpage(){
	var url;
	var textval = $("#indexpage").val() - 0;
	var lastsize = $(".index-look table.at-look tr").length < 2 ? textval : ($(".index-look table.at-look tr:last td:last").text() - 0);
	if(textval >= $("#sumNamber").val()){
		alert_aReturn(0,"","当前已是最后一条!",function(){});
		var eq = $(".index-look table.at-look tr").length - lastsize + textval - 1;
		next_tr = $(".index-look table.at-look tr:eq("+eq+")");
		netxt_data = [next_tr.find("td:eq(0)").text(),next_tr.find("td:eq(1)").text(),next_tr.find("td:eq(2)").text()];
		$.post("circleActivityTopic.findActivityComment",{"activityId":netxt_data[1],"commentId":netxt_data[0],"listtest":netxt_data[2]},function(data){
			var html = data.match(/<body>([\d\D]*)?<\/body>/ig)[0];
			$("#hdexp_box").html($(html).find("#hdexp_box").html());
		})
	}else if(textval+1>lastsize){
		location.href="circleActivityTopic.listActivityComment?activityState=" +　$("#activityState").val()
		+ "&start=" + (($("#start").val() || 0) - 0 + 1)
		+ "&selectOne=" + ($("#selectOne").val() || "")
		+ "&companyName=" + ($("#companyName").val() || "")
		+ "&startTime=" + ($("#startTime").val() || "")
		+ "&endTime=" + ($("#endTime").val() || "")
		+ "&add=2";
	}else{
		var eq = $(".index-look table.at-look tr").length - lastsize + textval;
		next_tr = $(".index-look table.at-look tr:eq("+eq+")");
		netxt_data = [next_tr.find("td:eq(0)").text(),next_tr.find("td:eq(1)").text(),next_tr.find("td:eq(2)").text()];
		$.post("circleActivityTopic.findActivityComment",{"activityId":netxt_data[1],"commentId":netxt_data[0],"listtest":netxt_data[2]},function(data){
			var html = data.match(/<body>([\d\D]*)?<\/body>/ig)[0];
			$("#hdexp_box").html($(html).find("#hdexp_box").html());

		})

	}
}

//活动 下一条
function circleActivityNextPage(){
	var url;
	var textval = $("#indexpage").val() - 0;
	var lastsize = $(".index-look table.at-look tr").length < 2 ? textval : ($(".index-look table.at-look tr:last td:last").text() - 0);
	if(textval >= $("#sumNamber").val()){
		alert_aReturn(0,"","当前已是最后一条!",function(){});
		var eq = $(".index-look table.at-look tr").length - lastsize + textval - 1;
		next_tr = $(".index-look table.at-look tr:eq("+eq+")");
		netxt_data = [next_tr.find("td:eq(0)").text(),next_tr.find("td:eq(1)").text(),next_tr.find("td:eq(2)").text()];
		$.post("circleActivity.showActivity",{"activityId":netxt_data[0],"listtest":netxt_data[1],"pagestate":$("#pagestate").val()},function(data){
			var html = data.match(/<body>([\d\D]*)?<\/body>/ig)[0];
			$("#hdexp_box").html($(html).find("#hdexp_box").html());
			activity_show_bind(1);
			ImgZoomFun("a.highslide");
		})
	}else if(textval+1>lastsize){//showCircleActivity
		var to_utl = "circleActivity.showCircleActivity?activityState=" +　$("#activityState").val()
		+ "&start=" + (($("#start").val() || 0) - 0 + 1)
		+ "&onestart=" + $("#onestart").val()
		+ "&selectOne=" + ($("#selectOne").val() || "")
		+ "&activityName=" + ($("#activityName").val() || "")
		+ "&selectThree=" + ($("#selectThree").val() || "")
		+ "&startTime=" + ($("#startTime").val() || "")
		+ "&endTime=" + ($("#endTime").val() || "")
		+ "&all=" + ($("#all").val() || "")
		+ "&pagestate=" + ($("#pagestate").val() || "")
		+ "&add=2";
		location.href=to_utl;
		ImgZoomFun("a.highslide");
	}else{
		var eq = $(".index-look table.at-look tr").length - lastsize + textval;
		next_tr = $(".index-look table.at-look tr:eq("+eq+")");
		netxt_data = [next_tr.find("td:eq(0)").text(),next_tr.find("td:eq(1)").text(),next_tr.find("td:eq(2)").text()];
		$.post("circleActivity.showActivity",{"activityId":netxt_data[0],"listtest":netxt_data[1],"pagestate":$("#pagestate").val()},function(data){
			var html = data.match(/<body>([\d\D]*)?<\/body>/ig)[0];
			$("#hdexp_box").html($(html).find("#hdexp_box").html());
			if($("#pagestate").val()=="find"){
				$("#hdexp_box").removeClass("bianji")
			}
			activity_show_bind(1);
			ImgZoomFun("a.highslide");
		})

	}
}

//活动祥情页 编辑按钮
function changeActivityNews (){
	if($("#hdexp_box").attr("class") == "bianji"){
		$("#hdexp_box").removeClass("bianji");
		$("#change").val("编辑");
		$("#save").hide();
		$("#SWFUpload_0").css("display","none");
	}else{
		$("#hdexp_box").addClass("bianji");
		$("#change").val("取消");
		$("#save").show();
		$("#SWFUpload_0").css("display","inline-block");
	}
}

//活动祥情页 保存按钮
function activity_save(){
	//表单验证
	if($.trim($("#activityTitle").val())==""){alert_aReturn(0,"","活动主题不能为空!"); return false;}
	if($("#activityTitle").val().length>30){alert_aReturn(0,"","活动主题过长,不能超过30个字符!"); return false;}
	if($("#form1 input[name='activityType']:checked").val()=="OFFLINE"){
		if($.trim($("#province").val())==""){alert_aReturn(0,"","请选择省!"); return false;}
		if($.trim($("#city").val())==""){alert_aReturn(0,"","请选择市!"); return false;}
		//if($.trim($("#area").val())==""){alert_aReturn(0,"","请选择区!"); return false;}
	}
	var activityBeginDate = $.trim($("#activityBeginDate").val());
	var activityEndDate = $.trim($("#activityEndDate").val());
	var activityCreateTime = $.trim($("#activityCreateTime").val());
	if(activityBeginDate == ""){alert_aReturn(0,"","起始时间不能为空!"); return false;}
	if(activityEndDate == ""){alert_aReturn(0,"","结束时间不能为空!"); return false;}
	if(activityCreateTime == ""){alert_aReturn(0,"","起始时间不能为空!"); return false;}
	//var reg_date = /^\d{4}(\-)(((0[1-9])|(1[0-2]))|([1-9]))\1(([012]\d|30|31)|([1-9]))$/;
	//if(!reg_date.test(activityBeginDate)){alert_aReturn(0,"","起始时间格式不正确123!"); return false;}
	//if(!reg_date.test(activityEndDate)){alert_aReturn(0,"","结束时间格式不正确!"); return false;}
	var startTime=activityBeginDate.replace(/[- :]/g,"");
	var endTime=activityEndDate.replace(/[- :]/g,"");
	if(startTime > endTime){alert_aReturn(0,"","起始时间不能大于结束时间!"); return false;}
	if(startTime == endTime){alert_aReturn(0,"","起始时间不能等于结束时间!"); return false;}
	//if(!reg_date.test(activityCreateTime)){alert_aReturn(0,"","结束时间格式不正确!"); return false;}
	//}

	if(true){
		$.post("circleActivity.updateActivity",$("#form1").serialize(),function(data){
			alert_aReturn(data,"保存成功!","保存出错!",function(){
				$.post("circleActivity.showActivity",{"activityId":$("#activityId").val(),"listtest":$("#indexpage").val(),"pagestate":$("#pagestate").val()},function(data){
					var html = data.match(/<body>([\d\D]*)?<\/body>/ig)[0];
					$("#hdexp_box").html($(html).find("#hdexp_box").html());
					if($("#pagestate").val()=="find"){
						$("#hdexp_box").removeClass("bianji")
					}
					activity_show_bind(1);
					ImgZoomFun("a.highslide");
				})
			})
		})
	}
}

//下拉框动态填充
function area_select(o,id_select){
	var id_s = $(o).val().split(":")[0];
	if(typeof(id_s) == "undefined" || id_s == "" || id_s=="-1"){
		$(id_select).find("option:gt(0)").remove();
		return;
	}
	$(id_select).find("option:gt(0)").remove();
	$.get("circleActivity.getactivitycity","provinceId="+id_s,function(data){
		var dq_s =data;
		for(i=0 ; i< dq_s.length; i++){
			var op = $('<option value="'+dq_s[i].id+':'+dq_s[i].name+'">'+dq_s[i].name+'</option>')
			$(id_select).append(op);
		}
	},"jsonp")
}

//活动详情 编辑器,上传按钮事件绑定
function activity_show_bind(upimg){
	if(typeof(KindEditor) != "undefined"){
		Kmsg_text = KindEditor.create('#activityDescription', {
			themeType : 'qq',
			items : ['bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','link'],
			afterChange : function(){
				this.sync();
				//msg_text_jc(this.count('text'));
			}
		});
	}
	try{picUpload = new SWFUpload(uploadSettings("snsActivityLogo"));}catch(e){}
	//picUpload = new SWFUpload(uploadSettings({upload_url:csc.url("img","/single.php")}));
	$("#hdexp_box").find("input[name='activityType']").on("change",activity_ling_jc);
	activity_ling_jc.call($("#hdexp_box").find("input[name='activityType']:checked"));
}
function activity_ling_jc(){
	var b = $(this).val();
	if(b == "ONLINE"){
		$("#hdexp_box").find("input[name='address']").parent().find("input,select").attr('disabled','disabled');
	}else{
		$("#hdexp_box").find("input[name='address']").parent().find("input,select").removeAttr('disabled');
	}
}
//活动祥情面 返回按钮
function historygo(){
	location.href="circleActivity.showCircleActivity?all=" + $("#all").val()
		+ "&selectThree=" + $("#selectThree").val()
		+ "&activityState=" + $("#activityState").val()
		+ "&start=" + $("#onestart").val()
		+ "&selectOne=" + $("#selectOne").val()
		+ "&activityName=" + $("#activityName").val()
		+ "&startTime=" + $("#startTime").val()
		+ "&endTime=" + $("#endTime").val();
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

//过度用 活动上线后 删除这段;
function uploadSuccess(file, serverData) {
		setTimeout(function (){
				art.dialog.close();
		},10);
        if (serverData.indexOf("upfiles") > 0) {
			var url=csc.url("img",serverData),arr=file.id.split("_"),id=Number(arr[1]),stauts="upload";
				$("#imgload0").parent().attr("href",url);
				$("#imgload0").attr("src",url);
				$("#upDImg").attr("value",serverData);
        } else {
            var msg;
            switch (serverData) {
                case "no found file!":
                    msg = "没有找到文件！";
                    break;
                case "file refuse!":
                    msg = "文件拒绝！";
                    break;
                case "not found upload stream":
                    msg = "没有发现上传的文件！";
                    break;
                case "upload file size limit exceeded":
                case "Size exceeds the limit":
                    msg = "上传文件的大小超过限制";
                    break;
                case "file only partially uploaded":
                    msg = "文件只上传了一部分";
                    break;
                case "no file was uploaded":
                case "file upload failed":
                    msg = "文件上传失败！";
                    break;
                case "can not find the temporary folder":
                    msg = "找不到临时文件夹";
                    break;
                case "file write failure":
                    msg = "文件写入失败";
                    break;
                case "upload a file type not supported":
                    msg = "上传的文件类型不支持";
                    break;
                default:
                    msg = "图片上传失败。请您重新再试一次";
            }
            csc.alert(msg);
        }
}