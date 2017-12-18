/*
* 社区个人页JS;
* author: why
* Date: 2013年8月6日
*/

$(function(){
	showUserHead();
	csc.ie6 && seajs.use(csc.url("res","/f=js/m/hover"),function (){csc.hover(".showr dl.dl_pic1");});
	highslide_bind();
});
/*
function user_tab_H(id){
	$('.user_tale li a').removeClass('hover');
	$(this).addClass('hover');
	ajaxRe('/my/dyindex?fuid='+id,'mainBox');
	userShowpage_r();
	return false;
}
function user_tab_C(id){
	$('.user_tale li a').removeClass('hover');
	$(this).addClass('hover');
	ajaxRe('/my/dyindex?fuid='+id,'mainBox');
	return false;
}
*/
function highslide_info(fun){
	if(typeof(hs) === "undefined"){
		seajs.use(csc.url("res","/js/p/highslide/highslide-full.js"),function(){
			seajs.use(csc.url("res","/js/p/highslide/highslide.css"),fun)
		})
	}else{
		fun();
	}
}
function highslide_bind(){
	$("a.at-img img").on("error",function(){
		$(this).attr("hs_on",1);
	})

	highslide_info(function(){
		hs.graphicsDir = csc.url("res","/js/p/highslide/graphics/");
		hs.align = 'center';
		hs.showCredits = false;
		hs.outlineType = 'rounded-white';
		hs.wrapperClassName = 'draggable-header';
		hs.captionEval = false;
		hs.dimmingOpacity = 0.1;
		hs.lang["restoreTitle"] = "点击还原,支持鼠标拖动.";
		
		$("#mainBox").on("click","a.at-img",function(a){
			$(this).attr("hs_on") || hs.expand(this);
			return false
		})
	})
}


//个改头像swf上传
(function(win){
var headurl;
var showUserHead = function(){
	/*if($("#uplondbut").length){
		swfu1 = new SWFUpload(uploadSettings({
			button_placeholder_id : "uplondbut",
			type:"snsPersonalCardFace",
			file_size_limit:"2MB",
			button_text :"",
			color:"#184C95",
			button_text_style:"color:#067ED4;",
			button_text_top_padding:3,
			BUTTON_ACTION:-100,
			button_width:154,
			button_height:25,
			button_image_url :csc.url("res","/css/c/sns/img/up_bg.png"),
			upload_success_handler : showUserUploadSuccess
		}));
	}*/
}
//上传成功提示
var showUserUploadSuccess = function (file, serverData) {
	if(typeof(serverData) == "undefined"){serverData = file};
	var response = eval('(' + serverData + ')');
	csc.useDialog(function(){
		if (response.result != "success") {
			var msg = response.msg || "上传失败!";
			csc.error(msg);
			return;
		}
		headurl = response.key;
		showUserUploadSave(0);
	});
}
//保存头像
var showUserUploadSave = function(clogin){
	if(clogin){csc.signDialogClose();}
	$.get(csc.url("quan","/my/do"), {"t":"eh","head" : headurl},function(data){
		//var url = (csc.url("img", headurl)).replace(/(^\s*|\s*$)/ig, "");
		var url_t = csc.url("img", "/scale/160" + headurl);		
		if(data.code == "sns_updateHead_000"){
			$(".usershow .pic img").attr("src", url_t);
			csc.success("图片上传成功！");
		}else if(data.code == "login_fail"){
			login("showUserUploadSave(1);eval");
		}else{
			csc.error(data.desc);
		}
	},"json");
}
win.showUserUploadSuccess = showUserUploadSuccess;
win.showUserHead = showUserHead;
win.showUserUploadSave = showUserUploadSave;
})(window)

//提交表单;
function userFormSubmit(obj){
	var o = $(obj);
	csc.useDialog(function(){
		o.trigger("form_verifi",[userFormErr])
	});
	return false;
}

//验证之后处理；
function userFormErr(a,obj){
	if(!a){
		//userFormPlaceholder();
		if($(obj).attr("data-vmark")==1){
			usercityJC_2();
		}else{
			$(obj).focus();
		}
		return;
	}else{
		userFormSave();
	}
}

//验证通过,保存表单
function userFormSave(clogin){
	if(clogin){csc.signDialogClose();}
	var f = $("#userForm");
	csc.useDialog(function(){
		$.post(f.attr("action"),f.serialize(),function(data){
			if(data.code == "sns_updateUserInfo_000"){
				csc.success("保存成功!",1,function(){
					//location.href = location.href.split("?")[0] + "?t=e";
					location.reload();
				})
			}else if(data.code == "login_fail"){
				login("userFormSave(1);eval");
			}else{
				csc.alert(data.desc);
			}
		},"json");
	})
}

function userQYMCJC(val){
	//if()
}
function usercityJC_1(){
	if($("#province").length && $("#province").val() == ""){return false;}
	if($("#city").length && $("#city").val() == ""){return false;}
	//if($("#area").length && $("#area").val() == ""){return false;}
	return true;
}
function usercityJC_2(){
	if($("#province").length && $("#province").val() == ""){$("#province").focus(); return false;}
	if($("#city").length && $("#city").val() == ""){$("#city").focus();return false;}
	//if($("#area").length && $("#area").val() == ""){$("#area").focus();return false;}
}


