$(function(){
	var synopsis_edit = function(){
		$("#synopsis_edit").html($("#market_synopsis").html());
		KindEditor.create('#synopsis_edit',{
				themeType : 'qq',
				items : ['bold','italic','underline','fontname','fontsize','forecolor','hilitecolor','plug-align','plug-order','plug-indent','link'],
				afterChange : function(){
					this.sync();
				}
			});
	};
	var synopsis_edit_remove = function(){
		KindEditor.remove("#synopsis_edit");
	};
	
	function $market_submit (){
		alert("提交!");
		
		synopsis_edit_remove();
		$('#market_synopsis').show();
		$('#market_synopsis_edit_but').show();
		$('#market_synopsis_edit_box').hide();		
	}	

	$("#market_synopsis_edit_but").bind("click",function(){
		$('#market_synopsis').hide();
		$('#market_synopsis_edit_but').hide();
		$('#market_synopsis_edit_box').show();
		synopsis_edit();
	})
	

	$("#synopsis_edit_submit").bind("click",function(){//简介编辑,提交事件
		$market_submit();
	})
	
	$("#synopsis_edit_remove").bind("click",function(){
		synopsis_edit_remove();
		$('#market_synopsis').show();
		$('#market_synopsis_edit_but').show();
		$('#market_synopsis_edit_box').hide();
	})
	
	
	
});