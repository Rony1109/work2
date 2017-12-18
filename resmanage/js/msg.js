$why_msg_option = {}
$why_msg_option.test = false; //是否为单机开发模式
$why_msg_option.Kmsg_text = null;
$why_msg_option.Msg_textMax = 200; //消息最大字符数
$why_msg_option.DF_userMax = 10; //单发页面收息人最大限制
$why_msg_option.user_fz = {//群发操作_二级选项,开发虚拟数据
	"活跃程度":[
		{"name":"最近一个月登录会员","id":"hyd_1"},
		{"name":"最近三个月登录会员","id":"hyd_3"},
		{"name":"最近半年月登录会员","id":"hyd_6"},
		{"name":"最近一年月登录会员","id":"hyd_12"}
	],
	"付费分类":[
		{"name":"免费会员","id":"ff_0"},
		{"name":"付费会员","id":"ff_1"}
	],
	"行业会员":[
		{"name":"化工行业","id":"hy_0"},
		{"name":"电子行业","id":"dz_1"},
		{"name":"电子1业","id":"dz_2"},
		{"name":"电子f行业","id":"dz_3"},
		{"name":"电子df业","id":"dz_4"},
		{"name":"电子f","id":"dz_5"},
		{"name":"电子fsd业","id":"dz_6"},
		{"name":"子行业","id":"dz_7"}
	]
}
$why_msg_option.group_select_arr = []; //已选择的组;
var user_del_arr = [];

$(function(){
	if($("#form_add").length>0){
		df_bind();//单发页面绑定;
	}else if($("#form_add_qf").length>0){
		qf_bind();//群发页面初始化,事件绑定;
	}else{
		list_bind();//列表页事件绑定
	}
})

