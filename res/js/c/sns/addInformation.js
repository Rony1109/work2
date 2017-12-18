var $$obj,$$url,$$t;
function edit(t,obj){
	var url="/personal/personal/edit?t="+t;
	$$obj = obj;$$t=t;
	$card_e(0,url);
}
function cl(obj){
	$$obj = obj;
	var url="/personal/personal/edit?t=re";
	$card_c(0,url);
}
function _save(t,obj){
	$$obj = obj;$$t=t;
	var formName=("info"==t?"infoForm":"intrForm");
	if("info"==t){
			var name =$("#name").val();
			name=$.trim(name);
			if(null==name||""==name) {
				csc.alert("姓名不能为空,请输入");
				document.getElementById("name").select();
				return ;
			}					
			if(null==$("#province").val()|| "" == $("#province").val()){
				csc.alert("请选择省份");				
				return ;						
			}
			if((null==$("#city").val()|| "" == $("#city").val()) && undefined!=$("#city").val()){
				csc.alert("请选择城市");
				return ;						
			}
	}
	var data=$("#"+formName).serialize();		
	var url="/personal/personal/edit?t=u"+t+"&"+data;
	$card_s(0,url);
}

function addInformation(){
	$.get("/personal/personal/edit?t=intr",function (data){
		var data=$.trim(data);
		if($.trim(data) == "LOGIN_FAIL"){
			$_open_login(encodeURIComponent("location.reload"));
			return;
		};
		csc.useDialog(function (){
			artDialog({
				title:'个人介绍',
				content:'<textarea maxlength="500" class="add-ifm" name="" cols="" rows="10" id="testVl">'+data+'</textarea>',
				fixed: true,
				okVal: '完善提交',
				padding:"0px 25px 5px",
				ok:function(){
					var that = this;
					$.get("/personal/personal/edit?t=uintr",{"content":$("#testVl").val()},function(data){
							data=$.trim(data);
							if(data == "LOGIN_FAIL"){
								$_open_login(encodeURIComponent("location.reload"));
								return;
							};
							if(data>0){
								that.close();
								csc.success("修改成功");
							}else if("TOO_LEN"==data){
								csc.alert("个人介绍不能超过500字，请重新编辑后提交");
							}else{
								csc.alert("修改失败");
							}
						},"html");
					return false;
				},
				init:function (){
					$(this.DOM.wrap[0]).find(".aui_footer .aui_buttons").addClass("aui_but_r"); //mem皮肤需要此语句；
					//$("td.aui_icon div.aui_iconBg").removeAttr("style");
				},
				lock:true
			});
		});	
	});
};

function $card_e(login,url){
	var u = url || $$url;
	if(login){csc.signDialogClose();}
	$.post(u,function(data){
		if($.trim(data) == "LOGIN_FAIL"){
			$$url = u;
			$_open_login(encodeURIComponent("$card_e(1);eval"));
		}else{
			$("#outer-font").html(data);
			$($$obj.parentNode).html("<input id=\"save\" onclick=\"_save('"+$$t+"',this)\"  type=\"button\" value=\"保存\" /><input name=\"\" id=\"cancel\" type=\"button\"  onclick=\"cl(this)\" value=\"取消\" />");
		}
	});
}

function $card_c(login,url){
	var u = url || $$url;
	if(login){csc.signDialogClose();}
	$.post(u,function(data){
		if($.trim(data) == "LOGIN_FAIL"){
			$$url = u;
			$_open_login(encodeURIComponent("$card_c(1);eval"));
		}else{
			$("#outer-font").html(data);
			$($$obj.parentNode).html('<a href="javascript:" id="in-modify" onclick="edit(\'info\',this)" class="modify">修改</a> ');
		}
	});
}

function $card_s(login,url){
	var u = url || $$url;
	if(login){csc.signDialogClose();}
	$.post(u,function(data){
		if($.trim(data) == "LOGIN_FAIL"){
			$$url = u;
			$_open_login(encodeURIComponent("$card_s(1);eval"))
		}else{
			$("#outer-font").html(data);
			$($$obj.parentNode).html('<a href="javascript:" id="in-modify" onclick="edit(\'info\',this)" class="modify">修改</a> ');
		}
	});
}

//打开登框
function $_open_login(comm){
	csc.useDialog(function(){
		seajs.use(csc.url("res","/f=js/m/sign"),function(){
			csc.checkSign(comm);
		});
	});
}
