/*会员中心，消息列表*/

function allCheckBox(str,id){//全选/反选
	var $boss = $(str), $id = $(id),
		checkboxs = $id.find("input:checkbox[name=messageIds]");
	if($boss.attr("checked")=="checked"){
		for( i = 0 ; i < checkboxs.length; i++ ){
			$(checkboxs[i]).attr("checked","checked");			
		}
	}else{
		for( i = 0 ; i < checkboxs.length; i++ ){
			$(checkboxs[i]).removeAttr("checked");
		}
	}
}
function delMsgofList(id){//删除选中list
	var $id = $(id), v = [], checkboxs = $id.find("input:checkbox[checked=checked]");
	if(checkboxs.length>0){
		for( i = 0 ; i < checkboxs.length; i++ ){
			v.push(
				$(checkboxs[i]).val()
			);
		}
		$.post("/user/deleteMsg",{"messageIds[]":v},
			function(data){
				if(!data.status)
					art.dialog({content:data.msg,icon: 'mem-e',time: 1.5,title:false});
				else
					art.dialog({content:data.msg,icon: 'mem-c',time: 1.5,title:false,close: function(){location.reload()}});
			},"json"
		);
	}
}