oMouse = function(e){
	if(e.pageX || e.pageY){//FF
		return {x:e.pageX-(document.documentElement.scrollLeft+document.body.scrollLeft), y:e.pageY-(document.documentElement.scrollTop+document.body.scrollTop)};
	}else{//IE
		return{x:e.clientX - document.documentElement.clientLeft,y:e.clientY - document.documentElement.clientTop};
	};
};
//文本框只能输入数字
function $ime_disabled(obj){
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
}
//JS获取URL参数
function getURL_argument(kdy,url_){
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

/**列表页**/
function list_bind(){
	$("input.noime").each(function(index, element) {
		$ime_disabled(this);
	});
	$("td a.ico-del").on("click",function(i){
		url = $(this).attr("href");
		artDialog.confirm("确定要删除吗?",function(){
			$.get(url,function(data){
				alert_aReturn(parseInt(data)>=1?1:0,"删除成功!","删除失败!",function(){location.href = location.href;});
			})
		})
		return false;
	});
}
function msg_ss(){//按时间搜索
	if($.trim($("#startTime").val())!=="" || $.trim($("#endTime").val())!==""){
		var startTime = $.trim($("#startTime").val());
		var endTime = $.trim($("#endTime").val());
		if(startTime == ""){
			//alert("起始时间不能为空!");
			artDialog.alert("起始时间不能为空!");
			return false;
		}
		if(endTime == ""){
			artDialog.alert("结束时间不能为空!");
			return false;
		}
		var reg_date = /^\d{4}(\-)(((0[1-9])|(1[0-2]))|([1-9]))\1(([012]\d|30|31)|([1-9]))$/;
		if(!reg_date.test(startTime)){
			//alert("起始时间格式不正确!");
			artDialog.alert("起始时间格式不正确!");
			return false;
		}
		if(!reg_date.test(endTime)){
			//alert("结束时间格式不正确!");
			artDialog.alert("结束时间格式不正确!");
			return false;
		}
		if(new Date(startTime) > new Date(endTime)){
			//alert("起始时间不能大于结束时间!")
			artDialog.alert("起始时间不能大于结束时间!");
			return false;
		}
	}
}

/**发送页面公用**/

//实时，定时发送，切换效果
function msg_time_comm(){
	var b = $(this).val();
	if(b == 1){
		$('#msg_time').removeAttr('disabled');
	}else{
		$('#msg_time').attr('disabled','disabled');
	}
}

//信息字数超出实时提醒
function msg_text_jc(n){
	if(n>$why_msg_option.Msg_textMax){
		$("#msg_text_err").addClass("err_msg");
		return false;
	}else{
		$("#msg_text_err").removeClass("err_msg");
		return true;
	}
}

//除收消息人员之外的表单检测
function msg_form_add_gyjc(o){
	var obj = o ? $(o) : $('#form_add');
	var r_arg = obj.serialize();
	if(getURL_argument("msg_ds",r_arg) == "1"){
		var time_text = obj.find("input[name='msg_time']").val(),
			time_reg = /^\d{4}(\-)(((0[1-9])|(1[0-2]))|([1-9]))\1(([012]\d|30|31)|([1-9]))(\s(20|21|22|23|[01]\d|\d)(([:][0-5]\d){2}){1,2})?$/;
		if($.trim(obj.find("input[name='msg_time']").val())==""){
			artDialog.alert("定时发送的时间不能为空!");
			return false;
		}else if(!time_reg.test(time_text)){
			artDialog.alert("发送的时间格式不正确！ 例：2012-12-12 12:12:00");
			return false;
		}
	}
	var title = obj.find("input[name='msg_title']").val();
	if($.trim(title) == ""){
		artDialog.alert("消息标题不能为空!");
		return false;
	}
	if(title.length > 50 ){
		artDialog.alert("消息标题不能超过50个字符!")
		return false;
	}
	var msg_text = $("#msg_text").val();
	if($.trim(msg_text) == ""){
		artDialog.alert("消息内容不能为空!");
		return false
	}
	if($why_msg_option.Kmsg_text.count('text') > 200 ){
		artDialog.alert("消息内容不能超过200个字符!")
		return false;
	}
	return true;
}

function Msg_text_Editor() {
	if(typeof(KindEditor) != "undefined"){
		KindEditor.each({'plug-align':{name:'对齐方式',method:{'justifyleft':'左对齐','justifycenter':'居中对齐','justifyright':'右对齐'}},'plug-order':{name:'编号',method:{'insertorderedlist':'数字编号','insertunorderedlist':'项目编号'}},'plug-indent':{name:'缩进',method:{'indent':'向右缩进','outdent':'向左缩进'}}},function(pluginName,pluginData){var lang={};lang[pluginName]=pluginData.name;KindEditor.lang(lang);KindEditor.plugin(pluginName,function(K){var self=this;self.clickToolbar(pluginName,function(){var menu=self.createMenu({name:pluginName,width:pluginData.width||100});KindEditor.each(pluginData.method,function(i,v){menu.addItem({title:v,checked:false,iconClass:pluginName+'-'+i,click:function(){self.exec(i).hideMenu();}});})});});});
		$why_msg_option.Kmsg_text = KindEditor.create('#msg_text', {
			themeType : 'qq',
			items : ['bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','link'],
			afterChange : function(){
				this.sync();
				msg_text_jc(this.count('text'));
			}
		});
	}
}

/**单发页面**/
//单发页面，添加收消息用户，及事件绑定。
function df_bind(){
	//提交表单
	$("input[name='msg_ds']").on("change",msg_time_comm);
	$('#form_add').submit(function(){

		if($("#msg_users_box input[name='userid']").length <=0){
			artDialog.alert("请选择接收人!");
			return false;
		}
		if(msg_form_add_gyjc()){
			form_msg_add();
		}
		return false;
	});
	menuclass = {};
	menuclass.thislist = null;
	menuclass.menu_li = [
		{"name":"删除","comm":men_del},
		{"name":"全部删除","comm":men_del_all}
	];
	menuclass.info = function(){
		o = this;
		this.menubox = $('<div id="menubox" class="menubox"></div>');
		var ul = $("<ul class=\"menu_ul\"></ul>");
		for(k in o.menu_li){
			var a = $('<a href="javascript:;">'+o.menu_li[k]["name"]+'</a>');
			+function(){
				var f_comm = o.menu_li[k]["comm"];
				a.click(function(){f_comm.call(o); menuclass.hidden();});
			}();
			ul.append($('<li></li>').append(a));
		}
		this.menubox.append(ul).on("mousedown",function(event){
			event.stopPropagation();
			return false;
		});
		$("body").append(this.menubox).on("mousedown",function(){menuclass.hidden();})
	}
	menuclass.show = function(mouse){
		this.menubox.show().css({left:mouse.x+5+"px",top:mouse.y+3+"px"});
	}
	menuclass.hidden = function(){
		this.menubox.hide();
	}
	menuclass.info();
	//右键菜单
	$("#msg_users_box").delegate("b","mousedown",function(e){
		Event = e || window.event;

		if(e.which != 3){
			return false;
		   //alert("这是右键单击事件");
	  	}
		if(menuclass){
			menuclass.thislist = this;
			menuclass.show(oM);
		}
		/*
		oM = oMouse(Event);
		var mX =oM.x;
		var mY =oM.y;
		var jX = (document.documentElement.scrollLeft+document.body.scrollLeft);
		var jY = (document.documentElement.scrollTop+document.body.scrollTop);
		var pmw=document.documentElement.clientWidth;
		var pmh=document.documentElement.clientHeight;
		var thew,theh;
		var x,y;

		this.gsDiv.style.position="absolute";
		thew=this.gsDiv.offsetWidth+this.options.MPY_X+this.options.XZ_X;
		theh=this.gsDiv.offsetHeight+this.options.MPY_Y+this.options.XZ_Y;
		if(((thew+mX)<=pmw && (theh+mY)<=pmh)||!this.options.AI){
			x=mX+this.options.MPY_X;y=mY+this.options.MPY_Y;
		}else if(thew+mX>pmw && theh+mY<=pmh){
			x=pmw-this.gsDiv.offsetWidth-this.options.XZ_X;
			y=mY+this.options.MPY_Y;
		}else if(thew+mX<=pmw && theh+mY>pmh){
			x=mX+this.options.MPY_X;
			y=pmh-this.gsDiv.offsetHeight-this.options.XZ_Y;
		}else{
			if(mX<thew&&mY<theh){
				var s1,s2,s3,s4;
				s1=function(){
					var x,y;
					if(mX>pmw-mX){x=mX-this.options.MPY_X}else{x=pmw-mX-this.options.MPY_X;};
					y=pmh>this.gsDiv.offsetHeight?this.gsDiv.offsetHeight:pmh;
					return x*y;
				};
				s2=function(){
					var x,y;
					x=pmw>this.gsDiv.offsetWidth?this.gsDiv.offsetWidth:pmw;
					if(mY>pmh-mY){y=mY-this.options.MPY_Y;}else{y=pmh-mY-this.options.MPY_Y;};
					return x*y;
				};
				if(s1()>=s2()){
					x=mX>pmw-mX?mX-thew:mX+this.options.MPY_X;y=pmh-this.gsDiv.offsetHeight-this.options.XZ_Y;
				}else{
					x=pmw-this.gsDiv.offsetWidth-this.options.XZ_X;y=mY>pmh-mY?mY-theh:mY+this.options.MPY_Y;};
			}else{
				x = mX>thew ? mX-thew : pmw-this.gsDiv.offsetWidth-this.options.XZ_X;
				y = mY>theh ? mY-theh : pmh-this.gsDiv.offsetHeight-this.options.XZ_Y;
			};
		};
		this.gsDiv.style.left=x+jX+'px';
		this.gsDiv.style.top=y+jY+'px';
		*/
		Event.stopPropagation();
		return false;
	}).delegate("b","mouseover",function(){
		$(this).addClass("on");
	}).delegate("b","mouseout",function(){
		$(this).removeClass("on");
	}).each(function(index,element){
		this.oncontextmenu = function(){return false;};
	})

	//键盘操作
	$("#msg_users_box").delegate("input","keydown",function(e){
		var keynum;
        var keychar;
        var numcheck;
        if(window.event){
            keynum = event.keyCode;
        }else if(e.which){
            keynum = e.which;
        };
		//alert(keynum);
		if(keynum == 8){//删除左边
			$(this).prevAll("input:first").focus();
			$(this).prev("b").remove();
			$(this).remove();
		}
		if(keynum == 46){//删除右边
			$(this).nextAll("input:first").focus();
			if($(this).next("b").length !=0 ){
				$(this).next("b").remove();
				$(this).remove();
			}
		}
		if(keynum == 37 || keynum == 38){//光标左移
			$(this).prevAll("input:first").focus();
		}
		if(keynum == 39 || keynum == 40){//光标右移
			$(this).nextAll("input:first").focus();
		}
		return false;
	}).delegate("input","keyup",function(){$(this).val("");})
	Msg_text_Editor();
};

function men_del(obj){//删除指定收信人
	var o = $(obj || menuclass.thislist);
	o.next("input").remove();
	o.remove();
}

function men_del_all(){//删除所有收信人
	$("#msg_users_box").html("");
}

function add_sjr(obj,username,userid){//添加收信人
	var users = $("#msg_users_box input[name='userid']");
	if(users.length >= $why_msg_option.DF_userMax){
		artDialog.alert("发送人数达到上限10人!");
		return;
	}
	for(i = 0 ; i < users.length; i++){
		if($(users[i]).val()==userid){
			artDialog.alert("己经添加!");
			return false;
		}
	};
	var b = $("<b></b>").text(username);
	var id = $("<input name='userid' type='hidden'>").val(userid)
	b.append(id);
	$("#msg_users_box").append(b).append("<input type='text' valut='' />");
}

function member_search(){//查询会员
	$("#msg_user_table").html("<tr><td colspan='3'>正在查询...</td></tr>");
	$.post("messageSend.findmember",$("#form_user").serialize(),function(data){
		if($.trim(data) == ""){
			$("#msg_user_table").html("<tr><td colspan='3'>未找到符合条件的会员.</td></tr>");
			return;
		}
		$("#msg_user_table").html(data);
		$("#form_user").find("input[name='condition']").val("");
	});
	return false;
}
function form_msg_add(){//发送消息
	var succeed_text;
	var r_arg = $('#form_add').serialize();
	if(getURL_argument("action") == "GX"){
		succeed_text="更新成功" ;
	}else{
		if(getURL_argument("msg_ds",r_arg)=="1"){
			succeed_text="保存成功";
		}else{
			succeed_text="发送成功";
		}
	}
	$.post($("#form_add").attr("action"),$("#form_add").serialize(),function(data){
		alert_aReturn(parseInt(data)>=1?1:0,succeed_text,"操作出错，请重试!",function(){location.href='messageSend.singleList';});
	})
}

function gomsglist(){//跳转到单发列表页
	/*if(getURL_argument("action") == "GX"){
		artDialog.confirm("确定要回到消息列表页吗?对当前消息做出的改变将不会保存！",function(){
			location.href='messageSend.singleList';
		},function(){})
	}else {*/
		location.href='messageSend.singleList';
	//}
}

/**群发页面**/
function qf_bind(){//群发页面
	$("#qz_1>ul,#qz_2>ul,#qz_3>ul").delegate("li","click",list_click_style);
	$("#qz_3>ul").delegate("li","click",list_groups_click);
	$("#ajaxMemberSearch").delegate(".Del_user","click",user_del).delegate(".unDel_user","click",user_undel);
	$("input[name='msg_ds']").on("change",msg_time_comm);
	$('#form_add_qf').submit(function(){
		if($why_msg_option.group_select_arr.length<=0){
			artDialog.alert("您还未选择发送的用户组!")
		}else if(msg_form_add_gyjc(this)){
			form_msg_add_qf();
		}
		return false;
	});
	if($why_msg_option.test){//判断开发OR正式环境
		fill_ul1("#qz_1 ul",$why_msg_option.user_fz).delegate("li","click",function(){
			var obj_v = $(this).attr("qz_mark");
			fill_ul2("#qz_2 ul",$why_msg_option.user_fz[obj_v]);
		});
	}else{
		$.get("messageSend.groupInfo",function(data){
			$why_msg_option.user_fz = data;
			fill_ul1("#qz_1 ul",$why_msg_option.user_fz).delegate("li","click",function(){
				var obj_v = $(this).attr("qz_mark");
				fill_ul2("#qz_2 ul",$why_msg_option.user_fz[obj_v]);
			});
		},"jsonp");
	}
	Msg_text_Editor();
	tb_user_group();
}
//li的点击样式
function list_click_style(){
	var obj = $(this),select_groups=$("#form_user_qf").find("select[name='user_group']");
	obj.addClass("s");
	if(true){
		obj.siblings("li").removeClass("s");
	}
}
//已选组的项的单击事件
function list_groups_click(){
	var qz_mark = $(this).attr("qz_mark"),select_groups=$("#form_user_qf").find("select[name='id']");
	$(this).addClass("show");
	$(this).siblings("li").removeClass("show");
	select_groups.val($("#qz_3 ul.qz_li>li.s").attr("qz_mark"));//定位差询指向选定组
	member_search_qf({"id":qz_mark}); //查询所属单前项的用户
}
//翻页
function gopage_qf(u_id,page){
	member_search_qf({"id":u_id,"page":page});
}
//删除会员
function user_del(){
	var obj_tr = $(this).parent().parent(),u_id = obj_tr.attr("userid");
	obj_tr.addClass("u_del");
	user_del_arr.push(u_id)
	//alert(user_del_arr);
}
//还原会员
function user_undel(){
	var obj_tr = $(this).parent().parent(),u_id = obj_tr.attr("userid");
	obj_tr.removeClass("u_del");
	for(var i=user_del_arr.length;i--;){
		if(user_del_arr[i]==u_id){
			user_del_arr.splice(i,1);
		}
	}
}
//已删会员检查
function table_jc(){
	var table_tr = $("#ajaxMemberSearch table tr");
	table_tr.each(function(index, element) {
		var u_id = $(this).attr("userid");
		for(var i=user_del_arr.length;i--;){
			if(user_del_arr[i]==u_id){
				$(this).addClass("u_del");
			}
		}
	});
}
//从选择的组中查询用户
function member_search_qf(ajaxdata){
	var ajax_box = $("#ajaxMemberSearch");
	ajaxdata = ajaxdata || $("#form_user_qf").serialize();
	ajax_box.find("table").html("<tr><td colspan='3'>正在查询...</td></tr>");
	ajax_box.find(".user_t_b").html("");
	$.post("messageSend.getGroupMember",ajaxdata,function(data){
		ajax_box.html(data);
		if(ajax_box.find("table tr").length <=0 ){
			ajax_box.find("table").html("<tr><td colspan='3'>未找到符合条件的会员.</td></tr>");
			return;
		}else{
			table_jc();
		}
		$("#form_user_qf").find("input[name='condition']").val("");
	});
	return false;
}
//生成li
function new_ps_li(data){
	var li=$("<li></li>");
	li.attr({"qz_mark":data.id,"title":data.name+"("+data.id+")"}).text(data.name);
	return li;
}
//生成option
function new_ps_option(data){
	var option = $("<option></option>");
	option.val(data.id).text(data.name);
	return option;
}
//填充2级列表
function fill_ul2(ul_id,data_arr,callback){
	var obj = $(ul_id);
	if(data_arr.length>0){
		obj.html("");
		for(i=0; i<data_arr.length;i++){
			obj.append(new_ps_li(data_arr[i]));
		}
	}
	return obj;
}
//填充1级列表
function fill_ul1(ul_id,data_arr,callback){
	var obj = $(ul_id);
	for(var i in data_arr){
		obj.append(new_ps_li({"id":i,"name":i}));
	}
	return obj;
}
//添加组操作
function add_ul(comm){
	var adds = $("#qz_2 ul.qz_li>li.s");
	if(comm=="all") {adds = $("#qz_2 ul.qz_li>li");}
	var box = $("#qz_3 ul.qz_li");
	for(i=0; i<adds.length; i++){
		var s1 = $(adds[i]);
		var s_qz_mark = s1.attr("qz_mark");
		var s_name = s1.attr("title").replace(/\(.*\)$/g,"");
		if(box.find("li[qz_mark='"+s_qz_mark+"']").length<=0){
			box.append(new_ps_li({"name":s_name,"id":s_qz_mark}));
			//$("#form_user_qf").find("select[name='user_group']").append(new_ps_option({"name":s_name,"id":s_qz_mark}));
		}
		if(comm!="all"){
			if(s1.next().length > 0){
				s1.removeClass("s").next().addClass("s");
			}
		}
	}
	if($("#qz_3 ul.qz_li>li.s").length<=0){
		$($("#qz_3 ul.qz_li>li")[0]).addClass("s");
	}
	tb_user_group();
}
//添加组前检查重复
function add_jc(ul,qz_mark){
	var obj = $(ul);
	for(i=0;i<obj.length;i++){
		if($(obj[i]).attr("qz_mark") == qz_mark) return false;
	}
	return true;
}
//删除选定组
function del_ul(comm){
	var adds = $("#qz_3 ul.qz_li>li.s");
	var ajax_box = $("#ajaxMemberSearch");
	if(comm=="all") {adds = $("#qz_3 ul.qz_li>li")}
	for(i=0; i<adds.length; i++){
		var s1 = $(adds[i]);
		if(s1.next().length > 0){
			s1.removeClass("s").next().addClass("s");
		}else{
			s1.removeClass("s").prev().addClass("s");
		}
		s1.remove();
	}
	ajax_box.find("table").html("");
	ajax_box.find(".user_t_b").html("");
	tb_user_group();
}
//同步己选择的组及查询的user_group选项同步
function tb_user_group(){
	var groups = $("#qz_3 ul.qz_li>li"),groups_arr={},
		select_groups=$("#form_user_qf").find("select[name='id']"),
		input_groups=$("#form_user_qf").find("input[name='user_groups']");
	for(var i=0;i<groups.length;i++){
		var list = groups_arr[$(groups[i]).attr("qz_mark")] = {};
		list["name"] = $(groups[i]).text();
	}
	//同步全局已先组
	var group_select_arr = [];
	for (var x in groups_arr){
		group_select_arr.push(x);
	}
	$why_msg_option.group_select_arr = group_select_arr;

	//以下是同步搜索表单用户组下拉的选择项,下拉表单项已隐藏
	var s_options = select_groups.find("option");
	for (var n=0;n<s_options.length;n++){
		var op = $(s_options[n]);
		if(groups_arr[op.val()]){
			delete(groups_arr[op.val()]);
		}else{
			if(op.val()!="0") op.remove();
		}
	}
	for (var x in groups_arr){
		select_groups.append(new_ps_option({"name":groups_arr[x].name,"id":x}));
	}
	if(groups.length>0 && $("#qz_3 ul.qz_li>li.s").length <= 0){
		$(groups[0]).addClass("s");
	}
	select_groups.val($("#qz_3 ul.qz_li>li.s").attr("qz_mark"));
}
//发送消息
function form_msg_add_qf(){
	var succeed_text;
	var r_arg = $('#form_add_qf').serialize();
	if(getURL_argument("action") == "GX"){
		succeed_text="更新成功" ;
	}else{
		if(getURL_argument("msg_ds",r_arg)=="1"){
			succeed_text="保存成功";
		}else{
			succeed_text="发送成功";
		}
	}
	r_arg += "&groupids=" + $why_msg_option.group_select_arr.join(",");
	r_arg += "&delUser=" + user_del_arr.join(",");
	$.post($("#form_add_qf").attr("action"),r_arg,function(data){
		alert_aReturn(parseInt(data)>=1?1:0,succeed_text,"操作出错，请重试!",function(){
			location.href='messageSend.groupList';
		});
	})
	return false;
}