var url =BASEURL+"bops-app/bops/";
var re=/^([\u4E00-\u9FA5]|\w)*$/;
var re2=/^[a-zA-Z\d]+$/;
var newUser= function (){
	art.dialog({
		 title:'新建用户',
		content: '<div class="art-u"><span><b>*</b>登录账号：</span><input  type="text" id="userAccount" maxlength="16"/></div><div class="art-u"><span><b>*</b>用户名称：</span><input  type="text" id="userName" maxlength="16"/></div><div class="art-u"><span><b>*</b>设置密码：</span><input type="password" id="pasw1" maxlength="20"/></div><div class="art-u"><span><b>*</b>再输一次：</span><input  type="password" id="pasw2" maxlength="20"/></div>'+
		'<div class="art-u"><span>状态：</span><select class="flag"><option value="正常" selected="">正常</option><option value="禁用">禁用</option></select></div><div class="art-u"><span><b>*</b>说明：</span><input type="text" id="userExplain" maxlength="32"/></div><div class="po-us"></div>',
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
				var userAccount=document.getElementById("userAccount").value,
					userName=document.getElementById("userName").value,
					state=$("select.flag option:selected").html(),
					userExplain=document.getElementById("userExplain").value,falg,
					pasw1=document.getElementById("pasw1").value,
					pasw2=document.getElementById("pasw2").value;
					if(state=="正常"){
						falg=0;
					}else{falg=1;}
					if(userAccount==null||userAccount==""||userName==null||userName==""||pasw1==""||pasw2==""||userExplain.length == 0){
						$(".po-us").addClass("pt-color").html("带“*”为必填项；<br />登录账号、用户名称不能重名，长度为0-16位；<br />密码规则：英文字母或数字，6～20位！");
						return false;
					}
					if((!(re.test(userAccount)))||(!(re.test(userName)))||(!(re.test(pasw1)))||(!(re.test(pasw2)))||(!(re.test(userExplain)))){
						$(".po-us").addClass("pt-color").html("不能含有特殊符号!");return false;
					}
					if(!re2.test(userAccount)||!re2.test(pasw1)||!re2.test(pasw2)){
						$(".po-us").addClass("pt-color").html("登录账号、密码不能为中文！");
						return false;
					}
					if(pasw1.length<6 || pasw2.length<6 || pasw1.length>20 || pasw2.length>20){
						$(".po-us").removeClass("pt-color");
						art.dialog({content:"密码长度为6～20位！",icon: 'error',fixed: true,time: 1.5});
						return false;
					}
					if(pasw1!=pasw2){
						$(".po-us").removeClass("pt-color");
						art.dialog({content:"两次密码不一样！",icon: 'error',fixed: true,time: 1.5});
						return false;
					}
					if((pasw1==pasw2)&&(pasw1.length>=6)&&(pasw2.length>=6)){
						$.get(url+"saveUser.action",{"userAccount":userName,"userPassWord":pasw1,"userName":userAccount,"userExplain":userExplain,"flag":falg},function(data){var tmp=data.status;aReturn(tmp);},"jsonp");
					}

			},
		cancel: true,
		lock:true
	});
}

var uRevise= function (obj){
	var $th=$(obj);
	var $userId=$th.closest("tr").children("td:eq(1)").html();
	var $hiddrId=$th.closest("tr").children().find(".hidd-id").attr("value");
	var $nume=$th.closest("tr").children("td:eq(2)").html();
	var $state=$th.closest("tr").children("td:eq(3)").html();
	var $explain=$th.closest("tr").children("td:eq(4)").html(),radioV;
	if($state=="禁用"){
		radioV='<div class="art-u"><span>状态：</span><select class="flag"><option value="正常">正常</option><option value="禁用" selected="">禁用</option></select></div>';
	}else{
		var radioV='<div class="art-u"><span>状态：</span><select class="flag"><option value="正常" selected="">正常</option><option value="禁用">禁用</option></select></div>';
	}
	art.dialog({
		 title:'修改用户',
		content: '<div class="art-u"><span>登录账号：</span><input id="userIdN" type="text" value="'+$userId+'" disabled /></div>'+'<div class="art-u"><span><b>*</b>用户名称：</span><input type="text" value="'+$nume+'" id="nume" maxlength="16"/></div>'+radioV+'<div class="art-u"><span><b>*</b>说明：</span><input type="text" value="'+$explain+'" id="explain"  maxlength="32"/></div><div class="art-u"><span>&nbsp;</span><input type="button" value="清除原密码" style="cursor:pointer;" id="pws1" onclick="clPw(\''+$hiddrId+'\')"/><input type="hidden" value="" id="pws2"/></div><div class="art-u">清除后初始密码为: 123456</div><div class="po-us">带“*”为必填项；<br />登录账号、用户名称长度为0-16位；</div>',
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var state=$("select.flag option:selected").html(),
				explain=document.getElementById("explain").value,falg,
				userIdN=document.getElementById("nume").value;
				if(nume==""||nume==null||explain.length ==0){
					$(".po-us").addClass("pt-color");
					return false;
				}else if((!(re.test(userIdN)))||(!(re.test(explain)))){
					$(".po-us").addClass("pt-color").html("用户名称、说明不能含有特殊符号!");return false;
				}else{
					if(state=="正常"){
						falg=0;
					}else{falg=1;}
					$.get(url+"updateUser.action",{"userAccount":userIdN,"id":$hiddrId,"userExplain":explain,"flag":falg},function(data){var tmp=data.status;aReturnName(tmp);},"jsonp");
				}


			},
		cancel: true,
		lock:true
	});
}
function clPw(tmp){
	$.get(url+"deleteUserPassWord.action",{"userId":tmp},function(data){clPass(data.status);},"jsonp");
}

