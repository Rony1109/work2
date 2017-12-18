// 报价中心 by lg 2013.10.14

function dropList(s,c,h){
	var dft = "所有<b class='d-trg'></b>" , arrow = "<b class='d-trg'></b>" , std = $(s).children("div").children(c) , spn = $(s).children("span");
	if($(std).length > 0){
		$(spn).html($(std).html()+arrow);
	}else{
		$(spn).html(dft);
	};
	$(s).children("div").prepend($(s).children("div").children("a").last());
	$(s).children("div").height() > h ? $(s).children("div").height(h) : $(s).children("div").height("auto");
}
function quoteSelect(id,s,c,h){/*下拉菜单*/
	var id = id || "#quoteSelect" , s = s || ".q-select" , c = c || ".q-sltd" , h = h || 170 , arry = new Array();
	$(id).children("div").each(function(i){
		arry[i] = $(this);
		var _this = $(this);
    });
	for(k=0; k<arry.length; k++){
		arry[k].bind("dList",function(){dropList(arry[k],c,h)});
		arry[k].trigger("dList");
	};
}

function qMenu(id){/*设置左侧菜单高度*/
	var id = id || ".quote-menu";
	$(id).height() < 890 ? $(id).height(890) : $(id).height("auto");
}

function keyWords(id){/*热门品类*/
	var id = id || ".hot-word" , a = $(id).children("a");
		if($(a).length > 30){
		$(id).children("a:gt(31)").hide();
		$(a).last().show().toggle(function(){
			$(id).children("a:gt(31)").show().last().html("<em>收起<b class='icon-up-darrow'></b></em>");
			qMenu();
		},function(){
			$(id).children("a:gt(31)").hide().last().html("<em>查看更多<b class='icon-darrow'></b></em>").show();
			$(id).height("auto");
			qMenu();
		});
	}
}

function showVerTxt(tag,txt){//显示错误信息
	$(tag).next().remove();
	$(tag).after(txt);
}

function verifyCompany(id,v){//验证公司名称
	if(v.length <= 0){
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-erro'>错误</b>公司名称不能为空</span>");
		return false;
	}else if(v.length > 20){
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-erro'>错误</b>公司名称在20个字以内</span>");
		return false;
	}else{
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-right'>正确</b></span>");
		return true;
	}
}
function verifyName(id,v){//验证姓名
	if(v.length <= 0){
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-erro'>错误</b>联系人不能为空</span>");
		return false;
	}else if(v.length > 4){
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-erro'>错误</b>联系人在4个字以内</span>");
		return false;
	}else{
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-right'>正确</b></span>");
		return true;
	}
}
function verifyTel(id,v){//验证电话/手机
	var /*phone = /^1\d{10}$/ , */tel = /^\d{3,4}-?\d{6,8}$/;
	if(v.length <= 0){
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-erro'>错误</b>联系电话不能为空</span>");
		return false;
	}else if(!tel.test(v)){
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-erro'>错误</b>格式不正确，如：0755-61862218</span>");
		return false;
	}else{
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-right'>正确</b></span>");
		return true;
	}
}

function verifyEmail(id,v){//验证邮箱
	var flag = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if(v.length <= 0){
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-erro'>错误</b>邮箱不能为空</span>");
		return false;
	}else if(!flag.test(v)){
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-erro'>错误</b>邮箱格式不正确</span>");
		return false;
	}else{
		showVerTxt(id,"<span class='q-ver-txt'><b class='icon-right'>正确</b></span>");
		return true;
	}
}

function qVerify(){//提交验证
	var company = "#company" ,
		name = "#contact" ,
		tel = "#phone" ,
		email =  "#email" ,
		subtn = "input[name=dosubmit]" ,
		companyVal = $.trim($(company).val()) ,
		nameVal = $.trim($(name).val()) ,
		telVal = $.trim($(tel).val()) ,
		emailVal =  $.trim($(email).val());
	if(!verifyCompany(company,companyVal) || !verifyName(name,nameVal) || !verifyTel(tel,telVal) || !verifyEmail(email,emailVal)) return false; else return true;
}

function qVerifyBlur(){//失去焦点验证
	var company = "#company" ,
		name = "#contact" ,
		tel = "#phone" ,
		email =  "#email" ,
		subtn = "input[name=dosubmit]";
	$(company).bind("blur",function(){var companyVal = $.trim($(company).val());verifyCompany(company,companyVal)});
	$(name).bind("blur",function(){var nameVal = $.trim($(name).val());verifyName(name,nameVal)});
	$(tel).bind("blur",function(){var telVal = $.trim($(tel).val());verifyTel(tel,telVal)});
	$(email).bind("blur",function(){var emailVal = $.trim($(email).val());verifyEmail(email,emailVal)});
}

$(function(){
	quoteSelect();
	keyWords();
	qMenu();
	qVerifyBlur();
})