//编辑按钮
function edit_Card(){
	$.get("/interface/islogin.html",function(data){
		if("0"==data.islogin){
			login();
		}else{
			ajaxRe('/my/do?t=edit','mainBox',function(a,b){
				form_verify();
			});
		}
	},"json");
}

//ajax加载动态信息相关
(function(win){
	var userShowpage = 1;
	var userShowmore = function(id,a){
		var comms = $("#mainBox .a_comm").hide(),box=$("#dynaminBox");
		$("#more_l").show();
		$.get(csc.url("quan","/my/dynamicList"),{"fuid":id,"page":++userShowpage},function(data){
			$("#more_l").hide();
			box.append(data);
			/*if(a){
				box.html(data);
			}else{
				box.append(data);
			}*/
			if(box.find("#__end").length){
				comms.hide();
				$("#more_n").show();
				return;
			}
			if(userShowpage%5==0){
				$("#more_p").show();
			}else{
				$("#more_a").show();
			}
		},"html")
	}
	var userShowpage_r = function(){
		userShowpage = 1;
	}
	win.userShowmore = userShowmore;
	win.userShowpage_r = userShowpage_r;
})(window);


//绑定验证控件
(function(win){
	function form_verify(){
		seajs.use(csc.url("res","/js/c/sns/public/v_why"),function (){
			verify1 = new verify_why({
				f_err:userVerify_event.v_m_err,		//验证出错操作
				f_success:userVerify_event.v_m_success,	//验证成功操作
				f_focus:userVerify_event.v_m_focus,		//焦点提示
				f_clear:userVerify_event.v_m_clear,		//预留:清除样式
				f_default:userVerify_event.v_m_default	//预留:还原样式
			});
			verify1.info("form");
			$("#form_airc").on("blur","select",function(){
				$("#form_airc input[data-vmark]").trigger("v_verifi");
			});
		});
		userFormPlaceholder();
		$('#userForm input').bind('blur',  function(event) {
			var max = 0,
				$t = $(this);
			switch ($t.attr('name')){
				case 'name':
				case 'position':
				max = 20;
				break;
				case 'sign':
				max = 40;
				break;
				case 'company':
				max = 60;
				break;
				default:;
			}
			if(max > 0){
				var length = $(this).val().replace(/([^\x00-\xFF])/g, "aa").length;
				if(length > max){
					userVerify_event.v_m_err(this,'长度不能超过'+max/2+'个汉字');
				}
			}
		});
	}
	var userVerify_event = {};
	userVerify_event.v_m_clear = function (obj,tipType){
		$(obj).parents("dd").find("span.form_msg").removeClass("Err Sue").text("");
	}
	userVerify_event.v_m_err = function(obj,msg){
		this.v_m_clear(obj);
		$(obj).parents("dd").find("span.form_msg").addClass("Err").text(msg);
	}
	userVerify_event.v_m_success = function(obj,msg){
		this.v_m_clear(obj);
		msg = msg == "" ? "√" : msg;
		$(obj).parents("dd").find("span.form_msg").addClass("Sue").text(msg);
	}
	userVerify_event.v_m_default = function(obj,msg){
		this.v_m_clear(obj);
	}
	userVerify_event.v_m_focus = function(obj,msg){}
	
	//个人介绍的验证函数；
	var userSuggest = function(element){
		var o = $(element),
			maxleng = o.attr("maxlength") || 500,
			msgbox = o.parents("dd").find("span.form_msg"),
			len = o.val().length;	
		if(len == 0){
			msgbox.html("不超过500个字符。");
		}else if(len<=maxleng){
			msgbox.html("还可以输入"+(maxleng-len)+"个字符。");
		}else{
			msgbox.html("超出<span class=\"Err\">"+(len-maxleng)+"</span>个字符！");
		}
	}
	var userFormPlaceholder = function(){
		seajs.use(csc.url("res","/f=js/m/placeholder"),function (){
			csc.placeholder("input[type='text'][placeholder],textarea[placeholder]");
		});
	}
	win.form_verify = form_verify;
	win.userSuggest = userSuggest;
	win.userFormPlaceholder = userFormPlaceholder;
})(window);

function uploadevent(status){
	status += '';
	switch(status){
		case '1': //成功
			var time = new Date().getTime();
			document.getElementById('avatar_priview').innerHTML = "Avatar Priview: <img src='php/avatar_1.jpg?" + time + "'/> <br/> Source Image: <img src='php/avatar_2.jpg?" + time + "'/>";
		break;
		case '2'://
			if(confirm('js call upload')){
				return 1;
			}else{
				return 0;
			};
			break;
		case '-1'://退出,停止上传(上传过程中)
			//alert('//退出,停止上传(上传过程中)');
			history.back();
			break;
		case '-2'://上传失败.
			alert('upload failed!');
			window.location.href = "#";
			break;
		default:
			alert(typeof(status) + ' ' + status);
	} 
}