var rUser= function (){
	art.dialog({
		 title:'新建角色',
		content: '<div class="art-u"><span><b>*</b>角色名称：</span><input maxlength="16"  type="text" id="nume" /></div><div class="art-u"><span>状态：</span><select class="flag"><option value="正常" selected="">正常</option><option value="禁用">禁用</option></select></div><div class="art-u"><span><b>*</b>说明：</span><input type="text" maxlength="32" type="text" id="explain"/></div><div class="po-us"></div>',
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
				var nume=document.getElementById("nume").value,
					explain=document.getElementById("explain").value,falg;
					state=$("select.flag option:selected").html();
					if(state=="正常"){
						falg=0;
					}else{falg=1;}
					if(nume==""){
						$(".po-us").addClass("pt-color").html("角色名称 为必填项,长度为0-16位！");
						return false;
					}else if(explain == ""){
						$(".po-us").addClass("pt-color").html("说明 为必填项,长度为0-32位！");
						return false;
					}else if((!(re.test(nume)))||(!(re.test(explain)))){
						$(".po-us").addClass("pt-color").html("角色名称、说明不能含有特殊符号!");
						return false;
					}else{
					$.get(url+"saveRole.action",{"roleName":nume,"roleExplain":explain,"flag":falg},function(data){var tmp=data.status;aReturnR(tmp);},"jsonp");
					}
			},
		init:function(){

		},
		cancel: true,
		lock:true
	});
}

var rRevise= function (obj){
	var $th=$(obj),
	$nume=$th.closest("tr").children("td:eq(1)").html(),
	$state=$th.closest("tr").children("td:eq(2)").html(),
	$explain=$th.closest("tr").children("td:eq(3)").html(),
	$hiddrId=$th.closest("tr").find(".hidd-id").attr("value"),tmp;
	if($state=="正常"){
		tmp='<select class="flag"><option value="正常" selected="">正常</option><option value="禁用">禁用</option></select>';
	}else{
		tmp='<select class="flag"><option value="禁用" selected="">禁用</option><option value="正常">正常</option></select>';
	}
	art.dialog({
		 title:'修改',
		content: '<div class="art-u"><span><b>*</b>角色名称：</span><input type="text"  value="'+$nume+'" id="nume" maxlength="16" /></div><div class="art-u"><span>状态：</span>'+tmp+'</div><div class="art-u"><span><b>*</b>说明：</span><input type="text" value="'+$explain+'" id="explain" maxlength="32"/></div><div class="po-us"></div>',
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok: function () {
			var nume=document.getElementById("nume").value,
				explain=document.getElementById("explain").value,falg;
				state=$("select.flag option:selected").html();
					if(nume=="" || explain == ""){
						$(".po-us").addClass("pt-color").html("带“*”为必填项,长度为0-16位！");
						return false;
					}else if((!(re.test(nume)))||(!(re.test(explain)))){
						$(".po-us").addClass("pt-color").html("角色名称、说明不能含有特殊符号!");
						return false;
					}else{
					if(state=="正常"){
						falg=0;
					}else{falg=1;}
					$.get(url+"updateRole.action",{"id":$hiddrId,"roleName":nume,"roleExplain":explain,"flag":falg},function(data){var tmp=data.status;aReturnRT(tmp);},"jsonp");
				}
			},
		cancel: true,
		lock:true
	});
}

var rDel= function (obj){
	var $th=$(obj);
	var $userId=$th.closest("tr").children("td:eq(1)").html();
	var $hiddrId=$th.closest("tr").find(".hidd-id").attr("value");
	art.dialog({
		title:'删除用户',
		content: '<div>你确认要把角色：<span class="del-color">'+$userId+'&nbsp;</span>删除吗？</div>',
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
				var trId=$th.closest("tr").children("td:eq(0)").html();
				$.get(url+"deleteRole.action",{"id":$hiddrId},function(data){var tmp=data.status;aDel(tmp);},"jsonp");
			},
		cancel: true,
		lock:true
	});
}

var uDel= function (obj){
	var $th=$(obj);
	var $userId=$th.closest("tr").children("td:eq(1)").html();
	var $hiddrId=$th.closest("tr").find(".hidd-id").attr("value");
	art.dialog({
		title:'删除用户',
		content: '<div>你确认要把用户：<span class="del-color">'+$userId+'&nbsp;</span>删除吗？</div>',
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
				$.get(url+"deleteUser.action",{"id":$hiddrId},function(data){var tmp=data.status;aDel(tmp);},"jsonp");
			},
		cancel: true,
		lock:true
	});
}

