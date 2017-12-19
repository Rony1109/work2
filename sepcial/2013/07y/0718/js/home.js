function bmto(){
	artDialog({title:"在线报名",padding:"20px",content:'<div class="tablewidth"><div class="tab-title"><span class="g-f-l">在线报名</span><a class="g-f-r" href="javascript:;" title="" onclick="closet()"></a></div><table  border="0" cellspacing="0" cellpadding="0">'+
	  '<tr><th>公司名称:</th><td colspan="3"><input name="cp" type="text" style="width:405px;" /><em>*</em></td></tr>'+
	  '<tr><th>您的姓名:</th><td><input name="name" type="text" /><em>*</em></td><th>所在城市:</th><td><input name="city" type="text" /></td></tr>'+
	  '<tr><th>工作QQ:</th><td><input name="qq" type="text" /></td><th>联系电话:</th><td><input name="tel" type="text" /><em>*</em></td></tr>'+
	  '<tr><td colspan="4">您要咨询的问题<Br /><textarea name="content" cols="" rows=""></textarea></td></tr><tr><td colspan="4"><div class="pofont">带"&nbsp;*&nbsp;"&nbsp;为必填项</div></td></tr>'+
'</table></div>',
	ok: function() {
		var cp=$("input[name='cp']").val(),
			name=$("input[name=name]").val(),
			city=$("input[name=city]").val(),
			qq=$("input[name=qq]").val(),
			tel=$("input[name=tel]").val(),
			content=$("textarea[name=content]").val();
			if(cp==""||name==""||tel==""){
				$(".pofont").css("display","block");
				return false;
			}
			$(".pofont").removeAttr("style");
			$.post("http://cncms.csc86.com/formguide/index.php",{"formid": 19,"subtype": "ajax","dosubmit":"在线报名（我的标杆企业）","info[cp]":cp,"info[name]":name,"info[city]":city,"info[qq]":qq,"info[tel]":tel,"info[content]":content},function(data){
			if(data.status == true){
				alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
				$("input[name=cp]").val("");
				$("input[name=name]").val("");
				$("input[name=city]").val("");
				$("input[name=qq]").val("");
				$("input[name=tel]").val("");
				$("textarea[name=content]").val("");
			}else{
				alert("申请失败，请刷新后重试！");
			}
		},"jsonp");
	},cancel:false,
	fixed: true,
    id: 'Fm7',
	lock:'false',
    icon: 'question',
    okVal: '&nbsp;'});
}
function closet(){
	art.dialog({id:'Fm7'}).close();	
}