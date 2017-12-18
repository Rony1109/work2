/**
 * 会员中心
 * 
 */
define(function(require, exports, module) {

	dialog = require('m/dialog/js/init');//弹出框

	function startdata(tmp,fun){//接口回调状态
		if(tmp.status==true){
			dialog.success(tmp.msg,1.5);
			fun();
		}else{
			dialog.tip(tmp.msg,1.5);
		}
	}

	var selectAll = function (){//全选
		var
			$all = $("[name='all']"),
			$inquiryId = $(".c :checkbox");
		$all.on("change",function (){
			var	prop = $(this).prop("checked");
			$all.prop("checked",prop);
			$inquiryId.prop("checked",prop);
		});
		$inquiryId.on("change",function (){
			$inquiryId.filter(":not(:checked)").length ? $all.prop("checked",false) : $all.prop("checked",true);
		});
		return this;
	};
	
	selectAll();

	$(".af-page ul .del").click(function(event){
		event.preventDefault();
		var links=$(this).children("a").attr("href");
		if($(".c :checkbox:checked").length){
			var	msg = "确定要删除所选项吗？";
			dialog.confirm(msg,function (){
				var ids = [];
				$(".c :checkbox:checked").each(function (i,v){
					ids[i] = v.value;
				});
				$.post(links,{"ids":ids},function (data){
					startdata(data,function(){window.location.reload();});
				},"json");
			});
		}else{
			dialog.tip("请选中数据后操作");
		}
		return;
	});

});