var roleAy="";
/*var rAuthority= function (obj){
	$("#rolediv").html("");
	roleAt($(obj).closest("tr").children("td:eq(0)").find("input").attr("value"),obj);
}
function ryDiv(obj){
	if($("#rolediv").html()!=""){
		var tt=$("#rolediv").html();
		$("#rolediv").html("");
		art.dialog({
			 title:'角色权限',
			content:'<div class="l-allot at-bw"><span>所选角色的权限为：</span>'+
								'<h4>权限</h4><div id="roleHtml">'+tt+'</div></div><div class="point-l pt-show">请选择角色和权限！</div>',
			fixed: true,
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var thLeng=$("#roleHtml").find(".last-3th input:checked").length;
				var dataVal=[],str=[];
				for(var i=0;i<thLeng;i++){
					str=$("#roleHtml").find(".last-3th").children("input:checked").eq(i).attr("value").split("-");
					dataVal.push({
						 "appId":str[0],
						 "moduleId":str[1],
						 "actionId":str[2]
					 });
				}
				alert(thLeng);
				alert(JSON.stringify(dataVal));
				$.get(url+"addRoleToUser.action",{"roleId":$(obj).closest("tr").children("td:eq(0)").find("input").attr("value"),"data":JSON.stringify(dataVal)},function(data){var tmp=data.status;aSuc(tmp);},"jsonp");
			},
			init:function(){
				//roleAt($(obj).closest("tr").children("td:eq(0)").find("input").attr("value"));
				//$("#roleHtml").append($("#rolediv").html());
			},
			cancel: true,
			lock:true
		});
	}else{
		setTimeout(function(){ ryDiv(obj);},500);
	}
}
function roleAt(id,obj){
	//var $roleHtml = $("#roleHtml");
	var $roleHtml = $("#rolediv");
	$.get(url+"findRoleByUsers.action",{"userId":$(id).attr('id')},function(data){
		roleAy = '<ul class="c-items">';
			for (var i in data.status) {
				roleAy += '<li class="has-children hc"><a href="javascript:" onClick="alast(\'c-item-cur\',\'has-children\',this)" class="c-item-hd"><input type="checkbox" value="'+data.status[i].id+'" onchange="roleChange(\'c-item-hd\',this)" />' + data.status[i].name+ '</a>';
				var tmp2 = "";
				if(typeof(data.status[i].childs)=='object'){
					tmp2 += '<ul class="c-2th-items">';
					for(var j in data.status[i].childs){
						tmp2 +='<li class="has-children"><a href="javascript:" onClick="alast(\'c-2th-item-cur\',\'has-children\',this)" class="c-2th-item-hd"><input type="checkbox" value="'+data.status[i].childs[j].id+'"  onchange="roleChange(\'c-2th-item-hd\',this)" />'+data.status[i].childs[j].name+'</a>';
						var tmp3 = "";
						if(typeof(data.status[i].childs[j].childs)=='object'){
							tmp3 += '<ul class="th3">';
							for(var k in data.status[i].childs[j].childs){
								tmp3 +='<li><a href="javascript:" class="last-3th" onClick="alast(\'\',\'last-3th\',this)"><input type="checkbox" onchange="roleChange(\'last-3th\',this)"  value="'+data.status[i].id+'-'+data.status[i].childs[j].id+'-'+data.status[i].childs[j].childs[k].id+'" />'+data.status[i].childs[j].childs[k].name+'</a></li>';
							}
							tmp3+='</ul>';
						}
						tmp2+= (tmp3 + "</li>");
					}
					tmp2+='</ul>';
				}
				roleAy+= (tmp2 + "</li>");
			}
			roleAy+='</ul>';
			$roleHtml.html(roleAy);
			$.get(url+"findAuthorityByRole.action",{"roleId":id},function(data){
				$.each(data.status,function (index,item){
						$roleHtml.find("input[value='"+item.applicationId+"-"+item.moduleId+"-"+item.actionId+"']").prop("checked",true);
						$roleHtml.find("input:checked").closest(".has-children").children("a.c-2th-item-hd").children("input").attr("checked",true);
						$roleHtml.find("input:checked").closest(".hc").children("a.c-item-hd").children("input").attr("checked",true)
				});

			},"jsonp");
			$roleHtml.find("input:checkbox").on("click",function (event){
				roleChange($(this).parent().attr("class"),this);
				event.stopPropagation();
			});
	},"jsonp");
	ryDiv(obj);
}
*/
var rAuthority= function (obj){
		art.dialog({
			id:'roleTmp',
			 title:'角色权限',
			content:'<div class="l-allot at-bw"><span>所选角色的权限为：</span>'+
								'<h4>权限</h4><div id="roleHtml"></div></div><div class="point-l pt-show">请选择角色和权限！</div>',
			fixed: true,
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var thLeng=$(".last-3th input:checked").length;
				var dataVal=[],str=[];
				for(var i=0;i<thLeng;i++){
					str=$(".last-3th input:checked").eq(i).attr("value").split("-");
					dataVal.push({
						 "appId":str[0],
						 "moduleId":str[1],
						 "actionId":str[2]
					 });
				}
				$.post(url+"addRoleToUser.action",{"roleId":$(obj).closest("tr").children("td:eq(0)").find("input").attr("value"),"data":JSON.stringify(dataVal)},function(data){var tmp=data.status;aSuc(tmp);},"jsonp");
			},
			init:function(){
				this.hide();
				roleAt($(obj).closest("tr").children("td:eq(0)").find("input").attr("value"));
			},
			cancel: true,
			lock:true
		});
}
function roleAt(id){
	var $roleHtml = $("#roleHtml");
	$.get(url+"findRoleByUsers.action",{"userId":id},function(data){
		if(artDialog.list['roleTmp']) artDialog.list['roleTmp'].show();
		roleAy = '<ul class="c-items">';
			for (var i in data.status) {
				roleAy += '<li class="has-children hc"><a href="javascript:" onClick="alast(\'c-item-cur\',\'has-children\',this)" class="c-item-hd"><input type="checkbox" value="'+data.status[i].id+'" onchange="roleChange(\'c-item-hd\',this)" />' + data.status[i].name+ '</a>';
				var tmp2 = "";
				if(typeof(data.status[i].childs)=='object'){
					tmp2 += '<ul class="c-2th-items">';
					for(var j in data.status[i].childs){
						tmp2 +='<li class="has-children"><a href="javascript:" onClick="alast(\'c-2th-item-cur\',\'has-children\',this)" class="c-2th-item-hd"><input type="checkbox" value="'+data.status[i].childs[j].id+'"  onchange="roleChange(\'c-2th-item-hd\',this)" />'+data.status[i].childs[j].name+'</a>';
						var tmp3 = "";
						if(typeof(data.status[i].childs[j].childs)=='object'){
							tmp3 += '<ul class="th3">';
							for(var k in data.status[i].childs[j].childs){
								tmp3 +='<li><a href="javascript:" class="last-3th" onClick="alast(\'\',\'last-3th\',this)"><input type="checkbox" onchange="roleChange(\'last-3th\',this)"  value="'+data.status[i].id+'-'+data.status[i].childs[j].id+'-'+data.status[i].childs[j].childs[k].id+'" />'+data.status[i].childs[j].childs[k].name+'</a></li>';
							}
							tmp3+='</ul>';
						}
						tmp2+= (tmp3 + "</li>");
					}
					tmp2+='</ul>';
				}
				roleAy+= (tmp2 + "</li>");
			}
			roleAy+='</ul>';
			$roleHtml.html(roleAy);
			$.get(url+"findAuthorityByRole.action",{"roleId":id},function(data){
				$.each(data.status,function (index,item){
						$roleHtml.find("input[value='"+item.applicationId+"-"+item.moduleId+"-"+item.actionId+"']").prop("checked",true);
						$roleHtml.find("input:checked").closest(".has-children").children("a.c-2th-item-hd").children("input").attr("checked",true);
						$roleHtml.find("input:checked").closest(".hc").children("a.c-item-hd").children("input").attr("checked",true)
				});
			},"jsonp");
			$roleHtml.find("input:checkbox").on("click",function (event){
				roleChange($(this).parent().attr("class"),this);
				event.stopPropagation();
			});
	},"jsonp");

}


