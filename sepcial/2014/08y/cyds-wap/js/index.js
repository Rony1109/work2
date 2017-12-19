function join(obj){
	var _form = $(obj),
		_json = _form.serialize();
	if (_form.find('input[name="info[name]"]').val() == "" || _form.find('input[name="info[tel]"]').val() == "" || _form.find('input[name="info[email]"]').val() == "" || _form.find('input[name="info[qq]"]').val() == "") {
		alert("请不要留空哦！");
		return false;
	}
	$.post('http://cncms.csc86.com/formguide/index.php', _json, function(data) { if (data.status == true) { dialog.close();alert("提交成功！"); } else { alert("提交失败，请稍候再试！") } }, "jsonp");
}

$(function(){
	$("#join").bind("click",function(){dialog.open($("#online").html())});
	$("#jizan").bind("click",function(){dialog.open($("#zan").html())});
	$(document).delegate("#jiz","click",function(){dialog.close();dialog2.open($("#jz").html())});
});