function roleChange(cls,id){
	var	check = id.checked;
	switch (cls) {
		case 'c-item-hd' :
			$(id).parent().next().find(":checkbox").prop("checked",check);
			break;
		case 'c-2th-item-hd' :
	   		var $t = $(id);
	   		$t.parent().next().find(":checkbox").prop("checked",check);
	   		$t.closest("ul.c-2th-items").prev().children("input").prop("checked", (check || $(id).parents("ul.c-2th-items").find("input:checked").length) ? true : false);
					break;
		case 'last-3th' :
			$(id).closest("li.has-children").find("a.c-2th-item-hd>input").prop("checked",$(id).closest("ul.th3").find("a.last-3th>input:checked").length ? true : false).closest("li.hc").find("a.c-item-hd>input").prop("checked",$(id).closest("li.hc").find("a.c-2th-item-hd>input:checked").length ? true : false);
			break;
		default :
		break;
	}
}


var allotRole= function (obj){
		var id=$(obj).closest("tr").children("td:eq(0)").find("input").attr("value");
		var tmpRole='<ul>';
		$.get(url+"roleListsJosn.action",function(data){
			for(var i=0;i<data.status.length;i++){
				tmpRole+='<li class="allot-r"><label><input name="" type="checkbox" value="'+data.status[i].roleId+'">'+data.status[i].roleName+'</label></li>';
			}
			tmpRole+='</ul>';

			art.dialog({
				 title:'分配角色',
				content:'<div class="l-allot a-r-sel"><div class="l-allot at-bw"><span>所选用户对应的角色为：</span>'+
									'<h4>角色</h4><div id="userHtml">'+tmpRole+'</div></div><div class="point-l pt-hidd">请选择用户和权限！</div>',
				fixed: true,
				background:"#000",
				opacity:"0.3",
				ok: function () {
					var roleLeng=$("#userHtml input:checked").length;
					if(roleLeng<=0){
						$(".point-l").removeClass("pt-hidd").addClass("pt-color");
						return false;
					}else{
						var sevroles=[];
						for(var i=0;i<roleLeng;i++){
							sevroles.push($("#userHtml input:checked").eq(i).attr("value"));
						}
						$.get(url+"saveUserRoles.action",{"userId":$(obj).closest("tr").children("td:eq(0)").find('input').attr("value"),"roleIds":sevroles.join(",")},function(data){sevRole(data.status);},"jsonp");
					}
				},
				init:function (){
					$.get(url+"findRoleByUser.action",{"userId":id},function(data){
						$.each(data.status,function (index,item){
								$("#userHtml").find("input[value='"+item.roleId+"']").prop("checked",true);
						});
					},"jsonp");
					$("#userHtml ul li:eq(0)").children().children("input").attr("disabled","true");
				},
				padding:"0 30px 0 10px",
				cancel: true,
				lock:true
			});
	},"jsonp");
}

function selectRole(id){
	var $userHtml = $("#userHtml");
	$userHtml.find(":checkbox").prop("checked",false);
	$.get(url+"findRoleByUser.action",{"userId":id},function(data){
		$.each(data.status,function (index,item){
				$userHtml.find("input[value='"+item.roleId+"']").prop("checked",true);
		});
	},"jsonp");
}

var userAy="";
var authority= function (){
	$.get(url+"userListsJosn.action",function(data){
		var tmpUser='<ul>';
		for(var i=0;i<data.status.length;i++){
			tmpUser+='<li id="'+data.status[i].userId+'" onclick="userAt(this)">'+data.status[i].userAccount+'</li>';
		}
		tmpUser+='</ul>';
		art.dialog({
			 title:'权限浏览',
			content:'<div class="l-allot a-r-sel"><span>选择用户：</span>'+
								'<h4>用户</h4>'+tmpUser+'</div>'+
							'<div class="l-allot at-bw"><span>所选用户的权限为：</span>'+
								'<h4>权限</h4><div id="userHtml"></div></div><div class="point-l pt-show">此功能只提供用户权限浏览！</div>',
			fixed: true,
			background:"#000",
			opacity:"0.3",
			ok: function () {
			},
			cancel: true,
			lock:true
		});
	},"jsonp");
}
function userAt(id){
	$.get(url+"findRoleByUserId.action",{"userId":$(id).attr('id')},function(data){
		userAy =  '<ul class="c-items">';
			for (var i in data.status) {
				userAy += '<li class="has-children"><a id="'+data.status[i].id+'"  href="javascript:" onClick="alast(\'c-item-cur\',\'has-children\',this)" class="c-item-hd">' + data.status[i].name+ '</a>';
					var tmp2 = "";
					if(typeof(data.status[i].childs)=='object'){
						tmp2 += '<ul class="c-2th-items">';
						for(var j in data.status[i].childs){
							tmp2 +='<li  class="has-children"><a href="javascript:" onClick="alast(\'c-2th-item-cur\',\'has-children\',this)" class="c-2th-item-hd" id="'+data.status[i].childs[j].id+'">'+data.status[i].childs[j].name+'</a>';
							var tmp3 = "";
							if(typeof(data.status[i].childs[j].childs)=='object'){
								tmp3 += '<ul class="th3">';
								for(var k in data.status[i].childs[j].childs){
									tmp3 +='<li><a id="'+data.status[i].childs[j].childs[k].id+'" href="javascript:" class="last-3th" onClick="alast(\'\',\'last-3th\',this)" >'+data.status[i].childs[j].childs[k].name+'</a></li>';
								}
								tmp3+='</ul>';
							}
							tmp2+= (tmp3 + "</li>");
						}
						tmp2+='</ul>';
					}
					userAy+= (tmp2 + "</li>");
			}
			userAy+='</ul>';
			 $("#userHtml").html("");
			$(userAy).appendTo("#userHtml");
	},"jsonp");
}


var jFilter=function(){
	art.dialog({
		 title:'过滤条件',
		content: '<div class="jf-ti">请选择筛选条件：</div>'+
		'<div class="j-fi"><span>用户名称：</span><select><option value="全部用户" selected="">全部用户</option><option value="Admin">Admin</option><option value="陈有为">陈有为</option><option value="李勇刚">李勇刚</option></select></div>'+
		'<div class="j-fi"><span>模块名称：</span><select><option value="所有模块" selected="">所有模块</option><option value="会员管理">会员管理</option><option value="类目管理">类目管理</option><option value="审核管理">审核管理</option><option value="应用中心">应用中心</option></select></div>'+
		'<div class="j-fi"><span>操作状态：</span><select><option value="所有数据" selected="">所有数据</option><option value="开始">开始</option><option value="完成">完成</option><option value="失败">失败</option><option value="操作记录">操作记录</option></select></div>'+
		'<div class="j-fi"><span>IP地址：</span><select><option value="所有IP地址" selected="">所有IP地址</option><option value="192.168.1.77">192.168.1.77</option><option value="192.168.1.103">192.168.1.103</option></select></div>'+
		'<div class="jf-ti">时间：</div>'+
		'<div class="j-fi"><label><input type="radio" name="RadioGroup1" value="所有时段" id="RadioGroup1_0"> 所有时段</label><br />'+
		'<div class="tb-time"><input type="radio" name="RadioGroup1" value="从" id="RadioGroup1_1"> 从：<input type="text" id="startTime" class="g-d-text" /><a class="g-data" href="javascript:" onclick="startFilter()"></a>至<input type="text"  class="g-d-text" id="endTime"/><a class="g-data" href="javascript:"    onclick="endFilter()"></a></div></div>',
		fixed: true,
		background:"#000",
		opacity:"0.3",
		ok: function () {
			},
		cancel: true,
		lock:true
	});
}
function startFilter(){
	WdatePicker({maxDate:'#F{$dp.$D(\'endTime\')||\'2020-10-01\'}',el:'startTime'});
}
function endFilter(){
	WdatePicker({minDate:'#F{$dp.$D(\'startTime\')}',maxDate:'2020-10-01',el:'endTime'});
}

function lookColeA(tmp){
	$.get(url+"roleListsJosn.action",function(data){
		var tmpRole,tmpUser;
		tmpUser =tmpRole='<ul>';
		for(var i=0;i<data.status.length;i++){
			tmpUser+='<li class="allot-r" id="'+data.status[i].roleId+'" onclick="roleAtT(this)">'+data.status[i].roleAlias +'</li>';
		}
		tmpUser+='</ul>';
		$.get(url+"userListsJosn.action",function(data){
			for(var i=0;i<data.status.length;i++){
				tmpRole+='<li class="allot-r"><label><input name="" type="checkbox" value="'+data.status[i].userId+'" checked="checked">'+data.status[i].userAccount+'</label></li>';
			}
			tmpRole+='</ul>';
			art.dialog({
				 title:'成员管理',
				content:'<div class="l-allot a-r-sel"><span>选择角色：</span>'+
									'<h4>角色</h4>'+tmpUser+'</div>'+
								'<div class="l-allot at-bw"><span>所选角色的用户为：</span>'+
									'<h4>用户</h4><div class="user-colre">'+tmpRole+'</div></div><div class="point-l pt-hidd">请选择角色和用户！</div>',
				fixed: true,
				background:"#000",
				opacity:"0.3",
				ok: function () {
					var roleLeng=$(".user-colre input:checked").length;
					var sevroles=[];
					for(var i=0;i<roleLeng;i++){
						sevroles.push($(".user-colre input:checked").eq(i).attr("value"));
					}
					$.get(url+"saveRoleUsers.action",{"roleId":$(".a-r-sel .cur").attr('id'),"userIds":sevroles.join(",")},function(data){aSuc(data.status);},"jsonp");
				},
				init:function (){
					$("div.a-r-sel li:first").trigger("click")
				},
				cancel: true,
				lock:true
			});
		},"jsonp");
	},"jsonp");
}
function roleAtT(id){
	var $roleHtml = $(".user-colre");
	$.get(url+"findUserByRole.action",{"roleId":$(id).attr('id')},function(data){
		$roleHtml.find("input").attr("checked",false);
		$.each(data.status,function (index,item){
				$roleHtml.find("input[value='"+item.userId+"']").prop("checked",true);
		});
	},"jsonp");
}
$(function(){
	$(".g-list tbody >tr").click(function(){
		$(".g-list tbody >tr").removeClass("cur");
		$(this).addClass("cur");
	});
	$("li.li-last a:contains('"+$("#masterCur").attr("value")+"')").closest("li").addClass("ln-3th-cur");
});


function aReturn(tmp){
	switch (tmp) {
	   case 1 :
			poTS("新添成功！");
			break;
	   case 2 :
	   poTS("修改成功！");
			break;
		case 3 :
			poFi("帐号或名称已存在！");
			break;
	   default :
			poFi("操作失败！");
		break;
	}
}
function aReturnName(tmp){
	switch (tmp) {
	   case 0 :
			poTS("参数出错！");
			break;
	   case 1 :
	   		poTS("修改成功！");
			break;
		case 2 :
			poFi("修改失败！");
			break;
	   case 3 :
			poFi("修改用户名称已存在！");
			break;;
		break;
	}
}
function aReturnR(tmp){
	switch (tmp) {
	   case 1 :
			poTS("新添成功！");
			break;
	   case 2 :
			poFi("角色名称已存在！");
			break;
		case 3 :
			poFi("新增角色失败！");
			break;
	   default :
		break;
	}
}
function aReturnRT(tmp){
	switch (tmp) {
	   case 1 :
			poTS("角色成功！");
			break;
	   case 2 :
			poFi("角色已存在！");
			break;
		case 3 :
			poFi("修改角色失败！");
			break;
	   default :
		break;
	}
}
function sevRole(tmp){
	switch (tmp) {
	   case 1 :
			poTS("更新成功！");
			break;
	   case 2 :
			poTS("新增成功！");
			break;
	   default :
			poFi("操作失败！");
		break;
	}
}
function clPass(tmp){
	switch (tmp) {
	   case 0 :
			poFi("修改出错！");
			break;
	   case 1 :
			art.dialog({content:"清除成功！",icon: 'succeed',fixed: true,time: 1.5});
			break;
	   case 2 :
			poFi("清除失败！");
		break;
	}
}
function styPass(tmp){
	switch (tmp) {
	   case 0 :
			poFi("设置出错！");
			break;
	   case 1 :
			art.dialog({content:"设置密码成功！",icon: 'succeed',fixed: true,time: 1.5});

			break;
	   case 2 :
			poFi("设置密码失败！");
		break;
	}
}
function rePw(tmp,that){
	switch (tmp) {
	   case 0 :
			poFi("修改出错");
			break;
	   case 1 :
	   		if(that){that.close();}
			art.dialog({content:"修改成功！",icon: 'succeed',fixed: true,time: 1.5});
			break;
		case 2 :
			poFi("修改失败！");
			break;
	   case 3 :
			poFi("原始密码错误！");
		break;
	}
}
function aDel(tmp){
	if(tmp>0){poTS("删除成功！");}else{poFi("删除失败！");}
}
function aSuc(tmp){
	if(tmp>0){poTS("设置成功！");}else{poFi("设置失败！");}
}
function poTS(tmp){
	art.dialog({content:tmp,icon: 'succeed',fixed: true,time: 1.5});
	setTimeout(function(){location.href = location.href;},1500);
}
function poFi(tmp){
	art.dialog({content: tmp,icon: 'error',fixed: true,time: 1.5});
}

function alast(mn,pr,obj){
	$(obj).parent("."+pr).toggleClass(mn);
	return false;
}

function pasIn(){
	var userId = $.trim($("#userId").val());
	if("" == userId){//超级管理员不能修改密码
		art.dialog({content: '超级管理员不能修改密码！',icon: 'error',fixed: true,time: 1.5});
		return;
	}
	art.dialog({
		title:'修改密码',
		content: '<div id="modifyPassword"><div class="art-u"><span><b>*</b>原密码：</span><input type="password" name="oldPassWord" maxlength="20" /></div><div class="art-u"><span><b>*</b>新密码：</span><input type="password" name="newPassWord" maxlength="20" /></div><div class="art-u"><span><b>*</b>确认密码：</span><input type="password" name="confirmPassWord" maxlength="20"/></div></div><div class="po-us"></div>',
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok:function (){
			var
				that = this;
				$modifyPassword = $("#modifyPassword"),
				$field = $modifyPassword.find("input");
			for(var i = 0;i < $field.length;i++){
				if("" == $field.val()){
					$(".po-us").addClass("pt-color");
					$(".po-us").html("带“*”为必填项，请输入密码！");
					return false;
				}
			}
			if(($("input[name=newPassWord]").val()!=$("input[name=confirmPassWord]").val())||$("input[name=newPassWord]").val().length<6||$("input[name=confirmPassWord]").val().length<6){
				$(".po-us").removeClass("pt-color");
				art.dialog({content: "请输入6-20位密码并两次输入一致！",icon: 'error',fixed: true,time: 1.5});
				return false;
			}
			$.get(url+"mypance.updateUserPassWord",{"oldPassWord":$("input[name=oldPassWord]").attr("value"),"newPassword":$("input[name=newPassWord]").attr("value"),"userId":$("#userId").val()},function(data){
				rePw(data.status,that);
			},"jsonp");
			return false;
		},
		cancel: true
	});
}
$(function(){
	if($("input").is("#pw")){
		var tmpBoolean = false;
		if($("#pw").val()=="0"){
			art.dialog({
				title:'提醒：',
				content: '<div>你当前还没有对帐号设置密码，<br /><br />你必须先设置密码才可以进行操作，谢谢！<br /><br /></div>',
				fixed: true,
				background:"#000",
				opacity:"0.3",
				cancel: false,
				lock: true,
				time:2,
				close:function (){
					art.dialog({
						title:'设置密码',
						content: '<div id="modifyPassword"><div class="art-u"><span><b>*</b>密码：</span><input type="password" name="newPassWord" maxlength="20" /></div><div class="art-u"><span><b>*</b>再输一次：</span><input type="password" name="confirmPassWord" maxlength="20"/></div></div><div class="po-us"></div>',
						fixed: true,
						okVal: '保存',
						background:"#000",
						opacity:"0.3",
						ok:function (){
							var that=this,$modifyPassword = $("#modifyPassword");
							var $field = $modifyPassword.find("input");
							for(var i = 0;i < $field.length;i++){
								if("" == $field.val()){
									art.dialog({content: "请输入6-20位密码并两次输入一致！",icon: 'error',fixed: true,time: 1.5});
									return false;
								}
							}
							if(($("input[name=newPassWord]").val()!=$("input[name=confirmPassWord]").val())||$("input[name=newPassWord]").val().length<6||$("input[name=confirmPassWord]").val().length<6){
								art.dialog({content: "请输入6-20位密码并两次输入一致！",icon: 'error',fixed: true,time: 1.5});
								return false;
							}

							$.get(url+"mypance.saveUserPassWord",{"newPassword":$("input[name=newPassWord]").attr("value"),"userId":$("#userId").val()},function(data){
			 styPass(data.status);
			 if(data.status == 1){
				 tmpBoolean=true;
				 that.close();
			}
			 },"jsonp");
						},
						cancel: false,
						lock: true,
						close:function (){
							if(!tmpBoolean) return false;
						}
					});
				}
			});
		}
	}
});
//新建敏感词
function words(){
	art.dialog({
		title:'新建敏感词',
		content: '<div id="modifyPassword"><div class="art-u"><span><b>*</b>敏感词：</span><input type="text" id="oldPassWord" maxlength="30" /></div><div class="po-us"></div>',
		fixed: true,
		okVal: '保存',
		background:"#000",
		opacity:"0.3",
		ok:function (){
			var $mpword = $("#oldPassWord").val();
			if($mpword==""||(!(re.test($mpword)))){
				$(".po-us").addClass("pt-color");
				$(".po-us").html("请输入中文、英文和数字，最多30位敏感词！");
				return false;
			}
			$.get(url+"badWord.insertWord",{"word":$mpword},function(data){wordsPo(data.status);},"jsonp");
		},
		cancel: true
	});
}
function wordsPo(tmp){
	switch (tmp) {
	   case 0 :
			poFi("新增出错！");
			break;
	   case 1 :
	   		poTS("新增成功！");
			break;
		case 2 :
			poFi("新增失败！");
			break;
		case 3 :
			poFi("敏感词已存在！");
			break;
	   default :
		break;
	}
}
function delWd(tmp){
	switch (tmp) {
	   case 0 :
			poFi("删除出错！");
			break;
	   case 1 :
	   		poTS("删除成功！");
			break;
		case 2 :
			poFi("删除失败！");
			break;
	   default :
		break;
	}
}
//删除
function delWord(tmp,id){
	var val=$(tmp).closest("tr").find("td:eq(1)").html();
	$.get(url+"badWord.deleteWordById",{"id":id,"word":val},function(data){delWd(data.status);},"jsonp");
}
//跳转
function listPage(tmp){
	var page=$(tmp).parent().find("input[name=pageNo]").val();
	if(page==""){
		art.dialog({content: "请输入页数！",icon: 'error',fixed: true,time: 1.5});
	}else if(page == 0){
		art.dialog({content: "页数不能为0！",icon: 'error',fixed: true,time: 1.5});
	}else if(parseInt(page)>parseInt($(".pagesize").html())){
		art.dialog({content: "页数超出已有页数，请重新输入！",icon: 'error',fixed: true,time: 1.5});
	}else{
		window.location.href=url+"badWord.getWordsPage?pageNo="+$(tmp).prev("input").val();
	}
}

//资源权限
var resourceAuthority= function (obj){
		art.dialog({
			id:'roleTmp',
			 title:'资源权限',
			content:'<div class="l-allot at-bw"><span>所选资源权限为：</span>'+
								'<h4>权限</h4><div id="roleHtml"></div></div><div class="point-l pt-show">请选择资源和权限！</div>',
			fixed: true,
			background:"#000",
			opacity:"0.3",
			ok: function () {
				var thLeng=$(".last-3th input:checked").length;
				var dataVal=[],str=[];
				for(var i=0;i<thLeng;i++){
					str=$(".last-3th input:checked").eq(i).attr("value").split("-");
					dataVal.push({
						 "appId":str[0],
						 "moduleId":str[1],
						 "actionId":str[2]
					 });
				}
				//{"roleId":$(obj).closest("tr").children("td:eq(0)").find("input").attr("value"),"data":JSON.stringify(dataVal)},function(data){var tmp=data.status;aSuc(tmp);}
				$.post(url+"addResourceRoleToUser.action",{"roleId":$(obj).closest("tr").children("td:eq(0)").find("input").attr("value"),"data":JSON.stringify(dataVal)},function(data){var tmp=data.status;aSuc(tmp);},"jsonp");
			},
			init:function(){
				this.hide();
				resourceAt($(obj).closest("tr").children("td:eq(0)").find("input").attr("value"));
			},
			cancel: true,
			lock:true
		});
}
function resourceAt(id){
	var $roleHtml = $("#roleHtml");
	$.get(url+"findResourceRoleByUsers.action",{"userId":id},function(data){
		if(artDialog.list['roleTmp']) artDialog.list['roleTmp'].show();
		roleAy = '<ul class="c-items">';
			for (var i in data.status) {
				roleAy += '<li class="has-children hc"><a href="javascript:" onClick="alast(\'c-item-cur\',\'has-children\',this)" class="c-item-hd"><input type="checkbox" value="'+data.status[i].id+'" onchange="roleChange(\'c-item-hd\',this)" />' + data.status[i].name+ '</a>';
				var tmp2 = "";
				if(typeof(data.status[i].childs)=='object'){
					tmp2 += '<ul class="c-2th-items">';
					for(var j in data.status[i].childs){
						tmp2 +='<li class="has-children"><a href="javascript:" onClick="alast(\'c-2th-item-cur\',\'has-children\',this)" class="c-2th-item-hd"><input type="checkbox" value="'+data.status[i].childs[j].id+'"  onchange="roleChange(\'c-2th-item-hd\',this)" />'+data.status[i].childs[j].name+'</a>';
						var tmp3 = "";
						if(typeof(data.status[i].childs[j].childs)=='object'){
							tmp3 += '<ul class="th3">';
							for(var k in data.status[i].childs[j].childs){
								tmp3 +='<li><a href="javascript:" class="last-3th" onClick="alast(\'\',\'last-3th\',this)"><input type="checkbox" onchange="roleChange(\'last-3th\',this)"  value="'+data.status[i].id+'-'+data.status[i].childs[j].id+'-'+data.status[i].childs[j].childs[k].id+'" />'+data.status[i].childs[j].childs[k].name+'</a></li>';
							}
							tmp3+='</ul>';
						}
						tmp2+= (tmp3 + "</li>");
					}
					tmp2+='</ul>';
				}
				roleAy+= (tmp2 + "</li>");
			}
			roleAy+='</ul>';
			$roleHtml.html(roleAy);
			$.get(url+"findResourceByRole.action",{"roleId":id},function(data){
				$.each(data.status,function (index,item){
						$roleHtml.find("input[value='"+item.applicationId+"-"+item.moduleId+"-"+item.actionId+"']").prop("checked",true);
						$roleHtml.find("input:checked").closest(".has-children").children("a.c-2th-item-hd").children("input").attr("checked",true);
						$roleHtml.find("input:checked").closest(".hc").children("a.c-item-hd").children("input").attr("checked",true)
				});
			},"jsonp");
			$roleHtml.find("input:checkbox").on("click",function (event){
				resourceChange($(this).parent().attr("class"),this);
				event.stopPropagation();
			});
	},"jsonp");

}


function resourceChange(cls,id){
	var	check = id.checked;
	switch (cls) {
		case 'c-item-hd' :
			$(id).parent().next().find(":checkbox").prop("checked",check);
			break;
		case 'c-2th-item-hd' :
	   		var $t = $(id);
	   		$t.parent().next().find(":checkbox").prop("checked",check);
	   		$t.closest("ul.c-2th-items").prev().children("input").prop("checked", (check || $(id).parents("ul.c-2th-items").find("input:checked").length) ? true : false);
					break;
		case 'last-3th' :
			$(id).closest("li.has-children").find("a.c-2th-item-hd>input").prop("checked",$(id).closest("ul.th3").find("a.last-3th>input:checked").length ? true : false).closest("li.hc").find("a.c-item-hd>input").prop("checked",$(id).closest("li.hc").find("a.c-2th-item-hd>input:checked").length ? true : false);
			break;
		default :
		break;
	}
}